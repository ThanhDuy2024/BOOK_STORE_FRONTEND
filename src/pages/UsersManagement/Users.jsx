import { IoSearchOutline, IoSpeedometerOutline } from "react-icons/io5";
import { useIntl } from "react-intl";
import { userMockData } from "../../data/mockData";
import { useEffect, useState } from "react";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiBooksThin } from "react-icons/pi";
import { PiFlagBannerFoldDuotone } from "react-icons/pi";
import { VscLayersActive } from "react-icons/vsc";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { LiaUserSolid } from "react-icons/lia";
import { FaRegChartBar } from "react-icons/fa";
import { Link } from "react-router";
import { callApi } from "../../api/api";
import { toast } from "sonner"
const Users = () => {
    const lang = useIntl();
    const [usersList, setUsersList] = useState(userMockData);
    const [userDetail, setUserDetail] = useState();
    const [totalPage, setTotalPage] = useState(1);
    const [search, setSearch] = useState("null");
    const [status, setStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [createdAtFilter, setCreatedFilter] = useState("desc");
    const [deleteUser, setDeleteUser] = useState();
    const loadApiUser = async (search, status, currentPage, createdAtFilter) => {
        try {
            const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/account?search=${search}&status=${status}&createdAtFilter=${createdAtFilter}&page=${currentPage}`, {});
            setUsersList(res.data);
            setTotalPage(res.totalPage)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadApiUser(search, status, currentPage, createdAtFilter);
    }, [search, status, currentPage, createdAtFilter]);

    const handleDeleteBook = async () => {
        try {
            const res = await callApi("put", `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/account/delete/${deleteUser}`, {});
            if (res.status === true) {
                loadApiUser(search, status, currentPage, createdAtFilter);
                document.getElementById('my_modal_delete').close();
                toast.success(`${lang.formatMessage({ id: "users.subtitle" })} ${lang.formatMessage({ id: "toast.deleted" })}`)
            } else {
                toast.error(`${lang.formatMessage({ id: "users.subtitle" })} ${lang.formatMessage({ id: "toast.notFound" })}`)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="flex justify-between items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
                <div className="flex items-center justify-center gap-[20px]">
                    <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                        <LiaUserSolid size={20} className="text-primary" />
                    </div>
                    <div className="">
                        <div className="text-primary font-[700]">{lang.formatMessage({ id: "global.management" })}</div>
                        <div className="text-[26px] text-black font-[700]">{lang.formatMessage({ id: "users.subtitle" })}</div>
                        <div className="">
                            {lang.formatMessage({ id: "users.sub" })}
                        </div>
                    </div>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 gap-[10px]">
                        <li>
                            <button className="btn btn-primary text-white font-[500]">
                                <Link to={"/admin/users/create"}>
                                    {lang.formatMessage({ id: "users.createUser" })}
                                </Link>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-[20px] grid grid-cols-4 gap-4 p-4">
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-green-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div className="">TOTAL USERS</div>
                        <div className="bg-[#e7f6f3] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <LiaUsersCogSolid size={20} color="green" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[35px]">100</div>
                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-green-700">
                            +50
                        </div>
                        <div className="text-[#6b7280] font-bold">
                            users in this month
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-indigo-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div className="">TOTAL ACTIVE</div>
                        <div className="bg-[#eaf2ff] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <VscLayersActive size={20} color="blue" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[35px]">190</div>
                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-indigo-700">
                            90%
                        </div>
                        <div className="text-[#6b7280] font-bold">
                            healthy account
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-red-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div className="">TOTAL INACTIVE</div>
                        <div className="bg-[#ffecec] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <IoMdRemoveCircleOutline size={20} color="red" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[35px]">5</div>
                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-red-700">
                            5%
                        </div>
                        <div className="text-[#6b7280] font-bold">
                            account inactive
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-orange-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div className="">TOTAL BANED</div>
                        <div className="bg-[#fff4df] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <PiFlagBannerFoldDuotone size={20} className="text-orange-400" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[35px]">5</div>
                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-orange-700">
                            5%
                        </div>
                        <div className="text-[#6b7280] font-bold">
                            account baned
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
                            <div className="font-bold">{lang.formatMessage({ id: "users.title" })}</div>
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
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder={lang.formatMessage({ id: "input.search" })}
                                    />
                                </label>
                            </li>
                            <li>
                                <select
                                    className="select outline-none"
                                    defaultValue={status}
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
                                    className="select outline-none"
                                    defaultValue={createdAtFilter}
                                    onChange={(e) => setCreatedFilter(e.target.value)}
                                >
                                    <option value="desc">{lang.formatMessage({ id: "global.updatedDESC" })}</option>
                                    <option value="asc">{lang.formatMessage({ id: "global.updatedASC" })}</option>
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
                                    <th className="align-middle">{lang.formatMessage({ id: "users.name" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.image" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.status" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "users.role" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.createdAt" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.actions" })}</th>
                                </tr>
                            </thead>

                            <tbody>
                                {usersList.map(item => (
                                    <tr className="hover:bg-slate-50">
                                        <td className="align-middle">
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="text-left">
                                                    <div className="font-semibold">
                                                        {item.adminName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="align-middle">
                                            <div className="avatar">
                                                <div className="w-12 rounded-lg">
                                                    <img
                                                        src={item.image}
                                                        alt="User image"
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="align-middle">
                                            <span className={item.status === "active" ? "badge badge-primary badge-outline" : "badge badge-error badge-outline"}>
                                                {lang.formatMessage({ id: `table.${item.status}` })}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <span className="text-primary font-medium">
                                                {item?.role?.roleName}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <span className="text-primary font-medium">
                                                {item.createdAtFormat}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <div className="flex justify-center gap-2">
                                                <button className="btn btn-sm btn-primary btn-outline">
                                                    <Link to={`/admin/users/edit/${item.id}`}>
                                                        {lang.formatMessage({ id: "table.edit" })}
                                                    </Link>
                                                </button>

                                                <button className="btn btn-sm btn-error btn-outline" onClick={() => { setDeleteUser(item.id); document.getElementById('my_modal_delete').showModal(); }}>
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
                    <p class="py-4">{lang.formatMessage({ id: "users.deleteDes" })}</p>
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

export default Users;