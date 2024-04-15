import {
  Archive,
  Database,
  FilePlus,
  FirstAid,
  FolderLock,
  List,
  MagnifyingGlass,
  SignIn,
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
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";

export const SidebarComponent = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estas seguro que quieres salir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, salir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <Sidebar className="fixed left-0 top-0 h-screen w-72">
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
            Inicio
          </Sidebar.Item>
        </NavLink>

        <NavLink to={routes.consumo}>
          <Sidebar.Item>
            <FilePlus size={24} />
            Consumo
          </Sidebar.Item>
        </NavLink>

        <NavLink to={routes.remisiones}>
          <Sidebar.Item>
            <FolderLock size={24} />
            Remisiones
          </Sidebar.Item>
        </NavLink>

        <NavLink to={routes.store}>
          <Sidebar.Item>
            <Database size={24} />
            Almacen
          </Sidebar.Item>
        </NavLink>

        <NavLink to={routes.inventary}>
          <Sidebar.Item>
            <Archive size={24} />
            Inventario
          </Sidebar.Item>
        </NavLink>

        <NavLink to={routes.hospitals}>
          <Sidebar.Item>
            <FirstAid size={24} />
            Hospitales
          </Sidebar.Item>
        </NavLink>

        <Sidebar.Item onClick={handleLogout} className="cursor-pointer">
          <SignIn size={24} />
          Cerrar Sesión
        </Sidebar.Item>
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
            {user?.name} {user?.lastname}
          </Typography>
          <Typography
            variant="p"
            className="text-body-4 font-normal text-metal-400"
          >
            {user?.role}
          </Typography>
        </div>
      </Sidebar.Footer>
    </Sidebar>
  );
};
