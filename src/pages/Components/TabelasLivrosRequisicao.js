import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    marginBottom: 5
  },
  paper: {
    width: 320,
    height: 360,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(['Matemática A', 'Português', 'Francês', 'Gestão','Fisico-Quimica','Redes de Comunicação','Programação','Inglês','Área de integração']);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  function efetuarRequisicao(){
    console.log(right);
}

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <>
    <Grid container spacing={2} alignItems="center" className={classes.root}>
      <Grid item>
      <center>
        <h3>Manuais disponiveis para requisitar</h3>
      </center>
      {customList(left)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Tooltip title="mover todos os manuais para a direita">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
          >
            ≫
          </Button>
          </Tooltip>
          <Tooltip title="mover o(s) manuais para a direita">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          </Tooltip>
          <Tooltip title="mover o(s) manuais para a esquerda">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
          </Tooltip>
          <Tooltip title="mover todos os manuais para a esquerda">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
          >
            ≪
          </Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item>
        <center>
          <h3>Manuais Selecionados</h3>
        </center>
        {customList(right)}
      </Grid>
      <Grid item>

      </Grid>
    </Grid>
    <p className="legenda"> 
      * Selecione os manuais que prentende requisitar e transponha-os para 
      a tabela da direita através dos botões centrais.
    </p>
    <Button variant="contained" onClick={efetuarRequisicao} color="primary">
        Efetuar requisição
    </Button>
    
    </>
  );
}
