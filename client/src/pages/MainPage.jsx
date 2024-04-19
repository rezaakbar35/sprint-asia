import React, { useState, useEffect } from "react";
import TodoTaskCard from "../components/todoTaskCard";
import LoginRegisterModal from "../components/LoginRegisterModal";
import CreateNewTask from "../components/CreateNewTask";
import Cookies from "js-cookie";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [login, isLogin] = useState(false);
  const [showLogin, setIsShowLogin] = useState(false);
  const [showCreate, setIsShowCreate] = useState(false);

  const handleCloseCreate = () => {
    setIsShowCreate(false);
  };

  const handleCloseModal = () => {
    setIsShowLogin(false);
  };

  useEffect(() => {
    const token = Cookies.get("user_id");
    if (token) {
      isLogin(true);
    }
  }, [Cookies.get("user_id")]);

  return (
    <div className="bg-[#FCF7E9] w-screen h-screen">
      <LoginRegisterModal visible={showLogin} onClose={handleCloseModal} />
      <CreateNewTask visible={showCreate} onClose={handleCloseCreate} />
      <div className="rounded-b-[30px] bg-[#FFD991] w-screen h-[75px]">
        <div className="flex justify-end">
          {login ? (
            <button
              onClick={() => Cookies.remove('user_id')}
              className=" px-10 py-1 mr-8 mt-4 text-xl  font-bold text-white bg-[#FFA86B] rounded-full hover:scale-110 ease-out duration-300"
            >
              <p className="pb-1">Logout</p>
            </button>
          ) : (
            <button
              onClick={() => setIsShowLogin(true)}
              className=" px-10 py-1 mr-8 mt-4 text-xl  font-bold text-white bg-[#FFA86B] rounded-full hover:scale-110 ease-out duration-300"
            >
              <p className="pb-1">Login</p>
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center w-max my-5 pr-5 rounded-full bg-[#FFe69e]">
          <div className="w-24 h-12 bg-[#FFA86B] rounded-full">
            <div className="flex justify-start">
              <div className="w-10 h-10 m-1 bg-[#FFCC84] rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#FFA86B] mb-2 border-[#FFA86B] pt-1 px-3">
            To Do List
          </h1>
        </div>
      </div>
      <div className="w-screen h-3/4 flex justify-end absolute">
        <div className="grid place-content-end">
          <div
            className="w-28 h-28 mr-28 rounded-full bg-[#FFA86B] shadow-xl grid place-content-center hover:cursor-pointer hover:scale-105 ease-out duration-200"
            onClick={() => {
              setIsShowCreate(true);
            }}
          >
            <div className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-14 h-14"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div>
        <TodoTaskCard />
      </div>
    </div>
  );
};

export default MainPage;
