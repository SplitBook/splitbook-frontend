import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HomeIcon from '@material-ui/icons/Home';
import ViewList from '@material-ui/icons/ViewList';
//import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';
import ImportContacts from '@material-ui/icons/ImportContacts';
import AccountBox from '@material-ui/icons/AccountBox';
import VpnKey from '@material-ui/icons/VpnKey';
import AssignmentReturned from '@material-ui/icons/AssignmentReturned';
import AllInbox from '@material-ui/icons/AllInbox';
import {Link} from 'react-router-dom';

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
  //const [open, setOpen] = React.useState(true);

  /*const handleClick = () => {
    setOpen(!open);
  };*/


  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
    <Link to="/app/ee/home" >
      <ListItem button >
        <ListItemIcon >
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Página Inícial" className="BtnMenu"/>
      </ListItem>
    </Link>
    <Link to="/app/new/request">
      <ListItem button>
        <ListItemIcon>
          <ViewList />
        </ListItemIcon>
        <ListItemText primary="Lista de Requisições" />
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
    <Link to="/app/account">
      <ListItem button>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary="Conta" />
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
    <Link to="/app/permissions">
      <ListItem button>
        <ListItemIcon>
          <VpnKey />
        </ListItemIcon>
        <ListItemText primary="Gestor de permissões" />
      </ListItem>
    </Link>
    <Link to="/login">
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
    </Link>
    </List>
  );
}
