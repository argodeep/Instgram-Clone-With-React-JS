import React, { component} from 'react';
import { withRouter, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import HomeRounded from '@material-ui/icons/HomeRounded';
import AddRounded from '@material-ui/icons/AddRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded';
import firebase from '../../../Firebase';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    overflow: 'hidden',
    paddingBottom: 0,
    marginBottom: 0,
    borderTop: '1.5px solid #efefef',
  },
  selected: {
    '&$selected': {
      color: '#000'
    },  
  },
});

class BottomBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.userList = firebase.firestore().collection("users").where("uid", "==", firebase.auth().currentUser.uid);
    this.unsubscribe = null;
    this.state={
      value: '',
      profileUsername: '',
      getUser: [],
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
    this.unsubscribe();  
  }


  handleTabs = (event, value) => {
      this.setState({ value });
      if (value == 'Home') {
        this.props.history.push("/");
      }
      if (value == 'Create') {
        this.props.history.push("/create");
      }
      if (value == 'Profile') {
        const url = this.state.getUser.map(Id => Id.profileUsername).toString();
        const profile = window.location.pathname.includes(url);
        if (profile == true) {
            event.preventDefault();
        } else {
          this.props.history.push('/' + url); 
        }
      }
  };




  render () {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Hidden smUp>
      <BottomNavigation value={this.props.value} showLabels={false} onChange={this.handleTabs} className={classes.root}>
        <BottomNavigationAction value="Home" classes={{selected: classes.selected}} icon={<HomeRounded />} />
        <BottomNavigationAction value="Create" classes={{selected: classes.selected}} icon={<AddRounded />} />
        <BottomNavigationAction value="Profile" classes={{selected: classes.selected}} icon={<AccountCircleRounded />} />
      </BottomNavigation>
      </Hidden>
  );
  }
  
  
}

BottomBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(BottomBar));
