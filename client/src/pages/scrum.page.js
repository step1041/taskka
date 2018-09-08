import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import ScrumSide from '../components/scrum/scrum-side';
import PageHeader from '../components/ui/page-header';

import {startScrum} from '../actions/scrum.actions';

import './scrum.page.scss';

const mapStateToProps = () => ({});

class View extends Component {
  componentDidMount() {
    let left_day = moment(this.props.match.params.left_day);

    let right_day = null;
    if (this.props.match.params.right_day) {
      right_day = moment(this.props.match.params.right_day);
    }

    this.props.dispatch(startScrum(left_day, right_day));
  }

  render() {
    return (
      <div className={'scrum-page'}>
        <PageHeader>
          <div className={'header-left'}>
            <h1>Scrum</h1>
          </div>
        </PageHeader>
        <ScrumSide side={"left"}/>
        <ScrumSide side={"right"}/>
      </div>
    );
  }
}

const ScrumPage = connect(
  mapStateToProps,
)(View);

export default ScrumPage;
