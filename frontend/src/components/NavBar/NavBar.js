import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar } from '@material-ui/core'
import logo from '../../images/whiteall.png'

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    flexGrow: 1
  },
  logoImage: {
    height: 70
  },
  navContainer: {
    background: 'transparent',
    boxShadow: 'none',
    padding: '40px 30px'
  },
  navButtonGroup: {
    marginRight: '30px'
  },
  navButton: {
    margin: '0px 10px'
  }
}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <AppBar position="absolute" className={classes.navContainer}>
      <Toolbar>
        <a className={classes.logoContainer} href='/'><img src={logo} alt='FriendOver' className={classes.logoImage} /></a>
        <div className={classes.navButtonGroup}>
          <Button variant='text' color="inherit" className={classes.navButton}>About Us</Button>
          <Button variant='text' color="inherit" className={classes.navButton}>How It Works</Button>
          <Button variant='text' color="inherit" className={classes.navButton}>Newsletters/Blogs</Button>
          <Button variant='text' color="inherit" className={classes.navButton}>Careers</Button>
        </div>

      </Toolbar>
    </AppBar>
  )
}

