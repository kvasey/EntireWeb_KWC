import styled from "styled-components";
import { Platform } from "react-native";
import { width, height } from "../../styled/general";
import { Color } from "../../../constants";

export const headerHeightProportion = 4;

export const RenderContainer = styled.View`
  height: ${height / headerHeightProportion};
  width: ${width};
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const BackgroundImage = styled.Image`
  height: ${height / headerHeightProportion};
  width: ${width};
`;

export const BackgroundOverlay = styled.View`
  height: ${height / headerHeightProportion};
  width: ${width};
  position: absolute;
  background-color: ${Color.secondary};
  opacity: 0.45;
`;

export const ButtonText = styled.Text`
  color: #ddd;
`;

export const AccordionContainer = styled.View`
  flex: 1;
  background-color: #eee;
`;

export const InitialsView = styled.View`
  width: ${Platform.isPad ? "240" : "120"};
  height: ${Platform.isPad ? "240" : "120"};
  background-color: rgba(218, 218, 218, 0.4)
  border-radius: ${Platform.isPad ? "200" : "100"};
  border-width: 3;
  border-color: #ddd;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const InitialsText = styled.Text`
  color: #ddd;
  font-weight: 300;
  font-size: ${Platform.isPad ? "80" : "48"};
  text-align: center;
`;

export const OrderContainer = styled.View`
  height: 135;
  margin-horizontal: 10;
  padding-bottom: 5;
  margin-vertical: 5;
  border-radius: 5;
  overflow: hidden;
`;

export const OuterOrderContainer = styled.View`
  width: 100%;
  padding-horizontal: 5;
  padding-vertical: 5;
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  border-style: solid;
  border-width: 1;
  background-color: #fff;
  border-color: #ddd;
`;

export const OrderContentContainer = styled.View`
  margin-horizontal: 10;
  border-radius: 5;
  border-style: solid;
  border-width: 1;
  border-color: #ddd;
`;

export const HalfOrderContainer = styled.View`
  width: 50%;
  padding-horizontal: 5;
  padding-vertical: 5;
  flex-direction: column;
  justify-content: center;
  border-style: solid;
  border-right-width: ${({ left }) => (left ? "1" : "0")};
  border-color: #ddd;
`;

export const StatusText = styled.Text`
  color: ${Color.main};
  font-size: 18;
  padding-horizontal: 5;
  text-align: ${({ right }) => (right ? "right" : "left")};
`;

export const PriceText = styled.Text`
  font-size: 26;
  padding-horizontal: 5;
  text-align: center;
`;

export const DataText = styled.Text`
  font-size: 20;
  font-weight: 300;
  padding-horizontal: 5;
  text-align: right;
`;

export const StatusContainer = styled.View`
  background-color: ${({ color }) => color || "#FFF"};
  width: 100%;
  padding-vertical: 5;
  padding-horizontal: 5;
`;

export const AddressContainer = styled.View`
  width: 100%;
  padding-horizontal: 5;
  padding-vertical: 5;
  border-bottom-width: ${({ line }) => (line ? "1" : "0")};
  border-color: #ddd;
  border-style: solid;
`;
export const AddressContent = styled.View``;
export const AddressLine = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-vertical: 2;
`;
export const AddressLineText = styled.Text`
  font-size: 18;
  font-weight: 300;
  text-align: left;
  color: ${Color.main};
`;
export const AddressTitle = styled.Text`
  color: ${Color.secondary};
  font-size: 20;
  font-weight: bold;
  text-align: left;
  border-bottom-width: 1;
  border-color: #ddd;
  border-style: solid;
`;
