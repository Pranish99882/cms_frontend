import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateUserModal from "./CreateUserModal"; // Import the modal component

const InternList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [warning, setWarning] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getAllUsers", {
          withCredentials: true,
        });
        const onlyUser = response.data.filter((user) =>
          user.roleNames.includes("User")
        );
        setUsers(onlyUser);
        setLoading(false);

        const currentUser = response.data.find(
          (user) => user.email === localStorage.getItem("userEmail")
        );
        if (currentUser && currentUser.roleNames.includes("Admin")) {
          setIsAdmin(true);
        }
      } catch (err) {
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/userDelete/${userId}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user.id !== userId));
      setWarning(""); // Clear warning message on successful deletion
    } catch (err) {
      if (err.response && err.response.data) {
        setWarning(err.response.data.message || "Error deleting user");
      } else {
        setWarning("Error deleting user");
      }
      console.error("Error deleting user:", err);
    }
  };

  const handleCreateUser = (newUser) => {
    if (newUser.roleNames !== "Admin") setUsers([...users, newUser]); // Add new user to the list
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="list-container bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">User Listing</h2>
        {isAdmin && (
          <button
            className="create-button bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition duration-300 mb-4"
            onClick={() => setIsModalOpen(true)} // Open the modal on click
          >
            Create
          </button>
        )}
        {warning && (
          <div className="warning-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Warning:</strong>
            <span className="block sm:inline">{warning}</span>
          </div>
        )}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300 text-center">
                ID
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Username
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Email
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                isActive
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Role Names
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {user.id}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {user.username}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {user.email}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {user.isActive ? "Active" : "Inactive"}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {user.roleNames}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <button
                    className="delete-button bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-300"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      {isAdmin && (
        <Link to={`/admin_listing`}>
          <button
            className="create-button bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition duration-300 mb-4"
            onClick={() => console.log("Create user modal logic here")}
          >
            ADMIN-TABLE
          </button>
        </Link>
      )}
      {isModalOpen && (
        <CreateUserModal
          onClose={() => setIsModalOpen(false)} // Close the modal
          onUserCreated={handleCreateUser} // Handle the new user creation
        />
      )}
    </div>
  );
};

export default InternList;
