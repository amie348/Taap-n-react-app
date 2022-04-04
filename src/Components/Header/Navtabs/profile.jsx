import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import {ExitToAppSharp,Security} from "@material-ui/icons";

import { useStyles } from "../HeaderStyles";
import { Link } from "react-router-dom";

export default function Profile() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const image = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        startIcon={
          <Avatar src={image} className={classes.navAvatar}></Avatar>
        }></Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
          <MenuItem  component={ListItem}  onClick={handleClose}>
            <ListItemIcon > <SettingsIcon  /></ListItemIcon>
            <ListItemText><Link to={'/profile'} >Settings</Link></ListItemText>
          </MenuItem>
          <MenuItem  component={ListItem}  onClick={handleClose}>
            <ListItemIcon > <Security  /></ListItemIcon>
            <ListItemText><Link to={'/changePassword'} >Change Password</Link></ListItemText>
          </MenuItem>
          

      </Menu>
    </Box>
  );
}
