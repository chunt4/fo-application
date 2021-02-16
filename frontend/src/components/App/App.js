import './App.css';
import NavBar from '../NavBar/NavBar'
import Home from '../../pages/Home'
import About from '../../pages/About'
import Team from '../../pages/Team'
import Subscribe from '../../pages/Subscribe';
import Theme from '../../theme'
import { ThemeProvider } from '@material-ui/core/styles';

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <NavBar />
      <Home />
      <About />
      <Team />
      <Subscribe />
    </ThemeProvider>
  );
}
