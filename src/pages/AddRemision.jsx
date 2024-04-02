import {
  Button,
  Input,
  Label,
  Modal,
  NumberInput,
  Table,
  Typography,
} from "keep-react";
import {
  ArrowLeft,
  CloudArrowUp,
  Minus,
  Pencil,
  Plus,
  Trash,
} from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/instance";

function AddRemision() {
  const [isOpen, setIsOpen] = useState(false);
  const [componenteToUpdate, setComponenteToUpdate] = useState({});
  const openModal = (componente) => {
    setIsOpen(true);
    console.log(componente);
    setComponenteToUpdate(componente);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

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

  const nav = useNavigate();

  // States for new Remision
  const [dataNewRegister, setDataNewRegister] = useState({
    name: "",
    componentes: [],
  });
  const handleChange = (e) => {
    setDataNewRegister({
      ...dataNewRegister,
      [e.target.name]: e.target.value,
    });
  };
  const insertComponent = (component, quantity) => {
    setDataNewRegister({
      ...dataNewRegister,
      componentes: [
        ...dataNewRegister.componentes,
        {
          ...component,
          quantity: quantity || 1,
        },
      ],
    });
  };
  const removeComponent = (id) => {
    setDataNewRegister({
      ...dataNewRegister,
      componentes: dataNewRegister.componentes.filter((c) => c.id !== id),
    });
  };
  const updateComponent = (id, quantity) => {
    setDataNewRegister({
      ...dataNewRegister,
      componentes: dataNewRegister.componentes.map((c) =>
        c.id === id ? { ...c, quantity } : c
      ),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(dataNewRegister);
  };
  // End states for new Remision

  // States for search component
  const [searchActive, setSearchActive] = useState(false);
  const [searchComponentes, setSearchComponentes] = useState([]);
  const [componenteSelected, setComponenteSelected] = useState({
    componente: {},
    quantity: 0,
    nameInput: "",
  });
  const checkStock = (value, stock) => {
    if (value > stock) {
      return stock;
    } else {
      return value;
    }
  };
  const handleSearch = (e) => {
    setComponenteSelected({
      ...componenteSelected,
      nameInput: e.target.value,
    });
    instance.get(`/componentes/search/${e.target.value}`).then((response) => {
      setSearchComponentes(response.data);
    });
    if (e.target.value === "") {
      setSearchComponentes([]);
    }
  };
  const selectComponente = (componente) => {
    setSearchActive(false);
    setComponenteSelected({
      componente,
      quantity: 1,
      nameInput: `${componente.measures} - ${componente.componentes_categories.name}`,
    });
  };
  const activeSearch = () => {
    setSearchActive(true);
    setComponenteSelected({
      ...componenteSelected,
      nameInput: "",
    });
  };
  const handleQuantity = (e) => {
    setComponenteSelected({
      ...componenteSelected,
      quantity: checkStock(e.target.value, componenteSelected.componente.stock),
    });
  };
  // End states for search component

  return (
    <>
      <div className="flex gap-4 items-center mb-4">
        <button
          className="rounded-full p-2 bg-slate-200"
          onClick={() => nav(-1)}
        >
          <ArrowLeft size={24} />
        </button>
        <h1>Registrar remisión</h1>
      </div>

      <Typography variant="div" className="flex flex-col max-w-lg mx-auto">
        <Typography
          variant="p"
          className="text-body-4 font-normal text-metal-600"
        >
          <div className="flex gap-4 flex-col mt-4">
            <div className="flex gap-4">
              <fieldset className="max-w-md space-y-1 w-full">
                <Label htmlFor="name">Nombre de la remisión</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ingresa un nombre"
                  type="text"
                  onChange={handleChange}
                />
              </fieldset>

              <fieldset className="max-w-md space-y-1 w-full">
                <Label htmlFor="name">Fecha de la remisión</Label>
                <Input
                  id="date_remision"
                  name="date_remision"
                  type="date"
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            <section className="border rounded-xl p-4 flex flex-col gap-2">
              <p className="text-metal-400 text-body-3 font-medium">
                Insetar Componente
              </p>
              <div className="relative z-50">
                <div className="max-w-md space-y-1 w-full">
                  <Label htmlFor="componente">Componente</Label>
                  <Input
                    id="componente"
                    name="componente"
                    placeholder="Escribe una medida o categoría..."
                    type="text"
                    value={componenteSelected.nameInput}
                    onChange={handleSearch}
                    onFocus={activeSearch}
                    autoComplete="off"
                  />
                  {searchActive ? (
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
                              onClick={() => selectComponente(componente)}
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
                  ) : null}
                </div>
              </div>

              <fieldset className="space-y-1">
                <Label>Cantidad</Label>
                <NumberInput>
                  <NumberInput.Button
                    onClick={() => {
                      if (componenteSelected.quantity > 1) {
                        setComponenteSelected({
                          ...componenteSelected,
                          quantity: componenteSelected.quantity - 1,
                        });
                      }
                    }}
                  >
                    <Minus size={16} color="#455468" />
                  </NumberInput.Button>
                  <NumberInput.Input
                    value={componenteSelected.quantity}
                    onChange={handleQuantity}
                  />
                  <NumberInput.Button
                    onClick={() => {
                      if (
                        componenteSelected.quantity <
                        componenteSelected.componente.stock
                      ) {
                        setComponenteSelected({
                          ...componenteSelected,
                          quantity: componenteSelected.quantity + 1,
                        });
                      }
                    }}
                  >
                    <Plus size={16} color="#455468" />
                  </NumberInput.Button>
                </NumberInput>
                <p className="text-body-4 font-normal text-metal-600">
                  La cantidad no puede ser mayor a{" "}
                  {componenteSelected.componente?.stock}
                </p>
              </fieldset>

              <Button
                color="success"
                size="sm"
                className="self-end"
                disabled={componenteSelected.quantity === 0}
                onClick={() => {
                  insertComponent(
                    componenteSelected.componente,
                    componenteSelected.quantity
                  );
                  setComponenteSelected({
                    componente: {},
                    quantity: 0,
                    nameInput: "",
                  });
                }}
              >
                Insertar
              </Button>
            </section>

            {dataNewRegister.componentes.length > 0 && (
              <>
                <p className="text-metal-400 text-body-3 font-medium">
                  Componentes a remisión
                </p>
                <Table>
                  <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>Medidas</Table.HeadCell>
                    <Table.HeadCell>Categoría</Table.HeadCell>
                    <Table.HeadCell>Cantidad</Table.HeadCell>
                    <Table.HeadCell />
                  </Table.Head>
                  <Table.Body className="divide-gray-25 divide-y">
                    {dataNewRegister.componentes.map((componente, index) => (
                      <Table.Row className="bg-white">
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{componente.measures}</Table.Cell>
                        <Table.Cell>
                          {componente.componentes_categories.name}
                        </Table.Cell>
                        <Table.Cell>{componente.quantity}</Table.Cell>
                        <Table.Cell className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            shape="circle"
                            onClick={() => openModal(componente)}
                          >
                            <Pencil size={15} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            shape="circle"
                            onClick={() => removeComponent(componente.id)}
                          >
                            <Trash size={15} />
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </>
            )}
          </div>
        </Typography>
        {dataNewRegister.componentes.length > 0 && (
          <div className="flex gap-2 self-end mt-4">
            <Button
              size="sm"
              variant="outline"
              color="secondary"
              onClick={() => nav(-1)}
            >
              Cancelar
            </Button>
            <Button size="sm" color="primary" onClick={handleSubmit}>
              Registrar Remisión
            </Button>
          </div>
        )}
      </Typography>

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
                Actualizar Cantidad
              </Typography>
              <fieldset className="space-y-1">
                <h3>
                  {componenteToUpdate.measures} -{" "}
                  {componenteToUpdate.componentes_categories?.name}
                </h3>
                <Label>Cantidad</Label>
                <NumberInput>
                  <NumberInput.Button
                    onClick={() => {
                      if (componenteToUpdate.quantity > 1) {
                        setComponenteToUpdate({
                          ...componenteToUpdate,
                          quantity: componenteToUpdate.quantity - 1,
                        });
                      }
                    }}
                  >
                    <Minus size={16} color="#455468" />
                  </NumberInput.Button>
                  <NumberInput.Input
                    value={componenteToUpdate.quantity}
                    onChange={(e) => {
                      setComponenteToUpdate({
                        ...componenteToUpdate,
                        quantity: checkStock(
                          e.target.value,
                          componenteToUpdate.stock
                        ),
                      });
                    }}
                  />
                  <NumberInput.Button
                    onClick={() => {
                      if (
                        componenteToUpdate.quantity < componenteToUpdate.stock
                      ) {
                        setComponenteToUpdate({
                          ...componenteToUpdate,
                          quantity: componenteToUpdate.quantity + 1,
                        });
                      }
                    }}
                  >
                    <Plus size={16} color="#455468" />
                  </NumberInput.Button>
                </NumberInput>
                <p className="text-body-4 font-normal text-metal-600">
                  La cantidad no puede ser mayor a {componenteToUpdate.stock}
                </p>
              </fieldset>
            </Typography>
          </Modal.Content>
          <Modal.Footer className="">
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
                closeModal();
                updateComponent(
                  componenteToUpdate.id,
                  componenteToUpdate.quantity
                );
              }}
              size="sm"
              color="primary"
            >
              Actualizar
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddRemision;
