import React, { PropTypes, Component } from "react";
import { connect } from 'react-redux';
import { fetchConfig } from '../actions/index';
import CircularProgress from 'material-ui/lib/circular-progress';
import _ from 'lodash';

export default function (Component) {
  class ConfigContainer extends Component {
    constructor() {
      super();
      this.state = { intiLoad: false};
    }

    componentWillMount() {
      this.props.dispatch(fetchConfig());
    }

    componentWillUpdate() {
      if (!this.state.intiLoad && _.isEmpty(this.props.config)) {
        this.setState({intiLoad: true});
      }
    }

    render() {
      if (!this.state.intiLoad && _.isEmpty(this.props.config)) {
        return <CircularProgress />;
      }

      return <Component {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { config: state.config.appConfig };
  } 

  return connect(mapStateToProps, {fetchConfig})(ConfigContainer)
}


