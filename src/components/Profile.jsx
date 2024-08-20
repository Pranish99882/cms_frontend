import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addProfile } from "../profileSlice";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    roleNames: "",
  });
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          withCredentials: true,
        });

        const userData = {
          username: response.data.username,
          email: response.data.email,
          roleNames: response.data.roleNames,
        };

        dispatch(addProfile(userData));
        setLoading(false);
      } catch (err) {
        setError(`Error fetching profile information: ${err.message}`);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  const handleEditClick = () => {
    setFormData({
      username: profile.username,
      email: profile.email,
      roleNames: profile.roleNames,
    });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put("http://localhost:3000/profile", formData, {
        withCredentials: true,
      });
      dispatch(addProfile(formData));
      setIsEditing(false);
    } catch (err) {
      setError(`Error saving profile information: ${err.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 shadow-md rounded-lg max-w-xs w-full">
        <div className="flex justify-center mb-4">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile"
            className="rounded-full h-24 w-24 object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Profile Information
        </h2>
        <div>
          <div className="mb-4">
            <strong>Username:</strong> {profile.username}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {profile.email}
          </div>
          <div className="mb-4">
            <strong>Role Names:</strong> {profile.roleNames}
          </div>
        </div>
        <button
          onClick={handleEditClick}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Edit
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label className="block font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Role Names</label>
              <input
                type="text"
                name="roleNames"
                value={formData.roleNames}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="mr-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
