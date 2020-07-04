import React from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Header from "../Components/Header";
import Cookies from "js-cookie";
import ImageOutlined from "@material-ui/icons/ImageOutlined";
import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AprovedRequests() {
  const [reqId, setReqId] = React.useState(0);
  const [openBookList, setOpenBookList] = React.useState(false);
  const handleChange = (value) => {
    console.log("req id", value);
    setReqId(value);
    setOpenBookList(true);
  };

  const handleClose = () => {
    setOpenBookList(false);
  };

  const [photo_photo, setPhoto_photo] = React.useState("");
  const [openPhoto, setOpenPhoto] = React.useState(false);

  function openImg(path) {
    console.log(path);
    setPhoto_photo(path);
    setOpenPhoto(true);
  }

  const handleCloseIMG = () => {
    setOpenPhoto(false);
  };

  const fullWidth = true;
  const maxWidth = "sm";
  const tableRef = React.createRef();
  return (
    <>
      <Header title="Requisições aprovadas" />

      <MaterialTable
        title="Lista de Requisições"
        columns={[
          { title: "EE", field: "guardian_name" },
          { title: "Nº Aluno", field: "student_number" },
          { title: "Nome Aluno", field: "student_name" },
          { title: "Turma", field: "class" },
          { title: "Ano letivo", field: "school_year" },
          {
            title: "Detalhes",
            field: "listalivros",
            render: (rowData) => (
              <Button onClick={() => handleChange(rowData.id)}>
                Consultar
              </Button>
            ),
          },
        ]}
        tableRef={tableRef}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url =
              "http://localhost:8085/requisitions?current_school_year=true&state_id=2";
            url += "&limit=" + query.pageSize;
            url += "&page=" + (query.page + 1);
            url += "&search=" + query.search;
            fetch(url, {
              headers: {
                method: "GET",
                Authorization: "Bearer " + Cookies.get("token"),
              },
            })
              .then((response) => response.json())
              .then((result) => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.totalCount,
                });
              });
          })
        }
        actions={[
          {
            icon: "refresh",
            tooltip: "Atualizar informação",
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          },
        ]}
      />

      <Dialog
        open={openBookList}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Lista de manuais escolares requisitados
        </DialogTitle>
        <DialogContent>
          <MaterialTable
            title=""
            columns={[
              { title: "Nome", field: "name" },
              { title: "ISBN", field: "isbn" },
              {
                title: "Capa",
                field: "cover",
                render: (rowData) => (
                  <Button
                    disabled={rowData ? !rowData.cover : true}
                    onClick={() => openImg(rowData.cover)}
                  >
                    <ImageOutlined className="pointer" />
                  </Button>
                ),
              },
            ]}
            options={{
              search: false,
              sorting: false,
            }}
            data={(query) =>
              new Promise((resolve, reject) => {
                console.log("ID req::", reqId);
                let url = "http://localhost:8085/requisitions/" + reqId;
                fetch(url, {
                  headers: {
                    method: "GET",
                    Authorization: "Bearer " + Cookies.get("token"),
                  },
                })
                  .then((response) => response.json())
                  .then((result) => {
                    resolve({
                      data: result.book_requisitions,
                      page: query.page,
                      totalCount: result.book_requisitions.length,
                    });
                  });
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Sair
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPhoto}
        onClose={handleCloseIMG}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Visualização da capa do livro
        </DialogTitle>
        <DialogContent>
          <img src={photo_photo} alt="capa do livro" />
        </DialogContent>
      </Dialog>
    </>
  );
}

/*

editable={{
         onRowDelete: (oldData) =>
         new Promise((resolve) => {
               setTimeout(() => {
               resolve();
               //console.log('GunsNRoses',oldData)
               setState((prevState) => {
                     const data = [...prevState.data];
                     data.splice(data.indexOf(oldData), 1);
                     return { ...prevState, data };
               });
               }, 600);
         }),
         }}

*/
