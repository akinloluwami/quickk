import {
  MdOutlineDashboard,
  MdOutlineArticle,
  MdOutlineAutoGraph,
  MdOutlineMarkEmailRead,
} from "react-icons/md";
import { BiDonateHeart, BiPencil } from "react-icons/bi";
import { IoIosTimer } from "react-icons/io";
const BarItems = [
  {
    name: "Write",
    link: "/dashboard/write",
    icon: <BiPencil />,
  },
  {
    name: "Overview",
    link: "/dashboard",
    icon: <MdOutlineDashboard />,
  },

  {
    name: "Posts",
    link: "/dashboard/posts",
    icon: <MdOutlineArticle />,
  },
  {
    name: "Scheduled",
    link: "/dashboard/scheduled",
    icon: <IoIosTimer />,
  },

  {
    name: "Donations ",
    link: "/dashboard/donations",
    icon: <BiDonateHeart />,
  },
  {
    name: "Analytics",
    link: "/dashboard/analytics",
    icon: <MdOutlineAutoGraph />,
  },
  {
    name: "Newsletter",
    link: "/dashboard/newsletter",
    icon: <MdOutlineMarkEmailRead />,
  },
];

export default BarItems;
