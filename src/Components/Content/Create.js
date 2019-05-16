import React, { Fragment, component } from 'react';
import { AppBar, BottomBar } from '../Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
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
import Hidden from '@material-ui/core/Hidden';
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
import {default as UUID} from "node-uuid";
import ProcessImage from 'react-imgpro';

import firebase from '../../../Firebase';

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
  },
  heroContent: {
    maxWidth: 933,
    margin: '0 auto',
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
    backgroundColor: theme.palette.background.paper,
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
    alignItems: 'left',
    minHeight: 70,
    maxHeight: 500,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    borderTop: '1.2px solid #eee',
    borderBottom: '1.2px solid #eee',
    borderLeft: '1.2px solid #eee',
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
  }

});

  class Create extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.userList = firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid);
    this.unsubscribe = null;
    this.state = {
        selectedIndex: 1,
        isLoading: false,
        chipData: [
          { key: 0, label: 'Angular' },
          { key: 1, label: 'jQuery' },
          { key: 2, label: 'Polymer' }
        ],
        wrt: '',
        image: null,
        url: '',
        progress: 0,
        id: UUID.v4(),
        src: '', 
        err: null,
        sUrl: null,
        selected: false,
        protrait: false,
        landscape: false,
        filtered: false,
        isProcessing: false
      };
  }

  componentDidMount() {
    document.title = 'Create Post • Instagram';
    this.unsubscribe = this.userList.onSnapshot(this.userFetch);
    if (firebase.auth().currentUser.emailVerified != true) {
      this.props.history.push("/account/unverifed/");
    }
  }

  userFetch = (querySnapshot) => {
    const getUser = [];
    querySnapshot.forEach((doc) => {
      const user = doc.data();
        this.setState({
          key: doc.id,
          profileUsername: user.profileUsername,
          profileImg: user.profileImg,
        });
    });
    this.setState({
      getUser,
    });
    if (!this.state.profileImg) {
      this.props.history.push("/account/profile/");
    }
  }

  handleSubmit = () => {
        // e.preventDefault();
        setTimeout(function(){
        const updateUser = firebase.firestore().collection('posts');
        updateUser.add({
              postDesc: this.state.wrt,
              photoKey: this.state.id,
              postId: UUID.v4(),
              uid: firebase.auth().currentUser.uid,
              postImage: this.state.url,
              postLike: 0,
              postedOn: firebase.firestore.Timestamp.fromDate(new Date()),
              userProfileImg: this.state.profileImg,
              userName: this.state.profileUsername
       }).then((docRef) => {
        this.props.history.push("/");
        }).catch((error) => {
          console.error("Error adding post: ", error);
          alert("Error adding post");
          this.setState({isLoading: false});
        });
        }.bind(this),0); 
    }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };


   handleSelectChange = event => {
    this.setState({ gender: event.target.value });
  };


  handleSelect = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({
      isProcessing: true,
      selected: true,
      image,
      sUrl: URL.createObjectURL(image)
    }));
    }
  }

  handleUnselcet = () => {
    this.setState({
      resizing: false,
      selected: false,
      filtered: false,
      image: null,
      l: null,
    });
  }

  handleUpload = () => {
    fetch(this.state.l)
      .then(res => res.blob())
      .then(blob => {
    const file = new File([blob], this.state.image.name, {type: this.state.image.type})
    console.log(file)
    const { image } = this.state;
    const newMetadata = {
      cacheControl: 'public,max-age=2678400'      
    }
    const uploadTask = firebase.storage().ref(`posts/${this.state.id}`).put(file);
    uploadTask.on('state_changed', 
    (snapshot) => {
      // progrss function ....
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    }, 
    (error) => {
         // error function ....
      console.log(error);
    }, 
    () => {
        firebase.storage().ref('posts').child(this.state.id).updateMetadata(newMetadata);
        // complete function ....
        firebase.storage().ref('posts').child(this.state.id).getDownloadURL().then(url => {
            this.setState({url});
            console.log(this.state.url)
            this.handleSubmit();
        })
    });
    })
  }

  handleDelete = data => () => {
    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  onSelect = (key) => {
    if (key == 1) {
      if (this.state.src1) {
        this.setState({l: this.state.src1, filtered: true});
      }
    }
    if (key == 2) {
      if (this.state.src2) {
        this.setState({l: this.state.src2, filtered: true});
      }
    }
    if (key == 3) {
      if (this.state.src3) {
         this.setState({l: this.state.src3, filtered: true});
      }
    }
    if (key == 4) {
      if (this.state.src4) {
        this.setState({l: this.state.src4, filtered: true});
      }
    }
    if (key == 5) {
      if (this.state.src5) {
        this.setState({l: this.state.src5, filtered: true});
      }
    }
    // console.log(document.getElementById("select").naturalWidth)
  }

    
  render() {
    const { classes } = this.props;
    const progress = this.state.isLoading;
    const error = this.state.error;
 
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <main style={{width: '100%'}}>
       
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>            
            <div className={classes.heroButtons}>
               <Grid container spacing={16}>
                 <Grid item xs={false} sm={false} md={12} lg={12} style={{padding: 10 }}>
                      <Paper className={classes.paper} elevation={0}>
                            <Typography component="span" style={{ fontWeight: 400, fontSize: 18, color: '#000'}}>
                                  Share photos with friends
                            </Typography>
                            <form className={classes.form} noValidate autoComplete="off">
                            
                            </form>
                            { this.state.selected == false && 
                                <div>
                                   <img src={'assets/sea.jpg'} alt="default images" style={{width: '100%', marginBottom: 10, borderRadius: 5, display: 'block'}}/>
                                   <label style={{justifyContent: 'center'}}>
                                <Typography component="span" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', textAlign: 'center', fontWeight: 400, fontSize: 14, background: '#fff', color: '#3f51b5', border: '1px solid #3f51b5', borderRadius: 30, padding: 5}}>
                                <CameraEnhanceIcon style={{marginRight: 5}} /> Add Photo
                                </Typography>
                                <input type="file" accept="image/*" hidden onChange={this.handleSelect}/>
                                    </label>
                                </div>
                            }                           
                           
                            { this.state.selected == true && <Grid container spacing={16}>
                                <Grid item xs={false} sm={false} md={7} lg={7} style={{padding: 10 }}>
                                <div>
                                  <img src={this.state.l || this.state.sUrl} alt="Selected images" width='100%' style={{margin: 'auto', display: 'block'}}/>
                                  { this.state.selected == true && 
                                    <Typography component="span" onClick={this.handleUnselcet} style={{ alignSelf: 'center', width: '120px', textAlign: 'center', fontWeight: 400, fontSize: 14, color: '#ff0000', padding: 5, marginTop: 10, border: '1px #ff0000 solid', borderRadius: 30}}>
                                        Remove Photo
                                    </Typography>
                                  }
                                </div>
                                { this.state.selected == true && <ProcessImage
                                  image={this.state.sUrl}
                                  hidden
                                  onProcessFinish={() => {
                                      this.setState({
                                        resizing: true
                                      });
                                  }}
                                  scaleToFit={{ width: 850}}
                                  quality={85}
                                  processedImage={(src, err) => this.setState({ src, err, l: src })} 
                                  
                                />
                                }
                                
                                </Grid>  

                                <Grid item xs={false} sm={false} md={5} lg={5} style={{padding: 10 }}>
                                    <Typography component="span" style={{ textAlign: 'center', fontWeight: 500, fontSize: 15, color: '#000', padding: 10}}>
                                        Choose Filter
                                    </Typography>
                                  { this.state.isProcessing == true && <Skeleton height={50} count={1} /> }
                                  { this.state.resizing == true &&  <div style={{display: 'flex'}}  hidden={this.state.isProcessing == true}>
                                      <div style={{padding: 5}}>
                                      <ProcessImage
                                        image={this.state.src}
                                        hidden={this.state.isProcessing == true}
                                        onProcessFinish={() => {
                                          setTimeout(function(){
                                            this.setState({
                                              isProcessing: false
                                            });
                                          }.bind(this), 1000);
                                        }}
                                        style={{width: '100%'}}
                                        processedImage={(src, err) =>
                                         this.setState({ src1: src, err, })}
                                        key={1}
                                        onClick={() => this.onSelect(1)} 
                                      />
                                    </div>
                                    <div style={{padding: 5}}>
                                      <ProcessImage
                                        image={this.state.src}
                                        hidden={this.state.isProcessing == true}
                                        onProcessFinish={() => {
                                          setTimeout(function(){
                                            this.setState({
                                              isProcessing: false
                                            });
                                          }.bind(this), 1000);
                                        }}
                                        style={{width: '100%'}}
                                        contrast={0.2}
                                        fade={0.3}
                                        colors={{
                                          green: 50
                                        }}
                                        processedImage={(src, err) => this.setState({ src2: src, err, })} 
                                        
                                        key={2}
                                        onClick={() => this.onSelect(2)} 
                                      />
                                    </div>
                                    <div style={{padding: 5}}>
                                    <ProcessImage
                                      image={this.state.src}
                                      hidden={this.state.isProcessing == true}
                                      onProcessFinish={() => {
                                        setTimeout(function(){
                                          this.setState({
                                            isProcessing: false
                                          });
                                        }.bind(this), 1000);
                                      }}
                                      style={{width: '100%'}}
                                      greyscale={true}
                                      processedImage={(src, err) => this.setState({ src3: src, err, })} 
                                      
                                      key={3}
                                      onClick={() => this.onSelect(3)} 
                                    />
                                  </div>
                                  <div style={{padding: 5}}>
                                    <ProcessImage
                                      image={this.state.src}
                                      hidden={this.state.isProcessing == true}
                                      onProcessFinish={() => {
                                        setTimeout(function(){
                                          this.setState({
                                            isProcessing: false
                                          });
                                        }.bind(this), 1000);
                                      }}
                                      style={{width: '100%'}}
                                      brightness={0}
                                      contrast={0.3}
                                      fade={0.1}
                                      colors={{
                                        blue: 50
                                      }}
                                      processedImage={(src, err) => this.setState({ src4: src, err, })} 
                                      
                                      key={4}
                                      onClick={() => this.onSelect(4)} 
                                    />
                                  </div>

                                  <div style={{padding: 5}}>
                                    <ProcessImage
                                      image={this.state.src}
                                      hidden={this.state.isProcessing == true}
                                      onProcessFinish={() => {
                                        setTimeout(function(){
                                          this.setState({
                                            isProcessing: false
                                          });
                                        }.bind(this), 1000);
                                      }}
                                      style={{width: '100%'}}
                                      colors={{
                                        red: 50,
                                      }}
                                      contrast={0.1}
                                      processedImage={(src, err) => this.setState({ src5: src, err, })} 
                                      
                                      key={5}
                                      onClick={() => this.onSelect(5)} 
                                    />
                                  </div>
                                  </div>
                                  }  
                                
                                  <form className={classes.form} noValidate autoComplete="off">
                            <TextField
                              id="standard-multiline-static"
                              multiline
                              rows="2"
                              helperText="Add Photo Description"
                              value={this.state.wrt}
                              onChange={e => this.setState({ wrt: e.target.value })}
                              className={classes.form}
                              margin="normal"
                            />

                            <TextField
                              id="standard-multiline-static"
                              label="# Add hash tags"
                              helperText="Type & Press 'Enter' (Max 3 Hash tags)"
                              className={classes.form}
                              margin="normal"
                            />
                            </form>
                            
                           
                            <div style={{width: '100%'}}>
                            {this.state.chipData.map(data => {
                              let icon = null;

                              return (
                                <Chip
                                  key={data.key}
                                  icon={icon}
                                  label={data.label}
                                  onDelete={this.handleDelete(data)}
                                  className={classes.chip1}
                                />
                              );
                            })}
                            </div>
                            <Button variant="contained" size="small" color="primary" onClick={this.handleUpload} style={{marginTop: 20, width: '100%'}}>
                                Post
                            </Button>
                                </Grid>
                               
                            </Grid>
                            }

                            <div className={classes.root}>
                              <LinearProgress color="secondary" variant="determinate" value={this.state.progress}  max="100" />
                            </div>
                            
                      </Paper>
                 </Grid>
                </Grid>
            </div>
          </div>
        </div>
      </main>
      <Hidden smDown>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          www.instagramm.online
        </Typography>
      </footer>
      </Hidden>
    </React.Fragment>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Create);