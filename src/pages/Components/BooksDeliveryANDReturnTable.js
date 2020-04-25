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
import InputLabel from '@material-ui/core/InputLabel';


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

  

function createData(id, isbn, estado) {
  return { id, isbn, estado};
}

const rows = [
  createData(15, '192-1234-12', 'Bom'),
  createData(22, '237-7654-63', ''),
  createData(14, '262-1667-37', ''),
];

export default function BooksDeliveryANDReturnTable() {
  const classes = useStyles();
  const [estado, setEstado] = React.useState('');

  const handleChange = (event) => {
    setEstado(event.target.value);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
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
              <TableCell align="right">{row.isbn}</TableCell>
              <TableCell align="right">
                <FormControl className={classes.formControl}>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={estado}
                        onChange={handleChange}
                        >
                    <MenuItem value={'ola'}>Mau</MenuItem>
                    <MenuItem value={2}>Mediocre</MenuItem>
                    <MenuItem value={3}>Satisfatório</MenuItem>
                    <MenuItem value={4}>Bom</MenuItem>
                    <MenuItem value={5}>Ótimo</MenuItem>
                    </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
