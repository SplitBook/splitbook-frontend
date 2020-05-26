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
import Cookies from 'universal-cookie';


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
  const cookies = new Cookies();
  const [grupo,setGrupo] = React.useState(cookies.get('Grupo'));


  const handleClickOpen = () => {
    setOpen(true);
    console.log(grupo);
  };

  const handleClose0 = () => {
    setOpen(false);
    //Apagar todas as cookies
  };

  const handleClose = () => {
    setOpen(false);
  };

  


  return (
    <>
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
    <Link to="/app/ee/home" >
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
      grupo!=='Encarregado de Educação' &&
      <>
      <Link to="/app/requests">
        <ListItem button>
          <ListItemIcon>
            <MenuBook />
          </ListItemIcon>
          <ListItemText primary="Lista de Requisições" />
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
    grupo!=='Encarregado de Educação' && grupo!=='Professor' &&
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

      <ListItem button>
        <ListItemIcon>
          <SyncAlt />
        </ListItemIcon>
        <ListItemText primary="Trocar de perfil" />
      </ListItem>

      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
    </List>

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
