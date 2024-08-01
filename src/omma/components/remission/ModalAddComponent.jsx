import { Button, Input, Label, Modal, NumberInput, Table } from "keep-react";
import { CloudArrowUp, Minus, Plus } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { instance } from "../../api/instance";
import { checkStock } from "../../pages/AddRemision";

function ModalAddComponent({ isOpen, closeModal, idRemission }) {
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

  // States for search component
  const [searchActive, setSearchActive] = useState(false);
  const [searchComponentes, setSearchComponentes] = useState([]);
  const [componenteSelected, setComponenteSelected] = useState({
    componente: {},
    quantity: 0,
    nameInput: "",
  });
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

  const sendFormAddComponent = () => {
    const data = {
      quantity: componenteSelected.quantity,
      id: componenteSelected.componente.id,
    };

    instance
      .post(`/componentes/add/component-remission/${idRemission}`, data)
      .then((response) => {
        closeModal();
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Body className="space-y-3 w-2/4">
        <Modal.Icon>
          <CloudArrowUp size={28} color="#1B4DFF" />
        </Modal.Icon>
        <Modal.Content>
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
        </Modal.Content>
        <Modal.Footer>
          <Button
            onClick={closeModal}
            size="sm"
            variant="outline"
            color="secondary"
          >
            Cancelar
          </Button>
          <Button onClick={sendFormAddComponent} size="sm" color="primary">
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAddComponent;
