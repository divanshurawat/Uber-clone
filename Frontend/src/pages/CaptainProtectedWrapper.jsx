import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If no token, redirect to captain login
    if (!token) {
      navigate('/captain-login');
    }

    // Function to fetch captain profile
    const fetchCaptainProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setCaptain(response.data.captain);
        } else {
          throw new Error('Unauthorized');
        }
      } catch (error) {
        console.error('Error fetching captain profile:', error);
        localStorage.removeItem('token');
        navigate('/captain-login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptainProfile();
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
