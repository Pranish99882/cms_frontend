import React from "react";
import { Link } from "react-router-dom";

const AlreadyPW = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Password Already Set</h1>
        <p className="text-gray-700 mb-4">
          Your password has already been set. Please{" "}
          <Link to="/loginData" className="text-indigo-600 hover:underline">
            visit the login page
          </Link>{" "}
          to log in.
        </p>
      </div>
    </div>
  );
};

export default AlreadyPW;
