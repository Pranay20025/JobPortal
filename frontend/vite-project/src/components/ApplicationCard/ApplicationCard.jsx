import React, { useState } from 'react'
import "./ApplicationCard.css"
import axios from 'axios';


const ApplicationCard = ({applican}) => {

  const { applicant, job } = applican;
  const [formData , setFormData] = useState({
    status: applican.status ||"",
  });

  const onChangeHandler = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  
  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`http://localhost:8000/api/v1/application/${job}/updatestatus/${applicant._id}`,formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const {application} = response.data;
      console.log(application);
      alert("Application status updated");

    } catch (error) {
      console.log(error);
      alert("Error");
    }
  }

  return (
 <div className="application-card">
      <center><h3>Application</h3></center>
      <div className="application-card">
        <h2>{applicant.fullName}</h2>
        <p><strong>Email:</strong> {applicant.email}</p>
        <p><strong>Phone:</strong> {applicant.phoneNumber}</p>
        <p><strong>Skills:</strong> {applicant.profile.skills.join(', ')}</p>
        <p><strong>Bio:</strong> {applicant.profile.bio}</p>
        <p><strong>Company:</strong> {applicant.profile.company}</p>
      </div>

      <div className="application-card">
        <form onSubmit={onSubmitHandler}>
      <select id="status" onChange={onChangeHandler} name='status' value={formData.status} >
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
      <button type='submit'>Update Status</button>
      </form>
      <div className="updated">
        Update Status: {applican.status}</div>
      </div>

     
  </div>
  )
}

export default ApplicationCard