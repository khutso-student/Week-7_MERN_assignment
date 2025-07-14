import React from 'react';
import { useState, useContext } from "react";
import { signup } from '../services/authAPI';
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { PiUserLight } from "react-icons/pi";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

export default function Signup() {
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('SUBMITTING:', formData);

    try {
      const res = await signup(formData);
      login(res.user, res.token);
      navigate('/taskdashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-[#f5f5f5]">
      <h1 className="text-[#181717] text-xl font-bold mb-2">Task Management</h1>
      <p className="text-[#3b3b3b] text-md mb-4">Welcome to task management</p>

      <div className="flex flex-col justify-center items-center p-4 bg-white w-70 h-70 border border-[#e6e5e5] rounded-xl">
        <h1 className="text-md text-[#000] font-bold mb-4">Sign up</h1>
        
        {/* Error message */}
        {error && (
          <p className="text-red-600 text-sm mb-2 font-semibold text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex justify-center items-center gap-2 border border-[#999999] w-full mb-4 rounded-md py-1 px-4">
            <PiUserLight className="text-[18px]" />
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="focus:outline-none text-sm w-full"
              required
            />
          </div>

          <div className="flex justify-center items-center gap-2 border border-[#999999] w-full mb-4 rounded-md py-1 px-4">
            <MdOutlineMail className="text-[18px]" />
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="focus:outline-none text-sm w-full"
              required
            />
          </div>

          <div className="flex justify-center items-center gap-2 border border-[#999999] w-full mb-4 rounded-md py-1 px-4">
            <CiLock className="text-[18px]" />
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="focus:outline-none text-sm w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 rounded-md p-1.5 text-white text-sm cursor-pointer hover:bg-blue-500 duration-300"
          >
            Sign up
          </button>
        </form>

        <div className="flex justify-center items-center w-full mt-2">
          <p className="text-[#3b3b3b] text-sm">Have account?</p>
          <Link
            to="/login"
            className="text-blue-500 ml-1 text-sm font-bold hover:text-blue-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
