import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
    FaSearch,
    FaShoppingBag,
    FaUser,
    FaRegHeart,
    FaChevronUp,
    FaChevronDown,
    FaArrowUp,
    FaPlus
} from 'react-icons/fa';
import { callApi } from "../../api/api"

const BookStorePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [bookBestSaler, setBookBestSaler] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/books/list?searchBookName=null&searchAuthor=null&priceFilter=null&category=all&sortCreatedAt=null&page=1&limit=16`, {});
            setBookBestSaler(res.data);
        })()
    }, []);

    const categories = [
        "Art", "Business", "Children's", "Comics & Graphic Novels",
        "Essays & Writing", "Fashion & Interior Design", "Fiction & Poetry",
        "Food & Drink", "History", "Performing Arts",
        "Philosophy & Eastern Thought", "Reference", "Science, Technology & Math",
        "Social Science", "Spirituality & Wellness", "Sports & Games",
        "Travel", "Vintage Editions", "World Languages", "Young Adult"
    ];

    const books = [
        {
            id: 1,
            bookName: "The Darkness My Father Brought",
            author: "Beck, Cathy",
            price: 189900,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 2,
            bookName: "Pomo Bear Doctors",
            author: "A. Barrett, S.",
            price: 189900,
            image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 3,
            bookName: "Gloria: Kokoelma kansojen pyhiä...",
            author: "Lampén, Ernst",
            price: 199900,
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 4,
            bookName: "Electric Cars Will Die in 2027",
            author: "Oyama, Masafumi",
            price: 149900,
            image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop"
        }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 antialiased relative">
            {/* 2. MAIN CONTENT AREA */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Title */}
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Books</h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* SIDEBAR DANH MỤC */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm sticky top-28">
                            <button
                                className="w-full flex justify-between items-center pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm tracking-wide"
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            >
                                <span>Category</span>
                                {isCategoryOpen ? <FaChevronUp className="text-xs text-slate-400" /> : <FaChevronDown className="text-xs text-slate-400" />}
                            </button>

                            {isCategoryOpen && (
                                <ul className="mt-3 space-y-1 text-xs text-slate-600 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
                                    {categories.map((cat, idx) => (
                                        <li key={idx}>
                                            <button
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`w-full text-left py-1.5 px-2 rounded-lg transition-all ${selectedCategory === cat
                                                    ? 'bg-primary/10 text-primary font-bold'
                                                    : 'hover:bg-slate-50 hover:text-slate-900'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </aside>

                    {/* PRODUCT LIST */}
                    <div className="flex-1 w-full space-y-6">

                        {/* Top Bar Sort */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 pb-2">
                            <span>Items 1 - 24 of 1,543,587</span>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                                <span className="font-medium text-slate-600">Sort By</span>
                                <select className="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-1.5 focus:border-primary focus:outline-none shadow-sm">
                                    <option value="arrival">Arrival</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="popular">Popularity</option>
                                </select>
                            </div>
                        </div>

                        {/* GRID BOOK CARDS */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {bookBestSaler.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/60 hover:border-primary/30"
                                >
                                    {/* Image Wrapper */}
                                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-slate-100">
                                        <img
                                            src={item.image}
                                            alt={item.bookName}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Wishlist Button */}
                                        <button
                                            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-slate-600 hover:text-red-500 hover:bg-white flex items-center justify-center shadow-md transition-all duration-200"
                                        >
                                            <FaRegHeart className="text-xs" />
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-1 mt-3">
                                        <Link to={`/book/detail/${item.id}`} className="block group-hover:text-primary transition-colors">
                                            <h3 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 leading-snug min-h-[32px] sm:min-h-[40px]">
                                                {item.bookName}
                                            </h3>
                                        </Link>

                                        <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">
                                            {item.author}
                                        </p>

                                        <div className="mt-2 font-extrabold text-sm sm:text-base text-primary">
                                            {Number(item.price).toLocaleString("vi-VN")} VND
                                        </div>

                                        {/* Add to cart Button */}
                                        <div className="mt-auto pt-3">
                                            <button className="btn btn-primary btn-sm w-full rounded-xl text-xs font-semibold gap-1.5 shadow-sm shadow-primary/20 opacity-90 sm:opacity-0 sm:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                <FaPlus className="text-[10px]" /> Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </main>

            {/* Back to Top */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 active:scale-95 transition-all z-50"
            >
                <FaArrowUp className="text-xs" />
            </button>
        </div>
    );
};

export default BookStorePage;