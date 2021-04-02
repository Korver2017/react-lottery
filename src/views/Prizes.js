import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import reactLogo from '../images/logo512.png';
import { prizes } from '../const';
import Prize from '../components/Prize';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing (3),
    paddingBottom: theme.spacing (3),
  },
  gutter: {
    padding: theme.spacing (2),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Prizes = () => {

  const classes = useStyles();
  const [expanded, setExpanded] = useState (false);

  const handleExpandClick = () => {
    setExpanded (!expanded);
  };

  useEffect (() => {
    console.log ('prizes: ', prizes);
  }, []);

  return (
    <div className="prizes">
      <Grid container className={classes.root}>
        {
          prizes.map (prize => (
            <Prize prize={prize} />
          ))
        }
      </Grid>
    </div>
  );
}

export default Prizes;
