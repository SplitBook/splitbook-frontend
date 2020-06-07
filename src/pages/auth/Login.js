import React, {useState} from 'react';
import apiLogin from '../../services/apiLogin';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/Icons/SplitBookTransparent/XD/icon_192.png';
import './Auth.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Cookies from 'js-cookie';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import jwt_decode from 'jwt-decode';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
  }));

const groups = [];

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
    
    if(props.open){
        setInfoAndCharge();
    }
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
    
    async function setInfoAndCharge(){
        console.log("OK");
        var token = Cookies.get('token');
        var decoded = jwt_decode(token);
        try{
            const {data} = await apiLogin.get('/users/'+decoded.user_id);
            for(var i=0;i<data.profiles.lenght;i++){
                groups.push(data.profiles[i]);
            }
        }
        catch(error){
            console.log(error);
        }
        
    }
    
  
    return (
      <>
      <Dialog  aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title">Entrar como:</DialogTitle>
          <List>
              {groups.map((group) => (
              <ListItem button onClick={() => handleListItemClick(group)} key={group}>
                  <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                      <PersonIcon />
                  </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={group} />
              </ListItem>
              ))}
          </List>
      </Dialog>
      </>
    );
  }
  

export default function Login({ history,props}){
    const classes = useStyles();
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [open, setOpen] = React.useState(false);
    
    const [opengroups, setOpengroups] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(groups[0]);

    const [activebackdrop, setActivebackdrop] = React.useState(false);

    //console.log(props,history)

    //admin@splitbook.com
    //admin

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            localStorage.clear();
            const {data} = await apiLogin.post('/login',{email: username,password: password});
            console.log(data);
            Cookies.set('tokenLogin',data.token,{ expires: 7 });
            Cookies.set('profiles',data.user.profiles,{ expires: 7 });
            console.log(data.user.profiles.length)
            if(data.user.profiles.length!==1){
                setOpengroups(true);
            }
            else{
                const data2 = await apiLogin.post('/login/profile',{profile_id:data.user.profiles[0].id,charge:data.user.profiles[0].name,token:data.token});
                console.log("Login2:: ",data2.data);
                Cookies.set('token',data2.data.token,{ expires: 7 });
                sleep(4000)
                console.log("Ei there!",Cookies.get('token'),data2)
                localStorage.setItem('name',data.user.username)
                history.push('/app/home')
            }     
        }
        catch(Error){
            Cookies.remove('tokenLogin')
            console.log('Authentication Error:',Error)
            setOpen(true);
        }
        
        //setOpen(true); //mensagem de error
        /*console.log(username);
        const response = await api.post('/devs',{
          username:username ,
        });
        console.log(response)
        const {_id}= response.data
        history.push(`/dev/${_id}`);*/
    }

    async function redirectToRecoverPassword(){
        history.push('/recover/password')
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    return(
        <>
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="logotipo"/>
                <input 
                    placeholder="Username"
                    value={username}
                    type="usernam"
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    placeholder="Password"
                    value={password}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <p onClick={redirectToRecoverPassword}>Recuperar password</p>
                <button type="submit" className="btnLogin">LOGIN </button>
                <div>
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                    Acesso Negado!
                    </Alert>
                </Snackbar>
                </div>
            </form>
        </div>
        <div>
            <SimpleDialog selectedValue={selectedValue} open={opengroups} onClose={handleClose} />
        </div>
        <div>
            <Backdrop className={classes.backdrop} autoHideDuration={5000} open={activebackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop> 
        </div>
        </>
    );
}

