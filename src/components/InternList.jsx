import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateUserModal from "./CreateUserModal"; 

const InternList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [warning, setWarning] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [usersPerPage, setUsersPerPage] = useState(10); 
  
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const endpoint = searchQuery
          ? `http://localhost:3000/searchUser?q=${encodeURIComponent(searchQuery)}&page=${currentPage}&limit=${usersPerPage}`
          : `http://localhost:3000/getAllUsers?page=${currentPage}&limit=${usersPerPage}`;
  
        const response = await axios.get(endpoint, {
          withCredentials: true,
        });
  
        let fetchedUsers;
        let page = 1;
        let totalPages = 1;
  
        if (searchQuery) {
          // Handle response from searchUser endpoint
          fetchedUsers = response.data.users.map((result) => result._source); // Extract _source from search results
          page = response.data.currentPage;
          totalPages = response.data.totalPages;
        } else {
          fetchedUsers = response.data.users;
          page = response.data.currentPage;
          totalPages = response.data.totalPages;
        }
  
        setUsers(fetchedUsers);
        setTotalPages(totalPages);
        setLoading(false);
  
        const currentUser = fetchedUsers.find(
          (user) => user.email === localStorage.getItem("userEmail")
        );
        if (currentUser && currentUser.roleNames.includes("Admin")) {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Error fetching users");
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, [searchQuery, currentPage, usersPerPage]); 
  

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
    // if (newUser.roleNames !== "Admin")
     setUsers([...users, newUser]); // Add new user to the list
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Pagination handler
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
            onClick={() => setIsModalOpen(true)} 
          >
            Create
          </button>
        )}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 p-2 rounded-lg w-60"
          />
        </div>
        {warning && (
          <div className="warning-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Warning:</strong>
            <span className="block sm:inline">{warning}</span>
          </div>
        )}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300 text-center">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Username</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Email</th>
              <th className="px-4 py-2 border border-gray-300 text-center">isActive</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Role Names</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="px-4 py-2 border border-gray-300 text-center">{user.id}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">{user.username}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">{user.email}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">{user.isActive ? "Active" : "Inactive"}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">{user.roleNames}</td>
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
        <div className="mt-4 flex justify-between items-center">
          <button
            className="pagination-button bg-gray-300 text-gray-800 py-1 px-2 rounded-md hover:bg-gray-400 transition duration-300"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className="text-gray-800">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-button bg-gray-300 text-gray-800 py-1 px-2 rounded-md hover:bg-gray-400 transition duration-300"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <br />
     
      {isModalOpen && (
        <CreateUserModal
          onClose={() => setIsModalOpen(false)}
          onUserCreated={handleCreateUser} 
        />
      )}
    </div>
  );
};

export default InternList;
