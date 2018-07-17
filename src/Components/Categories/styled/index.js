import styled from "styled-components";
import { Platform } from "react-native";
import { Color } from "../../../constants";

const margin = 15;
const getImage = ({ height, padHeight }) =>
  Platform.isPad ? padHeight : height;

export const CategoryImage = styled.Image`
  width: 100%;
  height: ${props => getImage(props)};
  border-radius: 5;
`;
export const CategoryTitle = styled.Text`
  position: absolute;
  width: 50%;
  font-size: 22;
  top: 30%;
  left: 5%;
  font-weight: 300;
  font-family: "JosefinSans-Regular";
`;

export const CategoryTitleNoImage = styled.Text`
  width: 100%;
  padding-vertical: 2.5%;
  margin-horizontal: 2.5%;
  font-size: 20;
  border-bottom-width: 1;
  font-weight: 300;
  border-color: #eee;
  border-style: solid;
  font-family: "JosefinSans-Regular";
`;

export const Separator = styled.View`
  height: 1;
  margin-horizontal: 15;
  border-radius: 100;
  background-color: #eee;
`;

export const ItemWrapper = styled.View`
  position: relative;
  margin-top: ${margin};
  margin-horizontal: ${margin};
  margin-bottom: ${({ isLast }) => (isLast ? margin : "auto")};
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;
