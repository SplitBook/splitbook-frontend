import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(nome, tipo1, tipo2, tipo3) {
  return { nome, tipo1, tipo2, tipo3 };
}

const rows = [
  createData('Professores', true, false, false),
  createData('Encarregados de Educação', false, false, true),
  createData('Secretaria', true, true, false),
  createData('Militares', false, true, false),
];

function changecheck(type){
  type=!type;
}

export default function PermissionsTable() {
  const classes = useStyles();
  const [check, setCheck] = React.useState();

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Grupos</TableCell>
            <TableCell align="right">Tipo I</TableCell>
            <TableCell align="right">Tipo II</TableCell>
            <TableCell align="right">Tipo III</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.nome}>
              <TableCell component="th" scope="row">
                {row.nome}
              </TableCell>
              <TableCell align="right">
              <Checkbox
                defaultChecked
                color="default"
                checked={row.tipo1}
                //onChange={changecheck}
                inputProps={{ 'aria-label': 'checkbox with default color' }}
              />
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  defaultChecked
                  color="default"
                  checked={row.tipo2}
                  inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  defaultChecked
                  color="default"
                  checked={row.tipo3}
                  inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
