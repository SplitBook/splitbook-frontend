
import React from 'react';
import Header from '../../Components/Header';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import api from '../../services/api';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import './AppStyles.css';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import api_formdata from '../../services/api_multipart_form_data';



const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(18),
      height: theme.spacing(18),
      borderRadius: 90,
      marginBottom:20,
    },
  }));

export default function InstitutionPage() {
    const classes = useStyles();
    const [showWarning, setShowWarning] = React.useState(false);
    const [fileimg, setFileimg] = React.useState({ file: null });
    const [institution, setInstitution] = React.useState({
        name:'Instituto dos Pupilos do Exércitio',
        email:'geral@pupilos.eu',
        phone:'929192803',
    });
    const [openEditInstitution, setOpenEditInstitution] = React.useState(false);
    const [editedInformation, setEditedInformation] = React.useState({
        name: null,
        email: null,
        phone: null,
      });

      async function SubmitConfirmation() {
        console.log('Info:::', editedInformation);
        const formData = new FormData();
        if (editedInformation.email !== null)
            formData.append('email', editedInformation.email);
        if (editedInformation.name !== null)
            formData.append('username', editedInformation.name);
        if (editedInformation.phone !== null)
            formData.append('phone', editedInformation.phone);
        if (fileimg.file !== null) 
            formData.append('photo', fileimg.file);
        /*const { data } = await api_formdata.put('/institution/' + user.id, formData);
        console.log('Data: ', data);
        setInstitution(data);*/
        handleClose();
      }

      const handleClose = () => {
        setOpenEditInstitution(false);
        setShowWarning(false);
      };

      function fileUpload(e) {
        fileimg.file = e.target.files[0];
      }

      function ChangeInstitutionInformation() {
        setShowWarning(true);
      }
    

    return (
        <>
          <Header title="Informações da Instituição" />
          <Grid container spacing={2}>
            <Grid item style={{marginRight:20}}>
                <Avatar
                    alt={institution.name}
                    src={fileimg}
                    className={classes.large}
                />
            </Grid>
            <Grid item>
                <Grid container spacing={2}>
                    <Grid item>
                        <>
                            <TextField
                                variant="outlined"
                                className={"maxwidth","textFild30"}
                                value={institution.name}
                                helperText="Nome da instituição"
                                disabled
                            />
                        </>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>
                        <>
                            <TextField
                                variant="outlined"
                                className={"maxwidth","textFild30"}
                                value={institution.email}
                                helperText="Endereço email"
                                disabled
                            />
                        </>
                    </Grid>
                </Grid>
            </Grid>
          </Grid>
          
          <Grid item>
          <Grid item>
              <Tooltip title="Editar dados da instituição">
                <Button
                  style={{marginTop:20}}
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setOpenEditInstitution(true);
                    setEditedInformation({
                        name: null,
                        email: null,
                        phone: null,
                    });
                  }}
                >
                  Editar dados
                </Button>
              </Tooltip>
            </Grid>
          </Grid>

            <Dialog
                open={openEditInstitution}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                Editar dados da instituição
                </DialogTitle>
                <DialogContent>
                <Grid container spacing={2}>
                    <Grid item>
                    
                    <TextField
                        variant="outlined"
                        defaultValue={institution.name}
                        onChange={(e) => (editedInformation.username = e.target.value)}
                        helperText="Nome da Instituição"
                    />
                    </Grid>
                    <Grid item>
                    <TextField
                        variant="outlined"
                        defaultValue={institution.email}
                        onChange={(e) => (editedInformation.email = e.target.value)}
                        helperText="Endereço de email"
                    />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>
                    <b>Descarregar logótipo da Instituição:</b>
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
                <Button onClick={ChangeInstitutionInformation} color="primary">
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
                <DialogTitle id="alert-dialog-title">Têm a certeza que pertente efetuar alterações aos dados da
                    instituição?</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Esta ação é permanente e os dados anteriores seram perdidos.
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