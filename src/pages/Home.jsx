import { Route, Routes } from "react-router-dom";
import ContainerSidebar from "../components/ContainerSidebar";
import { routes } from "../utils/routes";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Hospitals from "./Hospitals";
import IndexStore from "../arthrex/components/store/IndexStore";
import IndexRemissions from "../arthrex/components/remissions/IndexRemissions";
import IndexConsumption from "../arthrex/components/Consumption/IndexConsumption";
import InventoryArthrex from "../arthrex/components/Inventory";

function Home() {
  return (
    <ContainerSidebar>
      <Routes>
        <Route path={routes.home} element={<Dashboard />} />
        <Route path={routes.arthrex.store} element={<IndexStore />} />
        <Route path={routes.arthrex.consumos} element={<IndexConsumption />} />
        <Route path={routes.arthrex.movements} element={<InventoryArthrex />} />
        <Route path={routes.arthrex.remissions.list} element={<IndexRemissions />} />
        {/* <Route path={routes.consumo} element={<Used />} />
        <Route path={routes.inventary} element={<Inventary />} />
        <Route path={routes.store + "/*"} element={<Store />} />
        <Route path={routes.create} element={<Create />} />
        <Route path={routes.remision()} element={<OneRemision />} />
        <Route path={routes.addRemision} element={<AddRemision />} />
        <Route path={routes.remisiones} element={<Remisiones />} /> */}
        <Route path={routes.hospitals} element={<Hospitals />} />
        <Route path={routes.Users} element={<Users />} />
        {/* <Route path={routes.userProfile} element={<UserProfile/>} /> */}
      </Routes>
    </ContainerSidebar>
  );
}

export default Home;
