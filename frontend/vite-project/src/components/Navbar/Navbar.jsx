import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../authContext';

const Navbar = () => {
  const [state, setState] = useState("Home");
  const { isAuthenticated, userRole, logoutUser, companiess } = useAuth();
  const [showDropDown, setShowDropDown] = useState(false);
  


  const onEnter = () => {
    setShowDropDown(true);
  };

  const onLeave = () => {
    setShowDropDown(false);
  };


  return (
    <div className='navbar'>
      <div className="logo">
        <Link className='link' to={userRole === "student" ? "/" : "/admin"}>
          <h3>Code <span className='horizon'>Horizon</span></h3>
        </Link>
      </div>
      <div className="nav-menu">
        <Link to={userRole === "student" ? "/" : "/admin"}>
          <li onClick={() => setState("Home")}>
            Home {state === "Home" && <hr />}
          </li>
        </Link>
        {userRole === "student" && (
          <>
            <a onClick={() => setState("Jobs")}>
              Jobs {state === "Jobs" && <hr />}
            </a>
            <a onClick={() => setState("Browse")}>
              Browse {state === "Browse" && <hr />}
            </a>
          </>
        )}
        {userRole === "admin" && (
          <>
            <Link to="/addCompany" onClick={() => setState("addCompany")}>
              Add Company {state === "addCompany" && <hr />}
            </Link>
            <Link to="/getCompanies" onClick={() => setState("getCompanies")}>
              Companies {state === "getCompanies" && <hr />}
            </Link>
          </>
        )}
      </div>
      <div className="nav-user">
        {!isAuthenticated ? (
         <Link to="/login"><button>Login</button></Link>
        ) : (
          <>
          <div className="userprofile" onMouseEnter={onEnter}  onMouseLeave={onLeave}>
          <div className="img">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"  alt="" width={40}/>
          </div>
          {showDropDown &&(
            <>
            <Link to={"http://localhost:5173/Profile"}>Profile</Link>
            </>
          )}
          </div>
           <button onClick={logoutUser}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
