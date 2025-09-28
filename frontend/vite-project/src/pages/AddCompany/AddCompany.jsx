import React, { useState } from 'react';
import axios from 'axios';
import "./AddCompany.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/v1/company/add";
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("Please login to add company");
        return;
      }

      // Send the request with token
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
        withCredentials: true,
      });

      toast.success("Company Added");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else {
        toast.error("Failed to add company");
      }
    }
  };

  return (
    <div className="logiin">
      <div className="login__container" style={{ height: "80%" }}>
        <form onSubmit={onHandleSubmit}>
          <h2>Add Company</h2>
          <div className="login__input">
            <div className="name">
              <label>Company Name</label>
              <input
                type="text"
                name='name'
                value={formData.name}
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

            <div className="website">
              <label>Website</label>
              <input
                type="text"
                name='website'
                value={formData.website}
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
          </div>

          <button type="submit">Post</button>

          <div className="terms">
            <div className="guidelines">
              <span>By continuing, you agree to our Terms of Service and Privacy Policy.</span>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddCompany;
