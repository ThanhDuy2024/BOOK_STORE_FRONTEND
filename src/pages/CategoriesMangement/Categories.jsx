import { IoSearchOutline } from "react-icons/io5";
import { useIntl } from "react-intl";
import { categoryMockData } from "../../data/mockData";
import { useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { VscLayersActive } from "react-icons/vsc";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa";
const Categories = () => {
    const lang = useIntl();
    const [categoryList, setcategoryList] = useState(categoryMockData);
    const [categoryDetail, setcategoryDetail] = useState();
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
            <div className="flex justify-between items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
                <div className="flex items-center justify-center gap-[20px]">
                    <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                        <BiCategoryAlt size={20} className="text-primary" />
                    </div>
                    <div className="">
                        <div className="text-primary font-[700]">{lang.formatMessage({ id: "global.management" })}</div>
                        <div className="text-[26px] text-black font-[700]">{lang.formatMessage({ id: "category.title" })}</div>
                        <div className="">{lang.formatMessage({ id: "category.sub" })}</div>
                    </div>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 gap-[10px]">
                        <li>
                            <button className="btn btn-primary text-white font-[500]" onClick={() => document.getElementById('my_modal_create').showModal()}>{lang.formatMessage({ id: "category.createCategory" })}</button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-[20px] grid grid-cols-3 gap-4 p-4">
                <div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-green-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div className="">{lang.formatMessage({ id: "category.totalCategory" })}</div>
                        <div className="bg-[#e7f6f3] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
                            <MdOutlineCategory size={20} color="green" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[35px]">10</div>
                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-green-700">
                            +5
                        </div>
                        <div className="text-[#6b7280] font-bold">
                            {lang.formatMessage({ id: "category.totalCategortSub" })}
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
                    <div className="mt-[16px] font-bold text-[35px]">9</div>
                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-indigo-700">
                            90%
                        </div>
                        <div className="text-[#6b7280] font-bold">
                            {lang.formatMessage({ id: "category.totalActiveSub" })}
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
                    <div className="mt-[16px] font-bold text-[35px]">1</div>
                    <div className="flex gap-[5px] text-[15px] mt-[14px]">
                        <div className="text-red-700">
                            10%
                        </div>
                        <div className="text-[#6b7280] font-bold">
                            {lang.formatMessage({ id: "category.totalInactiveSub" })}
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
                            <div className="font-bold">{lang.formatMessage({ id: "category.list" })}</div>
                        </div>
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
                    </ul>
                </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table text-center">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="align-middle">{lang.formatMessage({ id: "category.categoryName" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.status" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.updatedAt" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.updatedBy" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.createdBy" })}</th>
                                    <th className="align-middle">{lang.formatMessage({ id: "table.actions" })}</th>
                                </tr>
                            </thead>

                            <tbody>
                                {categoryList.map(item => (
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
                                                        {item.categoryName}
                                                    </div>

                                                    <div className="text-sm text-gray-500">
                                                        120 products
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
                                                <button className="btn btn-sm btn-primary btn-outline" onClick={() => { setcategoryDetail(item); document.getElementById('my_modal_edit').showModal(); }}>
                                                    {lang.formatMessage({ id: "table.edit" })}
                                                </button>

                                                <button className="btn btn-sm btn-error btn-outline" onClick={() => { setcategoryDetail(item); document.getElementById('my_modal_delete').showModal(); }}>
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

            <dialog id="my_modal_create" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-[24px] mb-[10px] text-primary">{lang.formatMessage({ id: "category.createCategory" })}</h3>
                    <form action="w-[100%]" onSubmit={handleSubmitCreate}>
                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-primary text-[18px]" htmlFor="categoryName">{lang.formatMessage({ id: "category.categoryName" })}</label>
                            <input type="text" id="categoryName" className="input w-[100%] outline-none" placeholder={lang.formatMessage({ id: "category.enterCatgory" })} />
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-primary text-[18px]" htmlFor="status">{lang.formatMessage({ id: "table.status" })}</label>
                            <select defaultValue="active" className="select w-[100%] outline-none">
                                <option value={"active"}>{lang.formatMessage({ id: "select.active" })}</option>
                                <option value={"inactive"}>{lang.formatMessage({ id: "select.inactive" })}</option>
                            </select>
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-primary text-[18px]" htmlFor="status">{lang.formatMessage({ id: "input.image" })}</label>
                            <input type="file" className="file-input file-input-primary w-[100%]" />
                        </fieldset>

                        <button className="w-[100%] mt-[10px] btn btn-outline btn-primary">{lang.formatMessage({ id: "button.create" })}</button>

                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="my_modal_edit" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-[24px] mb-[10px] text-primary">{lang.formatMessage({ id: "category.editCategory" })}</h3>
                    <form action="w-[100%]" onSubmit={handleSubmitEdit}>
                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-primary text-[18px]" htmlFor="categoryName">{lang.formatMessage({ id: "category.categoryName" })}</label>
                            <input type="text" id="categoryName" className="input w-[100%] outline-none" placeholder={lang.formatMessage({ id: "category.enterCatgory" })} value={categoryDetail?.categoryName ? categoryDetail.categoryName : "0"} />
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-primary text-[18px]" htmlFor="status">{lang.formatMessage({ id: "table.status" })}</label>
                            <select
                                value={categoryDetail?.status || "active"}
                                onChange={(e) =>
                                    setCategoryDetail({
                                        ...categoryDetail,
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
                            {categoryDetail?.image && (
                                <img
                                    src={categoryDetail.image}
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

export default Categories;