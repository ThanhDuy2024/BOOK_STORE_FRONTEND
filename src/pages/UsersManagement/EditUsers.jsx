import { useIntl } from "react-intl"
import { Link, useNavigate, useParams } from "react-router";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaRegChartBar } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { TbUsersPlus } from "react-icons/tb";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import axios from "axios";
import { toast } from "sonner";
import { callApi } from "../../api/api";
export const EditUsers = () => {
    const lang = useIntl();
    const navigate = useNavigate();
    const { id } = useParams();
    const [preview, setPreview] = useState("");
    const [usersDetail, setUsersDetail] = useState({});
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/account/${id}`, {});
                setUsersDetail(res.data);
                setPreview(res.data.image)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            try {
                const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/account/roles/list`, {});
                setRoles(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("adminName", e.target.adminName.value);
        formData.append("fullName", e.target.fullName.value);
        formData.append("address", e.target.address.value);
        formData.append("phone", e.target.phone.value);
        formData.append("status", e.target.status.value);
        formData.append("roleId", e.target.roleId.value);

        const file = e.target.image.files[0];
        if (file) {
            formData.append("image", file);
        }

        try {
            const res = await axios.put(`${import.meta.env.VITE_REACT_APP_APIDEV}/admin/account/${id}`, formData,
                {
                    headers: {
                        token: localStorage.getItem('token') || sessionStorage.getItem('token'),
                        'content-type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );

            if (res.data.status === true) {
                toast.success(`${lang.formatMessage({ id: "users.subtitle" })} ${lang.formatMessage({ id: "toast.updated" })}`)
                navigate("/admin/users")
            } else {
                toast.success(`${lang.formatMessage({ id: "users.subtitle" })} ${lang.formatMessage({ id: "toast.notFound" })}`)
            }
        } catch (error) {
            console.log(error);
            toast.success(`Error system`)
        }
    }
    return (
        <>
            <div className="flex justify-between items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
                <div className="flex items-center justify-center gap-[20px]">
                    <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                        <TbUserEdit size={20} className="text-primary" />
                    </div>
                    <div className="">
                        <div className="text-primary font-[700]">{lang.formatMessage({ id: "table.edit" })}</div>
                        <div className="text-[26px] text-black font-[700]">
                            {lang.formatMessage({ id: "users.subtitle" })}
                        </div>
                    </div>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 gap-[10px]">
                        <li>
                            <button className="btn btn-primary text-white font-[500]" onClick={() => document.getElementById('my_modal_create').showModal()}>
                                <Link to={"/admin/users"}>
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
                                    <IoMdInformationCircleOutline size={20} className="text-primary" />
                                </div>
                                <div className="">
                                    <div className="font-bold">{lang.formatMessage({ id: "users.information" })}</div>
                                    <div className="mt-[5px] text-[14px] opacity-75">
                                        {lang.formatMessage({ id: "users.subInformation" })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <form className="grid grid-cols-2 gap-[5px]" onSubmit={handleSubmitCreate}>
                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="name">
                                {lang.formatMessage({ id: "users.adminName" })}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="adminName"
                                className="input w-full outline-none"
                                defaultValue={usersDetail?.adminName}
                                placeholder={lang.formatMessage({ id: "users.subAdminName" })} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="fullName">
                                {lang.formatMessage({ id: "users.fullName" })}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="input w-full outline-none"
                                defaultValue={usersDetail?.fullName}
                                placeholder={lang.formatMessage({ id: "users.subFullName" })} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="address">
                                {lang.formatMessage({ id: "users.address" })}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="input w-full outline-none"
                                defaultValue={usersDetail?.address}
                                placeholder={lang.formatMessage({ id: "users.subAddress" })} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-black" htmlFor="phone">
                                {lang.formatMessage({ id: "users.phone" })}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="input w-full outline-none"
                                defaultValue={usersDetail?.phone}
                                placeholder={lang.formatMessage({ id: "users.subPhone" })} />
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-black" htmlFor="status">
                                {lang.formatMessage({ id: "table.status" })}
                                <span className="text-red-500">*</span>
                            </label>
                            {usersDetail.status && (
                                <select
                                    name="status"
                                    className="select w-full outline-none"
                                    defaultValue={usersDetail?.status}
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
                            <input type="file" id="image" name="image" className="file-input w-[100%] outline-none" onChange={handleImageChange} />
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-black" htmlFor="roleId">
                                {lang.formatMessage({ id: "users.role" })}
                                <span className="text-red-500">*</span>
                            </label>
                            {usersDetail?.roleId && (
                                <select
                                    name="roleId"
                                    className="select w-full outline-none"
                                    defaultValue={usersDetail?.roleId}
                                >
                                    {roles?.map((item) => (
                                        <option value={item.id}>
                                            {item?.roleName}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </fieldset>

                        <div className="flex justify-end items-end gap-[5px]">
                            <button className="btn">
                                {lang.formatMessage({ id: "button.close" })}
                            </button>
                            <button className="btn btn-primary">
                                {lang.formatMessage({ id: "table.edit" })}
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

            <dialog id="my_modal_delete" className="modal">
                <div class="modal-box">
                    <h3 class="text-lg font-bold text-primary">{lang.formatMessage({ id: "book.deleteBook" })}</h3>
                    <p class="py-4">{lang.formatMessage({ id: "book.deleteDes" })}</p>
                    <div class="modal-action">
                        <div className="">
                            <button className="btn btn-primary" onClick={handleDeleteBook}>
                                {lang.formatMessage({ id: "button.confirm" })}
                            </button>
                        </div>
                        <form method="dialog">
                            {/* <!-- if there is a button in form, it will close the modal --> */}
                            <button class="btn">{lang.formatMessage({ id: "button.close" })}</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}