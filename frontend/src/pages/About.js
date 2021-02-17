import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    section: {
        backgroundColor: theme.backgroundColor.white,
        padding: '200px 318px'
    },
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
        >
            <Grid item container direction='column' justify='center' alignItems='center' spacing={9}>
                <Grid item>
                    <Typography variant='h3' color='textPrimary'>
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
