import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logout} from '../actions/user.actions';

const mapStateToProps = (state) => ({
});

class LogoutPage extends Component {
  componentWillMount() {
    this.props.dispatch(logout());
  }

  render() {
    return <Redirect to={'/'} />
  }
}

export default connect(
  mapStateToProps,
)(LogoutPage);

