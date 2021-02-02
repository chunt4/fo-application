import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';
import picture from '../images/renee_avatar.jpg'

const useStyles = makeStyles((theme) => ({
    section: {
        backgroundColor: theme.backgroundColor.blue,
        padding: '200px 265px'
    },
    avatarContainer: {
        margin: '18px 0px'
    },
    avatarImage: {
        height: 150, 
        width: 150, 
        border: '3px solid #140c57', 
        marginBottom: 50
    }
}));

export default function Team() {
    const classes = useStyles();
    const profiles = [
        {
            'name': 'Renee Yaseen', 
            'description': 'CEO',
            'picture': picture
        },
        {
            'name': 'Name', 
            'description': 'Description',
            'picture': picture
        },
        {
            'name': 'Name', 
            'description': 'Description',
            'picture': picture
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
                        <Grid container direction='column' justify='center' alignItems='center' xs={4} className={classes.avatarContainer}>
                            <Grid item><Avatar alt="Renee Yaseen" src={profile.picture} className={classes.avatarImage} /></Grid>
                            <Grid item><Typography variant='subtitle1' color='primary'>{profile.name}</Typography></Grid>
                            <Grid item><Typography variant='subtitle1' color='primary'>{profile.description}</Typography></Grid>
                        </Grid>
                    ))}
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
        </div>
);
}
