import styled from "styled-components";
import { Platform } from "react-native";
import { Color } from "../../../constants";

export const HeaderWrapper = styled.View`
  height: ${Platform.isPad ? 150 : 100};
  margin-horizontal: 10;
  padding-bottom: 5;
  margin-vertical: 5;
  border-radius: 5;
  border-color: #ddd;
  border-width: 1;
  background-color: #fff;
  overflow: hidden;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;
export const ContentWrapper = styled.View`
  margin-horizontal: 10;
  /* margin-vertical: 5; */
  border-radius: 5;
  border-color: #ddd;
  border-width: 1;
  background-color: #fff;
  overflow: hidden;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

export const Image = styled.Image`
  height: ${Platform.isPad ? "90%" : "70%"};
  width: ${Platform.isPad ? "20%" : "20%"};
  justify-content: center;
  align-items: center;
`;
export const NameContainer = styled.View`
  width: 65%;
`;
export const DualContent = styled.View`
  width: 100%;
  height: 40;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
export const RemoveContainer = styled.View`
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const QuantityContainer = styled.View`
  width: 50%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-color: #ddd;
  border-left-width: 1;
`;

export const HeaderQuantity = styled.Text`
  width: 10%;
  font-size: ${Platform.isPad ? "34" : "26"};
  font-weight: bold;
  color: ${Color.secondary};
`;

export const Text = styled.Text`
  width: 50%;
  font-size: ${Platform.isPad ? "26" : "20"};
  padding-horizontal: 5%;
  /* padding-vertical: 2.5%; */
`;
