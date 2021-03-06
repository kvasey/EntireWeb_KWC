import React, { Fragment } from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import { setAddress, setInvoice, setDefaultCarrier } from "../action";
import { createCart } from "../orderActions";
import { Button } from "../../styled/general";
import { SummaryText } from "../styled";
import {
  StatusText,
  StatusContainer,
  OrderContainer,
  OuterOrderContainer,
  AddressContainer,
  AddressContent,
  AddressLine,
  AddressLineText
} from "../../Profile/styled";
import { Color } from "../../../constants";

const Container = ({
  addresses,
  navigation: {
    navigate,
    state: { params }
  },
  setAddress,
  setInvoice,
  createCart,
  setDefaultCarrier
}) => (
  <Fragment>
    <SummaryText>
      {params.select === "invoice"
        ? "Select Your Invoice Address"
        : "Select Your Delivery Address"}
    </SummaryText>
    <FlatList
      data={addresses}
      keyExtractor={({ id }, index) => id + index}
      renderItem={({
        item: { alias, address1, address2, city, phone, phone_mobile },
        index
      }) => (
        <Button
          onPress={() => {
            if (params.select === "invoice") {
              setInvoice(index);
              createCart();
              navigate("CarrierSelect");
            } else {
              setAddress(index);
              setDefaultCarrier();
              navigate("InvoiceSelect", { select: "invoice" });
            }
          }}
        >
          <OrderContainer>
            <Fragment>
              <StatusContainer color={Color.secondary}>
                <StatusText style={{ color: "#FFF" }}>{alias}</StatusText>
              </StatusContainer>
              <OuterOrderContainer flexDirection="column">
                <AddressContainer>
                  <AddressContent>
                    <AddressLine>
                      <Icon
                        name="map-pin"
                        size={15}
                        style={{ marginRight: 5 }}
                        color={Color.main}
                      />
                      <AddressLineText>{address1}</AddressLineText>
                    </AddressLine>
                    {address2 ? (
                      <AddressLine>
                        <AddressLineText>{address2}</AddressLineText>
                      </AddressLine>
                    ) : null}
                    <AddressLine style={{ marginLeft: 20 }}>
                      <AddressLineText>{city}</AddressLineText>
                    </AddressLine>
                    <AddressLine>
                      <Icon
                        name="phone"
                        size={15}
                        style={{ marginRight: 5 }}
                        color={Color.main}
                      />
                      <AddressLineText>{phone || phone_mobile}</AddressLineText>
                    </AddressLine>
                  </AddressContent>
                </AddressContainer>
              </OuterOrderContainer>
            </Fragment>
          </OrderContainer>
        </Button>
      )}
    />
  </Fragment>
);

const mapStateToProps = ({
  addresses: {
    data: { addresses }
  }
}) => ({ addresses });
const mapDispatchToProps = dispatch => ({
  setAddress: index => dispatch(setAddress(index)),
  setInvoice: index => dispatch(setInvoice(index)),
  createCart: () => dispatch(createCart()),
  setDefaultCarrier: () => dispatch(setDefaultCarrier())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
