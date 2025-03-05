import React, { useState } from 'react';
import men from '../../../assets/login/men1.svg';
import mobile from '../../../assets/login/mobile.svg';
import mail from '../../../assets/login/mail.svg';
import lock from '../../../assets/login/lock.svg';
import facebook from '../../../assets/login/facebook.svg';
import gmail from '../../../assets/login/gmail.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = ({closeSignIn,openLogin}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        password: ''
    });

    console.log(`fomdata ${formData}`);
    

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/create-user", formData);
            alert(response.data.message || 'Registration Successful');
            closeSignIn();
        } catch (error) {
            console.error(error.message);
            alert('Something went wrong!');
        } finally {
            setLoading(false);

        }
    };

    return (
        <div className='flex items-center justify-center w-full h-screen  ' style={{background:"#0606069C",position:'fixed',top:"40px",left:"0"}}  >
            <div className="flex relative flex-col items-center bg-white p-8 w-[635px] rounded-md">
                <h3 className="text-lg font-medium">Registration / Sign up</h3>
                <button className='absolute top-3 right-3' onClick={closeSignIn}>✖</button>
                <div className="flex flex-col gap-10 items-center mt-4">
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="flex items-center gap-2">
                            <label htmlFor="userName">
                                <img src={men} alt="Name Icon" className="w-8 h-6" />
                            </label>
                            <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter Your Name" className="ml-2 p-1 bg-gray-200 border border-gray-300 w-76 h-10" required />
                        </div>

                        <div className="flex items-center gap-2">
                            <label htmlFor="email">
                                <img src={mail} alt="Email Icon" className="w-8 h-6" />
                            </label>
                            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" className="ml-2 p-1 bg-gray-200 border border-gray-300 w-76 h-10" required />
                        </div>

                        <div className="flex items-center gap-2">
                            <label htmlFor="mobile">
                                <img src={mobile} alt="Mobile Icon" className="w-8 h-6" />
                            </label>
                            <input type="tel" id="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Enter Mobile Number" className="ml-2 p-1 bg-gray-200 border border-gray-300 w-76 h-10" required />
                        </div>

                        <div className="flex items-center gap-2">
                            <label htmlFor="password">
                                <img src={lock} alt="Lock Icon" className="w-8 h-6" />
                            </label>
                            <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" className="ml-2 p-1 bg-gray-200 border border-gray-300 w-76 h-10" required />
                        </div>

                        <button type="submit" className="mt-4 relative left-17  w-64 h-12 bg-green-700 text-white font-semibold rounded-md" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm">or Continue With</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <img src={facebook} alt="Facebook" className="w-6 h-6" />
                        <img src={gmail} alt="Gmail" className="w-6 h-6" />
                    </div>
                </div>
                <p className='text-gray-600 text-xs mt-2'>Already have an account? 
                    <span className="text-black font-semibold" onClick={openLogin}> Log In</span>
                     </p>
            </div>
        </div>
    );
};

export default Signup;
