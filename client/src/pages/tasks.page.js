import React, {Component} from 'react';
import {connect} from 'react-redux';

import TaskkaApiClient from '../lib/taskka-api-client';
import errorHandler from '../lib/error-handler';

import {setTasks} from '../actions/task.actions';

import TaskList from '../components/tasks/task-list';

const mapStateToProps = (state) => ({
  user: state.user,
  tasks: state.tasks,
});

class TasksPage extends Component {
  componentWillMount() {
    TaskkaApiClient
      .get('/tasks')
      .then(({tasks}) => this.props.dispatch(setTasks(tasks)))
      .catch(errorHandler)
  }

  render() {
    if (!this.props.user) {
      return (<div>Loading...</div>)
    }
    return (
      <div>
        Hello {this.props.user.username}! Here are a list of your tasks...
        <TaskList />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
)(TasksPage);
