import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './user-info.scss';

const mapStateToProps = (state) => ({
  user: state.user,
  isNewUser: state.user && !state.user.username,
});

class UserInfo extends Component {
  render() {
    let {user, isNewUser} = this.props;

    if (user && !isNewUser) {
      return (
        <div className={"user-info"}>
          Welcome {user.username} | <Link className={"logout-link"} to={'/logout'}>Logout</Link>
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default connect(
  mapStateToProps
)(UserInfo);
