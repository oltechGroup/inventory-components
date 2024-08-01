import { format } from "@formkit/tempo";

import {
  CloudArrowUp,
  Funnel,
  Plus,
  DotsThreeOutlineVertical,
} from "phosphor-react";

import { useEffect, useState } from "react";
import { instance } from "../api/instance";

import Swal from "sweetalert2";

import {
  Badge,
  Button,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownItem,
  DropdownList,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Input,
  Modal,
  ModalAction,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "keep-react";
import { SkeletonTable } from "../components/SkeletonTable";

function Hospitals() {
  const [dataNewHospital, setDataNewHospital] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(true);

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
      Swal.fire({
        title: "Actualizando hospital...",
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      
      await instance.put(`/hospitals/${hospitalToUpdate.id}`, hospitalToUpdate);
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
    instance
      .get("/hospitals")
      .then((response) => {
        console.log(response.data);
        setHospitals(response.data.data);
        setHospitalsInfo(response.data.info);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al obtener los hospitales",
          icon: "error",
        });
      })
      .finally(() => setLoading(false));
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
        Swal.fire({
          title: "Eliminando hospital...",
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        instance
          .delete(`/hospitals/${hospital.id}`)
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
            Swal.fire(
              "Error",
              "Ha ocurrido un error al eliminar el hospital",
              "error"
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
      Swal.fire({
        title: "Creando hospital...",
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      await instance.post("/hospitals", dataNewHospital);
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
    return hospitals.map((hospital, index) => (
      <TableRow key={hospital.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          <Badge color="primary">{hospital.name}</Badge>
        </TableCell>
        <TableCell>
          {format(hospital.registration_date, "MMMM D, YYYY", "es")}
        </TableCell>
        <TableCell>
          <Dropdown>
            <DropdownAction asChild>
              <button>
                <DotsThreeOutlineVertical className="size-4 fill-metal-900 dark:fill-white" />
              </button>
            </DropdownAction>
            <DropdownContent className="max-w-[200px] p-3">
              <DropdownList>
                <DropdownItem onClick={() => showModalUpdate(hospital)}>
                  Editar
                </DropdownItem>
                <DropdownItem onClick={() => deleteHospital(hospital)}>
                  Borrar
                </DropdownItem>
              </DropdownList>
            </DropdownContent>
          </Dropdown>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => getHospitals(), []);

  return (
    <>
      <Modal isOpen={modalUpdateOpen} onClose={closeModalUpdate}>
        <ModalBody>
          <ModalContent>
            <ModalClose className="absolute right-4 top-4" />
            <ModalHeader className="mb-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-metal-50 dark:bg-metal-800">
                <CloudArrowUp size={28} color="#1B4DFF" />
              </div>
              <div className="space-y-1">
                <ModalTitle>Actualizar Hospital</ModalTitle>
                <ModalDescription>
                  <Input
                    placeholder="Nombre del hospital"
                    name="name"
                    type="text"
                    value={hospitalToUpdate.name}
                    onChange={handleChangeUpdate}
                  />
                </ModalDescription>
              </div>
            </ModalHeader>
            <ModalFooter>
              <Button
                size="sm"
                variant="outline"
                color="secondary"
                onClick={closeModalUpdate}
              >
                Cancelar
              </Button>
              <Button size="sm" color="primary" onClick={sendFormUpdate}>
                Actualizar
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalBody>
      </Modal>

      {loading ? (
        <SkeletonTable />
      ) : (
        <Table>
          <TableCaption>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">
                  Hospitales
                </h2>
                <Badge
                  color="secondary"
                  className="dark:bg-metal-800 dark:text-white"
                >
                  {hospitalsInfo.totalCount} Hospitales
                </Badge>
              </div>
              <div className="flex items-center gap-5">
                <Modal isOpen={isOpen} onClose={closeModal}>
                  <ModalAction asChild>
                    <Button
                      variant="outline"
                      color="secondary"
                      size="xs"
                      className="flex gap-1.5"
                    >
                      <Plus className="size-4 fill-metal-900 dark:fill-white" />
                      Agregar Hospital
                    </Button>
                  </ModalAction>
                  <ModalBody>
                    <ModalContent>
                      <ModalClose className="absolute right-4 top-4" />
                      <ModalHeader className="mb-6 space-y-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-metal-50 dark:bg-metal-800">
                          <CloudArrowUp size={28} color="#1B4DFF" />
                        </div>
                        <div className="space-y-1">
                          <ModalTitle>Agregar Hospital</ModalTitle>
                          <ModalDescription>
                            <Input
                              placeholder="Nombre del hospital"
                              name="name"
                              type="text"
                              onChange={handleChange}
                            />
                          </ModalDescription>
                        </div>
                      </ModalHeader>
                      <ModalFooter>
                        <ModalClose asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            color="secondary"
                            onClick={closeModal}
                          >
                            Cancelar
                          </Button>
                        </ModalClose>
                        <Button size="sm" color="primary" onClick={sendForm}>
                          Agregar
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </ModalBody>
                </Modal>

                <Button
                  variant="outline"
                  color="secondary"
                  size="xs"
                  className="flex gap-1.5"
                >
                  <Funnel className="size-4 fill-metal-900 dark:fill-white" />
                  Filtrar
                </Button>
              </div>
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="w-[65px]">No.</div>
              </TableHead>
              <TableHead>
                <div>Nombre</div>
              </TableHead>
              <TableHead>
                <div>Fecha de registro</div>
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderHospitals()}</TableBody>
        </Table>
      )}
    </>
  );
}

export default Hospitals;
