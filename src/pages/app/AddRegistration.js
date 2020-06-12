import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Header from '../Components/Header';

import './AppStyles.css';


export default function AddRegistration(){
    const [fileimg, setFileimg] = React.useState({file:null});
    const [teacher, setTeacher] = React.useState(false);
    const [guardian, setGuardian] = React.useState(false);
    const [instructor, setInstructor] = React.useState(false);
    const [admin, setAdmin] = React.useState(false);

    function fileUpload(e){
      //setFileimg(e.target.files[0])
      fileimg.file=e.target.files[0]
      console.log("file::: ",fileimg);
    }

    const handleChangeTeacher = (event) => {
      setTeacher(event.target.checked);
    };

    return (
      <>
      <Header title='Criar matrícula'/>
      <div>
        <Grid container spacing={2}>
            <Grid item >
              <TextField variant="outlined" defaultValue='' helperText="Nome de Utilizador"/>
            </Grid>
            <Grid item >
              <TextField type="date" variant="outlined" defaultValue='' helperText="Data de nascimento"/>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item >
            <TextField variant="outlined" defaultValue='' helperText="Nº de telemóvel"/>
          </Grid>
          <Grid item >
            <TextField variant="outlined" className="maxwidth" defaultValue='' helperText="Endereço email"/>
          </Grid>
        </Grid>
        <div className="margTop">
        <Grid container spacing={2}>
            <Grid item >
              <b>Descarregar fotografia de perfil:</b>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item >
              <input type="file" onChange={fileUpload} />
            </Grid>
        </Grid>
        </div>
        <div className="margTop">
        <Grid container spacing={2} >
            <Grid item >
              <b>Selecione os perfis: </b>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item >
              <Checkbox
                checked={teacher}
                color="primary"
                onChange={handleChangeTeacher}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              Professor
            </Grid>
            <Grid item >
              <Checkbox
                checked={guardian}
                color="primary"
                onChange={handleChangeTeacher}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              Encarregado de Educação
            </Grid>
            <Grid item >
              <Checkbox
                checked={instructor}
                color="primary"
                onChange={handleChangeTeacher}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              Docente
            </Grid>
            <Grid item >
              <Checkbox
                checked={admin}
                color="primary"
                onChange={handleChangeTeacher}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              Admin
            </Grid>
        </Grid>
        </div>
        <div className="margTop">
          <Button variant="outlined" color="primary" >
            Criar Matrícula
          </Button>
        </div>
        
      </div>
      </>
      );

}

//registration