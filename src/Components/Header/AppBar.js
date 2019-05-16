import React, { component} from 'react';
import { withRouter, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';

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

  }
});

class ButtonAppBar extends React.Component {
  
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




  render () {
    const { classes } = this.props;

    if(this.state.isLoading){
    return(
       <div className={classes.loader}>
      <LinearProgress />
    </div>
        
      )
    }

    return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.headerStyle} elevation={0}>
        <Toolbar> 
          <Hidden smUp>
          <Link to={`/`} style={{height: '40px', margin: 'auto', display: 'block'}}>
          <img src={"/assets/logo.png"} alt="Logo" style={{height: '40px', margin: 'auto', display: 'block'}} />
          </Link>
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
    </div>
  );
  }
  
  
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ButtonAppBar));
