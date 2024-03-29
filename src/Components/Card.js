import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Divider from '@material-ui/core/Divider';
import './ComponentsStyles.css'



export default function SimpleCard({idStatus}) {
  if(idStatus===1){
    return(
      <Card className="card">
        <CardContent>
            <Typography variant="h5" component="h2">
            Status<FiberManualRecordIcon className="status1"/>
            </Typography>
            <Divider/>
            <p>A sua requisição está a aguardar validação </p>
      </CardContent>
      </Card>
    )
  }
  else if(idStatus===2){
    return(
        <Card className="card">
          <CardContent>
                <Typography variant="h5" component="h2">
                Estado do pedido<FiberManualRecordIcon className="status2"/>
                </Typography>
                <Divider/>
                <p>A aguardar...</p>
          </CardContent>
        </Card>
    )
  }
  else if(idStatus===3){
    <Card className="card">
      <CardContent>
            <Typography variant="h5" component="h2">
            Status<FiberManualRecordIcon className="status3"/>
            </Typography>
            <Divider/>
            <p>Pronto para levantamento</p>
      </CardContent>
    </Card>
  }
}
