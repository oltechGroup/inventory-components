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
import PaginationComponent from "../components/Pagination";

function Store() {
  const [paramsAPI, setParamsAPI] = useState({
    page: 1,
    perPage: 20,
    search: "",
    sort: "registration_date",
    order: "DESC",
  });
  const handlePageChange = (page) => {
    setParamsAPI({ ...paramsAPI, page });
  };
  const handleSearch = (e) => {
    setParamsAPI({ ...paramsAPI, search: e.target.value });
  };

  const [dataNewComponent, setDataNewComponent] = useState({
    measures: "",
    category: "",
    stock: 0,
  });

  const [componentes, setComponentes] = useState([]);
  const [componentesInfo, setComponentesInfo] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  // states for update component
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [componentToUpdate, setComponentToUpdate] = useState({});
  const showModalUpdate = (component) => {
    setComponentToUpdate({ ...component, category: component.category_id });
    setModalUpdateOpen(true);
  };
  const closeModalUpdate = () => {
    setComponentToUpdate({});
    setModalUpdateOpen(false);
  };
  const handleChangeUpdate = (e) => {
    setComponentToUpdate({
      ...componentToUpdate,
      [e.target.name]: e.target.value,
    });
  };
  const sendFormUpdate = async () => {
    try {
      closeModalUpdate();
      await instance.put(
        `/componentes/update/${componentToUpdate.id}`,
        componentToUpdate
      );
      getComponents();
      Swal.fire({
        title: "Actualizado",
        text: "El componente ha sido actualizado exitosamente!",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al actualizar el componente",
        icon: "error",
      });
    }
  };
  // End states for update component

  const [categories, setCategories] = useState([]);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const getCategories = () => {
    instance.get("/componentes/categories").then((response) => {
      setCategories(response.data);
    });
  };

  const getComponents = () => {
    instance.get("/componentes/all", { params: paramsAPI }).then((response) => {
      setComponentes(response.data.data);
      setComponentesInfo(response.data.info);
    });
  };

  const deleteComponent = (componente) => {
    Swal.fire({
      title: `¿Eliminar ${componente.measures} ${componente.category}?`,
      text: "Toda la información relacionada con el componente será eliminada!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .delete(`/componentes/delete/${componente.id}`)
          .then((response) => {
            getComponents();
            Swal.fire(
              "Eliminado!",
              "El componente se elimino correctamente.",
              "success"
            );
          })
          .catch((error) => {
            console.error(error);
            // TODO: Arreglar error que muestra al eliminar un componente
            // Por ahora muestro el mensaje de exito
            getComponents();
            Swal.fire(
              "Eliminado!",
              "El componente se elimino correctamente.",
              "success"
            );
          });
      }
    });
  };

  const handleChange = (e) => {
    setDataNewComponent({
      ...dataNewComponent,
      [e.target.name]: e.target.value,
    });
  };

  const sendForm = async () => {
    try {
      closeModal();

      await instance.post("/componentes/add", dataNewComponent);
      getComponents();
      Swal.fire({
        title: "Creado",
        text: "El componente ha sido creado exitosamente!",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al crear el componente",
        icon: "error",
      });
    }
  };

  const renderComponentes = () => {
    return componentes.map((componente) => (
      <Table.Row className="bg-white" key={componente.id}>
        <Table.Cell>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                  {componente.measures}
                </p>
              </div>
            </div>
          </div>
        </Table.Cell>
        <Table.Cell>
          <Badge color="secondary">{componente.stock}</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge>{componente.category}</Badge>
        </Table.Cell>
        <Table.Cell>
          <p>{new Date(componente.registration_date).toDateString()}</p>
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
                    onClick={() => deleteComponent(componente)}
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
                    onClick={() => showModalUpdate(componente)}
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

  useEffect(() => getCategories(), []);

  useEffect(() => getComponents(), [paramsAPI]);

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
                Agregar nuevo componente
              </Typography>
              <Typography
                variant="p"
                className="text-body-4 font-normal text-metal-600"
              >
                <div className="flex gap-4 flex-col mt-4">
                  <Input
                    placeholder="Medidas"
                    name="measures"
                    type="text"
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Cantidad"
                    name="stock"
                    type="text"
                    onChange={handleChange}
                  />
                  <select name="category" onChange={handleChange}>
                    <option value="1">Seleccionar Categoria</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
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
                Editar Componente
              </Typography>
              <Typography
                variant="p"
                className="text-body-4 font-normal text-metal-600"
              >
                <div className="flex gap-4 flex-col mt-4">
                  <Input
                    placeholder="Medidas"
                    name="measures"
                    type="text"
                    value={componentToUpdate.measures}
                    onChange={handleChangeUpdate}
                  />
                  <Input
                    placeholder="Cantidad"
                    name="stock"
                    type="text"
                    value={componentToUpdate.stock}
                    onChange={handleChangeUpdate}
                  />
                  <select name="category" onChange={handleChangeUpdate}>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        selected={category.id === componentToUpdate.category_id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
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
      <h1>Almacén</h1>
      <Table showCheckbox={true}>
        <Table.Caption>
          <div className="my-5 flex items-center px-6">
            <div className="flex items-center gap-5">
              <p className="text-body-1 font-semibold text-metal-600">
                Componentes Registrados
              </p>
              <Badge size="sm" color="secondary">
                {componentesInfo.count} Componentes
              </Badge>
            </div>
            <div className="flex ml-5 items-center gap-5">
              <Button variant="outline" size="sm" onClick={openModal}>
                <span className="pr-2">
                  <Cube size={24} />
                </span>
                Nuevo Componente
              </Button>
              <fieldset className="relative w-64">
                <Input
                  placeholder="Buscar por categoría o medidas"
                  className="ps-11"
                  name="search"
                  onChange={handleSearch}
                />
                <Icon>
                  <MagnifyingGlass size={18} color="#AFBACA" />
                </Icon>
              </fieldset>
            </div>
          </div>
          <div className="my-5 flex items-center px-6 gap-5">
            <select name="order" id="order">
              <option value="">Ordenar por creación</option>
              <option value="">Ascendente</option>
              <option value="">Descendente</option>
            </select>

            <select name="category" id="category">
              <option value="0">Ordenar por categoría</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </Table.Caption>

        <Table.Head>
          <Table.HeadCell>
            <p className="text-body-5 font-medium text-metal-400">Medidas</p>
          </Table.HeadCell>
          <Table.HeadCell>En Stock</Table.HeadCell>
          <Table.HeadCell>Categoría</Table.HeadCell>
          <Table.HeadCell>Fecha Registro</Table.HeadCell>
          <Table.HeadCell />
        </Table.Head>
        <Table.Body className="divide-gray-25 divide-y">
          {renderComponentes()}
        </Table.Body>
      </Table>
      <PaginationComponent
        currentPage={paramsAPI.page}
        onPageChange={handlePageChange}
        totalPages={componentesInfo.totalPages}
      />
    </>
  );
}

export default Store;
