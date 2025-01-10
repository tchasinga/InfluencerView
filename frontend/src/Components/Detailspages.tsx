/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface SharingDetails {
  _id: string;
  fullName: string;
  email: string;
  description: string;
  typeofservices: string;
  imageUrls: string[];
  userRef: string;
  createdAt: string;
  updatedAt: string;
}

const Detailspages: React.FC = () => {
  const { sharingId } = useParams<{ sharingId: string }>();
  const [details, setDetails] = useState<SharingDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://influencerview.onrender.com/apis/aply/getbyid/${sharingId}`);
        if (response.data.success) {
          setDetails(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch details.');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [sharingId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!details) {
    return <div className="no-data">No details available.</div>;
  }

  return (
    <div className="details-page container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Details Page</h1>
      <div className="details-card bg-white shadow-md rounded-lg p-6 mx-auto max-w-3xl">
        <div className="flex flex-col justify-center">
        <img 
          src={details.imageUrls[0]} 
          alt={details.fullName} 
          className="details-image  h-[500px] object-center rounded-md mb-4" 
        />
        <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-2">{details.fullName}</h2>
        <p className="text-gray-700 mb-2"><strong>Email:</strong> {details.email}</p>
        <p className="text-gray-700 mb-2"><strong>Description:
         <br /> </strong> {details.description}</p>
        <p className="text-gray-700 mb-2"><strong>Type of Services:</strong> {details.typeofservices}</p>
        <p className="text-gray-700 mb-2"><strong>Created At:</strong> {new Date(details.createdAt).toLocaleString()}</p>
        <p className="text-gray-700"><strong>Updated At:</strong> {new Date(details.updatedAt).toLocaleString()}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Detailspages;