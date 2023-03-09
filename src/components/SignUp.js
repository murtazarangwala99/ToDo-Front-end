import React, { useState } from "react";
import Heading from "../UIComponent/Heading";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import todo from "../components/Todo";

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(user);

  // Sign Up
  const signUpUser = async (e) => {
    e.preventDefault();
    const promise = account.create(
      uuidv4(),
      user.email,
      user.password,
      user.name
    );
    promise.then(
      function (response) {
        console.log(response);
        navigate("/"); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  return (
    <div className="mt-20">
      <Heading heading="Registration Page" />
      <div className="flex flex-col justify-center items-center container">
        <form
          action="#"
          method="post"
          className="container flex flex-col gap-4 justify-center items-center my-8"
          onSubmit={signUpUser}
        >
          <div>
            <label
              className="text-slate-300 font-bold text-xl"
              htmlFor="user-name"
            >
              Enter Name :
            </label>
            <input
              type="text"
              name="user-name"
              id="user-name"
              className="my-1 rounded-sm text-black focus:bg-green-300"
              onChange={(e) => {
                setUser({
                  ...user,
                  name: e.target.value,
                });
              }}
            />
          </div>
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
            {/* TODO: Reverification of Password at Front-end */}
          </div>
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-300 hover:text-black"
            // onSubmit={signUpUser}
          >
            Submit
          </button>
        </form>
        {/* Login Title */}
        <p>Registered User ? 👇 Click Below Button</p>
        <a
          href="/"
          className="bg-green-500 px-8 py-2 my-4 rounded-lg cursor-pointer hover:bg-green-300 hover:text-black"
        >
          Login
        </a>
      </div>
    </div>
  );
}

export default SignUp;
