import { IoSearchOutline } from "react-icons/io5";
import { useIntl } from "react-intl";
import { userMockData } from "../../data/mockData";
import { useEffect, useState } from "react";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiFlagBannerFoldDuotone } from "react-icons/pi";
import { VscLayersActive } from "react-icons/vsc";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { LiaUserSolid } from "react-icons/lia";
import { FaRegChartBar } from "react-icons/fa";
import { Link } from "react-router";
import { callApi } from "../../api/api";
import { toast } from "sonner";

const Users = () => {
    const lang = useIntl();

    // =========================
    // STATE
    // =========================
    const [usersList, setUsersList] = useState(userMockData);
    const [userDetail, setUserDetail] = useState();
    const [totalPage, setTotalPage] = useState(1);

    const [search, setSearch] = useState("null");
    const [status, setStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const [createdAtFilter, setCreatedFilter] =
        useState("desc");

    const [deleteUser, setDeleteUser] = useState();


    // =========================
    // LOAD USERS
    // =========================
    const loadApiUser = async (
        searchValue,
        statusValue,
        pageValue,
        createdAtValue
    ) => {
        try {
            const res = await callApi(
                "get",
                `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/account?search=${searchValue}&status=${statusValue}&createdAtFilter=${createdAtValue}&page=${pageValue}`,
                {}
            );

            setUsersList(res.data || []);
            setTotalPage(res.totalPage || 1);
        } catch (error) {
            console.log(error);
            toast.error("Không thể tải danh sách users!");
        }
    };


    // =========================
    // USE EFFECT
    // =========================
    useEffect(() => {
        loadApiUser(
            search,
            status,
            currentPage,
            createdAtFilter
        );
    }, [
        search,
        status,
        currentPage,
        createdAtFilter
    ]);


    // =========================
    // DELETE USER
    // =========================
    const handleDeleteUser = async () => {
        try {
            const res = await callApi(
                "put",
                `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/account/delete/${deleteUser}`,
                {}
            );

            if (res.status === true) {

                await loadApiUser(
                    search,
                    status,
                    currentPage,
                    createdAtFilter
                );

                document
                    .getElementById("my_modal_delete")
                    ?.close();

                toast.success(
                    `${lang.formatMessage({
                        id: "users.subtitle"
                    })} ${lang.formatMessage({
                        id: "toast.deleted"
                    })}`
                );

            } else {

                toast.error(
                    `${lang.formatMessage({
                        id: "users.subtitle"
                    })} ${lang.formatMessage({
                        id: "toast.notFound"
                    })}`
                );

            }

        } catch (error) {
            console.log(error);

            toast.error(
                "Có lỗi xảy ra khi xóa user!"
            );
        }
    };

    const handleOpenDelete = (user) => {
        setUserDetail(user);
        setDeleteUser(user.id);

        document
            .getElementById("my_modal_delete")
            ?.showModal();
    };


    return (
        <>
            <div className="sm:flex justify-between items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">

                <div className="md:flex md:items-center md:justify-center sm:gap-[20px] gap-[10px]">

                    <div className="w-[48px] h-[48px] bg-[#eaf2ff] hidden sm:flex items-center justify-center rounded-[10px]">
                        <LiaUserSolid
                            size={20}
                            className="text-primary"
                        />
                    </div>

                    <div>

                        <div className="text-primary font-[700]">
                            {lang.formatMessage({
                                id: "global.management"
                            })}
                        </div>

                        <div className="text-[26px] text-black font-[700]">
                            {lang.formatMessage({
                                id: "users.subtitle"
                            })}
                        </div>

                        <div>
                            {lang.formatMessage({
                                id: "users.sub"
                            })}
                        </div>

                    </div>

                </div>


                <div className="mt-3 sm:mt-0">

                    <Link
                        to="/admin/users/create"
                        className="btn btn-primary text-white font-[500] w-full sm:w-auto"
                    >
                        {lang.formatMessage({
                            id: "users.createUser"
                        })}
                    </Link>

                </div>

            </div>

            <div className="md:grid md:grid-cols-4 md:gap-4 p-4">

                {/* TOTAL USERS */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-green-500 mb-[10px] md:mb-0">

                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">

                        <div>
                            TOTAL USERS
                        </div>

                        <div className="bg-[#e7f6f3] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <LiaUsersCogSolid
                                size={20}
                                color="green"
                            />
                        </div>

                    </div>

                    <div className="mt-[16px] font-bold text-[35px]">
                        100
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">

                        <div className="text-green-700">
                            +50
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            users in this month
                        </div>

                    </div>

                </div>


                {/* TOTAL ACTIVE */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-indigo-500 mb-[10px] md:mb-0">

                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">

                        <div>
                            TOTAL ACTIVE
                        </div>

                        <div className="bg-[#eaf2ff] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <VscLayersActive
                                size={20}
                                color="blue"
                            />
                        </div>

                    </div>

                    <div className="mt-[16px] font-bold text-[35px]">
                        190
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">

                        <div className="text-indigo-700">
                            90%
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            healthy account
                        </div>

                    </div>

                </div>


                {/* TOTAL INACTIVE */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-red-500 mb-[10px] md:mb-0">

                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">

                        <div>
                            TOTAL INACTIVE
                        </div>

                        <div className="bg-[#ffecec] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <IoMdRemoveCircleOutline
                                size={20}
                                color="red"
                            />
                        </div>

                    </div>

                    <div className="mt-[16px] font-bold text-[35px]">
                        5
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">

                        <div className="text-red-700">
                            5%
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            account inactive
                        </div>

                    </div>

                </div>


                {/* TOTAL BANNED */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-orange-500 mb-[10px] md:mb-0">

                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">

                        <div>
                            TOTAL BANNED
                        </div>

                        <div className="bg-[#fff4df] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">

                            <PiFlagBannerFoldDuotone
                                size={20}
                                className="text-orange-400"
                            />

                        </div>

                    </div>

                    <div className="mt-[16px] font-bold text-[35px]">
                        5
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">

                        <div className="text-orange-700">
                            5%
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            account banned
                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-[20px] mx-[10px] rounded-[10px] shadow-md bg-white">
                <div className="px-4 pt-4 mb-[10px]">
                    <div className="md:flex md:items-center md:justify-between">
                        {/* TITLE */}
                        <div>
                            <div className="flex items-center gap-[10px] text-[20px]">
                                <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                    <FaRegChartBar
                                        size={20}
                                        className="text-primary"
                                    />

                                </div>
                                <div className="font-bold">
                                    {lang.formatMessage({
                                        id: "users.title"
                                    })}
                                </div>
                            </div>
                        </div>


                        {/* FILTER */}
                        <div className="mt-3 md:mt-0">
                            <div className="flex flex-col sm:flex-row flex-wrap gap-[10px]">
                                {/* SEARCH */}
                                <label className="input outline-none w-full sm:w-auto">
                                    <div className="h-[1em] opacity-50 flex items-center">
                                        <IoSearchOutline
                                            size={20}
                                        />
                                    </div>
                                    <input
                                        type="search"
                                        value={
                                            search === "null"
                                                ? ""
                                                : search
                                        }
                                        onChange={(e) => {

                                            setCurrentPage(1);

                                            setSearch(
                                                e.target.value ||
                                                "null"
                                            );

                                        }}
                                        placeholder={lang.formatMessage({
                                            id: "input.search"
                                        })}
                                    />

                                </label>
                                {/* STATUS */}
                                <select
                                    className="select outline-none w-full sm:w-auto"
                                    value={status}
                                    onChange={(e) => {

                                        setCurrentPage(1);

                                        setStatus(
                                            e.target.value
                                        );

                                    }}
                                >
                                    <option value="all">
                                        {lang.formatMessage({
                                            id: "select.allStatus"
                                        })}
                                    </option>

                                    <option value="active">
                                        {lang.formatMessage({
                                            id: "select.active"
                                        })}
                                    </option>

                                    <option value="inactive">
                                        {lang.formatMessage({
                                            id: "select.inactive"
                                        })}
                                    </option>
                                </select>

                                {/* CREATED AT */}
                                <select
                                    className="select outline-none w-full sm:w-auto"
                                    value={createdAtFilter}
                                    onChange={(e) => {

                                        setCurrentPage(1);

                                        setCreatedFilter(
                                            e.target.value
                                        );

                                    }}
                                >

                                    <option value="desc">
                                        {lang.formatMessage({
                                            id: "global.updatedDESC"
                                        })}
                                    </option>

                                    <option value="asc">
                                        {lang.formatMessage({
                                            id: "global.updatedASC"
                                        })}
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

                    <div className="w-full overflow-x-auto">

                        <table className="table w-full text-center">

                            <thead className="bg-slate-50">

                                <tr>

                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "users.name"
                                        })}
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.image"
                                        })}
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.status"
                                        })}
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "users.role"
                                        })}
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.createdAt"
                                        })}
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.actions"
                                        })}
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {usersList.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50"
                                    >

                                        {/* NAME */}
                                        <td className="align-middle">

                                            <div className="font-semibold">
                                                {item.adminName}
                                            </div>

                                        </td>


                                        {/* IMAGE */}
                                        <td className="align-middle">

                                            <div className="avatar">

                                                <div className="w-12 rounded-lg">

                                                    <img
                                                        src={item.image}
                                                        alt="User"
                                                    />

                                                </div>

                                            </div>

                                        </td>


                                        {/* STATUS */}
                                        <td className="align-middle">

                                            <span
                                                className={
                                                    item.status ===
                                                    "active"
                                                        ? "badge badge-primary badge-outline"
                                                        : "badge badge-error badge-outline"
                                                }
                                            >
                                                {lang.formatMessage({
                                                    id: `table.${item.status}`
                                                })}
                                            </span>

                                        </td>


                                        {/* ROLE */}
                                        <td className="align-middle">

                                            <span className="text-primary font-medium">

                                                {item?.role?.roleName ||
                                                    "-"}

                                            </span>

                                        </td>


                                        {/* CREATED */}
                                        <td className="align-middle whitespace-nowrap">

                                            <span className="text-primary font-medium">

                                                {item.createdAtFormat ||
                                                    "-"}

                                            </span>

                                        </td>


                                        {/* ACTIONS */}
                                        <td className="align-middle">

                                            <div className="flex justify-center gap-2">

                                                <Link
                                                    to={`/admin/users/edit/${item.id}`}
                                                    className="btn btn-sm btn-primary btn-outline"
                                                >
                                                    {lang.formatMessage({
                                                        id: "table.edit"
                                                    })}
                                                </Link>


                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-error btn-outline"
                                                    onClick={() =>
                                                        handleOpenDelete(
                                                            item
                                                        )
                                                    }
                                                >
                                                    {lang.formatMessage({
                                                        id: "table.delete"
                                                    })}
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                    {/* =================================
                        PAGINATION DESKTOP
                    ================================= */}
                    <div className="flex items-center justify-center mt-3 mb-3 px-2">

                        {totalPage > 1 && (

                            <div className="join">

                                {/* PREVIOUS */}
                                <button
                                    type="button"
                                    className="join-item btn btn-sm sm:btn-md"
                                    disabled={
                                        currentPage === 1
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            (prev) =>
                                                Math.max(
                                                    prev - 1,
                                                    1
                                                )
                                        )
                                    }
                                >
                                    «
                                </button>


                                {/* PAGES */}
                                {Array.from(
                                    {
                                        length: totalPage
                                    },
                                    (_, index) => {

                                        const page =
                                            index + 1;

                                        return (
                                            <button
                                                key={page}
                                                type="button"
                                                className={`join-item btn btn-square btn-sm sm:btn-md ${
                                                    currentPage ===
                                                    page
                                                        ? "btn-primary"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setCurrentPage(
                                                        page
                                                    )
                                                }
                                            >
                                                {page}
                                            </button>
                                        );

                                    }
                                )}


                                {/* NEXT */}
                                <button
                                    type="button"
                                    className="join-item btn btn-sm sm:btn-md"
                                    disabled={
                                        currentPage ===
                                        totalPage
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            (prev) =>
                                                Math.min(
                                                    prev + 1,
                                                    totalPage
                                                )
                                        )
                                    }
                                >
                                    »
                                </button>

                            </div>

                        )}

                    </div>

                </div>


                {/* =====================================
                    MOBILE CARD
                ===================================== */}
                <div className="md:hidden flex flex-col items-center mb-[10px] px-2">

                    {usersList.map((item) => (

                        <div
                            key={item.id}
                            className="card bg-base-100 w-full shadow-sm mb-[10px] border border-slate-100"
                        >

                            {/* IMAGE */}
                            {item?.image && (

                                <figure>

                                    <img
                                        src={item.image}
                                        alt="User"
                                        className="w-full h-52 object-cover"
                                    />

                                </figure>

                            )}


                            <div className="card-body">

                                {/* NAME + STATUS */}
                                <div className="flex items-start justify-between gap-3">

                                    <div className="min-w-0">

                                        <div className="text-sm text-slate-500">
                                            {lang.formatMessage({
                                                id: "users.name"
                                            })}
                                        </div>

                                        <h2 className="font-bold text-lg text-primary break-words">
                                            {item.adminName}
                                        </h2>

                                    </div>


                                    <span
                                        className={
                                            item.status ===
                                            "active"
                                                ? "badge badge-primary badge-outline shrink-0"
                                                : "badge badge-error badge-outline shrink-0"
                                        }
                                    >
                                        {lang.formatMessage({
                                            id: `table.${item.status}`
                                        })}
                                    </span>

                                </div>


                                {/* USER INFO */}
                                <div className="grid grid-cols-2 gap-3 mt-4">

                                    {/* ROLE */}
                                    <div className="bg-slate-50 rounded-lg p-3">

                                        <div className="text-xs text-slate-500">
                                            {lang.formatMessage({
                                                id: "users.role"
                                            })}
                                        </div>

                                        <div className="font-bold text-primary mt-1 break-words">
                                            {item?.role?.roleName ||
                                                "-"}
                                        </div>

                                    </div>


                                    {/* CREATED */}
                                    <div className="bg-slate-50 rounded-lg p-3">

                                        <div className="text-xs text-slate-500">
                                            {lang.formatMessage({
                                                id: "table.createdAt"
                                            })}
                                        </div>

                                        <div className="font-bold text-primary mt-1 break-words">
                                            {item.createdAtFormat ||
                                                "-"}
                                        </div>

                                    </div>

                                </div>


                                {/* ACTIONS */}
                                <div className="card-actions justify-end mt-4">

                                    <Link
                                        to={`/admin/users/edit/${item.id}`}
                                        className="btn btn-sm btn-primary btn-outline"
                                    >
                                        {lang.formatMessage({
                                            id: "table.edit"
                                        })}
                                    </Link>


                                    <button
                                        type="button"
                                        className="btn btn-sm btn-error btn-outline"
                                        onClick={() =>
                                            handleOpenDelete(
                                                item
                                            )
                                        }
                                    >
                                        {lang.formatMessage({
                                            id: "table.delete"
                                        })}
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* =========================================
                DELETE MODAL
            ========================================= */}
            <dialog
                id="my_modal_delete"
                className="modal"
            >

                <div className="modal-box">

                    <h3 className="text-lg font-bold text-primary">
                        {lang.formatMessage({
                            id: "book.deleteBook"
                        })}
                    </h3>

                    <p className="py-4">
                        {lang.formatMessage({
                            id: "users.deleteDes"
                        })}
                    </p>

                    <div className="modal-action">

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleDeleteUser}
                        >
                            {lang.formatMessage({
                                id: "button.confirm"
                            })}
                        </button>


                        <form method="dialog">

                            <button className="btn">
                                {lang.formatMessage({
                                    id: "button.close"
                                })}
                            </button>

                        </form>

                    </div>

                </div>


                <form
                    method="dialog"
                    className="modal-backdrop"
                >
                    <button>close</button>
                </form>

            </dialog>

        </>
    );
};

export default Users;