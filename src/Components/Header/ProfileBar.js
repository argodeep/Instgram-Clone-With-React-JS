import React, { component} from 'react';
import { withRouter, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import BrightnessLowRounded from '@material-ui/icons/BrightnessLowRounded';
import Avatar from '@material-ui/core/Avatar';
import firebase from '../../../Firebase';

import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  TypographyStyle: {
    flexGrow: 1,
  },
  headerStyle: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft:'10px',
      paddingRight: '10px',
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '15%',
      paddingRight: '15%',
    },
    width: '100%',
    background: '#fff',
    borderBottom: '0.2px solid #eee',
  },
  loader: {
    width: `calc(100%)`,
    height: '100vh',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.03),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  inputRoot: {
    color: '#000',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },

  },

  textTitle: {
      margin: 'auto', 
      display: 'block',
      justifyContent: 'center', 
      fontWeight: 'bold',  
      fontSize: 16, 
      padding: 5
  },

  appBar1: {
    position: 'relative',
    background: '#fff',
    borderBottom: '0.2px solid #eee',
  },
  flex: {
    flex: 1,
  },
  linearColorPrimary: {
    background: '#b92b27',
    background: '-webkit-linear-gradient(to right, #b92b27, #1565c0)',
    background: 'inear-gradient(to right, #b92b27, #1565c0)',
  },
  linearBarColorPrimary: {
    background: '#8a2387',
    background: '-webkit-linear-gradient(to right, #8a2387, #e94057, #f27121)',
    background: 'linear-gradient(to right, #8a2387, #e94057, #f27121)',
    },

});

class ProfileBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.userList = firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid);
    this.unsubscribe = null;
    this.state={
      profileUsername: '',
      isLoading: false,
      getUser: [],
      keyword: '',
      open: false
    }
  }

  componentDidMount() {
      this.unsubscribe = this.userList.onSnapshot(this.userFetch);
  }

  componentWillUnmount() {
      this.unsubscribe();   
  }

  userFetch = (querySnapshot) => {
    const getUser = [];
    querySnapshot.forEach((doc) => {
      const { profileUsername} = doc.data();
      getUser.push({
        key: doc.id,
        doc, // DocumentSnapshot
        profileUsername,
      });
    });
    this.setState({
      getUser,
    });
  }

  handleProfile = (e) => {
      const url = this.state.getUser.map(Id => Id.profileUsername).toString();
      const profile = window.location.href.includes(url);
      if (profile == true) {
          e.preventDefault();
      } else {
        this.props.history.push('/' + url); 
      }
  };

  handleChange = (event) => {
  this.setState({keyword: event.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.keyword == '')
    {
       e.preventDefault();
    } else {
     this.props.history.push("/" + this.state.keyword );
    }
  }

  onLogout = (e) => {
    this.setState({isLoading:true});
    setTimeout(function(){
          firebase.auth().signOut();
      }.bind(this),1200); 
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  Transition = (props) => {
    return <Slide direction="up" {...props} />;
  }
  
  render () {
    const { classes } = this.props;

    if(this.state.isLoading){
    return(
       <div className={classes.loader}>
            <LinearProgress
              style={{margin: 0}}
              classes={{
                colorPrimary: classes.linearColorPrimary,
                barColorPrimary: classes.linearBarColorPrimary,
              }}
              />
               <img src={'assets/loader.png'} alt="Loader" width='64px' style={{position: 'absolute', margin: 'auto',  top: 0,
          right: 0,
          bottom: 0,
          left: 0}} />  
        </div>
        
      )
    }

    return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.headerStyle} elevation={0}>
        <Toolbar> 
          <Hidden smUp>
          <IconButton aria-label="popup" style={{ padding: '0px 0px' }} onClick={this.handleClickOpen}>
              <BrightnessLowRounded  style={{ color: 'gray', padding: 0}}/>
          </IconButton>
          <Typography component="p" className={classes.textTitle}>Profile</Typography>
          <IconButton aria-label="popup" style={{ padding: '0px 12px' }}>
               
          </IconButton>
          </Hidden>        
          <Hidden only="xs">
           <Link to={`/`} style={{ flexGrow: 0.4 }}>
           <div>
           <img src={"/assets/text-logo.png"} alt="Logo" style={{height: '45px'}} />
           </div>
           </Link>
            <form style={{ display: 'flex', flexWrap: 'wrap',  flexGrow: 0.55}} onSubmit={this.handleSubmit}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Username"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={this.state.keyword}
                onChange={this.handleChange}
              />
            </div>
  
            
              </form>
          <Link to={`/notifications`}>
          <IconButton
                aria-haspopup="true"
                style={{color: 'gray', padding: 0, marginRight: 20}}
              >
               <FavoriteBorderIcon />
          </IconButton>
          </Link>
          <IconButton
                aria-haspopup="true"
                onClick={this.handleProfile}
                style={{color: 'gray', padding: 0}}
              >
               <AccountCircleOutlined />
          </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>

      <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.Transition}
        > 
          <div style={{backgroundColor: '#fafafa'}}>
          <AppBar className={classes.appBar1} elevation={0}>
            <Toolbar>
              <IconButton color="inherit" style={{ padding: '0px 0px' }} onClick={this.handleClose} aria-label="Close">
                <CloseIcon style={{ color: 'gray', padding: 0}}/>
              </IconButton>
              <Typography component="p" className={classes.textTitle}>Options</Typography>
              <IconButton aria-label="popup" style={{ padding: '0px 12px' }}>
               </IconButton>
            </Toolbar>
          </AppBar>
          <List
          subheader={<ListSubheader component="div">Account</ListSubheader>}
          > 
            <Link to={`/account/profile`} style={{ width: '100%', textDecoration: 'none'}}>
            <Divider />
            <ListItem button style={{backgroundColor: '#fff'}}>
              <ListItemText primary="Edit Profile"/>
            </ListItem>
            </Link>
            <Divider />
            <Divider />
            <Link to={`/account/password/change/`} style={{ width: '100%', textDecoration: 'none'}}>
            <ListItem button style={{backgroundColor: '#fff'}}>
              <ListItemText primary="Change Password"/>
            </ListItem>
            </Link>
            <Divider />
            <Divider />
          </List>
          <List
          subheader={<ListSubheader component="div"></ListSubheader>}
          > 
            <Divider />
            <Divider />
            <ListItem button style={{backgroundColor: '#fff'}} onClick={this.onLogout}>
              <ListItemText 
              primary={
                <React.Fragment>
                  <Typography component="span" style={{color: '#ff0000', fontSize: 16}}>
                    Log Out
                  </Typography>
                </React.Fragment>
              }
              />
            </ListItem>
            <Divider />
            <Divider />
          </List>
          </div>
         
        </Dialog>
    </div>
  );
  }
  
  
  }

  ProfileBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(withRouter(ProfileBar));
