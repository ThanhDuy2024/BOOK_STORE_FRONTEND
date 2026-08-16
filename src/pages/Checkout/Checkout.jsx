import React, { useState, useEffect, useContext } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaMoneyBillWave, FaWallet, FaLock, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'sonner';
import { callApi } from '../../api/api';
import { CartContext } from '../../contexts/cartContext';
import { useNavigate } from 'react-router';
const CheckoutPage = () => {
    const { cartDispatch } = useContext(CartContext);
    const navigate = useNavigate();
    // 1. Quản lý thông tin form người dùng (Default paymentMethod = 'cod')
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: 'cod', // Mặc định là Thanh toán trực tiếp
    });

    const [errors, setErrors] = useState({});
    const [cartItems, setCartItems] = useState([]);

    // 2. Lấy danh sách giỏ hàng từ localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart_items');
        const parsedCart = savedCart ? JSON.parse(savedCart) : [];
        setCartItems(parsedCart);
    }, []);

    // 3. Xử lý thay đổi dữ liệu trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // 4. Validate dữ liệu đầu vào
    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Họ và tên là bắt buộc';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Số điện thoại là bắt buộc';
        } else if (!/^[0-9]{10,11}$/.test(formData.phone.trim())) {
            newErrors.phone = 'Số điện thoại phải từ 10-11 chữ số';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Địa chỉ giao hàng là bắt buộc';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 5. Xử lý khi nhấn nút Đặt hàng
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (cartItems.length === 0) {
            toast.error('Giỏ hàng của bạn đang trống!');
            return;
        }

        const orderData = {
            customer: formData,
            items: cartItems,
            totalAmount: grandTotal,
            createdAt: new Date().toISOString()
        };

        try {
            // Tách rõ ràng 2 nhánh theo phương thức thanh toán:

            // 1. XỬ LÝ THANH TOÁN THỜI ĐIỂM NHẬN HÀNG (COD)
            if (formData.paymentMethod === 'cod') {
                const res = await callApi("post", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/order`, orderData);

                if (res && res.status === true) {
                    // Xóa giỏ hàng
                    localStorage.removeItem('cart_items');
                    setCartItems([]);
                    if (cartDispatch) cartDispatch({ type: "CART-CLEAR" });

                    toast.success("Đặt hàng thành công!");
                    navigate('/order/success', {
                        state: {
                            orderData: { ...orderData, orderId: res.orderId }
                        }
                    });
                } else {
                    toast.error(res?.msg || "Đặt hàng thất bại!");
                }
            }

            // 2. XỬ LÝ THANH TOÁN QUA ZALOPAY
            else if (formData.paymentMethod === 'zalopay') {
                const res = await callApi("post", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/order/zalopay`, orderData);

                if (res && res.status === true && res.paymentUrl) {
                    // Xóa giỏ hàng trước khi chuyển hướng sang Gateway ZaloPay
                    localStorage.removeItem('cart_items');
                    setCartItems([]);
                    if (cartDispatch) cartDispatch({ type: "CART-CLEAR" });

                    // Chuyển hướng trực tiếp sang trang thanh toán ZaloPay Gateway
                    window.location.href = res.paymentUrl;
                } else {
                    toast.error(res?.msg || "Không thể tạo liên kết thanh toán ZaloPay!");
                }
            }
        } catch (error) {
            console.error("Submit order error:", error);
            toast.error("Có lỗi xảy ra khi đặt hàng!");
        }
    };

    // 6. Tính toán tiền hàng
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    const shippingFee = cartItems.length > 0 ? 30000 : 0;
    const grandTotal = subtotal;

    return (
        <div className="max-w-6xl mx-auto p-6 font-sans text-gray-700">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Thanh Toán Đơn Hàng</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* BÊN TRÁI: THÔNG TIN GIAO HÀNG & THANH TOÁN (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <FaUser className="text-primary" /> Thông tin người nhận
                    </h2>

                    {/* Họ và tên */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Họ và tên <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Nguyễn Văn A"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none ${errors.fullName ? 'border-error focus:ring-1 focus:ring-error' : 'border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary'
                                    }`}
                            />
                            <FaUser className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                        </div>
                        {errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-error">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none ${errors.email ? 'border-error focus:ring-1 focus:ring-error' : 'border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary'
                                        }`}
                                />
                                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                            </div>
                            {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Số điện thoại <span className="text-error">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="0912345678"
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none ${errors.phone ? 'border-error focus:ring-1 focus:ring-error' : 'border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary'
                                        }`}
                                />
                                <FaPhone className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                            </div>
                            {errors.phone && <p className="text-error text-xs mt-1">{errors.phone}</p>}
                        </div>
                    </div>

                    {/* Địa chỉ */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Địa chỉ nhận hàng <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                            <textarea
                                name="address"
                                rows="3"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none ${errors.address ? 'border-error focus:ring-1 focus:ring-error' : 'border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary'
                                    }`}
                            ></textarea>
                            <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                        </div>
                        {errors.address && <p className="text-error text-xs mt-1">{errors.address}</p>}
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="pt-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaMoneyBillWave className="text-primary" /> Phương thức thanh toán
                        </h2>

                        <div className="space-y-3">
                            {/* Thanh toán trực tiếp */}
                            <label
                                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'cod'
                                    ? 'border-primary bg-primary/10 ring-1 ring-primary'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={handleChange}
                                        className="radio radio-primary radio-sm"
                                    />
                                    <div className="flex items-center gap-2 font-medium text-gray-800 text-sm">
                                        <FaMoneyBillWave className="text-green-600 text-lg" />
                                        Thanh toán trực tiếp (Khi nhận hàng / COD)
                                    </div>
                                </div>
                                {formData.paymentMethod === 'cod' && <FaCheckCircle className="text-primary text-lg" />}
                            </label>

                            {/* ZaloPay */}
                            <label
                                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'zalopay'
                                    ? 'border-primary bg-primary/10 ring-1 ring-primary'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="zalopay"
                                        checked={formData.paymentMethod === 'zalopay'}
                                        onChange={handleChange}
                                        className="radio radio-primary radio-sm"
                                    />
                                    <div className="flex items-center gap-2 font-medium text-gray-800 text-sm">
                                        <FaWallet className="text-blue-500 text-lg" />
                                        Ví ZaloPay
                                    </div>
                                </div>
                                {formData.paymentMethod === 'zalopay' && <FaCheckCircle className="text-primary text-lg" />}
                            </label>
                        </div>
                    </div>
                </div>

                {/* BÊN PHẢI: ĐƠN HÀNG THANH TOÁN (SUMMARY - 5 cols) */}
                <div className="lg:col-span-5">
                    <div className="bg-base-200/50 border border-gray-200 rounded-2xl p-6 sticky top-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-3">Đơn hàng</h2>

                        {/* Danh sách sản phẩm */}
                        <div className="max-h-72 overflow-y-auto pr-2 space-y-4 divide-y divide-gray-200">
                            {cartItems && cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 pt-4 first:pt-0 items-center">
                                        <img
                                            src={item.image}
                                            alt={item.bookName || item.title}
                                            className="w-16 h-20 object-cover rounded-md border border-gray-200 flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-gray-800 truncate">
                                                {item.bookName || item.title}
                                            </h4>
                                            {item.author && (
                                                <p className="text-xs text-gray-500 truncate">
                                                    Tác giả: {item.author}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-500 mt-1">
                                                Số lượng: <span className="font-semibold">{item.buyQuantity}</span>
                                            </p>
                                        </div>
                                        <div className="text-right font-semibold text-sm text-gray-800">
                                            {((item.price || 0) * (item.buyQuantity || 1)).toLocaleString('vi-VN')} đ
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 py-4 text-center">Giỏ hàng trống</p>
                            )}
                        </div>

                        {/* Chi tiết tính tiền */}
                        <div className="border-t border-gray-300 pt-4 mt-6 space-y-3 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Tạm tính</span>
                                <span className="font-semibold text-gray-800">
                                    {subtotal.toLocaleString('vi-VN')} đ
                                </span>
                            </div>
                            {/* <div className="flex justify-between">
                                <span>Phí vận chuyển</span>
                                <span className="font-semibold text-gray-800">
                                    {shippingFee.toLocaleString('vi-VN')} đ
                                </span>
                            </div> */}
                        </div>

                        {/* Tổng thanh toán */}
                        <div className="border-t border-gray-300 pt-4 mt-4 flex justify-between items-center">
                            <span className="text-base font-bold text-gray-800">Tổng thanh toán</span>
                            <span className="text-xl font-extrabold text-primary">
                                {grandTotal.toLocaleString('vi-VN')} đ
                            </span>
                        </div>

                        {/* Nút hoàn tất đặt hàng */}
                        <button
                            type="submit"
                            className="btn btn-primary rounded-[15px] w-full mt-6 shadow-md flex items-center justify-center gap-2"
                        >
                            <FaLock className="text-sm" /> Xác nhận & Thanh toán
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default CheckoutPage;