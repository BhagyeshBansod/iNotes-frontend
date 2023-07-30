import React, { useState, useContext } from "react";
import NotesContext from "../context/NotesContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Login = () => {
  const notesContext = useContext(NotesContext);
  const { showAlert } = notesContext;

  //State variable and setState function to manage user credentials
  const [credential, setCredential] = useState({ Email: "", Password: "" });

  //useNavigate hook to redirect to specified page
  let navigate = useNavigate();

  const onchangeInput = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: credential.Email,
        Password: credential.Password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("Login Successfully", "bg-green-500", "text-white");
    } else {
      showAlert("Invalid Credentials", "bg-red-500", "text-white");
        
    }
  };

  return (
    <>
    <div style={{ height: "60px" }}>
        <Alert />
      </div>
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md mt-5" style={{marginTop: "100px"}}>
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg p-4 rounded-md shadow-md max-w-md mx-auto border-2 border-slate-400"
          >
          <h2 className="text-2xl text-white font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="Email"
              >
              Email
            </label>
            <input
              className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-white font-semibold leading-tight focus:outline-none focus:shadow-outline"
              id="Email"
              name="Email"
              value={credential.Email}
              onChange={onchangeInput}
              type="text"
              placeholder="Email"
              />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="Password"
              >
              Password
            </label>
            <input
              className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-white font-semibold leading-tight focus:outline-none focus:shadow-outline"
              id="Password"
              name="Password"
              value={credential.Password}
              onChange={onchangeInput}
              type="password"
              placeholder="Password"
              />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

export default Login;
