import { MdDashboard, MdOutlineInventory } from "react-icons/md";
import { FaFileAlt, FaChartBar } from "react-icons/fa";
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
    href: "/request",
    name: "Request",
    icon: <FaFileAlt size={"1.5rem"} />,
  },
  {
    href: "/report",
    name: "Report",
    icon: <FaChartBar size={"1.5rem"} />,
  },
];

export { adminLink };
