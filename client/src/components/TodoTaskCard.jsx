import React, { useState, useEffect } from "react";
import { getUserToDo } from "../../modules/fetch/todo";
import {
  getTodoTask,
  deleteTask,
  updateTask,
  getUniqueTask,
} from "../../modules/fetch/task";
import Cookies from "js-cookie";
import UpdateTask from "./UpdateTask";

const TodoTaskCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false)

  const handleDelete = async (req) => {
    await deleteTask(req);
  };

  const handleDone = async (req) => {
    try {
      const beforeData = await getUniqueTask(req);
      console.log(beforeData);
      await updateTask(
        beforeData.task.ID,
        beforeData.task.task_title,
        beforeData.task.user_id,
        true,
        beforeData.task.is_urgent,
        beforeData.task.is_important,
        beforeData.task.due_date
      );
    } catch (error) {
      console.error();
    }
  };

  const checkUser = async () => {
    try {
      const userToken = Cookies.get("user_id");
      console.log(userToken)
      return userToken;
    } catch (err) {
      console.error(err);
      throw new Error("Internal Server Error");
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const user_id = await checkUser();
      const todos = await getUserToDo(user_id);
      let tasks = [];

      if (todos && Array.isArray(todos.todo)) {
        for (let index = 0; index < todos.todo.length; index++) {
          const task = await getTodoTask(todos.todo[index].ID);
          tasks.push(task);
        }
      }

      if (tasks && Array.isArray(tasks)) {
        const newData = tasks.map((item, index) => ({
          ...item,
          todo_title: todos.todo[index].todo_title,
        }));
        setData(newData);
        console.log(newData);
        console.log(data)
      } else {
        console.error("Error Fetching Task and Todo Data");
      }
    } catch (error) {
      console.error("Error Fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-2">
      <div className="grid grid-cols-4">
      {data
      .filter((item) => item.task.length > 0) // Filter out todos with no tasks
      .map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-[35px] w-max h-max shadow-md p-6 m-3"
        >
            {item.task.map((task, taskIndex) => (
              <div key={taskIndex} className="mb-3">
                {taskIndex === 0 && (
                  <div className="flex justify-center px-5 w-auto pt-1 mb-3 rounded-full bg-[#FFCC84]">
                    <h2 className="text-xl text-[#aa6534] font-bold mb-3">
                      {item.todo_title}
                    </h2>
                  </div>
                )}
                <div
                  className={`group px-5 py-3 min-w-72 rounded-3xl hover:scale-105 duration-200 ${
                    task.is_done ? "bg-gray-200" : "bg-[#FCF7E9]"
                  }`}
                >
                  <p className={`font-semibold italic mb-2 ${task.is_done? ("text-gray-400") : ("text-black")}`}>
                    {task.task_title}
                  </p>
                  <div className="flex">
                    {task.is_urgent && !task.is_done ? (
                      <div className="w-28 h-8 bg-[#d9534f] rounded-full mr-1 flex pt-1 justify-center animate-pulse">
                        <div className="text-white w-max mr-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                            />
                          </svg>
                        </div>
                        <p className="text-white">Urgent</p>
                      </div>
                    ) : null}
                    {task.is_important && !task.is_done ? (
                      <div className="w-32 h-8 bg-[#f0ad4e] rounded-full flex mr-1 pt-1 justify-center animate-pulse">
                        <div className="text-white w-max mr-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                            />
                          </svg>
                        </div>
                        <p className="text-white">Important</p>
                      </div>
                    ) : null}
                  </div>
                  <div className={`flex justify-between mt-2 ${task.is_done? ("text-gray-400") : ("text-black")}`}>
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <p className="mb-1 ml-1">{task.due_date.slice(11, 16)}</p>
                    </div>
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                        />
                      </svg>
                      <p className="mb-1 ml-1">
                        {task.due_date.slice(8, 10)} -{" "}
                        {task.due_date.slice(5, 7)} -{" "}
                        {task.due_date.slice(0, 4)}
                      </p>
                      </div>
                  </div>
                  <div className="flex justify-between mt-2 invisible group-hover:visible">
                    <div className="flex">
                      <div
                        className="border border-[#d9534f] text-[#d9534f] py-2 px-2 rounded-full mr-2 hover:cursor-pointer hover:bg-[#d9534f] hover:text-white duration-100"
                        onClick={() => handleDelete(task.ID)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </div>
                      {task.is_done? (null) : (
                        <div className="border border-[#0275d8] text-[#0275d8] py-2 px-2 rounded-full hover:cursor-pointer hover:bg-[#0275d8] hover:text-white duration-100" onClick={() => setShowUpdate(true)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </div>
                      )}
                    </div>
                    {task.is_done? (null) : (
                      <div
                      className="border py-2 px-2 border-[#5cb85c] text-[#5cb85c] rounded-full hover:cursor-pointer hover:bg-[#5cb85c] hover:text-white duration-100"
                      onClick={() => handleDone(task.ID)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* <UpdateTask visible={showUpdate} onClose={handleCloseUpdate} task_id={task.task_id}/> */}
    </div>
  );
};

export default TodoTaskCard;
