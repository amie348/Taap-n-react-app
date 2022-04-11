import { Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import  {getUser, login}  from '../api/auth'
import BlogComponent from './BodyComponent/BlogComponent'
import Dashboard from './BodyComponent/Dashboard/Dashboard'
import Forgot from './BodyComponent/Forgot'
import Link from './BodyComponent/Link'
import Login from './BodyComponent/Login'
import FooterComponent from './FooterComponent'
import HeaderComponent from './Header/HeaderComponent'
import { useStyles } from './Header/HeaderStyles'
import AuthContext from '../auth/context';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './BodyComponent/Profile'
import Staff from './BodyComponent/Staff'
import UpdatePassword from './BodyComponent/UpdatePassword'
import Owners from './BodyComponent/Owners'
import Requests from './BodyComponent/Requests'
import Reports from './BodyComponent/Reports'
import UserDetail from './UserDetai'
import User from './BodyComponent/UserComponent';

export default function Main() {
  const [user, setUser] = useState();
    const classes = useStyles();
    useEffect(() => {
    setUser(getUser);
    }, [])
    
    const loginHandler = async (user) => {
          const res = await login(user)
          if(!res.ok) return  toast.error("Incorrect username or password", {
            position: toast.POSITION.TOP_CENTER,
            theme:'colored'
          });
          await setUser(res.data.user);
          localStorage.setItem("jwt", res.data.token);
          toast.success("logged in successfully !!!", {
            position: toast.POSITION.TOP_CENTER,
            theme:'colored'
          });
          window.location = '/dashboard';
      }
    
  return (
    <>
      <ToastContainer style={{ width: "322px" }} />
      <AuthContext.Provider value={{ user, setUser, }}>
       <BrowserRouter>
       <Box className={classes.wrapper}>
        <Switch>
          <Route exact path='/blog' render={(props) => <BlogComponent  {...props}/>} />
          <Route exact path='/requests' render={(props) => <Requests {...props}/>} />
          <Route exact path='/forgot' render={(props) => <Forgot {...props} />} />
          <Route exact path='/' render={(props) => <Login onLogin={loginHandler} {...props} />} />
          <Route exact path='/dashboard' render={(props) => <Dashboard {...props} />} />
          <Route exact path='/profile' render={(props) => <Profile {...props} />} />
          <Route exact path='/team' render={(props) => <Staff {...props} />} />
          <Route exact path='/reports' render={(props) => <Reports {...props} />} />
          <Route exact path='/owners' render={(props) => <Owners {...props} />} />
          <Route exact path='/users' render={(props) => <User {...props} />} />
          <Route exact path='/changePassword' render={(props) => <UpdatePassword {...props} />} />
          <Route exact path='/userDetail/:id' render={(props) => <UserDetail {...props} />} />
        </Switch>
      </Box>
      {user&& <HeaderComponent />}
      {user&& <FooterComponent />}

    </BrowserRouter>
    </AuthContext.Provider>
    </>
  )
}
