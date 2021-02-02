import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import logo from '../images/whiteall.png'

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: theme.backgroundColor.blue,
        height: '100vh',
        paddingLeft: '55%'
    },
    messageContainer: {
        paddingTop: '22%', 
        paddingRight: '20%'
    },
    message: {
        width: '100%',
        padding: theme.spacing(2), 
    },
    messageButtons: {
        width: '45%', 
        borderRadius: '30px'
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
                className={classes.messageContainer}
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
                    <Button variant='contained' className={classes.messageButtons} >LEARN MORE</Button>
                    <Button variant='outlined' className={classes.messageButtons} style={{ marginLeft: '30px' }}>Parent Sign Up</Button>
                </Grid>
                
            </Grid>
        </div>

    );
}
