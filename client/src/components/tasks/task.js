import React, {Component} from 'react';
import {connect} from 'react-redux';

import TaskModel from '../../models/task';

import {deleteTask, updateTask} from '../../actions/task.actions';
import debounce from 'debounce';

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

class Task extends Component {
  constructor() {
    super();

    this.initState = {
      errors: {},
      submitting: false,
      task: {},
    };

    this.state = this.initState;

    this.onTaskDelete = this.onTaskDelete.bind(this);
    this.onTaskStateChange = this.onTaskStateChange.bind(this);
    this.onTaskNameChange = this.onTaskNameChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      task: nextProps.task,
    };
  }

  render() {
    return (
      <li key={this.state.task.id}>
        <input
          type={'checkbox'}
          checked={this.state.task.state === 'complete'}
          onChange={this.onTaskStateChange}
          disabled={this.state.submitting}
        />
        <input
          type={'text'}
          value={this.state.task.name}
          onChange={this.onTaskNameChange}
          disabled={this.state.submitting}
        />
        <button
          onClick={this.onTaskDelete}
          disabled={this.state.submitting}
        >
          Delete
        </button>
        {this.state.errors && this.state.errors.name
          ? <small>{this.state.errors.name}</small>
          : null
        }
      </li>
    );
  }

  updateTaskDebounced = debounce(() => {
    this.props
      .dispatch(updateTask(this.state.task));
  }, 1000);

  onTaskNameChange(e) {
    let newName = e.target.value;
    let task = {
      ...this.state.task,
      name: newName,
    };

    let errors = TaskModel.validate(task);

    this.setState({ errors, task });

    if (Object.values(errors).some((error) => error)) {
      this.updateTaskDebounced();
    }
  }

  onTaskDelete(e) {
    e.preventDefault();

    this.setState({submitting: true});
    this.props
      .dispatch(deleteTask(this.props.task))
      .then(() => this.setState({submitting: false}));
  }

  onTaskStateChange(e) {
    let newState = e.target.checked ? 'complete' : 'new';

    let taskId = this.props.task.id;

    this.setState({
      submitting: true,
      task: {
        ...this.state.task,
        state: newState,
      },
    });
    this.props
      .dispatch(updateTask({
        id: taskId,
        state: newState,
      }))
      .then(() => this.setState({submitting: false}));
  }
}

export default connect(
  mapStateToProps,
)(Task);
