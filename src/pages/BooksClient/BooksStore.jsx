import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import {
    FaChevronUp,
    FaChevronDown,
    FaArrowUp,
    FaPlus,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';
import { callApi } from "../../api/api";

const BookStorePage = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "null";
    const createdAtQuery = searchParams.get("createdAtFilter") || "null";
    const categoryFilter = searchParams.get("categoryFilter") || "all";
    const LIMIT = 16;
    const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [bookBestSaler, setBookBestSaler] = useState([]);
    const [priceFilter, setPriceFilter] = useState("null");
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalBooks, setTotalBooks] = useState(0);

    useEffect(() => {
        setPage(1);
    }, [priceFilter, selectedCategory]);

    useEffect(() => {
        (async () => {
            const res = await callApi(
                "get",
                `${import.meta.env.VITE_REACT_APP_APIDEV}/client/books/list?searchBookName=${searchQuery}&searchAuthor=null&priceFilter=${priceFilter}&category=${selectedCategory}&sortCreatedAt=${createdAtQuery}&page=${page}&limit=${LIMIT}`,
                {}
            );
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Cập nhật danh sách sách
            setBookBestSaler(res.data || []);
            setTotalPages(res.totalPage)
            console.log(res)
        })();
    }, [priceFilter, selectedCategory, page, searchQuery, createdAtQuery, categoryFilter]);

    useEffect(() => {
        (async () => {
            const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/categories`, {});
            setCategories(res.data || []);
        })();
    }, []);


    useEffect(() => {
        setSelectedCategory(categoryFilter);
    }, [categoryFilter]);
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 100, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 antialiased relative">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

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
                                    <li key={"all"}>
                                        <button
                                            onClick={() => setSelectedCategory("all")}
                                            className={`w-full text-left py-1.5 px-2 rounded-lg transition-all cursor-pointer ${selectedCategory === "all"
                                                ? 'bg-primary/10 text-primary font-bold'
                                                : 'hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                        >
                                            All
                                        </button>
                                    </li>
                                    {categories.map((cat, idx) => (
                                        <li key={idx}>
                                            <button
                                                onClick={() => setSelectedCategory(cat.id)}
                                                className={`w-full text-left py-1.5 px-2 rounded-lg transition-all cursor-pointer ${selectedCategory === cat.id
                                                    ? 'bg-primary/10 text-primary font-bold'
                                                    : 'hover:bg-slate-50 hover:text-slate-900'
                                                    }`}
                                            >
                                                {cat.categoryName}
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
                            <span>
                            </span>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                                <span className="font-medium text-slate-600">Sort By</span>
                                <select
                                    className="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-1.5 focus:border-primary focus:outline-none shadow-sm cursor-pointer"
                                    defaultValue={priceFilter}
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                >
                                    <option value="null">Arrival</option>
                                    <option value="asc">Price: Low to High</option>
                                    <option value="desc">Price: High to Low</option>
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
                                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-slate-100">
                                        <img
                                            src={item.image}
                                            alt={item.bookName}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="flex flex-col flex-1 mt-3">
                                        <Link to={`/book/detail/${item.id}`} className="block group-hover:text-primary transition-colors cursor-pointer">
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

                                        <div className="mt-auto pt-3">
                                            <Link to={`/book/detail/${item.id}`} className="btn btn-primary btn-sm w-full rounded-[10px] text-xs font-semibold gap-1.5 shadow-sm shadow-primary/20 opacity-90 sm:opacity-0 sm:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                <FaPlus className="text-[10px]" /> View details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 2. THANH PAGINATION (PHÂN TRANG) */}
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

                    </div>
                </div>

            </main>

            {/* Back to Top */}
            <button
                onClick={scrollToTop}
                className="cursor-pointer fixed bottom-6 right-6 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 active:scale-95 transition-all z-50"
            >
                <FaArrowUp className="text-xs" />
            </button>
        </div>
    );
};

export default BookStorePage;