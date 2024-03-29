import React from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Localization from '../MaterialTable-Props/material-table-txt-traduction';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TableEditoras() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    columns: [
      { title: "Nome", field: "nome" },
      { title: "Contacto", field: "contacto" },
      { title: "Site", field: "site" },
    ],
    data: [
      { id: 1, nome: "Porto", contacto: 923593128, site: "www.porto.eu" },
      { id: 2, nome: "Caminho", contacto: 922353128, site: "www.caminho.com" },
      { id: 3, nome: "Texto", contacto: 923519528, site: "www.texto.pt" },
    ],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*function guardar(){
    console.log(state.data)
  }*/

  return (
    <>
      <MaterialTable
        title=" "
        columns={state.columns}
        data={state.data}
        localization={Localization}
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
                setState((prevState) => {
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
        <DialogTitle id="alert-dialog-slide-title">
          {"Tem a certeza que pretende guardar as alterações?"}
        </DialogTitle>
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
