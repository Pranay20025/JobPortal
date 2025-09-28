// AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole , setUserRole] = useState("student");
  const [token, setToken] = useState();
  const [companiess, setCompaniess] = useState();
  const [Jobss , setJobss] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const loginUser = () => setIsAuthenticated(true);
  const logoutUser = async () => {
    
    const url = "http://localhost:8000/api/v1/user/logout"
    let response = await axios.get(url);
    const {message} = response.data;
    localStorage.removeItem("token");
    console.log(message);
    setIsAuthenticated(false);
   navigate("/");
  }

  const tokenLS = (tokken) =>{
    localStorage.setItem('token', tokken);
    setToken[tokken];
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated,userRole,setUserRole, loginUser, logoutUser, tokenLS, token, setToken, setCompaniess, companiess, Jobss, setJobss, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
