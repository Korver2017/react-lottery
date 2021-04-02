/**
 *
 * Material UI
 *
 */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


/**
 *
 * Component
 *
 */
import Prize from '../components/Prize';


/**
 *
 * Const
 *
 */
import { prizes } from '../const';


/**
 *
 * Material UI Style
 *
 */
const useStyles = makeStyles (theme => ({
  root: {
    marginTop: theme.spacing (3),
    paddingBottom: theme.spacing (3),
  },
}));


/**
 *
 * Prizes
 *
 */
const Prizes = () => {

  // Apply styles.
  const classes = useStyles ();

  
  /**
   *
   * JSX
   *
   */
  return (
    <div className="prizes">
      <Grid container className={classes.root}>
        {
          prizes.map (prize => (
            <Prize key={prize.id} prize={prize} />
          ))
        }
      </Grid>
    </div>
  );
}

export default Prizes;
