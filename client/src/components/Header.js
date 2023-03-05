import * as React from 'react';
import {Link} from "react-router-dom"
import {AppBar, Box, Toolbar, Button} from '@mui/material';

// This component is used to render the AppBar to all the pages
export default function Header({jwt,  setJwt, user, setUser}) {

  // Each button in the header is asigned
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button to="/" component={Link} sx={{color: "white",}}>Home</Button>
            <Button to="/post" component={Link} sx={{color: "white",}}>Post</Button>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Button to="/login" component={Link} sx={{color: "white",}}>Login</Button>
            <Button to="/register" component={Link} sx={{color: "white",}}>Register</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}