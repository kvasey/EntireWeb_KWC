import React, { Fragment } from 'react';
import { FlatList, ActivityIndicator, Platform } from 'react-native';
import Image from 'react-native-image-progress';
import { Price, Name, ItemWrapper } from './styled';
import { Button, StateComponent } from '../styled/general';
import { Color } from '../../constants';

const renderImage = imageUri => (
  <Image
    source={{ uri: imageUri }}
    indicator={ActivityIndicator}
    resizeMode="contain"
    indicatorProps={{
      size: 20,
      borderWidth: 0,
      color: Color.secondary,
      unfilledColor: 'rgba(200, 200, 200, 0.2)',
    }}
    style={{
      width: '100%',
      height: 100,
    }}
  />
);

const renderPrice = price => (price ? (
  <Price>
    {`From £${price.toFixed(2)}`}
  </Price>
) : (
  <ActivityIndicator size="small" color={Color.secondary} />
));

const renderItem = ({
  item: {
    id, name, imageUri, price,
  }, index,
}, navigate, dataLength) => (
  <Button
    onPress={() => navigate('ProductDescription', { productId: id })}
    useForeground
    style={{ flex: 1 }}
  >
    <ItemWrapper isLast={index === dataLength - 1}>
      {renderImage(imageUri)}
      {renderPrice(price)}
      <Name>
        {name}
      </Name>
    </ItemWrapper>
  </Button>
);

export default ({
  data, error, loading, navigation,
}) => (
  <FlatList
    data={data}
    extraData={data}
    numColumns={Platform.isPad ? 3 : 2}
    style={{ backgroundColor: '#FFF' }}
    keyExtractor={({ id }, index) => (id * index).toString()}
    renderItem={item => renderItem(item, navigation.push, data.length)}
    ListEmptyComponent={() => <StateComponent error={error} loading={loading} />}
  />
);
