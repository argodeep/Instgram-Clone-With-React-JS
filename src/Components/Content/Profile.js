import React, { Fragment } from 'react';
import { AppBar, BottomBar, EditProfileBar } from '../Header';
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
import VerifiedUserRounded from '@material-ui/icons/VerifiedUserRounded';
import classnames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
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
import Dialog from '@material-ui/core/Dialog';
import ListSubheader from '@material-ui/core/ListSubheader';
import Slide from '@material-ui/core/Slide';
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

  class Profile extends React.Component {
  
  constructor(props) {
    super(props);
    this.userList = firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid);
    this.userPersist = firebase.firestore().collection("posts").where("uid", "==", firebase.auth().currentUser.uid);
    this.unsubscribe = null;
    this.unsubscribe1 =  null;
    this.state = {
        key: '',
        bio: '',
        email: '',
        fullName: '',
        gender: '',
        mobile: '',
        profileImg: '',
        profileUsername: '',
        website: '',
        selectedIndex: 1,
        getUser: [],
        getPostUser: [],
        isLoading: true,
        password1: '',
        password2: '',
        id: UUID.v4(),
        open: false,
        openDialog: false
    };
  }

  componentDidMount() {
    document.title = 'Edit Profile • Instagram';
    this.unsubscribe = this.userList.onSnapshot(this.userFetch1);
    this.unsubscribe1 = this.userPersist.onSnapshot(this.userFetch);
  }

  componentWillUnmount() {
    this.setState({
      resizing: false,
      selected: false,
      image: null,
    });
    this.unsubscribe();
    this.unsubscribe1();
  }

  userFetch = (querySnapshot) => {
    const getPostUser = [];
    querySnapshot.forEach((doc) => {
      getPostUser.push({
        key: doc.id,
      });
    });
    this.setState({
      getPostUser,
    });
  }

  
  userFetch1 = (querySnapshot) => {
    const getUser = [];
    querySnapshot.forEach((doc) => {
      const user = doc.data();
        this.setState({
          key: doc.id,
          bio: user.bio,
          mobile: user.mobile,
          email: user.email,
          fullName: user.fullName,
          profileUsername: user.profileUsername,
          gender: user.gender,
          profileImg: user.profileImg,
          website: user.website,
          profileImgKey: user.profileImgKey,
          uid: user.uid
        });
    });
    this.setState({
      getUser,
      isLoading: false,
    });
  }

  checkSubmit() {
    this.setState({load: true});
    const getUserNames = firebase.firestore().collection("users").where("profileUsername", "==",  this.state.profileUsername);
    this.unsubscribe6 = getUserNames.onSnapshot(this.userAllFetch);
  }

  userAllFetch = (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const user = doc.data();
        this.setState({
          profileUsername: user.profileUsername,
        });
    });
    if (querySnapshot.size == 0) {
      this.setState({
        unAvailable: false
      });
      this.handleSubmit();
    } else {
      this.setState({
      unAvailable: true,
      });
  }
  this.unsubscribe();
  }

  handleSubmit = (e) => {
         e.preventDefault();
        if (this.state.uid == firebase.auth().currentUser.uid) {
        this.setState({load: true});
        setTimeout(function(){
        if (this.state.website.includes("https://")){
          var web = this.state.website.slice(8, this.state.website.length);
        } else {
          var web = this.state.website
        }
        if (this.state.website.includes("http://")){
          var web = this.state.website.slice(7, this.state.website.length);
        } else {
          var web = this.state.website
        }
        if (this.state.website.includes("http")){
          var web = this.state.website.slice(4, this.state.website.length);
        } else {
          var web = this.state.website
        }

        if (this.state.website.includes("https")){
          var web = this.state.website.slice(5, this.state.website.length);
        } else {
          var web = this.state.website
        }
        const updateUser = firebase.firestore().collection('users').doc(this.state.key);
        updateUser.set({
              bio: this.state.bio,
              email: this.state.email,
              fullName: this.state.fullName,
              gender: this.state.gender,
              mobile: this.state.mobile,
              // profileImg: this.state.profileImg,
              profileUsername: this.state.profileUsername,
              website: web,
              lastUpdateOn: firebase.firestore.Timestamp.fromDate(new Date()),
       }, { merge: true }).then((docRef) => {
          this.setState({
              bio: this.state.bio,
              email: this.state.email,
              fullName: this.state.fullName,
              gender: this.state.gender,
              mobile: this.state.mobile,
              // profileImg: this.state.profileImg,
              profileUsername: this.state.profileUsername,
              website: this.state.website,
          });
          for (var i = 0; i < this.state.getPostUser.length; i++) {
            var seletedKeyValue = this.state.getPostUser.map(id => id.key)[i];
            const updateUserData = firebase.firestore().collection('posts').doc(seletedKeyValue);
            updateUserData.set({
                  userName: this.state.profileUsername,
                  lastUpdateOn: firebase.firestore.Timestamp.fromDate(new Date()),
          }, { merge: true })
          }
          this.handleClick();
          this.setState({isLoading: false, load: false});
        }).catch((error) => {
          console.error("Error adding comment: ", error);
          alert("Error adding comment");
          this.setState({isLoading: false, load: false});
        });
        }.bind(this),0);
      } 
    }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };


   handleSelectChange = event => {
    this.setState({ gender: event.target.value });
  };

  handleSelect = e => {
    if (e.target.files[0]) {
      this.handleCloseDialog();
      const image = e.target.files[0];
      this.setState(() => ({
      load: true,
      image,
      selected: true,
      sUrl: URL.createObjectURL(image)
    }));
    }
  }


  handleUpload = () => {
      fetch(this.state.src)
      .then(res => res.blob())
      .then(blob => {
    const file = new File([blob], this.state.image.name, {type: this.state.image.type})
    const { image } = this.state;
    const newMetadata = {
      cacheControl: 'public,max-age=2678400'      
    }
    const uploadTask = firebase.storage().ref(`users/${this.state.id}`).put(file);
    uploadTask.on('state_changed', 
    (snapshot) => {
      // progrss function ....
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    }, 
    (error) => {
      this.setState({isLoading: false});
         // error function ....
      console.log(error);
    }, 
    () => {
        firebase.storage().ref('users').child(this.state.id).updateMetadata(newMetadata);
        // complete function ....
        firebase.storage().ref('users').child(this.state.id).getDownloadURL().then(url => {
            this.setState({url});
            console.log(this.state.url)
            if (this.state.profileImgKey) {
              firebase.storage().ref('users').child(this.state.profileImgKey).delete();
            } 
            this.handleUpdate();
            })
          });
        })
  }

  handleUpdate = () => {
    setTimeout(function(){
      const updateUser = firebase.firestore().collection('users').doc(this.state.key);
      updateUser.set({
          lastUpdateOn: firebase.firestore.Timestamp.fromDate(new Date()),
          profileImg: this.state.url,
          profileImgKey: this.state.id
        }, { merge: true }).then((docRef) => {
          for (var i = 0; i < this.state.getPostUser.length; i++) {
            var seletedKeyValue = this.state.getPostUser.map(id => id.key)[i]; 
            const updateUserData = firebase.firestore().collection('posts').doc(seletedKeyValue);
            updateUserData.set({
                  userProfileImg: this.state.profileImg,
                  lastUpdateOn: firebase.firestore.Timestamp.fromDate(new Date()),
          }, { merge: true })
          }
          this.handleClick();
          this.setState({isLoading: false, load: false});
          }).catch((error) => {
            console.error("Error adding dp: ", error);
            alert("Error adding dp");
            this.setState({isLoading: false, load: false});
          });
          }.bind(this),0); 
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

    handleClickOpen = () => {
      this.setState({ openDialog: true });
    };

    handleCloseDialog = () => {
      this.setState({ openDialog: false });
    };

  Transition = (props) => {
    return <Slide direction="up" {...props} />;
  }

  handleDelete = () => {
    this.handleCloseDialog();
    this.setState({ load: true });
    firebase.storage().ref('users').child(this.state.profileImgKey).delete();
    const updateUser = firebase.firestore().collection('users').doc(this.state.key);
    updateUser.set({
        lastUpdateOn: firebase.firestore.Timestamp.fromDate(new Date()),
        profileImg: '',
        profileImgKey: ''
      }, { merge: true }).then((docRef) => {
        for (var i = 0; i < this.state.getPostUser.length; i++) {
          var seletedKeyValue = this.state.getPostUser.map(id => id.key)[i]; 
          const updateUserData = firebase.firestore().collection('posts').doc(seletedKeyValue);
          updateUserData.set({
                userProfileImg: this.state.profileImg,
                lastUpdateOn: firebase.firestore.Timestamp.fromDate(new Date()),
        }, { merge: true })
        }
        this.handleClick();
        this.setState({isLoading: false, load: false});
        }).catch((error) => {
          console.error("Error adding dp: ", error);
          alert("Error adding dp");
          this.setState({isLoading: false, load: false});
        }); 
    } 

    
    
  render() {
    const { classes } = this.props;
    const progress = this.state.isLoading;
    const error = this.state.error;

    return (
    <React.Fragment>
      <CssBaseline />
      <EditProfileBar />
      <main style={{width: '100%'}}>  
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
                          <Link to={`/account/password/change/`} style={{ width: '100%', textDecoration: 'none'}}>
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
                          </Link>
                        </List>
                      </Paper>

                 </Grid>
                 </Hidden>
                  {this.state.selectedIndex === 1 &&
                 <Grid item xs={12} sm={12} md={9} lg={9} className={classes.gridItem}>
                  <Paper className={classes.paper} elevation={0}>
                    <ListItem alignItems="flex-start" className={classes.profile}>
                      <ListItemAvatar>
                        <Avatar alt="profile image" src={this.state.profileImg} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography component="span" style={{fontSize: 22}}>
                              {this.state.profileUsername}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={
                          <React.Fragment>
                            <label onClick={this.handleClickOpen}>
                            <Typography component="span" style={{fontWeight: 500}} color="primary">
                              Change Profile Photo
                            </Typography>
                            </label>
                          </React.Fragment>
                        }
                      />
                      { this.state.selected == true &&
                            <ProcessImage
                                  image={this.state.sUrl}
                                  hidden
                                  onProcessFinish={() => {
                                    this.handleUpload();
                                  }}
                                  scaleToFit={{ width: 350, height: 350}}
                                  quality={85}
                                  processedImage={(src, err) => this.setState({ src, err })} 
                                />
                                }
                    </ListItem>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" fullWidth>
                          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                            Name
                          </InputLabel>
                           <InputBase
                             onChange={e => this.setState({ fullName: e.target.value })}
                            id="bootstrap-input"
                            value={this.state.fullName}
                            classes={{
                              root: classes.bootstrapRoot,
                              input: classes.bootstrapInput,
                            }}
                          />
                       </FormControl>
                       <FormControl margin="normal" fullWidth>
                          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                            Username
                          </InputLabel>
                           <InputBase
                           
                            onChange={e => this.setState({ profileUsername: e.target.value })}
                            id="bootstrap-input"
                            value={this.state.profileUsername}
                            classes={{
                              root: classes.bootstrapRoot,
                              input: classes.bootstrapInput,
                            }}
                          />
                       </FormControl>

                        <FormControl margin="normal" fullWidth>
                          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                            Website
                          </InputLabel>
                           <InputBase
                            onChange={e => this.setState({ website: e.target.value })}
                            id="bootstrap-input"
                            value={this.state.website}
                            classes={{
                              root: classes.bootstrapRoot,
                              input: classes.bootstrapInput,
                            }}
                          />
                       </FormControl>

                        <FormControl margin="normal" fullWidth>
                          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                           Bio
                          </InputLabel>
                           <InputBase
                            onChange={e => this.setState({ bio: e.target.value })}
                            id="bootstrap-input"
                            value={this.state.bio}
                            classes={{
                              root: classes.bootstrapRoot,
                              input: classes.bootstrapInput,
                            }}
                          />
                       </FormControl>

                       <ListItem alignItems="flex-start" style={{marginTop: 10, marginBottom: 0}}>
                            <ListItemText
                              primary={
                                <React.Fragment>
                                  <Typography component="span" style={{fontSize: 14, fontWeight: 500}}>
                                   Private Information
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                        </ListItem>


                         <FormControl margin="normal" fullWidth>
                          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                            Email 
                          </InputLabel>
                           <InputBase
                            onChange={e => this.setState({ email: e.target.value })}
                            id="bootstrap-input"
                            value={this.state.email}
                            classes={{
                              root: classes.bootstrapRoot,
                              input: classes.bootstrapInput,
                            }}
                          />
                          
                       </FormControl>

                        <FormControl margin="normal" fullWidth>
                          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                            Phone Number
                          </InputLabel>
                           <InputBase
                            onChange={e => this.setState({ mobile: e.target.value })}
                            id="bootstrap-input"
                            value={this.state.mobile}
                            classes={{
                              root: classes.bootstrapRoot,
                              input: classes.bootstrapInput,
                            }}
                          />
                       </FormControl>

                       <FormControl margin="normal" className={classes.gender}>
                          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                            Gender
                          </InputLabel>
                          <Select
                            value={this.state.gender || 'Not Specified'}
                            onChange={this.handleSelectChange}
                            input={<BootstrapInput name="gender" id="age-customized-select" />}
                            displayEmpty
                            className={classes.selectInput}
                          >  
                           
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                            <MenuItem value={'Not Specified'}>Not Specified</MenuItem>
                          </Select>
                        </FormControl>
                  
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={this.state.load}
                      >
                        Submit
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
      <Dialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          TransitionComponent={this.Transition}
        > 
          <div>
          <List> 
          <ListItem button style={{backgroundColor: '#fff'}}>
              <ListItemText 
                primary={
                  <React.Fragment>
                    <label>
                    <input type="file" accept="image/*" hidden onChange={this.handleSelect}/>
                    <Typography component="span">
                      Change Profile Photo
                    </Typography>
                    </label>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
            { this.state.profileImg && 
            <ListItem button style={{backgroundColor: '#fff'}}>
              <ListItemText 
              primary={
                <React.Fragment>
                  <label onClick={this.handleDelete}>
                  <Typography component="span" style={{color: '#ff0000'}}>
                    Remove Profile Photo
                  </Typography>
                  </label>
                </React.Fragment>
              }
              />
            </ListItem>
            }
          </List>
          </div>
         
        </Dialog>
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
          message={<span id="message-id">Profile Updated</span>}
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
      open={this.state.unAvailable}
      autoHideDuration={3000}
      onClose={this.handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">This username not available</span>}
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

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);