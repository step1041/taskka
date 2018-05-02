import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import TaskkaApiClient from '../taskka-api-client';
import errorHandler from '../lib/error-handler';

const mapStateToProps = (state) => ({
});

class NewUserPage extends Component {
  constructor() {
    super();

    this.state = { username: '' };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  render() {
    return (
      <form>
        <p>
          Welcome to Taskka. What should we call you?
        </p>

        <div>
          <label>
            Username: <input type={'text'} value={this.state.username} onChange={this.onUsernameChange}/>
            { this.state.usernameError ? this.state.usernameError : '' }
          </label>
          <button value={"Save"} onClick={this.saveUser}>Save</button>
        </div>
      </form>
    )
  }

  onUsernameChange(event) {
    this.setState({
      usernameError: "",
      username: event.target.value
    });
  }

  saveUser(e) {
    e.preventDefault();

    if (this.state.username) {
      TaskkaApiClient
        .patch('/user', {
          user: { username: this.state.username }
        })
        .then(() => this.props.dispatch(push('/')))
        .catch(errorHandler);
    }
    else {
      this.setState({usernameError: "A username is required"})
    }
  }
}

export default connect(
  mapStateToProps,
)(NewUserPage);
