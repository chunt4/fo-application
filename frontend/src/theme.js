import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  
  backgroundColor: {
    white: '#fafafa',
    blue: '#BAD2E3'
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
      fontSize: '60px'
    },
    h4: {
      fontWeight: 800,
      fontSize: '38px'
    },
    h5: {
      fontWeight: 600,
      fontSize: '30px'
    },
    h6: {
      fontWeight: 400,
      fontSize: '30px',
      lineHeight: 1.5
    },
    subtitle1: {
      fontWeight: 900,
      fontSize: '30px'
    },
    subtitle2: {
      fontWeight: 900,
      fontSize: '15px',
      textTransform: 'uppercase'
    },
    body1: {
      fontWeight: 400,
      fontSize: '40px'
    },
    body2: {
      fontWeight: 400,
      fontSize: '30px'
      // '@media (min-width:600px)': {
      //   fontSize: '20px',
      // },
      // '@media (min-width:1280px)': {
      //   fontSize: '30px',
      // },
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
        fontSize: '25px'
      }
    },
    MuiOutlinedInput: {
      input: {
        fontSize: '25px',
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