import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card'; // Ensure this path is correct
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthContext';

const GetCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const { setCompaniess } = useAuth();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please Login");
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8000/api/v1/company/get', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Check if the response structure is correct
        if (response.data && response.data.success && response.data.companies) {
          setCompanies(response.data.companies);
          setCompaniess(response.data.companies);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (err) {
        // Log more detailed error information
        console.error('Error fetching companies:', err);
        setError(err.response?.data?.message || err.message || 'Error fetching companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <center><h1>Companies</h1></center>
      <div className="card-container">
        {companies.length > 0 ? (
          companies.map((company) => (
            <Card
              key={company._id} // Ensure _id is the unique identifier
              company= {company}
            />
          ))
        ) : (
          <p>No companies available.</p>
        )}
      </div>
    </div>
  );
};

export default GetCompanies;
