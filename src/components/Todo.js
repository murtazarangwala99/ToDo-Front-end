import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "../UIComponent/Heading";
import Navbar from "../UIComponent/Navbar";
import { account } from "../appwrite/appwriteConfig";

function Todo() {
  const [todoTitle, setTodoTitle] = useState("");
  // For Fetching Todo-Data
  const [todoData, setTodoData] = useState("");
  // Account
  const [userDetails, setUserDetails] = useState();

  //  ----------  Submiting The Title Of Todo  ----------
  const submitTitle = async () => {
    if (!todoTitle) {
      alert("Enter Title to Create Todo !");
    } else {
      await axios.post("/createTodo", {
        title: todoTitle,
        userId: userDetails.$id,
      });
    }
    // setRefresh((prev) => !prev);
  };
  // ---------- Fetching All ToDos ----------
  const fetchTodoData = async (userId) => {
    // const userIds = account.get();
    console.log(`userId: ${userId}`);
    // console.log(`userId: ${userId.$id}`);
    const res = await axios.get(`/getTodos/${userId}`); // here also got error ($id)
    // console.log(userId.$id);
    // If no todos are there dont set value
    if (res.data.data.todosAll.length > 0) {
      setTodoData(res.data.data.todosAll);
    }
  };
  // ---------- Editing Todo Title ----------
  const editTitle = async (todoId) => {
    const newTitle = prompt("Enter New Title : ");
    if (!newTitle) {
      alert("Please Enter Title !");
    } else {
      const resEditTitle = await axios.put(`/changeTitle/${todoId._id}`, {
        changeTitle: newTitle,
      });
      console.log(resEditTitle);
    }
    window.location.reload();
  };
  // ---------- Delete Title ----------
  const deleteTitle = async (todoId) => {
    if (window.confirm("Do you want to Delete This Todo !")) {
      const resDeleteTitle = await axios.delete(`/deleteTodo/${todoId._id}`);
      console.log(resDeleteTitle);
    } else {
      alert("You pressed Cancel !");
    }
    window.location.reload();
  };
  //  ---------- Adding New Task On clicking addTask Button  ----------
  const addTask = async (todoId) => {
    const newTask = prompt("Enter Task : ");

    if (!newTask) {
      alert("Please Enter New Task !");
    } else {
      // Todo : Add Array Of Tasks
      // const addTask = newTask.split(",");
      const resTask = await axios.post(`/createTodoTask/${todoId._id}`, {
        addTask: newTask,
      });
      console.log(resTask);
    }
    window.location.reload();
  };
  // ---------- Edit task by Clicking Edit Button ----------
  const editTask = async (todoId, index) => {
    const newTask = prompt("Enter New Task : ");
    if (!newTask) {
      alert("Please Enter Task !");
    } else {
      const resEditTask = await axios.put(`/changeTask/${todoId}/${index}`, {
        changeTask: newTask,
      });
      console.log(resEditTask);
    }
    window.location.reload();
  };
  //  ---------- Delete Task ----------
  const deleteTask = async (todoId, index) => {
    if (window.confirm("Do you want to Delete This Task !")) {
      const resDeleteTask = await axios.delete(
        `/deleteTask/${todoId}/${index}`
      );
      console.log(resDeleteTask);
    } else {
      alert("You pressed Cancel !");
    }
    window.location.reload();
  };

  const user = () => {
    const getData = account.get();
    getData.then(
      function (response) {
        setUserDetails(response);
      },
      function (error) {
        console.log(error);
      }
    );
    // console.log(userDetails);
  };
  // eslint-disable-next-line
  const [setId, setSetId] = useState();
  const user_id = account.get();
  // To load the data before page got load
  let shouldLoad = true;
  useEffect(() => {
    if (shouldLoad) {
      // eslint-disable-next-line
      shouldLoad = false;
      user();
      user_id.then((r) => {
        setSetId(r.$id);
        fetchTodoData(r.$id);
      });
    }
  }, [todoTitle]);

  //  ---------- Submiting Todo Title and preventing Default ----------
  const handleSubmit = (event) => {
    event.preventDefault();
    // To submit the data
    submitTitle();
    setTodoTitle("");
  };

  return (
    <>
      {userDetails ? (
        <>
          <Navbar />
          {/* Title of Web Page */}
          <Heading heading="ToDo Application" />
          {/*  Title, Task and Submit Button */}
          <div className="container">
            <form
              action="#"
              method="post"
              className="container flex flex-col gap-4 justify-center items-center my-8"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  className="text-slate-300 font-bold text-xl"
                  htmlFor="todo-title"
                >
                  Enter Title :
                </label>
                <input
                  type="text"
                  name="todo-title"
                  id="todo-title"
                  className="my-1 rounded-sm text-black focus:bg-green-300"
                  value={todoTitle}
                  onChange={(event) => setTodoTitle(event.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-300 hover:text-black"
              >
                Submit
              </button>
            </form>
          </div>
          {/* Todo Heading  */}
          <div className="flex justify-center font-bold text-4xl m-4">
            <p>Your ToDo :</p>
            {/* Maybe Put One Refresh Button To load Todo */}
          </div>
          {/* All Todos with It's Tasks */}

          <div className="container grid grid-col-4 m-auto bg-white text-black w-3/5 border">
            {/* p Tag is For Debugging Only */}
            {/* <p className="mx-4">
              For Changes in your Todo-Tasks you have to Refresh Page(Working on
              it.)
            </p> */}
            <button
              className="bg-green-500  px-4 py-2 rounded-lg cursor-pointer hover:bg-green-300 hover:text-black"
              onClick={() => window.location.reload(true)}
            >
              Refresh
            </button>

            {/* Todos List */}
            {todoData &&
              todoData.map((todos) => (
                <div key={todos._id}>
                  <details className="border-4 m-2 border-black">
                    {/* TODO Title */}
                    <summary className="py-3 px-4 font-bold cursor-pointer select-none w-full">
                      <h2 className="inline-block w-1/4">{todos.title}</h2>
                      <button
                        className="bg-blue-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-blue-700 hover:text-white"
                        onClick={() => addTask(todos)}
                      >
                        Add Tasks
                      </button>
                      <button
                        className="bg-yellow-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-yellow-700 hover:text-white"
                        onClick={() => editTitle(todos)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-red-700 hover:text-white"
                        onClick={() => deleteTitle(todos)}
                      >
                        Delete
                      </button>
                    </summary>
                    {/* Tasks */}
                    <div className="container">
                      {todos.tasks &&
                        todos.tasks.map((task, index) => (
                          <div
                            key={index}
                            className="pt-2 pb-3 px-4 mx-8 my-2 border-2 bg-slate-300 flex border-black font-semibold"
                          >
                            Task {index + 1} : {task}
                            <div className="px-8">
                              <button
                                className="bg-yellow-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-yellow-700 hover:text-white"
                                onClick={() => editTask(todos._id, index)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 rounded-lg px-3 py-1 mx-2 hover:cursor-pointer hover:bg-red-700 hover:text-white"
                                onClick={() => deleteTask(todos._id, index)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </details>
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          <p className="m-8">User ERROR</p>
          <p className="m-8">Please Login to View your Profile</p>
          <a
            className="m-8 px-4 py-2 border-2 cursor-pointer hover:bg-green-300 hover:text-black rounded-lg"
            href="/"
          >
            Login
          </a>
        </>
      )}
    </>
  );
}

export default Todo;
