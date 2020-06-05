import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import Cookies from 'js-cookie';
import api from '../../services/api';
import jwt_decode from 'jwt-decode';
import './AppStyles.css';



const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const groups = [];

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  

  setInfoAndCharge();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  
  function setInfoAndCharge(){
      var token = Cookies.get('token');
      var decoded = jwt_decode(token);
      var {data} = api.get('/users/'+decoded.user_id);
      for(var i=0;i<data.profiles.lenght;i++){
        groups.push(data.profiles[i]);
      }
  }
  

  return (
    <>
    <Dialog  aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Entrar como:</DialogTitle>
        <List>
            {groups.map((group) => (
            <ListItem button onClick={() => handleListItemClick(group)} key={group}>
                <ListItemAvatar>
                <Avatar className={classes.avatar}>
                    <PersonIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={group} />
            </ListItem>
            ))}
        </List>
    </Dialog>
    </>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({history}) {
  const [open, setOpen] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState(groups[0]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    var data = SimpleDialog.data;
    const data2 = api.post('/login/profile',{profile_id:data.user.profiles[0].id,charge:data.user.profiles[0].name,token:data.token});
    console.log("Login2:: ",data2.data);
    Cookies.set('token',data2.data.token,{ expires: 7 });
    //var decoded = jwt_decode(data2.data.token);
    //console.log("decoded",decoded)
    history.push('/app/home')
  };

  return (
    <div>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}