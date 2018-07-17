import React, { Component } from "react";
import { Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import { clearData } from "../Auth/action";
import { StateComponent, Container, SubmitButton } from "../styled/general";

const Profile = ({ loading, error, user, logout, navigation }) =>
  loading || error ? (
    <StateComponent loading={loading} error={error} />
  ) : (
    <Container style={{ width: "100%", height: "100%" }}>
      <ScrollView>
        <SubmitButton
          onPress={() => {
            logout();
            navigation.goBack(null);
          }}
          textChildren="Logout"
        />
        <Text>{JSON.stringify(user, null, 2)}</Text>
      </ScrollView>
    </Container>
  );

const mapStateToProps = ({ user, login, registration }) => ({
  user,
  loading: login.loading || registration.loading,
  error: login.error || registration.error
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(clearData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
