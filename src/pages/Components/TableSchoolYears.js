import React from 'react';
import MaterialTable from 'material-table';
import api from '../../services/api';

export default function TableSchoolYears() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Ano letivo', field: 'school_year' },
    ],
    data: [],
  });

  if(state.data.length===0)
    getSchoolYears();

  async function getSchoolYears(){
    const {data} = await api.get('/school-years');
    //console.log(data);
    state.data=data;
  }

  async function deleteSchoolYears(id){
    const {data} = await api.delete('/school-years/'+id);
    //console.log(data);
  }

  async function addSchoolYear(school_year){
    const {data} = await api.post('/school-years',{school_year:school_year});
    //console.log(data);
  }

  async function EditSchoolYears(school_year,id){
    const {data} = await api.post('/school-years/'+id,{school_year:school_year,active:true});
    //console.log(data);
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
                addSchoolYear(newData.school_year);
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
                  EditSchoolYears(newData.school_year,oldData.id)
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
                deleteSchoolYears(oldData.id)
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
