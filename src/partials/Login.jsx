import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in both fields");
      return;
    }

    if (username === "baagii") {
      Cookies.set("swing_token", "asdasd", { expires: 7 });
      navigate("/");
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-[#BBD0FF] bg-[#B8C0FF] to-black flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-40 p-8 rounded-lg shadow-xl max-w-sm w-full text-center sm:max-w-md ">
        <img
          src="/img/logo.jpg"
          alt="Swing"
          className="mx-auto mb-4 rounded-xl"
        />
        <h1 className="text-3xl sm:text-4xl text-[#5f42ac] font-extrabold mb-6">
          Join the Party!
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-lg text-black shadow-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={hide ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-lg text-black shadow-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                setHide(!hide);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-3/4 text-xl opacity-50"
            >
              {hide ? <VscEye /> : <VscEyeClosed />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-[#FFD6FF] to-[#E7C6FF] text-[#5f42ac] font-bold rounded-lg focus:outline-none"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
