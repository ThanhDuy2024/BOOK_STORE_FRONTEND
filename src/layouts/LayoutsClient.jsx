import { Outlet } from "react-router"
import icon from "../assets/Icon2.jpeg"
import { LiaUserSolid } from "react-icons/lia";
import { IoCartOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
export const LayoutClient = () => {
    return (
        <>
            <div className="min-h-screen bg-base-100">
                {/* ================= HEADER ================= */}
                <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-200">

                    {/* Top Header */}
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="h-[80px] flex items-center gap-6">

                            {/* Logo */}
                            <div className="shrink-0">
                                <div className="w-[70px] md:w-[70px]">
                                    <img
                                        src={icon}
                                        alt="Book Store"
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            </div>

                            {/* Search */}
                            <div className="flex-1 flex justify-center">
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
                                        className="h-5 w-5 opacity-50"
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
                                    />
                                </label>
                            </div>

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
                                <button
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
                                        0
                                    </span>
                                </button>

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
                                    className="h-5 w-5 opacity-50"
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
                                        <li><a>All Books</a></li>
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
                <main className="max-w-7xl mx-auto px-4 py-6">
                    <Outlet />
                </main>
            </div>
        </>
    )
}