import { IoSearchOutline } from "react-icons/io5";
import { useIntl } from "react-intl";
import { categoryMockData } from "../../data/mockData";
import { useEffect, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { VscLayersActive } from "react-icons/vsc";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa";
import { callApi, From } from "../../api/api";
import axios from "axios";
import { toast } from "sonner";
const Categories = () => {
    const lang = useIntl();
    const [categoryList, setcategoryList] = useState(categoryMockData);
    const [total, setTotal] = useState({});
    const [categoryDetail, setcategoryDetail] = useState();
    const [preview, setPreview] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("null");
    const [status, setStatus] = useState("all");
    const [sort, setSort] = useState("desc");

    const loadCategoriesList = async (currentPage, search, status, sort) => {
        try {
            const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/categories?search=${search}&status=${status}&updatedAt=${sort}&page=${currentPage}`, {});
            setcategoryList(res.data);
            setTotalPages(res.totalPages);
            setTotal({
                totalStatus: res.totalStatus,
                totalStatusActive: res.totalStatusActive,
                totalStatusInactive: res.totalStatusInactive
            })
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        loadCategoriesList(currentPage, search, status, sort);
    }, [currentPage, search, status, sort]);

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        const categoryName = e.target.categoryName.value;
        const status = e.target.status.value;
        const image = e.target.image.files[0];

        formData.append("categoryName", categoryName);
        formData.append("status", status);
        formData.append("image", image);

        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_APIDEV}/admin/categories`, formData,
                {
                    headers: {
                        token: localStorage.getItem('token') || sessionStorage.getItem('token'),
                        'content-type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );

            if (res.data.status === true) {
                toast.success(`${lang.formatMessage({ id: "category.title" })} ${lang.formatMessage({ id: "toast.created" })}!`)
                loadCategoriesList(1, "null", "all")
                document.getElementById("create_category_modal").close();
            } else {
                toast.error(`${lang.formatMessage({ id: "category.title" })} ${lang.formatMessage({ id: "toast.existed" })}!`)
            }
            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        const categoryName = e.target.categoryName.value;
        const status = e.target.status.value;
        const image = e.target.image.files[0];

        formData.append("categoryName", categoryName);
        formData.append("status", status);
        formData.append("image", image);

        try {
            const res = await axios.put(`${import.meta.env.VITE_REACT_APP_APIDEV}/admin/categories/${categoryDetail?.id}`, formData,
                {
                    headers: {
                        token: localStorage.getItem('token') || sessionStorage.getItem('token'),
                        'content-type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );

            if (res.data.status === true) {
                toast.success(`${lang.formatMessage({ id: "category.title" })} ${lang.formatMessage({ id: "toast.updated" })}!`)
                loadCategoriesList(1, "null", "all");
                document.getElementById("my_modal_edit").close();
            } else {
                toast.error(`${lang.formatMessage({ id: "category.title" })} ${lang.formatMessage({ id: "toast.notFound" })}!`)

            }
            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

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
                            <button className="btn btn-primary text-white font-[500]" onClick={() => document.getElementById('create_category_modal').showModal()}>{lang.formatMessage({ id: "category.createCategory" })}</button>
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
                    <div className="mt-[16px] font-bold text-[35px]">{total.totalStatus}</div>
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
                    <div className="mt-[16px] font-bold text-[35px]">{total.totalStatusActive}</div>
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
                    <div className="mt-[16px] font-bold text-[35px]">{total.totalStatusInactive}</div>
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
                                    <input
                                        type="search"
                                        placeholder={lang.formatMessage({ id: "input.search" })}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </label>
                            </li>
                            <li>
                                <select
                                    value={status}
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
                                <select defaultValue={sort} className="select outline-none" onChange={(e) => setSort(e.target.value)}>
                                    <option disabled={true} value={"desc"}>{lang.formatMessage({ id: "select.sort" })}</option>
                                    <option value={"asc"}>A-Z</option>
                                    <option value={"desc"}>Z-A</option>
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
                                                {item.updatedAtFormat}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <span className="text-primary font-medium">
                                                {item.updater?.adminName}
                                            </span>
                                        </td>

                                        <td className="align-middle">
                                            <span className="text-primary font-medium">
                                                {item.creator?.adminName}
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
                        {totalPages > 1 && (
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

            <dialog id="create_category_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-[24px] mb-[10px] text-primary">{lang.formatMessage({ id: "category.createCategory" })}</h3>
                    <form action="w-[100%]" onSubmit={handleSubmitCreate}>
                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-primary text-[18px]" htmlFor="categoryName">{lang.formatMessage({ id: "category.categoryName" })}</label>
                            <input type="text" name="categoryName" id="categoryName" className="input w-[100%] outline-none" placeholder={lang.formatMessage({ id: "category.enterCatgory" })} />
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-primary text-[18px]" htmlFor="status">{lang.formatMessage({ id: "table.status" })}</label>
                            <select name="status" defaultValue="active" className="select w-[100%] outline-none">
                                <option value={"active"}>{lang.formatMessage({ id: "select.active" })}</option>
                                <option value={"inactive"}>{lang.formatMessage({ id: "select.inactive" })}</option>
                            </select>
                        </fieldset>

                        <fieldset className="fieldset w-[100%] mb-[10px]">
                            <label className="label text-primary text-[18px]" htmlFor="status">{lang.formatMessage({ id: "input.image" })}</label>
                            <input name="image" type="file" className="file-input file-input-primary w-[100%]" onChange={handleImageChange} />
                            {preview && (
                                <img
                                    src={preview}
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                            )}
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
                            <input type="text" id="categoryName" name="categoryName" className="input w-[100%] outline-none" placeholder={lang.formatMessage({ id: "category.enterCatgory" })} value={categoryDetail?.categoryName ? categoryDetail.categoryName : "0"} />
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
                                name="status"
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
                            <input type="file" name="image" className="file-input file-input-primary w-[100%]" onChange={handleImageChange} />
                            {categoryDetail?.image && (
                                <img
                                    src={preview || categoryDetail.image}
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