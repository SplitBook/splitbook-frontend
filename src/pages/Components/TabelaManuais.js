import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import api from '../../services/api';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TableManuais() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    columns: [
      { title: 'ISBN', field: 'isbn'},
      { title: 'Código', field: 'code' },
      { title: 'Disciplina', field: 'name' },
      { title: 'Capa', field: 'cover'},
    ],
    data: [],
  });

  if(state.data.length===0)
    getBooks();

  async function getBooks(){
    const {data} = await api.get('/books');
    state.data=data.data;
    //console.log("state:",state);
  }

  async function deleteBooks(isbn){
    const {data} = await api.delete('/books/'+isbn);
    console.log(data);
  }

  async function addBooks(isbn,code,name){
    const {data} = await api.post('/books',{isbn:isbn,name:name,code:code});
    console.log(data);
  }

  async function EditBooks(isbn,new_isbn,name,cover){
    const {data} = await api.post('/books/'+isbn,{isbn:new_isbn,name:name,cover:cover});
    console.log(data);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <MaterialTable
      title=" "
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                addBooks(newData.isbn,newData.code,newData.name);
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
              if (oldData) {
                setState((prevState) => {
                  newData.code=oldData.code
                  //EditBooks(oldData.isbn,newData.isbn,newData.name,newData.cover)
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
              setState((prevState) => {
                deleteBooks(oldData.isbn);
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
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
