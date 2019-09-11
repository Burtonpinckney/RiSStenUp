import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { yellow } from '@material-ui/core/colors';

export default function SimpleContainer(props) {
  console.log("<===== container props =====>")
  console.log(props)
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#F0F8FF', height: '70vh' }}>
          
        </Typography>
      </Container>
    </React.Fragment>
  );
}