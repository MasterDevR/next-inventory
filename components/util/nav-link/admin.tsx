import { MdDashboard, MdOutlineInventory } from "react-icons/md";
import { FaFileAlt, FaChartBar } from "react-icons/fa";
import { FaUsersRectangle } from "react-icons/fa6";
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
    href: "/department",
    name: "Department",
    icon: <FaUsersRectangle size={"1.5rem"} />,
  },
];

export { adminLink };
