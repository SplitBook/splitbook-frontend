import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 'max-content',
    marginTop: 30,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CardPermissions() {
  const classes = useStyles();

  return (
      <>
    <Card className={classes.root} >
      <CardContent>
        <Typography className={classes.title} color="textSecondary"  gutterBottom>
            <i>Legenda:</i>
        </Typography>
        <Typography variant="body2" component="p">
            <b>Tipo I:</b> Criação e edição e visualização de requisiçoes e criação de livros e editoras
        </Typography>
        <Typography variant="body2" component="p">
            <b>Tipo II:</b> Criação e edição e visualização de requisiçoes
        </Typography>
        <Typography variant="body2" component="p">
            <b>Tipo III:</b> Criação e edição de requisiçoes
        </Typography>
      </CardContent>
    </Card>
    </>
  );
}

