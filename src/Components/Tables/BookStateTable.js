import React from 'react';
import MaterialTable from 'material-table';
import api from '../../services/api';
import Localization from '../MaterialTable-Props/material-table-txt-traduction';

export default function BookStateTable() {
  const [bool, setBool] = React.useState(true);
  const [state, setState] = React.useState({
    columns: [{ title: 'Estado', field: 'state' }],
    data: [],
  });

  if (bool) getStates();

  async function getStates() {
    const { data } = await api.get('/book-states');
    console.log(data);
    setState({ ...state, data });
    setBool(false);
  }

  async function deleteStates(id) {
    const { data } = await api.delete('/book-states/' + id);
    console.log(data);
  }

  async function addStates(state) {
    const { data } = await api.post('/book-states', { state: state });
    console.log(data);
  }

  async function EditStates(state, id) {
    const { data } = await api.put('/book-states/' + id, { state: state });
    console.log(data);
  }

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
                  console.log('Data:', newData);
                  addStates(newData.state);
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
                    EditStates(newData.state, oldData.id);
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
                  deleteStates(oldData.id);
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
        localization={{
          body: {
            emptyDataSourceMessage: 'Nenhum registo para exibir',
            editTooltip: 'Editar',
            deleteTooltip: 'Apagar',
            addTooltip: 'Adicionar'
          },
          header: {
            actions: 'Ações'
          },
          toolbar: {
            searchTooltip: 'Pesquisar',
            searchPlaceholder: 'Pesquisa'
          },
          pagination: {
            labelRowsSelect: 'linhas',
            labelDisplayedRows: '{count} de {from}-{to}',
            firstTooltip: 'Primeira página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Próxima página',
            lastTooltip: 'Última página'
          }
        }}
      />
    </>
  );
}
