import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    section: {
        backgroundColor: '#BAD2E3',
        // width: '100%',
        height: '100vh',
        padding: '200px 350px'
    },
}));

export default function Team() {
    const classes = useStyles();
    const profiles = [
        {
            'name': 'Name', 
            'description': 'Description'
        },
        {
            'name': 'Name', 
            'description': 'Description'
        },
        {
            'name': 'Name', 
            'description': 'Description'
        }
    ]
    return (
        <div className={classes.section}>
            <Grid container direction='column' justify='center' alignItems='center' spacing={5}>
                <Grid item>
                    <Typography variant='h3' color='primary'>
                        Who are we?
                    </Typography>
                </Grid>
                <Grid item container direction='row' >
                    {profiles.map((profile) => (
                        <Grid container direction='column' justify='center' alignItems='center' xs={4}>
                            <Grid item>Picture</Grid>
                            <Grid item>Name Description</Grid>
                        </Grid>
                    ))}
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
        </div>
);
}
