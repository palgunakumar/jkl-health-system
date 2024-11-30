import { MdOutlineDashboard } from "react-icons/md";
import { Icon } from '@rsuite/icons';
import { FaBed,   FaCalendar,   FaUserNurse, FaUsers } from "react-icons/fa6";

export const CaregiverNavItems = [
    {
        eventKey: 'patients',
        icon: <Icon as={FaBed} />,
        title: 'Patients',
        to: 'patients',
    },
    {
        eventKey: 'care-givers',
        icon: <Icon as={FaUserNurse} />,
        title: 'Care-Givers',
        to: 'care-givers',
    },
    {
        eventKey: 'appointments',
        icon: <Icon as={FaCalendar} />,
        title: 'Apponintments',
        to: 'appointments',
    },
];