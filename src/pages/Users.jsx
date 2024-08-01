import {
  Avatar,
  Badge,
  Button,
  Table,
  Modal,
  Input,
  Dropdown,
} from "keep-react";
import {
  Cube,
  DotsThreeOutline,
  Pencil,
  Trash,
  CloudArrowUp,
  MagnifyingGlass,
} from "phosphor-react";

import React, { useEffect, useState} from "react";
import { instance } from "../api/instance";
import Swal from "sweetalert2";

function Users() {

  const [dataNewUser, setDataNewUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password:"",
    role:"",
    active: false,
  });

  const [user, setUsers] = useState([]);
  const [usersInfo, setUsersInfo] = useState({});

  const role = ['Admin', 'user', 'Instrumentista', 'Apoyo', "Inventario", "Almacen"];

  const [isOpen, setIsOpen] = useState(false);

  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({});
  const showModalUpdate = (user) => {
    setUserToUpdate(user);
    setModalUpdateOpen(true);
  };
  
  const closeModalUpdate = () => {
    setUserToUpdate({});
    setModalUpdateOpen(false);
  };
  
  const handleChangeUpdate = (e) => {
    setUserToUpdate({
      ...userToUpdate,
      [e.target.name]: e.target.value,
    });
  };
  const sendFormUpdate = async () => {
    try {
      closeModalUpdate();
      await instance.put(`/users/:id${userToUpdate.id}`, userToUpdate);
      getUsers();
      Swal.fire({
        title: "Actualizado",
        text: "Usuarios actualizados exitosamente!",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error",
        icon: "error",
      });
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const getUsers = () => {
    instance.get("/users").then((response) => {
      setUsers(response.data.data);
      setUsersInfo(response.data.info);
    });
  };

  const deleteUser = (user) => {
    Swal.fire({
      title: `¿Eliminar ${user.name}?`,
      text: `Todos los registros de ${user.name} serán borrados!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .delete(`/users/:id${user.id}`)
          .then((response) => {
            getUsers();
            Swal.fire(
              "Eliminado!",
              "El usuario se a elimino correctamente.",
              "success"
            );
          })
          .catch((error) => {
            console.error(error);
            Swal.fire(
              "Error",
              "Ha ocurrido un error al tratar de eliminar al usuario",
              "error"
            );
          });
      }
    });
  };

  const handleChange = (e) => {
    setDataNewUser({
      ...dataNewUser,
      [e.target.name]: e.target.value,
    });
  };

  const sendForm = async () => {
    try {
      closeModal();

      await instance.post('/auth/signup', dataNewUser);
      getUsers();
      Swal.fire({
        title: "Creado",
        text: "Usuario creado exitosamente!",
        icon: "success",
      }
    );
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al crear el usuario",
        icon: "error",
      });
    }
  };

  useEffect(() => getUsers(), []);

  const renderBadge = (isActive) => {
    if (isActive) {
      return (
        <Badge color="success" showIcon={true}>
          Conectado
        </Badge>
      );
    } else {
      return (
        <Badge color="error" showIcon={true}>
          Desconectado
        </Badge>
      );
    }
  };

  const renderUsers = () => {
    return user.map((user) => (
      <Table.Row className="bg-white" key={user.id}>
       <Table.Cell>
         <Avatar
          img={user.avatar}
          />
       </Table.Cell>
        <Table.Cell>
          <p>{user.name}</p>
          <p>{user.lastname}</p>
        </Table.Cell>
        <Table.Cell>
          {renderBadge(user.active)}
        </Table.Cell> 
        <Table.Cell>
          <p>{user.role}</p> 
        </Table.Cell>
        <Table.Cell>
          <p>{user.email}</p> 
        </Table.Cell>
        <Table.Cell>
        <p>{new Date(user.registration_date).toDateString()}</p>
        </Table.Cell>
        <Table.Cell>
        <Dropdown
            action={
              <Button variant="outline" size="sm" shape="circle">
                <DotsThreeOutline size={15} />
              </Button>
            }
            actionClassName="border-none"
          >
            <Dropdown.List>
              <ul>
                <li className="rounded px-2 py-1 hover:bg-metal-100">
                  <button
                    className="flex w-full items-center justify-between text-body-4 font-normal text-metal-600"
                    onClick={() => deleteUser(user)}
                  >
                    <span>Borrar</span>
                    <span>
                      <Trash />
                    </span>
                  </button>
                </li>
                <li className="rounded px-2 py-1 hover:bg-metal-100">
                  <button
                    className="flex w-full items-center justify-between text-body-4 font-normal text-metal-600"
                    onClick={() => showModalUpdate(user)}
                  >
                    <span>Editar</span>
                    <span>
                      <Pencil />
                    </span>
                  </button>
                </li>
              </ul>
            </Dropdown.List>
          </Dropdown>
        </Table.Cell>
      </Table.Row>
    ));
  };
  

  useEffect(() => getUsers(), []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal.Body className="space-y-3">
          <Modal.Icon>
            <CloudArrowUp size={28} color="#1B4DFF" />
          </Modal.Icon>
          <Modal.Content>
            <div className="!mb-6">
              <h3
                className="mb-2 text-body-1 font-medium text-metal-900"
              >
                Agregar nuevo Usuario
              </h3>
              <p
                className="text-body-4 font-normal text-metal-600"
              >
                <div className="flex gap-4 flex-col mt-4">
                  <Input
                    placeholder="Nombre del usuario"
                    name="name"
                    type="text"
                    onChange={handleChange}
                  />

                  <Input
                    placeholder="Apellidos del usuario"
                    name="lastname"
                    type="text"
                    onChange={handleChange}
                  />

                  <select
                    placeholder="Cargo"
                    name="role"
                    onChange={handleChange}                  
                  >
                    {role.map((role, index) => (
                      <option key={index} value={role}>{role}</option>
                    ))}
                   </select>
                  <Input
                    placeholder="Correo Electronico"
                    name="email"
                    type="email"
                    onChange={handleChange}
                  />

                  <Input
                    placeholder="Contraseña"
                    name="password"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
              </p>
            </div>
          </Modal.Content>
          <Modal.Footer className="flex flex-row justify-end">
            <Button
              onClick={closeModal}
              size="sm"
              variant="outline"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button type="submit" onClick={sendForm} size="sm" color="primary">
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>

      <Modal isOpen={modalUpdateOpen} onClose={closeModalUpdate}>
        <Modal.Body className="space-y-3">
          <Modal.Icon>
            <CloudArrowUp size={28} color="#1B4DFF" />
          </Modal.Icon>
          <Modal.Content>
            <div className="!mb-6">
              <h3
                className="mb-2 text-body-1 font-medium text-metal-900"
              >
                Editar Perfil
              </h3>
              <p
                className="text-body-4 font-normal text-metal-600"
              >
                <div className="flex gap-4 flex-col mt-4">
                  <Input
                    placeholder="Nombre del Usuario"
                    name="name"
                    type="text"
                    value={userToUpdate.name}
                    onChange={handleChangeUpdate}
                  />

                  <Input
                    placeholder="Apellidos del usuario"
                    name="lastname"
                    type="text"
                    value={userToUpdate.lastname}
                    onChange={handleChangeUpdate}
                  />

                  <select
                    placeholder="Cargo"
                    onChange={handleChangeUpdate}                  
                  >
                    {role.map((role, index) => (
                      <option key={index} 
                      value={role}>{role}</option>
                    ))}
                   </select>

                  <Input
                    placeholder="Correo Electronico"
                    name="email"
                    type="email"
                    value={userToUpdate.email}
                    onChange={handleChangeUpdate}
                  />

                  <Input
                    placeholder="Contraseña"
                    name="password"
                    type="password"
                    value={userToUpdate.password}
                    onChange={handleChangeUpdate}
                  />

                </div>
              </p>
            </div>
          </Modal.Content>
          <Modal.Footer className="flex flex-row justify-end">
            <Button
              onClick={closeModalUpdate}
              size="sm"
              variant="outline"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              onClick={sendFormUpdate}
              size="sm"
              color="primary"
            >
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <h1>Usuarios</h1>
      <Table showCheckbox={true}>
        <Table.Caption>
          <div className="my-5 flex items-center px-6">
            <div className="flex items-center gap-5">
              <p className="text-body-1 font-semibold text-metal-600">
                Usuarios Registrados
              </p>
              <Badge size="sm" color="secondary">
                {usersInfo.totalCount} Usuarios
              </Badge>
            </div>
            <div className="flex ml-5 items-center gap-5">
              <Button variant="outline" size="sm" onClick={openModal}>
                <span className="pr-2">
                  <Cube size={24} />
                </span>
                Nuevo Usuario
              </Button>
              <fieldset className="relative w-64">
                <Input
                  placeholder="Buscar Usuario"
                  className="ps-11"
                />
                  <MagnifyingGlass size={18} color="#AFBACA" />
              </fieldset>
            </div>
          </div>
        </Table.Caption>

        <Table.Head>
          <Table.HeadCell>Avatar</Table.HeadCell>
          <Table.HeadCell>Nombre/Apellido</Table.HeadCell>
          <Table.HeadCell>Conexion</Table.HeadCell>
          <Table.HeadCell>Cargo</Table.HeadCell>
          <Table.HeadCell>Correo Electronico</Table.HeadCell>
          <Table.HeadCell>Fecha Registro</Table.HeadCell>
          <Table.HeadCell />
        </Table.Head>
        <Table.Body className="divide-gray-25 divide-y">
          {renderUsers()}
        </Table.Body>
      </Table>
    </>
  );
}


export default Users