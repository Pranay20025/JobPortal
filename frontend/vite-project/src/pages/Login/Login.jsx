import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContext';

const Login = () => {
  const {loginUser, setUserRole, tokenLS, setUser} = useAuth();
  const [login, setLogin] = useState("signup");
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/";
    
    try {
      let response;
      if (login === "signup") {
        response = await axios.post(url + "api/v1/user/register", formData);
      } else {
        response = await axios.post(url + "api/v1/user/login", formData);
      }
      const {user} = response.data;
      setUser(user);
      const { role } = response.data;
      const { token } = response.data;

      tokenLS(token);


      loginUser();
      if (role === "student") {
        setUserRole("student");
        navigate("/");
      } else if (role === "recruiter") {
        setUserRole("admin");
        navigate("/admin");
      } else {
        console.error("Unknown role:", role);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const containerHeight = login === "signup" ? "90%" : "70%";

  return (
    <div className='login'>
      <div className="login__container" style={{ height: containerHeight }}>
        <form onSubmit={onHandleSubmit}>
          <h2>{login === "signup" ? "Signup" : "Login"}</h2>
          <div className="login__input">
            <div className="email">
              <label>Email</label>
              <input
                type="email"
                name='email'
                onChange={onHandleChange}
                value={formData.email}
              />
            </div>
            {login === "signup" && (
              <>
                <div className="name">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name='fullName'
                    onChange={onHandleChange}
                    value={formData.fullName}
                  />
                </div>
                <div className="number">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name='phoneNumber'
                    onChange={onHandleChange}
                    value={formData.phoneNumber}
                  />
                </div>
                <label htmlFor="role">Role</label>
              </>
            )}
             <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={onHandleChange}
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="recruiter">Recruiter</option>
                </select>
            <div className="password">
              <label>Password</label>
              <input
                type="password"
                name='password'
                onChange={onHandleChange}
                value={formData.password}
              />
            </div>
          </div>
          
          <button type="submit">{login === "signup" ? "Signup" : "Login"}</button>
          
          <div className="terms">
            <div className="guidelines">
              <span>By continuing, you agree to our Terms of Service and Privacy Policy.</span>
            </div>
            <div className="signlog">
              {login === "signup" ? (
                <a href="#" onClick={() => setLogin("login")}>Login</a>
              ) : (
                <a href="#" onClick={() => setLogin("signup")}>Signup</a>
              )}
            </div>           
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
