import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


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
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
}));

function createData(name, calories, fat, carbs, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Lista de manuais disponiveis
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID Livro</TableCell>
                    <TableCell>ISBN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BooksDeliveryANDReturnTable({numAluno}) {
  const [obs, setObs] = React.useState('');
  const classes = useStyles();
  const [estado, setEstado] = React.useState();

  const handleChangeObs = (event) => {
    setObs(event.target.value)
    console.log(event.target.value)
  };

  function Submit(){
    console.log(rows)
    var lixo = {id: 5,nome: "055-1234-15",isbn: "Programação C++"};
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
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Disciplina</TableCell>
                  <TableCell align="right">Nome</TableCell>
                  <TableCell align="right">Ano</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.name} row={row} />
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


/*const rows = [
  {disciplina: 'PT',isbn: "192-9472-12",nome: "LETRAS",ano:12},
  {disciplina: 'ING',isbn: "192-9472-12",nome: "Matemática +",ano:12},
  {disciplina: 'EF',isbn: "341-1403-33",nome: "correr para crer",ano:12},
  {disciplina: 'PSI',isbn: "055-1234-15",nome: "Programação C++",ano:12},
];*/