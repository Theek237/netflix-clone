import React, { useEffect } from "react";
import netflixLogo from "../assets/netflix-logo.png";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [searchParams] = useSearchParams();

  const { signup } = useAuthStore();

  useEffect(() => {
    const urlEmail = searchParams.get("email");
    if (urlEmail) {
      setEmail(urlEmail);
    }
  }, [searchParams]);

  const handleSignUp = (e) => {
    e.preventDefault();
    signup({ email, username, password });
  };

  return (
    <div className="w-full h-screen bg-cover hero-bg ">
      <header className="flex items-center justify-between max-w-5xl pt-4 mx-auto ">
        <Link to="/">
          <img src={netflixLogo} alt="logo" className="w-42" />
        </Link>
      </header>
      <div className="flex justify-center pt-10 align-center">
        <div className="flex flex-col w-full max-w-md p-12 rounded-lg bg-black/70">
          <h1 className="text-3xl font-bold text-white">Sign Up</h1>
          <form onSubmit={handleSignUp} className="p-0 mt-7">
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
                type="text"
                placeholder="User Name"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="w-full p-4 text-white border-gray-400 rounded-sm focus:outline-none border-1 bg-black/40"
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
              Already a member?{" "}
              <Link to="/login">
                <span className="text-red-500 hover:underline">Log In.</span>
              </Link>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
