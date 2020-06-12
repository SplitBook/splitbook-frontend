import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from '../Components/Header';
import api from '../../services/api';
import './AppStyles.css';


export default function AddStudent(){
  const [name, setName] = React.useState(null);
  const [num, setNum] = React.useState(null);
  const [born_date, setBorn_date] = React.useState(null);

    async function submit(){
      console.log(name,num,born_date);
      try{
        const {data} = await api.post('/students',{name:name,number:num,born_date:born_date});
        console.log(data);
      }
      catch(error){
        alert('Erro! Preencha corretamente os campos!')
        setBorn_date(null)
        setNum(null)
        setName(null)
      }
      setBorn_date('')
      setNum('')
      setName('')
    }
    
    return (
      <>
      <Header title='Adicionar aluno'/>
      <div>
        <Grid container spacing={2}>
          <Grid item >
            <TextField variant="outlined" value={name} onChange={e => setName(e.target.value)} helperText="* Nome do Aluno"/>
          </Grid>
          <Grid item >
            <TextField variant="outlined" className="maxwidth" placeholder="ex: 349/12" value={num} onChange={e => setNum(e.target.value)} helperText="* Nº Aluno"/>
          </Grid>
            <Grid item >
              <TextField type="date" variant="outlined" value={born_date} onChange={e => setBorn_date(e.target.value)} helperText="* Data de nascimento"/>
            </Grid>
        </Grid>
        <div className="margTop">
          <Button variant="outlined" color="primary" onClick={submit}>
              Adicionar Aluno
          </Button>
        </div>
        
      </div>
      </>
      );

}