import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Chip, IconButton } from '@material-ui/core';
import FavoriteIcon from "@material-ui/icons/Favorite";

import { Row, Col, Skeleton, PageHeader, Alert } from 'antd';
import 'antd/dist/antd.css';

import {getClub} from '../../redux/actions/clubActions';
import './club.css';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
});

class Club extends Component {

    state = {
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          if (error.id === "CLUB_FAIL") {
            this.setState({
              msg: error.message
            });
          } else {
            this.setState({
              msg: null
            });
          }
        }
    }

    componentDidMount() {
        const clubId = this.props.match.params.clubId;
		this.props.getClub(clubId);
	}

    render () {
        const { classes, clubData } = this.props;
        const { msg } = this.state;
        const club = clubData && !this.props.club.clubLoading ? (
            <div>
                <Row>
                    {msg ? <Alert message={msg} type="error" /> : null}
                    <Col md={24} lg={12}>
                        <div className="column-1">
                            <PageHeader
                                onBack={() => window.history.back()}
                                title={<span style={{color: '#fff'}}>{clubData.name}</span>}
                                style={{background: '#1F80C8', color: '#fff', padding: '5px'}}
                            >
                            </PageHeader>
                            <div style={{width: '100%'}}>
                                <img src={clubData.image ? clubData.image : 'https://qph.fs.quoracdn.net/main-qimg-6f0f383fdcb93eb05d3c87670fcb6cef'} width="100%" alt='Club' />
                            </div>
                            <div className="content" style={{padding: '20px'}}>
                                <div className="header">
                                <Typography variant="h2" component="h2" gutterBottom>
                                    {clubData.name}
                                </Typography>
                                </div>
                                <div className="information">
                                <Chip color="secondary" label={clubData.bio} />
                                <IconButton aria-label="Add to favorites">
                                <FavoriteIcon />
                                {/* <span>{clubData.followers}</span> */}
                                </IconButton>
                                <h4 gutterBottom>Description :</h4>
                                <Typography variant="body1" gutterBottom style={{fontSize:20}}>
                                    {clubData.description}
                                </Typography>
                                {/* <h4>Our Coordinators :</h4> */}

                                {/* <Typography variant="body1" gutterBottom className="List">
                                    {coordinators}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>Our Subcoordinators :</Typography>
                                <Typography variant="body1" gutterBottom className="List">
                                    {SubCoordinators}
                                </Typography> */}
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Visit Our Website: <a href={clubData.website}>{clubData.website}</a>
                                </Typography>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={24} lg={12}>
                        <div className="column-2">
                            <h3 style={{textAlign: 'center'}}>Events of {clubData.name}</h3>
                            {clubData.events.map((event) => {
                                console.log(event);
                                let date=new Date(event.eventDate).toDateString().toString();
                                return (
                                    <Link to={`/event/${event._id}`} key={event._id}>
                                        <Paper className={classes.paper} elevation={1}>
                                            <Typography variant="h6" component="h3">
                                                {event.name}
                                            </Typography>
                                            <small className="text-muted">{date}</small><br/><br/>
                                            <Typography component="p">
                                                {event.description.substr(0,200)} 
                                                {event.description.length>200 ? <span> [...]</span> : null}
                                            </Typography>
                                        </Paper>
                                    </Link>
                                )
                            })
                            }
                        </div>
                    </Col>
                </Row>
            </div>
		) : null
        
        return (
            <div>
                <Skeleton loading={this.props.club.clubLoading} active paragraph={{ rows: 10 }} avatar>
                    {club}
                </Skeleton>
            </div>
        );
    }
}

Club.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    club: state.club,
    clubData: state.club.club,
    error: state.error
});

export default compose(
    connect(mapStateToProps, { getClub }),
    withStyles(styles, { withTheme: true })
  )(Club);