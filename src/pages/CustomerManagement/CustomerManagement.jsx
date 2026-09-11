import { IoSearchOutline } from "react-icons/io5";
import { useIntl } from "react-intl";
import { bookMockData, categoryMockData } from "../../data/mockData";
import { useEffect, useState } from "react";
import { LiaBookSolid } from "react-icons/lia";
import { PiBooksThin } from "react-icons/pi";
import { VscLayersActive } from "react-icons/vsc";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { FaRegChartBar } from "react-icons/fa";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { Link } from "react-router";
import { callApi } from "../../api/api";
import { toast } from "sonner"
const CustomerManagement = () => {
    const lang = useIntl();
    const [customerList, setCustomerList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("null");
    const [searchEmail, setSearchEmail] = useState("null");
    const [status, setStatus] = useState("null");
    
    const [bookDelete, setBookDelete] = useState();
    const [updatedAtFilter, setUpdatedAtFilter] = useState("desc");
    const [priceFilter, setPriceFilter] = useState("null");
    const [quantityFilter, setQuantityFilter] = useState("null");

    const loadCustomerApi = async () => {
        try {
            const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/customers?search=${search}&email_search=${searchEmail}&status=${status}&page=${currentPage}&limit=10`);
            if (res.status === true) {
                setCustomerList(res.data);
                setTotalPage(res.totalPage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadCustomerApi();
    }, [status, currentPage, search, searchEmail]);

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
                        <RiAccountPinCircleLine
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
                            Khách hàng
                        </div>

                        <div>
                            Theo dõi tình trạng khách hàng
                        </div>
                    </div>
                </div>
            </div>


            {/* =========================================
            STATISTICS
        ========================================= */}
            <div className="md:grid md:grid-cols-3 md:gap-4 p-4">

                {/* Total Books */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-green-500 mb-[10px] md:mb-0">

                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">

                        <div>
                            Tổng số tài khoản khách hàng
                        </div>

                        <div className="bg-[#e7f6f3] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <LiaBookSolid
                                size={20}
                                color="green"
                            />
                        </div>

                    </div>

                    <div className="mt-[16px] font-bold text-[35px]">
                        1
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">

                        <div className="text-green-700">
                            +1
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            tài khoản khách hàng trong tháng
                        </div>

                    </div>
                </div>


                {/* Active */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-indigo-500 mb-[10px] md:mb-0">

                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">

                        <div>
                            Tổng số khách hàng đang hoạt động
                        </div>

                        <div className="bg-[#eaf2ff] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <VscLayersActive
                                size={20}
                                color="blue"
                            />
                        </div>

                    </div>

                    <div className="mt-[16px] font-bold text-[35px]">
                        1
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">

                        <div className="text-indigo-700">
                            100%
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            khách hàng đang hoạt động
                        </div>

                    </div>
                </div>


                {/* Inactive */}
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-red-500 mb-[10px] md:mb-0">

                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">

                        <div>
                            Tổng số khách hàng dừng hoạt động
                        </div>

                        <div className="bg-[#ffecec] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <IoMdRemoveCircleOutline
                                size={20}
                                color="red"
                            />
                        </div>

                    </div>

                    <div className="mt-[16px] font-bold text-[35px]">
                        1
                    </div>

                    <div className="flex gap-[5px] text-[15px] mt-[14px]">

                        <div className="text-red-700">
                            0%
                        </div>

                        <div className="text-[#6b7280] font-bold">
                            khách hàng ngưng hoạt động
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
                                    Danh sách khách hàng
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

                                {/* Search email*/}
                                <label className="input outline-none w-full sm:w-auto">

                                    <div className="h-[1em] opacity-50 flex items-center">
                                        <IoSearchOutline size={20} />
                                    </div>

                                    <input
                                        type="search email"
                                        placeholder={"Tìm kiếm email"}
                                        value={
                                            searchEmail === "null"
                                                ? ""
                                                : searchEmail
                                        }
                                        onChange={(e) => {
                                            setCurrentPage(1);
                                            setSearchEmail(
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

                                    <option value="null">
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
                                        ID
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        Tên khách hàng
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        Ảnh đại diện
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        Email
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.status"
                                        })}
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        Được tạo vào ngày
                                    </th>

                                    <th className="align-middle whitespace-nowrap">
                                        {lang.formatMessage({
                                            id: "table.actions"
                                        })}
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {customerList.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50"
                                    >
                                        <td className="align-middle">
                                            <span className="text-slate-700">
                                                {item.id}
                                            </span>
                                        </td>

                                        {/* Name */}
                                        <td className="align-middle">
                                            <span className="text-slate-700">
                                                {item.fullName}
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

                                        <td className="align-middle">
                                            <span className="text-slate-700">
                                                {item.email}
                                            </span>
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

                                        <td className="align-middle">
                                            <span className="text-slate-700">
                                                {item.createdAtFormat}
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

                    {customerList.map((item) => (

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
                                            Tên khách hàng
                                        </div>

                                        <h2 className="font-bold text-lg text-primary break-words">
                                            {item.fullName}
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

export default CustomerManagement;