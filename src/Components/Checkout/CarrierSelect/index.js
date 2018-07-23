import React, { Fragment } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { setCarrier } from "../action";
import { Button, Price, Name } from "../../styled/general";
import { SummaryText } from "../styled";
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
  <Fragment>
    <SummaryText>Select your Carrier</SummaryText>
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
          <OrderContainer style={{ height: 130 }}>
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
                    <Price>{name}</Price>
                  </AddressLine>
                  <AddressLine>
                    <Name numberOfLines={2}>{delay}</Name>
                  </AddressLine>
                </AddressContent>
              </AddressContainer>
            </OuterOrderContainer>
          </OrderContainer>
        </Button>
      )}
    />
  </Fragment>
);

const mapStateToProps = ({ checkout: { deliveries } }) => ({ deliveries });
const mapDispatchToProps = dispatch => ({
  setCarrier: index => dispatch(setCarrier(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
