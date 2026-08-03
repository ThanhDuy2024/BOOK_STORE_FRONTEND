import { useIntl } from "react-intl"
import { Link } from "react-router";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaRegChartBar } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { useState } from "react";
export const CreateUsers = () => {
    const lang = useIntl();
    const [preview, setPreview] = useState("")
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };
    return (
        <>
            <div className="flex justify-between items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
                <div className="flex items-center justify-center gap-[20px]">
                    <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                        <BsBookmarkPlus size={20} className="text-primary" />
                    </div>
                    <div className="">
                        <div className="text-primary font-[700]">{lang.formatMessage({ id: "global.createNew" })}</div>
                        <div className="text-[26px] text-black font-[700]">{lang.formatMessage({ id: "book.title" })}</div>
                    </div>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 gap-[10px]">
                        <li>
                            <button className="btn btn-primary text-white font-[500]" onClick={() => document.getElementById('my_modal_create').showModal()}>
                                <Link to={"/admin/books"}>
                                    {lang.formatMessage({ id: "global.recall" })}
                                </Link>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-full gap-[10px] flex">
                <div className="w-[60%] mt-[20px] mx-[10px] rounded-[10px] shadow-md bg-white p-4">
                    <div className=" flex items-center justify-between mb-[16px]">
                        <div className="">
                            <div className="flex items-center gap-[10px] text-[20px]">
                                <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                    <CiBookmarkPlus size={20} className="text-primary" />
                                </div>
                                <div className="">
                                    <div className="font-bold">{lang.formatMessage({ id: "book.information" })}</div>
                                    <div className="mt-[5px] text-[14px] opacity-75">
                                        Những thông tin bạn cần điền cho một cuốn sách
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <form className="grid grid-cols-2 gap-[5px]">
                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="name">
                                Book name
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="bookName"
                                className="input w-full outline-none"
                                placeholder="Enter book name..." />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="quantity">
                                Quantity
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                className="input w-full outline-none"
                                placeholder="Enter quantity..." />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="author">
                                Author
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                className="input w-full outline-none"
                                placeholder="Enter author..." />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="publishing">
                                Publishing house
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="publishing"
                                name="publishing"
                                className="input w-full outline-none"
                                placeholder="Enter publishing..." />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="price">
                                Price
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                className="input w-full outline-none"
                                placeholder="Enter price..." />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="publication">
                                Publication date
                                <span className="text-red-500">*</span>
                            </label>
                            <input type="date" name="publication" className="input w-full" />
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-black" htmlFor="status">
                                {lang.formatMessage({ id: "table.status" })}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="status"
                                className="select w-full outline-none"
                            >
                                <option value="active">
                                    {lang.formatMessage({ id: "select.active" })}
                                </option>
                                <option value="inactive">
                                    {lang.formatMessage({ id: "select.inactive" })}
                                </option>
                            </select>
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-black" htmlFor="image">
                                {lang.formatMessage({ id: "input.image" })}
                                <span className="text-red-500">*</span>
                            </label>
                            <input type="file" id="image" name="image" className="file-input w-[100%] outline-none" onChange={handleImageChange} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black">Description</label>
                            <textarea className="textarea h-24 w-full outline-none" placeholder="Book description..."></textarea>
                        </fieldset>

                        <div className="flex justify-end items-end gap-[5px]">
                            <button className="btn">
                                {lang.formatMessage({ id: "button.close" })}
                            </button>
                            <button className="btn btn-primary">
                                {lang.formatMessage({ id: "book.createBook" })}
                            </button>
                        </div>

                        <div className="">
                            {preview && (
                                <div className="card w-[320px] bg-base-100 shadow-xl">
                                    <figure className="h-[300px] overflow-hidden">
                                        <img
                                            src={preview}
                                            alt="Category"
                                            className="w-full h-full object-contain transition duration-500 hover:scale-110"
                                        />
                                    </figure>
                                </div>
                            )}
                        </div>

                    </form>
                </div>
                <div className="w-[40%] mt-[20px] mx-[10px] rounded-[10px] shadow-md bg-white p-4">
                    <div className=" flex items-center justify-between mb-[16px]">
                        <div className="">
                            <div className="flex items-center gap-[10px] text-[20px]">
                                <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                    <MdOutlineCategory size={20} className="text-primary" />
                                </div>
                                <div className="">
                                    <div className="font-bold">
                                        Chọn danh mục
                                    </div>
                                    <div className="mt-[5px] text-[14px] opacity-75">
                                        Trong một cuốn sách bạn có thể chọn nhiều danh mục
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-primary transition">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                            />
                            <span className="font-medium text-gray-700">
                                Category 1
                            </span>
                        </label>

                        <label className="
                            flex items-center gap-3
                            p-3
                            rounded-xl
                            border
                            border-gray-200
                            cursor-pointer
                            hover:border-primary
                            transition
                        ">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                            />
                            <span className="font-medium text-gray-700">
                                Category 2
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}