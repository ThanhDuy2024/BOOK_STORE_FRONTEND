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
            <div className="flex justify-between items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
                <div className="flex items-center justify-center gap-[20px]">
                    <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                        <GoBook size={20} className="text-primary" />
                    </div>
                    <div className="">
                        <div className="text-primary font-[700]">{lang.formatMessage({ id: "global.management" })}</div>
                        <div className="text-[26px] text-black font-[700]">{lang.formatMessage({ id: "book.title" })}</div>
                        <div className="">{lang.formatMessage({ id: "book.sub" })}</div>
                    </div>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 gap-[10px]">
                        <li>
                            <button className="btn btn-primary text-white font-[500]" onClick={() => document.getElementById('my_modal_create').showModal()}>
                                <Link to={"/admin/books/create"}>
                                    {lang.formatMessage({ id: "book.createBook" })}
                                </Link>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-[20px] grid grid-cols-4 gap-4 p-4">
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-green-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div className="">{lang.formatMessage({ id: "book.total" })}</div>
                        <div className="bg-[#e7f6f3] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <LiaBookSolid size={20} color="green" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[35px]">{totalBook}</div>
                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-green-700">
                            +5
                        </div>
                        <div className="text-[#6b7280] font-bold">
                            books in this month
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-orange-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div className="">{lang.formatMessage({ id: "book.totalQuantity" })}</div>
                        <div className="bg-[#fff4df] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <PiBooksThin size={20} className="text-orange-400" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[35px]">{totalQuantity}</div>
                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-orange-700">
                            +200
                        </div>
                        <div className="text-[#6b7280] font-bold">
                            book in this month
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-indigo-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div className="">{lang.formatMessage({ id: "global.totalActive" })}</div>
                        <div className="bg-[#eaf2ff] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <VscLayersActive size={20} color="blue" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[35px]">{totalActive}</div>
                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-indigo-700">
                            90%
                        </div>
                        <div className="text-[#6b7280] font-bold">
                            categories active
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-red-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div className="">{lang.formatMessage({ id: "global.totalInactive" })}</div>
                        <div className="bg-[#ffecec] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <IoMdRemoveCircleOutline size={20} color="red" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[35px]">{totalInactive}</div>
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

            <div className="mt-[20px] mx-[10px] rounded-[10px] shadow-md bg-white">
                <div className="px-4 pt-4 flex items-center justify-between mb-[10px]">
                    <div className="">
                        <div className="flex items-center gap-[10px] text-[20px]">
                            <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                <FaRegChartBar size={20} className="text-primary" />
                            </div>
                            <div className="font-bold">{lang.formatMessage({ id: "book.list" })}</div>
                        </div>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1 gap-[10px]">
                            <li>
                                <label className="input outline-none">
                                    <div className="h-[1em] opacity-50 flex items-center">
                                        <IoSearchOutline size={20} />
                                    </div>
                                    <input
                                        type="search"
                                        placeholder={lang.formatMessage({ id: "input.search" })}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </label>
                            </li>
                            <li>
                                <select
                                    className="select outline-none"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="all">
                                        {lang.formatMessage({ id: "select.allStatus" })}
                                    </option>
                                    <option value="active">
                                        {lang.formatMessage({ id: "select.active" })}
                                    </option>
                                    <option value="inactive">
                                        {lang.formatMessage({ id: "select.inactive" })}
                                    </option>
                                </select>
                            </li>
                            <li>
                                <select
                                    value={updatedAtFilter}
                                    className="select outline-none"
                                    onChange={(e) => setUpdatedAtFilter(e.target.value)}
                                >
                                    <option value="desc">{lang.formatMessage({ id: "global.updatedDESC" })}</option>
                                    <option value="asc">{lang.formatMessage({ id: "global.updatedASC" })}</option>
                                </select>
                            </li>
                            <li>
                                <select
                                    value={priceFilter}
                                    className="select outline-none"
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                >
                                    <option value="null">{lang.formatMessage({ id: "global.priceFilter" })}</option>
                                    <option value="desc">{lang.formatMessage({ id: "global.priceDESC" })}</option>
                                    <option value="asc">{lang.formatMessage({ id: "global.priceASC" })}</option>
                                </select>
                            </li>
                            <li>
                                <select
                                    value={quantityFilter}
                                    className="select outline-none"
                                    onChange={(e) => setQuantityFilter(e.target.value)}
                                >
                                    <option value="null">{lang.formatMessage({ id: "global.quantityFilter" })}</option>
                                    <option value="desc">{lang.formatMessage({ id: "global.quantityDESC" })}</option>
                                    <option value="asc">{lang.formatMessage({ id: "global.quantityASC" })}</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table text-center">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="align-middle">{lang.formatMessage({ id: "book.bookName" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.image" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.status" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.quantity" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.price" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.updatedAt" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.updatedBy" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.createdBy" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.actions" })}</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bookList.map(item => (
                                    <tr className="hover:bg-slate-50">
                                        <td className="align-middle">
                                            <span className="text-slate-700 font-medium">
                                                {item.bookName}
                                            </span>
                                        </td>

                                        <td className="avatar">
                                            <div className="w-12 rounded-lg">
                                                <img
                                                    src={item.image}
                                                    alt="Books"
                                                />
                                            </div>
                                        </td>

                                        <td className="align-middle">
                                            <span className={item.status === "active" ? "badge badge-primary badge-outline" : "badge badge-error badge-outline"}>
                                                {lang.formatMessage({ id: `table.${item.status}` })}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <span className="text-primary font-medium">
                                                {item.quantity}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <span className="text-primary font-medium">
                                                {item.price.toLocaleString("vi-VN")} VND
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <span className="text-slate-700">
                                                {item.updatedAtFormat}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <span className="text-primary font-medium">
                                                {item.creator?.adminName}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <span className="text-primary font-medium">
                                                {item.updater?.adminName}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <div className="flex justify-center gap-2">
                                                <button className="btn btn-sm btn-primary btn-outline">
                                                    <Link to={`/admin/books/edit/${item.id}`}>
                                                        {lang.formatMessage({ id: "table.edit" })}
                                                    </Link>
                                                </button>

                                                <button className="btn btn-sm btn-error btn-outline" onClick={() => { setBookDelete(item.id); document.getElementById('my_modal_delete').showModal(); }}>
                                                    {lang.formatMessage({ id: "table.delete" })}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-center mt-[10px] mb-[10px]">
                        {totalPage > 1 && (
                            <>
                                <button className="join-item btn">«</button>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <input className="join-item btn btn-square" type="radio" name="options" aria-label={`${index + 1}`} onClick={() => setCurrentPage(index + 1)} />
                                ))}
                                <button className="join-item btn">»</button>
                            </>
                        )}
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

export default Books;