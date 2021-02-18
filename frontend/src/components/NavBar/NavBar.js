import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Link, Toolbar } from '@material-ui/core'
import logo from '../../images/whiteall.png'
import MediaQuery from 'react-responsive'

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
    [theme.breakpoints.up('lg')]: {
      padding: '110px 126px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '10%'
    },
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
        <MediaQuery minWidth={1200}>
          <a className={classes.logoContainer} href='/'><img src={logo} alt='FriendOver' className={classes.logoImage} /></a>
          <div>
            <Link variant='subtitle2' color='textSecondary' className={classes.navButton} href='#home'>Home</Link>
            <Link variant='subtitle2' color='textSecondary' className={classes.navButton} href='#about'>About Friendover</Link>
            <Link variant='subtitle2' color='textSecondary' className={classes.navButton} href='#team'>About the Team</Link>
            <Link variant='subtitle2' color='textSecondary' className={classes.navButton} href='#subscribe'>Newsletters {'&'} Blogs</Link>
          </div>
        </MediaQuery>
      </Toolbar>
    </AppBar>
  )
}

