import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, TextField, useMediaQuery } from '@material-ui/core';

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
    newsletterInfo: {
        display: 'list-item',
        listStyleType: 'disc',
        listStylePosition: 'inside'
    },
    textField: {
        height: 70,
        [theme.breakpoints.up('lg')]: {
            width: '650px'
        },
        [theme.breakpoints.down('md')]: {
            width: '300px'
        },
        textAlign: 'center'
    },
    cssLabel: {
        color: `${theme.palette.secondary.main} !important`,
        fontWeight: 400,
        fontStyle: 'italic',
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.5625rem',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
        },
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
        borderColor: `${theme.palette.secondary.main} !important`,
        borderWidth: '5px'
    },
}));

export default function Subscribe() {
    const classes = useStyles();
    const isSmall = useMediaQuery('(max-width:1200px)');
    return (
        <div className={classes.section} id='subscribe'>
            <Grid container direction='column' justify='center' alignItems='center' spacing={isSmall ? 5 : 9}>
                <Grid item>
                    <Typography variant='h3' color='textPrimary' align='center'>
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
                            id='outlined-search'
                            label='Enter your email here...' 
                            variant='outlined' 
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
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant='contained'>Subscribe Now</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
