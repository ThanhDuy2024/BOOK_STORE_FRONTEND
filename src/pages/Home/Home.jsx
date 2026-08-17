import bg from "../../assets/bgBest.webp"
import bg2 from "../../assets/bg12.webp"
import bgnew from "../../assets/bgnew.png"
import bgevent from "../../assets/bgevent.jpg"
import book1 from "../../assets/Theodyssey.webp"
import gifCard from "../../assets/gifcard.png"
import rentBook from "../../assets/rentBook.png"
import sellYourBook from "../../assets/sellyourbook.png"
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react"
import { callApi } from "../../api/api"
import { Link } from "react-router"
export const Home = () => {
    const [bookBestSaler, setBookBestSaler] = useState([]);
    const [newBooks, setNewBooks] = useState([]);
    const [mythBooks, setMythBooks] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/books/list?searchBookName=null&searchAuthor=null&priceFilter=null&category=all&sortCreatedAt=null&page=1&limit=6`, {});
            setBookBestSaler(res.data);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/books/list?searchBookName=null&searchAuthor=null&priceFilter=null&category=all&sortCreatedAt=desc&page=1&limit=6`, {});
            setNewBooks(res.data);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/client/books/list?searchBookName=null&searchAuthor=null&priceFilter=null&category=36&sortCreatedAt=null&page=1&limit=6`, {});
            setMythBooks(res.data);
        })()
    }, []);

    return (
        <>
            <div className="w-full max-w-none">
                <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-4 sm:py-6 space-y-8 sm:space-y-10">
                    <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 space-y-8 sm:space-y-10 py-4 sm:py-6">
                        {/* Carousel Banner */}
                        <div className="w-full">
                            <div className="carousel w-full rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                                {/* Slide 1 */}
                                <div id="slide1" className="carousel-item relative w-full aspect-[4/3] sm:aspect-[21/9] lg:aspect-[25/8] min-h-[220px] sm:min-h-[250px] lg:min-h-[300px]">
                                    <img src={bg} alt="Banner 1" className="w-full h-full object-cover" />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 text-white">
                                        <div className="max-w-[90%] sm:max-w-lg space-y-2 sm:space-y-3 md:space-y-4">
                                            <span className="badge badge-primary text-[9px] sm:text-xs font-semibold px-2 sm:px-3 py-2 uppercase tracking-wider">
                                                Khuyến mãi đặc biệt
                                            </span>

                                            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl max-w-lg leading-tight font-bold">
                                                Khám Phá Thế Giới Sách Mới
                                            </h2>

                                            <p className="hidden sm:block text-xs sm:text-sm md:text-base text-gray-200 max-w-md line-clamp-2">
                                                Giảm giá lên đến 50% cho tất cả các đầu sách Bestseller trong tuần này.
                                            </p>

                                            <div className="pt-1 sm:pt-2">
                                                <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md shadow-md">
                                                    Mua Ngay
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION: Shop Bestsellers */}
                        <section className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#6d6e71]">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
                                    Shop Bestsellers
                                </h2>

                                <div className="self-start sm:self-auto px-3 sm:px-4 py-1.5 sm:py-2 border border-[#6d6e71] rounded-full flex items-center gap-1 cursor-pointer transition-colors hover:bg-primary hover:text-white hover:border-primary">
                                    <Link to={"/books"} className="text-xs sm:text-sm font-medium">Browse All</Link>
                                    <MdKeyboardArrowRight size={18} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 items-stretch">
                                {bookBestSaler.map((item) => (
                                    <Link to={`/book/detail/${item.id}`} key={item.id} className="w-full min-w-0 group relative flex flex-col rounded-xl sm:rounded-2xl border border-base-200 bg-base-100 p-2.5 sm:p-3 lg:p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
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
                                                    +  View Details
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* SECTION: New Event */}
                        <section className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#6d6e71]">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
                                    New Event
                                </h2>

                                <div className="self-start sm:self-auto px-3 sm:px-4 py-1.5 sm:py-2 border border-[#6d6e71] rounded-full flex items-center gap-1 cursor-pointer transition-colors hover:bg-primary hover:text-white hover:border-primary">
                                    <span className="text-xs sm:text-sm font-medium">Browse All</span>
                                    <MdKeyboardArrowRight size={18} />
                                </div>
                            </div>

                            <div className="bg-[#fff5f6] p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                                {[1, 2].map((evtKey) => (
                                    <div key={evtKey} className="bg-white p-3 sm:p-4 lg:p-5 rounded-xl flex flex-col sm:flex-row gap-3 sm:gap-4 shadow-sm">
                                        <div className="w-full sm:w-[35%] lg:w-1/3 shrink-0">
                                            <img src={bgevent} alt="Event" className="w-full aspect-[16/9] sm:aspect-[4/3] object-cover rounded-lg" />
                                        </div>

                                        <div className="flex flex-col justify-between w-full min-w-0">
                                            <div>
                                                <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 leading-snug line-clamp-2">
                                                    Chang-rae Lee + Gary Shteyngart: A Tender Age
                                                </h3>

                                                <p className="text-[10px] sm:text-xs md:text-sm text-primary font-medium opacity-80 mb-2">
                                                    Wednesday Aug 12, 2026, 07:00 PM
                                                </p>

                                                <p className="text-[10px] sm:text-xs md:text-sm opacity-70 line-clamp-3 mb-3 sm:mb-4">
                                                    Join us for an event with Pulitzer Prize finalist Chang-rae Lee for a discussion of his new book A Tender Age.
                                                </p>
                                            </div>

                                            <div className="flex justify-start sm:justify-end mt-auto">
                                                <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md text-[10px] sm:text-xs md:text-sm">
                                                    + Purchase a ticket
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* SECTION: Shop New Arrivals */}
                        <section className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#6d6e71]">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
                                    Shop New Arrivals
                                </h2>

                                <div className="self-start sm:self-auto px-3 sm:px-4 py-1.5 sm:py-2 border border-[#6d6e71] rounded-full flex items-center gap-1 cursor-pointer transition-colors hover:bg-primary hover:text-white hover:border-primary">
                                    <Link to={'/books?createdAtFilter=desc'} className="text-xs sm:text-sm font-medium">Browse All</Link>
                                    <MdKeyboardArrowRight size={18} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
                                {newBooks.map((item) => (
                                    <div key={item} className="flex flex-col min-w-0 border border-transparent rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-base-200 bg-base-100">
                                        <div className="w-full aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl bg-base-200 mb-2 sm:mb-3">
                                            <img src={item.image} alt="Book cover" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                        </div>

                                        <h3 className="font-bold text-[11px] sm:text-xs md:text-sm text-center line-clamp-1">
                                            {item.bookName}
                                        </h3>

                                        <p className="text-[9px] sm:text-[11px] md:text-xs opacity-60 text-center line-clamp-1 mb-1">
                                            {item.author}
                                        </p>

                                        <span className="text-[10px] sm:text-xs md:text-sm font-bold text-primary text-center mb-2">
                                            {Number(item.price).toLocaleString("vi-VN")} VND
                                        </span>

                                        <button className="btn btn-primary btn-xs sm:btn-sm w-full text-[9px] sm:text-xs lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            + Add to cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Middle Promotion Banner */}
                        <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden">
                            <img className="w-full h-auto min-h-[120px] sm:min-h-[160px] md:min-h-[200px] object-cover" src={bgnew} alt="Promotion Banner" />
                        </div>

                        {/* SECTION: Our Favorite Myth Retellings */}
                        <section className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#6d6e71]">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight max-w-3xl">
                                    Our Favorite Myth Retellings
                                </h2>

                                <div className="self-start sm:self-auto shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 border border-[#6d6e71] rounded-full flex items-center gap-1 cursor-pointer transition-colors hover:bg-primary hover:text-white hover:border-primary">
                                    <Link to={`/books?categoryFilter=36`} className="text-xs sm:text-sm font-medium">Browse All</Link>
                                    <MdKeyboardArrowRight size={18} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
                                {mythBooks.map((item) => (
                                    <div key={item} className="flex flex-col min-w-0 border border-transparent rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-base-200 bg-base-100">
                                        <div className="w-full aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl bg-base-200 mb-2 sm:mb-3">
                                            <img src={item.image} alt="Book cover" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                        </div>

                                        <h3 className="font-bold text-[11px] sm:text-xs md:text-sm text-center line-clamp-1">
                                            {item.bookName}
                                        </h3>

                                        <p className="text-[9px] sm:text-[11px] md:text-xs opacity-60 text-center line-clamp-1 mb-1">
                                            {item.author}
                                        </p>

                                        <span className="text-[10px] sm:text-xs md:text-sm font-bold text-primary text-center mb-2">
                                            {item.price.toLocaleString("vi-VN")} VND
                                        </span>

                                        <button className="btn btn-primary btn-xs sm:btn-sm w-full text-[9px] sm:text-xs lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            + Add to cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="grid grid-cols-3 gap-[5px]">
                            <div className="">
                                <img src={gifCard} alt="" />
                            </div>
                            <div className="">
                                <img src={rentBook} alt="" />
                            </div>
                            <div className="">
                                <img src={sellYourBook} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}