import React, { Fragment } from "react";
import { FlatList } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { NavigationActions } from "react-navigation";
import { Button } from "../../styled/general";
import { StateComponent, SubmitButton } from "../../styled/components";
import {
  StatusText,
  StatusContainer,
  OrderContainer,
  OuterOrderContainer,
  AddressContainer,
  AddressContent,
  AddressLine,
  AddressLineText
} from "../styled";
import { Color } from "../../../constants";

export default ({
  data: { addresses = [] },
  error,
  user,
  loading,
  screenProps: { rootNavigation }
}) => (
  <FlatList
    scrollEnabled={false}
    data={addresses}
    extraData={addresses}
    style={{ backgroundColor: "#EEE" }}
    keyExtractor={({ id }, index) => (id * index).toString()}
    ListFooterComponent={() => (
      <OrderContainer>
        <SubmitButton
          onPress={() =>
            rootNavigation.navigate("Address", {
              address: null,
              userId: user.id,
              update: false
            })
          }
          textChildren="Add New Address"
        />
      </OrderContainer>
    )}
    renderItem={({
      item: { id, alias, address1, address2, city, phone, phone_mobile },
      index
    }) => (
      <OrderContainer>
        <Button
          onPress={() =>
            rootNavigation.navigate("Address", {
              address: addresses[index],
              userId: user.id,
              update: true
            })
          }
        >
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
        </Button>
      </OrderContainer>
    )}
    ListEmptyComponent={() => (
      <StateComponent error={error} loading={loading} />
    )}
  />
);
