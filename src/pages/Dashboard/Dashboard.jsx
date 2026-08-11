import { useIntl } from "react-intl";
import { useState } from "react";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiFlagBannerFoldDuotone } from "react-icons/pi";
import { VscLayersActive } from "react-icons/vsc";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoSpeedometerOutline, IoPieChartOutline } from "react-icons/io5";
import { FaArrowDown, FaRegChartBar } from "react-icons/fa";
import LineChart from "../../components/chart/LineChart";
import DonutChart from "../../components/chart/DonutChart";
import { userMockData } from "../../data/mockData";

const Dashboard = () => {
    const lang = useIntl();
    const [usersList] = useState(userMockData);

    return (
        <>
            {/* =====================================================
                HEADER OVERVIEW
            ====================================================== */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
                <div className="flex items-center gap-[15px] sm:gap-[20px]">
                    <div className="w-[48px] h-[48px] shrink-0 bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                        <IoSpeedometerOutline size={20} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-primary font-[700]">Overview</div>
                        <div className="text-[22px] sm:text-[26px] text-black font-[700] truncate">
                            {lang.formatMessage({ id: "side.dashboard" })}
                        </div>
                        <div className="text-[13px] sm:text-[14px] text-gray-500 hidden sm:block">
                            Monitor performance, sales, users, and support from one clean workspace.
                        </div>
                    </div>
                </div>

                <div className="flex-none">
                    <button className="btn btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                        <FaArrowDown />
                        <span>Export report</span>
                    </button>
                </div>
            </div>

            {/* =====================================================
                STATISTICS CARDS
            ====================================================== */}
            <div className="mt-[20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-[10px]">
                {/* TOTAL USERS */}
                <div className="bg-white shadow-md p-4 sm:p-[21.6px] rounded-[10px] border-l-4 border-green-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div>TOTAL USERS</div>
                        <div className="bg-[#e7f6f3] w-[42px] h-[42px] flex items-center justify-center rounded-[10px] shrink-0">
                            <LiaUsersCogSolid size={20} color="green" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[28px] sm:text-[35px]">100</div>
                    <div className="flex items-center gap-[5px] text-[14px] sm:text-[15px] mt-[14px]">
                        <span className="text-green-700 font-bold">+50</span>
                        <span className="text-[#6b7280] font-medium">users in this month</span>
                    </div>
                </div>

                {/* TOTAL ACTIVE */}
                <div className="bg-white shadow-md p-4 sm:p-[21.6px] rounded-[10px] border-l-4 border-indigo-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div>TOTAL ACTIVE</div>
                        <div className="bg-[#eaf2ff] w-[42px] h-[42px] flex items-center justify-center rounded-[10px] shrink-0">
                            <VscLayersActive size={20} color="blue" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[28px] sm:text-[35px]">190</div>
                    <div className="flex items-center gap-[5px] text-[14px] sm:text-[15px] mt-[14px]">
                        <span className="text-indigo-700 font-bold">90%</span>
                        <span className="text-[#6b7280] font-medium">healthy account</span>
                    </div>
                </div>

                {/* TOTAL INACTIVE */}
                <div className="bg-white shadow-md p-4 sm:p-[21.6px] rounded-[10px] border-l-4 border-red-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div>TOTAL INACTIVE</div>
                        <div className="bg-[#ffecec] w-[42px] h-[42px] flex items-center justify-center rounded-[10px] shrink-0">
                            <IoMdRemoveCircleOutline size={20} color="red" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[28px] sm:text-[35px]">5</div>
                    <div className="flex items-center gap-[5px] text-[14px] sm:text-[15px] mt-[14px]">
                        <span className="text-red-700 font-bold">5%</span>
                        <span className="text-[#6b7280] font-medium">account inactive</span>
                    </div>
                </div>

                {/* TOTAL BANNED */}
                <div className="bg-white shadow-md p-4 sm:p-[21.6px] rounded-[10px] border-l-4 border-orange-500">
                    <div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
                        <div>TOTAL BANNED</div>
                        <div className="bg-[#fff4df] w-[42px] h-[42px] flex items-center justify-center rounded-[10px] shrink-0">
                            <PiFlagBannerFoldDuotone size={20} className="text-orange-400" />
                        </div>
                    </div>
                    <div className="mt-[16px] font-bold text-[28px] sm:text-[35px]">5</div>
                    <div className="flex items-center gap-[5px] text-[14px] sm:text-[15px] mt-[14px]">
                        <span className="text-orange-700 font-bold">5%</span>
                        <span className="text-[#6b7280] font-medium">account banned</span>
                    </div>
                </div>
            </div>

            {/* =====================================================
                CHARTS SECTION
            ====================================================== */}
            <div className="w-full flex flex-col lg:flex-row px-[10px] mt-[20px] rounded-[10px] gap-4">
                {/* LINE CHART */}
                <div className="w-full lg:w-[60%] bg-white p-4 sm:p-[22px] shadow-md rounded-[10px]">
                    <div>
                        <div className="flex items-center gap-[10px] text-[18px] sm:text-[20px]">
                            <div className="w-[48px] h-[48px] shrink-0 bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                <FaRegChartBar size={20} className="text-primary" />
                            </div>
                            <div className="font-bold">Sales Performance</div>
                        </div>
                        <div className="mt-[5px] text-[14px] opacity-75">
                            Monthly revenue compared with operational targets.
                        </div>
                    </div>
                    <div className="mt-[20px]">
                        <LineChart />
                    </div>
                </div>

                {/* DONUT CHART */}
                <div className="w-full lg:w-[40%] bg-white p-4 sm:p-[22px] shadow-md rounded-[10px]">
                    <div>
                        <div className="flex items-center gap-[10px] text-[18px] sm:text-[20px]">
                            <div className="w-[48px] h-[48px] shrink-0 bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                <IoPieChartOutline size={20} className="text-primary" />
                            </div>
                            <div className="font-bold">Channel Mix</div>
                        </div>
                        <div className="mt-[5px] text-[14px] opacity-75">
                            Revenue contribution by source.
                        </div>
                    </div>
                    <div className="mt-[20px]">
                        <DonutChart />
                    </div>
                </div>
            </div>

            {/* =====================================================
                RECENT USERS TABLE
            ====================================================== */}
            <div className="mt-[20px] mx-[10px] rounded-[10px] shadow-md bg-white mb-[20px] p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-[16px]">
                    <div>
                        <div className="flex items-center gap-[10px] text-[18px] sm:text-[20px]">
                            <div className="w-[48px] h-[48px] shrink-0 bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                <FaRegChartBar size={20} className="text-primary" />
                            </div>
                            <div className="font-bold">Recent Users</div>
                        </div>
                        <div className="mt-[5px] text-[14px] opacity-75">
                            Latest account activity across the workspace.
                        </div>
                    </div>
                    <button className="btn btn-primary w-full sm:w-auto">
                        Manage users
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table text-center w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="align-middle">
                                        {lang.formatMessage({ id: "users.name" })}
                                    </th>
                                    <th className="align-middle">
                                        {lang.formatMessage({ id: "table.status" })}
                                    </th>
                                    <th className="align-middle">
                                        {lang.formatMessage({ id: "table.createdAt" })}
                                    </th>
                                    <th className="align-middle">
                                        {lang.formatMessage({ id: "table.actions" })}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {usersList.map((item, index) => (
                                    <tr key={item.id || index} className="hover:bg-slate-50">
                                        <td className="align-middle">
                                            <div className="flex items-center justify-start sm:justify-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-10 sm:w-12 rounded-lg">
                                                        <img
                                                            src={item.image}
                                                            alt={item.userName || "User"}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="text-left">
                                                    <div className="font-semibold text-sm sm:text-base">
                                                        {item.userName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="align-middle whitespace-nowrap">
                                            <span
                                                className={
                                                    item.status === "active"
                                                        ? "badge badge-primary badge-outline"
                                                        : "badge badge-error badge-outline"
                                                }
                                            >
                                                {lang.formatMessage({ id: `table.${item.status}` })}
                                            </span>
                                        </td>

                                        <td className="align-middle whitespace-nowrap">
                                            <span className="text-primary font-medium text-sm sm:text-base">
                                                {item.createdAt}
                                            </span>
                                        </td>

                                        <td className="align-middle whitespace-nowrap">
                                            <div className="flex justify-center gap-2">
                                                <button className="btn btn-sm btn-primary btn-outline">
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
    );
};

export default Dashboard;