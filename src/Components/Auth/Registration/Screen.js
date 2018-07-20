import React, { Fragment } from "react";
import { withFormik } from "formik";
import {
  TextInput,
  HelperText,
  Button,
  Switch,
  Title
} from "react-native-paper";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, ButtonInnerText, FormStyle } from "../../styled/general";
import { SubmitButton } from "../../styled/components";
import { Color } from "../../../constants";

const LoginForm = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  navigation
}) => (
  <KeyboardAwareScrollView style={FormStyle} keyboardShouldPersistTaps="always">
    <TextInput
      name="email"
      label="Email"
      placeholder="Input Email..."
      onChangeText={value => setFieldValue("email", value)}
      value={values.email}
      error={errors.email}
      underlineColor={Color.secondary}
    />
    {errors.email && (
      <HelperText type="error" visible={errors.email}>
        {errors.email}
      </HelperText>
    )}
    <TextInput
      name="firstName"
      label="Firstname"
      placeholder="Input Firstname..."
      onChangeText={value => setFieldValue("firstName", value)}
      value={values.firstName}
      error={errors.firstName}
      underlineColor={Color.secondary}
    />
    {errors.firstName && (
      <HelperText type="error" visible={errors.firstName}>
        {errors.firstName}
      </HelperText>
    )}
    <TextInput
      name="lastName"
      label="Lastname"
      placeholder="Input Lastname..."
      onChangeText={value => setFieldValue("lastName", value)}
      value={values.lastName}
      error={errors.lastName}
      underlineColor={Color.secondary}
    />
    {errors.lastName && (
      <HelperText type="error" visible={errors.lastName}>
        {errors.lastName}
      </HelperText>
    )}
    <TextInput
      name="password"
      label="Password"
      placeholder="Input Password..."
      onChangeText={value => setFieldValue("password", value)}
      value={values.password}
      error={errors.password}
      underlineColor={Color.secondary}
      secureTextEntry
    />
    {errors.password && (
      <HelperText type="error" visible={errors.password}>
        {errors.password}
      </HelperText>
    )}
    <Container
      flexDirection="row"
      justifyContent="space-between"
      style={{ marginVertical: 15 }}
    >
      <ButtonInnerText style={{ color: Color.main }}>
        Subscribe to Newsletter:
      </ButtonInnerText>
      <Switch
        color={Color.secondary}
        value={values.newsletter}
        onValueChange={() => setFieldValue("newsletter", !values.newsletter)}
      />
    </Container>
    <SubmitButton
      onPress={handleSubmit}
      textChildren="Sign up"
      style={{
        marginVertical: 15
      }}
    />
    <SubmitButton
      onPress={() => navigation.goBack(null)}
      textChildren="Have an Account? Sign in!"
      style={{
        marginVertical: 15
      }}
    />
  </KeyboardAwareScrollView>
);

export default withFormik({
  mapPropsToValues: ({ registerUser }) => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "1997-10-21",
    newsletter: true,
    registerUser
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .required("Required"),
    lastName: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .required("Required"),
    email: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .email("Invalid")
      .required("Required"),
    password: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .required("Required")
  }),

  handleSubmit: (values, { setSubmitting }) => values.registerUser(values)
})(LoginForm);
