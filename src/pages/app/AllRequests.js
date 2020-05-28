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


export default function AllRequests() {
      function ViewList(list){
            console.log("teste",list)
      }

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
  const [obs, setObs] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [dataDeletedRow, setDataDeletedRow] = React.useState({});
  const [deleted, setDeleted] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  //rowData.listalivros
  const [txt, setTxt] = React.useState({});

  const handleChange = (value) => {
      //alert(value)
      setTxt(value);
      setOpen1(true);
  };

  const handleClose = () => {
      setOpen1(false);
  };

  const handleClose1 = () => {
      setOpen(false);
      setDeleted(false)
  };

  const handleClose2 = () => {
      if(obs!==null && obs!==''){
            setOpen(false);
            setDeleted(true)
      }
      else{
            setShowWarning(true);
      }
      
  };

  const handleChangeObs = (event) => {
      setObs(event.target.value)
      console.log(event.target.value)
      };

  return (
        <>
            <MaterialTable
                  title="Lista de Requisitos"
                  columns={state.columns}
                  data={state.data}
                  actions={[
                        {
                        icon: 'publish',
                        tooltip: 'Aceitar pedido',
                        onClick: (event, rowData) => alert("You saved " + rowData.name)
                        }
                  ]}
                  editable={{
                  onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                        setTimeout(() => {
                        resolve();
                        setDataDeletedRow(oldData)
                        setOpen(true);
                        //console.log('GunsNRoses',oldData)
                        if(deleted){
                        setState((prevState) => {
                              const data = [...prevState.data];
                              data.splice(data.indexOf(oldData), 1);
                              return { ...prevState, data };
                        });}
                        }, 600);
                  }),
                  }}
            />
            
            <div>
                  <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  aria-labelledby="responsive-dialog-title"
                  >
                  <DialogTitle id="responsive-dialog-title">Tem a certeza que pretende eliminar a requsição</DialogTitle>
                  <DialogContent>          
                  <DialogContentText>
                        <b>ID:</b> {dataDeletedRow.id}<br/>
                        <b>Encarregado de Educação:</b> {dataDeletedRow.ee}<br/>
                        <b>Nome do Aluno:</b> {dataDeletedRow.nomealuno}<br/>
                        Esta ação necessita de uma justificação:
                  </DialogContentText>
                  <textarea value={obs} onChange={handleChangeObs} rows="10" cols="60"/>
                  {
                        showWarning &&
                        <p className="warnText">Porfavor preencha o campo das observações</p>
                  }
                  </DialogContent>
                  <DialogActions>
                  <Button autoFocus onClick={handleClose1} color="primary">
                        Cancelar
                  </Button>
                  <Button onClick={handleClose2} color="primary" autoFocus>
                        Submeter
                  </Button>
                  </DialogActions>
                  </Dialog>

                  <Dialog
                  open={open1}
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
                  
            </div>
    </>
  );
}

//      { id: 1, ee: 'Rogério Costa', naluno: 478, nomealuno: 'Rafael Santos Costa', ano: 12,listalivros:<Button onClick={() => ViewList(listaLivros)}>Consultar lista</Button>},


/*

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




      //'Português,Matemática A,Fisico-Quimica A,Inglês,Matemática'

*/