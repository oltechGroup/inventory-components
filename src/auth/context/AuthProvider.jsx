import { React, createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  instance,
  removeTokenHeaderAPI,
  setTokenHeaderAPI,
} from "../../api/instance";
import { routes } from "../../utils/routes";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async ({ email, password }, loading) => {
    loading(true);
    try {
      const response = await instance.post("/auth/login", {
        email,
        password,
      });

      const { access_token, user } = response.data;

      setUser(user);

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      setTokenHeaderAPI(access_token);

      return navigate(routes.home);
    } catch (error) {
      loading(false);
      alert(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    removeTokenHeaderAPI();
    setUser(null);
    navigate(routes.auth.home);
  };

  const signup = async ({ email, password, name, lastname }, setErrors) => {
    try {
      const response = await instance.post("/auth/signup", {
        email,
        password,
        name,
        lastname,
      });
      const user = response.data.data.user;

      setUser(user);

      localStorage.setItem("token", response.data.data.token);
      instance.defaults.headers.common["Authorization"] =
        response.data.data.token;

      navigate(routes.home);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const isLogin = () => !!user;

  const updateUserLocalStorage = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const getDataFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setUser(JSON.parse(user));
      setTokenHeaderAPI(token);
    }
    setLoading(false);
  };

  const updateUserData = (data) => {
    setUser(data);
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(data));
  }

  useEffect(() => getDataFromLocalStorage(), []);

  const contextValue = {
    user,
    login,
    logout,
    signup,
    isLogin,
    loading,
    updateUserLocalStorage,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
