import React, {Component} from 'react';
import {connect} from 'react-redux';

import Task from './task';

const mapStateToProps = (state, ownProps) => {
  if (ownProps.tasks) {
    return {};
  }

  return {
    tasks: state.tasks.filter((task) => task.state === ownProps.state).valueSeq()
  }
};

class TaskList extends Component {
  render() {
    return (
      <div>
        {this.props.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(TaskList);
