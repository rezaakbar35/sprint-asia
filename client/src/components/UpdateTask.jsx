import React, { useState, useEffect } from "react";
import { updateTask } from "../../modules/fetch/task";
import { createToDo, getUserToDo } from "../../modules/fetch/todo";

const UpdateTask = ({ visible, onClose, task_id }) => {
  const [showInput, setShowInput] = useState(false);
  const [taskData, setTaskData] = useState({
    task_title: "",
    todo_id: 0,
    is_done: "",
    is_important: false,
    is_urgent: false,
    due_date: "",
  });
  const [todoData, setTodoData] = useState({
    todo_title: "",
    user_id: "",
    is_done: false,
  });

  const [todoOptions, setTodoOptions] = useState([]);
  const [todoLoading, setTodoLoading] = useState(true);

  const checkUser = async () => {
    try {
      const userToken = Cookies.get("user_id");
      return userToken;
    } catch (err) {
      console.error(err);
      throw new Error("Internal Server Error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = await checkUser();
        const todos = await getUserToDo(user_id);
        let todoArray = [];

        if (todos && Array.isArray(todos.todo)) {
          for (let index = 0; index < todos.todo.length; index++) {
            todoArray.push({
              todo_id: todos.todo[index].todo_id,
              todo_title: todos.todo[index].todo_title,
            });
          }
        }

        setTodoOptions(todoArray);
        setTodoLoading(false);
        console.log("fetch data success:", todoArray);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchData();
  }, []);

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) {
    return null;
  }

  const toggleView = () => {
    setShowInput((prevView) => !prevView);
  };

  const handleInputChange = (e, formType) => {
    const { name, value, checked } = e.target;
    const formData = formType === "task" ? taskData : todoData;

    formType === "task"
      ? setTaskData({
          ...formData,
          [name]:
            name === "is_urgent" || name === "is_important" ? checked : value,
        })
      : setTodoData({
          ...formData,
          [name]: value,
        });
  };

  const handleSumbitTask = async (e) => {
    e.preventDefault();
    try {
      const is_doneDefaultValue = false;
      const user_id = await checkUser();

      if (!showInput) {
        await updateTask(
          task_id,
          taskData.task_title,
          parseInt(taskData.todo_id),
          is_doneDefaultValue,
          taskData.is_urgent,
          taskData.is_important,
          taskData.due_date + ":00.000Z"
        );
      } else {
        const response = await createToDo(
          todoData.todo_title,
          parseInt(user_id),
          is_doneDefaultValue
        );
        await updateTask(
            task_id,
          taskData.task_title,
          response.todo.todo_id,
          is_doneDefaultValue,
          taskData.is_urgent,
          taskData.is_important,
          taskData.due_date + ":00.000Z"
        );
      }
      console.log("create task success", taskData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="flex justify-center items-center w-screen h-screen bg-black/10 absolute z-50 backdrop-blur"
    >
      <div className="w-1/3 h-1/3 bg-[#FCF7E9] rounded-3xl">
        <div className="text-[#FFA86B] font-semibold flex justify-center p-5 text-2xl">
          Create new Task
        </div>
        <form>
          <div className="grid grid-cols-2 mx-5">
            <div className="p-2">
              <div className="pb-5 px-2">
                <div className="italic">Task Title:</div>
                <input
                  type="text"
                  name="task_title"
                  value={taskData.task_title}
                  onChange={(e) => handleInputChange(e, "task")}
                  className="rounded-xl my-1 border px-2"
                />
              </div>
              <div className="pb-5 px-2 flex">
                <div className="italic">
                  is it <b>Urgent</b> ?
                </div>
                <input
                  type="checkbox"
                  name="is_urgent"
                  checked={taskData.is_urgent}
                  onChange={(e) => handleInputChange(e, "task")}
                  className="ml-16 rounded-xl my-1 border px-1"
                />
              </div>
              <div className="pb-5 px-2 flex">
                <div className="italic">
                  is it <b>Important</b> ?
                </div>
                <input
                  type="checkbox"
                  name="is_important"
                  checked={taskData.is_important}
                  onChange={(e) => handleInputChange(e, "task")}
                  className="ml-10 rounded-xl my-1 border px-1"
                />
              </div>
            </div>
            <div className="p-2">
              <div className="pb-5 px-2">
                <div
                  onClick={toggleView}
                  className="absolute ml-32 px-2 text-sm rounded-xl hover:cursor-pointer text-white bg-[#FFA86B]"
                >
                  change type
                </div>
                <div className="italic">Todo Title:</div>
                <div>
                  {showInput ? (
                    <input
                      type="text"
                      name="todo_title"
                      value={todoData.todo_title}
                      onChange={(e) => handleInputChange(e, "todo")}
                      className="rounded-xl my-1 border px-5"
                    />
                  ) : (
                    <select
                      name="todo_id"
                      value={taskData.todo_id}
                      onChange={(e) => handleInputChange(e, "task")}
                      className="rounded-3xl my-1 border px-6 bg-white py-1"
                    >
                      <option value="" hidden>
                        --Select Todo--
                      </option>
                      {!todoLoading &&
                        Array.isArray(todoOptions) &&
                        todoOptions.map((todo) => (
                          <option key={todo.todo_id} value={todo.todo_id}>
                            {todo.todo_title}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="pb-5 px-2">
                <div className="italic">Due Date:</div>
                <input
                  type="datetime-local"
                  name="due_date"
                  value={taskData.due_date}
                  onChange={(e) => handleInputChange(e, "task")}
                  className="rounded-3xl my-1 border px-3 py-1"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center ">
            <button
              className="w-48 py-1 text-xl font-bold text-white bg-[#FFA86B] rounded-full hover:scale-105 ease-out duration-300"
              onClick={handleSumbitTask}
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
