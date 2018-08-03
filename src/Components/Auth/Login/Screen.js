import React, { Fragment } from "react";
import { View } from "react-native";
import { withFormik } from "formik";
import { TextInput, HelperText, Button } from "react-native-paper";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FormStyle } from "../../styled/general";
import { SubmitButton } from "../../styled/components";
import { Color } from "../../../constants";

const LoginForm = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  navigation,
  loginUser
}) => (
  <KeyboardAwareScrollView style={FormStyle} keyboardShouldPersistTaps="always">
    <TextInput
      name="email"
      label="Email"
      placeholder="Input Email..."
      onChangeText={value => setFieldValue("email", value)}
      value={values.email}
      error={touched.email && errors.email}
      underlineColor={Color.secondary}
    />
    {errors.email && (
      <HelperText type="error" visible={errors.email}>
        {errors.email}
      </HelperText>
    )}
    <TextInput
      name="password"
      label="Password"
      placeholder="Input Password..."
      onChangeText={value => setFieldValue("password", value)}
      value={values.password}
      error={touched.password && errors.password}
      underlineColor={Color.secondary}
      secureTextEntry
    />
    {errors.password && (
      <HelperText type="error" visible={errors.password}>
        {errors.password}
      </HelperText>
    )}
    <SubmitButton
      onPress={handleSubmit}
      textChildren="Sign In"
      style={{
        marginVertical: 15
      }}
    />
    <SubmitButton
      onPress={() => navigation.navigate("Registration")}
      textChildren="New? Sign up!"
      style={{
        marginVertical: 15
      }}
    />
  </KeyboardAwareScrollView>

);

export default withFormik({
  mapPropsToValues: ({ loginUser }) => ({
    email: "",
    password: "",
    loginUser
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .email("Invalid")
      .required("Required"),
    password: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .required("Required")
  }),

  handleSubmit: (values, { setSubmitting }) => values.loginUser(values)
})(LoginForm);
