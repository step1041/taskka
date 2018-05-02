import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const mapStateToProps = (state) => ({
  user: state.user,
  isNewUser: state.user && !state.user.username,
});

class UserInfo extends Component {
  render() {
    let {user, isNewUser} = this.props;

    if (user && !isNewUser) {
      return (
        <div>
          Welcome {user.username} | <Link to={'/logout'}>Logout</Link>
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
