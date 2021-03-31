/**
 *
 * React & Router
 *
 */
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


/**
 *
 * Components
 *
 */
import Employees from './Employees';
import Prizes from './Prizes';


/**
 *
 * CSS Styles
 *
 */
import './modal/modal.css';


/**
 *
 * Material UI Styles
 *
 */
const useStyles = makeStyles ({
  root: {
    flexGrow: 1,
    backgroundColor: '#282E3F',
    borderRadius: 0,
  },
  link: {
    '& a': {
      textDecoration: 'none',
      color: '#A6B0CF',
      '&:hover': {
        color: '#fff',
      },
      '&:active': {
        color: '#fff',
      },
    }
  }
});
const Header = () => {

  // Apply styles.
  const classes = useStyles ();

  // State of tab.
  const [tab, setTab] = useState (0);


  /**
   *
   * Handle Change Tab
   *
   */
  const handleChangeTab = (e, newTab) => setTab (newTab);


  /**
   *
   * JSX
   *
   */
  return (
    <Router>
      <Paper className={classes.root}>

        <Tabs
          className={classes.link}
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Employees" component={Link} to="/employees" />
          <Tab label="Prizes" component={Link} to="/prizes" />
        </Tabs>

      </Paper>

      <Switch>

        <Route path="/employees">
          <Employees />
        </Route>

        <Route path="/prizes">
          <Prizes />
        </Route>
        
      </Switch>
    </Router>
  );
}

export default Header;
