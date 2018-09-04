import React, {Component} from 'react';
import {connect} from 'react-redux';

import AddTask from './add-task';
import TaskList from './task-list';

const mapStateToProps = (state) => ({
  tasks: state.tasks.filter((task) => task.state === 'new'),
});

class View extends Component {
  render() {
    return (
      <div>
        <h2>New</h2>
        <AddTask state={'new'} />
        <TaskList tasks={this.props.tasks} />
      </div>
    )
  }
}

const NewTasksList = connect(
  mapStateToProps,
)(View);

export default NewTasksList;
