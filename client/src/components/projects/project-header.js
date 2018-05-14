import React, {Component} from 'react';
import {connect} from 'react-redux';

import './project-header.scss';
import Button from '../ui/button';
import {deleteProject} from '../../actions/project.actions';

const mapStateToProps = (state) => ({
  project: state.projects.get(state.ui.currentProjectId),
  isDefaultProject: state.user && state.user.default_project_id === state.ui.currentProjectId,
});

class ProjectHeader extends Component {
  constructor() {
    super();

    this.state = {
      confirmingDelete: false,
    };

    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    this.__mounted = true;
  }

  componentWillUnmount() {
    this.__mounted = false;
  }

  static getDerivedStateFromProps() {
    return {
      confirmingDelete: false,
    };
  }

  render() {
    if (!this.props.project) {
      return (<div>Loading...</div>);
    }

    return (
      <div className={'project-header'}>
        <div className={'left-side'}>
          <h1>{this.props.project.name}</h1>
        </div>

        <div className={'right-side'}>
          {!this.props.isDefaultProject ? (
            <div>
              <Button buttonStyle={'danger'} onClick={this.onDeleteClick}>
                {this.state.confirmingDelete ? 'Confirm?' : 'Delete'}
              </Button>
            </div>
          ) : (
            <div>
              <Button disabled tooltip={'You can\'t delete your default project'}
                      tooltipPosition={'left'}>Delete</Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  onDeleteClick() {
    if (!this.state.confirmingDelete) {
      this.setState({confirmingDelete: true});
      setTimeout(() => {
        if (this.__mounted) {
          this.setState({confirmingDelete: false});
        }
      }, 2000)
    }
    else {
      this.setState({submitting: true});
      this.props
        .dispatch(deleteProject(this.props.project))
        .then(() => {
          if (this.__mounted) {
            this.setState({submitting: false});
          }
        });
    }
  }
}

export default connect(
  mapStateToProps,
)(ProjectHeader);
