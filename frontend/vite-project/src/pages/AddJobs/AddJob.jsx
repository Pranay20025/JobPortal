import React, { useState } from 'react'
import "./AddJob.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'

const AddJob = () => {

const [formData, setFormData] = useState({
  title: "",
  description: "",
  location: "",
  jobType: "",
  position: "",
  experience: "",
  salary: "",
  requirements: "",
  companyId:"",
})

const onHandleChange = (e) =>{
  const {name , value} = e.target;
  setFormData({...formData, [name]: value})
}

const onHandleSubmit = async (e) =>{
e.preventDefault();
try {
  const url = "http://localhost:8000/api/v1/job/register"
  const token = localStorage.getItem("token");

  if(!token){
    alert("Please login first")
  }

  const response = await axios.post(url, formData, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true,
  });
  toast.success("Job Added");
} catch (error) {
  console.log(error);
  toast.error("Something Went Wrong");
}
}

  return (
    <div className="logiiin">
    <div className="login__container" style={{ height: "100%" }}>
      <form onSubmit={onHandleSubmit}>
        <h6>Add Job</h6>
        <div className="login__input">
          <div className="name">
            <label>Job Name</label>
            <input
              type="text"
              name='title'
              value={formData.title}
              onChange={onHandleChange}
              required
            />
          </div>

          <div className="description">
            <label>Description</label>
            <input
              type="text"
              name='description'
              value={formData.description}
              onChange={onHandleChange}
              required
            />
          </div>

          <div className="requirements">
            <label>Requirements</label>
            <input
              type="text"
              name='requirements'
              value={formData.requirements}
              onChange={onHandleChange}
              required
            />
          </div>

          <div className="Experience">
            <label>Experience</label>
            <input
              type="text"
              name='experience'
              value={formData.experience}
              onChange={onHandleChange}
              required
            />
          </div>

          <div className="salary">
            <label>Salary</label>
            <input
              type="text"
              name='salary'
              value={formData.salary}
              onChange={onHandleChange}
              required
            />
          </div>

          <div className="location">
            <label>Location</label>
            <input
              type="text"
              name='location'
              value={formData.location}
              onChange={onHandleChange}
              required
            />
          </div>

          <div className="jobtype">
            <label>Job Type</label>
            <input
              type="text"
              name='jobType'
              value={formData.jobType}
              onChange={onHandleChange}
              required
            />
          </div>

          <div className="position">
            <label>Position</label>
            <input
              type="text"
              name='position'
              onChange={onHandleChange}
              required
            />
          </div>
        </div>

        <div className="description">
            <label>CompanyId</label>
            <input
              type="text"
              name='companyId'
              value={formData.companyId}
              onChange={onHandleChange}
              required
            />
          </div>

        <button type="submit">Post</button>
      </form>
      <ToastContainer />
    </div>
  </div>
  )
}

export default AddJob