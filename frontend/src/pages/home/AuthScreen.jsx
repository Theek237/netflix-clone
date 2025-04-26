import React from "react";
import { useState } from "react";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import netflixLogo from "../../assets/netflix-logo.png";
import tvImage from "../../assets/tv.png";
import heroVideo from "../../assets/hero-vid.m4v";
import stLarge from "../../assets/stranger-things-lg.png";
import stSmall from "../../assets/stranger-things-sm.png";
import deviceImage from "../../assets/device-pile.png";
import deviceVideo from "../../assets/video-devices.m4v";
import kidsImage from "../../assets/kids.png";
import Footer from "../../components/Footer";

const AuthScreen = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    navigate("/signup?email=" + email);
  };

  return (
    <div className="h-min-screen hero-bg-two">
      {/* Navbar */}
      <header className="flex items-center justify-between w-full max-w-5xl px-10 pt-4 md:mx-auto ">
        <img src={netflixLogo} alt="logo" className="w-35 md:w-42" />
        <Link to="/login">
          <button className="text-white md:text-sm text-xs font-medium bg-red-600 px-3 py-[6px] rounded-sm cursor-pointer hover:bg-red-700">
            Sign In
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <div className="flex justify-center pt-20 md:pt-35">
        <div className="flex flex-col items-center w-full gap-3 text-center md:max-w-2xl max-w-3/4">
          <div className="tracking-tight text-white md:text-6xl text-4xl font-[800] text-center ">
            Unlimited movies, TV shows, and more
          </div>
          <div className="text-white md:text-xl text-md mt-3 max-md:mt-1 max-md:mb-2 font-[500]">
            Starts at USD 2.99. Cancel anytime.
          </div>
          <div className="mt-2 text-xs text-white md:text-base font-extralight md:font-normal md:mt-3">
            Ready to watch? Enter your email to create or restart your
            membership.
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col justify-between w-full h-8 gap-2 px-12 mt-2 md:flex-row max-md:px-3 md:h-14 mb-30"
          >
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full p-5 text-lg text-white border-2 rounded-sm border-gray-400/50 bg-black/40 max-md:p-3 max-md:text-base max-md:text-center focus:outline-none"
            ></input>

            <button className="flex items-center justify-center px-5 py-3 text-2xl font-medium text-white bg-red-600 rounded-sm cursor-pointer max-md:font-normal max-md:w-full max-md:text-xl w-80 pl-7 hover:bg-red-700">
              Get Started <ChevronRight className="md:size-8 size-6" />
            </button>
          </form>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-[6px] bg-gray-800 " />

      {/* Section 1 */}
      <div className="flex flex-col items-center justify-between w-full pt-6 pb-8 mx-auto text-center text-white bg-black md:px-25 lg:px-45 md:flex-row md:pb-12 md:pt-10">
        {/* left side */}
        <div className="flex-1 mt-4">
          <h1 className="text-3xl font-bold md:font-black md:text-left lg:text-5xl md:text-4xl">
            Enjoy on your TV
          </h1>
          <p className="px-10 pt-4 mx-2 text-sm font-light md:text-left md:mx-0 md:px-0 md:font-normal lg:text-xl md:pt-5">
            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
            players, and more.
          </p>
        </div>
        {/* right side */}
        <div className="relative flex-1">
          <img src={tvImage} alt="TV Image" className="relative z-20 p-2" />
          <video
            className="absolute z-10 -translate-x-1/2 -translate-y-20/37 top-1/2 left-1/2 h-1/2"
            playsInline
            autoPlay={true}
            muted
            loop
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-[6px] bg-gray-800" />

      {/* Section 2 */}
      <div className="flex flex-col-reverse items-center justify-between w-full pt-6 pb-20 mx-auto text-center text-white bg-black md:px-25 lg:px-45 md:flex-row md:pt-10">
        {/* left side */}
        <div className="flex-1">
          <img src={stLarge} alt="Stranger Things Image" />
        </div>

        {/* right side */}
        <div className="flex-1">
          <h1 className="pt-10 mx-3 text-3xl font-bold md:mx-0 md:pt-15 md:font-black md:text-left lg:text-5xl md:text-4xl">
            Download your shows to watch offline
          </h1>
          <p className="px-10 pt-4 mx-2 text-sm font-light md:text-left md:mx-0 md:px-0 md:font-normal lg:text-xl md:pt-5">
            Watch on a plane, train, or submarine...
          </p>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-[6px] bg-gray-800 " />

      {/* Section 3 */}
      <div className="flex flex-col items-center justify-between w-full pt-6 mx-auto text-center text-white bg-black md:px-25 lg:px-45 md:flex-row md:pb-12 md:pt-10">
        {/* left side */}
        <div className="flex-1 mt-4">
          <h1 className="text-3xl font-bold md:font-black md:text-left lg:text-5xl md:text-4xl">
            Watch everywhere{" "}
          </h1>
          <p className="px-10 pt-4 mx-2 text-sm font-light md:text-left md:mx-0 md:px-0 md:font-normal lg:text-xl md:pt-5">
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </p>
        </div>
        {/* right side */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={deviceImage}
            alt="Device Image"
            className="relative z-20 p-2"
          />
          <video
            className="absolute z-10 -translate-x-1/2  top-2 left-1/2 h-4/6 max-w-[63%]"
            playsInline
            autoPlay={true}
            muted
            loop
          >
            <source src={deviceVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-[6px] bg-gray-800" />

      {/* Section 2 */}
      <div className="flex flex-col-reverse items-center justify-between w-full pb-20 mx-auto text-center text-white bg-black pt-9 md:px-25 lg:px-45 md:flex-row md:pt-10">
        {/* left side */}
        <div className="flex-1">
          <img src={kidsImage} alt="Kids Image" />
        </div>

        {/* right side */}
        <div className="flex-1">
          <h1 className="pt-10 mx-3 text-3xl font-bold md:mx-0 md:pt-15 md:font-black md:text-left lg:text-5xl md:text-4xl">
            Create profiles for kids{" "}
          </h1>
          <p className="px-10 pt-4 mx-2 text-sm font-light md:text-left md:mx-0 md:px-0 md:font-normal lg:text-xl md:pt-5">
            Send kids on adventures with their favorite characters in a space
            made just for them—free with your membership.{" "}
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AuthScreen;
