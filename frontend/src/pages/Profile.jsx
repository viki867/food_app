import { useState } from "react";
import "./Profile.css";
import axios from "axios";
function Profile({ user }) {
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };


  const saveChanges = () => {
    axios.post("http://localhost:5000/update-profile", {
      username: updatedUser.username,
      mobile: updatedUser.mobile,
      address: updatedUser.address,
      email: updatedUser.email
    })
      .then(res => alert(res.data))
      .catch(err => alert("Error updating profile"));
    
    setEditMode(false);
  };
  return (
    <div className="profile-container">

      <div className="profile-box">
       <h2 className="profile-title">My Profile</h2>
        <label>Username:</label>
        <input
          name="username"
          value={updatedUser.username}
          onChange={handleChange}
          disabled={!editMode}
        />

        <label>Mobile Number:</label>
        <input
          name="mobile"
          value={updatedUser.mobile}
          onChange={handleChange}
          disabled={!editMode}
        />
       


        <label>Delivery Address:</label>
        <textarea
          name="address"
          value={updatedUser.address}
          onChange={handleChange}
          disabled={!editMode}
        />

        <div className="profile-btns">
          {editMode ? (
            <button className="save-btn" onClick={saveChanges}>Save</button>
          ) : (
            <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
