import { hex_md5 } from "react-native-md5";
import {
  formatIds,
  formatProductIds,
  checkResult,
  getJsonResult
} from "../util";
import { LOGIN_URL, REGISTER_URL, CKEY } from "../../constants";

export const registrationState = {
  LOADING: "REGISTRATION_LOADING",
  ERROR: "REGISTRATION_ERROR"
};
export const loginState = {
  LOADING: "LOGIN_LOADING",
  ERROR: "LOGIN_ERROR"
};
export const userState = {
  DONE: "USER_LOGGED",
  CLEAR: "USER_LOGGED_OUT"
};

const setState = (state, type) => ({
  type,
  state
});

const setDone = data => ({
  type: userState.DONE,
  data
});

export const clearData = () => ({
  type: userState.CLEAR
});

export const loginUser = ({ email, password }) => dispatch =>
  fetcher(
    async () => {
      const result = await fetch(
        `${LOGIN_URL}&filter[email]=${email}&filter[passwd]=${hex_md5(
          CKEY + password
        )}`
      );
      return result.json();
    },
    loginState,
    dispatch
  );

export const registerUser = data => dispatch =>
  fetcher(
    async () => {
      const result = await fetch(REGISTER_URL, {
        method: "POST",
        body: jsonToXML(data)
      });
      return result.json();
    },
    registrationState,
    dispatch
  );
const fetcher = async (fetchData, type, dispatch) => {
  dispatch(setState(null, type.ERROR));
  dispatch(setState(true, type.LOADING));
  try {
    const result = await fetchData();
    if (checkResult(result, dispatch, error => setState(error, type.ERROR))) {
      const { customers, customer } = result;
      dispatch(setDone(customers || customer, type.ERROR));
      dispatch(setState(false, type.LOADING));
    }
  } catch (error) {
    dispatch(setState(false, type.LOADING));
    dispatch(setState(error, type.ERROR));
  }
};

const jsonToXML = ({
  firstName,
  lastName,
  password,
  email,
  birthday,
  newsletter
}) =>
  `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
    <customer>
      <passwd>${password}</passwd>
      <firstname>${firstName}</firstname>
      <lastname>${lastName}</lastname>
      <email>${email}</email>
      <birthday>${birthday}</birthday>
      <newsletter>${newsletter ? "1" : "0"}</newsletter>
      <active>1</active>
      <associations>
      <groups nodeType="group" api="groups">
        <group xlink:href="https://www.kidswholesaleclothing.co.uk/api/groups/1">
          <id>1</id>
        </group>
      </groups>
    </associations>
    </customer>
  </prestashop>`;
