import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../NavFooter/nav';

const AdminHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/home'); // Redirect non-admin users to home
    }
  }, [navigate]);

  return (
    <div>
        <Nav />
      <h1>Admin Home Page</h1>
      {/* Admin-specific content */}
    </div>
  );
};

export default AdminHome;
