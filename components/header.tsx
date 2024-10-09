"use client";
import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoginTabVisible, setLoginTabVisible] = useState<boolean>(true);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleTabClick = () => {
    setLoginTabVisible(!isLoginTabVisible);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <header className="bg-primary-bg flex py-2">
      <div className="w-8/12 ml-7">
        <p className="py-2 font-medium">Sasa barber</p>
      </div>
      <div className="justify-center items-center flex nav "  >
        <a href="#about" ><p className="mx-4 py-2 cursor-pointer font-medium">About</p></a>
        <a href="#services"><p className="mx-4 py-2 cursor-pointer font-medium">Services</p></a>
        <a href="#contact"><p className="mx-4 py-2 cursor-pointer font-medium">Contact</p></a>
        {/* <p
          className="mx-4 py-2 cursor-pointer font-medium"
          onClick={handleOpenModal}
        >
          Sign in
        </p> */}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-primary-bg bg-opacity-50 flex items-center justify-center z-50 animate-fade-in"
          onClick={handleOutsideClick}
        >
          <div className="bg-primary-bg w-96 p-8 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate-slide-up relative">
            <button
              className="absolute top-2 right-4 text-white text-2xl font-bold cursor-pointer"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <div className="flex justify-between mb-6">
              <h2
                className={`text-2xl font-semibold cursor-pointer transition-colors duration-300 ${isLoginTabVisible
                  ? "text-white border-b-2 border-primary-border"
                  : "text-secondary-grey-bg"
                  }`}
                onClick={handleTabClick}
              >
                Login
              </h2>
              <h2
                className={`text-2xl font-semibold cursor-pointer transition-colors duration-300 ${!isLoginTabVisible
                  ? "text-white border-b-2 border-primary-border"
                  : "text-secondary-grey-bg"
                  }`}
                onClick={handleTabClick}
              >
                SignUp
              </h2>
            </div>
            {isLoginTabVisible ? (
              <>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-2 mb-4 border border-gray-300 rounded text-black focus:outline-none focus:border-black"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 mb-6 border border-gray-300 rounded text-black focus:outline-none focus:border-black"
                />
                <button
                  className="w-full bg-primary-grey-bg text-white py-2 rounded hover:bg-secondary-grey-bg transition duration-200"
                  onClick={handleCloseModal}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 mb-4 border border-gray-300 rounded text-black focus:outline-none focus:border-black"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-2 mb-4 border border-gray-300 rounded text-black focus:outline-none focus:border-black"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 mb-4 border border-gray-300 rounded text-black focus:outline-none focus:border-black"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-2 mb-6 border border-gray-300 rounded text-black focus:outline-none focus:border-black"
                />
                <button
                  className="w-full bg-primary-grey-bg text-white py-2 rounded hover:bg-secondary-grey-bg transition duration-200"
                  onClick={handleCloseModal}
                >
                  SignUp
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
