import React, { Component } from 'react';
import ProductDescriptionScreen from './Screen';
import fetchAction from './action';
import { connect } from 'react-redux';

class Container extends Component {
  componentDidMount = () => {
    if (!this.props.navigation.state.params) this.props.navigation.navigate.goBack(null);
    this.props.fetch(this.props.navigation.state.params.productId);
  };

  render = () => {
    return <ProductDescriptionScreen {...this.props} />;
  };
}

const mapStateToProps = ({ product }) => ({ product });
const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(fetchAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
