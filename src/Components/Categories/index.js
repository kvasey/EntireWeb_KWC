import React, { Component } from 'react';
import CategoryScreen from './Screen';
import { defaultCategoryId } from '../../constants';
import fetchAction from './action';
import { connect } from 'react-redux';

class Container extends Component {
  componentDidMount = () => this.props.fetch();
  render = () => {
    const filterId = this.props.navigation.state.params
      ? this.props.navigation.state.params.filterId
      : defaultCategoryId;
    const filteredData = getCurrentCategories(this.props.data, filterId);
    return (
      <CategoryScreen
        {...this.props}
        filteredData={filteredData}
        showSeparator={filterId !== defaultCategoryId}
      />
    );
  };
}

const getCurrentCategories = (data, filterId) =>
  data.length > 1 ? data.filter(({ idParent }) => idParent === filterId) : [];
const mapStateToProps = ({ categories: { error, loading, data } }) => ({ error, loading, data });
const mapDispatchToProps = dispatch => ({ fetch: () => dispatch(fetchAction()) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
