import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';
import logo from '../images/whiteall.png'

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: '#6CD2E6',
        height: '100vh',
        width: '100%'
    },
    homeMessage: {
        height: '100%',
    },
    message: {
        width: '100%',
        padding: theme.spacing(2), 
    }
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <Grid 
                container 
                direction='row'
                justify='flex-end'
                alignItems='center'
                className={classes.homeMessage}
            >
                <Grid 
                    item 
                    container 
                    xs={6} 
                    direction='column'
                    justify='center'
                    alignItems='flex-start'
                    style={{padding: '10%'}}
                >
                    <Grid item className={classes.message}>
                        <img src={logo} style={{height: '140px'}}/>
                    </Grid>
                    <Grid item className={classes.message}>
                        <Typography color='textSecondary' variant='h5'>At FriendOver, we believe that staying in should stay exciting.</Typography>
                    </Grid>
                    <Grid item className={classes.message}>
                        <Typography color='textSecondary' variant='h7'>We are the first videoconferencing site to optimize a platform for the unique social and conversational needs of kids K-6.</Typography>
                    </Grid>
                    <Grid 
                        item 
                        container 
                        direction='row'
                        justify='flex-start'
                        alignItems='center'
                        className={classes.message}
                    >
                        <Button variant='contained' style={{width: 170, borderRadius: '25px'}}>LEARN MORE</Button>
                        <Button variant='contained' style={{width: 170, borderRadius: '25px', marginLeft: '40px'}}>Parent Sign Up</Button>
                    </Grid>
                    
                </Grid>

            </Grid>
        </div>

    );
}
