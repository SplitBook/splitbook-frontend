import React from 'react';
import MaterialTable from 'material-table';
import api from '../../services/api';
import './ComponentsStyles.css';
import Cookies from 'js-cookie';



export default function TableTheClasses() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Turma ID', field: 'class_id',editable: 'never'},
      { title: 'Nome', field: 'class' ,editable: 'never'},
      { title: 'DT. ID', field: 'head_class_id' },
      { title: 'Diretor de turma', field: 'name' },
      { title: 'Ano escolar', field: 'school_year' ,editable: 'never'},

    ],
    data: [],
  });

  async function deleteClasses(class_id,school_year_id){
    const {data} = await api.delete('/classe/'+class_id+'/'+school_year_id);
    console.log(data);  }



  return (
    <>
    <MaterialTable
      title=" "
      columns={state.columns}
      data={query =>
        new Promise((resolve, reject) => {
          let url = 'http://localhost:8085/classes'
          //url += 'limite=' + query.pageSize
          url += '?page=' + (query.page + 1)
          console.log("URL??",url)
          fetch(url,{headers: {method: 'GET','Authorization': 'Bearer '+Cookies.get("token")}})
            .then(response => response.json())
            .then(result => {
              resolve({
                data: result.data,
                page: result.page - 1,
                totalCount: result.total,
                
              })
            })
        })
      }
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                deleteClasses(oldData.class_id,oldData.school_year_id)
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
