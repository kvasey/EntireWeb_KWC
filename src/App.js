import { Image, Text } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaView } from 'react-navigation';
import Navigator from './Navigators/Root';
import { StateComponent } from './Components/styled/general';
import initStore from './Store';
import InitalFetch from './Components/Initial';

const { store, persistor } = initStore();

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<StateComponent loading error={false} />}>
      <InitalFetch />
      {/* <PushNotifications /> */}
      <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
        <Navigator />
      </SafeAreaView>
    </PersistGate>
  </Provider>
);
