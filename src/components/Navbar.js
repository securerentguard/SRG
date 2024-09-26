"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/SecureRentGuard_logo.jpg";
import avatar from "../public/images/avatar.png";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check for user data and token in localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const token = parsedUser.token; // Get token from user object
      if (token) {
        setUser(parsedUser);
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Logout functionality
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    router.push("/"); // Navigate to home after logout
  };

  // Toggle avatar menu and close hamburger menu
  const toggleAvatarMenu = () => {
    setAvatarMenuOpen(!avatarMenuOpen);
    setMenuOpen(false); // Close hamburger menu
  };

  // Toggle hamburger menu and close avatar menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setAvatarMenuOpen(false); // Close avatar menu
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/" passHref>
            <div className="flex items-center cursor-pointer">
              <Image src={logo} alt="SecureRentGuard" width={32} height={32} />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                SecureRentGuard
              </span>
            </div>
          </Link>
        </div>

        {/* Conditional Rendering for Logged In/Out */}
        <div className="flex md:order-2 space-x-3">
          {!isLoggedIn ? (
            <>
              <Link href="/login/tenant" passHref>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Register as Tenant
                </button>
              </Link>
              <Link href="/login/owner" passHref>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Register as Owner
                </button>
              </Link>
            </>
          ) : (
            <>
              {/* Create Contract Button */}
              <Link href="/dashboard/owner/createcontract" passHref>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Create Contract
                </button>
              </Link>
              <div className="relative">
                <button
                  className="flex items-center justify-center w-10 h-10 text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  onClick={toggleAvatarMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <Image src={avatar} alt="avatar" width={40} height={40} className="rounded-full" />
                </button>
                {avatarMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
                    onMouseLeave={() => setAvatarMenuOpen(false)}
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">{user?.fname}</span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user?.email}</span>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link
                          href="/dashboard/owner" // Dashboard link
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/setting"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/notification"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Notification
                        </Link>
                      </li>
                      <li>
                        <span
                          onClick={handleLogout} // Logout functionality
                          className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                        >
                          Logout
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Hamburger menu for mobile */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex items-center justify-between w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8">
            <li>
              <Link href="/" className="block py-2 text-black rounded md:p-0">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
