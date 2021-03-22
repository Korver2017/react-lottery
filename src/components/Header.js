import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import Employees from './employees/Employees';
import Prizes from './Prizes';

const useStyles = makeStyles({
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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <Paper className={classes.root}>
        <Tabs
          className={classes.link}
          value={value}
          onChange={handleChange}
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
