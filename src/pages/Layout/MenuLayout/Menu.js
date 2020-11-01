import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
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
import {Link} from 'react-router-dom';
import './Menu.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Avatar from '@material-ui/core/Avatar';
import api from '../../../services/api';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));



export default function MenuLayout({history,openMenu,setOpenDrawer}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openChangeGroupDialog, setOpenChangeGroupDialog] = React.useState(false);
  const [group,setGroup] = React.useState('');
  const [groups,setGroups] = React.useState(JSON.parse(Cookies.get('profiles')));
  const [lista1, setLista1] = React.useState(false);
  const [lista2, setLista2] = React.useState(false);
  const [lista3, setLista3] = React.useState(false);
  const [lista4, setLista4] = React.useState(false);


  if(group===''){
    var token = Cookies.get('token');
    var decoded = jwt_decode(token);
    console.log('decoded',decoded);
    setGroup(decoded.charge)
  }
  
  const handleClickOpen = () => {
    setOpen(true);
    console.log(group);
  };

  function handleClose0(){
    setOpen(false);
    Cookies.remove('tokenLogin');
    Cookies.remove('token');
    Cookies.remove('profiles');
    localStorage.clear();
  };

  async function handleListItemClick(id,charge){
    const {data} = await api.post('/login/profile',{profile_id:id,charge:charge,token:Cookies.get('tokenLogin')});
    console.log(data)
    Cookies.set('token',data.token);
    setGroup('')
    setOpenChangeGroupDialog(false)
    //history.push('/app/home')
}

const handleClick = () => {
  setLista1(!lista1);
  setLista2(false);
  setLista3(false);
  setLista4(false);
  setOpenDrawer(true)
};

const handleClick2 = () => {
  setLista2(!lista2);
  setLista1(false);
  setLista3(false);
  setLista4(false);
  setOpenDrawer(true)
};

const handleClick3 = () => {
  setLista3(!lista3);
  setLista1(false);
  setLista2(false);
  setLista4(false);
  setOpenDrawer(true)
};

const handleClick4 = () => {
  setLista4(!lista4);
  setLista1(false);
  setLista3(false);
  setLista2(false);
  setOpenDrawer(true)
};



  function ChangeUserGroup(){
    setOpenChangeGroupDialog(true);
  }

  const handleClose = () => {
    setOpen(false);
  };  
  try{
  return (
    <>
    {
      openMenu &&
      <center><p><b>{group}</b></p></center>
    }
    {
      group!==undefined && group!=='' && group!==null &&

    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
    {

      (group==='Encarregado de Educação' || group==='Professor') &&
    <Link to="/app/home" >
      <ListItem button >
        <ListItemIcon >
          <ViewList />
        </ListItemIcon>
        <ListItemText primary="Minhas requisições" className="BtnMenu"/>
      </ListItem>
    </Link>
    }
    
    <Link to="/app/new/request">
      <ListItem button>
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Nova requisição" />
      </ListItem>
    </Link>
    {
      (group!=='Encarregado de Educação' && group!=='Professor')&&
      <>
      <ListItem button onClick={handleClick2}>
        <ListItemIcon>
          <SettingsSystemDaydream />
        </ListItemIcon>
        <ListItemText primary="Adm. dados" />
        {lista2? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={lista2 && openMenu} timeout="auto" >
        <List component="div" disablePadding>
        <Link to="/app/add/manual">
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ImportContacts/>
            </ListItemIcon>
            <ListItemText primary="Manuais" />
          </ListItem>
        </Link>
        <Link to="/app/adopted/books">
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <LibraryBooks/>
            </ListItemIcon>
            <ListItemText primary="Manuais Adotados" />
          </ListItem>
        </Link>
        <Link to="/app/search/physicalbook">
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <FindInPage />
            </ListItemIcon>
            <ListItemText primary="Manuais Físicos" />
          </ListItem>
        </Link>
        <Link to="/app/add/subjects">
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <CollectionsBookmark />
            </ListItemIcon>
            <ListItemText primary="Disciplinas" />
          </ListItem>
        </Link>
        <Link to="/app/general/classes">
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Turmas (Geral)" />
          </ListItem>
        </Link>
        <Link to="/app/classes">
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Turmas" />
          </ListItem>
        </Link>
        <Link to="/app/add/resume">
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText primary="Criar Curriculos" />
          </ListItem>
        </Link>
        <Link to="/app/books/states">
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary="Estados dos manuais" />
          </ListItem>
        </Link>
        <Link to="/app/books/location">
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AddLocation />
            </ListItemIcon>
            <ListItemText primary="Localização dos manuais" />
          </ListItem>
        </Link>
        {
          group==='Administrador' &&
            <Link to="/app/schoolyears" >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText primary="Anos Letivos" />
              </ListItem>
            </Link>
        }
        </List>
      </Collapse>
      </>
    }
    {
      (group!=='Encarregado de Educação' && group!=='Professor')&&
      <>
      <ListItem button onClick={handleClick3}>
        <ListItemIcon>
          <Book />
        </ListItemIcon>
        <ListItemText primary="Requisições" />
        {lista3? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={lista3 && openMenu} timeout="auto" >
        <List component="div" disablePadding>
          <Link to="/app/requests">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <MenuBook />
              </ListItemIcon>
              <ListItemText primary="Reqs. por aprovar" />
            </ListItem>
          </Link>
          <Link to="/app/aproved/requests">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <PlaylistAddCheck />
              </ListItemIcon>
              <ListItemText primary="Reqs. aprovadas" />
            </ListItem>
          </Link>
          {
            (group!=='Professor')&&
            <Link to="/app/requisitions/states">
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Estados (req.)" />
              </ListItem>
            </Link>
          }
    
        </List>
      </Collapse>
      </>
    }
    {
      (group!=='Encarregado de Educação')&&
      <>
      <ListItem button onClick={handleClick4}>
        <ListItemIcon>
          <AllInbox />
        </ListItemIcon>
        <ListItemText primary="Entrega/Recolha" />
        {lista4? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={lista4 && openMenu} timeout="auto" >
        <List component="div" disablePadding>
          <Link to="/app/books/delivery">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Inbox/>
              </ListItemIcon>
              <ListItemText primary="Entrega de manuais" />
            </ListItem>
          </Link>
          <Link to="/app/books/return">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <AssignmentReturned />
              </ListItemIcon>
              <ListItemText primary="Recolha de manuais" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
      
      
    </>
  }
  {
    (group==='Administrador' || group==='Docente') &&
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Ferramentas" />
        {lista1? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={lista1 && openMenu} timeout="auto" >
        <List component="div" disablePadding>
          <Link to="/app/add/user">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText primary="Adicionar Utilizadores" />
            </ListItem>
          </Link>
          <Link to="/app/users">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Search/>
              </ListItemIcon>
              <ListItemText primary="Pesquisar Utilizador" />
            </ListItem>
          </Link>
          <Link to="/app/add/student">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ChildCare />
              </ListItemIcon>
              <ListItemText primary="Adicionar Aluno"/>
            </ListItem>
          </Link>
          <Link to="/app/students">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Pesquisar Alunos" />
            </ListItem>
          </Link>
          <Link to="/app/add/registration">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <PostAdd />
              </ListItemIcon>
              <ListItemText primary="Criar Matriculas" />
            </ListItem>
          </Link>
          <Link to="/app/registrations">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <FindInPage />
              </ListItemIcon>
              <ListItemText primary="Consultar Matriculas" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
      
    </>
  }
  {
    group==='xxx' &&
    <>
      <Link to="/app/permissions">
        <ListItem button>
          <ListItemIcon>
            <VpnKey />
          </ListItemIcon>
          <ListItemText primary="Gestor de permissões" />
        </ListItem>
      </Link>
    </>
  }
    
    <Link to="/app/account">
      <ListItem button>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary="Conta" />
      </ListItem>
    </Link>

  {
    Cookies.getJSON('profiles').length>1 &&
    <ListItem button onClick={ChangeUserGroup}>
      <ListItemIcon>
        <SyncAlt />
      </ListItemIcon>
      <ListItemText primary="Trocar de perfil" />
    </ListItem>
  }
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
    </List>
    }
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Tem a certeza que pretende sair?"}</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Link to="/login">
            <Button onClick={handleClose0} color="primary" autoFocus>
              Sair
            </Button>
          </Link>
        </DialogActions>
    </Dialog>

    <Dialog  aria-labelledby="simple-dialog-title" open={openChangeGroupDialog}>
        <DialogTitle id="simple-dialog-title">Entrar como:</DialogTitle>
        <List>
            {groups.map((group) => (
            <ListItem button onClick={() => handleListItemClick(group.id,group.charge)} key={group}>
                <ListItemAvatar>
                <Avatar className={classes.avatar}>
                    <PersonIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={group.charge} />
            </ListItem>
            ))}
        </List>
    </Dialog>

    </>
  );}catch(error){

  }
}



