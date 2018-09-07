import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import AddTask from './add-task';
import TaskList from './task-list';

const mapStateToProps = (state) => ({
  tasks: state.tasks.filter((task) => task.state === 'complete'),
});

class View extends Component {
  render() {
    return (
      <div>
        <h2>Complete</h2>
        <AddTask state={'complete'} />
        {
          Object
            .entries(this.groupTasksByCompletedAt(this.props.tasks))
            .map(([day, tasks]) => (
              <div key={day}>
                <h3>{day}</h3>
                <TaskList tasks={tasks} />
              </div>
            ))
        }
      </div>
    )
  }

  groupTasksByCompletedAt(tasks) {
    let groups = {};

    tasks
      .map((task) => ({completedAt: moment(task.completed_at), task}))
      .sort((a, b) => moment.utc(a.completedAt).diff(moment.utc(b.completedAt)))
      .reverse()
      .forEach(({updatedAt, task}) => {
        let dateString = moment(task.updated_at).format('MMMM Do YYYY');
        if (!groups[dateString]) {
          groups[dateString] = [];
        }
        groups[dateString].push(task);
      });

    return groups;
  }
}

const CompleteTasksList = connect(
  mapStateToProps,
)(View);

export default CompleteTasksList;

