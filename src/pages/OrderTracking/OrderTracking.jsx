import React, { useState } from 'react';
import { 
  FaSearch, 
  FaBox, 
  FaTruck, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaEnvelope, 
  FaHashtag, 
  FaFileInvoice
} from 'react-icons/fa';
import { callApi } from "../../api/api"
export const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState(null);

  // Giả lập danh sách trạng thái
  const statusSteps = [
    { key: 'init', label: 'Mới tạo', icon: FaFileInvoice },
    { key: 'pending', label: 'Chờ xác nhận', icon: FaClock },
    { key: 'confirmed', label: 'Đã xác nhận', icon: FaBox },
    { key: 'shipping', label: 'Đang giao hàng', icon: FaTruck },
    { key: 'delivered', label: 'Giao thành công', icon: FaCheckCircle },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!orderId.trim() || !email.trim()) {
      setError('Vui lòng nhập đầy đủ Mã đơn hàng và Email!');
      return;
    }

    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      // TODO: Thay thế bằng hàm callApi thực tế của bạn
      const res = await callApi('post', `${import.meta.env.VITE_REACT_APP_APIDEV}/client/tracking`, {
        orderId: orderId,
        email: email
      });

      console.log(res.data);
      // Giả lập delay mạng 1s & Dữ liệu Mock
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data phản hồi từ API
      const mockResult = {
        id: orderId,
        customerName: res.data.fullName,
        email: email,
        phone: res.data.phone,
        address: res.data.address,
        status: res.data.status, // PENDING, CONFIRMED, SHIPPING, DELIVERED, CANCELLED
        createdAt: res.data.createdAtFormat,
        totalAmount: res.data.totalAmount,
        items: res.data.items
      };

      setOrderData(mockResult);
    } catch (err) {
      console.error(err);
      setError('Không tìm thấy thông tin đơn hàng! Vui lòng kiểm tra lại Mã đơn hàng và Email.');
    } finally {
      setLoading(false);
    }
  };

  // Xác định vị trí trạng thái hiện tại trong Timeline
  const getCurrentStepIndex = (status) => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-base-content">Tra Cứu Đơn Hàng</h1>
          <p className="text-sm text-base-content/70">
            Nhập thông tin bên dưới để kiểm tra tiến trình giao hàng của bạn
          </p>
        </div>

        {/* Search Card Form */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                
                {/* Input Order ID */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <FaHashtag className="text-primary" /> Mã đơn hàng
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="VD: ORD12345"
                    className="input input-bordered w-full focus:input-primary"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>

                {/* Input Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <FaEnvelope className="text-primary" /> Email đặt hàng
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="input input-bordered w-full focus:input-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Thông báo Lỗi */}
              {error && (
                <div className="alert alert-error text-xs shadow-sm py-2 text-white font-bold">
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="form-control mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-primary w-full text-white ${loading ? 'loading' : ''}`}
                >
                  {!loading && <FaSearch className="mr-2" />}
                  {loading ? 'Đang tra cứu...' : 'Tra cứu ngay'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Kết Quả Tra Cứu Đơn Hàng */}
        {orderData && (
          <div className="card bg-base-100 shadow-xl border border-base-300 space-y-6 p-6">
            
            {/* Header thông tin chung */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-base-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-base-content">
                  Đơn hàng #{orderData.id}
                </h2>
                <p className="text-xs text-base-content/60 mt-1">
                  Ngày đặt: {orderData.createdAt}
                </p>
              </div>

              <div>
                {orderData.status === 'canceled' ? (
                  <div className="badge badge-error gap-2 p-3 text-white font-semibold">
                    <FaTimesCircle /> Đã hủy
                  </div>
                ) : (
                  <div className="badge badge-primary gap-2 p-3 font-semibold">
                    {statusSteps.find(s => s.key === orderData.status)?.label || 'Đang xử lý'}
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Tiến Trình (DaisyUI Steps Component) */}
            {orderData.status !== 'canceled' && (
              <div className="py-4 overflow-x-auto">
                <ul className="steps steps-vertical sm:steps-horizontal w-full">
                  {statusSteps.map((step, idx) => {
                    const currentIndex = getCurrentStepIndex(orderData.status);
                    const isPassed = idx <= currentIndex;
                    const IconComponent = step.icon;

                    return (
                      <li
                        key={step.key}
                        className={`step ${isPassed ? 'step-primary' : ''}`}
                        data-content={isPassed ? '✓' : idx + 1}
                      >
                        <div className="flex flex-col items-center mt-2">
                          <IconComponent className={`text-lg mb-1 ${isPassed ? 'text-primary' : 'text-base-content/40'}`} />
                          <span className={`text-xs ${isPassed ? 'font-semibold text-base-content' : 'text-base-content/50'}`}>
                            {step.label}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Thông tin người nhận và Giao hàng */}
            <div className="bg-base-200/50 rounded-xl p-4 space-y-2 text-sm">
              <h3 className="font-semibold text-base-content border-b border-base-300 pb-2">
                Thông tin nhận hàng
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-base-content/80 pt-1">
                <p><span className="font-medium">Người nhận:</span> {orderData.customerName}</p>
                <p><span className="font-medium">Số điện thoại:</span> {orderData.phone}</p>
                <p className="sm:col-span-2"><span className="font-medium">Địa chỉ giao:</span> {orderData.address}</p>
              </div>
            </div>

            {/* Danh sách sản phẩm trong đơn */}
            <div className="space-y-3">
              <h3 className="font-semibold text-base-content">Sản phẩm đã chọn</h3>
              <div className="divide-y divide-base-200">
                {orderData.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.bookName}
                        className="w-14 h-14 object-cover rounded-lg border border-base-300"
                      />
                      <div>
                        <h4 className="font-medium text-sm text-base-content">{item.bookName}</h4>
                        <p className="text-xs text-base-content/60">Số lượng: x{item.buyQuantity}</p>
                      </div>
                    </div>
                    <div className="text-right font-medium text-sm text-primary">
                      {(item.price * item.buyQuantity).toLocaleString('vi-VN')} đ
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tổng tiền */}
            <div className="border-t border-base-200 pt-4 flex justify-between items-center font-bold text-lg">
              <span>Tổng cộng:</span>
              <span className="text-primary">{orderData.totalAmount.toLocaleString('vi-VN')} đ</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};