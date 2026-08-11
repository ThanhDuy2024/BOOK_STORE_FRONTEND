import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router";
import { TbUsersPlus } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const CreateUsers = () => {
    const lang = useIntl();
    const navigate = useNavigate();

    // ==============================
    // STATE
    // ==============================
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    // ==============================
    // IMAGE PREVIEW & CLEANUP
    // ==============================
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            setPreview("");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    // ==============================
    // SUBMIT FORM
    // ==============================
    const handleSubmitCreate = async (e) => {
        e.preventDefault();

        if (loading) return;

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("adminName", e.target.adminName.value);
            formData.append("fullName", e.target.fullName.value);
            formData.append("email", e.target.email.value);
            formData.append("password", e.target.password.value);
            formData.append("address", e.target.address.value);
            formData.append("phone", e.target.phone.value);
            formData.append("status", e.target.status.value);
            formData.append("roleId", e.target.roleId.value);

            const file = e.target.image.files?.[0];
            if (file) {
                formData.append("image", file);
            }

            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/account`,
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
                        id: "users.subtitle",
                    })} ${lang.formatMessage({ id: "toast.created" })}`
                );
                navigate("/admin/users");
            } else {
                toast.error(
                    `${lang.formatMessage({
                        id: "users.subtitle",
                    })} ${lang.formatMessage({ id: "toast.notFound" })}`
                );
            }
        } catch (error) {
            console.log(error);
            toast.error("Error system");
        } finally {
            setLoading(false);
        }
    };

    // ==============================
    // CLOSE
    // ==============================
    const handleClose = () => {
        navigate("/admin/users");
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
                        <TbUsersPlus size={20} className="text-primary" />
                    </div>

                    <div className="min-w-0">
                        <div className="text-primary font-[700]">
                            {lang.formatMessage({ id: "global.createNew" })}
                        </div>

                        <div className="text-[22px] sm:text-[26px] text-black font-[700]">
                            {lang.formatMessage({ id: "users.addNewUsers" })}
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="mt-4 md:mt-0">
                    <Link
                        to="/admin/users"
                        className="btn btn-primary text-white font-[500] w-full md:w-auto flex items-center justify-center"
                    >
                        {lang.formatMessage({ id: "global.recall" })}
                    </Link>
                </div>
            </div>

            {/* =====================================================
                MAIN
            ====================================================== */}
            <div className="flex flex-col lg:flex-row gap-[10px] w-full">
                {/* =================================================
                    USER INFORMATION
                ================================================= */}
                <div className="w-full lg:w-[60%] mt-[20px] lg:mx-[10px] rounded-[10px] shadow-md bg-white p-4">
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-[16px]">
                        <div className="flex items-center gap-[10px]">
                            <div className="w-[48px] h-[48px] shrink-0 bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                <IoMdInformationCircleOutline
                                    size={20}
                                    className="text-primary"
                                />
                            </div>

                            <div>
                                <div className="font-bold text-[18px] sm:text-[20px]">
                                    {lang.formatMessage({
                                        id: "users.information",
                                    })}
                                </div>

                                <div className="mt-[5px] text-[14px] opacity-75">
                                    {lang.formatMessage({
                                        id: "users.subInformation",
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        FORM
                    ================================================= */}
                    <form
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-[10px] gap-y-[5px]"
                        onSubmit={handleSubmitCreate}
                    >
                        {/* ADMIN NAME */}
                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="name">
                                {lang.formatMessage({
                                    id: "users.adminName",
                                })}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="adminName"
                                required
                                className="input w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "users.subAdminName",
                                })}
                            />
                        </fieldset>

                        {/* FULL NAME */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="fullName"
                            >
                                {lang.formatMessage({ id: "users.fullName" })}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                required
                                className="input w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "users.subFullName",
                                })}
                            />
                        </fieldset>

                        {/* EMAIL */}
                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="email">
                                Email
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="input w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "users.subEmail",
                                })}
                            />
                        </fieldset>

                        {/* PASSWORD */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="password"
                            >
                                {lang.formatMessage({
                                    id: "users.password",
                                })}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="input w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "users.subPassword",
                                })}
                            />
                        </fieldset>

                        {/* ADDRESS */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="address"
                            >
                                {lang.formatMessage({ id: "users.address" })}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                id="address"
                                name="address"
                                required
                                className="input w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "users.subAddress",
                                })}
                            />
                        </fieldset>

                        {/* PHONE */}
                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="phone">
                                {lang.formatMessage({ id: "users.phone" })}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                required
                                className="input w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "users.subPhone",
                                })}
                            />
                        </fieldset>

                        {/* STATUS */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="status"
                            >
                                {lang.formatMessage({ id: "table.status" })}
                                <span className="text-red-500">*</span>
                            </label>

                            <select
                                id="status"
                                name="status"
                                defaultValue="active"
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

                        {/* ROLE */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="roleId"
                            >
                                {lang.formatMessage({ id: "users.role" })}
                                <span className="text-red-500">*</span>
                            </label>

                            <select
                                id="roleId"
                                name="roleId"
                                defaultValue="1"
                                className="select w-full outline-none"
                            >
                                <option value="1">Admin</option>
                                <option value="2">Staff</option>
                            </select>
                        </fieldset>

                        {/* IMAGE */}
                        <fieldset className="fieldset md:col-span-2">
                            <label
                                className="label text-black"
                                htmlFor="image"
                            >
                                {lang.formatMessage({ id: "input.image" })}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                required
                                className="file-input w-full outline-none"
                                onChange={handleImageChange}
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
                                            alt="User preview"
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
                                {lang.formatMessage({ id: "button.close" })}
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary w-full sm:w-auto"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating..."
                                    : lang.formatMessage({
                                          id: "users.addNewUsers",
                                      })}
                            </button>
                        </div>
                    </form>
                </div>

                {/* =================================================
                    CATEGORY / SIDE PANEL
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
                                Chọn danh mục
                            </div>

                            <div className="mt-[5px] text-[14px] opacity-75">
                                Trong một cuốn sách bạn có thể chọn nhiều danh
                                mục
                            </div>
                        </div>
                    </div>

                    {/* CATEGORY LIST */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                        <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-primary transition">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                            />
                            <span className="font-medium text-gray-700">
                                Category 1
                            </span>
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-primary transition">
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
    );
};