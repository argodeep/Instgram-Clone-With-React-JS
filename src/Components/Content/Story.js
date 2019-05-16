import React, { Fragment } from 'react';
import { AppBar } from '../Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

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

import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import firebase from '../../../Firebase';




const appHeight = 64;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginTop: appHeight,
    marginBottom: 20,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    width: '100%',
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '75%',
    position: 'relative',
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
    color: blue[500],
    width: '50%',
    margin: theme.spacing.unit,
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
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
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
  }
  
});

class User extends React.Component {
  
  constructor(props) {
    super(props);
    this.userList = firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid);
    this.posts = firebase.firestore().collection("posts").where("userName", "==", this.props.match.params.query);
    this.comments = firebase.firestore().collection("postComment").orderBy("comment", "desc");
    this.addComment = firebase.firestore().collection("postComment");
    this.unsubscribe = null;
    this.unsubscribe1 = null;
    this.unsubscribe2 = null;
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
      comment: '',
      userFirst: '',
      firstName: '',
      postIdNum: '',
      posts: [],
      comments: [],
      getUser: [],
      value: '',
      isFetching: false
    };
  }

  componentDidMount() {
    this.unsubscribe = this.posts.onSnapshot(this.postFetch);
    this.unsubscribe1= this.comments.onSnapshot(this.commentFetch);
    this.unsubscribe2 = this.userList.onSnapshot(this.userFetch);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.query !== prevProps.match.params.query) {
      this.posts = firebase.firestore().collection("posts").where("userName", "==", this.props.match.params.query);
      this.unsubscribe = this.posts.onSnapshot(this.postFetch);
    }
  }


  componentWillUnmount() {
      this.unsubscribe();
      this.unsubscribe1();
      this.unsubscribe2();   
  }
  
  userFetch = (querySnapshot) => {
    const getUser = [];
    querySnapshot.forEach((doc) => {
      const {  firstName, uid } = doc.data();
      getUser.push({
        key: doc.id,
        doc, // DocumentSnapshot
        firstName,
        uid,
      });
    });
    if (querySnapshot.size == 0) {
       this.props.history.push("/account/login");
    } else {
    this.setState({
      getUser,
    });
    const name = this.state.getUser.map(keyId => keyId.firstName).toString();
    document.title =  name + ' (@' + this.props.match.params.query + ') • Instagram Feed';
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
    if (querySnapshot.size == 0) {
    this.props.history.push("/");
    } else {
    this.setState({
      posts,
    });  
  }
  }

  commentFetch = (querySnapshot) => {
    const comments = [];
    querySnapshot.forEach((doc) => {
      const {  comment, userFirst, postIdNum } = doc.data();
      comments.push({
        key: doc.id,
        doc, // DocumentSnapshot
        comment,
        userFirst,
        postIdNum,
      });
    });
    this.setState({
      comments,
    });
  }

  
  handleChange = (event) => {
  const { target: { name, value } } = event;
  this.setState(() => ({ comment: value }))
  }

  handleSubmit = (e) => {
   // var comment = "uid: " + firebase.auth().currentUser.uid + " cid: " + Math.random() * 99999999999;
   var postValue = "1";
   var userValue = "Ravi";
    e.preventDefault();
    if(this.state.comment == '')
    {
      alert("Please Write Some Comment");
    }
    else {
      this.addComment.add({
        comment: this.state.comment,
        userFirst: userValue,
        postIdNum: postValue,
        uid: firebase.auth().currentUser.uid,
      }).then((docRef) => {
      this.setState({
        comment: '',
        userFirst: this.state.userName,
        postId: this.state.postId,
        uid: firebase.auth().currentUser.uid,
      });
    }).catch((error) => {
      console.error("Error adding comment: ", error);
      alert("Error adding comment");
    });
   }
  }

  onLike = (i) => {
   console.log(i);
  }
   

  render() {
    const { classes } = this.props;
    const progress = this.state.isFetching;
     const userLiked = this.state.liked;

    return (
      <Fragment>
    
     <AppBar /> 

      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
        <div> 
     <Grid container spacing={40}>
          { this.state.posts.map((data, i) => (

            <Grid item key={i} sm={12} md={6} lg={4}>    
       <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt="Icon" src={data.userProfileImg} />
       
          }
          title={data.userName}
          subheader={new Date(data.postedOn.toDate()).toDateString()}
        />
        <CardMedia
          className={classes.media}
          image={data.postImage}
          style={{
            margin: 0
          }}
        />
        
        <CardContent style={{paddingBottom: 0}}>
          <Typography component="p" style={{fontWeight: 'bold'}}>
            {data.postDesc}
          </Typography>
          <Typography component="p" style={{color: 'blue'}}>
            {data.hashtags}
          </Typography>
        </CardContent>

         <CardActions className={classes.actions} disableActionSpacing>
          { userLiked == true ? 
          <IconButton aria-label="Added to favorites">
            <FavoriteIcon  style={{ color: 'red'}}/>
          </IconButton> :
          <IconButton aria-label="Add to favorites" onClick={() => this.onlike(i)}>
            <FavoriteBorderIcon  style={{ color: 'black'}}/>
          </IconButton>
          }

         <Typography component="p">
              {data.postLike} Likes
          </Typography>
        </CardActions>

         <CardContent style={{paddingBottom: 0, paddingTop: 0}}>
          { this.state.comments.map((data, i) => (
            <div key={i}>
            <div>
           <Typography component="p" style={{display: 'inline', fontWeight: 'bold'}}>{data.userFirst} </Typography>
           <Typography component="p" style={{display: 'inline'}}>{data.comment}</Typography>  
          </div>
        </div>
        ))}
        </CardContent>
        <CardActions disableActionSpacing>
        <div className={classes.wrapper}>
                <form className={classes.container} autoComplete="off">
                  <TextField
                    id="standard-name"
                    label="Write Comment"
                    className={classes.textField}
                    value={this.state.comment}
                    onChange={this.handleChange}
                    margin="normal"
                    required
                  />
                  <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                     Add
                </Button>
               </form>
                
           </div>
        </CardActions>       
      </Card>
      </Grid>

          ))}
        </Grid>
 </div>

        </main>

      </div>
         
        </Fragment>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);
