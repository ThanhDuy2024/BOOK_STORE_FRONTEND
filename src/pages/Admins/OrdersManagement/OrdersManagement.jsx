import { IoSearchOutline } from "react-icons/io5";
import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { VscLayersActive } from "react-icons/vsc";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa";
import { callApi } from "../../../api/api";
import axios from "axios";
import { toast } from "sonner";
import { GoContainer } from "react-icons/go";
import { CiBookmarkCheck } from "react-icons/ci";

const mockData = [
	{
		id: 5,
		fullName: "Lam Thanh Duy",
		email: "thanhduythptthanhbinh@gmail.com",
		address: "TP.HCM",
		phone: "0855014226",
		paymentMethod: "cod",
		paymentStatus: "unpaid",
		totalAmount: 40000,
		status: "cancel",
		createdAt: "2026-09-01T07:34:47.395Z",
		updatedAt: "2026-09-11T01:58:45.190Z",
		createdAtFormat: "14:34 01/09/2026",
		updatedAtFormat: "08:58 11/09/2026"
	}
];
const OrderManagement = () => {
	const lang = useIntl();
	return (
		<>
			<div className="sm:flex justify-between items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
				<div className="md:flex md:items-center md:justify-center sm:gap-[20px] gap-[5px]">
					<div className="w-[48px] h-[48px] bg-[#eaf2ff] hidden sm:flex items-center justify-center rounded-[10px]">
						<GoContainer
							size={20}
							className="text-primary"
						/>
					</div>

					<div>
						<div className="text-primary font-[700]">
							{lang.formatMessage({
								id: "global.management",
							})}
						</div>

						<div className="text-[26px] text-black font-[700]">
							Đơn hàng
						</div>

						<div>
							Xem đơn hàng, cũng như điều chỉnh đơn hàng
						</div>
					</div>
				</div>
			</div>

			<div className="md:mt-[20px] md:grid md:grid-cols-3 md:gap-4 p-4">
				<div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-indigo-500 mb-[10px] md:mb-[0px]">
					<div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
						<div>
							Tổng đơn hàng đã được đặt
						</div>

						<div className="bg-[#eaf2ff] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
							<VscLayersActive
								size={20}
								color="blue"
							/>
						</div>
					</div>

					<div className="mt-[16px] font-bold text-[35px]">
						1000
					</div>

					<div className="flex gap-[5px] text-[15px] mt-[14px]">
						<div className="text-indigo-700">
							+100 đơn hàng mỗi ngày
						</div>
					</div>
				</div>

				<div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-green-500 mb-[10px] md:mb-[0px]">
					<div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
						<div>
							Tổng đơn hàng đã được giao thành công
						</div>

						<div className="bg-[#e7f6f3] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
							<MdOutlineCategory
								size={20}
								color="green"
							/>
						</div>
					</div>

					<div className="mt-[16px] font-bold text-[35px]">
						900
					</div>

					<div className="flex gap-[5px] text-[15px] mt-[14px]">
						<div className="text-green-700">
							+5
						</div>

						<div className="text-[#6b7280] font-bold">
							đơn được giao mỗi ngày
						</div>
					</div>
				</div>

				<div className="bg-white shadow-md p-[21.6px] rounded-[10px] border-l-4 border-red-500 mb-[10px] md:mb-[0px]">
					<div className="flex justify-between text-[14px] text-[#6b7280] font-bold items-center">
						<div>
							Số đơn hàng bị hủy
						</div>

						<div className="bg-[#ffecec] w-[42px] h-[42px] flex items-center justify-center rounded-[10px]">
							<IoMdRemoveCircleOutline
								size={20}
								color="red"
							/>
						</div>
					</div>

					<div className="mt-[16px] font-bold text-[35px]">
						100
					</div>

					<div className="flex gap-[5px] text-[15px] mt-[14px]">
						<div className="text-red-700">
							+0
						</div>

						<div className="text-[#6b7280] font-bold">
							đơn hàng bị hủy trong hôm nay
						</div>
					</div>
				</div>
			</div>

			<div className="mt-[20px] mx-[10px] rounded-[10px] shadow-md bg-white">
				<div className="px-4 pt-4 md:flex md:items-center md:justify-between mb-[10px]">
					<div>
						<div className="flex items-center gap-[10px] text-[20px]">
							<div className="w-[48px] h-[48px] bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
								<FaRegChartBar
									size={20}
									className="text-primary"
								/>
							</div>

							<div className="font-bold">
								Danh sách đơn hàng
							</div>
						</div>
					</div>

					<div className="flex-none">
						<ul className="menu menu-horizontal px-1 gap-[10px]">
							{/* search */}
							<li>
								<label className="input outline-none">
									<div className="h-[1em] opacity-50 flex items-center">
										<IoSearchOutline size={20} />
									</div>

									<input
										type="search"
										placeholder={lang.formatMessage({
											id: "input.search",
										})}
									/>
								</label>
							</li>

							{/* Status */}
							<li>
								<select
									value={"all"}
									className="select outline-none"
								>
									<option value="all">
										{lang.formatMessage({
											id: "select.allStatus",
										})}
									</option>

									<option value="active">
										{lang.formatMessage({
											id: "select.active",
										})}
									</option>

									<option value="inactive">
										{lang.formatMessage({
											id: "select.inactive",
										})}
									</option>
								</select>
							</li>
						</ul>
					</div>
				</div>

				<div className="hidden sm:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
					<div className="w-full overflow-x-auto">
						<table className="table w-full text-center">
							<thead className="bg-slate-50">
								<tr>
									<th className="align-middle whitespace-nowrap">
										ID đơn hàng
									</th>

									<th className="align-middle whitespace-nowrap">
										Tên người đặt hàng
									</th>

									<th className="align-middle whitespace-nowrap">
										Email
									</th>

									<th className="align-middle whitespace-nowrap">
										Số điện thoại
									</th>

									<th className="align-middle whitespace-nowrap">
										Phương thức thanh toán
									</th>

									<th className="align-middle whitespace-nowrap">
										Số tiền của đơn hàng
									</th>

									<th className="align-middle whitespace-nowrap">
										Trạng thái đơn hàng
									</th>

									<th className="align-middle whitespace-nowrap">
										Hàng động
									</th>
								</tr>
							</thead>

							<tbody>
								{mockData.map((item) => (
									<tr key={item.id} className="hover:bg-slate-50">
										{/* Category */}
										<td className="align-middle">
											<div className="flex items-center justify-center gap-2 sm:gap-3">
												<div className="text-left min-w-0">
													<div className="font-semibold truncate max-w-[120px] sm:max-w-[200px]">
														{item.id}
													</div>
												</div>
											</div>
										</td>

										<td className="hidden lg:table-cell align-middle whitespace-nowrap">
											<span className="text-slate-700">
												{item.fullName}
											</span>
										</td>

										<td className="hidden lg:table-cell align-middle whitespace-nowrap">
											<span className="text-primary">
												{item.email}
											</span>
										</td>

										<td className="hidden lg:table-cell align-middle whitespace-nowrap">
											<span className="text-slate-700 font-bold">
												{item.phone}
											</span>
										</td>

										<td className="hidden lg:table-cell align-middle whitespace-nowrap">
											<span className="text-slate-700">
												{item.paymentMethod.toUpperCase()}
											</span>
										</td>

										<td className="hidden lg:table-cell align-middle whitespace-nowrap">
											<span className="text-slate-700">
												{item.totalAmount.toLocaleString("vi-VN")} VND
											</span>
										</td>

										<td className="align-middle">
											<span
												className={
													item.status ===
														"active"
														? "badge badge-primary badge-outline"
														: "badge badge-error badge-outline"
												}
											>
												{item.status}
											</span>
										</td>

										<td className="align-middle">
											<div className="flex justify-center gap-1 sm:gap-2">

												{/* Edit */}
												<button
													type="button"
													className="btn btn-xs sm:btn-sm btn-primary btn-outline"
												>
													{lang.formatMessage({
														id: "table.edit",
													})}
												</button>

												{/* Delete */}
												<button
													type="button"
													className="btn btn-xs sm:btn-sm btn-error btn-outline"
												>
													{lang.formatMessage({
														id: "table.delete",
													})}
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

export default OrderManagement;