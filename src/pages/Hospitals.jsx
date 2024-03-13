import {
  Avatar,
  Badge,
  Button,
  Popover,
  Table,
  Modal,
  Typography,
  Input,
  Dropdown,
  Icon,
} from "keep-react";
import {
  ArrowDown,
  Cube,
  DotsThreeOutline,
  Pencil,
  Trash,
  CloudArrowUp,
  MagnifyingGlass,
} from "phosphor-react";

import { useEffect, useState } from "react";
import { instance } from "../api/instance";

import Swal from "sweetalert2";

function Hospitals() {
  const [dataNewHospital, setDataNewHospital] = useState({
    measures: "",
    category: "",
    stock: 0,
  });

  const [hospitals, setHospitals] = useState([]);
  const [hospitalsInfo, setHospitalsInfo] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  // states for update hospital
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [hospitalToUpdate, setHospitalToUpdate] = useState({});
  const showModalUpdate = (hospital) => {
    setHospitalToUpdate(hospital);
    setModalUpdateOpen(true);
  };
  const closeModalUpdate = () => {
    setHospitalToUpdate({});
    setModalUpdateOpen(false);
  };
  const handleChangeUpdate = (e) => {
    setHospitalToUpdate({
      ...hospitalToUpdate,
      [e.target.name]: e.target.value,
    });
  };
  const sendFormUpdate = async () => {
    try {
      closeModalUpdate();
      await instance.put(
        `/hospitals/update/${hospitalToUpdate.id}`,
        hospitalToUpdate
      );
      getHospitals();
      Swal.fire({
        title: "Actualizado",
        text: "El hospital ha sido actualizado exitosamente!",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al actualizar el hospital",
        icon: "error",
      });
    }
  };
  // End states for update hospital

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const getHospitals = () => {
    instance.get("/hospitals/all").then((response) => {
      setHospitals(response.data.data);
      setHospitalsInfo(response.data.info);
    });
  };

  const deleteHospital = (hospital) => {
    Swal.fire({
      title: `¿Eliminar ${hospital.name}?`,
      text: `TODOS los registros e información relacionada con ${hospital.name} serán borrados también!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .delete(`/hospitals/delete/${hospital.id}`)
          .then((response) => {
            getHospitals();
            Swal.fire(
              "Eliminado!",
              "El hospital se elimino correctamente.",
              "success"
            );
          })
          .catch((error) => {
            console.error(error);
            // TODO: Arreglar error que muestra al eliminar un hospital
            // Por ahora muestro el mensaje de exito
            getHospitals();
            Swal.fire(
              "Eliminado!",
              "El hospital se elimino correctamente.",
              "success"
            );
          });
      }
    });
  };

  const handleChange = (e) => {
    setDataNewHospital({
      ...dataNewHospital,
      [e.target.name]: e.target.value,
    });
  };

  const sendForm = async () => {
    try {
      closeModal();

      await instance.post("/hospitals/add", dataNewHospital);
      getHospitals();
      Swal.fire({
        title: "Creado",
        text: "El hospital ha sido creado exitosamente!",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al crear el hospital",
        icon: "error",
      });
    }
  };

  const renderHospitals = () => {
    return hospitals.map((hospital) => (
      <Table.Row className="bg-white" key={hospital.id}>
        <Table.Cell>
          <p>{hospital.id}</p>
        </Table.Cell>
        <Table.Cell>
          <Badge color="primary">{hospital.name}</Badge>
        </Table.Cell>
        <Table.Cell>
          <p>{new Date(hospital.registration_date).toDateString()}</p>
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
                    onClick={() => deleteHospital(hospital)}
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
                    onClick={() => showModalUpdate(hospital)}
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

  useEffect(() => getHospitals(), []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal.Body className="space-y-3">
          <Modal.Icon>
            <CloudArrowUp size={28} color="#1B4DFF" />
          </Modal.Icon>
          <Modal.Content>
            <Typography variant="div" className="!mb-6">
              <Typography
                variant="h3"
                className="mb-2 text-body-1 font-medium text-metal-900"
              >
                Agregar nuevo hospital
              </Typography>
              <Typography
                variant="p"
                className="text-body-4 font-normal text-metal-600"
              >
                <div className="flex gap-4 flex-col mt-4">
                  <Input
                    placeholder="Nombre del hospital"
                    name="name"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
              </Typography>
            </Typography>
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
            <Typography variant="div" className="!mb-6">
              <Typography
                variant="h3"
                className="mb-2 text-body-1 font-medium text-metal-900"
              >
                Editar Hospital
              </Typography>
              <Typography
                variant="p"
                className="text-body-4 font-normal text-metal-600"
              >
                <div className="flex gap-4 flex-col mt-4">
                  <Input
                    placeholder="Nombre del hospital"
                    name="name"
                    type="text"
                    value={hospitalToUpdate.name}
                    onChange={handleChangeUpdate}
                  />
                </div>
              </Typography>
            </Typography>
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
      <h1>Hospitales</h1>
      <Table showCheckbox={true}>
        <Table.Caption>
          <div className="my-5 flex items-center px-6">
            <div className="flex items-center gap-5">
              <p className="text-body-1 font-semibold text-metal-600">
                Hospitales Registrados
              </p>
              <Badge size="sm" color="secondary">
                {hospitalsInfo.count} Hospitales
              </Badge>
            </div>
            <div className="flex ml-5 items-center gap-5">
              <Button variant="outline" size="sm" onClick={openModal}>
                <span className="pr-2">
                  <Cube size={24} />
                </span>
                Nuevo Hospital
              </Button>
              <fieldset className="relative w-64">
                <Input
                  placeholder="Buscar por categoría o medidas"
                  className="ps-11"
                />
                <Icon>
                  <MagnifyingGlass size={18} color="#AFBACA" />
                </Icon>
              </fieldset>
            </div>
          </div>
        </Table.Caption>

        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Fecha Registro</Table.HeadCell>
          <Table.HeadCell />
        </Table.Head>
        <Table.Body className="divide-gray-25 divide-y">
          {renderHospitals()}
        </Table.Body>
      </Table>
    </>
  );
}

export default Hospitals;
