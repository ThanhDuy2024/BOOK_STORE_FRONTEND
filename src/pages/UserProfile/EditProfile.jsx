import React, { useContext, useEffect, useState } from 'react';
import { FaUser, FaArrowRight, FaCamera } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { CustomerContext } from '../../contexts/customerContext';
import { toast } from 'sonner';
import { callApi } from '../../api/api';

export const EditProfile = () => {
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
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
    });
    const [avatarPreview, setAvatarPreview] = useState("");

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


    useEffect(() => {
        setFormData({
            fullName: fullName || "",
            email: email || "",
            phone: phone || "",
            address: address || "",
        });
        setAvatarPreview(image || "");
    }, [fullName, email, phone, address, image]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCancel = () => {
        setFormData({
            fullName: fullName || "",
            email: email || "",
            phone: phone || "",
            address: address || "",
        });

        setAvatarPreview(image || "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Kiểm tra dữ liệu
            if (!formData.fullName.trim()) {
                toast.error("Vui lòng nhập họ và tên!");
                return;
            }

            if (!formData.email.trim()) {
                toast.error("Vui lòng nhập email!");
                return;
            }

            if (!formData.phone.trim()) {
                toast.error("Vui lòng nhập số điện thoại!");
                return;
            }

            if (!formData.address.trim()) {
                toast.error("Vui lòng nhập địa chỉ!");
                return;
            }

            // Data chuẩn bị gửi lên backend
            const data = {
                id: id,
                fullName: formData.fullName.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                address: formData.address.trim(),
            };

            console.log("Data submit:", data);

            // Sau này gọi API ở đây
            // await axios.put(`/api/customer/${id}`, data);

            toast.success("Cập nhật thông tin thành công!");

        } catch (error) {
            console.error("Update profile error:", error);

            toast.error("Cập nhật thông tin thất bại!");
        }
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
                            {/* Tiêu đề */}
                            <div>
                                <h2 className="text-xl font-semibold text-slate-700">
                                    Chỉnh sửa thông tin
                                </h2>

                                <p className="text-sm text-slate-400 mt-1">
                                    Cập nhật thông tin cá nhân của bạn.
                                </p>
                            </div>

                            {/* Card */}
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm max-w-2xl overflow-hidden">

                                {/* Header */}
                                <div className="px-6 py-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                                    <div className="flex items-center gap-4">

                                        {/* Avatar */}
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl overflow-hidden">
                                                {avatarPreview ? (
                                                    <img
                                                        src={avatarPreview}
                                                        alt="Avatar"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <FaUser />
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                className="
                                                    absolute
                                                    -bottom-1
                                                    -right-1
                                                    w-7
                                                    h-7
                                                    rounded-full
                                                    bg-primary
                                                    text-white
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-xs
                                                    shadow
                                                    hover:opacity-90
                                                    transition
                                                "
                                            >
                                                <FaCamera />
                                            </button>
                                        </div>

                                        {/* Thông tin */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-700">
                                                Thông tin cá nhân
                                            </h3>

                                            <p className="text-sm text-slate-400 mt-1">
                                                Cập nhật thông tin tài khoản của bạn bên dưới.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Form */}
                                <form className="p-6 space-y-6" onSubmit={handleSubmit}>

                                    {/* Họ và tên */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600">
                                            Họ và tên
                                        </label>

                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Nhập họ và tên"
                                            className="
                                                w-full
                                                px-4
                                                py-3
                                                rounded-xl
                                                border
                                                border-slate-200
                                                text-sm
                                                text-slate-700
                                                outline-none
                                                focus:border-primary
                                                focus:ring-2
                                                focus:ring-primary/10
                                                transition
                                            "
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            readOnly
                                            placeholder="Nhập địa chỉ email"
                                            className="
                                                w-full
                                                px-4
                                                py-3
                                                rounded-xl
                                                border
                                                border-slate-200
                                                text-sm
                                                text-slate-700
                                                outline-none
                                                focus:border-primary
                                                focus:ring-2
                                                focus:ring-primary/10
                                                transition
                                            "
                                        />
                                    </div>

                                    {/* Số điện thoại + Địa chỉ */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                        {/* Số điện thoại */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600">
                                                Số điện thoại
                                            </label>

                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Nhập số điện thoại"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-3
                                                    rounded-xl
                                                    border
                                                    border-slate-200
                                                    text-sm
                                                    text-slate-700
                                                    outline-none
                                                    focus:border-primary
                                                    focus:ring-2
                                                    focus:ring-primary/10
                                                    transition
                                                "
                                            />
                                        </div>

                                        {/* Địa chỉ */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-600">
                                                Địa chỉ
                                            </label>

                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="Nhập địa chỉ"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-3
                                                    rounded-xl
                                                    border
                                                    border-slate-200
                                                    text-sm
                                                    text-slate-700
                                                    outline-none
                                                    focus:border-primary
                                                    focus:ring-2
                                                    focus:ring-primary/10
                                                    transition
                                                "
                                            />
                                        </div>
                                    </div>

                                    {/* Đường phân cách */}
                                    <div className="border-t border-slate-100" />

                                    {/* Button */}
                                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="
                                                px-5
                                                py-2.5
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-white
                                                text-slate-600
                                                text-sm
                                                font-medium
                                                hover:bg-slate-50
                                                transition
                                                cursor-pointer
                                            "
                                        >
                                            Hủy
                                        </button>

                                        <button
                                            type="submit"
                                            className="
                                                px-6
                                                py-2.5
                                                rounded-xl
                                                bg-primary
                                                text-white
                                                text-sm
                                                font-medium
                                                shadow-sm
                                                hover:opacity-90
                                                transition
                                            "
                                        >
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                        {/* SECTION 2: ADDRESS BOOK */}

                    </div>

                </div>

            </div>
        </div>
    );
};