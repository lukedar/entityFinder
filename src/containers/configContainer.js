import React, { PropTypes, Component } from "react";
import { connect } from 'react-redux';
import { fetchConfig } from '../actions/index';
import CircularProgress from 'material-ui/lib/circular-progress';

export default function (Component) {
  class ConfigContainer extends Component {
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      this.props.fetchConfig();
    }
    
    render() {
      if (this.props.appConfig !== undefined) {
        return <CircularProgress />;
      }

      console.log(this.props.appConfig);

      return <Component {...this.props}/>
    }
  }

  function mapStateToProps(state) {
    return { config: state.appConfig };
  } 

  return connect(mapStateToProps, {fetchConfig})(ConfigContainer)
}


