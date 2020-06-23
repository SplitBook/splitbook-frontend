import React from "react";
import MaterialTable from "material-table";
import api from "../../services/api";

export default function BookLocationTable() {
  const [bool, setBool] = React.useState(true);
  const [state, setState] = React.useState({
    columns: [{ title: "Localização", field: "location" }],
    data: [],
  });

  if (bool) getLocation();

  async function getLocation() {
    setBool(false);
    const { data } = await api.get("/book-locations");
    console.log(data);
    setState({ ...state, data });
  }

  async function deleteLocation(id) {
    const { data } = await api.delete("/book-locations/" + id);
    console.log(data);
  }

  async function addLocation(location) {
    const { data } = await api.post("/book-locations", { location: location });
    console.log(data);
  }

  async function EditLocation(location, id) {
    const { data } = await api.put("/book-locations/" + id, {
      location,
    });
    console.log(data);
  }

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
                  console.log("Data:", newData);
                  addLocation(newData.location);
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
                    console.log("edit", oldData);
                    EditLocation(newData.location, oldData.id);
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
                  deleteLocation(oldData.id);
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    </>
  );
}
