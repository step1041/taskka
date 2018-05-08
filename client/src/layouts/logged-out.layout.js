import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router';

import ConnectedSwitch from '../lib/connected-switch';

import LoginPage from '../pages/login.page';
import VerifyPage from '../pages/verify.page';

import "./logged-out.layout.scss";

const mapStateToProps = () => ({});

class LoggedOutLayout extends Component {
  render() {
    return (
      <div className={"logged-out-layout"}>
        <ConnectedSwitch>
          <Route path={'/login'} component={LoginPage} />
          <Route path={'/auth/:provider/callback'} component={VerifyPage} />
          <Route>
            <Redirect to={'/login'} />
          </Route>
        </ConnectedSwitch>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(LoggedOutLayout);

