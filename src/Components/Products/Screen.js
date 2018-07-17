import React, { Fragment } from "react";
import { FlatList, ActivityIndicator, Platform, Text } from "react-native";
import { Transition } from "react-navigation-fluid-transitions";
import Image from "react-native-image-progress";
import { Price, Name, ItemWrapper } from "./styled";
import { Button, StateComponent } from "../styled/general";
import { Color } from "../../constants";

const renderImage = imageUri => (
  <Image
    source={{ uri: imageUri }}
    indicator={() => <ActivityIndicator size="small" color={Color.secondary} />}
    resizeMode="contain"
    indicatorProps={{
      size: 20,
      borderWidth: 0,
      color: Color.secondary,
      unfilledColor: "rgba(200, 200, 200, 0.2)"
    }}
    style={{
      width: "100%",
      height: 100
    }}
  />
);

const renderPrice = price =>
  price ? (
    <Price>
{`From £${price.toFixed(2)}`}
</Price>
  ) : (
    <ActivityIndicator size="small" color={Color.secondary} />
  );

const renderItem = (
  { item: { id, name, imageUri, price }, index },
  dataLength,
  navigate,
  setIsProductList
) => (
  <Button
    onPress={() => {
      navigate("ProductDescription", { productId: id });
    }}
    useForeground
    style={{ flex: 1 }}
  >
    <ItemWrapper isLast={index === dataLength - 1}>
      <Transition shared={`${id}`}>{renderImage(imageUri)}</Transition>
      {renderPrice(price)}
      <Name>{name}</Name>
    </ItemWrapper>
  </Button>
);

export default ({ data, error, loading, navigation, setIsProductList }) => (
    <FlatList
      data={data}
      extraData={data}
      numColumns={Platform.isPad ? 3 : 2}
      style={{ backgroundColor: "#FFF" }}
      keyExtractor={({ id }, index) => (id * index).toString()}
      renderItem={item =>
        renderItem(item, data.length, navigation.push, setIsProductList)
      }
      ListEmptyComponent={() => (
        <StateComponent error={error} loading={loading} />
      )}
    />
  );
