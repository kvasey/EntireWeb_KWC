import React, { Component } from "react";
import { connect } from "react-redux";
import FavScreen from "./Screen";
import { favoritesRemove } from "./action";

const Container = props => <FavScreen {...props} />;

const mapStateToProps = ({ favorites }) => ({ favorites });
const mapDispatchToProps = dispatch => ({
  removeItem: index => dispatch(favoritesRemove(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
