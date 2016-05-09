import React, { PropTypes, Component } from "react";
import { connect } from 'react-redux';
import { fetchConfig } from '../actions/index';
import CircularProgress from 'material-ui/lib/circular-progress';

export default function (ComposedComponent) {
  class ConfigContainer extends Component {
    componentWillMount() {
      this.props.fetchConfig();
    }
    render() {
      if (this.props.appConfig !== undefined) {
        return <CircularProgress />;
      }

      return <ComposedComponent/>
    }
  }

  function mapStateToProps(state) {
    return { config: state.appConfig };
  } 

  return connect(mapStateToProps, {fetchConfig})(ConfigContainer)
}