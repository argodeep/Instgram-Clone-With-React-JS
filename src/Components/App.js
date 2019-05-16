import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import Home from './Content/Home';
import User from './Content/User';
import Profile from './Content/Profile';
import ChangePassword from './Content/ChangePassword';
import Create from './Content/Create';
import Error from './Content/Error';
import Unverified from './Content/Unverified';
import Skeleton from 'react-loading-skeleton';
import LinearProgress from '@material-ui/core/LinearProgress';

import Login from './OtherLayout/Login';
import Signup from './OtherLayout/Signup';
import ForgetPassword from './OtherLayout/ForgetPassword';
import firebase from '../../Firebase';
import Post from './Content/Post';




class App extends Component {
   constructor(props) {
    super(props);
   this.state = {
   	isLoading: true,
    user: null
  }
}

 componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user.email);
        //window.localStorage.setItem('user', JSON.stringify(user))
        this.setState({
          isLoading: false,
          user: user
        }); 
      } else {
        //window.localStorage.removeItem('user')
        this.setState({
          isLoading: false,
          user: null
        });
      }
    });
}


 render() {
   const ProtectedRoute = ({ component: Component, user, ...rest }) => (
		  <Route {...rest} render={(props) => (
		    user ? <Component {...props} {...rest} /> : <Redirect to='/account/login' />
		  )} />
		)

    if(this.state.isLoading){
    return(
      <div style={{backgroundColor: '#fff', width: '100%', height: '100%'}}>
        <img src={'/assets/loader.png'} alt="Loader" width='64px' style={{position: 'absolute', margin: 'auto',  top: 0,
      right: 0,
      bottom: 0,
      left: 0}} />                           
      </div>
      )
    }

	if(this.state.user == null) {
	   return <Router>
	       <div>
	          <ProtectedRoute exact={true} path='/' component={Home} />
            <ProtectedRoute exact={true} path='/create' component={Create} />
            <ProtectedRoute exact={true} path='/:query' component={User} />
            <ProtectedRoute exact={true} path='/account/profile' component={Profile} />
            <ProtectedRoute exact={true} path='/account/password/change/' component={ChangePassword} />
            <ProtectedRoute exact={true} path='/account/unverifed/' component={Unverified} />
            <ProtectedRoute exact={true} path='/p/:query/' component={Post} />
            <Route exact={true} path='/account/login' component={Login} />  
            <Route exact={true} path='/account/signup' component={Signup} />
            <Route exact={true} path='/account/forgetPassword' component={ForgetPassword} />   
	        </div>
	     </Router>; 
	}


	if(this.state.user != null ) {
	   return <Router>
	   <div>
	      <Switch>
	       	  <Route exact={true} path='/' component={Home} />
            <Route exact={true} path='/create' component={Create} />
            <Route exact={true} path='/:query' component={User} />
            <Route exact={true} path='/account/profile' component={Profile} />
            <Route exact={true} path='/account/password/change/' component={ChangePassword} />
            <Route exact={true} path='/account/unverifed/' component={Unverified} />
            <Route exact={true} path='/p/:query/' component={Post} />
	          <Redirect from="/account/login" to="/" />
            <Redirect from="/account/signup" to="/" />
            <Redirect from="/account/forgetPassword" to="/" />
            <Route component={Error} />
	       </Switch>
      </div>
    </Router>;
	    }
    
    

    
 }

}

export default App;
