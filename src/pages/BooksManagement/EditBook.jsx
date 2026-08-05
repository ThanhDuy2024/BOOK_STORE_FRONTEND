import { useIntl } from "react-intl"
import { Link, useNavigate, useParams } from "react-router";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaRegChartBar } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { TbBookmarkEdit } from "react-icons/tb";
import { useEffect, useState } from "react";
import { callApi } from "../../api/api"
import { toast } from "sonner";
import axios from "axios";
export const EditBook = () => {
    const lang = useIntl();
    const navigate = useNavigate();
    const { id } = useParams();
    const [preview, setPreview] = useState("");
    const [categories, setCategories] = useState([]);
    const [bookDetail, setBookDetail] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        if (bookDetail?.categories) {
            setSelectedCategories(
                bookDetail.categories.map(category => category.id)
            );
        }
    }, [bookDetail]);

    useEffect(() => {
        (async () => {
            try {
                const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/categories/for-book`, {});

                if (res.status === true) {
                    setCategories(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/books/${id}`, {});
                if (res.status === true) {
                    setBookDetail(res.data);
                    setPreview(res.data.image);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id])

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("bookName", e.target.bookName.value);
        formData.append("quantity", e.target.quantity.value);
        formData.append("author", e.target.author.value);
        formData.append("publishing", e.target.publishing.value);
        formData.append("price", e.target.price.value);
        formData.append("publication", e.target.publication.value);
        formData.append("status", e.target.status.value);
        formData.append("description", e.target.description.value);

        selectedCategories.forEach(id => {
            formData.append("categories[]", Number(id));
        });

        const file = e.target.image.files[0];
        if (file) {
            formData.append("image", file);
        }

        try {
            const res = await axios.put(`${import.meta.env.VITE_REACT_APP_APIDEV}/admin/books/${id}`, formData,
                {
                    headers: {
                        token: localStorage.getItem('token') || sessionStorage.getItem('token'),
                        'content-type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );

            if (res.data.status === true) {
                toast.success(`${lang.formatMessage({ id: "book.subtitle" })} ${lang.formatMessage({ id: "toast.updated" })}`)
                navigate("/admin/books")
            } else {
                toast.error(`${lang.formatMessage({ id: "book.subtitle" })} ${lang.formatMessage({ id: "toast.notFound" })}`)
            }
        } catch (error) {
            console.log(error);
            toast.error(`${lang.formatMessage({ id: "book.subtitle" })} ${lang.formatMessage({ id: "toast.notFound" })}`)

        }
    };
    return (
        <>
            <div className="flex justify-between items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
                <div className="flex items-center justify-center gap-[20px]">
                    <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                        <TbBookmarkEdit size={20} className="text-primary" />
                    </div>
                    <div className="">
                        <div className="text-primary font-[700]">{lang.formatMessage({ id: "book.editBook" })}</div>
                        <div className="text-[26px] text-black font-[700]">{bookDetail?.bookName || "unknow_book"}</div>
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
                                    <MdOutlineBookmarkAdd size={20} className="text-primary" />
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
                    <form className="grid grid-cols-2 gap-[5px]" onSubmit={handleSubmitForm}>
                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="name">
                                {lang.formatMessage({ id: "book.bookName" })}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="bookName"
                                className="input w-full outline-none"
                                defaultValue={bookDetail?.bookName || ""}
                                placeholder={lang.formatMessage({ id: "book.subBookName" })} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="quantity">
                                {lang.formatMessage({ id: "table.quantity" })}
                                <span className="text-red-500">*</span>
                            </label>
                            {bookDetail?.quantity && (
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    className="input w-full outline-none"
                                    defaultValue={bookDetail?.quantity || 0}
                                    placeholder={lang.formatMessage({ id: "global.subQuantity" })} />
                            )}
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="author">
                                {lang.formatMessage({ id: "book.author" })}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                className="input w-full outline-none"
                                defaultValue={bookDetail?.author || ""}
                                placeholder={lang.formatMessage({ id: "book.subAuthor" })} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="publishing">
                                {lang.formatMessage({ id: "book.publishing" })}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="publishing"
                                name="publishing"
                                className="input w-full outline-none"
                                defaultValue={bookDetail?.publishing || ""}
                                placeholder={lang.formatMessage({ id: "book.subPublishing" })} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="price">
                                {lang.formatMessage({ id: "global.price" })}
                                <span className="text-red-500">*</span>
                            </label>
                            {bookDetail?.price && (
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    className="input w-full outline-none"
                                    defaultValue={bookDetail?.price || 0}
                                    placeholder={lang.formatMessage({ id: "book.subPrice" })} />
                            )}
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="publication">
                                {lang.formatMessage({ id: "book.publication" })}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="publication"
                                defaultValue={
                                    bookDetail?.publication
                                        ? bookDetail.publication.split("/").reverse().join("-")
                                        : ""
                                }
                                className="input w-full"
                            />
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-black" htmlFor="status">
                                {lang.formatMessage({ id: "table.status" })}
                                <span className="text-red-500">*</span>
                            </label>
                            {bookDetail?.status && (
                                <select
                                    name="status"
                                    defaultValue={bookDetail?.status || ""}
                                    className="select w-full outline-none"
                                >
                                    <option value="active">
                                        {lang.formatMessage({ id: "select.active" })}
                                    </option>
                                    <option value="inactive">
                                        {lang.formatMessage({ id: "select.inactive" })}
                                    </option>
                                </select>
                            )}
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-black" htmlFor="image">
                                {lang.formatMessage({ id: "input.image" })}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="file-input w-[100%] outline-none"
                                onChange={handleImageChange}
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black">{lang.formatMessage({ id: "book.description" })}</label>
                            <textarea
                                className="textarea h-24 w-full outline-none"
                                name="description"
                                defaultValue={bookDetail?.description || ""}
                                placeholder={lang.formatMessage({ id: "book.subDescription" })}>
                            </textarea>
                        </fieldset>

                        <div className="flex justify-end items-end gap-[5px]">
                            <button className="btn">
                                {lang.formatMessage({ id: "button.close" })}
                            </button>
                            <button className="btn btn-primary">
                                {lang.formatMessage({ id: "button.edit" })}
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
                                        {lang.formatMessage({ id: "category.selectCategory" })}

                                    </div>
                                    <div className="mt-[5px] text-[14px] opacity-75">
                                        {lang.formatMessage({ id: "category.subSelectCategory" })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map(item => (
                            <label
                                key={item.id}
                                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-primary transition"
                            >
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    checked={selectedCategories.includes(item.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedCategories([
                                                ...selectedCategories,
                                                item.id
                                            ]);
                                        } else {
                                            setSelectedCategories(
                                                selectedCategories.filter(id => id !== item.id)
                                            );
                                        }
                                    }}
                                />

                                <span className="font-medium text-gray-700">
                                    {item.categoryName}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}