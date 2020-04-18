import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state] = React.useState({
    columns: [
      { title: 'Nº Aluno', field: 'num'},
      { title: 'Disciplina', field: 'disciplina' },
      { title: 'Ano', field: 'ano'},
      {title: 'OBS:', field: 'obs'},
    ],
    data: [
      { num: 349, disciplina: 'Matemática A', ano: 12, obs: 'Outros' },
      { num: 599, disciplina: 'Português', ano: 12, obs: 'Outros'},
    ],
  });

  return (
    <MaterialTable
      title="Requisições"
      columns={state.columns}
      data={state.data}
    />
  );
}
