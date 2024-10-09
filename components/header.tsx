"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoginTabVisible, setLoginTabVisible] = useState<boolean>(true);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter();

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

  const handleLogin = async () => {
    try {
      setLoading(true)
      const resp = await axios.post('/api/auth', { username, password })
      localStorage.setItem('token', resp.data.message.token)
      setLoading(false)
      router.push("/dashboard");
      handleCloseModal()
    } catch (error: any) {
      if (error.status == 401) {
        toast.error('Neispravni kredencijali.')
      } else {
        console.log(error)
        toast.error('Greksa na serveru')
      }
      console.log(error)
      setLoading(false)

    }
  }

  return (
    <>
      <ToastContainer />
      <header className="bg-primary-bg flex py-2">
        <RingLoader
          loading={loading}
          color={'#1c7aad'}
          cssOverride={{
            position: "fixed",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 1
          }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <div className="w-8/12 ml-7 header-title" >
          <p className="py-2 font-medium">Saša Barber</p>
        </div>
        <div className="justify-center items-center flex nav "  >
          <a href="#about" ><p className="mx-4 py-2 cursor-pointer font-medium">O name</p></a>
          <a href="#services"><p className="mx-4 py-2 cursor-pointer font-medium">Usluge</p></a>
          <a href="#contact"><p className="mx-4 py-2 cursor-pointer font-medium">Kontakt</p></a>
          <p
            className="mx-4 py-2 cursor-pointer font-medium"
            onClick={handleOpenModal}
          >
            Prijava
          </p>
        </div>
        <p
          className="mx-4 py-2 cursor-pointer font-medium open-nav"
          onClick={handleOpenModal}
        >
          Prijava
        </p>
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

              </div>
              {isLoginTabVisible ? (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    className="w-full p-2 mb-4 border border-gray-300 rounded text-black focus:outline-none focus:border-black"
                    onChange={(v: any) => setUsername(v.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(v: any) => setPassword(v.target.value)}
                    className="w-full p-2 mb-6 border border-gray-300 rounded text-black focus:outline-none focus:border-black"
                  />
                  <button
                    className="w-full bg-primary-grey-bg text-white py-2 rounded hover:bg-secondary-grey-bg transition duration-200"
                    onClick={handleLogin}
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
    </>

  );
};

export default Header;
