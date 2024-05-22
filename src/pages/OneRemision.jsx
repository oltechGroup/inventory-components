import {
  Avatar,
  Badge,
  Button,
  Icon,
  Input,
  Table,
  Modal,
  Typography,
  NumberInput,
} from "keep-react";
import {
  ArrowLeft,
  Calendar,
  Cube,
  MagnifyingGlass,
  Stack,
  Lock,
  Plus,
  Minus,
  CloudArrowUp,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../api/instance";
import { SkeletonCharts } from "../components/SkeletonCharts";

import Swal from "sweetalert2";
import { routes } from "../utils/routes";
import RemissionPDF from "../components/pdf/RemissionPDF";

import { pdf } from "@react-pdf/renderer";

function OneRemision() {
  const { id: idRemission } = useParams();
  const [loading, setLoading] = useState(true);
  const [remission, setRemission] = useState(null);

  const nav = useNavigate();

  const getRemision = () => {
    instance
      .get(`/componentes/remission/${idRemission}`)
      .then((response) => {
        setRemission(response.data.data);
      })
      .finally(() => setLoading(false));
  };

  const deleteRemission = (id) => {
    instance
      .delete(`/componentes/remission/${id}`)
      .then(() => {
        Swal.fire({
          title: "Borrado",
          text: "La remisión ha sido borrada!",
          icon: "success",
        });
        nav(routes.remisiones);
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "No se ha podido borrar la remisión, algo salio mal!",
          icon: "error",
        });
      });
  };

  const renderComponents = () => {
    return remission?.componentes_has_componentes_remisiones.map(
      (component, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
              {component.componentes.measures}
            </p>
          </Table.Cell>
          <Table.Cell>
            <Badge color="secondary">{component.quantity}</Badge>
          </Table.Cell>
          <Table.Cell>
            <Badge color="primary">
              {component.componentes.componentes_categories.name}
            </Badge>
          </Table.Cell>
          <Table.Cell>
            <Badge color="success">{component.componentes.lote}</Badge>
          </Table.Cell>
          <Table.Cell>
            {new Date(component.componentes.caducidad).toLocaleDateString()}
          </Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      )
    );
  };

  const printPDF = async (remission) => {
    const blob = await pdf(<RemissionPDF remission={remission} />).toBlob();
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url);
    printWindow.addEventListener("load", function () {
      printWindow.print();
    });
  };

  // States for modal "Finish Remission"
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const componentsRemission =
    remission?.componentes_has_componentes_remisiones?.map((component) => ({
      id: component.componentes.id,
      remission_quantity: component.quantity,
      quantity_delivered: 0,
    }));

  const [componentsFinished, setComponentsFinished] = useState([]);

  useEffect(() => {
    if (remission) {
      const newComponentsFinished =
        remission.componentes_has_componentes_remisiones?.map((component) => ({
          id: component.componentes.id,
          remission_quantity: component.quantity,
          quantity_delivered: 0,
        }));

      setComponentsFinished(newComponentsFinished);
    }
  }, [remission]);

  const handleQuantityDelivered = (id, value) => {
    setComponentsFinished(
      componentsFinished.map((component) =>
        component.id === id
          ? {
              ...component,
              quantity_delivered:
                value > component.remission_quantity
                  ? component.remission_quantity
                  : value,
            }
          : component
      )
    );
  };

  const handleSumQuantityDelivered = (id) => {
    setComponentsFinished(
      componentsFinished.map((component) =>
        component.id === id
          ? {
              ...component,
              quantity_delivered:
                component.quantity_delivered < component.remission_quantity
                  ? component.quantity_delivered + 1
                  : component.remission_quantity,
            }
          : component
      )
    );
  };

  const handleSubQuantityDelivered = (id) => {
    setComponentsFinished(
      componentsFinished.map((component) =>
        component.id === id
          ? {
              ...component,
              quantity_delivered:
                component.quantity_delivered > 0
                  ? component.quantity_delivered - 1
                  : 0,
            }
          : component
      )
    );
  };

  const sendFormFinishRemission = () => {
    const data = {
      remission_id: idRemission,
      components: componentsFinished,
    };

    instance
      .post(`/componentes/remission/finalize/${data.remission_id}`, {
        componentes: data.components,
      })
      .then(() => {
        Swal.fire({
          title: "Remisión finalizada",
          text: "La remisión ha sido finalizada con éxito!",
          icon: "success",
        });
        closeModal();
        getRemision();
        nav(routes.remisiones);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "No se ha podido finalizar la remisión, algo salio mal!",
          icon: "error",
        });
      });
  };

  useEffect(() => scrollTo(0, 0), []);
  useEffect(() => getRemision(), [idRemission]);

  if (loading) return <SkeletonCharts />;

  return (
    <>
      <div className="flex gap-4 items-center mb-4">
        <button
          className="rounded-full p-2 bg-slate-200"
          onClick={() => nav(-1)}
        >
          <ArrowLeft size={24} />
        </button>
        <h1>{remission.name}</h1>
      </div>
      <h2 className="text-body-1 font-semibold text-metal-600">
        Remisión realizada por:
      </h2>
      <div className="flex gap-2 items-center my-3 bg-white p-4 rounded-lg shadow-md max-w-max">
        <Avatar img={remission.users.avatar} />
        <div>
          <p className="text-body-3 text-metal-500 font-medium">
            {remission.users.name} {remission.users.lastname}
          </p>
          <p className="text-body-5 text-metal-500">{remission.users.role}</p>
        </div>
      </div>

      <h2 className="text-body-1 font-semibold text-metal-600 mb-2">
        Detalles de la remisión:
      </h2>
      <div className="flex flex-row gap-4 my-3">
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-end gap-2 relative">
          <div className="flex gap-2 text-metal-400">
            <Calendar size={32} />
            <p className="text-body-3">Fecha de remisión</p>
          </div>
          <p className="text-body-3 text-metal-800 font-medium">
            {new Date(remission.date_remission).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-end gap-2 relative">
          <div className="flex gap-2 text-metal-400">
            <Lock size={32} />
            <p className="text-body-3">Folio de remisión</p>
          </div>
          <p className="text-body-3 text-metal-800 font-medium">
            {remission.codigo}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-end gap-2 relative">
          <div className="flex gap-2 text-metal-400">
            <Cube size={32} />
            <p className="text-body-3">Cantidad de componentes</p>
          </div>
          <p className="text-body-3 text-metal-800 font-medium">
            {remission._count.componentes_has_componentes_remisiones}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-end gap-2 relative">
          <div className="flex gap-2 text-metal-400">
            <Stack size={32} />
            <p className="text-body-3">Estado de la remisión</p>
          </div>
          {remission.status === "En proceso" ? (
            <Badge color="warning" showIcon>
              En proceso
            </Badge>
          ) : (
            <Badge color="success" showIcon>
              Finalizada
            </Badge>
          )}
        </div>
      </div>
      <h2 className="text-body-1 font-semibold text-metal-600 mb-2">
        Operaciones
      </h2>
      <div className="flex gap-4 my-3">
        {remission.status === "En proceso" ? (
          <Button size="sm" onClick={openModal}>
            <span className="pr-2">
              <Cube size={24} />
            </span>
            Finalizar Remisión
          </Button>
        ) : null}
        <Button color="success" size="sm" onClick={() => printPDF(remission)}>
          <span className="pr-2">
            <Cube size={24} />
          </span>
          Imprimir Hoja
        </Button>
        {remission.status === "En proceso" ? (
          <Button
            size="sm"
            color="error"
            onClick={() => {
              Swal.fire({
                title: `¿Eliminar "${remission.name}"?`,
                text: "Todos los componentes que estaban en remisión volverán a estar disponibles en el almacén",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Si, Borrar!",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteRemission(idRemission);
                }
              });
            }}
          >
            <span className="pr-2">
              <Cube size={24} />
            </span>
            Cancelar Remisión
          </Button>
        ) : null}
      </div>
      <Table showCheckbox={true}>
        <Table.Caption>
          <div className="my-5 flex items-center px-6">
            <div className="flex items-center gap-5">
              <p className="text-body-1 font-semibold text-metal-600">
                Componentes en remisión
              </p>
            </div>
            <div className="flex ml-5 items-center gap-5">
              <fieldset className="relative w-64">
                <Input
                  placeholder="Buscar por categoría o medidas"
                  className="ps-11"
                  name="search"
                />
                <Icon>
                  <MagnifyingGlass size={18} color="#AFBACA" />
                </Icon>
              </fieldset>
            </div>
          </div>
        </Table.Caption>

        <Table.Head>
          <Table.HeadCell>
            <p className="text-body-5 font-medium text-metal-400">Medidas</p>
          </Table.HeadCell>
          <Table.HeadCell>En Remisión</Table.HeadCell>
          <Table.HeadCell>Categoría</Table.HeadCell>
          <Table.HeadCell>Lote</Table.HeadCell>
          <Table.HeadCell>Caducidad</Table.HeadCell>
          <Table.HeadCell />
        </Table.Head>
        <Table.Body className="divide-gray-25 divide-y">
          {renderComponents()}
        </Table.Body>
      </Table>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal.Body className="space-y-3 w-max flex flex-col max-h-screen overflow-y-scroll">
          <Modal.Icon>
            <CloudArrowUp size={28} color="#1B4DFF" />
          </Modal.Icon>
          <Modal.Content>
            <Typography variant="div" className="!mb-6">
              <Typography
                variant="h3"
                className="mb-2 text-body-1 font-medium text-metal-900"
              >
                Comprobación de entrega
              </Typography>
              <Typography variant="p" className="text-body-3 text-metal-400">
                Revisa cuidadosamente la cantidad de componentes entregados
              </Typography>
              <Table>
                <Table.Head>
                  <Table.HeadCell>
                    <p className="text-body-5 font-medium text-metal-400">
                      Medidas
                    </p>
                  </Table.HeadCell>
                  <Table.HeadCell>En Remisión</Table.HeadCell>
                  <Table.HeadCell>Categoría</Table.HeadCell>
                  <Table.HeadCell>Lote</Table.HeadCell>
                  <Table.HeadCell>En entrega</Table.HeadCell>
                  <Table.HeadCell />
                </Table.Head>
                <Table.Body className="divide-gray-25 divide-y">
                  {remission?.componentes_has_componentes_remisiones.map(
                    (component, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>
                          <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                            {component.componentes.measures}
                          </p>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge color="secondary">{component.quantity}</Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge color="primary">
                            {component.componentes.componentes_categories.name}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge color="success">
                            {component.componentes.lote}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <NumberInput>
                            <NumberInput.Button
                              onClick={() =>
                                handleSubQuantityDelivered(
                                  component.componentes.id
                                )
                              }
                            >
                              <Minus size={16} color="#455468" />
                            </NumberInput.Button>
                            <NumberInput.Input
                              defaultValue={0}
                              value={
                                componentsFinished.find(
                                  (item) => item.id === component.componentes.id
                                )?.quantity_delivered || 0
                              }
                              onChange={(e) =>
                                handleQuantityDelivered(
                                  component.componentes.id,
                                  e.target.value
                                )
                              }
                            />
                            <NumberInput.Button
                              onClick={() =>
                                handleSumQuantityDelivered(
                                  component.componentes.id
                                )
                              }
                            >
                              <Plus size={16} color="#455468" />
                            </NumberInput.Button>
                          </NumberInput>
                        </Table.Cell>
                      </Table.Row>
                    )
                  )}
                </Table.Body>
              </Table>
            </Typography>
          </Modal.Content>
          <Modal.Footer className="self-end">
            <Button
              onClick={closeModal}
              size="sm"
              variant="outline"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                Swal.fire({
                  title: `¿Finalizar "${remission.name}"?`,
                  text: "Una vez finalizada la remisión no se podrá modificar",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  cancelButtonText: "Cancelar",
                  confirmButtonText: "Si, Finalizar!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    sendFormFinishRemission();
                  }
                });
              }}
              size="sm"
              color="primary"
            >
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OneRemision;
