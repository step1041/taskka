import {connect} from 'react-redux';
import {Switch} from 'react-router';

const ConnectedSwitch = connect(state => ({
  location: state.router.location
}))(Switch);

export default ConnectedSwitch;
