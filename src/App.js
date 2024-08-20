import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegistrationForm from "./components/RegistrationForm";
import InternList from "./components/InternList";
import AdminList from "./components/AdminList";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SetPassword from "./components/SetPassword";
import AlreadyPW from "./components/AlreadyPW";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 h-screen">
        <Navbar />
        <div className="container mx-auto mt-20 px-4">
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/loginData" element={<Login />} />
            <Route path="/edit_profile" element={<Profile />} />
            <Route path="/intern_listing" element={<InternList />} />
            <Route path="/admin_listing" element={<AdminList />} />
            <Route path="/setPassword" element={<SetPassword />} />
            <Route path="/alreadyPW" element={<AlreadyPW />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
