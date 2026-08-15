import React from 'react';
import { useLocation, Link, Navigate } from 'react-router';
import { FaCheckCircle, FaShoppingBag, FaHome, FaMapMarkerAlt, FaReceipt, FaMoneyBillWave } from 'react-icons/fa';

const OrderSuccessPage = () => {
    const location = useLocation();
    
    // Lấy dữ liệu đơn hàng được truyền qua navigate('/order-success', { state: { orderData } })
    const orderData = location.state?.orderData;

    // Nếu người dùng truy cập trực tiếp URL mà không có dữ liệu đơn hàng -> Chuyển hướng về trang chủ
    if (!orderData) {
        return <Navigate to="/" replace />;
    }

    const { customer, items, totalAmount, createdAt, orderId } = orderData;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">
                
                {/* ICON & THÔNG BÁO THÀNH CÔNG */}
                <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-6">
                    <FaCheckCircle className="mx-auto text-6xl text-emerald-500 mb-4 animate-bounce" />
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                        Đặt hàng thành công!
                    </h1>
                    <p className="text-gray-600">
                        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn.
                    </p>
                    <div className="mt-4 inline-block bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-emerald-200">
                        Mã đơn hàng: #{orderId || Math.floor(100000 + Math.random() * 900000)}
                    </div>
                </div>

                {/* THÔNG TIN CHI TIẾT ĐƠN HÀNG */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <FaReceipt className="text-primary" /> Chi tiết đơn hàng
                        </h2>
                        <span className="text-xs text-gray-500">
                            {new Date(createdAt || Date.now()).toLocaleString('vi-VN')}
                        </span>
                    </div>

                    {/* Danh sách sản phẩm */}
                    <div className="p-6 divide-y divide-gray-100">
                        {items && items.map((item, index) => (
                            <div key={item.id || index} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.bookName || item.title}
                                    className="w-16 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                                        {item.bookName || item.title}
                                    </h3>
                                    {item.author && (
                                        <p className="text-xs text-gray-500 truncate">Tác giả: {item.author}</p>
                                    )}
                                    <p className="text-xs text-gray-500 mt-1">
                                        Số lượng: <span className="font-semibold text-gray-700">{item.buyQuantity || item.quantity}</span>
                                    </p>
                                </div>
                                <div className="text-right text-sm font-bold text-gray-800">
                                    {((item.price || 0) * (item.buyQuantity || item.quantity || 1)).toLocaleString('vi-VN')} đ
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tổng tiền & Thông tin thanh toán */}
                    <div className="bg-gray-50 p-6 border-t border-gray-100 space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between items-center">
                            <span>Phương thức thanh toán:</span>
                            <span className="font-medium text-gray-800 flex items-center gap-1.5">
                                <FaMoneyBillWave className="text-emerald-600" />
                                {customer?.paymentMethod === 'cod' ? 'Thanh toán trực tiếp (COD)' : 'Ví ZaloPay'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-base pt-2 border-t border-gray-200 mt-2 font-bold text-gray-900">
                            <span>Tổng tiền đã thanh toán:</span>
                            <span className="text-xl text-primary">{totalAmount?.toLocaleString('vi-VN')} đ</span>
                        </div>
                    </div>
                </div>

                {/* THÔNG TIN NGƯỜI NHẬN */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-3">
                        <FaMapMarkerAlt className="text-primary" /> Thông tin giao hàng
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500 mb-1">Họ và tên người nhận:</p>
                            <p className="font-semibold text-gray-800">{customer?.fullName}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-1">Số điện thoại:</p>
                            <p className="font-semibold text-gray-800">{customer?.phone}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-1">Email:</p>
                            <p className="font-semibold text-gray-800">{customer?.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-1">Địa chỉ nhận hàng:</p>
                            <p className="font-semibold text-gray-800">{customer?.address}</p>
                        </div>
                    </div>
                </div>

                {/* NÚT ĐIỀU HƯỚNG */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="btn btn-outline border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl flex items-center justify-center gap-2"
                    >
                        <FaHome /> Về trang chủ
                    </Link>
                    <Link
                        to="/shop"
                        className="btn btn-primary rounded-xl flex items-center justify-center gap-2 text-white"
                    >
                        <FaShoppingBag /> Tiếp tục mua sắm
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccessPage;