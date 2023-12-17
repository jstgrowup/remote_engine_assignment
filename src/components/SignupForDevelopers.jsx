import React from "react";
import NavbarForDevelopers from "./NavbarForDevelopers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupForDevelopers() {
  const navigate = useNavigate();
  const [formData, setformData] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const postUser = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      alert("All fields are required");
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/users/signup/developer",
        formData
      );
      if (res) {
        navigate("/developerslogin");
      }
    } catch (e) {
      console.log("e:", e);
      alert(e.response.data.error);
    }
  };
  return (
    <>
      <NavbarForDevelopers />
      <div className="w-full flex justify-center mt-40">
        <div className="bg-blue-200 p-8 rounded-xl shadow-xl  w-full sm:w-96 border-gray-500 border">
          <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>

          <div className="mb-4">
            <label
              for="email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name={"email"}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              for="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              id="password"
              name={"password"}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            onClick={postUser}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default SignupForDevelopers;
