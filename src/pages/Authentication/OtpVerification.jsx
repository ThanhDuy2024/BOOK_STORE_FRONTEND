import React, { useState, useRef } from 'react';
import { FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { callApi } from '../../api/api';

export const OtpVerification = ({ userData, onBack }) => {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { fullName, email, password } = userData || {};
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);


  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      setOtp(pasteData.split(''));
      inputRefs.current[5].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) return;

    setLoading(true);
    try {
      const payload = {
        fullName,
        email,
        password,
        otp: otpCode
      };

      console.log('API Register Payload:', payload);

      // TODO: Gọi API tạo tài khoản chính thức ở đây
      const res = await callApi("post", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/auth/register`, payload);

      if (res.status === true) {
        setLoading(false);
        toast.success(`Chào mừng ${fullName}! Tài khoản đã tạo thành công.`);
        navigate("/login");
      } else {
        toast.error("Email của bạn đã tồn tại trong hệ thống!")
        navigate("/register")
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Banner bên trái */}
        <div className="relative hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
          <div className="space-y-2 z-10">
            <span className="text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white font-semibold">
              BẢO MẬT TÀI KHOẢN
            </span>
            <h3 className="text-3xl font-bold leading-snug">Xác thực mã OTP</h3>
          </div>

          <div className="my-auto py-6 z-10 flex justify-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/otp-verification-illustration-download-in-svg-png-gif-file-formats--security-password-protection-cyber-pack-cyber-security-illustrations-4379815.png"
              alt="OTP Illustration"
              className="max-h-52 object-contain drop-shadow-xl"
            />
          </div>

          <p className="text-xs text-indigo-100/80 z-10">
            "Kiểm tra hộp thư đến hoặc thư rác để nhận mã xác nhận."
          </p>

          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* Form OTP bên phải */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition mb-6 cursor-pointer w-fit"
          >
            <FaArrowLeft className="w-3 h-3" /> Quay lại
          </button>

          <div className="mb-6">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-3">
              <FaShieldAlt className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Nhập mã xác thực</h2>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              Xin chào <span className="font-semibold text-slate-700">{fullName}</span>, mã OTP 6 chữ số đã được gửi tới email <span className="font-semibold text-slate-700">{email}</span>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-between gap-1.5" onPaste={handlePaste}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-11 h-12 text-center text-lg font-bold text-slate-800 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition bg-slate-50 focus:bg-white"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || otp.join('').length < 6}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer text-sm"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Hoàn tất xác thực'
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};