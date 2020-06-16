import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import api from '../../services/api';
import api_formdata from '../../services/api_multipart_form_data';
import ImageOutlined from '@material-ui/icons/ImageOutlined';
import NoteAddOutlined from '@material-ui/icons/NoteAddOutlined';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie';

import './ComponentsStyles.css';
import TableNewPhysicalBooks from './TableNewPhysicalBooks';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function TableManuais() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [fileimg, setFileimg] = React.useState({file:null});
  const [infoLivro,setInfoLivro] = React.useState({isbn:null,codigo:null});
  const [num,setNum] = React.useState(1);
  
  const [state, setState] = React.useState({
    columns: [
      { title: 'ISBN', field: 'isbn',editable: 'never'},
      { title: 'Código', field: 'code',editable: 'never'},
      { title: 'Disciplina', field: 'name' },
      { title: 'Editora', field: 'publishing_company'},
      { title: 'Capa', field: 'cover',render: rowData => (     
        <>
          <ImageOutlined onClick={() => openImg(rowData.cover)} className="pointer"/>
        </>
      )},
      { title: 'Descarregar capa',render: rowData => (     
        <>   
        <input type="file" onChange={fileUpload} />
        </>
      )},
      { title: 'Gerar',render: rowData => (     
        <>   
        <NoteAddOutlined onClick={() => openGenerate(rowData.isbn,rowData.code)} className="pointer"/>
        </>
      )},
    ],
    data: [],
  });

  const [photo_photo, setPhoto_photo] = React.useState('');

  function openImg(path){
    console.log(path)
    setPhoto_photo(path)
    setOpen(true);
  }

  function openGenerate(isbn,code){
    setInfoLivro({isbn:isbn,code:code})
    setOpen1(true)
  }

  const [physicalBooks, setPhysicalBooks] = React.useState([]);

  async function GeneratePhysicalBooks(){
    console.log(num,infoLivro.isbn)
    const {data} = await api.post('/physical-books?quantity='+num,{book_isbn:infoLivro.isbn})
    console.log("ola",data)
    var tmp = []
    tmp.push(data)
    setPhysicalBooks(tmp)
    setOpen1(false)
    setOpen2(true)
  }

 
  function fileUpload(e){
    //setFileimg(e.target.files[0])
    fileimg.file=e.target.files[0]
    console.log("file::: ",fileimg);
  }

  async function deleteBooks(isbn){
    const {data} = await api.delete('/books/'+isbn);
    console.log(data);
  }

  async function addBooks(isbn,code,name,publishing_company){
    const {data} = await api.post('/books',{isbn:isbn,name:name,code:code,publishing_company:publishing_company});
    console.log(data);
  }

  function EditBooks(isbn,name,publishing_company){
    console.log("cover:: ",fileimg.file);
    const formData = new FormData();
    formData.append('cover',fileimg.file)
    formData.append('name',name)
    formData.append('publishing_company',publishing_company)
    console.log(formData)
    const {data} = api_formdata.put('/books/'+isbn,formData);
    console.log(data);
  }

  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
    setOpen2(false)
  };
  console.log('url','http://localhost:8085/books')
  return (
    <>
    <MaterialTable
      title=" "
      columns={state.columns}
      data={query =>
        new Promise((resolve, reject) => {
          let url = 'http://localhost:8085/books'
          url += '?limite=' + query.pageSize
          url += '&page=' + (query.page + 1)
          console.log("URL??",url)
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
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                addBooks(newData.isbn,newData.code,newData.name,newData.publishing_company);
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  newData.code=oldData.code
                  newData.isbn=oldData.isbn
                  EditBooks(oldData.isbn,newData.name,newData.publishing_company)
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                deleteBooks(oldData.isbn);
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Visualização da capa do livro</DialogTitle>
          <DialogContent>
            <img src={photo_photo} alt="capa do livro"/>
          </DialogContent>
        </Dialog>

        <Dialog
          open={open1}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Gerar livros físicos</DialogTitle>
          <DialogContent>

            <p><b>ISBN: </b> {infoLivro.isbn}</p>
            <p><b>Code: </b> {infoLivro.code}</p>
            <TextField type="number" label="Qtd. livros a gerar" defaultValue={num} onChange={(e) => setNum(e.target.value)} style={{marginTop:20}}/>

          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => GeneratePhysicalBooks()} color="primary">
            Gerar Livros
          </Button>
        </DialogActions>
        </Dialog>
      {
        physicalBooks.length>0 &&
        <Dialog
          open={open2}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Lista de livros físicos gerados</DialogTitle>
          <DialogContent>
            <TableNewPhysicalBooks physicalBooks={physicalBooks} num={physicalBooks.length}/>
          </DialogContent>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </Dialog>
      }

    </>
  );
}
