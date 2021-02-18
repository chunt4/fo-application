import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920
    }
  },
  backgroundColor: {
    white: '#fafafa',
    blue: '#140c57'
  },
  palette: {
    primary: {
      main: '#49bdde'
    },
    secondary: {
      main: '#5fddb6'
    },
    text: {
      primary: '#140c57',
      secondary: '#FFF',
    }
  },
  typography: {
    fontFamily: [
      'Nunito'
    ].join(','),
    typography: {
    },
    h3: {
      fontWeight: 900,
      '@media (max-width:1200px)': {
        fontSize: '2rem'
      },
      fontSize: '3.75rem'  
    },
    h4: {
      fontWeight: 800,
      '@media (max-width:1200px)': {
        fontSize: '1.5rem'
      },
      fontSize: '2.375rem'  
    },
    h5: {
      fontWeight: 600,
      '@media (max-width:1200px)': {
        fontSize: '1rem'
      },
      fontSize: '1.875rem'  
    },
    h6: {
      fontWeight: 400,
      '@media (max-width:1200px)': {
        lineHeight: 1.3,
        fontSize: '1.2rem'
      },
      fontSize: '1.875rem',
      lineHeight: 1.5
    },
    subtitle1: {
      fontWeight: 900,
      '@media (max-width:1200px)': {
        fontSize: '1.4rem'
      },
      fontSize: '1.875rem' 
    },
    subtitle2: {
      fontWeight: 900,
      '@media (max-width:1200px)': {
        fontSize: '.625.rem'
      },
      fontSize: '.9375rem',
      textTransform: 'uppercase'
    },
    body1: {
      fontWeight: 400,
      '@media (max-width:1200px)': {
        fontSize: '1.2rem'
      },
      fontSize: '2.5rem' 
    },
    body2: {
      fontWeight: 400,
      '@media (max-width:1200px)': {
        fontSize: '1.2rem'
      },
      fontSize: '1.875rem' 
    },
    button: {
      fontWeight: 900,
      fontSize: '25px'
    },
    link: {
      fontWeight: 900
    }
  },
  overrides:{
    MuiButton:{
      contained:{
        backgroundColor: '#FFF',
        height: '63px',
        fontSize: '1rem',
        width: '300px', 
        borderRadius: '35px',
        color: '#5fddb6'
      },
      outlined: {
        height: '63px',
        border: '5px solid',
        fontSize: '1rem',
        width: '300px', 
        borderRadius: '35px',
        color: '#5fddb6'
      },
      text: {
        '@media (max-width:1200px)': {
          fontSize: '1rem'
        },
        fontSize: '1.5625rem'
      }
    },
    MuiOutlinedInput: {
      input: {
        '@media (max-width:1200px)': {
          fontSize: '1rem'
        },
        fontSize: '1.5625rem',
        color: '#5fddb6'
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(24px, 20px) scale(1)',
        '&$shrink': {
          transform: 'translate(24px, -12px) scale(.75)',
          backgroundColor: 'transparent'
        }
      },
    },
    PrivateNotchedOutline: {
      legendNotched: {
        maxWidth: 215
      }
    },
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Nunito']
      },
    },
  }
});

export default Theme