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


function createData(id, disciplina, isbn, estado) {
  return { id, disciplina, isbn, estado};
}

const rows = [
  createData(15, 'Português','192-1234-12', 'Bom'),
  createData(22, 'Matemática A','237-7654-63', 'Otimo'),
  createData(14, 'Inglês','262-1667-37', 'Bom'),
];

export default function BooksDeliveryANDReturnTable({numAluno}) {
  const [obs, setObs] = React.useState('');
  const classes = useStyles();
  const [estado, setEstado] = React.useState();

  //console.log("Rows: (teste) >> ",numAluno)

  const handleChange = (event) => {
    setEstado(event.target.value)
    console.log(event)
  };

  function changeCheck(estado,row){
    console.log("Ola",estado,row)
    console.log(row.estado)
    /*if(estado==null){
      setEstado(row.estado)
    }*/
  }

  return (
    <Grid container spacing={2}>
        <Grid item xs={8}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="caption table">
                <caption>legenda</caption>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Disciplina</TableCell>
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
                                value={estado}
                                onChange={handleChange,changeCheck(estado,row)}
                                >
                            <MenuItem value={'Mau'}>Mau</MenuItem>
                            <MenuItem value={'Mediocre'}>Mediocre</MenuItem>
                            <MenuItem value={'Satisfatório'}>Satisfatório</MenuItem>
                            <MenuItem value={'Bom'}>Bom</MenuItem>
                            <MenuItem value={'Otimo'}>Ótimo</MenuItem>
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
                    <textarea value={obs} onChange={handleChange} rows="15" cols="40"/>
                </Grid>
                <Grid item >
                    <Button className="btnPermissoes" variant="outlined" color="primary" >
                        Submeter
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    
  );
}
