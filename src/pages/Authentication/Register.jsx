import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaGoogle, FaFacebook } from 'react-icons/fa';
import { callApi } from '../../api/api';
import { toast } from 'sonner';

export const Register = ({ onNavigateToOtp }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Mật khẩu nhập lại không trùng khớp!');
      return;
    }

    setLoading(true);
    try {
      const res = await callApi("post", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/auth/otp`, {
        email: formData.email
      });

      if (res.status === true) {
        setTimeout(() => {
          setLoading(false);

          onNavigateToOtp({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password
          });
        }, 1000);
      } else {
        toast.error("Email của bạn đã tồn tại!");
      }

    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-[50px] mb-[400px]">
      <div className="w-full max-w-4xl bg-white rounded-[10px] shadow-md border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Banner */}
        <div className="relative hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
          <div className="space-y-2 z-10">
            <span className="text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white font-semibold">
              BOOKSTORE PLATFORM
            </span>
            <h3 className="text-3xl font-bold leading-snug mt-[10px]">Khám phá tri thức mới mỗi ngày</h3>
          </div>

          <div className="my-auto py-6 z-10 flex justify-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/online-library-illustration-download-in-svg-png-gif-file-formats--digital-book-bookshelf-reading-pack-school-education-illustrations-4379812.png"
              alt="Book Illustration"
              className="max-h-52 object-contain drop-shadow-xl"
            />
          </div>

          <p className="text-xs text-indigo-100/80 z-10">
            "Sách là nguồn tri thức vô tận của nhân loại."
          </p>

          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* Form Đăng ký */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-800">Tạo tài khoản</h2>
            <p className="text-slate-500 text-xs mt-1">
              Điền thông tin bên dưới để bắt đầu trải nghiệm.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Họ và tên */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                HỌ VÀ TÊN
              </label>
              <div className="relative">
                <FaUser className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                EMAIL
              </label>
              <div className="relative">
                <FaEnvelope className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
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
                <FaLock className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash className="w-3.5 h-3.5" /> : <FaEye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Nhập lại Mật khẩu */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                NHẬP LẠI MẬT KHẨU
              </label>
              <div className="relative">
                <FaLock className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash className="w-3.5 h-3.5" /> : <FaEye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition cursor-pointer text-sm"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Đăng ký ngay</span>
                  <FaArrowRight className="w-3 h-3" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative bg-white px-3 text-xs text-slate-400">Hoặc</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-xs font-semibold text-slate-700 cursor-pointer">
              <FaGoogle className="text-red-500 text-sm" /> Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-xs font-semibold text-slate-700 cursor-pointer">
              <FaFacebook className="text-blue-600 text-sm" /> Facebook
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};