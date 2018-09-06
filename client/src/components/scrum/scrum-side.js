import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import ScrumTask from './scrum-task';

import "./scrum-side.scss";

const mapStateToProps = (state, ownProps) => ({
  date: moment(state.scrum[ownProps.side].get('date')),
  tasks: state.scrum[ownProps.side].get('tasks'),
  tasks_pending: state.scrum[ownProps.side].get('tasks_pending'),
});

class View extends Component {
  render() {
    return (
      <div className={"scrum-side"}>
        {this.dateHeader()}
        {this.props.tasks_pending && (<div>Loading...</div>)}
        {!this.props.tasks_pending && (
          <div>
            <h3>Worked on</h3>
            {this.workedOnTasks().map((task) => (<ScrumTask task={task} />))}
            <h3>Completed</h3>
            {this.completedTasks().map((task) => (<ScrumTask task={task} />))}
          </div>
        )}
      </div>
    );
  }

  dateHeader() {
    return (
      <h2 className={"date-header"}>
        {
          this.props.date.calendar(null, {
            lastDay: '[Yesterday]',
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            lastWeek: '[last] dddd',
            nextWeek: '[next] dddd',
            sameElse: 'L'
          })
        }
      </h2>
    )
  }

  completedTasks() {
    return this.props.tasks.filter((t) => t.was_completed);
  }

  workedOnTasks() {
    return this.props.tasks.filter((t) => t.was_worked_on);
  }
}

const ScrumSide = connect(
  mapStateToProps,
)(View);

export default ScrumSide;
