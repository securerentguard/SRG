"use client";

import { useState } from "react";
import "../login.css";
import img from "../../../public/images/home.jpeg";
import Image from "next/image";

export default function Tenantregister() {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {};

  const handleSignup = async (e) => {};

  return (
    <>
      <div className="panel1">
        <div className="container">
          <input type="checkbox" id="flip" />
          <div className="cover">
            <div className="front">
              <Image src={img} alt="" />
            </div>
            <div className="back">
              <Image className="backImg" src={img} alt="" />
            </div>
          </div>
          <div className="forms">
            <div className="form-content">
              <div className="login-form">
                <div className="title">Login as Tenant</div>
                <form action="#">
                  <div className="input-boxes">
                    <div className="input-box">
                      <i className="fas fa-envelope" />
                      <input
                        type="text"
                        placeholder="Enter your email"
                        required=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-lock" />
                      <input
                        type="password"
                        placeholder="Enter your password"
                        required=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text">
                      <a href="#">Forgot password?</a>
                    </div>
                    <div className="button input-box">
                      <input
                        type="submit"
                        defaultValue="Submit"
                        onClick={handleLogin}
                      />
                    </div>
                    <div className="text sign-up-text">
                      Don't have an account?{" "}
                      <label htmlFor="flip">Signup now</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="signup-form">
                <div className="title">Signup as Tenant</div>
                <form action="#">
                  <div className="input-boxes">
                    <div className="input-box">
                      <i className="fas fa-user" />
                      <input
                        type="text"
                        placeholder="Enter your name"
                        required=""
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-envelope" />
                      <input
                        type="text"
                        placeholder="Enter your email"
                        required=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-lock" />
                      <input
                        type="password"
                        placeholder="Enter your password"
                        required=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="button input-box">
                      <input
                        type="submit"
                        defaultValue="Submit"
                        onClick={handleSignup}
                      />
                    </div>
                    <div className="text sign-up-text">
                      Already have an account?{" "}
                      <label htmlFor="flip">Login now</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
