import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { login } from "../service/user.service";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   if (!username || !password) {
  //     toast.error("Please fill in both fields");
  //     setLoading(false);
  //     return;
  //   }

  //   login({
  //     username: username,
  //     userpassword: password,
  //   })
  //     .then((res) => {
  //       if (res.data.accessToken) {
  //         const token = res.data.accessToken;
  //         Cookies.set("swing_token", token, { expires: 7 });

  //         navigate({ pathname: "/" });
  //         setLoading(false);
  //       } else {
  //         toast.error("Invalid username or password");
  //         setLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error("Invalid username or password");
  //       setLoading(false);
  //     });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (!username || !password) {
      toast.error("Please fill in both fields");
      setLoading(false);
      return;
    }

    if (username === "baagii" && password === "baagii") {
      Cookies.set("swing_token", "asdasd", { expires: 7 });
      navigate("/");
      setLoading(false);
    } else {
      toast.error("Invalid username or password");
      setLoading(false);
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
            className="w-full p-3 bg-gradient-to-r from-[#FFD6FF] to-[#E7C6FF] text-[#5f42ac] font-bold rounded-lg focus:outline-none flex items-center justify-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-[#000]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                ></path>
              </svg>
            ) : (
              "Нэвтрэх"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
