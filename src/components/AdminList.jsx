import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getAllUsers", {
          withCredentials: true,
        });
        setUsers(response.data);
        const adminUsers = response.data.filter((user) =>
          user.roleNames.includes("Admin")
        );
        setUsers(adminUsers);
        setLoading(false);
      } catch (err) {
        setError("Error fetching users", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="list-container bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">User Listing</h2>
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
                Role Names
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
                  {user.roleNames}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
