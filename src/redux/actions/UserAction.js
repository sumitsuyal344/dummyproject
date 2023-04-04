import { LOGIN_REQUEST, REGISTER_REQUEST } from "../constants/UserConstants";

export const loginUser = (obj, navigate) => {
  const { email, password } = obj;
  console.log("emailA", email);
  console.log("passA", password);
  return {
    type: LOGIN_REQUEST,
    email,
    password,
    navigate,
  };
};

export const registerUser = (obj, navigate) => {
  const { username, email, password } = obj;
  return {
    type: REGISTER_REQUEST,
    username,
    email,
    password,
    navigate,
  };
};
// export const logOutUser = (email, navigate) => {
//   // const { username, email, password } = obj;
//   return {
//     type: LOGIN_REQUEST,
//     // username,
//      email,
//     // password,
//     navigate,
//   };
// };

