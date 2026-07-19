import { IoEarthOutline } from "react-icons/io5";
import { IoIosNotificationsOutline, IoMdNotificationsOutline } from "react-icons/io";
import { BsUpcScan } from "react-icons/bs";
import { LuBookCheck, LuHouse, LuSquareUser } from "react-icons/lu";
import { CiBatteryCharging, CiSettings, CiUser } from "react-icons/ci";
import { TbReportSearch } from "react-icons/tb";
import { useIntl } from "react-intl";
import { sibarInfo, bookAndCategoriesInfo, clientInfo } from "../data/sidebar";
import { renderIcon } from "../helpers/renderIcon";
import { useContext } from "react";
import { LangContext } from "../contexts/langContext";
import { Link, Outlet } from "react-router";
const AdminLayouts = ({ children }) => {
    const lang = useIntl();
    const { langDispatch, locale} = useContext(LangContext);
    const changeLocale = (locale) => {
        langDispatch({
            type: "CHANGE-LOCALE",
            payload: {
                locale: locale
            }
        })
    }
    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-slate-50 min-h-screen">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-white shadow-md flex justify-between padding-[10px] fixed">
                        <div className="flex items-center gap-[30px]">
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                {/* Sidebar toggle icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                            </label>
                            <div className="px-4 text-primary font-bold">{lang.formatMessage({ id: "header.title" })}</div>
                            <div className="cursor-pointer dropdown dropdown-start">
                                <IoEarthOutline tabIndex={0} size={25} className="outline-none" />
                                <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li onClick={() => changeLocale("en")}><div>{lang.formatMessage({ id: "header.en" })}</div></li>
                                    <li onClick={() => changeLocale("vi")}><div>{lang.formatMessage({ id: "header.vi" })}</div></li>
                                </ul>
                            </div>
                            <div className="cursor-pointer dropdown dropdown-start">
                                <IoIosNotificationsOutline tabIndex={0} size={25} />
                            </div>
                        </div>
                        <div className="flex items-center gap-[20px]">
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                                </div>
                            </div>
                        </div>
                    </nav>
                    {/* Page content here */}
                    <Outlet/>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-white is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <li className="mb-[20px]">
                                <div className="is-drawer-close:hidden text-[16px] font-bold" data-tip="Title">
                                    Menu
                                </div>
                            </li>
                            {sibarInfo.map(item => (
                                <li className="mb-[20px]">
                                    <Link to={item.link} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip={lang.formatMessage({id: item.title})}>
                                        {/* Home icon */}
                                        {renderIcon(item.iconKey, 20)}
                                        <span className="is-drawer-close:hidden text-[16px]">{lang.formatMessage({ id: `${item.title}` })}</span>
                                    </Link>
                                </li>
                            ))}

                            <li className="mb-[16px]">
                                <div className="is-drawer-close:hidden text-[16px] opacity-50">
                                    {lang.formatMessage({ id: "side.productsManagement" })}
                                </div>
                            </li>
                            {bookAndCategoriesInfo.map(item => (
                                <li className="mb-[20px]">
                                    <Link to={item.link} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip={lang.formatMessage({ id: item.title })}>
                                        {/* Home icon */}
                                        {renderIcon(item.iconkey, 20)}
                                        <span className="is-drawer-close:hidden text-[16px]">{lang.formatMessage({ id: `${item.title}`})}</span>
                                    </Link>
                                </li>
                            ))}

                            <li className="mb-[16px]">
                                <div className="is-drawer-close:hidden text-[16px] opacity-50">
                                    {lang.formatMessage({ id: "side.clientManagement" })}
                                </div>
                            </li>

                            {clientInfo.map(item => (
                                <li className="mb-[20px]">
                                    <Link to={item.link} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip={lang.formatMessage({id: item.title})}>
                                        {/* Home icon */}
                                        {renderIcon(item.iconkey, 20)}
                                        <span className="is-drawer-close:hidden text-[16px]">{lang.formatMessage({ id: `${item.title}` })}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLayouts;