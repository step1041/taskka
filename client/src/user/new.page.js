import React, {Component} from 'react';

class NewUserPage extends Component {
  render() {
    return (
      <form>
        <p>
          Welcome to Taskka. What should we call you?
        </p>

        <div>
          <label>
            Username: <input type={'text'} />
          </label>
        </div>

        <div>
          <button value={"Save"}>Save</button>
        </div>
      </form>
    )
  }
}

export default NewUserPage;
