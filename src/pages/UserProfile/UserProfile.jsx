import React, { useContext, useEffect, useState } from 'react';
import { FaUser, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { CustomerContext } from '../../contexts/customerContext';
import { toast } from 'sonner';
import { callApi } from '../../api/api';

export const UserProfile = () => {
    const menuItems = [
        {
            name: 'Thông tin tài khoản',
            link: '/profile'
        },
        {
            name: 'Đơn hàng đã đặt',
            link: '/order-success'
        },
        {
            name: 'Giỏ hàng',
            link: '/cart'
        }
    ];
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Dashboard');
    const { id, fullName, email, address, phone, image, status, customerDispatch } = useContext(CustomerContext);



    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await callApi(
                    "get",
                    `${import.meta.env.VITE_REACT_APP_APIDEV}/client/auth/profile`,
                    {}
                );

                if (res.status === true) {

                    customerDispatch({
                        type: "CUSTOMER-PROFILE",
                        payload: {
                            id: res.data.id,
                            fullName: res.data.fullName,
                            email: res.data.email,
                            address: res.data.address,
                            phone: res.data.phone,
                            image: res.data.image,
                            status: true
                        }
                    });

                } else {

                    customerDispatch({
                        type: "CUSTOMER-PROFILE",
                        payload: {
                            id: -1,
                            fullName: "",
                            email: "",
                            address: "",
                            phone: "",
                            image: "",
                            status: false
                        }
                    });

                    navigate("/");
                }

            } catch (error) {

                console.error("Get profile error:", error);

                customerDispatch({
                    type: "CUSTOMER-PROFILE",
                    payload: {
                        id: -1,
                        fullName: "",
                        email: "",
                        address: "",
                        phone: "",
                        image: "",
                        status: false
                    }
                });

                navigate("/");
            }
        };

        getProfile();

    }, []);



    const handleLogout = () => {
        localStorage.removeItem("token");
        customerDispatch({
            type: "CUSTOMER-PROFILE",
            payload: {
                id: -1,
                fullName: "",
                email: "",
                address: "",
                phone: "",
                image: "",
                status: false
            }
        });
        toast.success("Đăng xuất thành công!")
        navigate("/");
    };

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Page Title */}
                <h1 className="text-3xl font-semibold text-slate-700 mb-8">Tài khoản của tôi</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                    {/* CỘT TRÁI: SIDEBAR MENU */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
                        <h2 className="text-slate-600 font-semibold text-base border-b border-slate-100 pb-3">
                            Menu
                        </h2>

                        <ul className="space-y-3 text-sm">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.link}
                                        onClick={() => setActiveTab(item.name)}
                                        className={`w-full text-left transition cursor-pointer ${activeTab === item.name
                                            ? 'text-primary font-semibold'
                                            : 'text-slate-500 hover:text-primary'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-slate-100 pt-4">
                            <button
                                onClick={handleLogout}
                                className="text-slate-500 hover:text-slate-800 text-sm font-medium transition cursor-pointer">
                                Đăng xuất
                            </button>
                        </div>
                    </div>

                    {/* CỘT PHẢI: NỘI DUNG CHÍNH (ACCOUNT DETAILS) */}
                    <div className="lg:col-span-3 space-y-8">

                        {/* SECTION 1: ACCOUNT INFORMATION */}
                        <section className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-700">
                                    Thông tin tài khoản
                                </h2>
                                <p className="text-sm text-slate-400 mt-1">
                                    Quản lý tài khoản cá nhân và cài đặt tài khoản.
                                </p>
                            </div>

                            <div className="bg-white rounded-[10px] border border-slate-100 shadow-sm overflow-hidden max-w-2xl">
                                {/* Header */}
                                <div className="from-slate-50 to-white px-6 py-5 border-b border-slate-100">
                                    <div className="flex items-center gap-4">

                                        {image ? (

                                            <div className="avatar">
                                                <div className="w-16 rounded-full">
                                                    <img alt="Tailwind-CSS-Avatar-component" src={image} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl flex-shrink-0">
                                                <FaUser />
                                            </div>
                                        )}

                                        <div className="min-w-0">
                                            <h3 className="text-lg font-bold text-slate-700 truncate">
                                                {fullName}
                                            </h3>

                                            <p className="text-sm text-slate-400 truncate">
                                                {email}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Information */}
                                <div className="p-6">
                                    <h4 className="text-sm font-semibold text-slate-700 mb-4">
                                        Thông tin liên hệ
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {/* Full Name */}
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                                Họ và tên:
                                            </p>
                                            <p className="text-sm font-medium text-slate-700">
                                                {fullName}
                                            </p>
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                                Email
                                            </p>
                                            <p className="text-sm font-medium text-slate-700 break-all">
                                                {email}
                                            </p>
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                                Số điện thoại
                                            </p>
                                            <p className="text-sm font-medium text-slate-700">
                                                {phone}
                                            </p>
                                        </div>

                                        {/* Address */}
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                                Địa chỉ
                                            </p>
                                            <p className="text-sm font-medium text-slate-700">
                                                {address}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link
                                            to={"/profile/edit"}
                                            className="
                                                flex-1
                                                inline-flex
                                                items-center
                                                justify-center
                                                gap-2
                                                px-4
                                                py-2.5
                                                rounded-lg
                                                bg-primary
                                                text-white
                                                text-sm
                                                font-medium
                                                hover:opacity-90
                                                transition
                                                cursor-pointer
                                            "
                                        >
                                            Chỉnh sửa
                                            <FaArrowRight className="w-3 h-3" />
                                        </Link>

                                        <button
                                            className="
                                                flex-1
                                                inline-flex
                                                items-center
                                                justify-center
                                                gap-2
                                                px-4
                                                py-2.5
                                                rounded-lg
                                                border
                                                border-slate-200
                                                bg-white
                                                text-slate-600
                                                text-sm 
                                                font-medium
                                                hover:bg-slate-100
                                                transition
                                                cursor-pointer
                                            "
                                        >
                                            Đổi mật khẩu
                                            <FaArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* SECTION 2: ADDRESS BOOK */}

                    </div>

                </div>

            </div>
        </div>
    );
};