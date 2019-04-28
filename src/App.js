import React, { Component } from "react";
import {
  Linking,
  Modal,
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from "react-navigation";
import codePush from "react-native-code-push";
import { Provider as PaperProvider } from "react-native-paper";
import Navigator from "./Navigators/Root";
import { StateComponent } from "./Components/styled/components";
import initStore from "./Store";
import InitalFetch from "./Components/Initial";
import VersionCheck from "react-native-version-check";
import OneSignal from "react-native-onesignal";
const { store, persistor } = initStore();

export default codePush()(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        updatemodal: false
      };
      OneSignal.init("c1a5566d-2730-4dbe-94cf-35741fd9464e");
      alert("Initiated");
      OneSignal.addEventListener("received", this.onReceived);
      OneSignal.addEventListener("opened", this.onOpened);
      OneSignal.addEventListener("ids", this.onIds);
    }
    componentWillUnmount() {
      OneSignal.removeEventListener("received", this.onReceived);
      OneSignal.removeEventListener("opened", this.onOpened);
      OneSignal.removeEventListener("ids", this.onIds);
    }

    onReceived(notification) {
      console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
      console.log("Message: ", openResult.notification.payload.body);
      console.log("Data: ", openResult.notification.payload.additionalData);
      console.log("isActive: ", openResult.notification.isAppInFocus);
      console.log("openResult: ", openResult);
    }

    onIds(device) {
      console.log("Device info: ", device);
    }
    onUpdate = async () => {
      Platform.OS == "ios"
        ? Linking.openURL(
            await VersionCheck.getAppStoreUrl({
              appID: "1374865411",
              appName: "kwc"
            })
          )
        : Linking.openURL(
            await VersionCheck.getPlayStoreUrl({
              packageName: "com.rnkidswholesale"
            })
          );
      //"https://itunes.apple.com/us/app/kwc/id1374865411");
    };
    componentDidMount = async () => {
      VersionCheck.needUpdate().then(async res => {
        console.log(res.isNeeded); // true
        if (res.isNeeded) {
          this.setState({ updatemodal: true });
        }
      });
    };

    render = () => (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={<StateComponent loading={true} error={true} />}
        >
          <InitalFetch />
          <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: "never" }}>
            <PaperProvider>
              <Modal
                transparent={true}
                animationType={"none"}
                visible={this.state.updatemodal}
              >
                <View style={styles.modalBackground}>
                  <View style={styles.activityIndicatorWrapper}>
                    <View style={styles.modalHeaderView}>
                      <Text style={styles.modalHeaderText}>
                        New Version Available
                      </Text>
                    </View>
                    <View style={styles.modalMessageView}>
                      <Text>
                        There is a newer version available for download! Please
                        update the app by the{" "}
                        {Platform.OS == "ios" ? "App Store" : "Play Store"}
                      </Text>
                    </View>
                    <View style={styles.modalFooterView}>
                      <TouchableOpacity onPress={this.onUpdate}>
                        <Text style={styles.modalFooterText}>Update</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <View>
                <Button
                  style={styles.button}
                  onPress={() => {
                    OneSignal.getPermissionSubscriptionState(
                      subscriptionState => {
                        alert(JSON.stringify(subscriptionState, null, 2));
                      }
                    );
                  }}
                  title="Print Subscription State"
                  color={this.state.buttonColor}
                />
              </View>
              <Navigator />
            </PaperProvider>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
);
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040"
  },
  modalHeaderView: {
    width: "90%",
    alignItems: "center",
    // borderBottomWidth: 0.5,
    paddingTop: 10,
    paddingBottom: -5
    // borderBottomColor: "grey"
  },
  modalMessageView: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 7
  },
  modalHeaderText: {
    fontWeight: "bold",
    fontSize: 15
  },
  modalFooterText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#3590fd"
  },
  modalFooterView: {
    width: "90%",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "grey",
    paddingBottom: 7,
    paddingTop: 7
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 150,
    width: 270,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
