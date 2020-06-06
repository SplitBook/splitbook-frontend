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
import AccountBox from '@material-ui/icons/AccountBox';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import SyncAlt from '@material-ui/icons/SyncAlt';
import VpnKey from '@material-ui/icons/VpnKey';
import AssignmentReturned from '@material-ui/icons/AssignmentReturned';
import AllInbox from '@material-ui/icons/AllInbox';
import {Link} from 'react-router-dom';
import './Menu.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';


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


export default function MenuLayout({history}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [group,setGroup] = React.useState('');

  if(group===''){
    var token = Cookies.get('token');
    var decoded = jwt_decode(token);
    setGroup(decoded.charge)
  }
  
  const handleClickOpen = () => {
    setOpen(true);
    console.log(group);
  };

  const handleClose0 = () => {
    setOpen(false);
    Cookies.remove('tokenLogin');
    Cookies.remove('token');
    Cookies.remove('profiles');
    localStorage.clear();
  };

  const handleClose = () => {
    setOpen(false);
  };  

  return (
    <>
    {
      group!==undefined && group!=='' && group!==null &&

    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
    <Link to="/app/home" >
      <ListItem button >
        <ListItemIcon >
          <ViewList />
        </ListItemIcon>
        <ListItemText primary="Minhas requisições" className="BtnMenu"/>
      </ListItem>
    </Link>
    <Link to="/app/new/request">
      <ListItem button>
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Nova requisição" />
      </ListItem>
    </Link>
    {
      group!=='Encarregado de Educação' &&
      <>
      <Link to="/app/requests">
        <ListItem button>
          <ListItemIcon>
            <MenuBook />
          </ListItemIcon>
          <ListItemText primary="Reqs. por aprovar" />
        </ListItem>
      </Link>
      <Link to="/app/aproved/requests">
        <ListItem button>
          <ListItemIcon>
            <PlaylistAddCheck />
          </ListItemIcon>
          <ListItemText primary="Reqs. aprovadas" />
        </ListItem>
      </Link>
      <Link to="/app/add/manual">
        <ListItem button>
          <ListItemIcon>
            <ImportContacts/>
          </ListItemIcon>
          <ListItemText primary="Manuais" />
        </ListItem>
      </Link>
      <Link to="/app/add/publisher">
        <ListItem button>
          <ListItemIcon>
            <CollectionsBookmark />
          </ListItemIcon>
          <ListItemText primary="Editoras" />
        </ListItem>
      </Link>
      <Link to="/app/books/delivery">
        <ListItem button>
          <ListItemIcon>
            <AllInbox />
          </ListItemIcon>
          <ListItemText primary="Entrega de Livros" />
        </ListItem>
      </Link>
      <Link to="/app/books/return">
        <ListItem button>
          <ListItemIcon>
            <AssignmentReturned />
          </ListItemIcon>
          <ListItemText primary="Recolha de Livros" />
        </ListItem>
      </Link>
    </>
  }
  {
    group==='Administrador' &&
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
    <Link to="/user/group">
      <ListItem button>
        <ListItemIcon>
          <SyncAlt />
        </ListItemIcon>
        <ListItemText primary="Trocar de perfil" />
      </ListItem>
    </Link>
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
            <Button onClick={handleClose0} color="primary">
              Sair
            </Button>
          </Link>
          
        </DialogActions>
    </Dialog>

    </>
  );
}
