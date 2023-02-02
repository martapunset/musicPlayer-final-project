import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { checkUserByEmail } from "../../api/postUsers";
import { AuthReducer } from "./AuthReducer";
import { types } from "./types";

export const AuthProvider = ({ children }) => {
  const initArgs = {
    isLogged: false,
  };
  const init = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return {
      isLogged: !!user,
      user,
    };
  };

  const [authState, dispatch] = useReducer(AuthReducer, {}, init); //init
  const { user } = authState;
  console.log(user);
  /*-------------------login------------*/

  const login = (userLogin) => {
    const userData = {
      //----------->need to mode to backend
      firstName: userLogin.given_name || "default_name",
      lastName: userLogin.family_name || "default_lastname",
      userName: userLogin.nickName || "DEFAULT NICKname",
      email: userLogin.email,
      picture: userLogin.picture,
    };
    console.log(userData, "standard object copy");

    if (userData) {
     

      const callAsync = async () => {
        const userDB = await checkUserByEmail(userData);
       

        localStorage.setItem("user", JSON.stringify(userDB));
        dispatch({
          type: types.login,
          payload: userDB,
        });
      };
      callAsync();
    }
  };

  const logoutReducer = () => {
    localStorage.removeItem("user");

    dispatch({
      type: types.logout, //logout reducer
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login: login,
        logoutReducer: logoutReducer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
