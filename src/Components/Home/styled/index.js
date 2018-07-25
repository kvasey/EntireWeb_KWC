import styled from "styled-components";
import { Platform } from "react-native";

const margin = "5%";
const getImage = ({ height, padHeight }) =>
  Platform.isPad ? padHeight : height;

export const AdImage = styled.Image`
  width: ${Platform.isPad ? "65%" : "100%"};
  height: ${props => getImage(props)};
  border-radius: 5;
`;
export const ItemWrapper = styled.View`
  margin-top: ${margin};
  align-items: center;
  margin-horizontal: ${margin};
`;
