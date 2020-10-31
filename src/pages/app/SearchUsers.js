import React from 'react';
import TextField from '@material-ui/core/TextField';
import Header from '../../Components/Header';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './AppStyles.css';
import api from '../../services/api';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from 'react-gravatar';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    borderRadius: 100,
  },
}));

export default function SearchUsers() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [usersList, setUsersList] = React.useState([]);

  const handlerAutoCompleteUsers = (event) => {
    var tmp = '';
    tmp = event.target.value;
    if (tmp.length > 2) getUsers(tmp);
  };

  async function getUsers(tmp) {
    const { data } = await api.get('/users?search=' + tmp);
    setUsersList(data.data);
  }

  return (
    <>
      <Header title="Pesquisar Utilizadores" />
      <div>
        <Grid container spacing={1}>
          <Grid item>
            <Autocomplete
              options={usersList}
              getOptionLabel={(option) =>
                option.username + ' - ' + option.email
              }
              style={{ width: 300 }}
              onChange={(event, newValue) => {
                console.log(newValue);
                setUser(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Utilizador"
                  onChange={handlerAutoCompleteUsers}
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>

        {user && (
          <>
            <div className="margTop">
              <Grid container spacing={2}>
                <Grid item>
                  {(user.photo !== null && (
                    <>
                      <Avatar
                        alt="User"
                        src={user.photo}
                        className={classes.large}
                      />
                    </>
                  )) ||
                    (user.photo === null && (
                      <>
                        <Gravatar
                          email={user.email}
                          default="mp"
                          className={classes.large}
                        />
                      </>
                    ))}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    variant="outlined"
                    defaultValue={user.email}
                    helperText="Email"
                    disabled
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    defaultValue={user.phone}
                    helperText="Telemóvel"
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox checked={user.email_confirmed} disabled />
                    }
                    label="Conta ativa"
                  />
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </div>
    </>
  );
}

//registration
