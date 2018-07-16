import React from "react";
import { FluidNavigator } from "react-navigation-fluid-transitions";
import { createStackNavigator } from "react-navigation";
import Categories from "../Components/Categories";
import InnerHeader from "../Components/styled/Headers/InnerHeader";
import ProductHeader from "../Components/styled/Headers/ProductHeader";
import Products from "../Components/Products";
import ProductDescription from "../Components/ProductDescription";

export default createStackNavigator(
  {
    Categories: {
      screen: Categories,
      navigationOptions: {
        header: null
      }
    },
    ChildCategories: {
      screen: Categories,
      navigationOptions: {
        header: props => <InnerHeader {...props} />
      }
    },
    Products: {
      navigationOptions: {
        header: props => <ProductHeader {...props} />
      },
      screen: FluidNavigator(
        {
          ProductsList: {
            screen: Products
          },
          ProductDescription: {
            screen: ProductDescription
          }
        },
        { initialRouteName: "ProductsList" }
      )
    }
  },
  {
    initialRouteName: "Categories"
  }
);
