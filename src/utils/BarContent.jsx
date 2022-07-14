import {
  MdOutlineDashboard,
  MdOutlineArticle,
  MdOutlineAutoGraph,
  MdOutlineMarkEmailRead,
} from "react-icons/md";
import { BiDonateHeart, BiPencil } from "react-icons/bi";
import { IoIosTimer } from "react-icons/io";
import { RiAddLine } from 'react-icons/ri'
import {FaPencilAlt} from 'react-icons/fa'

const BarItems = [
  {
    // hide on desktop and show on mobile
    name: "Write",
    link: "/dashboard/write",
    icon: <FaPencilAlt />,
    mobileView: false,
    styles : {
      
      color : 'white',
      padding : '0.7em',
      borderRadius: '010em',
      backgroundColor : 'var(--primary-color)',
    }
    
  },
  {
    name: "Overview",
    link: "/dashboard",
    icon: <MdOutlineDashboard />,
    mobileView: true,
    styles : {
     
      padding : '0.2em 0.6em',
      
    }
  },


  



  {
    name: "Posts",
    link: "/dashboard/posts",
    icon: <MdOutlineArticle />,
    mobileView: true,
    styles : {
     
      padding : '0.2em 0.6em',
      
    }
  },

  {
    name: "Write",
    link: "/dashboard/write",
    icon: <BiPencil />,
    mobileView: true,
    hideDesktop: true,
    bg: 'blue.500',
    styles : {
      
      color : 'white',
      padding : '0.2em 0.6em',
      borderRadius: '0.3em',
    }
  },

  {
    name: "Scheduled",
    link: "/dashboard/scheduled",
    icon: <IoIosTimer />,
    mobileView: true,
    
    styles : {
     
      padding : '0.2em 0.6em',
      
    }
  },

  {
    name: "Donations ",
    link: "/dashboard/donations",
    icon: <BiDonateHeart />,
    mobileView: true,
    styles : {
     
      padding : '0.2em 0.6em',
      
    }
  },
  {
    name: "Analytics",
    link: "/dashboard/analytics",
    icon: <MdOutlineAutoGraph />,
    mobileView: false,
    
  },
  {
    name: "Newsletter",
    link: "/dashboard/newsletter",
    icon: <MdOutlineMarkEmailRead />,
    mobileView: false,
  },
];

export default BarItems;
