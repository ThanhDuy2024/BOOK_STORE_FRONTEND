import React, { useContext, useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { CartContext } from '../../contexts/cartContext';

const ShoppingCart = () => {
    // State quản lý danh sách sản phẩm trong giỏ
    const [cartItem, setCartItem] = useState([]);
    const { cartDispatch } = useContext(CartContext);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart_items');
        const parsedCart = savedCart ? JSON.parse(savedCart) : [];
        setCartItem(parsedCart);
    }, []);

    // Hàm cập nhật cả State và LocalStorage
    const updateCartAndStorage = (newItems) => {
        setCartItem(newItems);
        localStorage.setItem('cart_items', JSON.stringify(newItems));
    };

    // 1. Logic Tăng / Giảm số lượng (Đã sửa lỗi sai tên biến cartItems -> cartItem)
    const handleQuantityChange = (id, delta) => {
        const updatedItems = cartItem.map((item) => {
            if (item.id === id) {
                const newQty = item.buyQuantity + delta;
                return { ...item, buyQuantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        });
        updateCartAndStorage(updatedItems);
    };

    // 2. Logic Xóa sản phẩm khỏi giỏ hàng
    const handleDeleteItem = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
            const updatedItems = cartItem.filter((item) => item.id !== id);
            updateCartAndStorage(updatedItems); 
            cartDispatch({
                type: 'CART-REMOVE',
                payload: id
            })
        }
    };

    // 3. Logic Nút Update Shopping Cart
    const handleUpdateCart = () => {
        const savedCart = localStorage.getItem('cart_items');
        if (savedCart) {
            setCartItem(JSON.parse(savedCart));
            toast.success("Cart has been updated")
        }
    };

    // Tính tổng tiền
    const subtotal = cartItem.reduce((sum, item) => sum + (item.price || 0) * (item.buyQuantity || 1), 0);
    const tax = 0.0;
    const grandTotal = subtotal + tax;

    return (
        <div className="max-w-6xl mx-auto p-6 font-sans text-gray-700">
            {/* Title */}
            <h1 className="text-3xl text-gray-600 mb-8 font-normal">Shopping Cart</h1>

            {/* Đã thêm items-center để căn giữa 2 bên */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Side: Cart Items List */}
                <div className="lg:col-span-2">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 pb-3 border-b border-gray-400 text-sm font-semibold text-gray-700">
                        <div className="col-span-6">Item</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-center">Qty</div>
                        <div className="col-span-2 text-right">Subtotal</div>
                    </div>

                    {/* Cart Items */}
                    {cartItem && cartItem.length > 0 ? (
                        <>
                            {cartItem.map((item) => (
                                <div key={item.id} className="py-6 border-b border-gray-300">
                                    <div className="grid grid-cols-12 items-center">
                                        {/* Product Info */}
                                        <div className="col-span-6 flex gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.bookName}
                                                className="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0"
                                            />
                                            <div className="space-y-1 pr-4">
                                                <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                                                    {item.bookName}
                                                </h3>
                                                {item.author && (
                                                    <p className="text-xs text-gray-500">
                                                        <span className="font-semibold text-gray-700">Author:</span> {item.author}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="col-span-2 text-center font-semibold text-gray-800 text-sm">
                                            {item.price?.toLocaleString("vi-VN")} VND
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="col-span-2 flex justify-center">
                                            <div className="flex items-center bg-gray-200 rounded-full px-3 py-1.5 space-x-3 text-gray-600">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="hover:text-black transition-colors cursor-pointer"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <FaMinus className="text-[10px]" />
                                                </button>
                                                <span className="text-sm font-medium text-gray-800 min-w-[12px] text-center">
                                                    {item.buyQuantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="hover:text-black transition-colors cursor-pointer"
                                                    aria-label="Increase quantity"
                                                >
                                                    <FaPlus className="text-[10px]" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="col-span-2 text-right font-semibold text-gray-800 text-sm">
                                            {((item.price || 0) * (item.quantity || 1)).toLocaleString("vi-VN")} VND
                                        </div>
                                    </div>

                                    {/* Action Icons (Edit & Delete) */}
                                    <div className="flex justify-end gap-3 mt-4 text-gray-500">
                                        <button 
                                            className="hover:text-gray-800 transition-colors p-1 cursor-pointer" 
                                            aria-label="Edit item"
                                        >
                                            <FaPencilAlt className="text-base" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteItem(item.id)}
                                            className="hover:text-red-500 transition-colors p-1 cursor-pointer" 
                                            aria-label="Delete item"
                                        >
                                            <FaTrashAlt className="text-base" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="py-8 text-center text-gray-500 font-medium">
                            Giỏ hàng của bạn đang trống!
                        </div>
                    )}

                    {/* Update Button (Đã sửa class -> className) */}
                    <div className="flex justify-end mt-6">
                        <button 
                            onClick={handleUpdateCart}
                            className="btn btn-outline btn-primary"
                        >
                            Update Shopping Cart
                        </button>
                    </div>
                </div>

                {/* Right Side: Order Summary */}
                <div className="lg:col-span-1">
                    <h2 className="text-2xl text-gray-600 mb-[12px] font-bold">Summary</h2>
                    <div className="border-t border-gray-400 pt-4">

                        {/* Accordion / Estimate Shipping */}
                        <div className="flex justify-between items-center py-2 text-sm text-gray-600 cursor-pointer border-b border-gray-300">
                            <span>Estimate Shipping and Tax</span>
                            <FiChevronDown className="text-lg text-gray-500" />
                        </div>

                        {/* Subtotal & Tax */}
                        <div className="py-4 space-y-3 text-sm text-gray-600 border-b border-gray-200">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-semibold text-gray-800">{subtotal.toLocaleString("vi-VN")} VND</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span className="font-semibold text-gray-800">{tax.toLocaleString("vi-VN")} VND</span>
                            </div>
                        </div>

                        {/* Grand Total */}
                        <div className="flex justify-between items-center py-6">
                            <span className="text-lg font-semibold text-gray-700">Grand Total</span>
                            <span className="text-xl font-bold text-gray-800">{grandTotal.toLocaleString("vi-VN")} VND</span>
                        </div>

                        {/* Checkout Button */}
                        <Link to={"/checkout"} className="btn btn-primary rounded-full w-full">
                            Proceed to Checkout
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;