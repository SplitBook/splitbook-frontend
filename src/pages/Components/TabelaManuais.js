import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TableManuais() {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(true);
  const [state, setState] = React.useState({
    columns: [
      { title: 'Id', field: 'id' },
      { title: 'ISBN', field: 'isbn'},
      { title: 'Nome', field: 'nome' },
      { title: 'Ano', field: 'ano'},
      { title: 'Editora', field: 'editora'},
      { title: 'Autores', field: 'autores'},
    ],
    data: [
      { id:1,isbn:'12222233', nome: 'Matemática A', ano: 12, editora: 'Porto',autores:'Patricia Dinis, João Cortes, Boturão das Neves'},
      { id:2,isbn:'45242566', nome: 'Fisico-Quimica A', ano: 12, editora: 'Porto',autores:'Nuno alves, Rafael Costa, Guilherme Sousa'},
      { id:3,isbn:'50820653', nome: 'Português', ano: 12, editora: 'Caminho',autores:'Guilherme Sousa,Luís de Camões'},
    ],
  });

  /*function guardar(){
    console.log(state.data)
  }*/

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShow(true)
  };

  return (
    <>
    <MaterialTable
      title="Manuais Escolares"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setShow(false);
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setShow(false);
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
    <Button className="btnMargin" variant="outlined" onClick={handleClickOpen} color="primary" disabled={show}>
        GUARDAR
    </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Tem a certeza que pretende guardar as alterações?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Os dados antigos serão removidos de forma definitiva.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleClose} color="primary">
              Continuar
            </Button>
          </DialogActions>
        </Dialog>
    </>
  );
}
