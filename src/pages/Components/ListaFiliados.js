import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './ComponentsStyles.css'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(nome, numero, ano, turma) {
  return { nome, numero, ano, turma };
}

const rows = [
  createData('Rafael Martins Santos Costa', 349, 12, 'C'),
  createData('Alexandra Santos', 478, 10, 'B'),
  createData('Nuno Francisco Alves', 599, 12, 'C'),
  createData('Francisco Miguel Areias Mota', 49, 7, 'A'),
  createData('Guilherme Sousa', 7, 5, 'C'),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
        <h3 className="paddingtext">Lista de Filiados</h3>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Nº Aluno</TableCell>
            <TableCell align="right">Ano</TableCell>
            <TableCell align="right">Turma</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.nome}
              </TableCell>
              <TableCell align="right">{row.numero}</TableCell>
              <TableCell align="right">{row.ano}</TableCell>
              <TableCell align="right">{row.turma}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}