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
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
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

class Login extends React.Component {
  
  constructor(props) {
    super(props);
   this.state={
      email: '',
      password: '',
      isLoading: false,
      showPassword: false,
    }
  }

  componentDidMount() {
  document.title = 'Login to Continue • Instagram';

  }

  onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };


 handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
          isLoading: true
        });
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      this.props.history.push("/");
    })
    .catch((error) => {
      this.handleClick();
      this.setState({
        isLoading: false
      });
    });
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
    this.setState({ open: false });
  };


  render() {

  const { classes } = this.props;
  const { email, password } = this.state;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper} elevation={1}>
        <div className={classes.avatar}>
           <img src={"/assets/logo.png"} alt="Logo" style={{height: '80px'}} />
        </div>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input name="email" type="email" autoComplete="email" autoFocus value={this.state.email} onChange={this.onChange} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              autoComplete="current-password"
              value={this.state.password}
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
            Sign in
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

        <Typography component="p" style={{ textAlign: 'center', marginTop: 24 }}><Link to={`/account/forgetPassword`} style={{ flexGrow: 1, textDecoration: 'none' }}>Forget Password? </Link></Typography> 
       
      </Paper>
      <Paper className={classes.paper1}  elevation={1}>
       <Typography component="p" style={{ textAlign: 'center' }}>Not have an account yet? <Link to={`/account/signup`} style={{ flexGrow: 1, textDecoration: 'none' }}>Sign up</Link></Typography> 
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
      message={<span id="message-id">Login Credentials Doesn't Match</span>}
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Login);

