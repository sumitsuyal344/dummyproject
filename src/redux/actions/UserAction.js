import { LOGIN_REQUEST } from "../constants/UserConstants";

export const loginUser = (obj,navigate) => {
  const { email, password,  } = obj;
  console.log("emailA", email);
  console.log("passA", password);
  return {
    type: LOGIN_REQUEST,
    email,
    password,
    navigate,
  };
};
