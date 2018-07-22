import React, { Component } from "react";
import CheckoutScreen from "./Screen";
import { connect } from "react-redux";

class Container extends Component {
  render = () => <CheckoutScreen {...this.props} />;
}

const mapStateToProps = ({ favorites }) => ({ favorites });
export default connect(
  mapStateToProps,
  null
)(Container);
