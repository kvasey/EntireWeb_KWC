import React, { Component } from "react";
import { Platform } from "react-native";
import OrdersScreen from "./Screen";
import { connect } from "react-redux";
import { getOrders } from "../action";

const itemHeight = 180;

class Container extends Component {
  componentDidMount = () =>
    this.props.user.id
      ? this.props.fetch(this.props.user.id)
      : this.props.navigation.navigate.goBack(null);

  shouldComponentUpdate = nextProps =>
    nextProps.data !== this.props.data ||
    nextProps.loading !== this.props.loading ||
    nextProps.error !== nextProps.error;

  componentDidUpdate = prevProps => {
    if (this.props.data !== prevProps.data)
      if (Platform.OS === "android")
        setAccordionHeight(this.props.data.orders, this.props.screenProps);
  };

  render = () => <OrdersScreen {...this.props} />;
}

export const setAccordionHeight = (data, { currentHeight, setHeight }) => {
  if (data)
    if (currentHeight < itemHeight * data.length)
      setHeight(itemHeight * data.length);
};

const mapStateToProps = ({
  user,
  orders: { loading, error, data },
  carriers,
  addresses
}) => ({
  user,
  loading,
  error,
  data,
  carriers: carriers.data,
  addresses: addresses.data
});
const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(getOrders(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
