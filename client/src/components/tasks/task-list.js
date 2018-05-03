import React, {Component} from 'react';
import {connect} from 'react-redux';

import AddTask from './add-task';
import Task from './task';

const mapStateToProps = (state, ownProps) => ({
  tasks: state.tasks.filter((task) => task.state === ownProps.state),
});

class TaskList extends Component {
  render() {
    return (
      <div>
        {this.props.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
        <AddTask state={this.props.state} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(TaskList);
