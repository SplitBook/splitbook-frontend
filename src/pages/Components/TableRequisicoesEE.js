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


export default function MaterialTableDemo({idStatus}) {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(true);
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nº Aluno', field: 'num'},
      { title: 'Disciplina', field: 'disciplina' },
      { title: 'Ano', field: 'ano'},
      {title: 'OBS:', field: 'obs'},
    ],
    data: [
      { num: 349, disciplina: 'Matemática A', ano: 12, obs: 'Outros' },
      { num: 599, disciplina: 'Português', ano: 12, obs: 'Outros'},
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

  if(idStatus===1)
  return (
    <>
    <MaterialTable
      title="Requisições"
      columns={state.columns}
      data={state.data}
      
      editable={{
          onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setShow(false)
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
  else{
    return (
      <MaterialTable
        title="Requisições"
        columns={state.columns}
        data={state.data}
      />
    );
  }
  
}
