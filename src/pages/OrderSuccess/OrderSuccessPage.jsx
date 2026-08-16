import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router';
import { 
    FaCheckCircle, 
    FaTimesCircle, 
    FaShoppingBag, 
    FaHome, 
    FaMapMarkerAlt, 
    FaReceipt, 
    FaMoneyBillWave,
    FaRedo
} from 'react-icons/fa';

const OrderSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. LẤY PARAMS TRẢ VỀ TỪ ZALOPAY REDIRECT
    const queryParams = new URLSearchParams(location.search);
    const zalopayStatus = queryParams.get('status'); // '1' là thành công, khác '1' là hủy/lỗi
    const appTransId = queryParams.get('apptransid');

    // 2. LẤY STATE NẾU ĐI TỪ LUỒNG COD
    const orderData = location.state?.orderData;

    const [isSuccess, setIsSuccess] = useState(true);

    useEffect(() => {
        // Nếu chuyển hướng từ ZaloPay về và status khác '1' -> Đánh dấu thanh toán thất bại/hủy
        if (zalopayStatus && zalopayStatus !== '1') {
            setIsSuccess(false);
        }
    }, [zalopayStatus]);

    // GIAO DIỆN HỦY / THANH TOÁN THẤT BẠI (ZALOPAY)
    if (!isSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 py-16 px-4 font-sans flex items-center justify-center">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <FaTimesCircle className="mx-auto text-6xl text-red-500 mb-4 animate-pulse" />
                    <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
                        Thanh toán không thành công
                    </h1>
                    <p className="text-gray-600 text-sm mb-6">
                        Bạn đã hủy giao dịch hoặc có lỗi xảy ra trong quá trình thanh toán qua ZaloPay.
                    </p>

                    {appTransId && (
                        <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500 mb-6 border">
                            Mã giao dịch: <strong>{appTransId}</strong>
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full py-3 bg-primary text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all"
                        >
                            <FaRedo /> Thử thanh toán lại
                        </button>
                        <Link
                            to="/"
                            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                        >
                            <FaHome /> Về trang chủ
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // GIAO DIỆN THANH TOÁN THÀNH CÔNG (DÙNG CHO CẢ COD VÀ ZALOPAY)
    const customer = orderData?.customer;
    const items = orderData?.items || [];
    const totalAmount = orderData?.totalAmount;
    const createdAt = orderData?.createdAt;
    const orderId = orderData?.orderId || appTransId;

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
                    {orderId && (
                        <div className="mt-4 inline-block bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-emerald-200">
                            Mã đơn hàng: #{orderId}
                        </div>
                    )}
                </div>

                {/* THÔNG TIN CHI TIẾT ĐƠN HÀNG (HIỂN THỊ NẾU CÓ DỮ LIỆU) */}
                {items.length > 0 && (
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
                            {items.map((item, index) => (
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

                        {/* Tổng tiền & Phương thức thanh toán */}
                        <div className="bg-gray-50 p-6 border-t border-gray-100 space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between items-center">
                                <span>Phương thức thanh toán:</span>
                                <span className="font-medium text-gray-800 flex items-center gap-1.5">
                                    <FaMoneyBillWave className="text-emerald-600" />
                                    {customer?.paymentMethod === 'cod' ? 'Thanh toán trực tiếp (COD)' : 'Ví / Thẻ ZaloPay'}
                                </span>
                            </div>
                            {totalAmount && (
                                <div className="flex justify-between items-center text-base pt-2 border-t border-gray-200 mt-2 font-bold text-gray-900">
                                    <span>Tổng tiền đã thanh toán:</span>
                                    <span className="text-xl text-primary">{totalAmount?.toLocaleString('vi-VN')} đ</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* THÔNG TIN NGƯỜI NHẬN (NẾU CÓ) */}
                {customer && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-3">
                            <FaMapMarkerAlt className="text-primary" /> Thông tin giao hàng
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 mb-1">Họ và tên người nhận:</p>
                                <p className="font-semibold text-gray-800">{customer.fullName}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Số điện thoại:</p>
                                <p className="font-semibold text-gray-800">{customer.phone}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Email:</p>
                                <p className="font-semibold text-gray-800">{customer.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Địa chỉ nhận hàng:</p>
                                <p className="font-semibold text-gray-800">{customer.address}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* NÚT ĐIỀU HƯỚNG */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                        <FaHome /> Về trang chủ
                    </Link>
                    <Link
                        to="/shop"
                        className="px-6 py-3 bg-primary hover:bg-opacity-90 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                        <FaShoppingBag /> Tiếp tục mua sắm
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccessPage;