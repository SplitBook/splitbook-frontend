import React from 'react';
import MaterialTable from 'material-table';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import api from '../../services/api';

export default function MaterialTableDemo({idStatus}) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nº Aluno', field: 'num'},
      { title: 'Disciplina', field: 'disciplina' },
      { title: 'Ano', field: 'ano'},
      {title: 'OBS:', field:'obs'},
    ],
    data: [
      /*{ num: 349, disciplina: 'Matemática A', ano: 12, obs: 'N/D' },
      { num: 599, disciplina: 'Português', ano: 12, obs: 'N/D'},*/
    ],
  });
  const [statusId, setStatusId] = React.useState(0)
  var token = Cookies.get('token');
  var decoded = jwt_decode(token);

  if(idStatus===1)
  return (
    <>
    <MaterialTable
      title="Requisições"
      columns={state.columns}
      data={query =>
        new Promise((resolve, reject) => {
          let url = ''
          if(decoded.charge==='Encarregado de Educação')
            url += 'http://localhost:8085/requisitions?guardian_id='+decoded.profile_id
          else
            url += 'http://localhost:8085/requisitions?head_class_id='+decoded.profile_id
          url += '&limit=' + query.pageSize
          url += '&page=' + (query.page + 1)
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
  else{
    return (
      <MaterialTable
        title="Requisições"
        columns={state.columns}
        data={query =>
        new Promise((resolve, reject) => {
          let url = ''
          if(decoded.charge==='Encarregado de Educação')
            url += 'http://localhost:8085/requisitions?guardian_id='+decoded.profile_id
          else
            url += 'http://localhost:8085/requisitions?head_class_id='+decoded.profile_id
          url += '&limit=' + query.pageSize
          url += '&page=' + (query.page + 1)
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
      />
    );
  }
}
