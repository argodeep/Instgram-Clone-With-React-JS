import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
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
    marginTop: theme.spacing.unit * 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    },
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 2}px`,
    },
    borderBottom: '0.2px solid #eee',
  },

  paper1: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    marginBottom: 20,
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
  headerStyle: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 12,
      paddingRight: theme.spacing.unit * 12,
    },
    width: '100%',
    background: '#fff',
    borderBottom: '0.2px solid #eee',
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

class ForgetPassword extends React.Component {
  
  constructor(props) {
    super(props);
   this.state={
      email: '',
      isLoading: false,
    }
  }

  componentDidMount() {
  document.title = 'Reset Password? • Instagram';

  }

  onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
  }


 handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
          isLoading: true
    });
    const { email } = this.state;
    firebase.auth().sendPasswordResetEmail(email)
    .then((user) => {
      this.setState({
          isLoading: false,
          email: '',
    });
    })
    .catch((error) => {
      this.handleClick();
      this.setState({
        isLoading: false
      });
    });
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
  const { email } = this.state;
  
  return (
    <main className={classes.main}>
      <CssBaseline />
       <AppBar position="fixed" className={classes.headerStyle} elevation={0}>
        <Toolbar>         
          
           <Link to={`/`} style={{ flexGrow: 1 }}>
           <div>
           <img src={"/assets/text-logo.png"} alt="Logo" style={{height: '45px'}} />
           </div>
           </Link>        
        </Toolbar>
      </AppBar>
      <Paper className={classes.paper} elevation={1}>
        <div className={classes.avatar}>
           <img src={"/assets/reset.png"} alt="reset-icon" style={{height: '150px'}} />
        </div>
        <Typography component="p" style={{ textAlign: 'center', fontSize: 16, color: '#999' }}>
          Enter your username or email and we'll send you a link to get back into your account.
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input name="email" type="email" autoComplete="email" autoFocus value={this.state.email} onChange={this.onChange} />
          </FormControl>
          {!this.state.isLoading &&
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Login Link
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

         <Typography component="p" style={{ textAlign: 'center', fontSize: 16, color: '#999', marginTop: 16 }}>
          OR
        </Typography>

        <Typography component="p" style={{ textAlign: 'center', marginTop: 24 }}><Link to={`/account/signup`} style={{ flexGrow: 1, textDecoration: 'none' }}>Create New Account </Link></Typography> 
       
      </Paper>
      <Paper className={classes.paper1}  elevation={1}>
       <Typography component="p" style={{ textAlign: 'center' }}><Link to={`/account/login`} style={{ flexGrow: 1, textDecoration: 'none', color: '#000', fontWeight: '500' }}>Back To Login</Link></Typography> 
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
      message={<span id="message-id">Wrong Email Address Given</span>}
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

ForgetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ForgetPassword);

