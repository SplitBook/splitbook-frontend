import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import api from '../../services/api';
import api_formdata from '../../services/api_multipart_form_data';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TableManuais() {
  const [open, setOpen] = React.useState(false);
  const [fileimg, setFileimg] = React.useState({file:null});
  
  const [state, setState] = React.useState({
    columns: [
      { title: 'ISBN', field: 'isbn'},
      { title: 'Código', field: 'code' },
      { title: 'Disciplina', field: 'name' },
      { title: 'Editora', field: 'publishing_company'},
      { title: 'capa', field: 'cover',render: rowData => (     
        <>   
        <Button onClick={() => openImg(rowData.cover)} autoFocus>Ver capa</Button>
        </>
      )},
      { title: 'Descarregar capa', field: 'img',render: rowData => (     
        <>   
        <input type="file" onChange={fileUpload} />
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

 
  function fileUpload(e){
    //setFileimg(e.target.files[0])
    fileimg.file=e.target.files[0]
    console.log("file::: ",fileimg);
  }



  if(state.data)
    getBooks();

  async function getBooks(){
    const {data} = await api.get('/books');
    state.data=data.data;
  }

  async function deleteBooks(isbn){
    const {data} = await api.delete('/books/'+isbn);
    console.log(data);
  }

  async function addBooks(isbn,code,name){
    const {data} = await api.post('/books',{isbn:isbn,name:name,code:code});
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
  };

  return (
    <>
    <MaterialTable
      title=" "
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                addBooks(newData.isbn,newData.code,newData.name);
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

    </>
  );
}
