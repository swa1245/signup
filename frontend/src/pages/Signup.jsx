import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
  
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
  
    try {
      const res = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
  
      const data = await res.json();
      console.log(data)
  
      if (!res.ok) {
        // If backend sends error message
        return toast.error(data.message || "Signup failed");
      }
  
      toast.success(data.message || "Signup successful!");
      // Optionally redirect or reset form
      setSignupInfo({ name: "", email: "", password: "" });
    } catch (error) {
      toast.error("Something went wrong: " + error.message);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={signupInfo.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            autoFocus
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={signupInfo.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={signupInfo.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"

            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Signup
          </button>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
