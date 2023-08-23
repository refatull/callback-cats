import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userAuth from "../Custom_hook/UserAuth";
import Navbar from "../Components/Navbar";
import LoginNavbar from "../Components/LogoutNavBar";
import "../Login/Login.css";
import Footer from "../Components/footer";
import stepToSun from "../../../public/stepToSun.svg";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  let auth_: any;

  auth_ = userAuth();
  const { auth } = auth_;

  const navigate = useNavigate();

  const handleEmailChange = (event: any) => {
    const value = event.target.value;
    setEmail(value);

    // Check if the email matches the regex pattern
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(value);

    // Update the error message
    setEmailError(
      isValid ? "" : "Email must be in the format example@example.com."
    );
  };

  const handlePasswordChange = (event: any) => {
    const value = event.target.value;
    setPassword(value);

    // Check if the password matches the regex pattern
    const regex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    const isValid = regex.test(value);

    // Update the error message
    setPasswordError(
      isValid
        ? ""
        : "Password must contain at least 8 characters, one number, and one uppercase letter."
    );
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (emailError === "") {
      console.log("Email:", email);
    }

    if (passwordError === "") {
      console.log("Password:", password);
    }

    const data = {
      name: name,
      username: username,
      email: email,
      password: password,
    };
    //props.onSubmit(data);
    console.log(name, username, email, password);
    return fetch("http://127.0.0.1:5000/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.code === 400) {
          alert("user already exits");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };
  const signUpImg =
    "https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg";
  const isFormValid =
    email !== "" && password !== "" && username !== "" && name !== "";

  return (
    <>
      {auth?.dataEmail ? <LoginNavbar /> : <Navbar />}

      {/* new registe page */}
      <div className="grid md:grid-cols-2  grid-cols-1 md:mt-[150px] mt-[100px] ">
        {/* left side of sign in */}
        <div className="">
          <div className="text-center my-10">
            <h1 className="big-heading text-red-400">Sign Up</h1>
          </div>
          <div className="mx-auto px-10">
            <img
              className="lg:w-[70%] md:w-[90%] w-[70%] mx-auto md:inline-block hidden"
              src={stepToSun}
            ></img>
          </div>
        </div>
        {/* right side of sign in */}
        <div className="bg-white rounded-lg mx-5 py-[10%] px-[15%] shadow-md">
          <div>
            <form>
              {/* name input */}
              <div className="relative " data-te-input-wrapper-init>
                <label id="name">Name</label>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear"
                  id="name"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              {/* username input */}
              <div className="relative " data-te-input-wrapper-init>
                <label id="username">Username</label>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear"
                  id="username"
                  placeholder="Enter A New Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              {/* email input */}
              <div className="relative " data-te-input-wrapper-init>
                <label id="email">Email address</label>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear"
                  placeholder="Enter a New Email Address"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  required
                />
                {emailError && <p className="text-red-400">{emailError}</p>}{" "}
              </div>
              {/* password input */}
              <div className="relative " data-te-input-wrapper-init>
                <label id="password">Password</label>
                <input
                  type="password"
                  className="peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear"
                  id="password"
                  placeholder="Enter a New Password"
                  value={password}
                  onChange={handlePasswordChange}
                  pattern="^(?=.*\d)(?=.*[A-Z]).{8,}$"
                  required
                />

                {passwordError && (
                  <p className="text-red-400">{passwordError}</p>
                )}
              </div>
              <div className="flex flex-row-reverse text-gray-400 hover:text-black">
                <Link to={"/login"}>Already have an account?</Link>
              </div>
              {/* submit button */}
              <button
                type="button"
                className="inline-block w-full rounded bg-red-300 py-5 text-white hover:bg-red-400 shadow-md"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}

export default Register;
