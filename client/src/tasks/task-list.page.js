import React, {Component} from 'react';
import {connect} from 'react-redux';
import TaskkaApiClient from '../lib/taskka-api-client';
import {setTasks} from '../actions/task.actions';
import errorHandler from '../lib/error-handler';

const mapStateToProps = (state) => ({
  user: state.user,
  tasks: state.tasks,
});

class TaskListPage extends Component {
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
        <ul>
          {this.props.tasks.map((task) => (
            <li key={task.id}>{task.name} ({task.state})</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
)(TaskListPage);
