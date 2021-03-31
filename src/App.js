/**
 *
 * Material UI
 *
 */
import { makeStyles } from '@material-ui/core/styles';


/**
 *
 * Component
 *
 */
import Header from './components/Header';


/**
 *
 * Styles Settings
 *
 */
const useStyles = makeStyles (theme => ({
  root: {
    backgroundColor: '#222736',
  }
}));


/**
 *
 * App
 *
 */
const App = () => {

  // Apply styles.
  const classes = useStyles ();

  return (
    <div className={`${classes.root} App`}>
      <Header />
    </div>
  );
}

export default App;
