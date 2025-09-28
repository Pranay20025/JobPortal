import React, { useEffect, useState } from 'react';
import './GetApplicant.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ApplicationCard from '../../components/ApplicationCard/ApplicationCard';

const GetApplicant = () => {
  const [applicants, setApplicants] = useState([]);
  const { jobId } = useParams();




  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/v1/application/${jobId}/applicants`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );

        if (response.data.success && response.data.applications) {
          const { applications } = response.data;
          setApplicants(applications);

        }
      } catch (error) {
        console.error('Failed to fetch applicants:', error);
      }
    };

    fetchApplicants();
  }, []); 

  return (
    <div>
     <center> <h1>Applicants for Job</h1></center>
      {
        applicants.map((applicant, index) => {
          return (
            <ApplicationCard key={index} applican={applicant}/>
          )
        })
      }
    </div>
  );
};

export default GetApplicant;
