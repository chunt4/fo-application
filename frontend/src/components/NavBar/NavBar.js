import React from 'react'
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core'
import logo from '../../images/whiteall.png'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navContainer: {
    background: 'transparent',
    boxShadow: 'none',
    padding: '40px 30px',
    flexGrow: 1
  },
  navButtonGroup: {
    marginRight: '30px'
  },
  navButton: {
    margin: '0px 20px'
  }
}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <AppBar position="absolute" className={classes.navContainer}>
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <img src={logo} alt='' style={{ height: 70 }}></img>
        </div>
        <div className={classes.navButtonGroup}>
          <Button color="inherit" className={classes.navButton}>About Us</Button>
          <Button color="inherit" className={classes.navButton}>How It Works</Button>
          <Button color="inherit" className={classes.navButton}>Newsletters/Blogs</Button>
          <Button color="inherit" className={classes.navButton}>Careers</Button>
        </div>

      </Toolbar>
    </AppBar>
  )
}

