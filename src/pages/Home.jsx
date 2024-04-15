import { Route, Routes } from "react-router-dom";
import ContainerSidebar from "../components/ContainerSidebar";
import { routes } from "../utils/routes";
import Used from "./Used";
import Inventary from "./Inventary";
import Store from "./Store";
import Create from "./Create";
import Hospitals from "./Hospitals";
import Dashboard from "./Dashboard";
import Remisiones from "./Remisiones";
import OneRemision from "./OneRemision";
import AddRemision from "./AddRemision";

function Home() {
  return (
    <ContainerSidebar>
      <Routes>
        <Route path={routes.home} element={<Dashboard />} />
        <Route path={routes.consumo} element={<Used />} />
        <Route path={routes.inventary} element={<Inventary />} />
        <Route path={routes.store} element={<Store />} />
        <Route path={routes.create} element={<Create />} />
        <Route path={routes.hospitals} element={<Hospitals />} />
        <Route path={routes.remision()} element={<OneRemision />} />
        <Route path={routes.addRemision} element={<AddRemision />} />
        <Route path={routes.remisiones} element={<Remisiones />} />
      </Routes>
    </ContainerSidebar>
  );
}

export default Home;
