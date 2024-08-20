import React, { useState } from "react";
import axios from "axios";

const CreateUserModal = ({ onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    roleNames: "User",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/createUser", {
        ...formData,
        password: "defaultPassword", // Provide a default password or allow the user to set one
      });

      onUserCreated(response.data.user); // Notify parent component of new user
      onClose(); // Close the modal after successful creation
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error creating user");
      } else {
        setError("Error creating user");
      }
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal bg-white p-8 rounded-lg shadow-lg w-96 max-w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Create New User</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Role</label>
            <select
              name="roleNames"
              value={formData.roleNames}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 px-5 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-500 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
