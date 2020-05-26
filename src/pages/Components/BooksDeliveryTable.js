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
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Checkbox from '@material-ui/core/Checkbox';



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


const livrosdisponiveis = [
  {id: 1,isbn: "192-9472-12"},
  {id: 3,isbn: "192-9472-12"},
  {id: 4,isbn: "341-1403-33"},
  {id: 5,isbn: "055-1234-15"},
];


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
          {row.disciplina}
        </TableCell>
        <TableCell align="right">{row.nome}</TableCell>
        <TableCell align="right">{row.ano}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Manuais disponiveis:
              </Typography>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Selecione</TableCell>
                    <TableCell align="right">id</TableCell>
                    <TableCell align="right">isbn</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {livrosdisponiveis.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        <Checkbox
                          defaultChecked
                          color="primary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      </TableCell>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.isbn}</TableCell>
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

const rows = [
  {disciplina: 'Português',isbn: "192-9472-12",nome: "Dialogos 12",ano:12},
  {disciplina: 'Inglês',isbn: "192-9472-12",nome: "Hands On",ano:12},
  {disciplina: 'Educação Fisíca',isbn: "341-1403-33",nome: "Correr para crer",ano:12},
  {disciplina: 'Programação de Sistemas Informáticos',isbn: "055-1234-15",nome: "Programação C++",ano:12},
];

export default function BooksDeliveryANDReturnTable({numAluno}) {
  const [obs, setObs] = React.useState('');
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
                  <Row key={row.disciplina} row={row} />
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