import React, { useState } from "react";
import Heading from "../UIComponent/Heading";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  console.log(user);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailSession(user.email, user.password);
      navigate("/getTodos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-20">
      <Heading heading="Login Page" />
      <div className="flex flex-col justify-center items-center container">
        <form
          action="#"
          method="post"
          className="container flex flex-col gap-4 justify-center items-center my-8"
        >
          <div>
            <label
              className="text-slate-300 font-bold text-xl"
              htmlFor="user-email"
            >
              Enter Email :
            </label>
            <input
              type="text"
              name="user-email"
              id="user-email"
              className="my-1 rounded-sm text-black focus:bg-green-300"
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label
              className="text-slate-300 font-bold text-xl"
              htmlFor="user-password"
            >
              Enter Password:
            </label>
            <input
              type="password"
              className="my-1 rounded-sm text-black focus:bg-green-300"
              id="user-password"
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-300 hover:text-black"
            onClick={loginUser}
          >
            Submit
          </button>
        </form>
        {/* Signup Title */}
        <p>Still Not a User ? 👇 Click Below Button</p>
        <a
          href="/signup"
          className="bg-green-500 px-8 py-2 my-4 rounded-lg cursor-pointer hover:bg-green-300 hover:text-black"
        >
          SignUp
        </a>
      </div>
    </div>
  );
}

export default Login;
