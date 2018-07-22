import React, { Component } from "react";
import { connect } from "react-redux";
import { createOrder } from "../orderActions";

class Container extends Component {
  componentDidMount = () => this.props.createOrder();

  render = () => null;
}

const mapDispatchToProps = dispatch => ({
  createOrder: () => dispatch(createOrder())
});

export default connect(
  null,
  mapDispatchToProps
)(Container);
