import React, { useState, useContext } from "react";
import NotesContext from "../context/NotesContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const notesContext = useContext(NotesContext);
  const { showAlert } = notesContext;

  //to navigate after succesfull signup
  let navigate = useNavigate();

  //State Variable and setState function to handle user credentials
  const [credential, setCredential] = useState({
    Name: "",
    Email: "",
    Password: "",
    Cpassword: "",
  });

  //Destructuring fields from credential state variable
  const { Name, Email, Password, Cpassword } = credential;

  const onchangeInput = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: credential.Email,
        Email: credential.Email,
        Password: credential.Password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("Signup Successfully", "bg-green-500", "text-white");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md mt-5" style={{marginTop: "100px"}}>
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 border-slate-400"
        >
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-white font-semibold leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              name="Name"
              value={Name}
              onChange={onchangeInput}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-white font-semibold leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              name="Email"
              value={Email}
              onChange={onchangeInput}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-white font-semibold leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              name="Password"
              value={Password}
              onChange={onchangeInput}
              minLength={8}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-white font-semibold leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              name="Cpassword"
              value={Cpassword}
              onChange={onchangeInput}
              minLength={8}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
