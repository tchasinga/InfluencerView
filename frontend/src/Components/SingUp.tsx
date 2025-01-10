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

export default function SingUp() {
  interface FormData {
    username?: string;
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

      const res = await fetch(`https://influencerview.onrender.com/apis/auth/singup`, {
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
      navigate('/signup');
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
          Sign in as admin
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          {/* adding the username field */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />

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
              'Sign Up'
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
          Already have an account? <Link to="/signin" >Sign in</Link>
        </Typography>
      </Box>
    </Container>
  );
}
