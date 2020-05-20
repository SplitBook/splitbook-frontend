import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function BooksDeliveryANDReturnTable({numAluno}) {
  const [obs, setObs] = React.useState('');
  const classes = useStyles();
  const [estado, setEstado] = React.useState();

  const rows = [
    {id: 1,nome: "192-9472-12",isbn: "Inglês",estado: ''},
    {id: 2,nome: "192-9472-12",isbn: "Matemática A",estado: ''},
    {id: 3,nome: "341-1403-33",isbn: "Português",estado: ''},
    {id: 4,nome: "055-1234-15",isbn: "Programação C++",estado: ''},
  ];


  const handleChangeObs = (event) => {
    setObs(event.target.value)
    console.log(event.target.value)
  };

  function Submit(){
    console.log(rows)
    var lixo = {id: 5,nome: "055-1234-15",isbn: "Programação C++",estado: ''};
    rows.push(lixo);
  }

  function tmp(json,event){
    json.estado=event;
    modifyList(json)
    console.log("Lista:",rows)
  }

  function modifyList(json){
    for(var i=0;i<rows.length;i++){
      if(rows[i].id === json.id){
        rows[i]=json;
        break;
      }
    }
  }

  return (
    <>
    <Grid container spacing={2}>
        <Grid item xs={8}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Diciplina</TableCell>
                <TableCell align="right">ISBN</TableCell>
                <TableCell align="right">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.nome}</TableCell>
                  <TableCell align="right">{row.isbn}</TableCell>
                  <TableCell align="right">
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={row.estado}
                        onChange={ e => tmp(row,e.target.value)}
                      >
                        <MenuItem value={''}> - </MenuItem>
                        <MenuItem value={'Mau'}>Mau</MenuItem>
                        <MenuItem value={'Mediocre'}>Mediocre</MenuItem>
                        <MenuItem value={'Razoavél'}>Razoavél</MenuItem>
                        <MenuItem value={'Bom'}>Bom</MenuItem>
                        <MenuItem value={'Ótimo'}>Ótimo</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
        <Grid item xs={1}>
            <Grid container>
                <Grid item>
                    <h3><b>Observações:</b></h3>
                    <textarea value={obs} onChange={handleChangeObs} rows="15" cols="40"/>
                </Grid>
                <Grid item >
                    <Button className="btnMargin" variant="outlined" color="primary" onClick={Submit}>
                        Submeter
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    </>
  );
}
