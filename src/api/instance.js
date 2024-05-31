import axios from "axios";

export const instance = axios.create({
  baseURL: "https://oltech-backend.fly.dev"
  // baseURL: "http://localhost:3000",
});

export const setTokenHeaderAPI = (token) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeTokenHeaderAPI = () => {
  delete instance.defaults.headers.common["Authorization"];
};
