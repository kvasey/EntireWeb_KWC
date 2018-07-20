import React, { Component } from "react";
import { connect } from "react-redux";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { Button } from "react-native-paper";
import { clearData } from "../Auth/action";
import { clearAddresses } from "./action";
import { StateComponent } from "../styled/components";
import { Container, height } from "../styled/general";
import ProfileTabs from "../../Navigators/ProfileTabs";
import { Color } from "../../constants";
import {
  RenderContainer,
  BackgroundImage,
  BackgroundOverlay,
  headerHeightProportion,
  ButtonText,
  InitialsView,
  InitialsText
} from "./styled";

const Profile = ({
  loading,
  error,
  user,
  logout,
  clearAddresses,
  navigation
}) =>
  loading || error || !user ? (
    <StateComponent loading={loading || !user} error={error} />
  ) : (
    <Container>
      <ParallaxScrollView
        style={{ flex: 1, overflow: "hidden" }}
        backgroundSpeed={1}
        outputScaleValue={3}
        renderBackground={() => (
          <RenderContainer>
            <BackgroundImage source={require("../../../assets/profile.jpg")} />
            <BackgroundOverlay />
          </RenderContainer>
        )}
        renderForeground={() => (
          <RenderContainer>
            <Button
              style={{
                position: "absolute",
                right: 5,
                top: 5,
                width: "15%",
                borderWidth: 1,
                borderColor: "#EEE",
                borderRadius: 5
              }}
              onPress={() => {
                navigation.goBack(null);
                clearAddresses();
                logout();
              }}
            >
              <ButtonText>Log Out</ButtonText>
            </Button>
            <InitialsView>
              <InitialsText>
                {user.firstName.toUpperCase()[0] +
                  user.lastName.toUpperCase()[0]}
              </InitialsText>
            </InitialsView>
            <ButtonText style={{ marginTop: 10, color: "#FFF", fontSize: 16 }}>
              {`${user.firstName} ${user.lastName}`}
            </ButtonText>
          </RenderContainer>
        )}
        parallaxHeaderHeight={height / headerHeightProportion}
      >
        <ProfileTabs screenProps={{ rootNavigation: navigation }} />
      </ParallaxScrollView>
    </Container>
  );

const mapStateToProps = ({ user, login, registration }) => ({
  user,
  loading: login.loading || registration.loading,
  error: login.error || registration.error
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(clearData()),
  clearAddresses: () => dispatch(clearAddresses())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
