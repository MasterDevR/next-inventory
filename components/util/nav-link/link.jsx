import { MdDashboard, MdOutlineInventory } from "react-icons/md";
import { FaFileAlt, FaChartBar } from "react-icons/fa";
import { FaUsersRectangle } from "react-icons/fa6";
const adminLink = [
  {
    href: "/",
    name: "Dashboard",
    icon: <MdDashboard size={"1.3rem"} />,
  },
  {
    href: "/report",
    name: "Report",
    icon: <FaChartBar />,
  },
  {
    href: "/inventory",
    name: "Manage Stock",
    icon: <MdOutlineInventory size={"1.3rem"} />,
  },
  {
    href: "/transaction",
    name: "Manage Request",
    icon: <FaFileAlt size={"1.3rem"} />,
  },

  {
    href: "/departments",
    name: "Manage Accounts",
    icon: <FaUsersRectangle size={"1.3rem"} />,
  },
];

const loadingNavLink = [
  {
    iconHolder: <div className="skeleton h-10 w-10"></div>,
    titleHolder: <div className="skeleton h-4 w-36"></div>,
  },
  {
    iconHolder: <div className="skeleton h-10 w-10"></div>,
    titleHolder: <div className="skeleton h-4 w-36"></div>,
  },
  {
    iconHolder: <div className="skeleton h-10 w-10"></div>,
    titleHolder: <div className="skeleton h-4 w-36"></div>,
  },
  {
    iconHolder: <div className="skeleton h-10 w-10"></div>,
    titleHolder: <div className="skeleton h-4 w-36"></div>,
  },
  {
    iconHolder: <div className="skeleton h-10 w-10"></div>,
    titleHolder: <div className="skeleton h-4 w-36"></div>,
  },
];
export { adminLink, loadingNavLink };
