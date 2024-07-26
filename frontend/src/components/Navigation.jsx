import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          CRM System
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/allLead">Lead List</Button>
        <Button color="inherit" component={Link} to="/addLead">Add Lead</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
