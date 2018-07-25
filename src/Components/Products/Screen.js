import React, { Fragment } from "react";
import {
  FlatList,
  ActivityIndicator,
  Platform,
  Text,
  View
} from "react-native";
import { Transition } from "react-navigation-fluid-transitions";
import Image from "react-native-image-progress";
import { Price, Name, ItemWrapper, Line } from "./styled";
import { Button } from "../styled/general";
import { StateComponent } from "../styled/components";
import { Color } from "../../constants";

export const renderImage = uri => (
  <Image
    source={{ uri }}
    fadeDuration={300}
    indicator={() => <ActivityIndicator size="small" color={Color.secondary} />}
    resizeMode="contain"
    indicatorProps={{
      size: 20,
      borderWidth: 0,
      color: Color.secondary,
      unfilledColor: "rgba(200, 200, 200, 0.2)"
    }}
    style={{
      width: Platform.isPad ? 220 : 180,
      height: Platform.isPad ? 140 : 100
    }}
  />
);

const renderPrice = price =>
  price ? (
    <Price>
      <Text style={{ color: Color.main }}>From</Text>
      {` £${price.toFixed(2)}`}
    </Price>
  ) : (
    <ActivityIndicator size="small" color={Color.secondary} />
  );

const renderItem = (
  { item: { id, name, imageUri, price }, index },
  dataLength,
  navigate,
  setIsProductList,
  categoryId,
  params
) => (
  <Button
    onPress={() =>
      navigate("ProductDescription", { productId: id, categoryId, imageUri })
    }
    useForeground
    style={{ flex: 1 }}
  >
    <ItemWrapper isLast={index === dataLength - 1}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Transition shared={`${imageUri}`}>{renderImage(imageUri)}</Transition>
      </View>
      <Line />
      {renderPrice(price)}
      <Name numberOfLines={2}>{name}</Name>
    </ItemWrapper>
  </Button>
);

export default ({
  data,
  error,
  loading,
  navigation,
  setIsProductList,
  categoryId
}) => (
  <FlatList
    data={data}
    extraData={data}
    numColumns={Platform.isPad ? 3 : 2}
    style={{ backgroundColor: "#FFF" }}
    keyExtractor={({ id }, index) => (id * index).toString()}
    renderItem={item =>
      renderItem(
        item,
        data.length,
        navigation.push,
        setIsProductList,
        categoryId,
        navigation.state.params
      )
    }
    ListEmptyComponent={() => <StateComponent error={error} loading />}
  />
);
