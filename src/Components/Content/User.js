import React, { Fragment } from 'react';
import { ProfileBar, BottomBar } from '../Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import classnames from 'classnames';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineRounded from '@material-ui/icons/ChatBubbleOutlineRounded';
import ChatBubble from '@material-ui/icons/ChatBubble';
import BrightnessLowRounded from '@material-ui/icons/BrightnessLowRounded';
import InputBase from '@material-ui/core/InputBase';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import firebase from '../../../Firebase';

const appHeight = 64;
const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 7,
    },
  },
  heroContent: {
    maxWidth: 900,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing.unit * 0}px 0 ${theme.spacing.unit * 0}px`,
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
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing.unit * 0}px 0 ${theme.spacing.unit * 0}px`,
      marginLeft: 0,
      marginRight: 0,
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 10}px`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing.unit * 0}px ${theme.spacing.unit * 0}px`,
    },
  },
  footer: {
    padding: theme.spacing.unit * 2,
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


  card: {
    Width: '100%',
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0
    },
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
  },
  actions: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  avatar: {
    backgroundColor: red[500],
    paddingBottom: 0,
    paddingTop: 0,
  },
  comment: {
    width: '100%',
    margin: theme.spacing.unit,
    display: 'block',
    position: 'relative',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
   expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.longest,
    }),
  },
  expandOpen: {
    transform: 'rotate(0deg)',
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
  facebook2: {
    color: '#6798e5',
    animationDuration: '550ms',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    position: 'relative',
  },
  avatarImg: {
    height: '150px', 
    width: '150px', 
    border: '1px solid #eee',
    [theme.breakpoints.down('sm')]: {
      height: '77px', 
      width: '77px', 
      paddingTop: '0px !important',
      paddingBottom: '0px !important'
    },
  },
  dpButton: {
    marginLeft: 'auto',
    display: 'block',
    padding: 5,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: theme.spacing.unit * 0,
    },
  },
  gridItem: {
    width: '100%',
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '0px 30px !important',
      display: 'flex'
    },
  },
  username: {
    display: 'inline',  
    fontWeight: 'normal', 
    fontSize: 28, 
    marginTop: 15, 
    marginBottom: 15, 
    marginRight: 15,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      fontSize: 24, 
      fontWeight: 'normal', 
      marginTop: 5, 
      marginBottom: 5, 
      marginRight: 5,
      marginLeft: 10
    },
  },
  gridItem2: {
    width: '100%',
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      padding: '0px 0px !important',
      width: '100%'
    },
  },

  gridCont: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: 0
    },
  },

  textTitle: {
    display: 'inline', 
    fontWeight: 'bold',  
    fontSize: 16, 
    paddingRight: 5
  },
  textNormal: {
    display: 'inline', 
    fontSize: 16,
    paddingRight: 35,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      paddingRight: 5,
    },
  },
  grid: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      //padding: '0px 5px !important',
      margin: 0,
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 8,
      paddingRight: theme.spacing.unit * 8,
      marginTop: theme.spacing.unit * 2,
    },
    
  },

  gridPost: {
    [theme.breakpoints.down('sm')]: {
      padding: '2px 2px !important',
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
    this.posts = firebase.firestore().collection("posts").where("userName", "==", this.props.match.params.query).orderBy("postedOn", "desc");
    this.userList = firebase.firestore().collection("users").where("profileUsername", "==", this.props.match.params.query);
    this.unsubscribe = null;
    this.unsubscribe1 = null;
    this.state = {
      postDesc: '',
      postId: '',
      postImage: '',
      postLike: '',
      postedOn: '',
      uid: '',
      userName:'',
      userProfileImg: '',
      hashtags: '',
      likeStatus: '',
      postLikedId: '',
      userId: '',
      likePostedOn: '',
      comment: '',
      displayName: '',
      postIdNum: '',
      commentUserId: '',
      commentPostedOn: '',
      following: '',
      followers: '',
      bio: '',
      email: '',
      fullName: '',
      gender: '',
      mobile: '',
      post: '',
      profileImg: '',
      profileUsername: '',
      signup: '',
      website: '',
      counter: 1,
      commentloadArray: [],
      commentloadArrayInital: [],
      posts: [],
      comments: [],
      getUser: [],
      getLikes: [],
      isLoading: true,
      fetching: false,
      expanded: false,
      noComments: false,
      error: '',
      commentLogic: '',
      idLogic: '',
    };
  }

  componentDidMount() {
    this.unsubscribe = this.posts.onSnapshot(this.postFetch);
    this.unsubscribe1 = this.userList.onSnapshot(this.userFetch);
  }

  componentWillUnmount() {
      this.unsubscribe();
      this.unsubscribe1();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.query !== prevProps.match.params.query) {
      this.posts = firebase.firestore().collection("posts").where("userName", "==", this.props.match.params.query);
      this.userList = firebase.firestore().collection("users").where("profileUsername", "==", this.props.match.params.query);
      this.unsubscribe = this.posts.onSnapshot(this.postFetch);
       this.unsubscribe1 = this.userList.onSnapshot(this.userFetch);
    }
  }

  
  userFetch = (querySnapshot) => {
    const getUser = [];
    querySnapshot.forEach((doc) => {
      const {  following, followers, bio, email, fullName, gender, mobile, post, profileImg, profileUsername, signup, uid, website } = doc.data();
      getUser.push({
        key: doc.id,
        doc, // DocumentSnapshot
        following,
        followers,
        bio,
        email,
        fullName,
        gender,
        mobile,
        post,
        profileImg,
        profileUsername,
        signup,
        uid,
        website,
      });
    });
    if (querySnapshot.size == 0) {
      this.setState({
        error: true
      });
    } else {
    this.setState({
      getUser,
      error: false
    });
    document.title = this.state.getUser.map(Id => Id.fullName).toString() + ' (@' + this.props.match.params.query + ') • Instagram photos and videos';
   }
  }


  postFetch = (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      const {  postDesc, postId, postImage, postLike, postedOn, uid, userName, userProfileImg, hashtags } = doc.data();
      posts.push({
        key: doc.id,
        doc, // DocumentSnapshot
        postDesc,
        postId,
        postImage,
        postLike,
        postedOn,
        uid,
        userName,
        userProfileImg,
        hashtags,
      });
    });
    this.setState({
      posts,
      isLoading: false
    });
  }



    
  render() {
    const { classes } = this.props;
    const userLiked = this.state.likeStatus;
    const progress = this.state.isLoading;
    const fetching = this.state.fetching;
    const likeMatch = this.state.getLikes.map(Id => Id.postLikedId);
  

  return (
    <React.Fragment>
      <CssBaseline />
      <ProfileBar />      
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
            { this.state.error == true && 
              <Grid container spacing={16} style={{height: '100vh'}}>
              <Grid item xs={false} sm={false} md={12} lg={12} style={{padding: 30, marginTop: 40 }}>
                   <Typography variant="h3" align="center" gutterBottom style={{fontWeight: 'bold', fontSize: 26}}>
                      Sorry, this page isn't available.
                     </Typography>
                     <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                     The link you followed may be broken, or the page may have been removed. 
                     <br/>
                     <Link to={`/`} style={{ flexGrow: 1, textDecoration: 'none' }}> Go back to Instagram.</Link>
                     </Typography>
              </Grid>
              </Grid>
            }
              { this.state.getUser.map((data, i) => (
              <Grid container className={classes.gridCont} spacing={16} key={i}>
                <Grid item xs={12} sm={4} md={4} lg={4} className={classes.gridItem}>
                 <IconButton
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.dpButton}
                  >
                   <Avatar alt="User Image" className={classes.avatarImg} src={data.profileImg} />
                </IconButton>
                  <Hidden smUp>
                  <div style={{marginLeft: 30, width: '100%', display: 'block'}}>
                       <Typography component="h5" color="textPrimary" className={classes.username}>
                        {data.profileUsername}
                      </Typography>
                       <Link to={`/account/profile`} style={{ width: '100%', textDecoration: 'none' }}>
                       <Button variant="outlined" className={classes.button} style={{display: 'inline',  width: '100%'}}>
                          <Typography component="p" style={{fontSize: 12}}>Edit Profile</Typography>
                       </Button>
                       </Link>                     
                    </div>
                    </Hidden>
                </Grid>
                <Grid item  xs={12} sm={8} md={8} lg={8} className={classes.gridItem2}>
                   <div style={{width: '100%'}}>
                       <Hidden only="xs">
                       <div>
                       <Typography component="h5" color="textPrimary" className={classes.username}>
                        {data.profileUsername}
                      </Typography>
                       <Link to={`/account/profile`} style={{ flexGrow: 1, textDecoration: 'none' }}>
                       <Button variant="outlined" className={classes.button} style={{display: 'inline'}}>
                          <Typography component="p" style={{fontSize: 12}}>Edit Profile</Typography>
                       </Button>
                       </Link>
                       </div>
                       <div>
                          <Typography component="p" className={classes.textTitle}>{this.state.posts.length || '-'}</Typography>
                          <Typography component="p" className={classes.textNormal}>Posts</Typography>
                          <Typography component="p" className={classes.textTitle}>{data.followers || '-'}</Typography>
                          <Typography component="p" className={classes.textNormal}>Followers</Typography>
                          <Typography component="p" className={classes.textTitle}>{data.following || '-'}</Typography>
                          <Typography component="p" className={classes.textNormal}>Following</Typography>
                          <Typography component="p" style={{display: 'block',  fontWeight: 'bold', fontSize: 16, marginTop: 15, marginBottom: 5}}>{data.fullName}</Typography>
                          <Typography component="p" style={{display: 'block',  fontSize: 16, marginBottom: 5}}>{data.bio}</Typography>
                          <Typography component="p" style={{display: 'block',  fontSize: 16, marginBottom: 5}}>
                          <a target="_blank" href={'http://' + data.website} style={{ textDecoration: 'none' }}>{data.website}</a></Typography>
                       </div>
                       </Hidden>
                       <Hidden smUp> 
                       <div style={{padding: '0px 28px', margin: 0, width: '100%', display: 'block'}}>
                          <Typography component="p" style={{display: 'block',  fontWeight: 'bold', fontSize: 14, marginTop: 5, marginBottom: 5}}>{data.fullName}</Typography>
                          <Typography component="p" style={{display: 'block',  fontSize: 14, marginBottom: 5}}>{data.bio}</Typography>
                          <Typography component="p" style={{display: 'block',  fontSize: 14, marginBottom: 15}}>
                            <a target="_blank" href={'http://' + data.website} style={{ textDecoration: 'none' }}>{data.website}</a></Typography>
                       </div>                  
                        <div style={{display: 'flex', width: '100%', borderTop: '1px solid #efefef', borderBottom: '1px solid #efefef', width: '100%', paddingTop: 5, paddingBottom: 5, marginBottom: 2}}>
                        <div style={{textAlign: 'center', width: '33%'}}>
                            <Typography component="p" className={classes.textTitle} style={{display: 'block'}}>{this.state.posts.length}</Typography>
                            <Typography component="p" className={classes.textNormal} style={{display: 'block'}}>Posts</Typography>
                        </div>
                        <div style={{textAlign: 'center', width: '33%'}}>
                            <Typography component="p" className={classes.textTitle} style={{display: 'block'}}>{data.followers}</Typography>
                            <Typography component="p" className={classes.textNormal} style={{display: 'block'}}>Followers</Typography>
                        </div>
                        <div style={{textAlign: 'center', width: '33%'}}>
                            <Typography component="p" className={classes.textTitle} style={{display: 'block'}}>{data.following}</Typography>
                            <Typography component="p" className={classes.textNormal} style={{display: 'block'}}>Following</Typography>
                        </div>
                      </div>
                      </Hidden>
                    
                   </div>
                </Grid>
              </Grid>
               ))}
            </div>
          </div>
        }
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container className={classes.grid} spacing={16}>
            { this.state.posts.map((data, i) => (
               <Grid item key={i} xs={4} sm={4} md={4} lg={4} className={classes.gridPost}>    
               <Link to={`/p/${data.key}`} style={{ textDecoration: 'none' }}>
                <Card className={classes.card} elevation={0}>
                 <CardMedia
                   className={classes.media}
                   image={data.postImage}
                 />        
                 </Card>
                 </Link>
                </Grid>       
            ))}
          </Grid>
        </div>
        <BottomBar value="Profile"/>
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

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);