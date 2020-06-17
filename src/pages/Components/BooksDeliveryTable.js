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
import api from '../../services/api';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';
import Cookies from 'js-cookie';




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






function Row(props) {

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  function tmp(row,event){
    //row.select=event;
    console.log(row,event) 
  }

  const [numberOfRows, setNumberOfRows] = React.useState(0);


  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.isbn}
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Manuais disponiveis:
              </Typography>
              <MaterialTable
                title=" "
                columns={[
                { title: 'ID', field: 'id' },
                { title: 'Estado', field: 'state' },
                ]}
                options={{
                  selection: true,
                  selectionProps: rowData => ({
                    disabled: rowData.id!==null && numberOfRows>0,
                    color: 'primary'
                  })
                }}
                onSelectionChange={(rows) => setNumberOfRows(rows.length)}
                data={query =>
                  new Promise((resolve, reject) => {
                    let url = 'http://localhost:8085/physical-books?available=true&book_isbn='+row.isbn
                    url += '&limit=' + query.pageSize
                    url += '&page=' + (query.page + 1)
                    fetch(url,{headers: {method: 'GET','Authorization': 'Bearer '+Cookies.get("token")}})
                      .then(response => response.json())
                      .then(result => {
                        resolve({
                          data: result.data,
                          page: result.page - 1,
                          totalCount: result.total,
                          
                        })
                      })
                  })
                }  
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export default function BooksDeliveryANDReturnTable({requisitionId,stdnumber,guardianName}) {
  const [obs, setObs] = React.useState('');
  const [estado, setEstado] = React.useState();

  const [rows, setRows] = React.useState([]);

  var bool = true
  if(rows.length===0 && bool)
    getBookRequisitions()

  async function getBookRequisitions(){
    bool=false
    const {data} = await api.get('/requisitions/'+requisitionId)
    setRows(data.book_requisitions)
    console.log("data: ",data);
  }

  const handleChangeObs = (event) => {
    setObs(event.target.value)
    console.log(event.target.value)
  };

  function Submit(){
    console.log(rows)
  }


  return (
    <>
    <Grid container spacing={2}>
      <Grid item >
        <TextField variant="outlined" defaultValue={stdnumber} helperText="Nº de Aluno" disabled/>
      </Grid>
      <Grid item >
        <TextField variant="outlined" defaultValue={guardianName} helperText="Encarregado de Educação" disabled/>
      </Grid>
    </Grid>
    <Grid container spacing={2}>
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>ISBN</TableCell>
                  <TableCell align="right">Nome</TableCell>
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
            <h3><b>Observações:</b></h3>
            <textarea value={obs} onChange={handleChangeObs} rows="15" cols="40"/>
        </Grid>
    </Grid>
    <Grid container spacing={2}>
        <Grid item >
            <Button className="btnMargin" variant="outlined" color="primary" onClick={Submit}>
                Submeter
            </Button>
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