import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import './sidebar.css';
import { propTypes } from 'react-gravatar';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
// import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Sidebar=(props)=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
 // const teamSet = this.props.setTeam
  function handleClick() {
    setOpen(!open);
  }

  return (
    
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <h3>Teams</h3>
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button>
        <div className="Panthers">
          <ListItemText primary="Panthers" onClick={()=>{props.setTeam('Panthers')}} />
        </div>
      </ListItem>
      <ListItem button>
        <div className="Hornets">
          <ListItemText primary="Hornets" onClick={()=>{props.setTeam('Hornets')}}/>
        </div>
      </ListItem>
      <ListItem button>
        <div className="Knights">
          <ListItemText primary="Charlotte Knights" onClick={()=>{props.setTeam('Knights')}} />
        </div>
      </ListItem>

    </List>
  );
}
export default Sidebar;