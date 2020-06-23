import React from 'react';
import './App.css';
import { Container, Button, AppBar, Toolbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import DataDropDown from './DataDropDown'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  addButton: {
    marginRight: theme.spacing(2)
  }
}));

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          Aws training app
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.mainContainer}>
          <Button variant="contained" color="primary" className={classes.addButton}>
            <AddIcon />
          </Button>
          <DataDropDown />
      </Container>
    </React.Fragment>
  );
}

export default App;
