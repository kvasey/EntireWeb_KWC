import styled from 'styled-components';

const margin = '2.5%';

export const Price = styled.Text`
  padding-top: 1%;
  padding-horizontal: 1%;
  font-size: 16;
  font-weight: bold;
`;
export const Name = styled.Text`
  padding-horizontal: 1%;
  padding-bottom: 1%;
  font-size: 15;
  font-weight: 300;
`;

export const ItemWrapper = styled.View`
  flex: 1;
  height: 200;
  position: relative;
  padding-top: ${margin};
  padding-horizontal: ${margin};
  padding-bottom: ${({ isLast }) => (isLast ? margin : 'auto')};
  justify-content: center;
  background-color: #fff;
  border-width: 1;
  border-color: #eee;
`;
