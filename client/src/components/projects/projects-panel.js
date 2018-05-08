import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = () => ({});

class ProjectsPanel extends Component{
  render () {
    return (
      <div>
        List of Projects
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(ProjectsPanel);
