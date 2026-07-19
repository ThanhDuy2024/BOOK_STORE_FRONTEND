import { IoSearchOutline } from "react-icons/io5";
import { useIntl } from "react-intl";
import { userMockData } from "../../data/mockData";
import { useState } from "react";
const Users = () => {
    const lang = useIntl();
    const [usersList, setUsersList] = useState(userMockData);
    const [userDetail, setUserDetail] = useState();
    const handleSubmitCreate = (e) => {
        e.preventDefault();
        console.log("submit is here")
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        console.log("submit is here")
    }
    return (
        <>
            <div className="flex items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
                <div className="flex-1">
                    <div className="text-xl text-primary font-[600]">{lang.formatMessage({ id: "users.title" })}</div>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 gap-[10px]">
                        <li>
                            <label className="input outline-none">
                                <div className="h-[1em] opacity-50 flex items-center">
                                    <IoSearchOutline size={20} />
                                </div>
                                <input type="search" placeholder={lang.formatMessage({ id: "input.search" })} />
                            </label>
                        </li>
                        <li>
                            <select defaultValue="change" className="select outline-none">
                                <option disabled={true} value={"change"}>{lang.formatMessage({ id: "select.changeStatus" })}</option>
                                <option>{lang.formatMessage({ id: "select.active" })}</option>
                                <option>{lang.formatMessage({ id: "select.inactive" })}</option>
                            </select>
                        </li>
                        <li>
                            <select defaultValue="sort" className="select outline-none">
                                <option disabled={true} value={"sort"}>{lang.formatMessage({ id: "select.sort" })}</option>
                                <option>A-Z</option>
                                <option>Z-A</option>
                            </select>
                        </li>
                        <li>
                            <button className="btn btn-primary text-white font-[500]" onClick={() => document.getElementById('my_modal_create').showModal()}>{lang.formatMessage({ id: "category.createCategory" })}</button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-[20px] mx-[10px] rounded-[10px] shadow-md bg-white">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table text-center">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="align-middle">{lang.formatMessage({ id: "users.name" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.status" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.createdAt" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.actions" })}</th>
                                </tr>
                            </thead>

                            <tbody>
                                {usersList.map(item => (
                                    <tr className="hover:bg-slate-50">
                                        <td className="align-middle">
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-12 rounded-lg">
                                                        <img
                                                            src={item.image}
                                                            alt="Category"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="text-left">
                                                    <div className="font-semibold">
                                                        {item.userName}
                                                    </div>
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
                                                {item.createdAt}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <div className="flex justify-center gap-2">
                                                <button className="btn btn-sm btn-primary btn-outline" onClick={() => { setUserDetail(item); document.getElementById('my_modal_edit').showModal(); }}>
                                                    {lang.formatMessage({ id: "table.edit" })}
                                                </button>

                                                <button className="btn btn-sm btn-error btn-outline" onClick={() => { setUserDetail(item); document.getElementById('my_modal_delete').showModal(); }}>
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
                        <button className="join-item btn">«</button>
                        <input
                            className="join-item btn btn-square"
                            type="radio"
                            name="options"
                            aria-label="1"
                            checked="checked" />
                        <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
                        <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
                        <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
                        <button className="join-item btn">»</button>
                    </div>
                </div>
            </div>


            <dialog id="my_modal_edit" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-[24px] mb-[10px] text-primary">{lang.formatMessage({ id: "category.editCategory" })}</h3>
                    <form action="w-[100%]" onSubmit={handleSubmitEdit}>
                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-primary text-[18px]" htmlFor="categoryName">{lang.formatMessage({ id: "category.categoryName" })}</label>
                            <input type="text" id="categoryName" className="input w-[100%] outline-none" placeholder={lang.formatMessage({ id: "category.enterCatgory" })} value={userDetail?.categoryName ? userDetail.categoryName : "0"} />
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-primary text-[18px]" htmlFor="status">{lang.formatMessage({ id: "table.status" })}</label>
                            <select
                                value={userDetail?.status || "active"}
                                onChange={(e) =>
                                    setuserDetail({
                                        ...userDetail,
                                        status: e.target.value,
                                    })
                                }
                                className="select w-full outline-none"
                            >
                                <option value="active">
                                    {lang.formatMessage({ id: "select.active" })}
                                </option>
                                <option value="inactive">
                                    {lang.formatMessage({ id: "select.inactive" })}
                                </option>
                            </select>
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-primary text-[18px]" htmlFor="status">{lang.formatMessage({ id: "input.image" })}</label>
                            <input type="file" className="file-input file-input-primary w-[100%]" />
                            {userDetail?.image && (
                                <img
                                    src={userDetail.image}
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                            )}

                        </fieldset>

                        <button className="w-[100%] mt-[10px] btn btn-outline btn-primary">{lang.formatMessage({ id: "button.edit" })}</button>

                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default Users;