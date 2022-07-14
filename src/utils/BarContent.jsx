import {MdOutlineDashboard} from 'react-icons/md';
import {RiDraftLine} from 'react-icons/ri';
import {GrOverview} from 'react-icons/gr';
import {BiDonateBlood} from 'react-icons/bi';
import {AiOutlineCompass} from 'react-icons/ai';

const BarItems = [
    {
        name: 'Home',
        link: '/dashboard',
        icon: <MdOutlineDashboard/>
    },

    {
        name: 'Explore',
        link: '',
        icon: <AiOutlineCompass/>
    },

    {
        name: 'Overview',
        link: '',
        icon: <GrOverview/>
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