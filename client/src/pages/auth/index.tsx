import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { UserErrors } from "../../errors";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [authPage, setAuthPage] = useState("signin");

  return (
    <div className=" px-5 flex h-[100dvh] bg-[#00000070] justify-center items-center">
      <img
        src="https://img.freepik.com/free-photo/audio-video-jacks-isolated-white_93675-133405.jpg?w=996&t=st=1699964253~exp=1699964853~hmac=0c0ca8e79e106edae790a0e0057201acd6b8f1842e4c8771c892d8e87d80efad"
        alt=""
        className="object-cover absolute h-[100dvh] w-[100vw] z-[-1]"
      />
      {authPage === "signup" && <Register setAuthPage={setAuthPage} />}
      {authPage === "signin" && <Login setAuthPage={setAuthPage} />}
    </div>
  );
};

export default AuthPage;

const Register = ({ setAuthPage }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/user/register", {
        username,
        password,
      });
      alert("registration complete");
    } catch (err) {
      if (err.response.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        alert("Username is already taken");
      } else {
        alert("Eror: something happened");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 w-full max-w-[400px] relative overflow-hidden shadow-xl">
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-center mb-5">Sign Up</h2>

        <div className="">
          <label htmlFor="username" className="text-gray-500 text-sm">
            Username
          </label>
          <input
            className="bg-gray-100 block text-[#1f1f29] text-base p-4 w-full rounded-md mb-5 focus:outline-none focus:ring-1 ring-black ring-offset-[2px] mt-[2px] "
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* password */}
        {/*  */}
        <div className="">
          <label htmlFor="password" className="text-gray-500 text-sm">
            Password
          </label>
          <input
            className="bg-gray-100 block text-[#1f1f29] text-base p-4 w-full rounded-md mb-5 focus:outline-none focus:ring-1 ring-black ring-offset-[2px] mt-[2px]"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-[#1f1f29] text-white text-center w-full p-4 rounded-md mt-4 font-semibold hover:bg-gray-600 transition-all duration-300 ease-in-out"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm text-gray-700 cursor-pointer">
          Already have an account?{" "}
          <span
            className="font-semibold underline"
            onClick={() => setAuthPage("signin")}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
};

const Login = ({ setAuthPage }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  /**
 * Handle login form submission

 */
  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      // Make a POST request to the login endpoint
      const result = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });

      // Set the access token in cookies and user ID in local storage
      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (err) {
      let errorMessage: string = "";

      switch (err.response.data.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User does not exist";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong username or password";
          break;
        default:
          errorMessage = "Something went wrong";
      }

      // Display error message in an alert
      alert("ERROR: " + errorMessage);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 w-full max-w-[400px] relative overflow-hidden shadow-xl">
      <form onSubmit={handleLogin}>
        <h2 className="text-3xl font-bold text-center mb-1">Welcome Back</h2>
        <p className="text-gray-500 text-base text-center mb-6">
          Login to your account to continue
        </p>

        <div className="">
          <label htmlFor="username" className="text-gray-500 text-sm">
            Username
          </label>
          <input
            className="bg-gray-100 block text-[#1f1f29] text-base p-4 w-full rounded-md mb-5 focus:outline-none focus:ring-1 ring-black ring-offset-[2px] mt-[2px] "
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* password */}
        {/*  */}
        <div className="">
          <label htmlFor="password" className="text-gray-500 text-sm">
            Password
          </label>
          <input
            className="bg-gray-100 block text-[#1f1f29] text-base p-4 w-full rounded-md mb-5 focus:outline-none focus:ring-1 ring-black ring-offset-[2px] mt-[2px]"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#1f1f29] text-white text-center w-full  py-4 rounded-md mt-4 font-semibold hover:bg-gray-600 transition-all duration-300 ease-in-out"
        >
          Sign In
        </button>

        <p className="text-center mt-4 text-sm text-gray-700 cursor-pointer">
          Don't have an account yet?{" "}
          <span
            className="font-semibold underline"
            onClick={() => setAuthPage("signup")}
          >
            Create account
          </span>
        </p>
      </form>
    </div>
  );
};
