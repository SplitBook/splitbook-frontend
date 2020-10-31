import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from '../../Components/Header';
import api from '../../services/api';
import './AppStyles.css';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { toast } from 'react-toastify';

export default function AddStudent() {
  const [name, setName] = React.useState(null);
  const [num, setNum] = React.useState(null);
  const [born_date, setBorn_date] = React.useState(null);
  const [text, setText] = React.useState('');
  const [open, setOpen] = React.useState(false);

  async function submit() {
    console.log(name, num, born_date);
    try {
      const { data } = await api.post('/students', {
        name,
        number: num,
        born_date: born_date || null,
      });
      console.log(data);
      toast.success(`Aluno ${data.name} criado com sucesso.`);
    } catch (error) {
      setText('Preencha todos os campos!');
      setOpen(true);
      setBorn_date(null);
      setNum(null);
      setName(null);
    }
    setBorn_date('');
    setNum('');
    setName('');
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Header title="Adicionar aluno" />
      <div>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText="* Nome do Aluno"
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              className="maxwidth"
              placeholder="ex: 349/12"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              helperText="* Nº Aluno"
            />
          </Grid>
          <Grid item>
            <TextField
              type="date"
              variant="outlined"
              value={born_date}
              onChange={(e) => setBorn_date(e.target.value)}
              helperText="Data de nascimento"
            />
          </Grid>
        </Grid>
        <div className="margTop">
          <Button variant="outlined" color="primary" onClick={submit}>
            Adicionar Aluno
          </Button>
        </div>
      </div>

      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={text}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    </>
  );
}
