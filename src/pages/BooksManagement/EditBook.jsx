import { useIntl } from "react-intl";
import { Link, useNavigate, useParams } from "react-router";
import { TbBookmarkEdit } from "react-icons/tb";
import { MdOutlineBookmarkAdd, MdOutlineCategory } from "react-icons/md";
import { useEffect, useState } from "react";
import { callApi } from "../../api/api";
import { toast } from "sonner";
import axios from "axios";

export const EditBook = () => {
    const lang = useIntl();
    const navigate = useNavigate();
    const { id } = useParams();

    // ==============================
    // STATE
    // ==============================
    const [preview, setPreview] = useState("");
    const [categories, setCategories] = useState([]);
    const [bookDetail, setBookDetail] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Sync selected categories when book details are loaded
    useEffect(() => {
        if (bookDetail?.categories) {
            setSelectedCategories(
                bookDetail.categories.map((category) => category.id)
            );
        }
    }, [bookDetail]);

    // ==============================
    // GET CATEGORIES
    // ==============================
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await callApi(
                    "get",
                    `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/categories/for-book`,
                    {}
                );

                if (res.status === true) {
                    setCategories(res.data || []);
                }
            } catch (error) {
                console.log(error);
                toast.error(
                    lang.formatMessage({
                        id: "toast.notFound",
                    })
                );
            }
        };

        loadCategories();
    }, []);

    // ==============================
    // GET BOOK DETAIL
    // ==============================
    useEffect(() => {
        const loadBookDetail = async () => {
            try {
                const res = await callApi(
                    "get",
                    `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/books/${id}`,
                    {}
                );
                if (res.status === true) {
                    setBookDetail(res.data);
                    setPreview(res.data.image);
                }
            } catch (error) {
                console.log(error);
                toast.error(
                    lang.formatMessage({
                        id: "toast.notFound",
                    })
                );
            }
        };

        if (id) {
            loadBookDetail();
        }
    }, [id]);

    // ==============================
    // IMAGE PREVIEW & CLEANUP
    // ==============================
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    };

    // ==============================
    // CATEGORY CHECKBOX
    // ==============================
    const handleCategoryChange = (id, checked) => {
        if (checked) {
            setSelectedCategories((prev) => {
                if (prev.includes(id)) {
                    return prev;
                }
                return [...prev, id];
            });
        } else {
            setSelectedCategories((prev) =>
                prev.filter((categoryId) => categoryId !== id)
            );
        }
    };

    // ==============================
    // SUBMIT
    // ==============================
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (loading) return;

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("bookName", e.target.bookName.value);
            formData.append("quantity", e.target.quantity.value);
            formData.append("author", e.target.author.value);
            formData.append("publishing", e.target.publishing.value);
            formData.append("price", e.target.price.value);
            formData.append("publication", e.target.publication.value);
            formData.append("status", e.target.status.value);
            formData.append("description", e.target.description.value);

            // CATEGORIES
            selectedCategories.forEach((catId) => {
                formData.append("categories[]", Number(catId));
            });

            // IMAGE
            const file = e.target.image.files?.[0];
            if (file) {
                formData.append("image", file);
            }

            const res = await axios.put(
                `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/books/${id}`,
                formData,
                {
                    headers: {
                        token:
                            localStorage.getItem("token") ||
                            sessionStorage.getItem("token"),
                        "content-type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.status === true) {
                toast.success(
                    `${lang.formatMessage({
                        id: "book.subtitle",
                    })} ${lang.formatMessage({
                        id: "toast.updated",
                    })}`
                );
                navigate("/admin/books");
            } else {
                toast.error(
                    `${lang.formatMessage({
                        id: "book.subtitle",
                    })} ${lang.formatMessage({
                        id: "toast.notFound",
                    })}`
                );
            }
        } catch (error) {
            console.log(error);
            toast.error(
                `${lang.formatMessage({
                    id: "book.subtitle",
                })} ${lang.formatMessage({
                    id: "toast.notFound",
                })}`
            );
        } finally {
            setLoading(false);
        }
    };

    // ==============================
    // CLOSE
    // ==============================
    const handleClose = () => {
        navigate("/admin/books");
    };

    return (
        <>
            {/* =====================================================
                HEADER
            ====================================================== */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
                {/* LEFT */}
                <div className="flex items-center gap-[15px]">
                    <div className="w-[48px] h-[48px] shrink-0 bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                        <TbBookmarkEdit
                            size={20}
                            className="text-primary"
                        />
                    </div>

                    <div className="min-w-0">
                        <div className="text-primary font-[700]">
                            {lang.formatMessage({
                                id: "book.editBook",
                            })}
                        </div>

                        <div className="text-[22px] sm:text-[26px] text-black font-[700] truncate">
                            {bookDetail?.bookName || "..."}
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="mt-4 md:mt-0">
                    <Link
                        to="/admin/books"
                        className="btn btn-primary text-white font-[500] w-full md:w-auto"
                    >
                        {lang.formatMessage({
                            id: "global.recall",
                        })}
                    </Link>
                </div>
            </div>

            {/* =====================================================
                MAIN
            ====================================================== */}
            <div className="flex flex-col lg:flex-row gap-[10px] w-full">
                {/* =================================================
                    BOOK INFORMATION
                ================================================= */}
                <div className="w-full lg:w-[60%] mt-[20px] lg:mx-[10px] rounded-[10px] shadow-md bg-white p-4">
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-[16px]">
                        <div className="flex items-center gap-[10px]">
                            <div className="w-[48px] h-[48px] shrink-0 bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                <MdOutlineBookmarkAdd
                                    size={20}
                                    className="text-primary"
                                />
                            </div>

                            <div>
                                <div className="font-bold text-[18px] sm:text-[20px]">
                                    {lang.formatMessage({
                                        id: "book.information",
                                    })}
                                </div>

                                <div className="mt-[5px] text-[14px] opacity-75">
                                    {lang.formatMessage({
                                        id: "book.subInformation",
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        FORM
                    ================================================= */}
                    <form
                        key={bookDetail?.id || "loading"}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-[10px] gap-y-[5px]"
                        onSubmit={handleSubmitForm}
                    >
                        {/* BOOK NAME */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="name"
                            >
                                {lang.formatMessage({
                                    id: "book.bookName",
                                })}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="bookName"
                                required
                                defaultValue={bookDetail?.bookName || ""}
                                className="input w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "book.subBookName",
                                })}
                            />
                        </fieldset>

                        {/* QUANTITY */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="quantity"
                            >
                                {lang.formatMessage({
                                    id: "table.quantity",
                                })}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="0"
                                required
                                defaultValue={bookDetail?.quantity ?? 0}
                                className="input w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "global.subQuantity",
                                })}
                            />
                        </fieldset>

                        {/* AUTHOR */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="author"
                            >
                                {lang.formatMessage({
                                    id: "book.author",
                                })}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                id="author"
                                name="author"
                                required
                                defaultValue={bookDetail?.author || ""}
                                className="input w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "book.subAuthor",
                                })}
                            />
                        </fieldset>

                        {/* PUBLISHING */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="publishing"
                            >
                                {lang.formatMessage({
                                    id: "book.publishing",
                                })}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                id="publishing"
                                name="publishing"
                                required
                                defaultValue={bookDetail?.publishing || ""}
                                className="input w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "book.subPublishing",
                                })}
                            />
                        </fieldset>

                        {/* PRICE */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="price"
                            >
                                {lang.formatMessage({
                                    id: "global.price",
                                })}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="number"
                                id="price"
                                name="price"
                                min="0"
                                required
                                defaultValue={bookDetail?.price ?? 0}
                                className="input w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "book.subPrice",
                                })}
                            />
                        </fieldset>

                        {/* PUBLICATION */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="publication"
                            >
                                {lang.formatMessage({
                                    id: "book.publication",
                                })}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="date"
                                id="publication"
                                name="publication"
                                required
                                defaultValue={
                                    bookDetail?.publication
                                        ? bookDetail.publication
                                              .split("/")
                                              .reverse()
                                              .join("-")
                                        : ""
                                }
                                className="input w-full outline-none"
                            />
                        </fieldset>

                        {/* STATUS */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="status"
                            >
                                {lang.formatMessage({
                                    id: "table.status",
                                })}
                                <span className="text-red-500">*</span>
                            </label>

                            <select
                                id="status"
                                name="status"
                                defaultValue={bookDetail?.status || "active"}
                                className="select w-full outline-none"
                            >
                                <option value="active">
                                    {lang.formatMessage({
                                        id: "select.active",
                                    })}
                                </option>

                                <option value="inactive">
                                    {lang.formatMessage({
                                        id: "select.inactive",
                                    })}
                                </option>
                            </select>
                        </fieldset>

                        {/* IMAGE */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="image"
                            >
                                {lang.formatMessage({
                                    id: "input.image",
                                })}
                            </label>

                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                className="file-input w-full outline-none"
                                onChange={handleImageChange}
                            />
                        </fieldset>

                        {/* DESCRIPTION */}
                        <fieldset className="fieldset md:col-span-2">
                            <label
                                className="label text-black"
                                htmlFor="description"
                            >
                                {lang.formatMessage({
                                    id: "book.description",
                                })}
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                defaultValue={bookDetail?.description || ""}
                                className="textarea min-h-[120px] w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "book.subDescription",
                                })}
                            />
                        </fieldset>

                        {/* =================================================
                            IMAGE PREVIEW
                        ================================================= */}
                        {preview && (
                            <div className="md:col-span-2 mt-[10px]">
                                <div className="text-sm font-semibold mb-2">
                                    Preview
                                </div>

                                <div className="w-full max-w-[320px] rounded-xl overflow-hidden bg-base-100 shadow-md border border-slate-200">
                                    <figure className="h-[260px] sm:h-[300px] overflow-hidden">
                                        <img
                                            src={preview}
                                            alt="Book preview"
                                            className="w-full h-full object-contain transition duration-500 hover:scale-105"
                                        />
                                    </figure>
                                </div>
                            </div>
                        )}

                        {/* =================================================
                            BUTTONS
                        ================================================= */}
                        <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-[8px] mt-[15px]">
                            <button
                                type="button"
                                className="btn w-full sm:w-auto"
                                onClick={handleClose}
                                disabled={loading}
                            >
                                {lang.formatMessage({
                                    id: "button.close",
                                })}
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary w-full sm:w-auto"
                                disabled={loading}
                            >
                                {loading
                                    ? "Updating..."
                                    : lang.formatMessage({
                                          id: "button.edit",
                                      })}
                            </button>
                        </div>
                    </form>
                </div>

                {/* =================================================
                    CATEGORY
                ================================================= */}
                <div className="w-full lg:w-[40%] mt-[20px] lg:mx-[10px] rounded-[10px] shadow-md bg-white p-4">
                    {/* HEADER */}
                    <div className="flex items-center gap-[10px] mb-[16px]">
                        <div className="w-[48px] h-[48px] shrink-0 bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                            <MdOutlineCategory
                                size={20}
                                className="text-primary"
                            />
                        </div>

                        <div>
                            <div className="font-bold text-[18px] sm:text-[20px]">
                                {lang.formatMessage({
                                    id: "category.selectCategory",
                                })}
                            </div>

                            <div className="mt-[5px] text-[14px] opacity-75">
                                {lang.formatMessage({
                                    id: "category.subSelectCategory",
                                })}
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        CATEGORY LIST
                    ================================================= */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                        {categories.map((item) => (
                            <label
                                key={item.id}
                                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition
                                    ${
                                        selectedCategories.includes(item.id)
                                            ? "border-primary bg-primary/5"
                                            : "border-gray-200 hover:border-primary"
                                    }
                                `}
                            >
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    checked={selectedCategories.includes(
                                        item.id
                                    )}
                                    onChange={(e) =>
                                        handleCategoryChange(
                                            item.id,
                                            e.target.checked
                                        )
                                    }
                                />

                                <span className="font-medium text-gray-700 break-words">
                                    {item.categoryName}
                                </span>
                            </label>
                        ))}
                    </div>

                    {/* NO CATEGORY */}
                    {categories.length === 0 && (
                        <div className="text-center py-10 text-slate-500">
                            Không có category
                        </div>
                    )}

                    {/* SELECTED COUNT */}
                    {selectedCategories.length > 0 && (
                        <div className="mt-5 p-3 rounded-lg bg-slate-50 text-sm">
                            <span className="font-semibold">Selected:</span>{" "}
                            {selectedCategories.length}{" "}
                            {selectedCategories.length > 1
                                ? "categories"
                                : "category"}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};