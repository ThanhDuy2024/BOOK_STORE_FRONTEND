import bg3 from "../../assets/bg3.png"
import book1 from "../../assets/Theodyssey.webp"
import { MdKeyboardArrowRight } from "react-icons/md";
export const Home = () => {
    return (
        <>
            <div className="">
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
        </>
    )
}