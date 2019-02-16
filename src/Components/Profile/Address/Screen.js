import React, { Fragment } from "react";
import { View } from "react-native";
import { withFormik } from "formik";
import { TextInput, HelperText, Button } from "react-native-paper";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FormStyle } from "../../styled/general";
import { SubmitButton } from "../../styled/components";
import { Color } from "../../../constants";
import Picker from "../../styled/Picker";

const defaultCountryIndex = 224;
const defaultStateIndex = 3;

const AddressForm = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched
}) => (
  <KeyboardAwareScrollView style={FormStyle} keyboardShouldPersistTaps="always">
    <TextInput
      name="alias"
      label="Name"
      placeholder="Input Name..."
      onChangeText={value => setFieldValue("alias", value)}
      value={values.alias}
      error={touched.alias && errors.alias}
      underlineColor={Color.secondary}
    />
    {errors.alias && (
      <HelperText type="error" visible={errors.alias}>
        {errors.alias}
      </HelperText>
    )}

    <TextInput
      name="firstName"
      label="Firstname"
      placeholder="Input Firstname..."
      onChangeText={value => setFieldValue("firstName", value)}
      value={values.firstName}
      error={touched.firstName && errors.firstName}
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
      error={touched.lastName && errors.lastName}
      underlineColor={Color.secondary}
    />
    {errors.lastName && (
      <HelperText type="error" visible={errors.lastName}>
        {errors.lastName}
      </HelperText>
    )}

    <TextInput
      name="address1"
      label="Address Line 1"
      placeholder="Input Line 1..."
      onChangeText={value => setFieldValue("address1", value)}
      value={values.address1}
      error={touched.address1 && errors.address1}
      underlineColor={Color.secondary}
    />
    {errors.address1 && (
      <HelperText type="error" visible={errors.address1}>
        {errors.address1}
      </HelperText>
    )}

    <TextInput
      name="address2"
      label="Address Line 2"
      placeholder="Input Line 2..."
      onChangeText={value => setFieldValue("address2", value)}
      value={values.address2}
      error={touched.address2 && errors.address2}
      underlineColor={Color.secondary}
    />
    {errors.address2 && (
      <HelperText type="error" visible={errors.address2}>
        {errors.address2}
      </HelperText>
    )}

    <TextInput
      name="city"
      label="City"
      placeholder="Input City..."
      onChangeText={value => setFieldValue("city", value)}
      value={values.city}
      error={touched.city && errors.city}
      underlineColor={Color.secondary}
    />
    {errors.city && (
      <HelperText type="error" visible={errors.city}>
        {errors.city}
      </HelperText>
    )}

    <TextInput
      name="postcode"
      label="Postcode"
      placeholder="Input Postcode..."
      onChangeText={value => setFieldValue("postcode", value)}
      value={values.postcode}
      error={touched.postcode && errors.postcode}
      underlineColor={Color.secondary}
    />
    {errors.postcode && (
      <HelperText type="error" visible={errors.postcode}>
        {errors.postcode}
      </HelperText>
    )}
    <Picker
      onSubmit={index => setFieldValue("countryIndex", index)}
      options={values.countries}
      activeIndex={values.countryIndex}
      pickerIndex={0}
      style={{ flex: 0.4 }}
      textStyle={{ fontSize: 16 }}
    />
    {errors.countryIndex && (
      <HelperText type="error" visible={errors.countryIndex}>
        {errors.countryIndex}
      </HelperText>
    )}

    {renderStates(values, touched, errors, setFieldValue)}

    <TextInput
      name="phone"
      label="Phone Number"
      placeholder="Input Phone Number..."
      onChangeText={value => setFieldValue("phone", value)}
      value={values.phone}
      error={touched.phone && errors.phone}
      underlineColor={Color.secondary}
    />
    {errors.phone && (
      <HelperText type="error" visible={errors.phone}>
        {errors.phone}
      </HelperText>
    )}

    <SubmitButton
      onPress={handleSubmit}
      textChildren="Save"
      style={{
        marginVertical: 15
      }}
    />
  </KeyboardAwareScrollView>
);

const mapPropsToValues = ({
  navigation: {
    state: {
      params: { address, update, userId, from }
    },
    goBack,
    navigate
  },
  states,
  countries,
  createAddress
}) => {
  const returnValues = {
    userId,
    countries: sortByName(countries),
    states: sortByName(states),
    createAddress,
    update,
    goBack,
    navigate,
    from
  };
  return update
    ? {
        ...returnValues,
        id: address.id,
        address1: address.address1,
        address2: address.address2,
        alias: address.alias,
        city: address.city,
        firstName: address.firstname,
        lastName: address.lastname,
        countryIndex:
          findIndex(countries, address.id_country) || defaultCountryIndex,
        stateIndex: findIndex(states, address.id_state) || defaultStateIndex,
        phone: address.phone_mobile || address.phone,
        postcode: address.postcode
      }
    : {
        ...returnValues,
        address1: "",
        address2: "",
        alias: "",
        city: "",
        firstName: "",
        lastName: "",
        countryIndex: defaultCountryIndex,
        stateIndex: defaultStateIndex,
        phone: "",
        postcode: ""
      };
};

export default withFormik({
  mapPropsToValues,
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    address1: Yup.string().required("Required"),
    address2: Yup.string(),
    alias: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    countryIndex: Yup.number().required("Required"),
    stateIndex: Yup.number().required("Required"),
    firstName: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .required("Required"),
    lastName: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .required("Required"),
    phone: Yup.string()
      .min(8, "Must be longer than 8 characters")
      .max(15, "Must be shorter than 15 characters")
      .required("Required"),
    postcode: Yup.string().required("Required")
  }),

  handleSubmit: (values, { props }) => {
    values.createAddress(values);
    if (values.from == "Basket") values.navigate("BasketList");
    else values.goBack(null);
  }
})(AddressForm);

const renderStates = (
  { countries, states, countryIndex, stateIndex },
  touched,
  errors,
  setFieldValue
) => {
  if (!checkContainsStates(countries, countryIndex)) return null;
  const countryId = countries[countryIndex].id;
  const newStates = getStates(states, countryId);
  return (
    <Fragment>
      <Picker
        onSubmit={id => {
          const index =
            states.findIndex(state => parseInt(id) === parseInt(state.id)) ||
            defaultStateIndex;
          setFieldValue("stateIndex", index);
        }}
        options={newStates}
        activeIndex={states[stateIndex].id}
        pickerIndex={0}
        useId
        style={{ flex: 0.4 }}
        textStyle={{ fontSize: 16 }}
      />
      {errors.stateIndex && (
        <HelperText type="error" visible={errors.stateIndex}>
          {errors.stateIndex}
        </HelperText>
      )}
    </Fragment>
  );
};
const checkContainsStates = (countries, countryIndex) =>
  parseInt(countries[countryIndex].contains_states) === 1;

const findIndex = (array, id) =>
  array.findIndex(item => parseInt(item.id) === parseInt(id));

const getStates = (states, countryId) =>
  states.filter(
    ({ id_country }) => parseInt(id_country) === parseInt(countryId)
  );

const getStateIndex = (states, stateIndex) => {
  if (states[stateIndex]) {
    return stateIndex;
  }
  return states.findIndex(item => item);
};

const sortByName = array =>
  array.sort(({ name }, b) => name.localeCompare(b.name));
