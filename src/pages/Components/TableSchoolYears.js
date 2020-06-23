import React from "react";
import MaterialTable from "material-table";
import api from "../../services/api";
import Edit from "@material-ui/icons/Edit";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function TableSchoolYears() {
  const [newYear, setNewYear] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [listYears, setListYears] = React.useState([]);
  const [checked, setChecked] = React.useState(false);

  const [state, setState] = React.useState({
    columns: [{ title: "Ano letivo", field: "school_year" }],
    data: [],
  });

  const [bool, setBool] = React.useState(true);
  if (bool) {
    getSchoolYears();
  }

  async function getSchoolYears() {
    setBool(false);
    const { data } = await api.get("/school-years");
    state.data = data;
    setListYears(data);
  }

  async function deleteSchoolYears(id) {
    /*const {data} = await*/ api.delete("/school-years/" + id);
    //console.log(data);
  }

  async function addSchoolYear(school_year) {
    /*const {data} = await*/ api.post("/school-years", {
      school_year: school_year,
    });
    //console.log(data);
  }

  async function EditSchoolYears(school_year, id) {
    /*const {data} = await*/ api.post("/school-years/" + id, {
      school_year: school_year,
      active: true,
    });
    //console.log(data);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeCurrentSchoolYear = async () => {
    const { data } = await api.put("/configs", {
      key: "current_school_year_id",
      value: String(newYear.id),
    });

    handleClose();
  };

  return (
    <>
      <Grid container spacing={2} style={{ marginBottom: 10 }}>
        <Grid item>
          <h3>Alteral ano letivo atual</h3>
        </Grid>
        <Grid item>
          <Edit className="pointer" onClick={() => setOpen(true)} />
        </Grid>
      </Grid>

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
                  console.log("Data:", newData);
                  addSchoolYear(newData.school_year);
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
                    EditSchoolYears(newData.school_year, oldData.id);
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
                  deleteSchoolYears(oldData.id);
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
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Alterar ano letivo atual!
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            options={listYears}
            getOptionLabel={(option) => option.school_year}
            style={{ width: 300, marginTop: 15 }}
            onChange={(event, newValue) => {
              console.log(newValue);
              setNewYear(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Ano letivo" variant="outlined" />
            )}
          />

          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label="Confirme para submeter!"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={handleChangeCurrentSchoolYear}
            disabled={!checked || newYear === null}
          >
            Submeter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
