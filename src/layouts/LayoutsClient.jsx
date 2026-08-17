import { Link, Outlet, useNavigate } from "react-router";
import icon from "../assets/Logo1.png";
import { LiaUserSolid } from "react-icons/lia";
import { IoCartOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/cartContext";

export const LayoutClient = () => {
    const { totalCart } = useContext(CartContext);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // Hàm xử lý tìm kiếm
    const handleSearch = (e) => {
        if (e.key === "Enter" || e.type === "click") {
            if (search.trim()) {
                // Điều hướng sang trang danh sách sách kèm query param
                navigate(`/books?search=${encodeURIComponent(search.trim())}`);
            } else {
                navigate("/books");
            }
        }
    };

    return (
        <>
            <div className="min-h-screen bg-base-100">
                {/* ================= HEADER ================= */}
                <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-200">

                    {/* Top Header */}
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="h-[80px] flex items-center gap-6">

                            {/* Logo */}
                            <Link className="shrink-0" to={"/"}>
                                <div className="w-[70px] md:w-[100px]">
                                    <img
                                        src={icon}
                                        alt="Book Store"
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            </Link>

                            {/* Search Desktop */}
                            <div className="flex-1 md:flex md:justify-center hidden">
                                <label className="
                                    input
                                    input-bordered
                                    flex
                                    items-center
                                    gap-3
                                    w-full
                                    max-w-2xl
                                    h-12
                                    rounded-xl
                                    bg-base-200/50
                                    focus-within:border-primary
                                    focus-within:bg-base-100
                                    transition
                                ">
                                    <svg
                                        onClick={handleSearch}
                                        className="h-5 w-5 opacity-50 cursor-pointer hover:opacity-100 hover:text-primary transition"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="m21 21-4.3-4.3" />
                                        </g>
                                    </svg>

                                    <input
                                        type="search"
                                        className="grow text-sm"
                                        placeholder="Search books, authors..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={handleSearch}
                                    />
                                </label>
                            </div>

                            <div className="flex-1 flex justify-center md:hidden"></div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0">

                                {/* User */}
                                <div className="dropdown dropdown-end">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="
                                            btn
                                            btn-ghost
                                            btn-circle
                                            hover:bg-primary/10
                                            hover:text-primary
                                        "
                                    >
                                        <LiaUserSolid size={27} />
                                    </div>

                                    <ul
                                        tabIndex="-1"
                                        className="
                                            dropdown-content
                                            menu
                                            mt-3
                                            w-56
                                            rounded-2xl
                                            bg-base-100
                                            p-2
                                            shadow-xl
                                            border
                                            border-base-200
                                        "
                                    >
                                        <li>
                                            <a className="rounded-xl">
                                                <LiaUserSolid size={20} />
                                                Sign in
                                            </a>
                                        </li>

                                        <li>
                                            <a className="rounded-xl">
                                                Create an account
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Cart */}
                                <Link 
                                    to={"/cart"}
                                    className="
                                        btn
                                        btn-ghost
                                        btn-circle
                                        hover:bg-primary/10
                                        hover:text-primary
                                        relative
                                    "
                                >
                                    <IoCartOutline size={29} />

                                    {/* Cart badge */}
                                    <span className="
                                        absolute
                                        right-0
                                        top-0
                                        min-w-5
                                        h-5
                                        px-1
                                        flex
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-primary
                                        text-primary-content
                                        text-[10px]
                                        font-bold
                                    ">
                                        {totalCart}
                                    </span>
                                </Link>

                            </div>
                        </div>

                        {/* Mobile Search */}
                        <div className="pb-4 md:hidden">
                            <label className="
                                input
                                input-bordered
                                flex
                                items-center
                                gap-3
                                w-full
                                h-11
                                rounded-xl
                                bg-base-200/50
                            ">
                                <svg
                                    onClick={handleSearch}
                                    className="h-5 w-5 opacity-50 cursor-pointer hover:opacity-100 hover:text-primary transition"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </g>
                                </svg>

                                <input
                                    type="search"
                                    className="grow text-sm"
                                    placeholder="Search books, authors..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleSearch}
                                />
                            </label>
                        </div>
                    </div>

                    {/* ================= NAVBAR ================= */}
                    <nav className="border-t border-base-200">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="h-14 flex items-center justify-center gap-8">

                                {/* Books */}
                                <div className="dropdown dropdown-hover">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            cursor-pointer
                                            text-sm
                                            font-semibold
                                            text-base-content/70
                                            hover:text-primary
                                            transition
                                        "
                                    >
                                        BOOKS
                                        <FaAngleDown size={13} />
                                    </div>

                                    <ul
                                        tabIndex="-1"
                                        className="
                                            dropdown-content
                                            menu
                                            w-52
                                            rounded-2xl
                                            bg-base-100
                                            p-2
                                            shadow-xl
                                            border
                                            border-base-200
                                        "
                                    >
                                        <li><Link to={"/books"}>All Books</Link></li>
                                        <li><a>Best Sellers</a></li>
                                        <li><a>New Arrivals</a></li>
                                    </ul>
                                </div>

                                {/* Categories */}
                                <div className="dropdown dropdown-hover">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            cursor-pointer
                                            text-sm
                                            font-semibold
                                            text-base-content/70
                                            hover:text-primary
                                            transition
                                        "
                                    >
                                        CATEGORIES
                                        <FaAngleDown size={13} />
                                    </div>

                                    <ul
                                        tabIndex="-1"
                                        className="
                                            dropdown-content
                                            menu
                                            w-52
                                            rounded-2xl
                                            bg-base-100
                                            p-2
                                            shadow-xl
                                            border
                                            border-base-200
                                        "
                                    >
                                        <li><a>Fiction</a></li>
                                        <li><a>Technology</a></li>
                                        <li><a>Business</a></li>
                                        <li><a>Self Development</a></li>
                                    </ul>
                                </div>

                                {/* About */}
                                <div className="dropdown dropdown-hover">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            cursor-pointer
                                            text-sm
                                            font-semibold
                                            text-base-content/70
                                            hover:text-primary
                                            transition
                                        "
                                    >
                                        ABOUT US
                                        <FaAngleDown size={13} />
                                    </div>

                                    <ul
                                        tabIndex="-1"
                                        className="
                                            dropdown-content
                                            menu
                                            w-52
                                            rounded-2xl
                                            bg-base-100
                                            p-2
                                            shadow-xl
                                            border
                                            border-base-200
                                        "
                                    >
                                        <li><a>About Us</a></li>
                                        <li><a>Contact</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </nav>

                </header>

                {/* ================= CONTENT ================= */}
                <main className="">
                    <Outlet />
                </main>

                <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
                    <aside>
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            className="fill-current">
                            <path
                                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                        </svg>
                        <p>
                            ACME Industries Ltd.
                            <br />
                            Providing reliable tech since 1992
                        </p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </footer>
            </div>
        </>
    );
};