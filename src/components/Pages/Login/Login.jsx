import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import gmail from "../../../assets/login/gmail.svg";
import facebook from "../../../assets/login/facebook.svg";

import mail from '../../../assets/login/mail.svg';
import lock from '../../../assets/login/lock.svg';
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ closeLogin }) => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    mobile: '',
    password: ''
  })
  const [logUser,setLogUser] = useState([])


  const getBrowserName = () => {
    if (navigator.userAgent.indexOf("Chrome") !== -1) return "Chrome";
    if (navigator.userAgent.indexOf("Firefox") !== -1) return "Firefox";
    if (navigator.userAgent.indexOf("Safari") !== -1) return "Safari";
    return "Unknown";
  };

  const browser_name = getBrowserName();

  const browser_token = Math.random().toString(36).substring(7)
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handelLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // return console.log(`form Data ${formData}  browser_token ${browser_token} , browser_name ${browser_name}`);

    try {
      const responce = await axios.post("http://localhost:8000/login",
        {
          ...formData,
          browser_token,
          browser_name
        }
      )

      if (responce.status === 200) {
        alert("Login Sucessful !...")
        // console.log(`token`, responce.data.token);
        localStorage.setItem("browser_token", browser_token)


        if (responce.data.token) {

          localStorage.setItem("token", responce.data.token)
          console.log("user", responce.data.user);

          localStorage.setItem("user", JSON.stringify(responce.data.user));
          
          setLogUser(responce.data.user);

          console.log(`token`, responce.data.token);

        }
      }
    } catch (error) {
      console.error("Error in login :", error);
      alert("Invalid Creadentilas or server Issue")
    }
    finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div className="flex items-center justify-center w-full h-screen bg-opacity-50 " style={{ position: 'fixed', top: "40px", backgroundColor: '#0606069C' }}>

      <div className="relative bg-white w-[90%] sm:w-[400px] md:w-[450px] lg:w-[500px] p-8 rounded-xl shadow-lg">
        <button className=' absolute right-5 top-5 ' onClick={closeLogin}>✖</button>

        <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2> {user ? (
          <div className="text-center text-gray-600">
            <p>Welcome, <span className="font-bold">{user.name}</span>!</p>
            <p>Your Email: <span className="font-bold">{user.email}</span></p>
          </div>
        ) : (



          <form onSubmit={handelLogin} className="space-y-6">
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-gray-100">
              <img src={mail} alt="" />
              <input
                type="tel"
                name="mobile"
                onChange={handelChange}
                value={formData.mobile}
                placeholder="Enter Email Or Phone Number"
                className="w-full ml-3 bg-transparent outline-none text-gray-700"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-gray-100">
              <img src={lock} alt="" />
              <input
                value={formData.password}
                onChange={handelChange}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full ml-3 bg-transparent outline-none text-gray-700"
              />
              <AiOutlineEye
                className="text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <div className="text-center">
              <a href="#" className="text-gray-600 text-sm hover:underline">
                Forgot Password
              </a>
            </div>


            <div className="text-center text-gray-500 mt-2">Or Continue With</div>

            <div className="flex justify-center gap-x-4 mt-2">
              <img
                src={facebook}
                alt="Facebook Login"
                className="w-8 cursor-pointer hover:scale-110 transition"
              />
              <img
                src={gmail}
                alt="Google Login"
                className="w-8 cursor-pointer hover:scale-110 transition"
              />
            </div>


            <div className="flex ">
              <button
                type="submit"
                className="w-74 mx-auto text-center bg-green-700 text-white py-3 rounded-md font-medium hover:bg-green-800 transition"  >
                Log in
              </button>

            </div>


            <div className="text-center mt-4 text-gray-600">
              I Don't Have an Account{" "}
              <Link to="/signup"> <span className="font-medium text-black hover:underline"></span> Register </Link>

            </div>
          </form>

        )}
      </div>
    </div>
  );
};

export default Login;
