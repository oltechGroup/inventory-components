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

import { useEffect, useState } from "react";
import { instance } from "../api/instance";

import Swal from "sweetalert2";
import PaginationComponent from "../components/Pagination";

function Used() {
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
    registration_date: new Date(),
  });

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
      nameComponente: `${componente.measures} - ${componente.category}, ${componente.stock} disponibles`,
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
    instance
      .get("/componentes/all/used", { params: paramsAPI })
      .then((response) => {
        setComponentes(response.data.data);
        setComponentesInfo(response.data.info);
      });
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
    instance.get("/hospitals/selects").then((response) => {
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
          <Badge color="secondary">{componente.quantity}</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge>{componente.category}</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge>{componente.hospital}</Badge>
        </Table.Cell>
        <Table.Cell>
          <p>{componente.patient}</p>
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

  const sendNewRegister = async () => {
    try {
      await instance.post("/componentes/add/used", {
        componente_id: dataNewRegister.componente,
        hospital_id: dataNewRegister.hospital,
        patient: dataNewRegister.patient,
        quantity: dataNewRegister.quantity,
        registration_date: dataNewRegister.registration_date,
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
                <div className="flex gap-4 flex-col mt-4">
                  <DatePicker
                    name="date"
                    singleDate={handleChange}
                    placeholder="Date / Month / Year"
                  >
                    <DatePicker.SingleDate />
                  </DatePicker>
                  <div>
                    <Input
                      placeholder="Buscar por medida o categoria..."
                      type="text"
                      value={dataNewRegister.nameComponente}
                      onChange={handleSearch}
                      onFocus={() => activeSearch()}
                    />
                    {searchActive && (
                      <div className="absolute bg-slate-100 shadow-sm z-10 rounded p-3 border-blue-100">
                        <p>Escribe una medida o categoría...</p>
                        {searchComponentes.map((componente) => (
                          <div
                            key={componente.id}
                            className="p-2 border-b border-gray-200 cursor-pointer hover:bg-slate-200 rounded"
                            onClick={() => selectComponent(componente)}
                          >
                            <div className="flex gap-2">
                              <p>{componente.measures}</p>
                              <p>{componente.category}</p>
                              <p>Lote: {componente.lote}</p>
                              <p>
                                Caducidad:{" "}
                                {new Date(
                                  componente.caducidad
                                ).toLocaleDateString()}
                              </p>
                              <p>Stock: {componente.stock}</p>
                            </div>
                          </div>
                        ))}
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
                      {/* <p className="text-body-4 font-normal text-metal-600">
                        La cantidad maximá es de {dataNewRegister.stock}
                      </p> */}
                    </fieldset>
                  )}
                  <select name="hospital" id="hospital" onChange={handleChange}>
                    <option value="Categoria">Seleccionar Hospital</option>
                    {selectHospitals.map((hospital) => (
                      <option value={hospital.id} key={hospital.id}>
                        {hospital.name}
                      </option>
                    ))}
                  </select>
                  <Input
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
            <Button onClick={sendNewRegister} size="sm" color="primary">
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <h1>Cosumo</h1>
      <Table showCheckbox={true}>
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

        <Table.Head>
          <Table.HeadCell>
            <p className="text-body-5 font-medium text-metal-400">Medidas</p>
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
