import { RiBattery2ChargeLine } from "react-icons/ri";
import { LuCalendarHeart } from "react-icons/lu";
import { SlEnergy } from "react-icons/sl";
import { PiBatteryChargingVerticalLight } from "react-icons/pi";
import { useIntl } from "react-intl";
import { useState } from "react";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiBooksThin } from "react-icons/pi";
import { PiFlagBannerFoldDuotone } from "react-icons/pi";
import { VscLayersActive } from "react-icons/vsc";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa";
import { FaRegChartBar } from "react-icons/fa";
import { IoPieChartOutline } from "react-icons/io5";
import LineChart from "../../components/chart/LineChart";
import DonutChart from "../../components/chart/DonutChart";
import { userMockData } from "../../data/mockData";
const Dashboard = () => {
    const lang = useIntl();
    const [usersList, setUsersList] = useState(userMockData);

    return (
        <>
            <div className="flex items-center justify-between shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
                <div className="flex items-center justify-center gap-[20px]">
                    <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                        <IoSpeedometerOutline size={20} className="text-primary" />
                    </div>
                    <div className="">
                        <div className="text-primary font-[700]">Overview</div>
                        <div className="text-[26px] text-black font-[700]">{lang.formatMessage({ id: "side.dashboard" })}</div>
                        <div className="">Monitor performance, sales, users, and support from one clean workspace.</div>
                    </div>
                </div>
                <div className="flex-none">
                    <button className="btn btn-primary">
                        <FaArrowDown />
                        <div>
                            Export report
                        </div>
                    </button>
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

            <div className="w-full flex p-4 rounded-[10px] gap-4">
                <div className="w-[60%] bg-white p-[22px] shadow-md">
                    <div className="">
                        <div className="flex items-center gap-[10px] text-[20px]">
                            <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                <FaRegChartBar size={20} className="text-primary" />
                            </div>
                            <div className="font-bold">Sales Performance</div>
                        </div>
                        <div className="mt-[5px] opacity-75">Monthly revenue compared with operational targets.</div>
                    </div>
                    <div className="mt-[20px]">
                        <LineChart />
                    </div>
                </div>
                <div className="w-[40%] bg-white p-[22px] shadow-md">
                    <div className="">
                        <div className="flex items-center gap-[10px] text-[20px]">
                            <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                <IoPieChartOutline size={20} className="text-primary" />
                            </div>
                            <div className="font-bold">Channel Mix</div>
                        </div>
                        <div className="mt-[5px] opacity-75">Revenue contribution by source.</div>
                    </div>
                    <div className="">
                        <DonutChart />
                    </div>
                </div>
            </div>

            <div className="mt-[20px] mx-[10px] rounded-[10px] shadow-md bg-white mb-[20px]">
                <div className="px-4 pt-4 flex items-center justify-between mb-[10px]">
                    <div className="">
                        <div className="flex items-center gap-[10px] text-[20px]">
                            <div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                <FaRegChartBar size={20} className="text-primary" />
                            </div>
                            <div className="font-bold">Recent Users</div>
                        </div>
                        <div className="mt-[5px] opacity-75">Latest account activity across the workspace.</div>
                    </div>
                    <button className="btn btn-primary">Manage users</button>
                </div>
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
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard