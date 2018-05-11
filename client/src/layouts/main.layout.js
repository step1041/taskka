import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router';

import ConnectedSwitch from '../lib/connected-switch';

import UserInfo from '../components/user/user-info';
import ProjectList from '../components/projects/projects-panel';

import LogoutPage from '../pages/logout.page';
import TasksPage from '../pages/tasks.page';
import NewUserPage from '../pages/new-user.page';

import {closeProjectsPanel, toggleProjectsPanel} from '../actions/ui.actions';

import "./main.layout.scss";

const mapStateToProps = (state) => ({
  user: state.user,
  accessToken: state.accessToken,
  projectsPanelOpen: state.ui.projectsPanelOpen,
});

class MainLayout extends Component {
  constructor() {
    super();

    this.onWindowResize = this.onWindowResize.bind(this);
    this.toggleProjectsPanel = this.toggleProjectsPanel.bind(this);
  }

  render() {
    let className = "main-layout";

    if (this.props.projectsPanelOpen) {
      className += " menu-open";
    }

    const ClickShroud = () => (
      <div className={'click-shroud'} onClick={this.toggleProjectsPanel} />
    );

    const ProjectsPanelToggle = () => (
      <div className={'projects-panel-toggle'} onClick={this.toggleProjectsPanel}>
        Projects
      </div>
    );

    return (
      <div className={className} >
        <div className={"projects"}>
          <ProjectList />
        </div>
        {
          this.props.projectsPanelOpen
            ? <ClickShroud />
            : null
        }
        <div className={"header"} >
          <div className={"app-name"}>Taskka</div>
          <ProjectsPanelToggle />
          <UserInfo />
        </div>
        <div className={"page"}>
          <ConnectedSwitch>
            <Route path={'/logout'} component={LogoutPage} />

            <Route path={'/user/new'} component={NewUserPage} />

            <Route path={'/tasks'} component={TasksPage} />

            <Route path={'/auth/:provider/callback'}>
              {/* User is just logging in, and they are still on the old callback route */}
              <div>Loading...</div>
            </Route>

            <Route>
              <Redirect to={'/tasks'} />
            </Route>
          </ConnectedSwitch>
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize)
  }

  toggleProjectsPanel() {
    this.props.dispatch(toggleProjectsPanel());
  }

  onWindowResize() {
    if (this.props.projectsPanelOpen && window.innerWidth >= 600) {
      this.props.dispatch(closeProjectsPanel());
    }
  }
}

export default connect(
  mapStateToProps,
)(MainLayout);

