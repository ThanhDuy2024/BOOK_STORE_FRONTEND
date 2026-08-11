import { IoSearchOutline } from "react-icons/io5";
import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { VscLayersActive } from "react-icons/vsc";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa";
import { callApi } from "../../api/api";
import axios from "axios";
import { toast } from "sonner";

const Categories = () => {
    const lang = useIntl();

    // =========================
    // CATEGORY LIST
    // =========================
    const [categoryList, setCategoryList] = useState([]);
    const [total, setTotal] = useState({});
    const [categoryDetail, setCategoryDetail] = useState(null);

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [search, setSearch] = useState("null");
    const [status, setStatus] = useState("all");
    const [sort, setSort] = useState("desc");

    // =========================
    // CREATE
    // =========================
    const [preview, setPreview] = useState("");

    // =========================
    // EDIT
    // =========================
    const [editCategoryName, setEditCategoryName] = useState("");
    const [editStatus, setEditStatus] = useState("active");
    const [editImage, setEditImage] = useState(null);
    const [editPreview, setEditPreview] = useState("");

    // =========================
    // LOAD CATEGORY LIST
    // =========================
    const loadCategoriesList = async (
        page = currentPage,
        searchValue = search,
        statusValue = status,
        sortValue = sort
    ) => {
        try {
            const res = await callApi(
                "get",
                `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/categories?search=${searchValue}&status=${statusValue}&updatedAt=${sortValue}&page=${page}`,
                {}
            );

            setCategoryList(res.data || []);
            setTotalPages(res.totalPages || 1);

            setTotal({
                totalStatus: res.totalStatus || 0,
                totalStatusActive: res.totalStatusActive || 0,
                totalStatusInactive: res.totalStatusInactive || 0,
            });
        } catch (error) {
            console.error("Load categories error:", error);
            toast.error("Không thể tải danh sách category!");
        }
    };

    useEffect(() => {
        loadCategoriesList(
            currentPage,
            search,
            status,
            sort
        );
    }, [currentPage, search, status, sort]);

    // =========================
    // CREATE CATEGORY
    // =========================
    const handleSubmitCreate = async (e) => {
        e.preventDefault();

        const form = e.target;

        const categoryName = form.categoryName.value.trim();
        const categoryStatus = form.status.value;
        const image = form.image.files?.[0];

        if (!categoryName) {
            toast.error("Tên category không được để trống!");
            return;
        }

        const formData = new FormData();

        formData.append("categoryName", categoryName);
        formData.append("status", categoryStatus);

        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/categories`,
                formData,
                {
                    headers: {
                        token:
                            localStorage.getItem("token") ||
                            sessionStorage.getItem("token"),
                    },
                    withCredentials: true,
                }
            );

            if (res.data.status === true) {
                toast.success(
                    `${lang.formatMessage({
                        id: "category.title",
                    })} ${lang.formatMessage({
                        id: "toast.created",
                    })}!`
                );

                form.reset();

                setPreview("");

                document
                    .getElementById("create_category_modal")
                    .close();

                // Quay về page 1 sau khi tạo
                setCurrentPage(1);

                await loadCategoriesList(
                    1,
                    search,
                    status,
                    sort
                );
            } else {
                toast.error(
                    `${lang.formatMessage({
                        id: "category.title",
                    })} ${lang.formatMessage({
                        id: "toast.existed",
                    })}!`
                );
            }
        } catch (error) {
            console.error("Create category error:", error);

            toast.error(
                error?.response?.data?.message ||
                "Có lỗi xảy ra khi tạo category!"
            );
        }
    };

    // =========================
    // CREATE IMAGE PREVIEW
    // =========================
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            setPreview("");
            return;
        }

        setPreview(URL.createObjectURL(file));
    };

    // =========================
    // OPEN EDIT MODAL
    // =========================
    const handleOpenEdit = (category) => {
        setCategoryDetail(category);

        // Set dữ liệu hiện tại vào form edit
        setEditCategoryName(category?.categoryName || "");
        setEditStatus(category?.status || "active");

        // Chưa có ảnh mới
        setEditImage(null);

        // Hiển thị ảnh hiện tại
        setEditPreview(category?.image || "");

        document
            .getElementById("edit_category_modal")
            .showModal();
    };

    // =========================
    // CHANGE EDIT IMAGE
    // =========================
    const handleEditImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setEditImage(file);

        const previewUrl = URL.createObjectURL(file);

        setEditPreview(previewUrl);
    };

    // =========================
    // RESET EDIT FORM
    // =========================
    const resetEditForm = () => {
        setCategoryDetail(null);

        setEditCategoryName("");
        setEditStatus("active");
        setEditImage(null);
        setEditPreview("");
    };

    // =========================
    // CLOSE EDIT MODAL
    // =========================
    const handleCloseEdit = () => {
        const modal = document.getElementById(
            "edit_category_modal"
        );

        if (modal) {
            modal.close();
        }

        resetEditForm();
    };

    // =========================
    // EDIT CATEGORY
    // =========================
    const handleSubmitEdit = async (e) => {
        e.preventDefault();

        if (!categoryDetail?.id) {
            toast.error("Không tìm thấy category cần chỉnh sửa!");
            return;
        }

        if (!editCategoryName.trim()) {
            toast.error("Tên category không được để trống!");
            return;
        }

        const formData = new FormData();

        formData.append(
            "categoryName",
            editCategoryName.trim()
        );

        formData.append(
            "status",
            editStatus
        );

        // Chỉ gửi image nếu user chọn ảnh mới
        if (editImage) {
            formData.append("image", editImage);
        }

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/categories/${categoryDetail.id}`,
                formData,
                {
                    headers: {
                        token:
                            localStorage.getItem("token") ||
                            sessionStorage.getItem("token"),
                    },
                    withCredentials: true,
                }
            );

            if (res.data.status === true) {
                toast.success(
                    `${lang.formatMessage({
                        id: "category.title",
                    })} ${lang.formatMessage({
                        id: "toast.updated",
                    })}!`
                );

                // Reload list với filter hiện tại
                await loadCategoriesList(
                    currentPage,
                    search,
                    status,
                    sort
                );

                handleCloseEdit();
            } else {
                toast.error(
                    `${lang.formatMessage({
                        id: "category.title",
                    })} ${lang.formatMessage({
                        id: "toast.notFound",
                    })}!`
                );
            }
        } catch (error) {
            console.error("Update category error:", error);

            toast.error(
                error?.response?.data?.message ||
                "Có lỗi xảy ra khi cập nhật category!"
            );
        }
    };

    // =========================
    // RETURN
    // =========================
    return (
        <>
            {/* =========================================
                HEADER
            ========================================= */}
            <div className="sm:flex justify-between items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
                <div className="md:flex md:items-center md:justify-center sm:gap-[20px] gap-[5px]">
                    <div className="w-[48px] h-[48px] bg-[#eaf2ff] hidden sm:flex items-center justify-center rounded-[10px]">
                        <BiCategoryAlt
                            size={20}
                            className="text-primary"
                        />
                    </div>

                    <div>
                        <div className="text-primary font-[700]">
                            {lang.formatMessage({
                                id: "global.management",
                            })}
                        </div>

                        <div className="text-[26px] text-black font-[700]">
                            {lang.formatMessage({
                                id: "category.title",
                            })}
                        </div>

                        <div>
                            {lang.formatMessage({
                                id: "category.sub",
                            })}
                        </div>
                    </div>
                </div>

                <div className="sm:flex-none">
                    <ul className="sm:menu sm:menu-horizontal mt-[5px] sm:mt-[0px]">
                        <li>
                            <button
                                className="btn btn-primary text-white font-[500]"
                                onClick={() => {
                                    setPreview("");

                                    document
                                        .getElementById(
                                            "create_category_modal"
                                        )
                                        .showModal();
                                }}
                            >
                                {lang.formatMessage({
                                    id: "category.createCategory",
                                })}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* =========================================
                STATISTICS
            ========================================= */}
            <div className="md:mt-[20px] md:grid md:grid-cols-3 md:gap-4 p-4">

                {/* Total */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-green-500 mb-[10px] md:mb-[0px]">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div>
                            {lang.formatMessage({
                                id: "category.totalCategory",
                            })}
                        </div>

                        <div className="bg-[#e7f6f3] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <MdOutlineCategory
                                size={20}
                                color="green"
                            />
                        </div>
                    </div>

                    <div className="mt-[16px] font-bold text-[35px]">
                        {total.totalStatus}
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-green-700">
                            +5
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            {lang.formatMessage({
                                id: "category.totalCategortSub",
                            })}
                        </div>
                    </div>
                </div>

                {/* Active */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-indigo-500 mb-[10px] md:mb-[0px]">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div>
                            {lang.formatMessage({
                                id: "global.totalActive",
                            })}
                        </div>

                        <div className="bg-[#eaf2ff] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <VscLayersActive
                                size={20}
                                color="blue"
                            />
                        </div>
                    </div>

                    <div className="mt-[16px] font-bold text-[35px]">
                        {total.totalStatusActive}
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-indigo-700">
                            90%
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            {lang.formatMessage({
                                id: "category.totalActiveSub",
                            })}
                        </div>
                    </div>
                </div>

                {/* Inactive */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-red-500 mb-[10px] md:mb-[0px]">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div>
                            {lang.formatMessage({
                                id: "global.totalInactive",
                            })}
                        </div>

                        <div className="bg-[#ffecec] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <IoMdRemoveCircleOutline
                                size={20}
                                color="red"
                            />
                        </div>
                    </div>

                    <div className="mt-[16px] font-bold text-[35px]">
                        {total.totalStatusInactive}
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-red-700">
                            10%
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            {lang.formatMessage({
                                id: "category.totalInactiveSub",
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================
                CATEGORY LIST
            ========================================= */}
            <div className="mt-[20px] mx-[10px] rounded-[10px] shadow-md bg-white">

                {/* Search / Filter */}
                <div className="px-4 pt-4 md:flex md:items-center md:justify-between mb-[10px]">

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
                                    id: "category.list",
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1 gap-[10px]">

                            {/* Search */}
                            <li>
                                <label className="input outline-none">
                                    <div className="h-[1em] opacity-50 flex items-center">
                                        <IoSearchOutline size={20} />
                                    </div>

                                    <input
                                        type="search"
                                        placeholder={lang.formatMessage({
                                            id: "input.search",
                                        })}
                                        value={
                                            search === "null"
                                                ? ""
                                                : search
                                        }
                                        onChange={(e) => {
                                            setCurrentPage(1);

                                            setSearch(
                                                e.target.value || "null"
                                            );
                                        }}
                                    />
                                </label>
                            </li>

                            {/* Status */}
                            <li>
                                <select
                                    value={status}
                                    className="select outline-none"
                                    onChange={(e) => {
                                        setCurrentPage(1);
                                        setStatus(e.target.value);
                                    }}
                                >
                                    <option value="all">
                                        {lang.formatMessage({
                                            id: "select.allStatus",
                                        })}
                                    </option>

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
                            </li>

                            {/* Sort */}
                            <li>
                                <select
                                    value={sort}
                                    className="select outline-none"
                                    onChange={(e) => {
                                        setCurrentPage(1);
                                        setSort(e.target.value);
                                    }}
                                >
                                    <option value="asc">
                                        A-Z
                                    </option>

                                    <option value="desc">
                                        Z-A
                                    </option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* =========================================
                    DESKTOP TABLE
                ========================================= */}
                <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="table w-full text-center">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "category.categoryName",
                                        })}
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.status",
                                        })}
                                    </th>

                                    <th className="hidden lg:table-cell align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.updatedAt",
                                        })}
                                    </th>

                                    <th className="hidden lg:table-cell align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.updatedBy",
                                        })}
                                    </th>

                                    <th className="hidden lg:table-cell align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.createdBy",
                                        })}
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.actions",
                                        })}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {categoryList.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50"
                                    >
                                        {/* Category */}
                                        <td className="align-middle">
                                            <div className="flex items-center justify-center gap-2 sm:gap-3">

                                                <div className="avatar">
                                                    <div className="w-10 sm:w-12 rounded-lg">
                                                        <img
                                                            src={item.image}
                                                            alt="Category"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="text-left min-w-0">
                                                    <div className="font-semibold truncate max-w-[120px] sm:max-w-[200px]">
                                                        {item.categoryName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Status */}
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
                                                    id: `table.${item.status}`,
                                                })}
                                            </span>
                                        </td>

                                        {/* Updated At */}
                                        <td className="hidden lg:table-cell align-middle whitespace-nowrap">
                                            <span className="text-slate-700">
                                                {item.updatedAtFormat}
                                            </span>
                                        </td>

                                        {/* Updated By */}
                                        <td className="hidden lg:table-cell align-middle whitespace-nowrap">
                                            <span className="text-primary font-medium">
                                                {item.updater?.adminName}
                                            </span>
                                        </td>

                                        {/* Created By */}
                                        <td className="hidden lg:table-cell align-middle whitespace-nowrap">
                                            <span className="text-primary font-medium">
                                                {item.creator?.adminName}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="align-middle">
                                            <div className="flex justify-center gap-1 sm:gap-2">

                                                {/* Edit */}
                                                <button
                                                    type="button"
                                                    className="btn btn-xs sm:btn-sm btn-primary btn-outline"
                                                    onClick={() =>
                                                        handleOpenEdit(
                                                            item
                                                        )
                                                    }
                                                >
                                                    {lang.formatMessage({
                                                        id: "table.edit",
                                                    })}
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    className="btn btn-xs sm:btn-sm btn-error btn-outline"
                                                    onClick={() => {
                                                        setCategoryDetail(
                                                            item
                                                        );

                                                        document
                                                            .getElementById(
                                                                "my_modal_delete"
                                                            )
                                                            ?.showModal();
                                                    }}
                                                >
                                                    {lang.formatMessage({
                                                        id: "table.delete",
                                                    })}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center mt-3 mb-3 px-2">
                        {totalPages > 1 && (
                            <div className="join">

                                {/* Previous */}
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

                                {/* Pages */}
                                {Array.from(
                                    {
                                        length: totalPages,
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

                                {/* Next */}
                                <button
                                    type="button"
                                    className="join-item btn btn-sm sm:btn-md"
                                    disabled={
                                        currentPage ===
                                        totalPages
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            (prev) =>
                                                Math.min(
                                                    prev + 1,
                                                    totalPages
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

                {/* =========================================
                    MOBILE CARD
                ========================================= */}
                <div className="sm:hidden flex flex-col items-center justify-between mb-[10px] px-2">
                    {categoryList?.map((item) => (
                        <div
                            key={item.id}
                            className="card bg-base-100 w-full shadow-sm mb-[10px]"
                        >
                            {item?.image && (
                                <figure>
                                    <img
                                        src={item.image}
                                        alt="Category Image"
                                        className="w-full h-48 object-cover"
                                    />
                                </figure>
                            )}

                            <div className="card-body">

                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex gap-[5px] text-primary min-w-0">
                                        <div>
                                            {lang.formatMessage({
                                                id: "category.title",
                                            })}
                                            :
                                        </div>

                                        <div className="font-[400] truncate">
                                            {item?.categoryName}
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            item.status ===
                                            "active"
                                                ? "badge badge-primary badge-outline"
                                                : "badge badge-error badge-outline"
                                        }
                                    >
                                        {lang.formatMessage({
                                            id: `table.${item.status}`,
                                        })}
                                    </div>
                                </div>

                                <div className="flex justify-center mt-3">
                                    <div className="avatar">
                                        <div className="w-20 rounded-lg">
                                            <img
                                                src={item.image}
                                                alt="Category"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="card-actions justify-end mt-[10px]">

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-primary btn-outline"
                                        onClick={() =>
                                            handleOpenEdit(
                                                item
                                            )
                                        }
                                    >
                                        {lang.formatMessage({
                                            id: "table.edit",
                                        })}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-error btn-outline"
                                        onClick={() => {
                                            setCategoryDetail(
                                                item
                                            );

                                            document
                                                .getElementById(
                                                    "my_modal_delete"
                                                )
                                                ?.showModal();
                                        }}
                                    >
                                        {lang.formatMessage({
                                            id: "table.delete",
                                        })}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* =========================================
                CREATE MODAL
            ========================================= */}
            <dialog
                id="create_category_modal"
                className="modal"
            >
                <div className="modal-box w-11/12 max-w-2xl">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-2xl text-primary">
                            {lang.formatMessage({
                                id: "category.createCategory",
                            })}
                        </h3>

                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost"
                            onClick={() => {
                                setPreview("");

                                document
                                    .getElementById(
                                        "create_category_modal"
                                    )
                                    .close();
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    <form
                        onSubmit={handleSubmitCreate}
                        className="w-full"
                    >

                        {/* Name */}
                        <fieldset className="fieldset w-full mb-5">
                            <label
                                className="label text-primary text-base font-semibold"
                                htmlFor="categoryName"
                            >
                                {lang.formatMessage({
                                    id: "category.categoryName",
                                })}
                            </label>

                            <input
                                type="text"
                                name="categoryName"
                                id="categoryName"
                                className="input input-bordered w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "category.enterCatgory",
                                })}
                            />
                        </fieldset>

                        {/* Status */}
                        <fieldset className="fieldset w-full mb-5">
                            <label
                                className="label text-primary text-base font-semibold"
                                htmlFor="createStatus"
                            >
                                {lang.formatMessage({
                                    id: "table.status",
                                })}
                            </label>

                            <select
                                id="createStatus"
                                name="status"
                                defaultValue="active"
                                className="select select-bordered w-full outline-none"
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

                        {/* Image */}
                        <fieldset className="fieldset w-full mb-5">
                            <label
                                className="label text-primary text-base font-semibold"
                                htmlFor="createImage"
                            >
                                {lang.formatMessage({
                                    id: "input.image",
                                })}
                            </label>

                            <input
                                id="createImage"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="file-input file-input-bordered file-input-primary w-full"
                                onChange={
                                    handleImageChange
                                }
                            />

                            {preview && (
                                <div className="mt-4 flex justify-center">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-40 h-40 object-cover rounded-xl border border-slate-200"
                                    />
                                </div>
                            )}
                        </fieldset>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">

                            <button
                                type="button"
                                className="btn btn-outline flex-1"
                                onClick={() => {
                                    setPreview("");

                                    document
                                        .getElementById(
                                            "create_category_modal"
                                        )
                                        .close();
                                }}
                            >
                                Hủy
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary flex-1"
                            >
                                {lang.formatMessage({
                                    id: "button.create",
                                })}
                            </button>
                        </div>
                    </form>
                </div>

                <form
                    method="dialog"
                    className="modal-backdrop"
                >
                    <button>close</button>
                </form>
            </dialog>

            {/* =========================================
                EDIT MODAL
            ========================================= */}
            <dialog
                id="edit_category_modal"
                className="modal"
            >
                <div className="modal-box w-11/12 max-w-2xl">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-2xl text-primary">
                            {lang.formatMessage({
                                id: "category.editCategory",
                            })}
                        </h3>

                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost"
                            onClick={handleCloseEdit}
                        >
                            ✕
                        </button>
                    </div>

                    <form
                        onSubmit={handleSubmitEdit}
                        className="w-full"
                    >

                        {/* Category Name */}
                        <fieldset className="fieldset w-full mb-5">
                            <label
                                className="label text-primary text-base font-semibold"
                                htmlFor="editCategoryName"
                            >
                                {lang.formatMessage({
                                    id: "category.categoryName",
                                })}
                            </label>

                            <input
                                type="text"
                                id="editCategoryName"
                                name="categoryName"
                                value={editCategoryName}
                                onChange={(e) =>
                                    setEditCategoryName(
                                        e.target.value
                                    )
                                }
                                className="input input-bordered w-full outline-none"
                                placeholder={lang.formatMessage({
                                    id: "category.enterCatgory",
                                })}
                            />
                        </fieldset>

                        {/* Status */}
                        <fieldset className="fieldset w-full mb-5">
                            <label
                                className="label text-primary text-base font-semibold"
                                htmlFor="editStatus"
                            >
                                {lang.formatMessage({
                                    id: "table.status",
                                })}
                            </label>

                            <select
                                id="editStatus"
                                name="status"
                                value={editStatus}
                                onChange={(e) =>
                                    setEditStatus(
                                        e.target.value
                                    )
                                }
                                className="select select-bordered w-full outline-none"
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

                        {/* Image */}
                        <fieldset className="fieldset w-full mb-5">
                            <label
                                className="label text-primary text-base font-semibold"
                                htmlFor="editImage"
                            >
                                {lang.formatMessage({
                                    id: "input.image",
                                })}
                            </label>

                            <input
                                type="file"
                                id="editImage"
                                name="image"
                                accept="image/*"
                                className="file-input file-input-bordered file-input-primary w-full"
                                onChange={
                                    handleEditImageChange
                                }
                            />

                            {/* Current / New Image */}
                            {editPreview && (
                                <div className="mt-4 flex justify-center">
                                    <div className="border border-slate-200 rounded-xl p-2 bg-slate-50">
                                        <img
                                            src={editPreview}
                                            alt="Category preview"
                                            className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Image status */}
                            <div className="text-sm text-slate-500 mt-2 text-center">
                                {editImage
                                    ? "Ảnh mới đã được chọn"
                                    : "Ảnh hiện tại sẽ được giữ nguyên nếu không chọn ảnh mới"}
                            </div>
                        </fieldset>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary flex-1"
                            >
                                {lang.formatMessage({
                                    id: "button.edit",
                                })}
                            </button>
                        </div>
                    </form>
                </div>

                <form
                    method="dialog"
                    className="modal-backdrop"
                >
                    <button
                        onClick={resetEditForm}
                    >
                        close
                    </button>
                </form>
            </dialog>
        </>
    );
};

export default Categories;