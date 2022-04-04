import React from "react";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Profile from "./Navtabs/profile";
import Notification from "./Navtabs/notification";
import { useStyles } from "./HeaderStyles";
import Messages from "./Navtabs/Messages";
import MenuIcon from "@material-ui/icons/Menu";

export default function Navbar({ handleDrawerOpen }) {
  const classes = useStyles();

  return (
    <AppBar position='fixed' style={{ background: '#F2BC00D4' }}>
      <Toolbar className={classes.toolbar}>
        <img src="https://taapn.com/wp-content/uploads/2021/09/Asset-3-1536x507.png" alt="logo" height={"50px"} width={"150px"} />
        <Hidden smDown>
          <Box style={{ display: "flex" }}>
            <Notification />
            {/* <Messages /> */}
            <Profile />
          </Box>
        </Hidden>
        <Hidden mdUp>
          <IconButton color='inherit' onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
