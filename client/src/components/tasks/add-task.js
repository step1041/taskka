import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addTask} from '../../actions/task.actions';

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
      <form onSubmit={this.onFormSubmit}>
        <input type={'text'} value={this.state.task.name} onChange={this.onNameChange}
               disabled={this.state.submitting} />
      </form>
    );
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.setState({submitting: true});
    this.props.dispatch(addTask(this.state.task))
      .then(() => {
        this.setState(this.getInitialState());
      });
  }

  onNameChange(e) {
    this.setState({
      task: {
        ...this.state.task,
        name: e.target.value,
      },
    });
  }
}

export default connect(
  mapStateToProps,
)(AddTask);
