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
  const [id, setID] = React.useState(0)
  const [charge, setCharge] = React.useState('')
  var token = Cookies.get('token');
  var bool = true;

  if(id===0){
    var decoded = jwt_decode(token);
    console.log('decoded token: ',decoded)
    setID(decoded.profile_id)
    setCharge(decoded.charge)
  }

  if(id!==0 && charge!=='' && bool){
    if(charge==='Encarregado de Educação'){
      bool=false
      GuardianRequisitions();
    }
    if(charge==='Professor'){
      bool=false
      TeacherRequisitions();
    }
  }

  async function GuardianRequisitions(){
    const {data} = await api.get('/requisitions?guardian_id='+id)
    console.log('GuardianRequisitions',data)
    state.data=data
  }

  async function TeacherRequisitions(){
    const {data} = await api.get('/requisitions?head_class_id='+id)
    console.log('TeacherRequisitions',data)
    state.data=data
  }

  if(idStatus===1)
  return (
    <>
    <MaterialTable
      title="Requisições"
      columns={state.columns}
      data={state.data}
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
        data={state.data}
      />
    );
  }
}
