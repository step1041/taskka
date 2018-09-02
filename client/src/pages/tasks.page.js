import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import ProjectHeader from '../components/projects/project-header';
import TaskList from '../components/tasks/task-list';
import AddTask from '../components/tasks/add-task';

import './tasks.page.scss';

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  currentProject: state.projects.get(state.ui.currentProjectId),
});

class TasksPage extends Component {
  render() {
    if (!this.props.currentProject) {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <ProjectHeader />

        <div>
          <h2>New</h2>
          <div className={'task-list'}>
            <AddTask state={'new'} />
            <TaskList state={'new'} />
          </div>
        </div>

        <div>
          <h2>Complete</h2>
          <div className={'task-list'}>
            <AddTask state={'complete'} />
          </div>
          {
            Object
              .entries(this.groupTasksByCompletedAt(this.completeTasks()))
              .map(([day, tasks]) => (
                <div key={day}>
                  <h3>{day}</h3>
                  <div className={'task-list'}>
                    <TaskList tasks={tasks} />
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    );
  }

  completeTasks() {
    return this.props.tasks.filter((task) => task.state === 'complete');
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

export default connect(
  mapStateToProps,
)(TasksPage);
