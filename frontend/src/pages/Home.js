import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import logo from '../images/whiteall.png'
import background from '../images/home_background.jpg'

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        paddingLeft: '50%',
        paddingBottom: '230px'
    },
    messageContainer: {
        paddingTop: '260px',
        paddingRight: '25%'
        
    },
    message: {
        width: '100%',
        padding: theme.spacing(2), 
    },
    messageButtons: {
        color: theme.palette.primary.main
    }
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <Grid 
                container 
                direction='column'
                justify='center'
                alignItems='flex-start'
                className={classes.messageContainer}
            >
                <Grid item className={classes.message}>
                    <img src={logo} style={{height: '182px'}}/>
                </Grid>
                <Grid item className={classes.message}>
                    <Typography color='textSecondary' variant='h4'>At FriendOver, we believe that staying in should stay exciting.</Typography>
                </Grid>
                <Grid item className={classes.message}>
                    <Typography color='textSecondary' variant='h6'>Friendover's motion-activated games don't require a console or remotes. Experience the next generation in online gaming.</Typography>
                </Grid>
                <Grid 
                    item 
                    container 
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                    className={classes.message}
                >
                    <Grid item>
                        <Button variant='contained' className={classes.messageButtons}>LEARN MORE</Button>
                    </Grid>
                    <Grid item>
                        <Button variant='outlined' className={classes.messageButtons}>Parent Sign Up</Button>
                    </Grid>
                </Grid>
                
            </Grid>
        </div>

    );
}
