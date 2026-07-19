import { IoEarthOutline } from "react-icons/io5";
import { IoIosNotificationsOutline, IoMdNotificationsOutline } from "react-icons/io";
import { BsUpcScan } from "react-icons/bs";
import { LuBookCheck, LuHouse, LuSquareUser, LuSquareUserRound } from "react-icons/lu";
import { CiBatteryCharging, CiSettings, CiUser } from "react-icons/ci";
import { TbReportSearch } from "react-icons/tb";
import { LuBookPlus } from "react-icons/lu";
const iconMap = {
  earth: IoEarthOutline,
  notiIos: IoIosNotificationsOutline,
  notiMd: IoMdNotificationsOutline,
  scan: BsUpcScan,
  bookCheck: LuBookCheck,
  bookList: LuBookPlus,
  house: LuHouse,
  squareUser: LuSquareUser,
  battery: CiBatteryCharging,
  settings: CiSettings,
  user: LuSquareUserRound,
  report: TbReportSearch,
};

export const renderIcon = (iconName, size) => {
    const IconComponent = iconMap[iconName]; // Tìm xem icon có tồn tại không
    if (!IconComponent) return null; // Trả về null nếu không tìm thấy icon

    return <IconComponent size={size} />; // Render icon
};