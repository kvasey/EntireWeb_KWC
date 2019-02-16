import { hex_md5 } from "react-native-md5";
import { checkResult, setInStore } from "../util";
import { LOGIN_URL, REGISTER_URL, CKEY, USER_EXISTS } from "../../constants";

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

const setDone = data => ({
  type: userState.DONE,
  data
});

export const clearData = () => ({
  type: userState.CLEAR
});

export const openFetcher = async (fetchData, type, dispatch, expect) => {
  dispatch(setInStore(null, type.ERROR));
  dispatch(setInStore(true, type.LOADING));
  try {
    const result = await fetchData();
    if (checkResult(result, dispatch, error => setInStore(error, type.ERROR))) {
      if (!result[expect]) {
        dispatch(setInStore(false, type.LOADING));
        dispatch(
          setInStore("Wrong Email or Password, Please Try Again.", type.ERROR)
        );
      } else {
        dispatch(setDone(result[expect]));
        dispatch(setInStore(false, type.LOADING));
      }
    }
  } catch (error) {
    dispatch(setInStore(false, type.LOADING));
    dispatch(setInStore(error, type.ERROR));
  }
};

export const openRegFetcher = async (fetchData, type, dispatch, expect) => {
  dispatch(setInStore(null, type.ERROR));
  dispatch(setInStore(true, type.LOADING));
  try {
    const result = await fetchData();
    if (checkResult(result, dispatch, error => setInStore(error, type.ERROR))) {
      if (!result[expect]) {
        dispatch(setInStore(false, type.LOADING));
        dispatch(
          setInStore("Wrong Email or Password, Please Try Again.", type.ERROR)
        );
      } else {
        dispatch(setDone(result[expect]));
        dispatch(setInStore(false, type.LOADING));
      }
    }
  } catch (error) {
    dispatch(setInStore(false, type.LOADING));
    dispatch(setInStore(error, type.ERROR));
  }
};

export const loginUser = ({ email, password }) => dispatch =>
  openFetcher(
    async () => {
      const result = await fetch(
        `${LOGIN_URL}&filter[email]=${email}&filter[passwd]=${hex_md5(
          CKEY + password
        )}`
      );
      return result.json();
    },
    loginState,
    dispatch,
    "customers"
  );

export const registerUser = data => async dispatch => {
  dispatch(setInStore(null, registrationState.ERROR));
  dispatch(setInStore(true, registrationState.LOADING));
  try {
    const url = `${USER_EXISTS}${data.email}`;
    console.log(url);
    let result = await fetch(url);
    const existResult = await result.json();
    console.log("existResult", existResult);
    if (
      checkResult(existResult, dispatch, error =>
        setInStore(error, registrationState.ERROR)
      )
    ) {
      if (existResult.length == 0) {
        result = await fetch(REGISTER_URL, {
          method: "POST",
          body: jsonToXML(data)
        });
        const regresult = await result.json();
        console.log(regresult);
        if (
          checkResult(regresult, dispatch, error =>
            setInStore(error, registrationState.ERROR)
          )
        ) {
          if (!regresult["customer"]) {
            dispatch(setInStore(false, registrationState.LOADING));
            dispatch(
              setInStore(
                "Wrong Email or Password, Please Try Again.",
                registrationState.ERROR
              )
            );
          } else {
            dispatch(setDone(regresult["customer"]));
            dispatch(setInStore(false, registrationState.LOADING));
          }
        }
      } else {
        dispatch(
          setInStore("Entered email already exists", registrationState.ERROR)
        );
      }
    }
  } catch (error) {
    dispatch(setInStore(error, registrationState.ERROR));
  }
  dispatch(setInStore(false, registrationState.LOADING));
};
// openFetcher(
//   async () => {
//     const result = await fetch(REGISTER_URL, {
//       method: "POST",
//       body: jsonToXML(data)
//     });
//     return result.json();
//   },
//   registrationState,
//   dispatch,
//   "customer"
// );

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
