import React, {Component} from 'react';
import {connect} from 'react-redux';

import ProjectHeader from '../components/projects/project-header';
import NewTasksList from '../components/tasks/new-tasks-list';
import InProgressTasksList from '../components/tasks/in-progress-task-list';
import CompleteTasksList from '../components/tasks/complete-tasks-list';

import './tasks.page.scss';
import {setCurrentProject} from '../actions/project.actions';

const mapStateToProps = (state) => ({
  user: state.user,
  tasks: state.tasks,
  currentProjectId: state.ui.currentProjectId,
  currentProject: state.projects.get(state.ui.currentProjectId),
});

class TasksPage extends Component {
  componentDidMount() {
    if (!this.props.currentProject) {
      this.props.dispatch(setCurrentProject(this.props.user.default_project_id));
    }
  }

  render() {
    if (!this.props.currentProject) {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <ProjectHeader />
        <NewTasksList />
        <InProgressTasksList />
        <CompleteTasksList />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(TasksPage);
