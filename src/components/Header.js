/**
 *
 * React, Router & Components
 *
 */
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Employees from './Employees';
import Prizes from './Prizes';


/**
 *
 * Styles Settings
 *
 */
const useStyles = makeStyles ({
  root: {
    flexGrow: 1,
  },
  link: {
    '& a': {
      textDecoration: 'none',
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
          {/* <Tab label="Item Three" /> */}
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
