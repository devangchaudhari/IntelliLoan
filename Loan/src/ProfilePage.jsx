import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    dob: '',
    profileImage: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('https://intelli-loan-backend.vercel.app/routes/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          if (data.profileImage) {
            setImagePreview(data.profileImage);
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, profileImage: file });
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', profileData.name);
    formData.append('phone', profileData.phone);
    formData.append('dob', profileData.dob);
    if (profileData.profileImage) {
      formData.append('profileImage', profileData.profileImage);
    }

    try {
      const response = await fetch('https://intelli-loan-backend.vercel.app/routes/auth/profile', {
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: formData,
      });

      if (response.ok) {
        const updatedData = await response.json();
        setProfileData(updatedData);
        setImagePreview(updatedData.profileImage); // Update image preview with new image
      } else {
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h1>Profile</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            required
          />
          <input
            type="date"
            name="dob"
            value={profileData.dob}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && <img src={imagePreview} alt="Profile Preview" width="100" height="100" />}
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
