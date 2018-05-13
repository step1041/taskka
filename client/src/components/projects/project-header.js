import React, {Component} from 'react';
import {connect} from 'react-redux';

import './project-header.scss';

const mapStateToProps = (state) => ({
  project: state.projects.find((p) => p.id === state.ui.currentProjectId),
});

class ProjectHeader extends Component {
  render() {
    if (!this.props.project) {
      return (<div>Loading...</div>);
    }

    return (
      <div className={'project-header'}>
        <h1>{this.props.project.name}</h1>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(ProjectHeader);
