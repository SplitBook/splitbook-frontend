import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'; 

const useStyles = makeStyles((theme) => ({

    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
      backgroundColor: '#ff0000',
      color: '#ffff',
      '&:hover': {
        backgroundColor: '#ff5555',
        boxShadow: 'none',
      },
    },
    
  }));
  
export default function FloatingBtn({history}) {
    const classes = useStyles();

    //const windowWidth = window.innerWidth;
    //console.log(windowWidth,"px")

    function redirectToNewReq(){
      history.push('/app/new/request')
    }
    if (history.location.pathname!=='/app/new/request' && window.innerWidth>920){
      return(
        <Tooltip title="Nova requisição" aria-label="add">
            <Fab className={classes.absolute} onClick={redirectToNewReq}>
               <AddIcon />
            </Fab>
        </Tooltip>
    );
    }
    else{
      return (
        <>
        </>
      );
    }
    
    
}