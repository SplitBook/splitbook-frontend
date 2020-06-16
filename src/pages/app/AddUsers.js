import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Header from '../Components/Header';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import api from '../../services/api';
import './AppStyles.css';


export default function AddUsers(){
    const [fileimg, setFileimg] = React.useState({file:null});
    const [teacher, setTeacher] = React.useState(false);
    const [guardian, setGuardian] = React.useState(false);
    const [instructor, setInstructor] = React.useState(false);
    const [admin, setAdmin] = React.useState(false);
    const token = Cookies.get('token');
    var decoded = jwt_decode(token)
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [born_date, setBorn_date] = React.useState('');
    const [phone, setPhone] = React.useState('');

    function fileUpload(e){
      //setFileimg(e.target.files[0])
      fileimg.file=e.target.files[0]
      console.log("file::: ",fileimg);
    }

    const handleChangeTeacher = (event) => {
      setTeacher(event.target.checked);
    };

    const handleChangeGuardian = (event) => {
      setGuardian(event.target.checked);
    };

    const handleChangeInstructor = (event) => {
      setInstructor(event.target.checked);
    };

    const handleChangeAdmin = (event) => {
      setAdmin(event.target.checked);
    };

    async function submit(){
      const formData = new FormData();
      formData.append('username',username);
      formData.append('email',email);
      if(fileimg.file!==null)
        formData.append('photo',fileimg.file)
      if(born_date!==null)
        formData.append('born_date',born_date);
      if(phone!==null)
        formData.append('phone',phone);
      try{
        const {data} = await api.post('/users',formData);
        console.log(data);
        if(teacher){
          api.post('/teachers',{name:data.username,user_id:data.id});
        }
        if(guardian){
          api.post('/guardians',{name:data.username,user_id:data.id});
        }
        if(instructor){
          api.post('/accounts',{name:data.username,user_id:data.id});
        }
        if(admin){
          api.post('/accounts',{name:data.username,user_id:data.id,administrator:true});
        }
      }
      catch(error){
        alert('Erro! Preencha corretamente os campos!')
        setBorn_date('')
        setEmail('')
        setPhone('')
        setUsername('')
        setAdmin(false)
        setGuardian(false)
        setInstructor(false)
        setTeacher(false)
      }
      setBorn_date('')
      setEmail('')
      setUsername('')
      setPhone('')
      setAdmin(false)
      setGuardian(false)
      setInstructor(false)
      setTeacher(false)
    }

    return (
      <>
      <Header title='Adicionar utilizador'/>
      <div>
        <Grid container spacing={2}>
            <Grid item >
              <TextField variant="outlined" value={username} onChange={e => setUsername(e.target.value)} helperText="* Nome de Utilizador"/>
            </Grid>
            <Grid item >
              <TextField type="date" variant="outlined" value={born_date} onChange={e => setBorn_date(e.target.value)} helperText="Data de nascimento"/>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item >
            <TextField variant="outlined" value={phone} onChange={e => setPhone(e.target.value)} helperText="Nº de telemóvel"/>
          </Grid>
          <Grid item >
            <TextField variant="outlined" className="maxwidth" value={email} onChange={e => setEmail(e.target.value)} helperText=" * Endereço email"/>
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
                onChange={handleChangeGuardian}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              Encarregado de Educação
            </Grid>
            {
              decoded.charge==='Administrador' &&
              <>
              <Grid item >
              <Checkbox
                  checked={instructor}
                  color="primary"
                  onChange={handleChangeInstructor}
                  disabled={admin}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                Secretaria
              </Grid>
              <Grid item >
                <Checkbox
                  checked={admin}
                  color="primary"
                  onChange={handleChangeAdmin}
                  disabled={instructor}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  //disabled={(instructor || teacher)? false:true}
                />
                Admin
              </Grid>
              </>
            }
            
        </Grid>
        </div>
        <div className="margTop">
          <Button variant="outlined" color="primary" onClick={submit} disabled={(username==='' || email==='' || (!teacher && !instructor && !guardian && !admin))?true:false}>
            Adicionar Utilizador
          </Button>
        </div>
        
      </div>
      </>
      );

}

//registration