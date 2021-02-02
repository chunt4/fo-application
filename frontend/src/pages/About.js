import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    section: {
        backgroundColor: theme.backgroundColor.white,
        padding: '200px 265px'
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
            <Grid item container direction='column' justify='center' alignItems='center' spacing={5}>
                <Grid item>
                    <Typography variant='h3' color='primary'>
                        What is FriendOver?
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' color='primary' align='center'>
                        Combining features of traditional videoconferencing like video, chat, and screen-share with a bundle of collaborative multiplayer games, <b style={{fontFamily: 'Avenir-Black'}}>FriendOver gets kids moving, talking and laughing with their friends even during virtual playdates.</b>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' color='primary' align='center'>
                        FriendOver connects kids: on rainy days, snow days, over long distances, and whenever Mom or Dad is too busy or tired to drive them to the park :)
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
);
}
