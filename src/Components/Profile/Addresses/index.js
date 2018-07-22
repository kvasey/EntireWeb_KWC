import React, { Component } from "react";
import { Platform } from "react-native";
import AddressesScreen from "./Screen";
import { connect } from "react-redux";
import { getAddresses } from "../action";
import { setAccordionHeight } from "../Orders";

class Container extends Component {
  componentDidMount = () =>
    this.props.user.id
      ? this.props.fetch(this.props.user.id)
      : this.props.navigation.goBack(null);

  shouldComponentUpdate = (nextProps, nextState) =>
    nextProps.data !== this.props.data ||
    nextProps.loading !== this.props.loading ||
    nextProps.error !== nextProps.error;

  componentDidUpdate = prevProps => {
    if (this.props.data !== prevProps.data)
      if (Platform.OS === "android")
        setAccordionHeight(this.props.data.orders, this.props.screenProps);
  };
  render = () => <AddressesScreen {...this.props} />;
}

const mapStateToProps = ({ user, addresses: { loading, error, data } }) => ({
  user,
  loading,
  error,
  data
});
const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(getAddresses(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
