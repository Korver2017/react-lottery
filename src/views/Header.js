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
 * CSS Style
 *
 */
import './header.css';


/**
 *
 * Material UI Style
 *
 */
const useStyles = makeStyles (theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.simpleDark.main,
    borderRadius: 0,
  },
  link: {
    textDecoration: 'none',
    '& .tab': {
      color: theme.palette.simpleDark.light,
      '&:hover': {
        color: '#fff',
      }
    }
    // '& a': {
    //   color: theme.palette.simpleDark.light,
    //   '&:hover': {
    //     color: '#fff',
    //   },
    // },
  },
  indicator: {
    backgroundColor: 'white',
  },
  selectedTab: {
    '&.tab': {color: 'white'}
    
  }
  // tab: {

  // },
  // selectedTab: {
  //   color: 'blue',
  // }
}));
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
          classes={{indicator: classes.indicator}}
          centered
        >
          {/* <Tab classes={{selected: classes.selectedTab}} label="Employees" component={Link} to="/employees" /> */}
          <Tab classes={{selected: classes.selectedTab}} className="tab" label="Employees" component={Link} to="/employees" />
          <Tab classes={{selected: classes.selectedTab}} className="tab" label="Prizes" component={Link} to="/prizes" />
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
