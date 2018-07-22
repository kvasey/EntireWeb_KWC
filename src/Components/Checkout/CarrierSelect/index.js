import React, { Fragment } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { setCarrier } from "../action";
import { Button, Price, Name } from "../../styled/general";
import {
  StatusContainer,
  StatusText,
  OrderContainer,
  OuterOrderContainer,
  AddressContainer,
  AddressLine,
  AddressContent
} from "../../Profile/styled";
import { getPrice } from "../../util";
import { Color } from "../../../constants";

const Container = ({ deliveries, navigation: { navigate }, setCarrier }) => (
  <FlatList
    data={deliveries}
    keyExtractor={({ id }, index) => `${index + id}`}
    renderItem={({
      item: {
        price,
        carrier: { name, delay }
      },
      index
    }) => (
      <Button
        onPress={() => {
          setCarrier(index);
          navigate("Summary");
        }}
      >
        <OrderContainer>
          <StatusContainer color={Color.secondary}>
            <StatusText style={{ color: "#FFF" }}>
              £
              {getPrice(price)}
            </StatusText>
          </StatusContainer>
          <OuterOrderContainer>
            <AddressContainer>
              <AddressContent>
                <AddressLine>
                  <Price>
{name}
</Price>
                </AddressLine>
                <AddressLine>
                  <Name numberOfLines={2}>
{delay}
</Name>
                </AddressLine>
              </AddressContent>
            </AddressContainer>
          </OuterOrderContainer>
        </OrderContainer>
      </Button>
    )}
  />
);

const mapStateToProps = ({ checkout: { deliveries } }) => ({ deliveries });
const mapDispatchToProps = dispatch => ({
  setCarrier: index => dispatch(setCarrier(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
