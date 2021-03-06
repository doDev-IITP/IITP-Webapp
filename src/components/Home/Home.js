import React from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {AppBar, Button, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Toolbar,Typography, Fab, Tooltip} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';

import 'antd/dist/antd.css';
import {  Avatar, Icon } from "antd";
import './home.css';

import About from '../About/About';
import Profile from '../Profile/Profile';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import Feeds from '../Feeds/Feeds';
import Feed from '../Feed/Feed';
import FeedPost from '../Feed/FeedPost';
import FeedEdit from '../Feed/FeedEdit';
import FeedUser from '../Feed/FeedUser';
import Clubs from '../Clubs/Clubs';
import Club from '../Club/Club';
import MessMenu from '../MessMenu/MessMenu';
import Calendar from '../Calendar/Calendar';
import Map from '../Map/Map';
import UsefulLinks from '../UsefulLinks/UsefulLinks';
import Qrcode from '../Qrcode/Qrcode';
import LostAndFound from '../LostAndFound/LostAndFound';
import LostAndFoundPost from '../LostAndFound/LostAndFoundPost';
import LostAndFoundEdit from '../LostAndFound/LostAndFoundEdit';
import Settings from '../Settings/Settings';
import ActiveRequired from '../ActiveRequired/ActiveRequired';

import { openLoginModal } from "../../redux/actions/authActions";
import {signOut} from '../../redux/actions/authActions';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
  },
});

class Home extends React.Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    openLoginModal: PropTypes.func.isRequired,
    anchorEl: null,
  };

  state = {
    mobileOpen: false,
    anchorEl: null
  };

  signOut= async ()=> {
    await this.props.signOut();
    if(!this.props.isAuth) {
      this.props.history.push('/');
    }
  }

  openLoginModal = () => {
    this.props.openLoginModal();
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleCloseAndSignout = async () => {
    this.signOut();
    this.setState({ anchorEl: null });
  };

  render() {
    let title = this.props.history.location.pathname.split('/')[1];
    title = title.charAt(0).toUpperCase() + title.slice(1);
    const { classes, theme } = this.props;
    const {
      isAuthenticated,
      user,
      openloginModal,
      openregisterModal
    } = this.props.auth;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const drawer = (
      <div>
        <div className={classes.toolbar} style={{background: '#2196f3', padding: '5px', display: 'flex', alignItems: 'center'}}>
          <Avatar style={{ backgroundColor: '#fff', color: '#000' }} icon="user" />
          <span style={{margin: '5px', color: '#fff', fontWeight: 'bold'}}>{isAuthenticated ? user.name.split(' ')[0] : "Guest User"}</span>
        </div>
        <Divider />
        <List>
          <ListItem button key='feeds' component={Link} to='/feeds' onClick={this.handleDrawerClose} >
            <Icon type="unordered-list" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;
            <ListItemText primary='Feeds' />
          </ListItem>
          <ListItem button key='clubs' component={Link} to='/clubs' onClick={this.handleDrawerClose} >
            <Icon type="star" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;  
            <ListItemText primary='Clubs' />
          </ListItem>
          {/* <ListItem button key='messmenu' component={Link} to='/mess-menu' onClick={this.handleDrawerClose} >
            <Icon type="pie-chart" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;  
            <ListItemText primary='Mess-menu' />
          </ListItem> */}
          <ListItem button key='calender' component={Link} to='/calendar' onClick={this.handleDrawerClose} >
            <Icon type="calendar" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;
            <ListItemText primary='Calender' />
          </ListItem>
          <ListItem button key='map' component={Link} to='/map' onClick={this.handleDrawerClose} >
            <Icon type="environment" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;  
            <ListItemText primary='Map' />
          </ListItem>
          <ListItem button key='usefullinks' component={Link} to='/useful-links' onClick={this.handleDrawerClose} >
            <Icon type="link" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;  
            <ListItemText primary='Useful Links' />
          </ListItem>
          {isAuthenticated ? 
            [
              // <ListItem button key='qrcode' component={Link} to='/qrcode' onClick={this.handleDrawerClose} >
              //   <Icon type="qrcode" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;  
              //   <ListItemText primary='QR-Code' />
              // </ListItem>,
              <ListItem button key='lostandfound' component={Link} to='/lost-n-found' onClick={this.handleDrawerClose} >
                <Icon type="bank" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;  
                <ListItemText primary='Lost-n-found' />
              </ListItem>,
              <ListItem button key='profile' component={Link} to='/profile' onClick={this.handleDrawerClose} >
                <Icon type="user" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;  
                <ListItemText primary='Profile' />
              </ListItem>
            ]
            :
            []
          }
        </List>
        <Divider />
        <List>
            {/* <ListItem button key='settings' component={Link} to='/settings' onClick={this.handleDrawerClose}>
              <Icon type="setting" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;  
              <ListItemText primary='Setting' />
            </ListItem> */}
            <ListItem button key='about' component={Link} to='/about' onClick={this.handleDrawerClose} >
              <Icon type="link" style={{fontWeight: 'bold', color: 'black'}} /> &nbsp;&nbsp;  
              <ListItemText primary='About' />
            </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} style={{'background': '#2196f3'}}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
              {title !=='' ? title : 'IITP WebApp / Feeds'}
            </Typography>

            {!isAuthenticated && (
              <Button color="inherit" onClick={this.openLoginModal}>Login</Button>
            )}
            {openloginModal ? <LoginModal /> : null}
            {openregisterModal ? <RegisterModal /> : null}

            {isAuthenticated && (
              <Tooltip title="Post feed" aria-label="Post feed">
                <Fab size="small" color="secondary" aria-label="Add" className={classes.margin} component={Link} to='/feedpost' >
                  <AddIcon />
                </Fab>
              </Tooltip>
            )}

            {isAuthenticated && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose} component={Link} to='/profile'>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose} component={Link} to='/userfeeds'>My Feeds</MenuItem>
                  <MenuItem onClick={this.handleCloseAndSignout }>Sign Out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content} >
          <div className={classes.toolbar} />
          {this.props.user && this.props.user.active ===0 ? <ActiveRequired /> : null}
          <Route exact path="/" component={Feeds} />
          <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/feeds" component={Feeds} />
            <Route exact path="/feed/:feedId" component={Feed} />
            <Route exact path="/feedpost" component={FeedPost} />
            <Route exact path="/userfeeds" component={FeedUser} />
            <Route exact path="/editfeed" component={FeedEdit} />
            <Route exact path="/clubs" component={Clubs} />
            <Route exact path="/club/:clubId" component={Club} />
            <Route exact path="/calendar" component={Calendar} />
            {/* <Route exact path="/mess-menu" component={MessMenu} /> */}
            <Route exact path="/map" component={Map} />
            <Route exact path="/qrcode" component={Qrcode} />
            <Route exact path="/useful-links" component={UsefulLinks} />
            <Route exact path="/profile" component={Profile} />
            {/* <Route exact path="/settings" component={Settings} /> */}
            <Route exact path="/lost-n-found/post" component={LostAndFoundPost} />
            <Route exact path="/lost-n-found/edit" component={LostAndFoundEdit} />
            <Route path="/lost-n-found" component={LostAndFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
  return {
    auth: state.auth,
    user: state.auth.user
  }
}

const WrappedHome=withRouter(connect( mapStateToProps, {openLoginModal, signOut} )(Home));
export default compose(
  withStyles(styles, { withTheme: true }),
)(WrappedHome);