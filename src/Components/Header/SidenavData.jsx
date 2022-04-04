import React, { useContext } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import BookIcon from "@material-ui/icons/Book";
import { Assessment, Assignment, BugReportRounded, DynamicFeed, Report, SupervisedUserCircle, SupervisedUserCircleOutlined, VerifiedUserTwoTone } from "@material-ui/icons";

import PostAddIcon from "@material-ui/icons/PostAdd";
import Icons from "@material-ui/icons";
// import PeopleIcon from '@mui/icons-material/People';
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { NavLink } from "react-router-dom";
import { useStyles } from "./HeaderStyles";
import AuthContext from "../../auth/context";
import { toast } from "react-toastify";

export default function SidenavData({ handleDrawerClose }) {
  const { user, setUser } = useContext(AuthContext);
  console.log("set",user);
  const classes = useStyles();
  const listItemData = [
    // { label: "Owners", link: "/link", icon: < /> },

  ];
  const logoutHandler = () => {
    localStorage.clear();
    window.location = '/';
    toast.success("Your are successfully logout", {
      position: toast.POSITION.TOP_CENTER,
      theme: 'colored'
    });
  }
  // ||||
  return (
    <List>
      <Button
          size='small'
          className={classes.navButton}
          onClick={() => handleDrawerClose()}
         >
          <ListItem
            exact
            component={NavLink}
            to="/dashboard"
            className={classes.navlinks}
            activeClassName={classes.activeNavlinks}
            >
            <ListItemIcon><Assessment /></ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
        </Button>
      {
        user.role==='admin'||user.role==='team'? (
          <>
          {user.role==='admin' &&
           <Button
           size='small'
           className={classes.navButton}
           onClick={() => handleDrawerClose()}
          >
           <ListItem
             exact
             component={NavLink}
             to="/team"
             className={classes.navlinks}
             activeClassName={classes.activeNavlinks}>
             <ListItemIcon>
               {/* <Assessment /> */}
               <VerifiedUserTwoTone />

               </ListItemIcon>
             <ListItemText>Team</ListItemText>
           </ListItem>
         </Button>
         }
         
        <Button
          size='small'
          className={classes.navButton}
          onClick={() => handleDrawerClose()}
         >
          <ListItem
            exact
            component={NavLink}
            to="/owners"
            className={classes.navlinks}
            activeClassName={classes.activeNavlinks}>
            <ListItemIcon>
              <SupervisedUserCircleOutlined />
            </ListItemIcon>
            <ListItemText>Owners</ListItemText>
          </ListItem>
        </Button>
        
        <Button
          size='small'
          className={classes.navButton}
          onClick={() => handleDrawerClose()}
         >
          <ListItem
            exact
            component={NavLink}
            to="/requests"
            className={classes.navlinks}
            activeClassName={classes.activeNavlinks}>
            <ListItemIcon><DynamicFeed /></ListItemIcon>
            <ListItemText>Requests</ListItemText>
          </ListItem>
        </Button>
        <Button
          size='small'
          className={classes.navButton}
          onClick={() => handleDrawerClose()}
         >
          <ListItem
            exact
            component={NavLink}
            to="/reports"
            className={classes.navlinks}
            activeClassName={classes.activeNavlinks}>
            <ListItemIcon>
              {/* <PostAddIcon /> */}
              <Report/>
              </ListItemIcon>
            <ListItemText>Reports</ListItemText>
          </ListItem>
        </Button>
        </>
        ):null
      }
      <Button
        size='small'
        className={classes.navButton}
        onClick={logoutHandler}
      >
        <ListItem
          exact
          component={NavLink}
          to={'/login'}
          className={classes.navlinks}
        >
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </Button>
    </List>
  );
}



// <Button
// size='small'
// className={classes.navButton}
// onClick={() => setUser(null)}
// >
// <ListItem
//   exact
//   component={NavLink}
//   to={'/login'}
//   className={classes.navlinks}
//   activeClassName={classes.activeNavlinks}>
//   {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
//   <ListItemText>{user?.name}</ListItemText>
// </ListItem>
// </Button>
