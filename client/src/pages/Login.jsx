import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const successLogin = (message) => {
  return toast.success(message);
};
const errorLogin = (message) => {
  return toast.error(message);
};

const Login = () => {
  const navigate = useNavigate();
  const [signin, setSignin] = useState({
    email: "",
    password: ""
  });

  const handleSigninData = (e) => {
    const { name, value } = e.target;
    setSignin({
      ...signin,
      [name]: value
    });
  };

  axios.defaults.withCredentials = true;
  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.RECT_API_BASE_URL}/login/`, signin);
      if (response.data.status) {
        successLogin(response.data.message)
        navigate("/author");
      } else {
        errorLogin(response.data.message)
      }      
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login.');
    }
  };



  // get login

  const handleLogin = async () => {
    try {
      let response = await axios.get(`${process.env.RECT_API_BASE_URL}/login/`);
      
      if (response.data.status) {
        navigate("/author");
      }
    } catch (err) {
      console.log('Error on login page', err);
    }
  }



  useEffect(() => {
    handleLogin();
  }, [])



  return (
    <>
      <Toaster />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 md:h-dvh py-8 mx-auto lg:py-0">
          <Link to={"/"} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Book ERA
          </Link>
          <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-4/12 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={handleSigninData}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleSigninData}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link to={"#"}
                    className="text-sm font-medium text-blue-600 hover:underline "
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to={"/signup"}
                    className="font-medium text-blue-600 hover:underline "
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
