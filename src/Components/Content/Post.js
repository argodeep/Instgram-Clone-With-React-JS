import React, { Fragment } from 'react';
import { AppBar, BottomBar } from '../Header';
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
import Paper from '@material-ui/core/Paper';
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
import Hidden from '@material-ui/core/Hidden';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Fab from '@material-ui/core/Fab';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import Chip from '@material-ui/core/Chip';
import NavigationIcon from '@material-ui/icons/Navigation';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Skeleton from 'react-loading-skeleton';
import firebase from '../../../Firebase';
import ProgressiveImage from 'react-progressive-image';




const appHeight = 64;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    marginTop: appHeight,
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      paddingTop: '0px',
      paddingLeft:'0px',
      paddingRight: '0px',
      marginTop: theme.spacing.unit * 7,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 12,
      paddingRight: theme.spacing.unit * 12,
    },
  
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    width: '100%',
  },
  grid: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      paddingLeft:'0px',
      paddingRight: '0px',
      margin: 0,
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 8,
      paddingRight: theme.spacing.unit * 8,
      marginTop: theme.spacing.unit * 2,
    },
    
  },

  gridItem: {
    [theme.breakpoints.down('sm')]: {
      padding: '0px !important',
      width: '100%',
      marginBottom: 15
    },
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
  button: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 3,
    height: '40px',
    position: 'relative',
  },

  card: {
    Width: 400,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom:  theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginBottom:  theme.spacing.unit,
      borderRadius: 0
    },
  },
  actions: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    margin: '5px 0px'
  },
  avatar: {
    backgroundColor: '#888',
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
  linearColorPrimary: {
      backgroundColor: '#b2dfdb',
  },
  linearBarColorPrimary: {
      backgroundColor: '#6798e5',
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

  paper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    width: '20%',
    minHeight: 600,
    maxHeight: 600,
    marginTop: 72,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    borderTop: '1.2px solid #eee',
    borderBottom: '1.2px solid #eee',
    borderLeft: '1.2px solid #eee',
    borderRight: '1.2px solid #eee',
  },

  paper1: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    width: '20%',
    minHeight: 62,
    maxHeight: 62,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: `${theme.spacing.unit * 0}px ${theme.spacing.unit * 0}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
  },

  paper2: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    width: '20%',
    minHeight: 300,
    maxHeight: 600,
    marginTop: 72,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    borderTop: '1.2px solid #eee',
    borderBottom: '1.2px solid #eee',
    borderLeft: '1.2px solid #eee',
    borderRight: '1.2px solid #eee',
  },

  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },

  form: {
    width: '100%'
  },
  chip: {
    margin: theme.spacing.unit,
  },
  chip1: {
    margin: 3,
    fontSize: 12
  }

});

class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.posts = firebase.firestore().collection("posts").doc(this.props.match.params.query);
    this.userList = firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid);
    this.postLikedUser = firebase.firestore().collection("postLiked").where("userId", "==", firebase.auth().currentUser.uid);
    this.addComment = firebase.firestore().collection("postComment");
    this.unsubscribe1 = null;
    this.unsubscribe2 = null;
    this.unsubscribe3 = null;
    this.unsubscribe4 = null;
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
      profileUsername: '',
      profileImg: '',
      fullName: '',
      counter: 1,
      commentloadArray: [],
      commentloadArrayInital: [],
      posts: [],
      comments: [],
      getUser: {},
      getLikes: [],
      isLoading: true,
      fetching: false,
      expanded: false,
      noComments: false,
      commentLogic: '',
      idLogic: '',
      chipData: [
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' }
      ],
      getDp: [],
      clickCount: 0,
      singleClickTimer: ''
    };
  }

  componentDidMount() {
    document.title = 'Instagram';
    this.posts = firebase.firestore().collection("posts").doc(this.props.match.params.query);
      this.posts.get().then((doc) => {
        if (doc.exists) {
          this.setState({
            getUser: doc.data(),
            key: doc.id,
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
        } else {
          console.log("No such document!");
        }
      });
    this.unsubscribe1 = this.userList.onSnapshot(this.userFetch);
    this.unsubscribe2 = this.postLikedUser.onSnapshot(this.LikedFetch);
    if (firebase.auth().currentUser.emailVerified != true) {
      this.props.history.push("/account/unverifed/");
    }
  }

  componentWillUnmount() {
      this.unsubscribe1();
      this.unsubscribe2();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.query !== prevProps.match.params.query) {
      this.posts = firebase.firestore().collection("posts").doc(this.props.match.params.query);
      this.posts.get().then((doc) => {
        if (doc.exists) {
          this.setState({
            getUser: doc.data(),
            key: doc.id,
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
        } else {
          console.log("No such document!");
        }
      });
      this.userList = firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid);
      this.postLikedUser = firebase.firestore().collection("postLiked").where("userId", "==", firebase.auth().currentUser.uid);
      this.addComment = firebase.firestore().collection("postComment");
      this.unsubscribe1 = this.userList.onSnapshot(this.userFetch);
      this.unsubscribe2 = this.postLikedUser.onSnapshot(this.LikedFetch);
      if (firebase.auth().currentUser.emailVerified != true) {
        this.props.history.push("/account/unverifed/");
      }
    }
  }

  
  userFetch = (querySnapshot) => {
    const getUser = [];
    querySnapshot.forEach((doc) => {
      const {  profileUsername, profileImg, fullName } = doc.data();
      getUser.push({
        key: doc.id,
        doc, // DocumentSnapshot
        profileUsername,
        profileImg,
        fullName,
      });
    });
    if (querySnapshot.size == 0) {
    alert('No user Found');
    } else {
    this.setState({
      getUser,
    });
   }
  }


  LikedFetch = (querySnapshot) => {
    const getLikes = [];
    querySnapshot.forEach((doc) => {
      const { likeStatus, postLikedId, userId } = doc.data();
      getLikes.push({
        key: doc.id,
        doc, // DocumentSnapshot
        likeStatus,
        postLikedId,
        userId,
      });
    });
    this.setState({
       getLikes,
       isLoading: false
    });
  }

  
  handleChange = (event) => {
    const { target: { name, value } } = event;
    this.setState(() => ({ comment: value }))
  }

  handleSubmit = (e) => {
         e.preventDefault();
         if(this.state.comment == '')
        {
           this.setState({isLoading: false});
        }
        else {
        this.setState({isLoading: true, counter: 1 });
        setTimeout(function(){
        const user = this.state.getUser.map(Id => Id.profileUsername).toString();
        this.addComment.add({
        comment: this.state.comment,
        displayName: user,
        postIdNum: this.state.idLogic,
        commentUserId: firebase.auth().currentUser.uid,
        commentPostedOn: firebase.firestore.Timestamp.fromDate(new Date()),
      }).then((docRef) => {
        this.setState({
        commentloadArray: [],
        isLoading: false,
        comment: '',
        displayName: user,
        postIdNum: this.state.idLogic,
        commentUserId: firebase.auth().currentUser.uid,
        commentPostedOn: firebase.firestore.Timestamp.fromDate(new Date()),
          });
        }).catch((error) => {
          console.error("Error adding comment: ", error);
          alert("Error adding comment");
          this.setState({isLoading: false});
        });
        }.bind(this),600); 
    }
    }

 
   handleLike = (value, count, postid, key) => {
    this.setState({  postLike: count++, likeStatus: true});
     const updateRef = firebase.firestore().collection("posts").doc(value);
    updateRef.set({
        postLike: count++
      }, { merge: true })
    .catch((error) => {
      console.error("Error adding like: ", error);
      alert("Error adding like");
    });
     const addRef = firebase.firestore().collection("postLiked");
     addRef.add({
        likeStatus: true,
        postLikedId: postid,
        userId: firebase.auth().currentUser.uid,
        likePostedOn: firebase.firestore.Timestamp.fromDate(new Date()),
      })
    .catch((error) => {
      console.error("Error adding like: ", error);
      alert("Error adding like");
    });
  }

   handleDisLike = (value, count, postid) => {
    this.setState({  postLike: count-- , likeStatus: false });
    const updateRef = firebase.firestore().collection("posts").doc(value);
    updateRef.set({
        postLike: count-- ,
      }, { merge: true })
    .catch((error) => {
      console.error("Error adding dislike: ", error);
      alert("Error removing like");
    });
     const getKeys = firebase.firestore().collection("postLiked").where("postLikedId", "==", postid).where("userId", "==", firebase.auth().currentUser.uid);
     this.unsubscribe3 = getKeys.onSnapshot(this.keyFetch);  
   }


   keyFetch = (querySnapshot) => {
    const keyId = [];
    querySnapshot.forEach((doc) => {
      const { likeStatus, postLikedId, userId } = doc.data();
      keyId.push({
        key: doc.id,
        doc, // DocumentSnapshot
        likeStatus,
        postLikedId,
        userId, 
      });
    });
    this.setState({
       keyId,
    });
    this.unsubscribe3();
    //const keyArray = keyId.map(keyId => keyId.key);
    const key = keyId.map(keyId => keyId.key).toString();
    // const keyString = keyArray.find(function(element) {
    //   return element == key ;
    // });
    firebase.firestore().collection('postLiked').doc(key).delete().then(() => {
      this.setState({ likeStatus: false });
     }).catch((error) => {
      console.error("Error removing like: ", error);
    });

    }

    handleExpandClick = (postid) => {
        this.setState(state => ({ expanded: true, comment: '', fetching: true }));
        const getComments = firebase.firestore().collection("postComment").where("postIdNum", "==", postid).orderBy("commentPostedOn", "desc");
        this.unsubscribe4 = getComments.onSnapshot(this.commentFetch);
         this.setState({
            commentLogic: this.state.posts.map(Id => Id.postId).includes(postid),
            idLogic: postid,
        });
    };


    commentFetch = (querySnapshot) => {
    const comments = [];
    querySnapshot.forEach((doc) => {
      const {  comment, commentUserId, displayName, postIdNum, commentPostedOn } = doc.data();
      comments.push({
        key: doc.id,
        doc, // DocumentSnapshot
        comment,
        commentUserId,
        displayName,
        postIdNum,
        commentPostedOn,
      });
    });

    if (querySnapshot.size == 0) {
    this.setState({
      noComments: true,
    });

    } else {
    this.setState({
       comments,
       noComments: false,
    });
    }
    var commentLoadInitial = this.state.comments.slice(0, 5);
    this.setState({  commentloadArrayInital: commentLoadInitial, fetching: false });
     console.log(this.state.commentloadArrayInital)
    //this.dynamicSort();
    }

    paginationComments = (postid) => {
      const page = 20;
      const initalArray = 5;
      const commentLength = this.state.comments.length;
      const pagination = Math.floor((commentLength - initalArray) / page) + 1;
      if(this.state.counter <= pagination) {
       this.setState({  counter: this.state.counter + 1 });           
      } 
       var commentLoad = this.state.comments.slice(5, 5 + this.state.counter * page);
       this.setState({ commentloadArray: commentLoad });
        console.log(commentLoad)
        console.log(this.state.counter)
    }

    // dynamicSort = (property) => {
    // var sortOrder = 1;
    // return function (a,b) {
    //     var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    //     return result * sortOrder;
    // }
    // }
    singleClick = (value) => {
      this.props.history.push(`/p` + value);
      console.log('only fire click')
    }
  
    handleDoubleClick = (value, count, postid) => {
      if (this.state.getLikes.map(Id => Id.postLikedId).includes(postid) !== true) {
        this.handleLike(value, count, postid);
      }
      
    }

    handleClicks(value, count, postid){
      this.state.clickCount++;
      if (this.state.clickCount === 1) {
      this.state.singleClickTimer = setTimeout(function() {
        this.state.clickCount = 0;
        this.singleClick(value);
      }.bind(this), 300);
  
    } else if (this.state.clickCount === 2) {
      clearTimeout(this.state.singleClickTimer);
      this.state.clickCount = 0;
      this.handleDoubleClick(value, count, postid);
    }
  }

    
  render() {
    const { classes } = this.props;
    const userLiked = this.state.likeStatus;
    const progress = this.state.isLoading;
    const fetching = this.state.fetching;
    const likeMatch = this.state.getLikes.map(Id => Id.postLikedId);
    
    // const unsortedComments = this.state.comments.sort(this.dynamicSort("commentPostedOn"));
    // const sortedComments = unsortedComments.reverse();

    if(this.state.isLoading){
      return(
        <div style={{backgroundColor: '#fff', width: '100%', height: '100%'}}>
          <img src={'assets/loader.png'} alt="Loader" width='64px' style={{position: 'absolute', margin: 'auto',  top: 0,
          right: 0,
          bottom: 0,
          left: 0}} />                           
        </div>
        )
    }

      
    return (
      <Fragment>
         <AppBar />
              <div className={classes.root}>
                <CssBaseline />
                <main className={classes.content}>
                  <div> 
                  <Grid container className={classes.grid} spacing={32} justify="center">
                        <Grid item sm={12} md={6} lg={6} className={classes.gridItem}>  
                          <Card className={classes.card}>
                            <CardHeader
                              avatar={
                                <Link to={`/${this.state.userName}`}><Avatar alt="Icon" src={this.state.userProfileImg} style={{border: '1px solid rgb(239, 239, 239)'}} /></Link>
                          
                              }
                              title={<Link to={`/${this.state.userName}`} style={{ textDecoration: 'none', color: '#000' }}>{this.state.userName}</Link>}
                              style={{padding: '8px 16px'}}
                            />
                           <ProgressiveImage src={this.state.postImage} placeholder="/assets/placeholder.png" width='100%'>
                              {(src, loading) => <img src={src} onClick={() => this.handleClicks(this.state.key, this.state.postLike, this.state.postId)}  value={this.state.key} count={this.state.postLike} postid={this.state.postId} alt="post images"  width='100%' style={{opacity: loading ? 0.2 : 1, margin: 'auto', display: 'block'}} />}
                            </ProgressiveImage>                           

                            
                              <CardActions className={classes.actions} disableActionSpacing>
                                { likeMatch.includes(this.state.postId) === true  ? 
                                <IconButton aria-label="Added to favorites" style={{ padding: 8 }} value={this.state.key} count={this.state.postLike} postid={this.state.postId} onClick={() => this.handleDisLike(this.state.key, this.state.postLike, this.state.postId)}>
                                  <FavoriteIcon  style={{ color: 'red'}}/>
                                </IconButton> :
                                <IconButton aria-label="Add to favorites" style={{ padding: 8 }} value={this.state.key} count={this.state.postLike} postid={this.state.postId} onClick={() => this.handleLike(this.state.key, this.state.postLike, this.state.postId)}>
                                  <FavoriteBorderIcon  style={{ color: 'black'}}/>
                                </IconButton>
                                }

                              <IconButton
                              className={classnames(classes.expand, {
                                    [classes.expandOpen]: this.state.expanded,
                                  })}
                                aria-label="Comment"
                                aria-expanded={this.state.expanded}
                                style={{ padding: 8 }}
                                postid={this.state.postId} 
                                onClick={() => this.handleExpandClick(this.state.postId)}>
                                  <ChatBubble  style={{ color: 'black'}} />
                                </IconButton>
                            

                              </CardActions>

                            
                            <CardContent style={{paddingTop: 0, paddingBottom: 0}}>

                              <Typography component="p" style={{ display: 'inline', fontWeight: 'bold' }}>{this.state.postLike} {this.state.postLike > 1 ? 'Likes' : 'Like'}</Typography>
                              <div style={{ marginTop: 10, marginBottom: 10}}>
                              <Typography component="p" style={{ display: 'inline', fontWeight: 'bold'}}>{this.state.userName} </Typography>
                              {/* <Typography component="p" style={{ display: 'inline'}}> {this.state.postDesc}</Typography> */}
                              </div>
                              {/* <Typography component="p" style={{ display: 'inline', color: '#999'}}> {new Date(this.state.postedOn.toDate()).toDateString()}</Typography> */}
                              <Typography component="p" style={{color: 'blue'}}>
                                {this.state.hashtags}
                              </Typography>
                              </CardContent>
                            
                                  <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                  <CardContent style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                                          { this.state.commentLogic === true && this.state.postId === this.state.idLogic && 

                                          <div>                                                
                                                <form className={classes.container} onSubmit={this.handleSubmit} autoComplete="off">
                                                          <div className={classes.search}>
                                                                <InputBase
                                                                  placeholder="Add a comment"
                                                                  classes={{
                                                                    root: classes.inputRoot,
                                                                    input: classes.inputInput,
                                                                  }}
                                                                  disabled={progress}
                                                                  value={this.state.comment}
                                                                  onChange={this.handleChange}
                                                                />
                                                          </div>                                 
                                                  </form>
                                          </div>
                                          }
                                            { progress === true && this.state.postId === this.state.idLogic && 
                                                            <LinearProgress
                                                              style={{margin: 20}}
                                                              classes={{
                                                                colorPrimary: classes.linearColorPrimary,
                                                                barColorPrimary: classes.linearBarColorPrimary,
                                                              }}
                                                            />
                                            }

                                            {  fetching === true && this.state.postId === this.state.idLogic ? 
                                              
                                              <LinearProgress style={{margin: 20}} classes={{ colorPrimary: classes.linearColorPrimary, barColorPrimary: classes.linearBarColorPrimary }} />

                                            :

                                              <div>    
                                            
                                              { this.state.commentLogic === true && this.state.postId === this.state.idLogic && this.state.noComments === false &&

                                            <div style={{overflow: 'auto', maxHeight: '350px', paddingTop: 10, paddingLeft: 10, paddingRight: 10}}> 
                                                    <Typography component="p"
                                                      style={{display: 'block', fontStyle: 'italic', fontSize: 13, paddingLeft: 10, marginBottom: 10}}
                                                      >Post Comments</Typography>                             
                                              { this.state.commentloadArrayInital.map((data, i) => (
                                                  <div key={i} style={{paddingLeft: 15, paddingRight: 10, paddingBottom: 5}}>
                                                  <Typography component="p" style={{display: 'inline', fontWeight: 'bold'}}>{this.state.displayName} </Typography>
                                                  <Typography component="p" style={{display: 'inline'}}>{this.state.comment} </Typography>
                                                  </div>
                                              ))}
                                              { this.state.comments.length > 5 &&
                                              <div>
                                                        { this.state.commentloadArray.map((data, i) => (
                                                    <div key={i} style={{paddingLeft: 15, paddingRight: 10, paddingBottom: 5}}>
                                                    <Typography component="p" style={{display: 'inline', fontWeight: 'bold'}}>{this.state.displayName} </Typography>
                                                    <Typography component="p" style={{display: 'inline'}}>{this.state.comment} </Typography>
                                                    </div>
                                                        ))}
                                                  <div style={{paddingTop: 5}} onClick={this.paginationComments}> 
                                                          <Typography component="p"
                                                          style={{display: 'block', fontWeight: 'bold', color: 'grey', fontSize: 12, paddingLeft: 10, marginBottom: 10}}
                                                          onClick={this.paginationComments}
                                                          >Load more comments</Typography>

                                                  </div>
                                              </div>
                                              }
                                            </div>
                                            }

                                            { this.state.commentLogic === true && this.state.postId === this.state.idLogic && this.state.noComments === true && 

                                            <div>                                          

                                            { this.state.postId === this.state.idLogic && 
                                              <div style={{paddingTop: 10, paddingLeft: 10, paddingRight: 10}}> 
                                                      <Typography component="p"
                                                      style={{display: 'block', fontStyle: 'italic', fontSize: 13, paddingLeft: 10, marginBottom: 10}}
                                                      >No Comments Added</Typography>
                                              </div>
                                            }
                                            </div>

                                            }
                                            </div>
                                          }        
                                  </CardContent>
                                </Collapse>                     
                            </Card>
                        </Grid> 
                  </Grid>
                  </div>
                </main>
              </div>
        <BottomBar  value="Home"/>
        </Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
