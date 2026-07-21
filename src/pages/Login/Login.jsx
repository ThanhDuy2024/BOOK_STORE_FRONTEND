import { RiLockPasswordLine } from "react-icons/ri";
import { BsBook } from "react-icons/bs";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { callApi } from "../../api/api"
import axios from "axios";
const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        text: "",
        password: "",
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setLoginData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_APIDEV}/admin/auth/login`, {
                adminName: loginData.text,
                password: loginData.password
            })
            if(res.data.status === false) {
                console.log(res.data.msg);
            } else if(loginData.remember === true) {
                localStorage.setItem("token", res.data.token);
                navigate("/admin/dashboard")
            } else if (loginData.remember === false) {
                sessionStorage.setItem("token", res.data.token);
                navigate("/admin/dashboard")
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">

            <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden">

                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[650px]">

                    {/* LEFT */}

                    <div className="hidden lg:flex bg-slate-50 flex-col items-center justify-center px-10">

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="Login"
                            className="w-72"
                        />

                        <h2 className="text-4xl font-bold text-slate-700 mt-8">
                            Welcome Back
                        </h2>

                        <p className="text-slate-500 mt-3 text-lg text-center">
                            Book Store Management System
                        </p>

                    </div>

                    {/* RIGHT */}

                    <div className="flex items-center justify-center px-8 py-12">

                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-md"
                        >

                            <div className="flex justify-center">

                                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">

                                    <BsBook
                                        size={34}
                                        className="text-white"
                                    />

                                </div>

                            </div>

                            <h1 className="text-4xl font-bold text-center mt-8 mb-10">
                                Member Login
                            </h1>

                            {/* Email */}

                            <label className="input input-bordered w-full flex items-center gap-3 mb-6 rounded-xl">

                                <FaRegUser className="text-gray-500" />

                                <input
                                    type="text"
                                    name="text"
                                    value={loginData.text}
                                    onChange={handleChange}
                                    className="grow"
                                    placeholder="Admin name"
                                />

                            </label>

                            {/* Password */}

                            <label className="input input-bordered w-full flex items-center gap-3 mb-6 rounded-xl">

                                <RiLockPasswordLine className="text-gray-500" />

                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    className="grow"
                                    placeholder="Password"
                                />

                            </label>

                            {/* Remember */}

                            <div className="flex justify-between items-center mb-8">

                                <label className="flex items-center gap-2 cursor-pointer">

                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary checkbox-sm"
                                        name="remember"
                                        checked={loginData.remember}
                                        onChange={handleChange}
                                    />

                                    <span className="text-gray-600">
                                        Remember me
                                    </span>

                                </label>

                                <a
                                    href="#"
                                    className="text-blue-600 hover:underline"
                                >
                                    Forgot Password?
                                </a>

                            </div>

                            <button
                                type="submit"
                                className="btn w-full rounded-full bg-blue-600 hover:bg-blue-700 border-none text-white text-lg h-14"
                            >
                                LOGIN
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;