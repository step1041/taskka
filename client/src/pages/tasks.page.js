import React, {Component} from 'react';
import {connect} from 'react-redux';

import TaskkaApiClient from '../lib/taskka-api-client';
import errorHandler from '../lib/error-handler';

import {setTasks} from '../actions/task.actions';

import TaskList from '../components/tasks/task-list';
import AddTask from '../components/tasks/add-task';

const mapStateToProps = (state) => ({
  user: state.user,
  tasks: state.tasks,
});

class TasksPage extends Component {
  componentDidMount() {
    TaskkaApiClient
      .get('/tasks')
      .then(({tasks}) => this.props.dispatch(setTasks(tasks)))
      .catch(errorHandler);
  }

  render() {
    if (!this.props.user) {
      return (<div>Loading...</div>);
    }
    return (
      <div>
        <p>
          Hello {this.props.user.username}! Here are a list of your tasks...
        </p>

        <h1>New</h1>
        <AddTask state={'new'} />
        <TaskList state={'new'}/>

        <h1>Complete</h1>
        <AddTask state={'complete'} />
        <TaskList state={'complete'} />
      </div>
    );
  }

  newTasks() {
    return this.props.tasks.filter((task) => task.state === 'new');
  }

  completeTasks() {
    return this.props.tasks.filter((task) => task.state === 'complete');
  }
}

export default connect(
  mapStateToProps,
)(TasksPage);
