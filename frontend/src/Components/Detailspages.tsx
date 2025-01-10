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
        const response = await axios.get(`http://localhost:8000/apis/aply/getbyid/${sharingId}`);
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
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-500">
        No details available.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Details Page</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center p-6 space-x-6">
          <div className="flex-shrink-0">
            <img 
              src={details.imageUrls[0]} 
              alt={details.fullName} 
              className="w-40 h-40 rounded-full object-cover shadow-md"
            />
          </div>
          <div className="mt-4 md:mt-0">
            <h2 className="text-2xl font-semibold text-gray-800">{details.fullName}</h2>
            <p className="text-lg text-gray-600">{details.email}</p>
            <p className="mt-4 text-gray-700">{details.description}</p>
            <p className="mt-4 font-medium text-gray-800">
              <span className="font-semibold">Type of Services:</span> {details.typeofservices}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <p><strong>Created At:</strong> {new Date(details.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(details.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailspages;
