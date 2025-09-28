import React, { useEffect, useState } from 'react';
import './GetJobs.css';
import axios from 'axios';
import JobCard from '../../components/JobCard/JobCard';
import { useAuth } from '../../AuthContext';

const GetJobs = () => {
  const [jobs, setJobs] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors
  const { setJobss } = useAuth();

  useEffect(() => {
    const fetchJobList = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please login first.');
          setLoading(false);
          return;
        }
        const response = await axios.get('http://localhost:8000/api/v1/job/getadminjobs', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const { Jobs } = response.data; // Use the correct field name from the response
        setJobs(Jobs);
        setJobss(Jobs);
      } catch (error) {
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobList();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
    <center>      <h1>Jobs</h1></center>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default GetJobs;
