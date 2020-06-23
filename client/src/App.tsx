import React from 'react';
import './App.css';
import { Container, AppBar, Toolbar } from '@material-ui/core';
import DataMainForm from './DataMainForm'

function App() {
  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          Aws training app
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <DataMainForm/>
      </Container>
    </React.Fragment>
  );
}

export default App;
