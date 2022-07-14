import {MdOutlineDashboard} from 'react-icons/md';
import {RiDraftLine} from 'react-icons/ri';
import {GrOverview} from 'react-icons/gr';
import {BiDonateBlood , BiPencil} from 'react-icons/bi';
import {AiOutlineCompass} from 'react-icons/ai';

const BarItems = [
    {
        name: 'Overview',
        link: '/dashboard',
        icon: <MdOutlineDashboard/>
    },

    {
        name: 'Schedule',
        link: '/dashboard/explore',
        icon: <AiOutlineCompass/>
    },

    {
        name: 'Write',
        link: '/dashboard/write',
        icon: <BiPencil/>
    },
    {
        name: 'Donations ',
        link: '/dashboard/donations',
        icon: <BiDonateBlood/>
    },
    {
        name: 'Draft',
        link: '/dashboard/draft',
        icon: <RiDraftLine/>
    }

]

export default BarItems;