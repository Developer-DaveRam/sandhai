import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import gmail from "../../../assets/login/gmail.svg";
import facebook from "../../../assets/login/facebook.svg";

import mail from '../../../assets/login/mail.svg';
import lock from '../../../assets/login/lock.svg';
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading ,setLoading ] = useState(false)
  const [formData,setFormData] = useState({
    mobile : '',
    password :''
  })
  
  const browser_name  = window.navigator.userAgent.split(' ')[10]  || "unknown"
  const browser_token = Math.random().toString(36).substring(7)
  const handelChange = (e) =>{
    setFormData({...formData ,[e.target.name] : e.target.value})
  }
  
  const handelLogin =async (e)=>{
      e.preventDefault();
      setLoading(true);

      return console.log(`form Data ${formData}  browser_token ${browser_token} , browser_name ${browser_name}`);
      

      try {
        const responce = await axios.post("",
          ...formData,
          browser_token,
          browser_name
        )
        
      if(responce.status === 200){
        alert("Login Sucessful !...")
        console.log(`token`,responce.data.token);       
      }
      } catch (error) {
        console.error("Error in login :",error);
        alert("Invalid Creadentilas or server Issue")
      }
      finally{
        setLoading(false)
      }
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black bg-opacity-60 backdrop-blur-md">

      <div className="bg-white w-[90%] sm:w-[400px] md:w-[450px] lg:w-[500px] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>

        <form onSubmit={handelLogin} className="space-y-6">
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-gray-100">
            {/* <FaEnvelope className="text-gray-500" />  */}
            <img src={mail} alt="" />
            <input
              type="mobile"
              name="mobile"
              onChange={handelChange}
              value={formData.mobile}
              placeholder="Enter Email Or Phone Number"
              className="w-full ml-3 bg-transparent outline-none text-gray-700"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-gray-100">
            {/* <FaLock className="text-gray-500" /> */}
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
            className="w-74 mx-auto text-center bg-green-700 text-white py-3 rounded-md font-medium hover:bg-green-800 transition"  >
            Log in
          </button>

          </div>


          <div className="text-center mt-4 text-gray-600">
            I Don't Have an Account{" "}
            <a href="#" className="font-medium text-black hover:underline">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
