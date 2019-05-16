import React, { Fragment } from 'react';
import { AppBar, BottomBar, EditProfileBar, ChangePass } from '../Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import classnames from 'classnames';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineRounded from '@material-ui/icons/ChatBubbleOutlineRounded';
import ChatBubble from '@material-ui/icons/ChatBubble';
import InputBase from '@material-ui/core/InputBase';
import Skeleton from 'react-loading-skeleton';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';

import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import firebase from '../../../Firebase';
import {default as UUID} from "node-uuid";
import { Hidden } from '@material-ui/core';
import ProcessImage from 'react-imgpro';


const appHeight = 64;

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);



const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: '#fafafa',
    marginTop: theme.spacing.unit * 8,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 7,
    },
  },
  heroContent: {
    maxWidth: 933,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing.unit * 0}px 0 ${theme.spacing.unit * 1}px`,
    },
    padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 4}px`,
    flexGrow: 1,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
    display: 'inline',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px 0`,
  },
  footer: {
    //backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
   button: {
    margin: theme.spacing.unit,
  },

  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    marginTop: appHeight,
    marginBottom: 20,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    width: '100%',
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
  },

  wrapper: {
    width: '100%',
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 0,
    display: 'block',
  },

  progress: {
    margin: theme.spacing.unit * 2,
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.05),
    },
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    width: '100%',
  },
  inputRoot: {
    color: '#000',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',

  },

  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 900,
    maxHeight: 900,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 10}px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      marginTop: 0,
      border: 0,
      display: 'block',
      minHeight: 200,
    },
    borderTop: '1.2px solid #eee',
    borderBottom: '1.2px solid #eee',
    borderLeft: '0px solid #eee',
    borderRight: '1.2px solid #eee',
  },

  paper1: {
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    minHeight: 900,
    maxHeight: 900,
    border: '1.2px solid #eee',
  },

  gridCont: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: 0
    },
  },

  gridItem: {
    paddingLeft: '0px !important', 
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '0px 0px !important',
    },
  },

  avatar: {
    margin: theme.spacing.unit,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      padding: '0 16px',
      marginTop: 0,
    },
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: 10
    },
  },
  selected: {
    '&$selected, &$selected:hover, &$selected:focus': {
      backgroundColor: '#fff',
      borderLeft: '2px Solid black',
      borderTopLeftRadius: 2,
      paddingTop: 15,
      paddingLeft: 35,
    },  
  },

  notSelected: {
    paddingTop: 15,
    paddingLeft: 37,
  },

  selectedText: {
      fontWeight: 500,
      fontSize: '16px', 
  },

  notSelectedText: {
    fontWeight: 'normal',
    fontSize: '16px',
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    height: '25px',
    padding: '5px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },

  selectInput: {
    width: '70% !important',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
    },
  },

  gender: {
    width: '30%',
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
    },
  },
  profile: {
    marginTop: 10,
    marginBottom: 10,
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      marginBottom: 0
    },
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

  class ChangePassword extends React.Component {
  
  constructor(props) {
    super(props);
    this.userList = firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid);
    this.unsubscribe = null;
    this.state = {
        key: '',
        email: '',
        profileImg: '',
        profileUsername: '',
        selectedIndex: 2,
        getUser: [],
        isLoading: true,
        password1: '',
        password2: '',
        password: '',
        open: false,
        error: false,
        oldPasswordError: false,
        newpasswordError: false,
        null: false
    };
  }

  componentDidMount() {
    document.title = 'Edit Profile • Instagram';
    this.unsubscribe = this.userList.onSnapshot(this.userFetch1);

  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  
  userFetch1 = (querySnapshot) => {
    const getUser = [];
    querySnapshot.forEach((doc) => {
      const user = doc.data();
        this.setState({
          key: doc.id,
          email: user.email,
          profileUsername: user.profileUsername,
          profileImg: user.profileImg,
          uid: user.uid
        });
    });
    this.setState({
      getUser,
      isLoading: false,
    });
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };


  handleChangePassword = (e) => {
     e.preventDefault();
     if (this.state.uid == firebase.auth().currentUser.uid) {
      if (this.state.password2 == '' && this.state.password1 == '' && this.state.password == '') {
          this.setState({ null: true });
      }
     if (this.state.password2 == '' || this.state.password1 == '') {
          this.setState({ error: false });
     }
     if (this.state.password2 !== this.state.password1) {
          this.setState({ error: true });
      } else {
        this.setState({isLoading: true});
        const { password, password2 } = this.state;
        const credential = firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email,
          this.state.password
        );
        firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(credential)
          .then((user) => {
            firebase.auth().currentUser.updatePassword(password2)
            .then((user) => {
             this.setState({
               password1: '',
               password2: '',
               password: '',
               isLoading: false
             });
             this.handleClick();
           })
            .catch((error) => {
              this.setState({ newpasswordError: true });
           });
          })
          .catch((error) => {
            this.setState({
              oldPasswordError: true,
              isLoading: false
            });
          })
       
      }
    }
  }

  
  handleClick = () => {
      this.setState({ open: true });
  };
    
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    this.setState({ open: false });
  }; 
    
    
  render() {
    const { classes } = this.props;
    const progress = this.state.isLoading;
    const error = this.state.error;

    return (
    <React.Fragment>
      <CssBaseline />
      <ChangePass />
      <main style={{width: '100%'}}>
        {/* Hero unit */}     
        <div className={classes.heroUnit}>
         { progress === true ?
                          <LinearProgress
                          style={{margin: 0}}
                          classes={{
                            colorPrimary: classes.linearColorPrimary,
                            barColorPrimary: classes.linearBarColorPrimary,
                          }}
                        />  : 
          <div className={classes.heroContent}>    
            <div className={classes.heroButtons}>
           
               <Grid container className={classes.gridCont} spacing={16}>
                 <Hidden smDown> 
                   <Grid item xs={false} sm={false} md={3} lg={3} style={{paddingRight: 0 }}>
                      <Paper className={classes.paper1} elevation={0}>
                       <List style={{padding: 0}}>
                            <Link to={`/account/profile`} style={{ width: '100%', textDecoration: 'none'}}>
                            <ListItem
                            button
                            selected={this.state.selectedIndex === 1}
                            onClick={event => this.handleListItemClick(event, 1)}
                            classes={{
                              root: classes.notSelected,
                              selected: classes.selected,
                            }}
                          >
                            <ListItemText
                            classes={{
                              primary: this.state.selectedIndex === 1 ? classes.selectedText : classes.notSelectedText
                            }}                             
                            primary="Edit Profile" />
                          </ListItem>
                          </Link>
                          <ListItem
                            button
                            selected={this.state.selectedIndex === 2}
                            onClick={event => this.handleListItemClick(event, 2)}
                            classes={{
                              root: classes.notSelected,
                              selected: classes.selected,
                            }}
                          >
                            <ListItemText
                             classes={{
                              primary: this.state.selectedIndex === 2 ? classes.selectedText : classes.notSelectedText
                            }}
                            primary="Change Paassword" />
                          </ListItem>
                        </List>
                      </Paper>

                 </Grid>
                 </Hidden>
                                   
                  {this.state.selectedIndex === 2 &&
                 <Grid item xs={12} sm={12} md={9} lg={9} className={classes.gridItem}>
                  <Paper className={classes.paper} elevation={0}>
                      <ListItem alignItems="flex-start"  className={classes.profile}>
                      <ListItemAvatar>
                        <Avatar alt="profile image" src={this.state.profileImg} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography component="span" style={{fontSize: 25}}>
                              {this.state.profileUsername}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                     </ListItem>
                    <form className={classes.form} onSubmit={this.handleChangePassword}>
                        <FormControl margin="normal" fullWidth>
                          <InputLabel shrink htmlFor="bootstrap-input2" className={classes.bootstrapFormLabel}>
                            Old Password
                          </InputLabel>
                           <InputBase
                            type="password"
                            onChange={e => this.setState({ password: e.target.value })}
                            id="bootstrap-input2"
                            value={this.state.password}
                            classes={{
                              root: classes.bootstrapRoot,
                              input: classes.bootstrapInput,
                            }}
                          />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                            New Password
                          </InputLabel>

                           <InputBase
                            type="password"
                            onChange={e => this.setState({ password1: e.target.value })}
                            id="bootstrap-input"
                            value={this.state.password1}
                            classes={{
                              root: classes.bootstrapRoot,
                              input: classes.bootstrapInput,
                            }}
                          />
                          <Typography component="p" style={{color: '#000', padding: 5, fontSize: 12}}>Suggestions: Enter min 8 digit password</Typography>
                       </FormControl>
                       <FormControl margin="normal" fullWidth>
                          <InputLabel shrink htmlFor="bootstrap-input1" className={classes.bootstrapFormLabel}>
                            Confirm New Password
                          </InputLabel>
                           <InputBase
                            type="password"
                            onChange={e => this.setState({ password2: e.target.value })}
                            id="bootstrap-input1"
                            value={this.state.password2}
                            classes={{
                              root: classes.bootstrapRoot,
                              input: classes.bootstrapInput,
                            }}
                          />
                          {this.state.error == true && 
                          <Typography component="p" style={{color: '#ff0000', padding: 5, fontSize: 12}}>Please make sure both password match</Typography>
                          }
                       </FormControl>


                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                       Change Password
                      </Button>
                    </form>
                   
                  </Paper>
                 </Grid>
                }
                
                </Grid>
            </div>
          </div>
         }
        </div>        
      </main>
      
      <Hidden smDown> 
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          www.instagramm.online
        </Typography>
      </footer>
      </Hidden>
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Password Changes Successfully</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
         />
         <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.oldPasswordError}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Check Old Password First</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
         />
         <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.newpasswordError}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Something Went Wrong</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
         />
         <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.newpasswordError}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Enter Password First</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
         />
    </React.Fragment>
    );
  }
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangePassword);