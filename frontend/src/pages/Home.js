import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import logo from '../images/whiteall.png'
import background from '../images/home_background.jpg'

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '50%',
            paddingBottom: '230px'
        },
        [theme.breakpoints.down('md')]: {
            paddingBottom: '50px'
        },
    },
    logo: {
        [theme.breakpoints.up('lg')]: {
            height: '182px'
        },
        [theme.breakpoints.down('md')]: {
            height: '100px'
        },
        width: 'auto'
    },
    messageContainer: {
        [theme.breakpoints.up('lg')]: {
            paddingRight: '20%',
            paddingTop: '260px'
        },
        [theme.breakpoints.down('md')]: {
            paddingTop: '50px',
            paddingRight: '10%',
            paddingLeft: '10%'
        },
        width: '98%',
        margin: 'auto'
    },
    messageButtonContained: {
        color: theme.palette.primary.main
    },
    messageButtonOutline: {
        [theme.breakpoints.up('lg')]: {
            color: theme.palette.primary.main
        },
        [theme.breakpoints.down('md')]: {
            color: '#fff'
        },
    }
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.background} id='home'>
            <Grid 
                container 
                direction='column'
                justify='center'
                alignItems='flex-start'
                className={classes.messageContainer}
                spacing={3}
            >
                <Grid item>
                    <img src={logo} className={classes.logo} alt='Friendover'/>
                </Grid>
                <Grid item>
                    <Typography color='textSecondary' variant='h4'>At FriendOver, we believe that staying in should stay exciting.</Typography>
                </Grid>
                <Grid item>
                    <Typography color='textSecondary' variant='h6'>Friendover's motion-activated games don't require a console or remotes. Experience the next generation in online gaming.</Typography>
                </Grid>
                <Grid 
                    item 
                    container 
                    direction='row'
                    justify='space-around'
                    alignItems='center'
                    spacing={2}
                >
                    <Grid item>
                        <Button variant='contained' className={classes.messageButtonContained}>LEARN MORE</Button>
                    </Grid>
                    <Grid item>
                        <Button variant='outlined' className={classes.messageButtonOutline}>Parent Sign Up</Button>
                    </Grid>
                </Grid>
                
            </Grid>
        </div>

    );
}
