import React, { useEffect, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import calender from '../../assets/edit-profile/calender.svg'
import follow from '../../assets/edit-profile/follow.svg'
import following from '../../assets/edit-profile/Following.svg'
import userAvatar from "../../assets/login/avathar.png"; // Sample avatar image
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        avathar: null
    });

    const[decode,setDecoded] = useState(null)
    const [userData,setUserData] = useState(null)
    const[error,setError] = useState({})

    const [preview, setPreview] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);

    };

    const validator = () =>{
        let newError = {};

        //Name 
        if(!formData.name.trim()){
            newError.name = "Name is Required"
        }
        else if(formData.name.length < 3){
            newError.name = "The name Should be grater than 3 Letters"
        }

        //phone 
        if(!formData.phone.trim()){
            newError.phone ="Please Enter the Phone number"
        }
        else if(!/^\d{10}$/.test(formData.phone) ){
            newError.phone = "The mobile number should be exactly  10 digit"
        }else if (/^[1-5]/.test(formData.phone)) {
            newError.phone = "The mobile number should not start with 1-5";
        }

        if(!formData.email.trim()){
            newError.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }
    
       setError(newError)
       return Object.keys(newError).length === 0
    }


    const handleImage = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            setFormData((prev) => ({ ...prev, avathar: file }));
            setPreview(URL.createObjectURL(file));
        }
    };
    

    const handleSave = async () => {
        // console.log("Saved Data:", formData);

        if(!validator()){
            return;
        }
    
        const formDatatoSend = new FormData();
        formDatatoSend.append("id",decode.UserId)
        formDatatoSend.append("name", formData.name);
        formDatatoSend.append("email", formData.email);
        formDatatoSend.append("mobile", formData.phone);
    
        // Append image only if it's selected
        if (formData.avathar) {
            formDatatoSend.append("avathar", formData.avathar);
        }
    
        try {
            const response = await axios.put("http://localhost:8000/edit-profile", formDatatoSend);
            console.log("responce",response.data.data);
            localStorage.setItem("user",JSON.stringify(response.data.data))
            alert("Profile updated");
        } catch (error) {
            console.error("Error uploading:", error);
            alert("Failed to upload");
        }
    };
    
    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || "",
                phone: userData.mobile || "",
                email: userData.email || "",
                avathar: userData.avathar || "", 
            });
        }
    }, [userData]);


    useEffect(() => {
        const value = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"))
        setUserData(user)
        if (value) {
            try {
                const user = jwtDecode(value);
                setDecoded(user);
                console.log(user.UserId);
                
                console.log(decode);
                
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);


    return (
        <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-md mt-10 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left - Profile Image & Info */}
                <div className="flex flex-col items-center p-6 border border-gray-200 rounded-lg shadow-sm">
                    <img
                        src={preview || (userData?.avathar? `http://localhost:8000/avathar/${userData.avathar}` : userAvatar)}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border p-1 object-cover"
                    />
                    {/* File Upload Button */}
                    <label className="mt-4 border border-green-500 w-50 py-2 justify-center rounded-md flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                        <RiImageAddFill />
                        Edit Photo
                        <input type="file" accept="image/*" className="hidden"  onChange={handleImage} />
                    </label>
                    <div className="leading-6 space-y-4">
                        <p className="mt-4 gap-3  text-sm text-gray-500 flex"><span><img className="h-4" src={calender} alt="" /></span> Member Joined: 22 Jan 2025</p>
                        <p className="text-sm flex gap-3"> <span><img className="h-4" src={follow} alt="" /></span>Followers: <b>20</b> |<span> <img src={following} className="h-4" alt="" /></span> Following: <b>20</b></p>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <button className="border border-green-600  text-black px-10 py-2 rounded-md">Share Profile</button>
                        <button className="bg-green-600 text-white px-10 py-2 rounded-md">Report Profile</button>
                    </div>
                </div>

                {/* Right - Edit Form */}
                <div>
                    <div className="p-6 border border-gray-200 rounded-lg ">
                        <div className="mb-4">
                            <label className="block ">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                min={3}
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-200 px-3 py-2 rounded-md focus:outline-green-500"
                            />
                            {error.name && <p className="text-red-500 text-sm">{error.name}</p> }
                        </div>

                        <div className="mb-4">
                            <label className="block ">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                required
                                pattern="[0-9]{10}" 
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border-gray-200 border px-3 py-2 rounded-md focus:outline-green-500"
                            />
                            {error.phone && <p className="text-red-500 text-sm">{error.phone}</p> }
                        </div>

                        <div className="mb-4">
                            <label className="block ">Email ID</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 border-gray-200 rounded-md focus:outline-green-500"
                            />
                            {error.email && <p className="text-red-500 text-sm">{error.email}</p> }
                        </div>

                    </div>

                    <div className="flex gap-4 mt-6 justify-end">
                        <button className="border  px-15 border-gray-200 py-1 rounded-md">Discard</button>
                        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-md">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
