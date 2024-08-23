import { MdDashboard, MdOutlineInventory } from "react-icons/md";
import { FaFileAlt, FaChartBar } from "react-icons/fa";
import { FaUsersRectangle } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa6";
const adminLink = [
  {
    href: "/",
    name: "Dashboard",
    icon: <MdDashboard size={"1.5rem"} />,
  },
  {
    href: "/inventory",
    name: "Inventory",
    icon: <MdOutlineInventory size={"1.5rem"} />,
  },
  {
    href: "/transaction",
    name: "Transaction",
    icon: <FaFileAlt size={"1.5rem"} />,
  },
  {
    href: "/report",
    name: "Report",
    icon: <FaChartBar size={"1.5rem"} />,
  },
  {
    href: "/departments",
    name: "Departments",
    icon: <FaUsersRectangle size={"1.5rem"} />,
  },
  {
    href: "/stock",
    name: "Request Item",
    icon: <FaListUl size={"1.5rem"} />,
  },
];

const department = [
  {
    href: "/",
    name: "Dashboard",
    icon: <MdDashboard size={"1.5rem"} />,
  },
  {
    href: "/inventory",
    name: "Inventory",
    icon: <MdOutlineInventory size={"1.5rem"} />,
  },
  {
    href: "/transaction",
    name: "Transaction",
    icon: <FaFileAlt size={"1.5rem"} />,
  },
  {
    href: "/report",
    name: "Report",
    icon: <FaChartBar size={"1.5rem"} />,
  },
  {
    href: "/stock",
    name: "Request Item",
    icon: <FaListUl size={"1.5rem"} />,
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
export { adminLink, loadingNavLink, department };
