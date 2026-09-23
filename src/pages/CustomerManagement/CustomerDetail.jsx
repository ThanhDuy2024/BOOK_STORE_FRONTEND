import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { callApi } from "../../api/api";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";
import { useIntl } from "react-intl";
import { toast } from "sonner"
const CustomerDetail = () => {
    const lang = useIntl();
    const { id } = useParams();
    const [preview, setPreview] = useState("");
    const [customerDetail, setCustomerDetail] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/customers/${id}`);
                setCustomerDetail(res.data);
                setPreview(res.data.image)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    const handleChangeStatus = async (status) => {
        console.log(status);
        try {
            const res = await callApi("put", `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/customers/${id}`, {
                status: status
            });
            toast.success("Cập nhật trạng thái thành công!");
        } catch (error) {
            console.log(error);
            toast.error("Cập nhật trạng thái thất bại!");
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center shadow-md rounded-[10px] p-4 mt-[80px] mx-[10px] bg-white">
                {/* LEFT */}
                <div className="flex items-center gap-[15px]">
                    <div className="w-[48px] h-[48px] shrink-0 bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                        <RiAccountPinCircleLine
                            size={20}
                            className="text-primary"
                        />
                    </div>

                    <div className="min-w-0">
                        <div className="text-primary font-[700]">
                            Chỉnh sửa khách hàng.
                        </div>

                        <div className="text-[22px] sm:text-[26px] text-black font-[700] truncate">
                            {customerDetail.fullName}
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="mt-4 md:mt-0">
                    <Link
                        to="/admin/customer"
                        className="btn btn-primary text-white font-[500] w-full md:w-auto"
                    >
                        Quay về danh sách khách hàng
                    </Link>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-[10px] w-full">
                <div className="w-full lg:w-[100%] mt-[20px] lg:mx-[10px] rounded-[10px] shadow-md bg-white p-4">
                    <div className="flex items-center justify-between mb-[16px]">
                        <div className="flex items-center gap-[10px]">
                            <div className="w-[48px] h-[48px] shrink-0 bg-[#eaf2ff] flex items-center justify-center rounded-[10px]">
                                <TbUserEdit
                                    size={20}
                                    className="text-primary"
                                />
                            </div>

                            <div>
                                <div className="font-bold text-[18px] sm:text-[20px]">
                                    Thông tin về khách hàng
                                </div>

                                <div className="mt-[5px] text-[14px] opacity-75">
                                    Những thông tin bạn có thể xem hoặc chỉnh sửa trạng thái khách hàng
                                </div>
                            </div>
                        </div>
                    </div>

                    <form
                        key={customerDetail?.id || "loading"}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-[10px] gap-y-[5px]"
                    >
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="name"
                            >
                                Tên khách hàng
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="fullName"
                                required
                                readOnly
                                defaultValue={customerDetail?.fullName || ""}
                                className="input w-full outline-none"
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="email"
                            >
                                Email
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                id="email"
                                name="email"
                                required
                                readOnly
                                defaultValue={customerDetail?.email || ""}
                                className="input w-full outline-none"
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="address"
                            >
                                Địa chỉ
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                id="address"
                                name="address"
                                required
                                readOnly
                                defaultValue={customerDetail?.address || ""}
                                className="input w-full outline-none"
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="phone"
                            >
                                Số điện thoại
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                required
                                readOnly
                                defaultValue={customerDetail?.phone || ""}
                                className="input w-full outline-none"
                            />
                        </fieldset>

                        {/* STATUS */}
                        <fieldset className="fieldset">
                            <label
                                className="label text-black"
                                htmlFor="status"
                            >
                                {lang.formatMessage({
                                    id: "table.status",
                                })}
                                <span className="text-red-500">*</span>
                            </label>

                            <select
                                id="status"
                                name="status"
                                defaultValue={customerDetail?.status || "active"}
                                className="select w-full outline-none"
                                onChange={(e) => handleChangeStatus(e.target.value)}
                            >
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
                        </fieldset>

                        {preview && (
                            <div className="md:col-span-2 mt-[10px]">
                                <div className="text-sm font-semibold mb-2">
                                    Ảnh đại diện
                                </div>

                                <div className="w-full max-w-[320px] rounded-xl overflow-hidden bg-base-100 shadow-md border border-slate-200">
                                    <figure className="h-[260px] sm:h-[300px] overflow-hidden">
                                        <img
                                            src={preview}
                                            alt="customer preview"
                                            className="w-full h-full object-contain transition duration-500 hover:scale-105"
                                        />
                                    </figure>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}

export default CustomerDetail;