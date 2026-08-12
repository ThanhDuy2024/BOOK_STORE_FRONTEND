import bg from "../../assets/bg13.webp"
import bg2 from "../../assets/bg12.webp"
import bgnew from "../../assets/bgnew.png"
import bgevent from "../../assets/bgevent.jpg"
import book1 from "../../assets/Theodyssey.webp"
import { MdKeyboardArrowRight } from "react-icons/md";
export const Home = () => {
    return (
        <>
            <div className="mb-[20px]">
                <div className="carousel rounded-box">
                    <div className="carousel-item">
                        <img
                            src={bg}
                            alt="Burger" />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={bg2}
                            alt="Burger" />
                    </div>
                </div>
            </div>
            <div className="mb-[10px]">
                <div className="flex items-center justify-between text-[#6d6e71] mb-[20px]">
                    <div className="text-[36px]">Shop Bestsellers</div>
                    <div className="px-[12px] py-[12px] border border-[#6d6e71] rounded-[40px] flex items-center cursor-pointer hover:bg-primary hover:text-white">
                        <div className="">
                            Browse All
                        </div>
                        <div className="">
                            <MdKeyboardArrowRight size={20} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-[20px]">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div className="flex flex-col items-center hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 p-4 group cursor-pointer">
                            <div className="">
                                <img src={book1} alt="" srcset="" />
                            </div>
                            <div className="font-bold">The Odyssey</div>
                            <div className="opacity-60">Homer, Emily Wilson</div>
                            <div className="text-primary font-bold">150.000 VND</div>
                            <button
                                className="
                                btn
                                btn-primary
                                w-full
                                mt-2
                                opacity-0
                                invisible
                                transition-all
                                duration-200
                                group-hover:opacity-100
                                group-hover:visible
                            "
                            >
                                + Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-[10px]">
                <div className="flex items-center justify-between text-[#6d6e71] mb-[20px]">
                    <div className="text-[36px]">New Event</div>
                    <div className="px-[12px] py-[12px] border border-[#6d6e71] rounded-[40px] flex items-center cursor-pointer hover:bg-primary hover:text-white">
                        <div className="">
                            Browse All
                        </div>
                        <div className="">
                            <MdKeyboardArrowRight size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff5f6] p-[24px] rounded-[10px] flex gap-[10px] w-full">
                    <div className="bg-[#ffffff] p-[16px] w-[50%] flex gap-[10px]">
                        <div className="">
                            <img src={bgevent} alt="" srcset="" />
                        </div>
                        <div className="w-full">
                            <div className="w-full font-bold mb-[20px]">Chang-rae Lee + Gary Shteyngart: A Tender Age</div>
                            <div className="opacity-75">Wednesday Aug 12, 2026, 07:00 PM</div>
                            <div className="mt-[10px] mb-[10px]">
                                Join us for an event with Pulitzer Prize finalist Chang-rae Lee for a discussion of his new book A Tender Age.
                            </div>
                            <div className="flex justify-end">
                                <button className="btn btn-primary">
                                    + Purchase a ticket
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#ffffff] p-[16px] w-[50%] flex gap-[10px]">
                        <div className="">
                            <img src={bgevent} alt="" srcset="" />
                        </div>
                        <div className="w-full">
                            <div className="w-full font-bold mb-[20px]">Chang-rae Lee + Gary Shteyngart: A Tender Age</div>
                            <div className="opacity-75">Wednesday Aug 12, 2026, 07:00 PM</div>
                            <div className="mt-[10px] mb-[10px]">
                                Join us for an event with Pulitzer Prize finalist Chang-rae Lee for a discussion of his new book A Tender Age.
                            </div>
                            <div className="flex justify-end">
                                <button className="btn btn-primary">
                                    + Purchase a ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-[10px]">
                <div className="flex items-center justify-between text-[#6d6e71] mb-[20px]">
                    <div className="text-[36px]">Shop New Arrivals</div>
                    <div className="px-[12px] py-[12px] border border-[#6d6e71] rounded-[40px] flex items-center cursor-pointer hover:bg-primary hover:text-white">
                        <div className="">
                            Browse All
                        </div>
                        <div className="">
                            <MdKeyboardArrowRight size={20} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-[20px]">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div className="flex flex-col items-center hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 p-4 group cursor-pointer">
                            <div className="">
                                <img src={book1} alt="" srcset="" />
                            </div>
                            <div className="font-bold">The Odyssey</div>
                            <div className="opacity-60">Homer, Emily Wilson</div>
                            <div className="text-primary font-bold">150.000 VND</div>
                            <button
                                className="
                                btn
                                btn-primary
                                w-full
                                mt-2
                                opacity-0
                                invisible
                                transition-all
                                duration-200
                                group-hover:opacity-100
                                group-hover:visible
                            "
                            >
                                + Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-[20px]">
                <img className="object-contain" src={bgnew} />
            </div>

            <div className="mb-[10px]">
                <div className="flex items-center justify-between text-[#6d6e71] mb-[20px]">
                    <div className="text-[36px]">Our Favorite Myth Retellings</div>
                    <div className="px-[12px] py-[12px] border border-[#6d6e71] rounded-[40px] flex items-center cursor-pointer hover:bg-primary hover:text-white">
                        <div className="">
                            Browse All
                        </div>
                        <div className="">
                            <MdKeyboardArrowRight size={20} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-[20px]">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div className="flex flex-col items-center hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 p-4 group cursor-pointer">
                            <div className="">
                                <img src={book1} alt="" srcset="" />
                            </div>
                            <div className="font-bold">The Odyssey</div>
                            <div className="opacity-60">Homer, Emily Wilson</div>
                            <div className="text-primary font-bold">150.000 VND</div>
                            <button
                                className="
                                btn
                                btn-primary
                                w-full
                                mt-2
                                opacity-0
                                invisible
                                transition-all
                                duration-200
                                group-hover:opacity-100
                                group-hover:visible
                            "
                            >
                                + Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}