import React from 'react';
import MaterialTable from 'material-table';
import api from '../../services/api';


export default function TableClasses() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nome Turma', field: 'class' },
    ],
    data: [],
  });

  if(state.data.length===0)
  getGeneralClasses();

  async function getGeneralClasses(){
    const {data} = await api.get('/general-classes');
    console.log(data);
    state.data=data;
  }

  async function deleteGeneralClasses(id){
    const {data} = await api.delete('/general-classe/'+id);
    console.log(data);
  }

  async function addGeneralClasses(classname){
    const {data} = await api.post('/general-classe',{class:classname});
    console.log(data);
  }

  async function EditGeneralClasses(classname,id){
    const {data} = await api.post('/general-classe/'+id,{class:classname,active:false});
    console.log(data);
  }

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
                console.log("Data:",newData)
                addGeneralClasses(newData.class);
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
                  EditGeneralClasses(newData.class,oldData.id)
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
                deleteGeneralClasses(oldData.id)
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
    </>
  );
}
