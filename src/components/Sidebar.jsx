import {
  ArchiveTray,
  List,
  MagnifyingGlass,
  ShoppingCart,
  SquaresFour,
} from "phosphor-react";
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Input,
  Sidebar,
  Typography,
} from "keep-react";
import { NavLink } from "react-router-dom";
import { routes } from "../utils/routes";

export const SidebarComponent = () => {
  return (
    <Sidebar className="fixed left-0 top-0 h-screen">
      <Sidebar.Header className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Typography
            variant="heading-5"
            className="font-bold text-primary-500"
          >
            Oltech
          </Typography>
          <Button
            variant="outline"
            shape="icon"
            color="primary"
            className="border-none"
          >
            <List size={24} />
          </Button>
        </div>
        <div>
          <fieldset className="relative max-w-md">
            <Input placeholder="Search here" className="ps-11" />
            <Icon>
              <MagnifyingGlass size={18} color="#AFBACA" />
            </Icon>
          </fieldset>
        </div>
      </Sidebar.Header>
      <Sidebar.Body>
        <NavLink to={routes.home}>
          <Sidebar.Item>
            <SquaresFour size={24} />
            Consumo
          </Sidebar.Item>
        </NavLink>

        <NavLink to={routes.store}>
          <Sidebar.Item>
            <SquaresFour size={24} />
            Almacen
          </Sidebar.Item>
        </NavLink>

        <NavLink to={routes.inventary}>
          <Sidebar.Item>
            <SquaresFour size={24} />
            Inventario
          </Sidebar.Item>
        </NavLink>

        <NavLink to={routes.hospitals}>
          <Sidebar.Item>
            <SquaresFour size={24} />
            Hospitales
          </Sidebar.Item>
        </NavLink>

        {/*<NavLink to={routes.create}>
          <Sidebar.Item>
            <ArchiveTray size={24} />
            Añadir
          </Sidebar.Item>
        </NavLink>

         <NavLink>
          <Sidebar.Item>
            <Gear size={24} />
            Settings
          </Sidebar.Item>
        </NavLink>

        <Sidebar.Item>
          <Users size={24} />
          Users
        </Sidebar.Item>
        <Sidebar.Item>
          <SignIn size={24} />
          Log Out
        </Sidebar.Item> */}
      </Sidebar.Body>
      <Divider className="my-3" />
      <Sidebar.Footer className="flex items-center gap-2">
        <div>
          <Avatar shape="circle" />
        </div>
        <div>
          <Typography
            variant="p"
            className="mb-0 text-body-3 font-medium text-metal-600"
          >
            Oltech
          </Typography>
          <Typography
            variant="p"
            className="text-body-4 font-normal text-metal-400"
          >
            Admin
          </Typography>
        </div>
      </Sidebar.Footer>
    </Sidebar>
  );
};
