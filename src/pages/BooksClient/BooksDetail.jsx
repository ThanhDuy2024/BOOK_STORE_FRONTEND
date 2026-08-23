import React, { useContext, useEffect, useState } from 'react';
import { FaPlus, FaMinus, FaRegHeart, FaHeart, FaArrowUp } from 'react-icons/fa';
import { Link, useParams } from 'react-router';
import { callApi } from '../../api/api';
import { MdKeyboardArrowRight } from "react-icons/md";
import {
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';
import { CartContext } from '../../contexts/cartContext';
import { toast } from "sonner"
export const BookDetail = () => {
    const { id } = useParams();
    const { items, cartDispatch } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const [isLiked, setIsLiked] = useState(false);
    const [bookDetail, setBookDetail] = useState();
    const [bookBestSaler, setBookBestSaler] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [reviews, setReviews] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalComments, setTotalCommnets] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/books/${id}`, {});
                setBookDetail(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/books/list?searchBookName=null&searchAuthor=null&priceFilter=null&category=all&sortCreatedAt=null&page=1&limit=6`, {});
            setBookBestSaler(res.data);
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/comments/${id}/?page=${page}&limit=5`, {});
            setReviews(res.data);
            setTotalPages(res.totalPage)
        })();
    }, [id, page]);

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const addToCart = () => {
        cartDispatch({
            type: "CART-SAVE",
            payload: {
                id: bookDetail?.id,
                bookName: bookDetail?.bookName,
                author: bookDetail?.author,
                price: bookDetail?.price,
                image: bookDetail?.image,
                buyQuantity: quantity
            }
        });
    };

    const scrollToTop2 = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now(),
            customer: {
                fullName: "You"
            },
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Duy",
            createdAtFormat: new Date().toLocaleDateString("vi-VN"),
            comment: commentText.trim()
        };

        setReviews([newComment, ...reviews]);
        const res = await callApi("post", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/comments`, {
            id: id,
            comment: commentText.trim()
        });
        if (res.status === true) {
            toast.success("Post comment successful!");
        } else {
            toast.error("You must login if you wanna post comment!")
        }

        setCommentText("");
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white font-sans text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                {/* Khung ảnh bên trái */}
                <div className="border border-gray-200 rounded-lg p-12 flex justify-center items-center bg-white min-h-[500px]">
                    <img
                        src={bookDetail?.image}
                        alt={bookDetail?.bookName}
                        className="max-h-[400px] object-contain shadow-md"
                    />
                </div>

                {/* Thông tin bên phải */}
                <div className="space-y-6">
                    {/* Header & Giá */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-normal text-gray-600">{bookDetail?.bookName}</h1>
                        <p className="text-gray-500 text-sm">
                            By <span className="font-medium">{bookDetail?.author}</span>
                        </p>
                        <div className="text-2xl font-bold text-gray-800 pt-2">
                            {bookDetail?.price?.toLocaleString("vi-VN")} VND
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Condition */}
                    <div className="flex items-center gap-6 text-sm">
                        <span className="text-gray-600 font-medium">
                            Categories:
                        </span>
                        {bookDetail?.categories?.map((item, index) => (
                            <span key={index} className="btn btn-outline btn-primary">
                                {item.categoryName}
                            </span>
                        ))}
                    </div>

                    {/* Thao tác: Tăng/giảm số lượng, Add to Cart, Heart */}
                    <div className="flex items-center gap-3 pt-2">
                        {/* Tăng giảm số lượng */}
                        <div className="flex items-center justify-between bg-gray-100 rounded-full px-4 py-3 w-32">
                            <button
                                onClick={handleDecrease}
                                className="cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
                                aria-label="Decrease quantity"
                            >
                                <FaMinus size={12} />
                            </button>
                            <span className="font-medium text-gray-800 text-sm">{quantity}</span>
                            <button
                                onClick={handleIncrease}
                                className="cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
                                aria-label="Increase quantity"
                            >
                                <FaPlus size={12} />
                            </button>
                        </div>

                        {/* Nút Add to Cart */}
                        <button onClick={addToCart} className="flex-1 cursor-pointer bg-primary hover:bg-primary text-white font-medium py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors text-sm border-none">
                            <FaPlus size={14} />
                            <span>Add to Cart</span>
                        </button>

                        {/* Nút Heart */}
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className={`p-3 rounded-full border border-gray-200 hover:border-gray-300 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-500'
                                }`}
                        >
                            {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                        </button>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Danh sách Details */}
                    <div className="space-y-3 pt-2">
                        <h2 className="text-base font-bold text-gray-800">Details</h2>
                        <div className="space-y-2 text-xs md:text-sm">
                            <div className="flex gap-[5px]">
                                <span className="font-bold text-gray-700 flex-shrink-0">
                                    Author:
                                </span>
                                <span className="text-gray-600">{bookDetail?.author}</span>
                            </div>
                            <div className="flex gap-[5px]">
                                <span className="font-bold text-gray-700 flex-shrink-0">
                                    Publishing:
                                </span>
                                <span className="text-gray-600">{bookDetail?.publishing}</span>
                            </div>

                            <div className="flex gap-[5px]">
                                <span className="font-bold text-gray-700 flex-shrink-0">
                                    Publication:
                                </span>
                                <span className="text-gray-600">{bookDetail?.publication}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= COMMENTS SECTION ================= */}
            <section className="mt-16 pt-10 border-t border-gray-200 space-y-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Customer Comments
                </h2>

                {/* Form Viết Bình luận */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <form onSubmit={handleSubmitComment} className="space-y-4">
                        <textarea
                            rows={3}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write your comment here..."
                            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white shadow-sm"
                        ></textarea>
                        <button
                            type="submit"
                            className="btn btn-primary text-white rounded-full px-6 text-sm hover:shadow-md transition"
                        >
                            Post Comment
                        </button>
                    </form>
                </div>

                {/* Danh sách bình luận */}
                <div className="space-y-6">
                    {reviews?.map((rev) => (
                        <div key={rev.id} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex gap-4">
                            <img src={rev.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Duy"} alt={rev.userName} className="w-10 h-10 rounded-full bg-slate-100" />
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-slate-800 text-sm">{rev.customer?.fullName}</h4>
                                    <span className="text-xs text-slate-400">{rev.createdAtFormat}</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">{rev.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 pt-8">
                        {/* Nút Trang Trước */}
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="btn btn-sm btn-circle btn-outline border-slate-200 text-slate-600 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-40"
                        >
                            <FaChevronLeft className="text-xs" />
                        </button>

                        {/* Danh sách số trang */}
                        <div className="flex items-center gap-1">
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNum = index + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`cursor-pointer w-9 h-9 rounded-xl text-xs font-bold transition-all ${page === pageNum
                                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Nút Trang Sau */}
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="cursor-pointer btn btn-sm btn-circle btn-outline border-slate-200 text-slate-600 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-40"
                        >
                            <FaChevronRight className="text-xs" />
                        </button>
                    </div>
                )}
            </section>

            {/* SECTION BESTSELLERS */}
            <section className="space-y-4 mt-[50px]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#6d6e71]">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
                        Shop Bestsellers
                    </h2>

                    <div className="self-start sm:self-auto px-3 sm:px-4 py-1.5 sm:py-2 border border-[#6d6e71] rounded-full flex items-center gap-1 cursor-pointer transition-colors hover:bg-primary hover:text-white hover:border-primary">
                        <span className="text-xs sm:text-sm font-medium">Browse All</span>
                        <MdKeyboardArrowRight size={18} />
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 items-stretch">
                    {bookBestSaler.map((item) => (
                        <Link
                            onClick={scrollToTop}
                            to={`/book/detail/${item.id}`}
                            key={item.id}
                            className="w-full min-w-0 group relative flex flex-col rounded-xl sm:rounded-2xl border border-base-200 bg-base-100 p-2.5 sm:p-3 lg:p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
                            {/* Image */}
                            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl bg-base-200">
                                <img src={item.image} alt={item.bookName} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />

                                <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-primary text-primary-content text-[8px] sm:text-[10px] md:text-xs font-bold shadow">
                                    Best Seller
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1 mt-2.5 sm:mt-3">
                                <h3 className="font-bold text-[11px] sm:text-xs md:text-sm leading-tight line-clamp-2 min-h-[28px] sm:min-h-[32px] group-hover:text-primary transition-colors">
                                    {item.bookName}
                                </h3>

                                <p className="mt-1 text-[9px] sm:text-[11px] md:text-xs opacity-60 min-h-[14px] sm:min-h-[18px] line-clamp-1">
                                    {item.author}
                                </p>

                                <div className="mt-1.5 sm:mt-2">
                                    <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-primary whitespace-nowrap">
                                        {Number(item.price).toLocaleString("vi-VN")} VND
                                    </span>
                                </div>

                                <div className="mt-auto pt-2 sm:pt-3">
                                    <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md w-full text-[9px] sm:text-xs lg:opacity-0 lg:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        + Add to cart
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Back to Top */}
            <button
                onClick={scrollToTop2}
                className="cursor-pointer fixed bottom-6 right-6 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 active:scale-95 transition-all z-50"
            >
                <FaArrowUp className="text-xs" />
            </button>
        </div>
    );
};