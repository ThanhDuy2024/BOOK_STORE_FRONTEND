import { IoSearchOutline } from "react-icons/io5";
import { useIntl } from "react-intl";
import { bookMockData, categoryMockData } from "../../data/mockData";
import { useEffect, useState } from "react";
import { LiaBookSolid } from "react-icons/lia";
import { PiBooksThin } from "react-icons/pi";
import { VscLayersActive } from "react-icons/vsc";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { FaRegChartBar } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { Link } from "react-router";
import { callApi } from "../../api/api";
import { toast } from "sonner"
const Books = () => {
    const lang = useIntl();
    const [bookList, setBookList] = useState([]);
    const [bookDelete, setBookDelete] = useState();
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("null");
    const [status, setStatus] = useState("all");
    const [updatedAtFilter, setUpdatedAtFilter] = useState("desc");
    const [priceFilter, setPriceFilter] = useState("null");
    const [quantityFilter, setQuantityFilter] = useState("null");
    const [totalBook, setTotalBook] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalActive, setTotalActive] = useState(0);
    const [totalInactive, setTotalInactive] = useState(0);
    const loadBookApi = async (currentPage, search, status, updatedAtFilter, priceFilter, quantityFilter) => {
        try {
            const res = await callApi(
                "get",
                `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/books?search=${search}&status=${status}&sortUpdatedAt=${updatedAtFilter}&priceFilter=${priceFilter}&quantityFilter=${quantityFilter}&page=${currentPage}`,
                {});

            if (res.status === true) {
                setBookList(res.data);
                setTotalPage(res.totalPage);
                setTotalBook(res.totalBook);
                setTotalActive(res.totalActive);
                setTotalInactive(res.totalInactive);
                setTotalQuantity(res.totalQuantity);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadBookApi(currentPage, search, status, updatedAtFilter, priceFilter, quantityFilter);
    }, [currentPage, search, status, updatedAtFilter, priceFilter, quantityFilter]);


    const handleDeleteBook = async () => {
        try {
            const res = await callApi("put", `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/books/delete/${bookDelete}`, {});
            if (res.status === true) {
                loadBookApi(currentPage, search, status, updatedAtFilter, priceFilter, quantityFilter);
                document.getElementById('my_modal_delete').close();
                toast.success(`${lang.formatMessage({ id: "book.subtitle" })} ${lang.formatMessage({ id: "toast.deleted" })}`)
            } else {
                toast.error(`${lang.formatMessage({ id: "book.subtitle" })} ${lang.formatMessage({ id: "toast.notFound" })}`)
            }
        } catch (error) {
            console.log(error);
            toast.error(`${lang.formatMessage({ id: "book.subtitle" })} ${lang.formatMessage({ id: "toast.notFound" })}`)
        }
    }

    return (
        <>
            {/* =========================================
            HEADER
        ========================================= */}
            <div className="sm:flex justify-between items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">

                <div className="md:flex md:items-center md:justify-center sm:gap-[20px] gap-[5px]">
                    <div className="w-[48px] h-[48px] bg-[#eaf2ff] hidden sm:flex items-center justify-center rounded-[10px]">
                        <GoBook
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
                                id: "book.title"
                            })}
                        </div>

                        <div>
                            {lang.formatMessage({
                                id: "book.sub"
                            })}
                        </div>
                    </div>
                </div>

                <div className="sm:flex-none mt-3 sm:mt-0">
                    <ul className="sm:menu sm:menu-horizontal">
                        <li>
                            <Link
                                to="/admin/books/create"
                                className="btn btn-primary text-white font-[500] w-full sm:w-auto"
                            >
                                {lang.formatMessage({
                                    id: "book.createBook"
                                })}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>


            {/* =========================================
            STATISTICS
        ========================================= */}
            <div className="md:grid md:grid-cols-4 md:gap-4 p-4">

                {/* Total Books */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-green-500 mb-[10px] md:mb-0">

                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">

                        <div>
                            {lang.formatMessage({
                                id: "book.total"
                            })}
                        </div>

                        <div className="bg-[#e7f6f3] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <LiaBookSolid
                                size={20}
                                color="green"
                            />
                        </div>

                    </div>

                    <div className="mt-[16px] font-bold text-[35px]">
                        {totalBook}
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">

                        <div className="text-green-700">
                            +5
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            books in this month
                        </div>

                    </div>
                </div>


                {/* Total Quantity */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-orange-500 mb-[10px] md:mb-0">

                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">

                        <div>
                            {lang.formatMessage({
                                id: "book.totalQuantity"
                            })}
                        </div>

                        <div className="bg-[#fff4df] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <PiBooksThin
                                size={20}
                                className="text-orange-400"
                            />
                        </div>

                    </div>

                    <div className="mt-[16px] font-bold text-[35px]">
                        {totalQuantity}
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">

                        <div className="text-orange-700">
                            +200
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            book in this month
                        </div>

                    </div>
                </div>


                {/* Active */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-indigo-500 mb-[10px] md:mb-0">

                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">

                        <div>
                            {lang.formatMessage({
                                id: "global.totalActive"
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
                        {totalActive}
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">

                        <div className="text-indigo-700">
                            90%
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            categories active
                        </div>

                    </div>
                </div>


                {/* Inactive */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-red-500 mb-[10px] md:mb-0">

                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">

                        <div>
                            {lang.formatMessage({
                                id: "global.totalInactive"
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
                        {totalInactive}
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">

                        <div className="text-red-700">
                            10%
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            categories inactive
                        </div>

                    </div>
                </div>

            </div>


            {/* =========================================
            BOOK LIST
        ========================================= */}
            <div className="mt-[20px] mx-[10px] rounded-[10px] shadow-md bg-white">

                {/* =====================================
                SEARCH / FILTER
            ===================================== */}
                <div className="px-4 pt-4 mb-[10px]">

                    <div className="md:flex md:items-center md:justify-between">

                        {/* Title */}
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
                                        id: "book.list"
                                    })}
                                </div>

                            </div>
                        </div>


                        {/* Filters */}
                        <div className="mt-3 md:mt-0">

                            <div className="flex flex-col sm:flex-row flex-wrap gap-[10px]">

                                {/* Search */}
                                <label className="input outline-none w-full sm:w-auto">

                                    <div className="h-[1em] opacity-50 flex items-center">
                                        <IoSearchOutline size={20} />
                                    </div>

                                    <input
                                        type="search"
                                        placeholder={lang.formatMessage({
                                            id: "input.search"
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


                                {/* Status */}
                                <select
                                    value={status}
                                    className="select outline-none w-full sm:w-auto"
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


                                {/* Updated */}
                                <select
                                    value={updatedAtFilter}
                                    className="select outline-none w-full sm:w-auto"
                                    onChange={(e) => {
                                        setCurrentPage(1);
                                        setUpdatedAtFilter(
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


                                {/* Price */}
                                <select
                                    value={priceFilter}
                                    className="select outline-none w-full sm:w-auto"
                                    onChange={(e) => {
                                        setCurrentPage(1);
                                        setPriceFilter(
                                            e.target.value
                                        );
                                    }}
                                >

                                    <option value="null">
                                        {lang.formatMessage({
                                            id: "global.priceFilter"
                                        })}
                                    </option>

                                    <option value="desc">
                                        {lang.formatMessage({
                                            id: "global.priceDESC"
                                        })}
                                    </option>

                                    <option value="asc">
                                        {lang.formatMessage({
                                            id: "global.priceASC"
                                        })}
                                    </option>

                                </select>


                                {/* Quantity */}
                                <select
                                    value={quantityFilter}
                                    className="select outline-none w-full sm:w-auto"
                                    onChange={(e) => {
                                        setCurrentPage(1);
                                        setQuantityFilter(
                                            e.target.value
                                        );
                                    }}
                                >

                                    <option value="null">
                                        {lang.formatMessage({
                                            id: "global.quantityFilter"
                                        })}
                                    </option>

                                    <option value="desc">
                                        {lang.formatMessage({
                                            id: "global.quantityDESC"
                                        })}
                                    </option>

                                    <option value="asc">
                                        {lang.formatMessage({
                                            id: "global.quantityASC"
                                        })}
                                    </option>

                                </select>

                            </div>

                        </div>
                    </div>
                </div>


                {/* =====================================
                DESKTOP TABLE
            ===================================== */}
                <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

                    <div className="w-full overflow-x-auto">

                        <table className="table w-full text-center">

                            <thead className="bg-slate-50">

                                <tr>

                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "book.bookName"
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
                                            id: "table.quantity"
                                        })}
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.price"
                                        })}
                                    </th>

                                    <th className="hidden lg:table-cell align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.updatedAt"
                                        })}
                                    </th>

                                    <th className="hidden lg:table-cell align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.updatedBy"
                                        })}
                                    </th>

                                    <th className="hidden lg:table-cell align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.createdBy"
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

                                {bookList.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50"
                                    >

                                        {/* Name */}
                                        <td className="align-middle">
                                            <span className="text-slate-700 font-medium">
                                                {item.bookName}
                                            </span>
                                        </td>


                                        {/* Image */}
                                        <td className="align-middle">

                                            <div className="avatar">

                                                <div className="w-12 rounded-lg">

                                                    <img
                                                        src={item.image}
                                                        alt="Book"
                                                    />

                                                </div>

                                            </div>

                                        </td>


                                        {/* Status */}
                                        <td className="align-middle">

                                            <span
                                                className={
                                                    item.status === "active"
                                                        ? "badge badge-primary badge-outline"
                                                        : "badge badge-error badge-outline"
                                                }
                                            >
                                                {lang.formatMessage({
                                                    id: `table.${item.status}`
                                                })}
                                            </span>

                                        </td>


                                        {/* Quantity */}
                                        <td className="align-middle">

                                            <span className="text-primary font-medium">
                                                {item.quantity}
                                            </span>

                                        </td>


                                        {/* Price */}
                                        <td className="align-middle whitespace-nowrap">

                                            <span className="text-primary font-medium">
                                                {item.price.toLocaleString(
                                                    "vi-VN"
                                                )}{" "}
                                                VND
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

                                            <div className="flex justify-center gap-2">

                                                <Link
                                                    to={`/admin/books/edit/${item.id}`}
                                                    className="btn btn-sm btn-primary btn-outline"
                                                >
                                                    {lang.formatMessage({
                                                        id: "table.edit"
                                                    })}
                                                </Link>

                                                <button
                                                    className="btn btn-sm btn-error btn-outline"
                                                    onClick={() => {
                                                        setBookDelete(
                                                            item.id
                                                        );

                                                        document
                                                            .getElementById(
                                                                "my_modal_delete"
                                                            )
                                                            .showModal();
                                                    }}
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


                    {/* Pagination */}
                    <div className="flex items-center justify-center mt-3 mb-3 px-2">

                        {totalPage > 1 && (

                            <div className="join">

                                <button
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
                                                className={`join-item btn btn-square btn-sm sm:btn-md ${currentPage ===
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


                                <button
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
                <div className="sm:hidden flex flex-col items-center mb-[10px] px-2">

                    {bookList.map((item) => (

                        <div
                            key={item.id}
                            className="card bg-base-100 w-full shadow-sm mb-[10px] border border-slate-100"
                        >

                            {/* Image */}
                            {item?.image && (

                                <figure>

                                    <img
                                        src={item.image}
                                        alt="Book"
                                        className="w-full h-52 object-cover"
                                    />

                                </figure>

                            )}


                            <div className="card-body">

                                {/* Title + Status */}
                                <div className="flex items-start justify-between gap-3">

                                    <div className="min-w-0">

                                        <div className="text-sm text-slate-500">
                                            {lang.formatMessage({
                                                id: "book.bookName"
                                            })}
                                        </div>

                                        <h2 className="font-bold text-lg text-primary break-words">
                                            {item.bookName}
                                        </h2>

                                    </div>


                                    <span
                                        className={
                                            item.status === "active"
                                                ? "badge badge-primary badge-outline shrink-0"
                                                : "badge badge-error badge-outline shrink-0"
                                        }
                                    >
                                        {lang.formatMessage({
                                            id: `table.${item.status}`
                                        })}
                                    </span>

                                </div>


                                {/* Information */}
                                <div className="grid grid-cols-2 gap-3 mt-4">

                                    {/* Quantity */}
                                    <div className="bg-slate-50 rounded-lg p-3">

                                        <div className="text-xs text-slate-500">
                                            {lang.formatMessage({
                                                id: "table.quantity"
                                            })}
                                        </div>

                                        <div className="font-bold text-primary mt-1">
                                            {item.quantity}
                                        </div>

                                    </div>


                                    {/* Price */}
                                    <div className="bg-slate-50 rounded-lg p-3">

                                        <div className="text-xs text-slate-500">
                                            {lang.formatMessage({
                                                id: "table.price"
                                            })}
                                        </div>

                                        <div className="font-bold text-primary mt-1">
                                            {item.price.toLocaleString(
                                                "vi-VN"
                                            )}{" "}
                                            VND
                                        </div>

                                    </div>

                                </div>


                                {/* Updated */}
                                <div className="mt-4 space-y-2 text-sm">

                                    <div className="flex justify-between gap-3">

                                        <span className="text-slate-500">
                                            {lang.formatMessage({
                                                id: "table.updatedAt"
                                            })}
                                        </span>

                                        <span className="text-slate-700 font-medium text-right">
                                            {item.updatedAtFormat}
                                        </span>

                                    </div>


                                    <div className="flex justify-between gap-3">

                                        <span className="text-slate-500">
                                            {lang.formatMessage({
                                                id: "table.updatedBy"
                                            })}
                                        </span>

                                        <span className="text-primary font-medium text-right">
                                            {item.updater?.adminName ||
                                                "-"}
                                        </span>

                                    </div>


                                    <div className="flex justify-between gap-3">

                                        <span className="text-slate-500">
                                            {lang.formatMessage({
                                                id: "table.createdBy"
                                            })}
                                        </span>

                                        <span className="text-primary font-medium text-right">
                                            {item.creator?.adminName ||
                                                "-"}
                                        </span>

                                    </div>

                                </div>


                                {/* Actions */}
                                <div className="card-actions justify-end mt-4">

                                    <Link
                                        to={`/admin/books/edit/${item.id}`}
                                        className="btn btn-sm btn-primary btn-outline"
                                    >
                                        {lang.formatMessage({
                                            id: "table.edit"
                                        })}
                                    </Link>


                                    <button
                                        className="btn btn-sm btn-error btn-outline"
                                        onClick={() => {

                                            setBookDelete(
                                                item.id
                                            );

                                            document
                                                .getElementById(
                                                    "my_modal_delete"
                                                )
                                                .showModal();

                                        }}
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
                            id: "book.deleteDes"
                        })}
                    </p>

                    <div className="modal-action">

                        <button
                            className="btn btn-primary"
                            onClick={handleDeleteBook}
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
}

export default Books;