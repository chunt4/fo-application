import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    section: {
        backgroundColor: theme.backgroundColor.white,
        [theme.breakpoints.up('lg')]: {
            padding: '200px 318px'
        },
        [theme.breakpoints.down('md')]: {
            padding: '50px 30px'
        },
        
    },
    aboutTitle: {
        [theme.breakpoints.up('lg')]: {
            marginBottom: '36px'
        },
        [theme.breakpoints.down('md')]: {
            marginBottom: '24px'
        },
    }
}));

export default function About() {
    const classes = useStyles();

    return (
        <Grid 
            container 
            direction='row'
            justify='center'
            alignItems='center'
            className={classes.section}
            id='about'
        >
            <Grid item container direction='column' justify='center' alignItems='center'>
                <Grid item className={classes.aboutTitle}> 
                    <Typography variant='h3' color='textPrimary' align='center'>
                        What is FriendOver?
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' color='textPrimary' align='center'>
                        FriendOver combines features of videoconferencing with a bundle of motion-interactive games kids can play with their friends. Single-player mode is now active and multiplayer mode coming soon!
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
);
}
