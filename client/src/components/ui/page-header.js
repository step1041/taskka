import React, {Component} from 'react';
import {connect} from 'react-redux';

import './page-header.scss';

const mapStateToProps = () => ({});

class View extends Component {
  render() {
    return (
      <div className={'page-header'}>
        {this.props.children}
      </div>
    );
  }
}

const PageHeader = connect(
  mapStateToProps,
)(View);

export default PageHeader;
