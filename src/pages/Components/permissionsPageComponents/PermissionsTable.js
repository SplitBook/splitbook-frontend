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
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function PermissionsTable(){
  const classes = useStyles();
  const rows = [
    {nome: "Professores",tipo1: true,tipo2: false,tipo3: false},
    {nome: "Encarregados de Educação",tipo1: false,tipo2: false,tipo3: true},
    {nome: "Secretaria",tipo1: true,tipo2: true,tipo3: false},
    {nome: "Militares",tipo1: false,tipo2: true,tipo3: false},
  ];

  function submit(){
    console.log(rows)
  }

  const handleChange = param => e => {
    console.log(param)
  };

  function tmp(json,event,num){
    console.log(json,event,num)
    switch(num){
      case 1:
        json.tipo1=event;
        break;
      case 2:
        json.tipo2=event;
        break;
      case 3:
        json.tipo3=event;
        break;
      default:

    }
  }


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
                  color="default"
                  defaultChecked={row.tipo1}
                  onChange={ e => tmp(row,e.target.checked,1)}
                  inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  color="default"
                  defaultChecked={row.tipo2}
                  onChange={ e => tmp(row,e.target.checked,2)}
                  inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  color="default"
                  defaultChecked={row.tipo3}
                  onChange={ e => tmp(row,e.target.checked,3)}
                  inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button className="btnMargin" variant="outlined" onClick={submit} color="primary" >
        Submeter novas Permissões
    </Button>
    </>
  );
}
