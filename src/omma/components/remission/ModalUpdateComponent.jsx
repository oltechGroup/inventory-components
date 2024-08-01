import { Button, Label, Modal, NumberInput } from "keep-react";
import { CloudArrowUp, Minus, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { checkStock } from "../../../pages/AddRemision";
import { instance } from "../../../api/instance";
import Swal from "sweetalert2";

function ModalUpdateComponent({ isOpen, closeModal, component }) {
  const [componenteToUpdate, setComponenteToUpdate] = useState({});

  const updateComponent = (id, quantity) => {
    instance.put(`/componentes/update/component-remission/${id}`, {
      quantity: quantity,
    }).then(() => {
      Swal.fire({
        title: "Actualizado",
        text: "Se actualizó la cantidad del componente",
        icon: "success",
      });
      closeModal();
    });
  };

  useEffect(() => {
    setComponenteToUpdate(component);
  }, [component]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Body className="space-y-3">
        <Modal.Icon>
          <CloudArrowUp size={28} color="#1B4DFF" />
        </Modal.Icon>
        <Modal.Content>
          <div className="!mb-6">
            <h3 className="mb-2 text-body-1 font-medium text-metal-900"
            >
              Actualizar Cantidad
            </h3>
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
                        component.stock + component.quantity
                      ),
                    });
                  }}
                />
                <NumberInput.Button
                  onClick={() => {
                    if (
                      componenteToUpdate.quantity < component.stock + component.quantity
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
                La cantidad no puede ser mayor a {component.stock + component.quantity}
              </p>
            </fieldset>
          </div>
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
          <Button
            onClick={() => {
              closeModal();
              updateComponent(
                componenteToUpdate.idComponentRemission,
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
  );
}

export default ModalUpdateComponent;
