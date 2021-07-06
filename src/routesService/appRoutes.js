
import Main from '../pages/app/MainPageEE';
import NewRequest from '../pages/app/NewRequest';
import Manual from '../pages/app/Manuals';
import AccountPage from '../pages/app/AccountPage';
import PermissionsManagement from '../pages/app/PermissionsManagement';
import BooksDelivery from '../pages/app/BooksDelivery';
import BooksReturn from '../pages/app/BooksReturn';
import AllRequests from '../pages/app/AllRequests';
import AprovedRequests from '../pages/app/AprovedRequests';
import Subjects from '../pages/app/Subjects';
import AddUsers from '../pages/app/AddUsers';
import AddStudent from '../pages/app/AddStudent';
import AddRegistration from '../pages/app/AddRegistration';
import GeneralClasses from '../pages/app/GeneralClasses';
import SchoolYears from '../pages/app/SchoolYears';
import AddResumes from '../pages/app/AddResumes';
import SearchPhysicalBook from '../pages/app/SearchPhysicalBook';
import BookStates from '../pages/app/BookStates';
import BooksLocations from '../pages/app/BooksLocations';
import Classes from '../pages/app/Classes';
import SchoolEnrollments from '../pages/app/SchoolEnrollments';
import RequisitionsStates from '../pages/app/RequisitionsStates';
import AdoptedBooks from '../pages/app/AdoptedBooks';
import SearchUsers from '../pages/app/SearchUsers';
import Students from '../pages/app/Students';
import Details from '../pages/app/Details';
import InstitutionPage from '../pages/app/InstitutionPage';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuBook from '@material-ui/icons/MenuBook';
import ViewList from '@material-ui/icons/ViewList';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';
import ImportContacts from '@material-ui/icons/ImportContacts';
import Search from '@material-ui/icons/Search';
import AccountBox from '@material-ui/icons/AccountBox';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import SyncAlt from '@material-ui/icons/SyncAlt';
import VpnKey from '@material-ui/icons/VpnKey';
import Description from '@material-ui/icons/Description';
import Star from '@material-ui/icons/Star';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import AddLocation from '@material-ui/icons/AddLocation';
import AccessTime from '@material-ui/icons/AccessTime';
import AssignmentReturned from '@material-ui/icons/AssignmentReturned';
import AllInbox from '@material-ui/icons/AllInbox';
import Inbox from '@material-ui/icons/Inbox';
import FindInPage from '@material-ui/icons/FindInPage';
import GroupAdd from '@material-ui/icons/GroupAdd';
import ChildCare from '@material-ui/icons/ChildCare';
import PostAdd from '@material-ui/icons/PostAdd';
import Book from '@material-ui/icons/Book';
import Settings from '@material-ui/icons/Settings';
import SettingsSystemDaydream from '@material-ui/icons/SettingsSystemDaydream';
import ListAlt from '@material-ui/icons/ListAlt';
import notAllowedPage from '../pages/error/notAllowedPage';
import {
  FaHome,
  FaRegCalendarAlt,
  FaListUl,
  FaPlusCircle,
  FaUsers,
  FaTrophy,
  FaTag,
  FaRegHeart,
  FaClipboard,
  FaClipboardCheck,
  FaClock,
  FaUser
} from "react-icons/fa";


/** (Object route)
 * path: string
 * name: string
 * icon: string
 * redirect: bool
 * exact: bool
 * component: Component
 * subpaths: [(Object route)]
 */

 

const applicationRoutes = [
    {
        path: "/app/institution",
        name: "Instituição",
        redirect: true,
        component: InstitutionPage,
        icon: ViewList,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/notAllowedPage",
        name: "notAllowedPage",
        redirect: true,
        component: notAllowedPage,
        icon: ViewList,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/home",
        name: "Minhas requisições",
        redirect: true,
        component: Main,
        icon: ViewList,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/schoolenrollments/:id",
        name: "Details",
        redirect: true,
        component: Details,
        icon: null,
        auth: true,
        role: 3,
        show: false
    },
    {
        path: "/app/books/location",
        name: "Localização dos manuais",
        redirect: true,
        component: BooksLocations,
        icon: AddCircleOutlineIcon,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/aproved/requests",
        name: "Reqs. aprovadas",
        redirect: true,
        component: AprovedRequests,
        icon: PlaylistAddCheck,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/users",
        name: "Pesquisar Utilizador",
        redirect: true,
        component: SearchUsers,
        icon: Search,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/students",
        name: "Pesquisar Alunos",
        redirect: true,
        component: Students,
        icon: Search,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/search/physicalbook",
        name: "Manuais Físicos",
        redirect: true,
        component: SearchPhysicalBook,
        icon: FindInPage,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/books/states",
        name: "Estados dos manuais",
        redirect: true,
        component: BookStates,
        icon: Star,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/add/resume",
        name: "Criar Curriculos",
        redirect: true,
        component: AddResumes,
        icon: Description,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/schoolyears",
        name: "Anos Letivos",
        redirect: true,
        component: SchoolYears,
        icon: AccessTime,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/adopted/books",
        name: "Manuais Adotados",
        redirect: true,
        component: AdoptedBooks,
        icon: LibraryBooks,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/requisitions/states",
        name: "Estados (req.)",
        redirect: true,
        component: RequisitionsStates,
        icon: ListAlt,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/general/classes",
        name: "Turmas (Geral)",
        redirect: true,
        component: GeneralClasses,
        icon: ListAlt,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/classes",
        name: "Turmas",
        redirect: true,
        component: Classes,
        icon: ListAlt,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/add/registration",
        name: "Criar Matriculas",
        redirect: true,
        component: AddRegistration,
        icon: PostAdd,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/registrations",
        name: "Consultar Matriculas",
        redirect: true,
        component: SchoolEnrollments,
        icon: FindInPage,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/add/user",
        name: "Adicionar Utilizadores",
        redirect: true,
        component: AddUsers,
        icon: GroupAdd,
        auth: true,
        role: 3,
        show: true
    },
    {
        path: "/app/add/student",
        name: "Adicionar Aluno",
        redirect: true,
        component: AddStudent,
        icon: ChildCare,
        auth: true,
        role: 3,
        show: true
    },
    {
      path: "/app/books/return",
      name: "Recolha de manuais",
      redirect: true,
      component: BooksReturn,
      icon: AssignmentReturned,
      auth: true,
      role: 3,
      show: true
  },
  {
      path: "/app/requests",
      name: "Reqs. por aprovar",
      redirect: true,
      component: AllRequests,
      icon: MenuBook,
      auth: true,
      role: 3,
      show: true
  },
  {
    path: "/app/new/request",
    name: "Nova requisição",
    redirect: true,
    component: NewRequest,
    icon: AddCircleOutlineIcon,
    auth: true,
    role: 3,
    show: true
  },
  {
    path: "/app/add/manual",
    name: "Manuais",
    redirect: true,
    component: Manual,
    icon: ImportContacts,
    auth: true,
    role: 3,
    show: true
  },
  {
    path: "/app/add/subjects",
    name: "Disciplinas",
    redirect: true,
    component: Subjects,
    icon: CollectionsBookmark,
    auth: true,
    role: 3,
    show: true
  },
  {
    path: "/app/account",
    name: "Conta",
    redirect: true,
    component: AccountPage,
    icon: AccountBox,
    auth: true,
    exact: true,
    role: 3,
    show: true
  },
  {
    path: "/app/permissions",
    name: "Gestor de permissões",
    redirect: false,
    component: PermissionsManagement,
    icon: VpnKey,
    auth: true,
    exact: true,
    role: 3,
    show: false
  },
  {
    path: "/app/books/delivery",
    name: "Entrega de manuais",
    redirect: true,
    component: BooksDelivery,
    icon: Inbox,
    exact: true,
    auth: true,
    role: 0,
    show: true
  },
];

export default applicationRoutes;
