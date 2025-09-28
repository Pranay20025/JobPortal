import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Profile.css";

const Profile = () => {
  const [userr, setUserr] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
    profile: {
      bio: "",
      company: "",
      skills: [],
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { user } = response.data;
        setUserr(user);

        // Initialize editData after the user is fetched
        setEditData({
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: {
            bio: user.profile.bio,
            company: user.profile.company,
            skills: user.profile.skills.join(', '),
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    if (e.target.name === "skills") {
      setEditData({
        ...editData,
        profile: {
          ...editData.profile,
          skills: e.target.value,
        }
      });
    } else if (e.target.name === "bio" || e.target.name === "company") {
      setEditData({
        ...editData,
        profile: {
          ...editData.profile,
          [e.target.name]: e.target.value,
        }
      });
    } else {
      setEditData({
        ...editData,
        [e.target.name]: e.target.value
      });
    }
  };

  const onHandleChanged = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8000/api/v1/user/profile/update", editData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { user } = response.data;
      setUserr(user);
      setIsEditing(false);
      alert("Profile Updated");
    } catch (error) {
      console.log(error);
    }
  };

  if (!userr) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2 className="profile-name">{userr.fullName}</h2>
        <p className="profile-role">{userr.role}</p>
      </div>
      <div className="profile-details">
        <p><strong>Phone Number:</strong> {userr.phoneNumber}</p>
        <p><strong>Email:</strong> {userr.email}</p>
        <p><strong>Bio:</strong> {userr.profile.bio}</p>
        <p><strong>Skills:</strong> {userr.profile.skills.join(', ')}</p>
        <p><strong>Company:</strong> {userr.profile.company}</p>
      </div>
      
      {!isEditing ? (
        <button className="edit-btn" onClick={handleEditClick}>Edit</button>
      ) : (
        <div className="edit-form">
          <div>
            <label>Bio:</label>
            <textarea name="bio" value={editData.profile.bio} onChange={handleChange} />
          </div>
          <div>
            <label>Company:</label>
            <input type="text" name="company" value={editData.profile.company} onChange={handleChange} />
          </div>
          <div>
            <label>Skills (comma-separated):</label>
            <input type="text" name="skills" value={editData.profile.skills} onChange={handleChange} />
          </div>
          <button className="change-btn" onClick={onHandleChanged}>Change</button>
          <button className="cancel-btn" onClick={handleEditClick}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
