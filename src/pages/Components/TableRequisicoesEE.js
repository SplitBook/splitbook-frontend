import React from 'react';
import MaterialTable from 'material-table';


export default function MaterialTableDemo({idStatus}) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nº Aluno', field: 'num'},
      { title: 'Disciplina', field: 'disciplina' },
      { title: 'Ano', field: 'ano'},
      {title: 'OBS:', field:'obs'},
    ],
    data: [
      { num: 349, disciplina: 'Matemática A', ano: 12, obs: 'Outros' },
      { num: 599, disciplina: 'Português', ano: 12, obs: 'Outros'},
    ],
  });

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
