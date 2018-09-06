import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './user-info.scss';

const mapStateToProps = (state) => ({
  user: state.user,
});

class UserInfo extends Component {
  render() {
    let {user} = this.props;

    if (!user) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div className={"user-info"}>
        {user.username && (
          <span className={"nav-text"}>Welcome {user.username}</span>
        )}

        <Link className={"nav-link"} to={'/logout'}>Logout</Link>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(UserInfo);
