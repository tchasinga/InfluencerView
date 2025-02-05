/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.ts';
import { TextField, Button, CircularProgress, Typography, Alert, Container, Box } from '@mui/material';

// Define the shape of the state for the selector
interface RootState {
  user: {
    user: {
      loading: boolean;
    };
  };
}

export default function SignIn() {
  interface FormData {
    email?: string;
    password?: string;
  }

  const [formData, setFormData] = useState<FormData>({});
  const { loading } = useSelector((state: RootState) => state.user && state.user.user);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Update the handleChange function with proper typings
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Update the handleSubmit function with proper typings
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch(`https://influencerview.onrender.com/apis/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        dispatch(signInFailure('Sign in failed'));
        setShowError(true);
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
      setShowSuccess(true);
      setShowError(false);
    } catch (error) {
      setShowError(true);
      dispatch(signInFailure('An error occurred during sign in'));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in now
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            helperText="Don't share your password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              'Sign In'
            )}
          </Button>
        </Box>
        {showSuccess && (
          <Alert severity="success">Welcome!</Alert>
        )}
        {showError && (
          <Alert severity="error">Please check your credentials.</Alert>
        )}
        <Typography variant="body2" color="text.secondary">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </Box>
    </Container>
  );
}
