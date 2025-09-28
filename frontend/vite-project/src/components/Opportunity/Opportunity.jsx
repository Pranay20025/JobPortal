import React, { useEffect, useState } from 'react';
import './Opportunity.css';
import JobCard from '../JobCard/JobCard';
import axios from 'axios';

const Opportunity = () => {

  const [jobss, setJobss] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchJobsList = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/job/get");
        const { Jobs } = response.data;
        setJobss(Jobs);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchJobsList();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Network Error</p>;
  }

  if (jobss.length === 0) {
    return <p>No opportunities available at the moment.</p>;
  }

  return (
    <div className="opportunity">
     <center><h1 className='he'>Opportunities Available</h1></center>
    <center><p>There are many opportunities available for you to grow and learn. Here are a few of them:</p></center>
      <div className="opportunity-list">
        <div>
          <center><h1>Jobs</h1></center>
          {
            jobss.map((job) => (
              <JobCard key={job._id} job={job} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Opportunity;
