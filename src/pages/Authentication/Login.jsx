import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaGoogle, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { toast } from "sonner"
import { CustomerContext } from '../../contexts/customerContext';
export const LoginClient = () => {
  const navigate = useNavigate();
  const { customerDispatch } = useContext(CustomerContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_APIDEV}/client/auth/login`, {
        email: formData.email,
        password: formData.password
      });

      if (res.data.status === true) {
        localStorage.setItem("token", res.data.clientToken);
        customerDispatch({
          type: "CUSTOMER-PROFILE",
          payload: {
            id: res.data.data.id,
            fullName: res.data.data.fullName,
            email: res.data.data.email,
            address: res.data.data.address,
            phone: res.data.data.phone,
            image: res.data.data.image,
            status: true
          }
        })
        toast.success("Đăng nhập thành công");
        navigate("/");
      } else {
        toast.error("Email hoặc mật khẩu của bạn không đúng")
      }
    } catch (error) {
      console.log(error);
      toast.error("Email hoặc mật khẩu của bạn không đúng")
    }
  };

  return (
    <div className="flex items-center justify-center mt-[50px] mb-[400px]">
      <div className="w-full max-w-4xl bg-white rounded-[10px] shadow-md border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Cột Trái: Banner Minh Họa */}
        <div className="relative hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
          <div className="space-y-2 z-10">
            <span className="text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white font-semibold">
              BOOKSTORE PLATFORM
            </span>
            <h3 className="text-3xl font-bold leading-snug mt-[10px]">Khám phá tri thức mới mỗi ngày</h3>
          </div>

          <div className="my-auto py-8 z-10 flex justify-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/online-library-illustration-download-in-svg-png-gif-file-formats--digital-book-bookshelf-reading-pack-school-education-illustrations-4379812.png"
              alt="Book Illustration"
              className="max-h-56 object-contain drop-shadow-xl"
            />
          </div>

          <p className="text-xs text-indigo-100/80 z-10">
            "Sách là nguồn tri thức vô tận của nhân loại."
          </p>

          {/* Họa tiết trang trí làm mờ */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* Cột Phải: Form Đăng Ký */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Đăng nhập tài khoản</h2>
            <p className="text-slate-500 text-xs mt-1">
              Chào mừng bạn đã quay trở lại.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                EMAIL
              </label>
              <div className="relative">
                <FaEnvelope className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                MẬT KHẨU
              </label>
              <div className="relative">
                <FaLock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Nút submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition cursor-pointer text-sm"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Đăng nhập</span>
                </>
              )}
            </button>
          </form>

          {/* Đường phân cách */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative bg-white px-3 text-xs text-slate-400">Hoặc đăng ký bằng</span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-xs font-semibold text-slate-700 cursor-pointer">
              <FaGoogle className="text-red-500 text-sm" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-xs font-semibold text-slate-700 cursor-pointer">
              <FaFacebook className="text-blue-600 text-sm" /> Facebook
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};