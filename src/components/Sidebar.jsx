// import React from "react";
// import {
//   Archive,
//   Database,
//   FilePlus,
//   FirstAid,
//   FolderLock,
//   List,
//   MagnifyingGlass,
//   SignIn,
//   SquaresFour,
//   Users,
// } from "phosphor-react";
// import {
//   Avatar,
//   Button,
//   Divider,
//   Input,
//   Sidebar,
//   Typography,
// } from "keep-react";
// import { NavLink } from "react-router-dom";
// import { routes } from "../utils/routes";
// import { useAuth } from "../context/AuthProvider";
// import Swal from "sweetalert2";

// export const SidebarComponent = () => {
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     Swal.fire({
//       title: "¿Estas seguro que quieres salir?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Si, salir!",
//       cancelButtonText: "Cancelar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//       }
//     });
//   };

//   return (
//     <Sidebar className="fixed left-0 top-0 h-screen w-72">
//       <Sidebar.Header className="space-y-2.5">
//         <div className="flex items-center justify-between">
//           <Typography
//             variant="heading-5"
//             className="font-bold text-primary-500"
//           >
//             Oltech
//           </Typography>
//           <Button
//             variant="outline"
//             shape="icon"
//             color="primary"
//             className="border-none"
//           >
//             <List size={24} />
//           </Button>
//         </div>
//         <div>
//           <fieldset className="relative max-w-md">
//             <Input placeholder="Search here" className="ps-11" />
//               <MagnifyingGlass size={18} color="#AFBACA" />
//           </fieldset>
//         </div>
//       </Sidebar.Header>
//       <Sidebar.Body>
//         <NavLink to={routes.home}>
//           <Sidebar.Item>
//             <SquaresFour size={24} />
//             Inicio
//           </Sidebar.Item>
//         </NavLink>

//         <NavLink to={routes.consumo}>
//           <Sidebar.Item>
//             <FilePlus size={24} />
//             Consumo
//           </Sidebar.Item>
//         </NavLink>

//         <NavLink to={routes.remisiones}>
//           <Sidebar.Item>
//
//           </Sidebar.Item>
//         </NavLink>

//         <NavLink to={routes.store}>
//           <Sidebar.Item>
//             <Database size={24} />
//             Almacen
//           </Sidebar.Item>
//         </NavLink>

//         <NavLink to={routes.inventary}>
//           <Sidebar.Item>
//             <Archive size={24} />
//             Movimientos
//           </Sidebar.Item>
//         </NavLink>

//         <NavLink to={routes.hospitals}>
//           <Sidebar.Item>
//             <FirstAid size={24} />
//             Hospitales
//           </Sidebar.Item>
//         </NavLink>

//         <NavLink to={routes.Users}>
//           <Sidebar.Item>
//             <Users size={24} />
//             Usuarios
//           </Sidebar.Item>
//         </NavLink>

//         <Sidebar.Item onClick={handleLogout} className="cursor-pointer">
//           <SignIn size={24} />
//           Cerrar Sesión
//         </Sidebar.Item>
//       </Sidebar.Body>
//       <Divider className="my-3" />
//       <Sidebar.Footer className="flex items-center gap-2">
//         <div>
//           <Avatar shape="circle" img={user.avatar} />
//         </div>
//         <div className="flex flex-col items-start">
//           <div className="flex items-center justify-between">
//             <NavLink to={routes.userProfile} className="w-full">
//               <Typography
//                 variant="p"
//                 className="mb-0 text-body-3 font-medium text-metal-600"
//               >
//                 {user?.name} {user?.lastname}
//               </Typography>
//             </NavLink>
//           </div>
//           <Typography
//             variant="p"
//             className="text-body-4 font-normal text-metal-400"
//           >
//             {user?.role}
//           </Typography>
//         </div>
//       </Sidebar.Footer>
//     </Sidebar>
//   );
// };

import {
  Archive,
  Barcode,
  CaretDown,
  ChartPie,
  CheckSquare,
  Checks,
  Cube,
  Database,
  FilePlus,
  FirstAid,
  FolderLock,
  HourglassLow,
  HouseLine,
  MagnifyingGlass,
  PencilLine,
  PresentationChart,
  SignIn,
  UserCircle,
  Users,
} from "phosphor-react";

import {
  Avatar,
  Input,
  InputIcon,
  Sidebar,
  SidebarBody,
  SidebarCollapse,
  SidebarDropdown,
  SidebarDropdownList,
  SidebarFooter,
  SidebarItem,
  SidebarList,
} from "keep-react";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../utils/routes";

export const SidebarComponent = () => {
  return (
    <Sidebar className="h-screen fixed left-0">
      <SidebarBody>
        <Link href="/" className="inline-flex items-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.3253 49.9999L25.3715 43.3114H23.6914V39.7975H27.3749L29.0815 42.6807L36.2312 28.4714L41.335 39.7975H49.6242V43.3114H39.0666L36.0563 36.6334L29.3253 49.9999Z"
              fill="#FF647D"
            />
            <path
              d="M21.079 22.3394V0.524696H17.5651V2.68709C16.2924 1.5474 14.7616 0.734284 13.1047 0.317832C11.4478 -0.0986214 9.71452 -0.105924 8.05418 0.296553C6.39383 0.69903 4.85625 1.49921 3.57396 2.62814C2.29168 3.75707 1.30314 5.18088 0.693548 6.77685C0.0839577 8.37283 -0.1284 10.0931 0.0747781 11.7894C0.277956 13.4857 0.890574 15.1072 1.85983 16.514C2.82909 17.9209 4.12592 19.071 5.63855 19.8651C7.15118 20.6593 8.83424 21.0737 10.5427 21.0727C13.1359 21.0747 15.6379 20.1155 17.5651 18.3803V22.3394H10.548C7.75581 22.338 5.07715 23.4444 3.09982 25.4157C1.12249 27.3871 0.00803202 30.0624 0.00101339 32.8546V39.2145C0.00101339 42.0076 1.11053 44.6862 3.08549 46.6611C5.06044 48.6361 7.73906 49.7456 10.5321 49.7456C13.3251 49.7456 16.0037 48.6361 17.9786 46.6611C19.9536 44.6862 21.0631 42.0076 21.0631 39.2145V22.3394H21.079ZM17.5651 39.2145C17.5651 41.0756 16.8258 42.8605 15.5099 44.1764C14.1939 45.4924 12.409 46.2317 10.548 46.2317C8.6869 46.2317 6.90206 45.4924 5.58608 44.1764C4.27011 42.8605 3.5308 41.0756 3.5308 39.2145V32.8546C3.5378 30.9971 4.27986 29.218 5.59477 27.906C6.90969 26.5941 8.69051 25.8561 10.548 25.8533H17.5651V39.2145ZM10.5427 17.5588C9.15248 17.5599 7.79321 17.1486 6.63681 16.377C5.4804 15.6054 4.57881 14.5082 4.04608 13.2241C3.51335 11.9401 3.37342 10.5269 3.64399 9.16326C3.91456 7.79965 4.58347 6.54693 5.56611 5.56355C6.54875 4.58017 7.80097 3.91031 9.16437 3.63871C10.5278 3.36711 11.9411 3.50598 13.2256 4.03774C14.51 4.5695 15.6079 5.47026 16.3804 6.62608C17.1528 7.78191 17.5651 9.14087 17.5651 10.5311C17.5623 12.3932 16.8217 14.1783 15.5055 15.4955C14.1893 16.8127 12.4048 17.5546 10.5427 17.5588Z"
              fill="#9164CC"
            />
            <path
              d="M36.7193 25.8533C39.5662 25.851 42.3326 24.9085 44.5888 23.1723C46.8449 21.4362 48.4646 19.0035 49.1961 16.2522C49.9276 13.501 49.7301 10.5851 48.6341 7.95768C47.5382 5.33023 45.6052 3.13826 43.1355 1.72229C40.6657 0.306323 37.7975 -0.25438 34.9763 0.127288C32.1552 0.508955 29.539 1.81163 27.5343 3.83293C25.5296 5.85424 24.2485 8.48103 23.8901 11.3052C23.5317 14.1294 24.116 16.993 25.5523 19.451L28.5892 17.6755C27.5415 15.8838 27.115 13.7963 27.3759 11.7373C27.6369 9.6783 28.5706 7.76316 30.0321 6.28951C31.4936 4.81585 33.4009 3.86622 35.4577 3.5882C37.5144 3.31018 39.6054 3.71934 41.4057 4.75209C43.206 5.78484 44.6147 7.38334 45.4129 9.29917C46.2111 11.215 46.3542 13.3408 45.8198 15.3463C45.2854 17.3518 44.1035 19.1246 42.4578 20.3892C40.8121 21.6538 38.7948 22.3394 36.7193 22.3394H21.0791V25.8533H36.7193Z"
              fill="#A5C5ED"
            />
          </svg>
        </Link>

        <fieldset className="relative">
          <Input placeholder="Search" className="ps-11" />
          <InputIcon>
            <MagnifyingGlass size={19} color="#AFBACA" />
          </InputIcon>
        </fieldset>

        <SidebarList className="space-y-0.5">
          <NavLink to={routes.home}>
            <SidebarItem>
              <PresentationChart size={20} />
              Dashboard
            </SidebarItem>
          </NavLink>

          <SidebarItem dropdown>
            <SidebarDropdown>
              <SidebarCollapse>
                <div className="flex items-center gap-3">
                  <span>
                    <Cube size={20} />
                  </span>
                  <span>Omma</span>
                </div>
                <span className="group-open:-rotate-180">
                  <CaretDown size={20} />
                </span>
              </SidebarCollapse>

              <SidebarDropdownList>
                <SidebarItem>
                  <Database size={20} />
                  Almacen
                </SidebarItem>
                <SidebarItem>
                  <FilePlus size={20} />
                  Consumo
                </SidebarItem>
                <SidebarItem>
                  <FolderLock size={20} />
                  Remisiones
                </SidebarItem>
                <SidebarItem>
                  <Archive size={20} />
                  Movimientos
                </SidebarItem>
              </SidebarDropdownList>
            </SidebarDropdown>
          </SidebarItem>

          <SidebarItem dropdown>
            <SidebarDropdown>
              <SidebarCollapse>
                <div className="flex items-center gap-3">
                  <span>
                    <Cube size={20} />
                  </span>
                  <span>Arthrex</span>
                </div>
                <span className="group-open:-rotate-180">
                  <CaretDown size={20} />
                </span>
              </SidebarCollapse>

              <SidebarDropdownList>
                <NavLink to={routes.arthrex.store}>
                  <SidebarItem>
                    <Database size={20} />
                    Almacen
                  </SidebarItem>
                </NavLink>
                <NavLink to={routes.arthrex.consumos}>
                  <SidebarItem>
                    <FilePlus size={20} />
                    Consumo
                  </SidebarItem>
                </NavLink>
                <NavLink to={routes.arthrex.remissions.list}>
                  <SidebarItem>
                    <FolderLock size={20} />
                    Remisiones
                  </SidebarItem>
                </NavLink>
                <NavLink to={routes.arthrex.movements}>
                  <SidebarItem>
                    <Archive size={20} />
                    Movimientos
                  </SidebarItem>
                </NavLink>
              </SidebarDropdownList>
            </SidebarDropdown>
          </SidebarItem>

          <NavLink to={routes.hospitals}>
            <SidebarItem active>
              <FirstAid size={20} />
              Hospitales
            </SidebarItem>
          </NavLink>
          <SidebarItem>
            <Users size={20} />
            Usuarios
          </SidebarItem>

          <SidebarItem>
            <SignIn size={20} />
            Cerrar Sesión
          </SidebarItem>
        </SidebarList>
      </SidebarBody>

      <SidebarFooter>
        <div className="flex items-center gap-2">
          <Avatar img="/images/avatar/avatar-1.png" alt="avatar" />
          <div>
            <p className="text-body-4 font-medium text-metal-400">
              Enzo Farnandez
            </p>
            <p className="text-body-4 font-normal text-metal-300">
              enzo123@gmail.com
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
