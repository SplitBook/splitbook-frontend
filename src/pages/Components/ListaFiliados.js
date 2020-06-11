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
    minWidth:350,
  },
});

function createData(nome, numero, ano, turma) {
  return { nome, numero, ano, turma };
}

/*const rows = [
  createData('Rafael Martins Santos Costa', 349, 12, 'C'),
  createData('Alexandra Santos Mogas', 478, 10, 'B'),
  createData('Nuno Francisco Alves', 599, 12, 'C'),
  createData('Francisco Miguel Areias Mota', 49, 7, 'A'),
  createData('Ricardo alexandre rodrigues de Jesus', 215, 12, 'C'),
];*/

export default function SimpleTable({rows}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className="marginTop">
        <h3 className="paddingtext">Lista de Filiados</h3>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID Aluno</TableCell>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="center">Nº Aluno</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" align="center">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="center">{row.number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}