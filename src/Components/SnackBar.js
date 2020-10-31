import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './ComponentsStyles.css'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function CustomizedSnackbars({history}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

  };

  return (
    <>
      <button type="submit" onClick={handleClick} className="btnRecoverPass">CONTINUAR</button>
      <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Enviado com sucesso!
        </Alert>
      </Snackbar>
      </div>
    </>
  );
}
