import React, { useState, useEffect } from "react";
import { userLogin, userRegister } from "../../modules/fetch/user";
import Cookies from "js-cookie";

const LoginRegisterModal = ({ visible, onClose }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [isViewRegister, setViewRegister] = useState(false);
    const [isModalOpen, setModalOpen] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
  
    const [loginFormData, setLoginFormData] = useState({
      username: "",
      password: "",
    });
  
    const [registerFormData, setRegisterFormData] = useState({
      username: "",
      password: "",
      confirmPassword: "",
    });
  
    const handleOnClose = (e) => {
      if (e.target.id === "container")
      onClose();
    };
  
    if (!visible) {
      return null;
    }
  
    const toggleView = () => {
      setViewRegister((prevView) => !prevView);
    };
  
    const handleInputChange = (e, formType) => {
      const { name, value } = e.target;
      const formData = formType === "register" ? registerFormData : loginFormData;
  
      formType === "register"
        ? setRegisterFormData({
            ...formData,
            [name]: value,
          })
        : setLoginFormData({
            ...formData,
            [name]: value,
          });
    };
  
    const handleLogin = async() => {
      try {
      const response = await userLogin(loginFormData.username, loginFormData.password);
      const user_id = response.user_id
      Cookies.set('user_id',user_id)
      onClose();
      } catch (error) {
        throw new error
      }
      
    };
  
    const handleRegister = () => {
      userRegister(registerFormData.username, registerFormData.password);
      console.log("Register clicked", registerFormData);
    };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="flex justify-center items-center w-screen h-screen bg-black/10 absolute z-50 backdrop-blur"
    >
      <div className="w-1/3 bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">
            {isViewRegister ? "Register" : "Login"}
          </h1>
          <button
            className="text-sm text-blue-500 hover:underline focus:outline-none"
            onClick={toggleView}
          >
            {isViewRegister ? "Switch to Login" : "Switch to Register"}
          </button>
        </div>
        {isViewRegister ? (
          // Register form
          <div>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  value={registerFormData.username}
                  onChange={(e) => handleInputChange(e, "register")}
                  className="w-full border rounded-md py-2 px-3 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={registerFormData.password}
                  onChange={(e) => handleInputChange(e, "register")}
                  className="w-full border rounded-md py-2 px-3 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Confirm Password:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={registerFormData.confirmPassword}
                  onChange={(e) => handleInputChange(e, "register")}
                  className="w-full border rounded-md py-2 px-3 text-sm"
                />
              </div>
              <div className="mb-4">
                <input
                  type="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label className="text-sm text-gray-600">Show Password</label>
              </div>
              <button
                type="button"
                onClick={handleRegister}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Register
              </button>
            </form>
          </div>
        ) : (
          // Login form
          <div className="flex justify-center">
            <div className="">
              <form className="grid gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={loginFormData.username}
                    onChange={(e) => handleInputChange(e, "login")}
                    className="w-full border rounded-md py-2 px-3 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    Password:
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginFormData.password}
                    onChange={(e) => handleInputChange(e, "login")}
                    className="w-full border rounded-md py-2 px-3 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-600">Show Password</label>
                </div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterModal;
