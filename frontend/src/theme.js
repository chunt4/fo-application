import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  backgroundColor: {
    white: '#fafafa',
    blue: '#BAD2E3'
  },
  palette: {
    primary: {
        main: '#140c57'
    },
    text: {
        primary: '#140c57',
        secondary: '#FFF',
    }
  },
  typography: {
    typography: {
      fontFamily: 'Avenir-Regular'
    },
    h3: {
      fontFamily: 'Avenir-Black'
    },
    h4: {
      fontFamily: 'Avenir-Black',
      fontSize: '1.9rem'
    },
    h6: {
      fontFamily: 'Avenir-Black',
      fontSize: '1.15rem'
    },
    subtitle1: {
      fontFamily: 'Avenir-Black',
      fontSize: '1.3rem'
    },
    body1: {
      fontFamily: 'Avenir-Book',
      fontSize: '1.3rem'
    },
    button: {
      fontFamily: 'Avenir-Black',
    }
  },
  overrides:{
    MuiButton:{
      contained:{
        backgroundColor: '#FFF',
        height: '50px',
        fontSize: '1rem'
      },
      outlined: {
        height: '50px',
        border: '4px solid',
        fontSize: '1rem'
      },
      text: {
        fontSize: '.8rem'
      }
    },
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Avenir-Regular', 'Avenir-Black', 'Avenir-Book'],
      },
    },
  }
});

export default Theme