import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import netflixLogo from "../assets/netflix-logo.png";
import { useAuthStore } from "../store/authUser";
const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password);
    login({ email, password });
  };
  return (
    <div className="h-screen bg-cover hero-bg">
      <header className="flex items-center justify-between max-w-5xl pt-4 mx-auto ">
        <Link to="/">
          <img src={netflixLogo} alt="logo" className="w-42" />
        </Link>
      </header>
      <div className="flex justify-center pt-10 align-center">
        <div className="flex flex-col w-full max-w-md p-12 rounded-lg bg-black/70">
          <h1 className="text-3xl font-bold text-white">Log In</h1>
          <form onSubmit={handleSubmit} className="p-0 mt-7">
            <div className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full p-4 text-white border-gray-400 rounded-sm focus:outline-none border-1 bg-black/40 "
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full p-4 text-white border-gray-400 rounded-sm focus:outline-none border-1 bg-black/40"
              />
            </div>
            <button className="w-full py-3 mt-5 mb-3 font-medium text-white bg-red-600 rounded-sm cursor-pointer hover:bg-red-700">
              Sign Up
            </button>
            <h4 className="w-full p-0 mb-0 text-center text-white/80 ">
              Don't have account?{" "}
              <Link to="/signup">
                <span className="text-red-500 hover:underline">Sign Up.</span>
              </Link>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
