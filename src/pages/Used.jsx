import {
  Avatar,
  Badge,
  Button,
  Popover,
  Table,
  Modal,
  Typography,
  DatePicker,
  Input,
  Dropdown,
  Icon,
  Label,
  NumberInput,
  Spinner,
} from "keep-react";
import {
  ArrowDown,
  Cube,
  DotsThreeOutline,
  Pencil,
  Trash,
  CloudArrowUp,
  MagnifyingGlass,
  Minus,
  Plus,
} from "phosphor-react";

import { useEffect, useRef, useState } from "react";
import { instance } from "../api/instance";

import Swal from "sweetalert2";
import PaginationComponent from "../components/Pagination";
import { SkeletonTable } from "../components/SkeletonTable";

const BadgeComponent = ({ children }) => {
  return (
    <div className="bg-primary-50 px-3 rounded-2xl max-w-max">
      <p className="font-semibold text-primary-500 text-body-5">{children}</p>
    </div>
  );
};

function Used() {
  const [loading, setLoading] = useState(true);
  const [sendingForm, setSendingForm] = useState(false);

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
  const handleSearchTable = (e) => {
    setParamsAPI({ ...paramsAPI, search: e.target.value });
  };

  const [dataNewRegister, setDataNewRegister] = useState({
    componente: "",
    hospital: "",
    patient: "",
    quantity: 1,
    used_date: new Date(),
  });

  // states for update component
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [componentToUpdate, setComponentToUpdate] = useState({
    componente: "",
    hospital: "",
    patient: "",
    quantity: "",
    used_date: "",
    quantityOriginalUsed: "",
  });
  const showModalUpdate = (component) => {
    setComponentToUpdate({
      ...component,
      category: component.category_id,
      hospital: component.hospitals.id,
      quantityOriginalUsed: component.quantity,
    });
    setModalUpdateOpen(true);
  };
  const closeModalUpdate = () => {
    setComponentToUpdate({});
    setModalUpdateOpen(false);
  };
  const handleChangeUpdate = (e) => {
    console.log(e.target.name);
    setComponentToUpdate({
      ...componentToUpdate,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "quantityUpdate") {
      setComponentToUpdate({
        ...componentToUpdate,
        quantity: checkStockUpdate(e.target.value),
      });
    }
  };
  const sendFormUpdate = async () => {
    setSendingForm(true);
    try {
      await instance.put(`/componentes/used/${componentToUpdate.id}`, {
        used_date: componentToUpdate.used_date,
        quantity: parseInt(componentToUpdate.quantity),
        patient: componentToUpdate.patient,
        hospital_id: parseInt(componentToUpdate.hospital),
      });
      getComponentes();
      closeModalUpdate();
      Swal.fire({
        title: "Actualizado",
        text: "El componente ha sido actualizado exitosamente!",
        icon: "success",
      });
      setSendingForm(false);
    } catch (error) {
      setSendingForm(false);
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al actualizar el componente",
        icon: "error",
      });
    }
  };
  // End states for update component

  // States for search component
  const refTableComponentes = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        refTableComponentes.current &&
        !refTableComponentes.current.contains(e.target)
      ) {
        setSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [searchComponentes, setSearchComponentes] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const handleSearch = (e) => {
    setDataNewRegister({
      ...dataNewRegister,
      nameComponente: e.target.value,
    });
    instance.get(`/componentes/search/${e.target.value}`).then((response) => {
      setSearchComponentes(response.data);
    });
    if (e.target.value === "") {
      setSearchComponentes([]);
    }
  };
  const selectComponent = (componente) => {
    setSearchActive(false);
    setSearchComponentes([]);
    setDataNewRegister({
      ...dataNewRegister,
      componente: componente.id,
      nameComponente: `${componente.measures} - ${componente.componentes_categories.name}, ${componente.stock} disponibles`,
      stock: componente.stock,
    });
  };
  const activeSearch = () => {
    setSearchActive(true);
    setSearchComponentes([]);
    setDataNewRegister({
      ...dataNewRegister,
      nameComponente: "",
    });
  };

  const [componentes, setComponentes] = useState([]);
  const [componentesInfo, setComponentesInfo] = useState({});
  const getComponentes = () => {
    setLoading(true);
    instance
      .get("/componentes/used", { params: paramsAPI })
      .then((response) => {
        setComponentes(response.data.data);
        setComponentesInfo(response.data.info);
      })
      .finally(() => setLoading(false));
  };

  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    instance.get("/componentes/categories").then((response) => {
      setCategories(response.data);
    });
  };

  const [selectHospitals, setSelectHospitals] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const getHospitalsSelect = () => {
    instance.get("/hospitals/select").then((response) => {
      setSelectHospitals(response.data);
    });
  };

  const checkStock = (value) => {
    if (value > dataNewRegister.stock) {
      return dataNewRegister.stock;
    } else {
      return value;
    }
  };

  const checkStockUpdate = (value) => {
    if (
      value >
      componentToUpdate.componentes?.stock +
        componentToUpdate.quantityOriginalUsed
    ) {
      return (
        componentToUpdate.componentes?.stock +
        componentToUpdate.quantityOriginalUsed
      );
    }
    return value;
  };

  const handleChange = (e) => {
    setDataNewRegister({
      ...dataNewRegister,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "quantity") {
      setDataNewRegister({
        ...dataNewRegister,
        quantity: checkStock(e.target.value),
      });
    }
  };

  const deleteComponent = (componente) => {
    Swal.fire({
      title: `Deseas eliminar el consumo de ${componente.componentes.componentes_categories.name} - ${componente.componentes.measures}?`,
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
          .delete(`/componentes/used/${componente.id}`)
          .then((response) => {
            getComponentes();
            Swal.fire(
              "Eliminado!",
              "El componente se elimino correctamente.",
              "success"
            );
          })
          .catch((error) => {
            console.error(error);
            getComponentes();
            Swal.fire({
              title: "Error",
              text: "Ha ocurrido un error al eliminar el componente",
              icon: "error",
            });
          });
      }
    });
  };

  const renderComponentes = () => {
    return componentes.map((componente) => (
      <Table.Row className="bg-white" key={componente.id}>
        <Table.Cell>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                  {componente.componentes.measures}
                </p>
              </div>
            </div>
          </div>
        </Table.Cell>
        <Table.Cell>
          <Badge color="secondary">{componente?.quantity}</Badge>
        </Table.Cell>
        <Table.Cell>
          <BadgeComponent>
            {(componente?.componentes?.componentes_categories?.name).toUpperCase()}
          </BadgeComponent>
        </Table.Cell>
        <Table.Cell>
          <BadgeComponent>
            {componente?.hospitals?.name
              ? componente.hospitals.name
              : "No Aplica"}
          </BadgeComponent>
        </Table.Cell>
        <Table.Cell>
          <p>{componente?.patient}</p>
        </Table.Cell>
        <Table.Cell>
          <p>{new Date(componente?.used_date).toLocaleDateString()}</p>
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

  const sendNewRegister = async () => {
    try {
      await instance.post("/componentes/add/used", {
        componente_id: dataNewRegister.componente,
        hospital_id: parseInt(dataNewRegister.hospital),
        patient: dataNewRegister.patient,
        quantity: parseInt(dataNewRegister.quantity),
        used_date: dataNewRegister.used_date,
      });
      getComponentes();

      closeModal();
      Swal.fire({
        title: "Registrado",
        text: "El consumo se ha registrado exitosamente!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al registrar el consumo!",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getHospitalsSelect();
    getCategories();
  }, []);

  useEffect(() => {
    getComponentes();
    window.scrollTo(0, 0);
  }, [paramsAPI]);

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
                Registrar uso de componentes
              </Typography>
              <Typography
                variant="p"
                className="text-body-4 font-normal text-metal-600"
              >
                <div className="flex gap-4 flex-col mt-4 relative">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="used_date">Fecha de uso</Label>
                    <input
                      autoComplete="off"
                      type="date"
                      name="used_date"
                      // value={formatDateInput(dataNewRegister.used_date)}
                      onChange={handleChange}
                    />
                  </div>

                  <div></div>
                  <fieldset className="flex flex-col max-w-md space-y-1">
                    <Label htmlFor="category">Hospital</Label>
                    <select
                      name="hospital"
                      id="hospital"
                      onChange={handleChange}
                    >
                      <option value="Categoria">Seleccionar Hospital</option>
                      {selectHospitals.map((hospital) => (
                        <option value={hospital.id} key={hospital.id}>
                          {hospital.name}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  <div className="max-w-md space-y-1 w-full">
                    <Label htmlFor="componente">Componente</Label>
                    <Input
                      autoComplete="off"
                      placeholder="Buscar por medida o categoria..."
                      type="text"
                      value={dataNewRegister.nameComponente}
                      onChange={handleSearch}
                      onFocus={() => activeSearch()}
                    />
                    {searchActive && (
                      <div
                        ref={refTableComponentes}
                        className="border rounded-lg absolute w-full"
                      >
                        <Table>
                          <Table.Head>
                            <Table.HeadCell>Medidas</Table.HeadCell>
                            <Table.HeadCell>Categoría</Table.HeadCell>
                            <Table.HeadCell>Lote</Table.HeadCell>
                            <Table.HeadCell>Caducidad</Table.HeadCell>
                            <Table.HeadCell>Stock</Table.HeadCell>
                          </Table.Head>

                          <Table.Body className="divide-gray-25 divide-y">
                            {searchComponentes.map((componente) => (
                              <Table.Row
                                key={componente.id}
                                className="bg-white hover:bg-slate-100 cursor-pointer"
                                onClick={() => selectComponent(componente)}
                              >
                                <Table.Cell>{componente.measures}</Table.Cell>
                                <Table.Cell>
                                  {componente.componentes_categories.name}
                                </Table.Cell>
                                <Table.Cell>{componente.lote}</Table.Cell>
                                <Table.Cell>
                                  {new Date(
                                    componente.caducidad
                                  ).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>{componente.stock}</Table.Cell>
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table>
                      </div>
                    )}
                  </div>
                  {dataNewRegister.stock && (
                    <fieldset className="space-y-1">
                      <Label>Cantidad Utilizada</Label>
                      <NumberInput>
                        <NumberInput.Button
                          onClick={() =>
                            setDataNewRegister({
                              ...dataNewRegister,
                              quantity:
                                dataNewRegister.quantity - 1 < 1
                                  ? 1
                                  : dataNewRegister.quantity - 1,
                            })
                          }
                        >
                          <Minus size={16} color="#455468" />
                        </NumberInput.Button>
                        <NumberInput.Input
                          onChange={handleChange}
                          defaultValue={dataNewRegister.quantity}
                          value={dataNewRegister.quantity}
                          name="quantity"
                          id="quantity"
                          max={dataNewRegister.stock}
                          min={1}
                          maxLength={dataNewRegister.stock}
                          minLength={1}
                        />
                        <NumberInput.Button
                          onClick={() =>
                            setDataNewRegister({
                              ...dataNewRegister,
                              quantity:
                                dataNewRegister.quantity + 1 >
                                dataNewRegister.stock
                                  ? dataNewRegister.stock
                                  : dataNewRegister.quantity + 1,
                            })
                          }
                        >
                          <Plus size={16} color="#455468" />
                        </NumberInput.Button>
                      </NumberInput>
                    </fieldset>
                  )}
                  <Input
                    autoComplete="off"
                    placeholder="Nombre del Paciente"
                    type="text"
                    name="patient"
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
            {sendingForm ? (
              <Button size="sm">
                <span className="pr-2">
                  <Spinner color="info" size="sm" />
                </span>
                Agregando...
              </Button>
            ) : (
              <Button size="sm" color="primary" onClick={sendNewRegister}>
                Confirmar
              </Button>
            )}
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
                Actualizar consumo
              </Typography>
              <Typography
                variant="p"
                className="text-body-4 font-normal text-metal-600"
              >
                <div className="flex gap-4 flex-col mt-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="used_date">Fecha de uso</Label>
                    <input
                      type="date"
                      name="used_date"
                      // value={formatDateInput(dataNewRegister.used_date)}
                      onChange={handleChangeUpdate}
                    />
                  </div>

                  <fieldset className="space-y-1">
                    <Label>Cantidad Utilizada</Label>
                    <NumberInput>
                      <NumberInput.Button
                        onClick={() =>
                          setComponentToUpdate({
                            ...componentToUpdate,
                            quantity:
                              componentToUpdate.quantity - 1 < 1
                                ? 1
                                : componentToUpdate.quantity - 1,
                          })
                        }
                      >
                        <Minus size={16} color="#455468" />
                      </NumberInput.Button>
                      <NumberInput.Input
                        onChange={handleChangeUpdate}
                        defaultValue={componentToUpdate.quantity}
                        value={componentToUpdate.quantity}
                        name="quantityUpdate"
                        id="quantityUpdate"
                      />
                      <NumberInput.Button
                        onClick={() => {
                          setComponentToUpdate({
                            ...componentToUpdate,
                            quantity: checkStockUpdate(
                              componentToUpdate.quantity + 1
                            ),
                          });
                        }}
                      >
                        <Plus size={16} color="#455468" />
                      </NumberInput.Button>
                    </NumberInput>
                    <p className="text-body-4 font-normal text-metal-600">
                      Stock restante de{" "}
                      {
                        componentToUpdate.componentes?.componentes_categories
                          ?.name
                      }{" "}
                      {componentToUpdate.componentes?.measures}
                      {" - "}
                      {componentToUpdate.componentes?.stock} unidades
                    </p>
                  </fieldset>

                  <fieldset className="space-y-1 flex flex-col">
                    <Label>Hospital</Label>
                    <select
                      name="hospital"
                      id="hospital"
                      value={componentToUpdate.hospital}
                      onChange={handleChangeUpdate}
                    >
                      <option value="Categoria">Seleccionar Hospital</option>
                      {selectHospitals.map((hospital) => (
                        <option value={hospital.id} key={hospital.id}>
                          {hospital.name}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  <fieldset className="max-w-md space-y-1">
                    <Label htmlFor="patient">Paciente</Label>
                    <Input
                      placeholder="Actualizar paciente"
                      type="text"
                      name="patient"
                      value={componentToUpdate.patient}
                      onChange={handleChangeUpdate}
                    />
                  </fieldset>
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
            <Button onClick={sendFormUpdate} size="sm" color="primary">
              Actualizar
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>

      <h1>Cosumo</h1>

      <Table>
        <Table.Caption>
          <div className="my-5 flex items-center px-6">
            <div className="flex items-center gap-5">
              <p className="text-body-1 font-semibold text-metal-600">
                Componentes consumidos
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
                Nuevo registro
              </Button>
              <fieldset className="relative w-64">
                <Input
                  placeholder="Buscar categoría, medidas, paciente, hospital..."
                  className="ps-11"
                  name="search"
                  onChange={handleSearchTable}
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

        {loading ? (
          <SkeletonTable />
        ) : (
          <>
            <Table.Head>
              <Table.HeadCell>
                <p className="text-body-5 font-medium text-metal-400">
                  Medidas
                </p>
              </Table.HeadCell>
              <Table.HeadCell>Cantidad</Table.HeadCell>
              <Table.HeadCell>Categoría</Table.HeadCell>
              <Table.HeadCell>Hospital</Table.HeadCell>
              <Table.HeadCell>Paciente</Table.HeadCell>
              <Table.HeadCell>Fecha Consumo</Table.HeadCell>
              <Table.HeadCell />
            </Table.Head>
            <Table.Body className="divide-gray-25 divide-y">
              {renderComponentes()}
            </Table.Body>
          </>
        )}
      </Table>
      <PaginationComponent
        currentPage={paramsAPI.page}
        onChange={handlePageChange}
        pages={componentesInfo.totalPages}
      />
    </>
  );
}

export default Used;
