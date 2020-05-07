import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';

export default function TableManuais() {
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

  function guardar(){
    console.log(state.data)
  }

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
    <Button className="btnMargin" variant="outlined" onClick={guardar} color="primary" >
        GUARDAR
    </Button>
    </>
  );
}
