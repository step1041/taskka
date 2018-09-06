import React, {Component} from 'react';
import {connect} from 'react-redux';

import ScrumSide from '../components/scrum/scrum-side';

import {startScrum} from '../actions/scrum.actions';

import './scrum.page.scss';
import moment from 'moment';
import PageHeader from '../components/ui/page-header';

const mapStateToProps = () => ({});

class View extends Component {
  componentDidMount() {
    let left_day = moment(this.props.match.params.left_day);
    let right_day = moment(this.props.match.params.right_day);

    this.props.dispatch(startScrum(left_day, right_day));
  }

  render() {
    return (
      <div>
        <PageHeader>
          <div className={'left-side'}>
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
