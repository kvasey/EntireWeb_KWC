import { Image, Text } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from "react-navigation";
import codePush from "react-native-code-push";
import { Provider as PaperProvider } from "react-native-paper";
import Navigator from "./Navigators/Root";
import { StateComponent } from "./Components/styled/components";
import initStore from "./Store";
import InitalFetch from "./Components/Initial";

const { store, persistor } = initStore();

export default codePush(() => (
  <Provider store={store}>
    <PersistGate
      persistor={persistor}
      loading={<StateComponent loading error={false} />}
    >
      <InitalFetch />
      <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: "never" }}>
        <PaperProvider>
          <Navigator />
        </PaperProvider>
      </SafeAreaView>
    </PersistGate>
  </Provider>
));
