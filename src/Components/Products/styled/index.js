import styled from "styled-components";
import { Color } from "../../../constants";

const margin = "2.5%";

export const Price = styled.Text`
  padding-top: 1%;
  padding-horizontal: 1%;
  font-size: 16;
  font-weight: bold;
  color: ${Color.secondary};
`;
export const Line = styled.View`
  height: 1;
  background-color: #eee;
`;
export const Name = styled.Text`
  padding-horizontal: 1%;
  padding-bottom: 5%;
  font-size: 15;
  font-weight: 300;
  color: ${Color.main};
`;

export const ItemWrapper = styled.View`
  flex: 1;
  height: 200;
  position: relative;
  padding-top: ${margin};
  padding-horizontal: ${margin};
  padding-bottom: ${({ isLast }) => (isLast ? margin : "auto")};
  justify-content: space-around;
  background-color: #fff;
  border-width: 1;
  border-color: #eee;
`;
