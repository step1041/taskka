import React, {Component} from 'react';
import {connect} from 'react-redux';

import TaskList from './task-list';

const mapStateToProps = (state) => ({
  tasks: state.tasks.filter((task) => task.state === 'in_progress').valueSeq(),
});

class View extends Component {
  render() {
    if (this.props.tasks.size === 0) {
      return null;
    }

    return (
      <div>
        <h2>In Progress</h2>
        <TaskList tasks={this.props.tasks} />
      </div>
    )
  }
}

const InProgressTasksList = connect(
  mapStateToProps,
)(View);

export default InProgressTasksList;
