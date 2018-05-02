import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.user,
});

class TaskListPage extends Component {
  render() {
    if (!this.props.user) {
      return (<div>Loading...</div>)
    }
    return (
      <div>
        Hello {this.props.user.username}! Here are a list of your tasks...
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
)(TaskListPage);
