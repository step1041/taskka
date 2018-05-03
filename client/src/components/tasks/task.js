import React, {Component} from 'react';
import {connect} from 'react-redux';
import debounce from 'debounce';

import TaskModel from '../../models/task';

import {deleteTask, updateTask} from '../../actions/task.actions';

import './task.scss';

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

class Task extends Component {
  constructor() {
    super();

    this.initState = {
      errors: {},
      confirmingDelete: false,
      submitting: false,
      task: {},
    };

    this.state = this.initState;

    this.onTaskDelete = this.onTaskDelete.bind(this);
    this.onTaskStateChange = this.onTaskStateChange.bind(this);
    this.onTaskNameChange = this.onTaskNameChange.bind(this);
  }

  componentDidMount() {
    this.__mounted = true;
  }

  componentWillUnmount() {
    this.__mounted = false;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      task: nextProps.task,
    };
  }

  render() {
    return (
      <div key={this.state.task.id} className={'task-item'}>
        <div className={'task-input-bar'}>
          <input
            type={'checkbox'}
            className={'task-state'}
            checked={this.state.task.state === 'complete'}
            onChange={this.onTaskStateChange}
            disabled={this.state.submitting}
          />
          <input
            type={'text'}
            className={'task-name'}
            value={this.state.task.name}
            onChange={this.onTaskNameChange}
            disabled={this.state.submitting}
          />
          <button
            onClick={this.onTaskDelete}
            className={'task-delete-btn'}
            disabled={this.state.submitting}
          >
            { this.state.confirmingDelete ? "Confirm?" : "Delete" }
          </button>
        </div>

        {
          this.state.errors && this.state.errors.name
          ?
          <div className={'task-error-bar'}>
            <small>{this.state.errors.name}</small>
          </div>
          :
          null
        }

        <div className={'task-notes-bar'}>
          <textarea className={'task-notes'}>{this.state.task.notes}</textarea>
        </div>
      </div>
    );
  }

  updateTaskDebounced = debounce(() => {
    this.props
      .dispatch(updateTask(this.state.task));
  }, 500);

  onTaskNameChange(e) {
    let newName = e.target.value;
    let task = {
      ...this.state.task,
      name: newName,
    };

    let errors = TaskModel.validate(task);

    this.setState({ errors, task });

    if (!Object.values(errors).some((error) => error)) {
      this.updateTaskDebounced();
    }
  }

  onTaskDelete(e) {
    e.preventDefault();

    if (!this.state.confirmingDelete) {
      this.setState({confirmingDelete: true});
    }
    else {
      this.setState({submitting: true});
      this.props
        .dispatch(deleteTask(this.props.task))
        .then(() => {
          if (this.__mounted) {
            this.setState({submitting: false});
          }
        });
    }
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
      .then(() => {
        if (this.__mounted) {
          this.setState({submitting: false})
        }
      });
  }
}

export default connect(
  mapStateToProps,
)(Task);
