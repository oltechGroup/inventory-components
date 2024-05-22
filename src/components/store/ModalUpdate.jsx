import {
  Button,
  Modal,
  Typography,
  Input,
  Label,
  NumberInput,
} from "keep-react";
import { CloudArrowUp, Minus, Plus } from "phosphor-react";

import { useEffect, useState } from "react";

import { instance } from "../../api/instance";
import { useStore } from "../../context/StoreProvider";

function ModalUpdate({ isOpen, componentToUpdate, closeModal }) {
  const [categories, setCategories] = useState([]);
  const { updateComponent } = useStore();
  const [componentUpdateState, setComponentUpdateState] = useState({});

  const getCategories = () => {
    instance.get("/componentes/categories").then((response) => {
      setCategories(response.data);
    });
  };

  const handleChangeUpdate = (e) => {
    setComponentUpdateState({
      ...componentToUpdate,
      [e.target.name]: e.target.value,
    });
  };
  const sendFormUpdate = async () => {
    closeModal();
    await updateComponent({
      id: componentUpdateState.id,
      measures: componentUpdateState.measures,
      category_id: componentUpdateState.category,
      stock: componentUpdateState.stock,
      lote: componentUpdateState.lote,
      caducidad: componentUpdateState.caducidad,
    });
  };
  // End states for update component

  useEffect(() => {
    getCategories();
    setComponentUpdateState({
      id: componentToUpdate.id,
      measures: componentToUpdate.measures,
      category: componentToUpdate.category_id,
      stock: componentToUpdate.stock,
      lote: componentToUpdate.lote,
      caducidad: componentToUpdate.caducidad,
    });
  }, [componentToUpdate]);

  return (
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
              Editar Componente
            </Typography>
            <Typography
              variant="p"
              className="text-body-4 font-normal text-metal-600"
            >
              <fieldset className="flex flex-col max-w-md space-y-1">
                <Label htmlFor="category">Categoría</Label>
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
              </fieldset>
              <div className="flex gap-4 flex-col mt-4">
                <div className="flex gap-2">
                  <fieldset className="max-w-md space-y-1">
                    <Label htmlFor="measures">Medidas</Label>
                    <Input
                      placeholder="Actualizar medidas"
                      id="measures"
                      name="measures"
                      type="text"
                      value={componentUpdateState.measures}
                      onChange={handleChangeUpdate}
                    />
                  </fieldset>
                  <fieldset className="max-w-md space-y-1">
                    <Label htmlFor="lote">Lote</Label>
                    <Input
                      placeholder="Actualizar lote"
                      id="lote"
                      name="lote"
                      type="text"
                      value={componentUpdateState.lote}
                      onChange={handleChangeUpdate}
                    />
                  </fieldset>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="caducidad">Fecha de Caducidad</Label>
                  <input
                    type="date"
                    name="caducidad"
                    // value={formatDateInput(componentUpdateState.caducidad)}
                    onChange={handleChangeUpdate}
                  />
                </div>

                <fieldset className="max-w-md space-y-1">
                  <Label htmlFor="stock">Cantidad</Label>
                  <NumberInput>
                    <NumberInput.Button
                      onClick={() =>
                        setComponentUpdateState({
                          ...componentUpdateState,
                          stock: componentUpdateState.stock - 1,
                        })
                      }
                    >
                      <Minus size={16} color="#455468" />
                    </NumberInput.Button>
                    <NumberInput.Input
                      defaultValue={0}
                      name="stock"
                      type="number"
                      value={componentUpdateState.stock}
                      onChange={handleChangeUpdate}
                    />
                    <NumberInput.Button
                      onClick={() =>
                        setComponentUpdateState({
                          ...componentUpdateState,
                          stock: componentUpdateState.stock + 1,
                        })
                      }
                    >
                      <Plus size={16} color="#455468" />
                    </NumberInput.Button>
                  </NumberInput>
                </fieldset>
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
          <Button
            type="submit"
            onClick={sendFormUpdate}
            size="sm"
            color="primary"
          >
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}

export default ModalUpdate;
