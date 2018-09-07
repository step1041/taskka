import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import UserInfo from '../user/user-info';

import {toggleProjectsPanel} from '../../actions/ui.actions';

import './nav-bar.scss';

const mapStateToProps = (state) => ({
  user: state.user,
  userIsNew: !state.user.username,
  accessToken: state.accessToken,
  projectsPanelOpen: state.ui.projectsPanelOpen,
});

class View extends Component {
  constructor() {
    super();

    this.toggleProjectsPanel = this.toggleProjectsPanel.bind(this);
  }

  render() {
    return (
      <div className={'nav-bar'}>
        <div className={'app-name'}>Taskka</div>
        <span className={'left-area'}>
          {!this.props.userIsNew && (
            <span>
              <ProjectsPanelToggle onClick={this.toggleProjectsPanel} />
              <ScrumNavLink />
            </span>
          )}
        </span>
        <span className={'right-area'}>
          <UserInfo />
        </span>
      </div>
    );
  }

  toggleProjectsPanel() {
    this.props.dispatch(toggleProjectsPanel());
  }
}

const ProjectsPanelToggle = connect(
  (state) => ({
    active: state.ui.projectsPanelOpen || state.router.location.pathname.indexOf('/tasks') === 0,
  })
)(({active, onClick}) => (
  <div className={`nav-link ${active ? 'active' : ''} projects-panel-toggle`} onClick={onClick}>
    Projects
  </div>
));

const ScrumNavLink = connect(
  (state) => ({
    active: state.router.location.pathname.indexOf('/scrum') === 0,
  })
)(({ active }) => (
  <Link className={`nav-link ${active ? 'active' : ''}`} to={'/scrum'}>Scrum</Link>
));

const NavBar = connect(
  mapStateToProps,
)(View);

export default NavBar;
