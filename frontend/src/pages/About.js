import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    section: {
        backgroundColor: '#FFF',
        width: '100%',
        padding: '200px 350px'
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
                    <Typography variant='h3'>
                        <Box fontWeight='fontWeightBold'>What is FriendOver?</Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6' align='center'>
                        Combining features of traditional videoconferencing like video, chat, and screen-share with a bundle of collaborative multiplayer games, <b>FriendOver gets kids moving, talking and laughing with their friends even during virtual playdates.</b>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6' align='center'>
                        FriendOver connects kids: on rainy days, snow days, over long distances, and whenever Mom or Dad is too busy or tired to drive them to the park :)
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
);
}
