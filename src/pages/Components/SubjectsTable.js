import React from 'react';
import MaterialTable from 'material-table';
import api from '../../services/api';

export default function SubjectsTable() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nome', field: 'school_subject' },
    ],
    data: [],
  });

  if(state.data.length===0)
    getSubjects();

  async function getSubjects(){
    const {data} = await api.get('/school-subjects');
    console.log(data);
    state.data=data;
  }

  async function deleteSubject(id){
    const {data} = await api.delete('/school-subjects/'+id);
    console.log(data);
  }

  async function addSubjects(subject){
    const {data} = await api.post('/school-subjects',{school_subject:subject});
    console.log(data);
  }

  async function EditSubjects(subject,id){
    const {data} = await api.post('/school-subjects/'+id,{school_subject:subject,active:false});
    console.log(data);
  }

  /*function guardar(){
    console.log(state.data)
  }*/

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
                addSubjects(newData.school_subject);
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
                  EditSubjects(oldData.school_subject,oldData.id)
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
                deleteSubject(oldData.id)
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
