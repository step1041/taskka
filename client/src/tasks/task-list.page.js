import React, {Component} from 'react';

import TaskkaApiClient from '../taskka-api-client';
import errorHandler from '../lib/error-handler';

class TaskListPage extends Component {
  constructor() {
    super();

    this.state = { username: <em>&lt;loading&gt;</em> }
  }

  componentWillMount() {
    TaskkaApiClient
      .get('/user/current_user')
      .then((data) => {
        let username = data.user.username;
        this.setState({ username });
      })
      .catch(errorHandler);
  }

  render() {
    return (
      <div>
        Hello {this.state.username}! Here are a list of your tasks...
      </div>
    )
  }
}

export default TaskListPage
