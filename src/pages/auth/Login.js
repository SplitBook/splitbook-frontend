import React, { useState } from 'react';
import api from '../../services/api';
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

function SimpleDialog(props) {
  const classes = useStyles();
  const { groups, history, open } = props;
  //const [groups,setGroups]= useState([])
  const [bool, setBool] = useState(true);

  if (bool) setInfoAndCharge();

  async function handleListItemClick(id, charge) {
    const { data } = await api.post('/login/profile', {
      profile_id: id,
      charge: charge,
      token: Cookies.get('tokenLogin'),
    });
    console.log(data);
    var decoded = jwt_decode(data.token);
    Cookies.set('token', data.token);
    if (
      decoded.charge === 'Encarregado de Educação' ||
      decoded.charge === 'Professor'
    )
      history.push('/app/home');
    else {
      history.push('/app/requests');
    }
  }

  function setInfoAndCharge() {
    if (groups.length !== 0) setBool(false);
  }

  return (
    <>
      {groups.length !== 0 && (
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title">Entrar como:</DialogTitle>
          <List>
            {groups.map((group) => (
              <ListItem
                button
                onClick={() => handleListItemClick(group.id, group.charge)}
                key={group}
              >
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
      )}
    </>
  );
}

export default function Login({ history, props }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const [opengroups, setOpengroups] = React.useState(false);
  const [groups, setGroups] = React.useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      localStorage.clear();
      const { data } = await api.post('/login', {
        email: username,
        password: password,
      });

      Cookies.set('tokenLogin', data.token);
      Cookies.set('profiles', data.user.profiles);
      setGroups(data.user.profiles);

      if (data.user.profiles.length === 0) {
        alert('Erro!! Utilizador sem perfis!');
        history.push('/login');
      } else if (data.user.profiles.length > 1) {
        setOpengroups(true);
      } else {
        const data2 = await api.post('/login/profile', {
          profile_id: data.user.profiles[0].id,
          charge: data.user.profiles[0].charge,
          token: Cookies.get('tokenLogin'),
        });
        var decoded = jwt_decode(data2.data.token);

        Cookies.set('token', data2.data.token);

        localStorage.setItem('name', data.user.username);
        if (
          decoded.charge === 'Encarregado de Educação' ||
          decoded.charge === 'Professor'
        )
          history.push('/app/home');
        else {
          history.push('/app/requests');
        }
      }
    } catch (Error) {
      Cookies.remove('tokenLogin');
      console.log('Authentication Error:', Error);
      setOpen(true);
      setPassword('');
    }
  }

  async function redirectToRecoverPassword() {
    history.push('/recover/password');
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="logotipo" />
          <input
            placeholder="Email"
            value={username}
            type="email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p onClick={redirectToRecoverPassword}>Recuperar password</p>
          <button type="submit" className="btnLogin">
            LOGIN{' '}
          </button>
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
        <SimpleDialog open={opengroups} history={history} groups={groups} />
      </div>
    </>
  );
}

/* 

*/
