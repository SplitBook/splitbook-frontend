import React from "react";
import MaterialTable from "material-table";
import api from "../../services/api";
import "./ComponentsStyles.css";
import Cookies from "js-cookie";
import Button from "@material-ui/core/Button";
import Edit from "@material-ui/icons/Edit";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete"

export default function TableTheClasses() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    columns: [
      { title: "Nome", field: "class", editable: "never" },
      { title: "Diretor de turma", field: "name" },
      { title: "Ano escolar", field: "school_year", editable: "never" },
      {
        title: "Alterar Diretor de Turma",
        render: (rowData) => (
          <Button onClick={() => changeClass(rowData.head_class_id)}>
            <Edit />
          </Button>
        ),
      },
    ],
    data: [],
  });


  const [classID, setClassID] = React.useState(0);
  const changeClass = (value) => {
    setOpen(true);
    setClassID(value);
  };

  const [teacher, setTeacher] = React.useState(null);
  const [teacherlist, setTeacherlist] = React.useState([]);
  var num = 0;

  if (teacherlist.length === 0 && num === 0) getTeacher();

  async function getTeacher() {
    num = 1;
    const {data} = await api.get("/teachers");
    setTeacherlist(data.data);
    console.log(data.data)
  }

  const handleClose = () => {
    setOpen(false);
  };

  function SubmitNewTeacherClass() {
    //console.log(classes,schoolEnrollmentsID)
    api.put("/classes/"+ classID +'/1', {head_class_id:teacher.id});
    setOpen(false);
    setTeacher(null)
  }

  async function deleteClasses(class_id, school_year_id) {
    const { data } = await api.delete(
      "/classe/" + class_id + "/" + school_year_id
    );
    console.log(data);
  }

  const tableRef = React.createRef();

  return (
    <>
      <MaterialTable
        title=" "
        tableRef={tableRef}
        columns={state.columns}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = "http://localhost:8085/classes";
            url += "?limit=" + query.pageSize;
            url += "&page=" + (query.page + 1);
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
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  deleteClasses(oldData.class_id, oldData.school_year_id);
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />

<div>
          <Dialog
            open={open}
            //onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Alteração de Diretor de Turma
            </DialogTitle>
            <DialogContent>
              {/* <h3>ID: {schoolEnrollmentsID}</h3> */}
              <Autocomplete
                options={teacherlist}
                getOptionLabel={(option) => option.name+' - '+option.email}
                onChange={(event, newValue) => {
                  //console.log(newValue)
                  setTeacher(newValue);
                }}
                style={{ width: 300, marginTop: 15 }}
                renderInput={(params) => (
                  <TextField {...params} label="Diretor de Turma" variant="outlined" />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button
                onClick={SubmitNewTeacherClass}
                color="primary"
                disabled={!teacher}
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    </>
  );
}
