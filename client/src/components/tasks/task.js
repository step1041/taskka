import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  tasks: state.tasks
});

class Task extends Component {
  render() {
    let {task} = this.props;

    return (
      <li key={task.id}>{task.name} ({task.state})</li>
    )
  }
}

export default connect(
  mapStateToProps,
)(Task)
