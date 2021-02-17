import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, TextField  } from '@material-ui/core';
import renee from '../images/renee.jpg'
import chris from '../images/chris.jpeg'
import daniel from '../images/daniel.jpg'

const useStyles = makeStyles((theme) => ({
    section: {
        backgroundColor: theme.backgroundColor.white,
        padding: '210px 318px'
    },
    newsletterInfo: {
        display: 'list-item',
        listStyleType: 'disc',
        listStylePosition: 'inside'
    },
    textField: {
        height: 70,
        width: 650,
        textAlign: 'center'
    },
    cssLabel: {
        color: `${theme.palette.secondary.main} !important`,
        fontWeight: 400,
        fontStyle: 'italic',
        fontSize: '25px',
        margin: 'auto',
        textAlign: 'center'
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `${theme.palette.secondary.main} !important`,
            borderWidth: '5px',
        }
    },

    cssFocused: {},

    notchedOutline: {
        borderWidth: '2px',
        borderColor: `${theme.palette.secondary.main} !important`,
        borderWidth: '5px'
    },
}));

export default function Subscribe() {
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
            <Grid container direction='column' justify='center' alignItems='center' spacing={9}>
                <Grid item>
                    <Typography variant='h3' color='textPrimary'>
                        How can I be the first to use it?
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' color='textPrimary' align='center'>
                        You can subscribe! In addition to being first in line for our launch, you'll receive a weekly newsletter full of:
                    </Typography>
                </Grid>
                <Grid item container direction='column' justify='left'>
                    <Grid item>
                        <Typography variant='h5' color='textPrimary' className={classes.newsletterInfo}>virtual playdate ideas</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h5' color='textPrimary' className={classes.newsletterInfo}>fun links and resources to use while virtual</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h5' color='textPrimary' className={classes.newsletterInfo}>cool projects and DIYs to do from home</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant='body2' color='textPrimary' align='center'>
                        ...Delivered right to your inbox every week!
                    </Typography>
                </Grid>
                <Grid item container direction='row' justify='center' alignItems='center' color='primary' spacing={3}>
                    <Grid item>
                        <TextField 
                            id="outlined-search" 
                            label="Enter your email here..." 
                            variant="outlined" 
                            color='secondary'
                            className={classes.textField}
                            InputLabelProps={{
                                classes: {
                                  root: classes.cssLabel,
                                  focused: classes.cssFocused,
                                },
                            }}
                            InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            }
                        }}/>
                    </Grid>
                    <Grid item>
                        <Button variant='contained'>Subscribe Now</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
);
}
