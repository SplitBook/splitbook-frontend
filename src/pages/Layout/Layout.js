import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuLayout from './MenuLayout/Menu';
import RoutesLayout from '../../routesService/routesLayout'
import logo from '../../assets/Icons/SplitBookRound/XD/icon_48.png';
import './Layout.css';
import Typography from '@material-ui/core/Typography';
import FloatingBtn from '../Components/FloatingBtn';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from 'react-gravatar'
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import api from '../../services/api';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor:'#0988e2'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginTop:10,
    borderRadius:100,
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    marginTop:10,
    borderRadius:100,
  },
}));




export default function MiniDrawer({history}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState();
  const [charge, setCharge] = React.useState('');
  
  setInfoAndCharge();

  async function setInfoAndCharge(){
    if(userInfo===null || userInfo===undefined){
      var token = Cookies.get('token');
      var decoded = jwt_decode(token);
      const {data} = await api.get('/users/'+decoded.user_id);
      setUserInfo(data);
      setCharge(decoded.charge);
    }
    //console.log("userinfo2",userInfo)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //console.log("Variavel do utilizador (Layout Page 119line)",UserData)

  const [name,setname] = React.useState('rafael.jpg');

  try{
    var userimage = require('../../assets/users/'+name); 
  }catch(e){
    var userimage = require('../../assets/users/notprofileimage.png'); 
  }



  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                [classes.hide]: open,
                })}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  Split
                </Typography>
                <img src={logo} alt="logotipo"/>
                <Typography variant="h6" noWrap>
                  Book
                </Typography>
        </Toolbar>
        
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <center>
        {
          (name!=='none' && !open &&
          <Avatar alt='User' src={userimage} className={classes.medium} />)
        
         ||

          (name==='none' && !open &&
          <Gravatar email="rafael@gmail.com" className={classes.medium} />)
        
          ||
          
          (name!=='none' && open &&
          <>
          <Avatar alt='User' src={userimage} className={classes.large} />
          <p>{userInfo.username}</p>
          <p><b>{charge}</b></p>
          </>)
        
          ||

          (name==='none' && open &&
          <>
          <Gravatar email="llsousa@gmail.com" className={classes.large} />
          <p>{userInfo.username}</p>
          <p><b>{charge}</b></p>
          </>)
        } 
        
        </center>
         <List>
            <MenuLayout history={history}/>
        </List>
        
      </Drawer>
      <main className={classes.content}>
      <div className={classes.toolbar} />
        <RoutesLayout/>
        <FloatingBtn history={history}/>
      </main>

    </div>
  );
  

}
