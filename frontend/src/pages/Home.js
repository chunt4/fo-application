import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';
import logo from '../images/whiteall.png'

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: '#BAD2E3',
        height: '100vh',
        paddingLeft: '55%'
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
                direction='column'
                justify='center'
                alignItems='flex-start'
                style={{paddingTop: '22%', paddingRight: '20%'}}
            >
                <Grid item className={classes.message}>
                    <img src={logo} style={{height: '150px'}}/>
                </Grid>
                <Grid item className={classes.message}>
                    <Typography color='textSecondary' variant='h4'>At FriendOver, we believe that staying in should stay exciting.</Typography>
                </Grid>
                <Grid item className={classes.message}>
                    <Typography color='textSecondary' variant='h6'>We are the first videoconferencing site to optimize a platform for the unique social and conversational needs of kids K-6.</Typography>
                </Grid>
                <Grid 
                    item 
                    container 
                    direction='row'
                    justify='flex-start'
                    alignItems='center'
                    className={classes.message}
                >
                    <Button variant='contained' style={{width: '45%', borderRadius: '30px'}}>LEARN MORE</Button>
                    <Button variant='outlined' style={{width: '45%', borderRadius: '30px', marginLeft: '30px'}}>Parent Sign Up</Button>
                </Grid>
                
            </Grid>
        </div>

    );
}
