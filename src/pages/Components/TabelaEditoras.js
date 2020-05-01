import React from 'react';
import MaterialTable from 'material-table';

export default function TableEditoras() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Id', field: 'id' },
      { title: 'Nome', field: 'nome' },
      { title: 'Contacto', field: 'contacto'},
      { title: 'Site', field: 'site'},
    ],
    data: [
      { id: 1, nome: 'Porto', contacto: 923593128, site: 'www.porto.eu' },
      { id: 2, nome: 'Caminho', contacto: 922353128, site: 'www.caminho.com' },
      { id: 2, nome: 'Texto', contacto: 923519528, site: 'www.texto.pt' },
    ],
  });

  return (
    <MaterialTable
      title="Editoras"
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
  );
}
