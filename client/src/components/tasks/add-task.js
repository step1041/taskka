import React, {Component} from 'react';
import {connect} from 'react-redux';

import TaskModel from '../../models/task';

import {addTask} from '../../actions/task.actions';

import './add-task.scss';

const mapStateToProps = (state) => ({});

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  getInitialState() {
    return {
      submitting: false,
      task: {
        state: this.props.state || 'new',
        name: '',
      },
    };
  }

  render() {
    return (
      <div className={'add-task'}>
        <form onSubmit={this.onFormSubmit}>
          <input
            type={'text'}
            className={'task-name'}
            placeholder={'Add task...'}
            value={this.state.task.name}
            onChange={this.onNameChange}
            disabled={this.state.submitting}
          />
          {this.state.errors && this.state.errors.name
            ? <small>{this.state.errors.name}</small>
            : null
          }
        </form>
      </div>
    );
  }

  onFormSubmit(e) {
    e.preventDefault();

    let errors = TaskModel.validate(this.state.task);

    if (Object.values(errors).some((msg) => msg)) {
      this.setState({ errors });
      return;
    }

    this.setState({submitting: true});
    this.props.dispatch(addTask(this.state.task))
      .then(() => this.setState(this.getInitialState()));
  }

  onNameChange(e) {
    let task = {
      ...this.state.task,
      name: e.target.value,
    };

    let errors = TaskModel.validate(task);

    this.setState({
      errors,
      task,
    });
  }
}

export default connect(
  mapStateToProps,
)(AddTask);
