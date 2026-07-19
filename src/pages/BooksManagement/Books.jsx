import { IoSearchOutline } from "react-icons/io5";
import { useIntl } from "react-intl";
import { bookMockData, categoryMockData } from "../../data/mockData";
import { useState } from "react";
const Books = () => {
    const lang = useIntl();
    const [bookList, setBookList] = useState(bookMockData);
    const [bookDetail, setBookDetail] = useState();
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
                    <div className="text-xl text-primary font-[600]">{lang.formatMessage({ id: "book.title" })}</div>
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
                            <button className="btn btn-primary text-white font-[500]" onClick={() => document.getElementById('my_modal_create').showModal()}>
                                {lang.formatMessage({ id: "book.createBook" })}
                            </button>
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
                                                {item.updatedAt}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <span className="text-primary font-medium">
                                                {item.updatedBy}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <span className="text-primary font-medium">
                                                {item.createdBy}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <div className="flex justify-center gap-2">
                                                <button className="btn btn-sm btn-primary btn-outline">
                                                    {lang.formatMessage({ id: "table.edit" })}
                                                </button>

                                                <button className="btn btn-sm btn-error btn-outline" onClick={() => { setBookDetail(item); document.getElementById('my_modal_delete').showModal(); }}>
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

            <dialog id="my_modal_delete" className="modal">
                <div class="modal-box">
                    <h3 class="text-lg font-bold text-primary">{lang.formatMessage({ id: "book.deleteBook"})}</h3>
                    <p class="py-4">{lang.formatMessage({ id: "book.deleteDes"})}</p>
                    <div class="modal-action">
                        <div className="">
                            <button className="btn btn-primary">
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