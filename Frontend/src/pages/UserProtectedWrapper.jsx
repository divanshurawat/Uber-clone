import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if no token is found
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user profile with the token
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          throw new Error('Unauthorized');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
