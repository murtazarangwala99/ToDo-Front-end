import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./components/Todo";
// import Navbar from "../src/UIComponent/Navbar";
import Login from "./components/Login";
import Signup from "./components/SignUp";
function App() {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <Todo /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/getTodos" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
