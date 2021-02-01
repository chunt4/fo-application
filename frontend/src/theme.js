import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

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
  overrides:{
    MuiButton:{
      contained:{
        backgroundColor: '#FFF'
      }
    }
  }
});

export default Theme