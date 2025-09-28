import React, { useEffect, useState } from 'react';
import './JobCard.css';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';

const JobCard = ({ job }) => {
  const { userRole } = useAuth();
  const [isApplied, setIsApplied] = useState(false);
  const [statusButtonVisible, setStatusButtonVisible] = useState(false);
  const [statuss, setStatuss] = useState("");
  const navigate = useNavigate();
  const { companyId } = useParams();

  useEffect(()=>{
    const checkStatus = async () =>{
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/api/v1/application/${job._id}/updatedstatus`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const {status} = response.data;
        setStatuss(status);
        console.log(status);
      } catch (error) {
        console.log(error);
      }
    }
    checkStatus();
  },[])
  

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8000/api/v1/application/apply/${job._id}`, 
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response.data) {
        console.log(response.data);
        toast.success("Applied Successfully");
        setIsApplied(true);
        setStatusButtonVisible(true); // Show status button
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const onClickJob = () => {
    if (userRole === "admin") {
      navigate(`/getCompanies/${companyId}/getJobs/${job._id}`);
    }
  };

  return (
    <div className="job-card" onClick={onClickJob}>
      <div className="jobcard-content">
        <h2 className="job-title">{job.title}</h2>
        <p className="job-location">Location: {job.location}</p>
        <p className="job-experience">Experience: {job.experience} years</p>
        <p className="job-salary">Salary: {job.salary}</p>
        <p className="job-requirements">Requirements: {job.requirements}</p>
        <p className="job-description">Description: {job.description}</p>
        <p className="job-type">Job Type: {job.jobType}</p>
        <p className="job-position">Position: {job.position}</p>
        <p className="job-company">Company: {job.companyId}</p>
      </div>
      <div className="jobcard-actions">
        {userRole === "student" ? (
          <>
            <button 
              className="apply-button" 
              onClick={handleApply} 
              disabled={isApplied}
            >
              {isApplied ? "Applied" : "Apply"}
            </button>
            {statusButtonVisible && (
              <button className="status-button" disabled>
                Status: {statuss}
              </button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default JobCard;
