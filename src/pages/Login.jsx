import React, { useEffect } from "react";
import { authUser } from "../context/context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { checkAuth } = authUser();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    // Logic for Google Sign-In
    console.log("Sign in with Google");
  };

  const handleGithubSignIn = () => {
    // Logic for GitHub Sign-In
    console.log("Sign in with GitHub");
  };


  const handleSubmit = () => {
    // e.preventDefault();
    checkAuth(true);
    navigate("/dashboard");
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome Back!</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Login
        </button>
        <div className="mt-4">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
      </form>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="flex flex-col space-y-2 w-96">
        <button
          onClick={handleGoogleSignIn}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full flex items-center justify-center"
        >
          Sign in with Google
        </button>
        <button
          onClick={handleGithubSignIn}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 w-full flex items-center justify-center"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
