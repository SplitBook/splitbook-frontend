import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


export default function AprovedRequests() {
  function ViewList(list){
        console.log("teste",list)
  }
  const [txt, setTxt] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    columns: [
      { title: 'ID', field: 'id' },
      { title: 'EE', field: 'ee' },
      { title: 'Nº Aluno', field: 'naluno'},
      { title: 'Nome Aluno', field: 'nomealuno'},
      { title: 'Ano', field: 'ano'},
      { title: 'Lista de Livros', field: 'listalivros',render: rowData => (        
            <Button onClick={() => handleChange(rowData.listalivros)}>Consultar</Button>
          ),},
    ],
    data: [
      { id: 1, ee: 'Rogério Costa', naluno: 478, nomealuno: 'Rafael Santos Costa', ano: 12,listalivros:["Português","Matemática A","Fisico-Quimica A","Inglês","Matemática"]},
      { id: 2, ee: 'Rosa Maria Cardiga', naluno: 129, nomealuno: 'Gonçalo Afonso', ano: 12,listalivros:'Português,Matemática A,Matemática'},
      { id: 3, ee: 'Francisco Costa', naluno: 70, nomealuno: 'Guilherme Sousa', ano: 12,listalivros:'Inglês,Matemática'},

    ],
  });

  const handleChange = (value) => {
      //alert(value)
      setTxt(value);
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const tableRef = React.createRef();
  return (
        <>
            <MaterialTable
                  title="Lista de Requisitos"
                  columns={state.columns}
                  tableRef={tableRef}
                  data={state.data}
                  actions={[
                  {
                  icon: 'refresh',
                  tooltip: 'Refresh Data',
                  isFreeAction: true,
                  onClick: () => tableRef.current ,
                  }
                  ]}
                  
            />
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">Lista de Livros</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {txt}
            </DialogContentText>
            </DialogContent>
            </Dialog>
    </>
  );
}

/*

editable={{
                  onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                        setTimeout(() => {
                        resolve();
                        //console.log('GunsNRoses',oldData)
                        setState((prevState) => {
                              const data = [...prevState.data];
                              data.splice(data.indexOf(oldData), 1);
                              return { ...prevState, data };
                        });
                        }, 600);
                  }),
                  }}

*/
