import { createMuiTheme } from '@material-ui/core/styles';
import AvenirWoff2 from './fonts/Avenir-Regular.woff2'
import AvenirBlackWoff2 from './fonts/Avenir-Black.woff2'
import AvenirBookWoff2 from './fonts/Avenir-Book.woff2'

const Theme = createMuiTheme({
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
      fontSize: '1.2rem'
    },
    body1: {
      fontFamily: 'Avenir-Book',
      fontSize: '1.2rem'
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