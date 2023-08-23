import React from "react";

import "./Home.css";
import petAdopt from "../../../public/friendCat.svg";
import animatedCAt from "../../../public/animated-cat.png";
import userAuth from "../Custom_hook/UserAuth";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import LoginNavbar from "../Components/LogoutNavBar";
import Footer from "../Components/footer";


const Home = () => {
  let auth_: any;

  auth_ = userAuth();
  const { auth } = auth_;

  const nav = useNavigate();

  const handleSubmit = () => {
    nav("/adopt");
  };

  return (
    <div>
      {auth?.dataEmail ? <LoginNavbar /> : <Navbar />}
      <div
        className="about-container w-[100%] md:h-[95vh] h-[50vh] "
        style={{
          backgroundImage: 'url("../../../public/cat-cover.png")',
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="title-container md:pt-[30vh] md:px-[2%]">
          <h1 className="home-title big-heading text-[#394867] py-4 align-middle  bg-gray-100 md:rounded-lg opacity-75 mt-[50px] lg:w-[650px] shadow-lg">
            Welcome Back to Callback Cats!
          </h1>
          <div className="mt-10 w-[50%] h-[300px] mini-container opacity-[.68] bg-gray-100 p-5 rounded-lg shadow-lg shadow-[#F99B7D]">
            <div>
              <p className="w-[350px] lg:inline-block text-left mr-2 lg:text-2xl text-xl text-black font-[Montserrat]">
                There are numerous cat breeds, each with their unique
                characteristics. You can either trade or adopt a cat of your
                liking.
              </p>
              <button
                className=" p-5 inline-block lg:align-top mt-4 lg:mt-8 text-black rounded-sm  shadow-md  shadow-red-400 hover:bg-red-400 hover:text-white"
                onClick={handleSubmit}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[100vh]">
          {/* <img  src={catcover} alt='aboutbanner' className='about-banner ' /> */}
        </div>
      </div>
      <h1 className="bottom-title big-heading text-[#394867] py-4 align-middle  bg-white md:rounded-lg opacity-70 mt-[50px] lg:w-[650px] shadow-lg">
        Welcome Back to Callback Cats!
      </h1>
      <div className=" middle-container h-[400px] w-full ">
        <div className="about-text font-[Montserrat] text-xl p-5 lg:w-[50%] w-[90%] mx-auto mt-[100px]">
          <h1 className="big-heading text-red-400  mb-[50px]">About Us</h1>
          <p className="my-5">
            We are Callback Cats, a cat-themed e-commerce platform. Our mission
            is to provide cat lovers around the world with the best experience
            with exploring cat breeds.
          </p>
          <p className="my-5">
            At Callback Cats, we understand that cats are more than just pets -
            they are family members. That's why we only offer the most friendly
            user experience to meet the needs of both cats and their owners.
          </p>
          <p className="my-5">
            Thank you for choosing Callback Cats for all your cat-related needs!
          </p>
        </div>

        {/* displaying adopt container */}
        <div className="mt-[100px] grid lg:grid-cols-2 buy-cat-container  ">
          <div className=" grid lg:grid-cols-2 pl-[100px]">
            <img className="lg:w-[100%] w-[60%]" src={petAdopt} alt="" />
          </div>
          <div className="lg:rounded-md bg-white">
            <p className="p-10 md:text-xl text-black lg:my-0 my-10 font-[Montserrat]">
              <h1 className="medium-heading text-[#394867] mb-5">Adopt Cat</h1>
              You will be able to explore different options of cats that are for
              adoption from other users. You can read the cat's description
              based on the user's listing which can include the cat's breed,
              age, and personality! You can submit an application to donate the
              cat. You can keep track of your own applications on your account
              profile to view the statuses of your applications.
            </p>
          </div>
        </div>
        {/* end adopt container */}

        {/* buying container  */}
        <div className="lg:mt-[150px] lg:py-10 h-[500px] w-full bg-red-400">
          <div className="grid lg:grid-cols-2">
            <div className=" ">
              <p className="p-10 md:text-xl text-white lg:my-0 my-10 font-[Montserrat]">
                <h1 className="medium-heading text-white mb-5">Donate Cat</h1>
                You will be able to explore different options of cats that are
                for adoption from other users. You can read the cat's
                description based on the user's listing which can include the
                cat's breed, age, and personality! You can submit an application
                to donate the cat. You can keep track of your own applications
                on your account profile to view the statuses of your
                applications.
              </p>
            </div>
            <img className="  donate-cat-img " src={animatedCAt} alt="" />
          </div>
        </div>
        {/* end buying container */}

        <Footer />
      </div>
    </div>
  );
};

export default Home;
