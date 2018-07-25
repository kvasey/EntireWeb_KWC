import styled from "styled-components";
import { Platform } from "react-native";
import { Color } from "../../../constants";

const margin = "2.5%";

export const Price = styled.Text`
  padding-horizontal: 5%;
  padding-vertical: ${margin};
  font-size: ${Platform.isPad ? 24 : 20};
  font-weight: bold;
  color: ${Color.secondary};
`;
export const Name = styled.Text`
  padding-horizontal: 5%;
  font-size: ${Platform.isPad ? 26 : 22};
`;

export const Reference = styled.Text`
  padding-horizontal: 5%;
  color: ${Color.main};
  font-size: 16;
  font-size: ${Platform.isPad ? 20 : 16};
`;

export const Line = styled.View`
  margin-bottom: ${margin};
  background-color: #eee;
  height: 1;
  width: 100%;
`;

export const PickerContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  border-width: 1;
  border-style: solid;
  border-color: #eee;
`;

export const ProductDescription = styled.WebView``;
