import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';
import renee from '../images/renee.jpg'
import chris from '../images/chris.jpeg'
import daniel from '../images/daniel.jpg'
import background from '../images/team_background.png'

const useStyles = makeStyles((theme) => ({
    section: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        [theme.breakpoints.up('lg')]: {
            padding: '200px 318px'
        },
        [theme.breakpoints.down('md')]: {
            padding: '50px 30px'
        },
    },
    avatarContainer: {
        margin: '16px 22px'
    },
    avatarImage: {
        [theme.breakpoints.up('lg')]: {
            margin: '42px 0px',
            height: 260, 
            width: 260, 
            border: '10px solid #FFF', 
        },
        [theme.breakpoints.down('md')]: {
            height: 150, 
            width: 150, 
            border: '6px solid #FFF', 
        },
    },
    teamText: {
        [theme.breakpoints.up('lg')]: {
            marginTop: '54px'
        },        
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
        <div className={classes.section} id='team'>
            <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                <Grid item>
                    <Typography variant='h3' color='textSecondary' align='center'>
                        Who are we?
                    </Typography>
                </Grid>
                <Grid item container direction='row' justify='space-between'>
                    {profiles.map((profile) => (
                        <Grid container direction='column' justify='center' alignItems='center' xs={12} lg={3} className={classes.avatarContainer}>
                            <Grid item><Avatar alt="Renee Yaseen" src={profile.picture} className={classes.avatarImage} /></Grid>
                            <Grid item><Typography variant='subtitle1' color='textSecondary'>{profile.name}</Typography></Grid>
                            <Grid item><Typography variant='body2' color='textSecondary'>{profile.description}</Typography></Grid>
                        </Grid>
                    ))}
                </Grid>
                <Grid item>
                    <Typography variant='subtitle1' color='textSecondary' align='center' className={classes.teamText}>
                        We are students at the University of Notre Dame (+ one little brother) harnessing the power of computing vision (CV) technology to promote goodness in gaming.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body2' color='textSecondary' align='center'>
                        FriendOver has won the 2021 LookUp Startup Competition for "for designing a ground-breaking solution to digital wellbeing and human technology."
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body2' color='textSecondary' align='center'>
                        We hope to pioneers in a global shift to engage with technology in healthier ways.
                    </Typography>
                </Grid>
            </Grid>
        </div>
);
}
