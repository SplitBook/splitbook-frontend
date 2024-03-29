import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ListaFiliados from '../../Components/Tables/ListaFiliados';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import api from '../../services/api';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import Edit from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import './AppStyles.css';
import Header from '../../Components/Header';
import api_formdata from '../../services/api_multipart_form_data';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from 'react-gravatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    borderRadius: 100,
  },
}));

export default function AccountPage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({ pictures: [] });
  const [user, setUser] = React.useState([]);
  const [bool, setBool] = React.useState(true);
  const [openEditUser, setOpenEditUser] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);
  const token = Cookies.get('token');
  const [fileimg, setFileimg] = React.useState({ file: null });
  const [students, setStudents] = React.useState([]);

  function fileUpload(e) {
    //setFileimg(e.target.files[0])
    fileimg.file = e.target.files[0];
  }

  if (user.length === 0 && bool) {
    userinfo();
  }

  async function userinfo() {
    setBool(false);
    console.log('1: ', token);
    var decoded = jwt_decode(token);
    console.log('2: ', decoded);
    if (decoded.charge === 'Encarregado de Educação')
      getStudents(decoded.profile_id);
    var { data } = await api.get('/users/' + decoded.user_id);
    setTmp(data);
  }

  function setTmp(data) {
    var tmp = data;
    if (tmp.born_date !== null) {
      var new_date = tmp.born_date.split('T');
      tmp.born_date = new_date[0];
      console.log('info', new_date);
    }
    setUser(tmp);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEditUser(false);
    setShowWarning(false);
  };

  async function ChangePassword() {
    var dataPass = api.post('/recover-password?change_password=true', {
      email: user.email,
    });
    setOpen(false);
    console.log('infouser:', user.email, 'ChangePass_data', dataPass);
  }

  const [editedInformation, setEditedInformation] = React.useState({
    email: null,
    born_date: null,
    username: null,
    phone: null,
  });
  function ChangeUserInformation() {
    setShowWarning(true);
  }

  async function SubmitConfirmation() {
    console.log('Info:::', editedInformation);
    const formData = new FormData();
    if (editedInformation.phone !== null)
      formData.append('phone', editedInformation.phone);
    if (editedInformation.email !== null)
      formData.append('email', editedInformation.name);
    if (editedInformation.username !== null)
      formData.append('username', editedInformation.username);
    if (editedInformation.born_date !== null)
      formData.append('born_date', editedInformation.born_date);
    if (fileimg.file !== null) formData.append('photo', fileimg.file);
    const { data } = await api_formdata.put('/users/' + user.id, formData);
    console.log('Data: ', data);
    setTmp(data);
    handleClose();
  }

  async function getStudents(profile_id) {
    const { data } = await api.get('/guardians/' + profile_id);
    console.log('Students List: ', data);
    setStudents(data.students);
  }

  return (
    <>
      <Header title="Informações do utilizador" />
      {user.length !== 0 && (
        <>
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
                value={user.username}
                helperText="Nome de Utilizador"
                disabled
              />
            </Grid>
            <Grid item>
              <TextField
                type="date"
                variant="outlined"
                value={user.born_date}
                helperText="Data de nascimento"
                disabled
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                variant="outlined"
                value={user.phone}
                helperText="Nº de telemóvel"
                disabled
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                className="maxwidth"
                value={user.email}
                helperText="Endereço email"
                disabled
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Alterar palavra-passe
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Editar os meus dados">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setOpenEditUser(true);
                    setEditedInformation({
                      email: null,
                      born_date: null,
                      username: null,
                      phone: null,
                    });
                  }}
                >
                  <Edit />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>

          {jwt_decode(token).charge === 'Encarregado de Educação' && (
            <Grid container spacing={2}>
              <Grid item>
                <ListaFiliados rows={students} />
              </Grid>
            </Grid>
          )}
        </>
      )}

      <Dialog
        open={open}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Alteração de palavra-passe
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao clicar <b>Confirmar</b>, ser-lhe à enviado um email para proceder
            à alteração de palavra-passe de forma segura.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={ChangePassword} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditUser}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Editar dados do utilizador
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                variant="outlined"
                defaultValue={user.username}
                onChange={(e) => (editedInformation.username = e.target.value)}
                helperText="Nome de Utilizador"
              />
            </Grid>
            <Grid item>
              <TextField
                type="date"
                variant="outlined"
                defaultValue={user.born_date}
                onChange={(e) => (editedInformation.born_date = e.target.value)}
                helperText="Data de nascimento"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                type="number"
                variant="outlined"
                defaultValue={user.phone}
                onChange={(e) => (editedInformation.phone = e.target.value)}
                helperText="Nº de Telemóvel"
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                defaultValue={user.email}
                onChange={(e) => (editedInformation.email = e.target.value)}
                helperText="Endereço de email"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <b>Descarregar fotografia de perfil:</b>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <input type="file" onChange={fileUpload} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={ChangeUserInformation} color="primary">
            Submeter Alterações
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showWarning}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tem a certeza!?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem a certeza que pertente efetuar alterações aos seus dados de
            utilizador.
            <br />
            Ao prosseguir com as alterações a sua conta vai ficar indesponivel
            após o próximo <i>Logout</i>, para voltar a utilizar os serviços da{' '}
            <b>Split Book</b> deverá aceder ao seu email e confirmar as
            alterações.
            <br />
            <br />
            <b>Em caso de problemas contacte o administrador da plataforma!</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={SubmitConfirmation} 
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

/*




*/
