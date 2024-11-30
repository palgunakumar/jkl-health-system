import { MdOutlineDashboard } from "react-icons/md";
import { Icon } from '@rsuite/icons';
import { FaBed,   FaCalendar,   FaUser,   FaUserNurse, FaUsers } from "react-icons/fa6";

export const PatientsNavItems = [ 
     
    {
        eventKey: 'profile',
        icon: <Icon as={FaUser} />,
        title: 'My Information',
        to: 'user/profile',
    },
    {
        eventKey: 'appointments',
        icon: <Icon as={FaCalendar} />,
        title: 'Apponintments',
        to: 'appointments',
    },
];