import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Link, Toolbar } from '@material-ui/core'
import logo from '../../images/whiteall.png'

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    flexGrow: 1
  },
  logoImage: {
    height: 80,
  },
  navContainer: {
    background: 'transparent',
    boxShadow: 'none',
    padding: '110px 126px'
  },

  navButton: {
    margin: '0px 25px',
    '&:hover': {
      textDecoration: 'none',
      cursor: 'pointer'
    },  
  }

}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <AppBar position="absolute" className={classes.navContainer}>
      <Toolbar>
        <a className={classes.logoContainer} href='/'><img src={logo} alt='FriendOver' className={classes.logoImage} /></a>
        <div>
          <Link variant='subtitle2' color='textSecondary' className={classes.navButton}>Home</Link>
          <Link variant='subtitle2' color='textSecondary' className={classes.navButton}>About Friendover</Link>
          <Link variant='subtitle2' color='textSecondary' className={classes.navButton}>About the Team</Link>
          <Link variant='subtitle2' color='textSecondary' className={classes.navButton}>Newsletters {'&'} Blogs</Link>
        </div>

      </Toolbar>
    </AppBar>
  )
}

