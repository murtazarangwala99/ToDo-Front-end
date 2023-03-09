import React from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="container w-full m-auto">
        <ul className="container flex justify-between gap-1 flex-wrap">
          <a
            className="px-4 py-2 border-2 cursor-pointer hover:bg-green-300 hover:text-black rounded-lg"
            href="/"
          >
            Home
          </a>
          <div className="flex gap-6">
            <a
              className="px-4 py-2 border-2 cursor-pointer hover:bg-green-300 hover:text-black rounded-lg"
              href="https://github.com/murtazarangwala99"
              target="_blank"
              rel="noreferrer"
            >
              Developer
            </a>
            <a
              className="px-4 py-2 border-2 cursor-pointer hover:bg-red-700 hover:text-black rounded-lg"
              href="/"
              onClick={handleLogout}
            >
              LogOut
            </a>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
