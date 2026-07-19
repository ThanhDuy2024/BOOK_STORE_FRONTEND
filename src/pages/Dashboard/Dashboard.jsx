import { RiBattery2ChargeLine } from "react-icons/ri";
import { LuCalendarHeart } from "react-icons/lu";
import { SlEnergy } from "react-icons/sl";
import { PiBatteryChargingVerticalLight } from "react-icons/pi";
import { useIntl } from "react-intl";
import { useState } from "react";
const Dashboard = () => {
    const lang = useIntl();
    return (
        <>
            <div className='p-4 mt-[60px]'>
                <div className='flex items-center mb-[24px]'>
                    <div className='flex items-center justify-between p-[22px] border border-green-600 mr-[10px] w-[25%] rounded-[10px] shadow-md'>
                        <div className='text-[18px]'>
                            <div className='text-green-700'>Battery status</div>
                            <div className='flex items-center gap-[10px] mt-[10px]'>
                                <div className=''>SOC:</div>
                                <div className='text-green-700'>55%</div>
                            </div>
                        </div>
                        <div className=''>
                            <RiBattery2ChargeLine color='green' size={30} />
                        </div>
                    </div>

                    <div className='flex items-center justify-between p-[22px] border border-blue-600 mr-[10px] w-[25%] rounded-[10px] shadow-md'>
                        <div className='text-[18px]'>
                            <div className='text-blue-700'>Battery status</div>
                            <div className='flex items-center gap-[10px] mt-[10px]'>
                                <div className=''>SOH:</div>
                                <div className='text-blue-700'>100%</div>
                            </div>
                        </div>
                        <div className=''>
                            <LuCalendarHeart size={30} color='blue' />
                        </div>
                    </div>

                    <div className='flex items-center justify-between p-[22px] border border-red-600 mr-[10px] w-[25%] rounded-[10px] shadow-md'>
                        <div className='text-[18px]'>
                            <div className='text-red-700'>Energy</div>
                            <div className='flex items-center gap-[10px] mt-[10px]'>
                                <div className=''>Power:</div>
                                <div className='text-red-700'>900.00 KWH</div>
                            </div>
                        </div>
                        <div className=''>
                            <SlEnergy size={30} color='red' />
                        </div>
                    </div>

                    <div className='flex items-center justify-between p-[22px] border border-orange-400 mr-[10px] w-[25%] rounded-[10px] shadow-md'>
                        <div className='text-[18px]'>
                            <div className='text-orange-400'>Charging</div>
                            <div className='flex items-center gap-[10px] mt-[10px]'>
                                <div className=''>Today:</div>
                                <div className='text-orange-400'>3.60 MWH</div>
                            </div>
                        </div>
                        <div className=''>
                            <PiBatteryChargingVerticalLight size={30} color='orange' />
                        </div>
                    </div>
                </div>
                <div className='w-[100%] flex justify-between'>
                    <div className='w-[49%] h-[500px] gap-[10px] border border-black-600 flex justify-center items-center rounded-[10px]'>
                        This is images
                    </div>
                    <div className='w-[49%] h-[500px] gap-[10px]'>
                        <div className='h-[20%] border border-black-600 rounded-[10px] flex items-center justify-center mb-[5px]'>
                            This is calender
                        </div>
                        <div className='h-[50%] border border-black-600 rounded-[10px] flex items-center justify-center mb-[5px]'>
                            This is chart
                        </div>
                        <div className='h-[28%] border border-black-600 rounded-[10px] flex items-center justify-center'>
                            This is some info
                        </div>
                    </div>
                </div>
                <div className='w-[100%] flex justify-between mt-[10px]'>
                    <div className='w-[49%] h-[500px] gap-[10px] border border-black-600 flex justify-center items-center rounded-[10px]'>
                        This is chart 1
                    </div>
                    <div className='w-[49%] h-[500px] gap-[10px] border border-black-600 flex justify-center items-center rounded-[10px]'>
                        This is chart 2
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard