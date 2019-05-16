import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import firebase from '../../../Firebase';

const styles = theme => ({
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
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },

  paper1: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
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

class Signup extends React.Component {
  
  constructor(props) {
    super(props);
    this.addUser = firebase.firestore().collection("users");
    this.unsubscribe = null;
    this.state = {
      email: '',
      password: '',
      fullName: '',
      profileUsername: '',
      userName: '',
      uid: '',
      signup: '',
      isLoading: false,
      showPassword: false,
      unAvailable: false,
      blank: false
    }
  }

  componentDidMount() {
     document.title = 'Signup to Continue • Instagram';
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  userFetch = (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const user = doc.data();
        this.setState({
          profileUsername: user.profileUsername,
        });
    });
    if (querySnapshot.size == 0) {
      const { email, password } = this.state;
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const { email } = this.state;
        firebase.auth().currentUser.sendEmailVerification();
        this.addUser.add({
          email: this.state.email,
          fullName: this.state.fullName,
          profileUsername: this.state.userName,
          uid: firebase.auth().currentUser.uid,
          signedUpOn: firebase.firestore.Timestamp.fromDate(new Date()),
          })
      }).then(() => {
          this.setState({
              email: '',
              password: '',
              fullName: '',
              profileUsername: '',
              uid: '',
              signup: '',
          });
      }).catch((error) => {
        if (error.message.includes("The email address is already in use by another account.")){
            this.handleClick();
        }
        this.setState({
          isLoading: false,
          unAvailable: false
        });
      });
    } else {
        this.setState({
        unAvailable: true,
        isLoading: false,
        });
    }
    this.unsubscribe();
  }

  

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.userName == '' && this.state.fullName == '' && this.state.email == '' && this.state.password == '') {
      this.setState({ blank: true });
    } else {
      const getUserNames = firebase.firestore().collection("users").where("profileUsername", "==",  this.state.userName);
      this.unsubscribe = getUserNames.onSnapshot(this.userFetch);
      this.setState({ isLoading: true });
    }
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClick = () => {
    this.setState({ open: true });
  };
    
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false, blank: false });
  };




  render() {

  const { classes } = this.props;
  const { email, password } = this.state;


  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}  elevation={1}>
        <div className={classes.avatar}>
           <img src={"/assets/logo.png"} alt="Logo" style={{height: '80px'}} />
        </div>
        <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
          Sign up to see photos and videos from your friends.
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="fullname">Full Name</InputLabel>
            <Input
              type="text"
              value={this.state.fullName}
              autoComplete="off"
              onChange={this.handleChange('fullName')} />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              type="text"
              value={this.state.userName}
              autoComplete="off"
              onChange={this.handleChange('userName')} />
          </FormControl>
          { this.state.unAvailable == true && 
            <Typography component="p" style={{color: '#ff0000', padding: 5, fontSize: 14, fontWeight: 'bold'}}>Username not available</Typography>
          }
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input name="email" type="email" autoComplete="off" autoFocus value={this.state.email} onChange={this.onChange.bind(this)} />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              autoComplete="off"
              endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
              }
              onChange={this.handleChange('password')} />
          </FormControl>
         
          {!this.state.isLoading &&
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Signup
          </Button>
          }
          {this.state.isLoading == true &&
          <LinearProgress
                          style={{marginTop: 10, padding: 0}}
                          classes={{
                            colorPrimary: classes.linearColorPrimary,
                            barColorPrimary: classes.linearBarColorPrimary,
                          }}
          />  
          }
        </form>

        <Typography component="p" style={{ textAlign: 'center', marginTop: 24 }}>By signing up, you agree to our Terms , Data Policy and Cookies Policy.</Typography> 
       
      </Paper>
      <Paper className={classes.paper1} elevation={1}>
       <Typography component="p" style={{ textAlign: 'center' }}>Have an account? <Link to={`/account/login`} style={{ flexGrow: 1, textDecoration: 'none' }}>Log in</Link></Typography> 
       </Paper>

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
      message={<span id="message-id">This Email Address Can't Be Used</span>}
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
      open={this.state.blank}
      autoHideDuration={3000}
      onClose={this.handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">Fill Up All The Fields</span>}
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
    </main>
  );

  }
  }

  Signup.propTypes = {
    classes: PropTypes.object.isRequired,
  };


  export default withStyles(styles)(Signup);

