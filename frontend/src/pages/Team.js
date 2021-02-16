import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';
import renee from '../images/renee.jpg'
import chris from '../images/chris.jpeg'
import daniel from '../images/daniel.jpg'

const useStyles = makeStyles((theme) => ({
    section: {
        backgroundColor: theme.backgroundColor.blue,
        padding: '210px 318px'
    },
    avatarContainer: {
        margin: '18px 22px'
    },
    avatarImage: {
        height: 260, 
        width: 260, 
        border: '10px solid #FFF', 
        margin: '56px 0px'
    },
    teamText: {
        marginTop: '62px'
    }
}));

export default function Team() {
    const classes = useStyles();
    const profiles = [
        {
            'name': 'Renee Yaseen', 
            'description': 'Founder, CEO',
            'picture': renee
        },
        {
            'name': 'Chris Hunt', 
            'description': 'Co-Founder',
            'picture': chris
        },
        {
            'name': 'Daniel Yaseen', 
            'description': 'Boy Wonder',
            'picture': daniel
        }
    ]
    return (
        <div className={classes.section}>
            <Grid container direction='column' justify='center' alignItems='center' spacing={4}>
                <Grid item>
                    <Typography variant='h3' color='primary'>
                        Who are we?
                    </Typography>
                </Grid>
                <Grid item container direction='row' justify='space-between'>
                    {profiles.map((profile) => (
                        <Grid container direction='column' justify='center' alignItems='center' xs={3} className={classes.avatarContainer}>
                            <Grid item><Avatar alt="Renee Yaseen" src={profile.picture} className={classes.avatarImage} /></Grid>
                            <Grid item><Typography variant='subtitle1' color='primary'>{profile.name}</Typography></Grid>
                            <Grid item><Typography variant='body2' color='primary'>{profile.description}</Typography></Grid>
                        </Grid>
                    ))}
                </Grid>
                <Grid item>
                    <Typography variant='subtitle1' color='primary' align='center' className={classes.teamText}>
                        We are students at the University of Notre Dame (+ one little brother) harnessing the power of computing vision (CV) technology to promote goodness in gaming.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body2' color='primary' align='center'>
                        FriendOver has won the 2021 LookUp Startup Competition for "for designing a ground-breaking solution to digital wellbeing and human technology."
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body2' color='primary' align='center'>
                        We hope to pioneers in a global shift to engage with technology in healthier ways.
                    </Typography>
                </Grid>
            </Grid>
        </div>
);
}
