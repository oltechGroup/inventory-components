import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "../utils/routes";
import Login from "../pages/auth/Login";
import { useAuth } from "../context/AuthProvider";
import Home from "../pages/Home";

function AppRouter() {
  const { user } = useAuth();

  const renderRoutes = () => {
    if (user) {
      return <Route path={`${routes.home}*`} element={<Home />} />;
    }
  };

  return <Routes>{renderRoutes()}</Routes>;
}

export default AppRouter;
