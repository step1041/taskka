import React, {Component} from 'react';
import {connect} from 'react-redux';

import "./scrum-task.scss";

const mapStateToProps = () => ({});

class View extends Component {
  render() {
    let {task} = this.props;

    return (
      <div className={"scrum-task"}>
        <strong>{task.project.name}:</strong> {task.name}
        <pre>{task.notes}</pre>
      </div>
    );
  }
}

const ScrumTask = connect(
  mapStateToProps,
)(View);

export default ScrumTask;
