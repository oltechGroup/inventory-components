import { CloudArrowUp, Minus, Plus } from "phosphor-react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  NumberInput,
  NumberInputBox,
  NumberInputButton,
} from "keep-react";
import { useEffect, useState } from "react";
import { instance } from "../../../api/instance";
import Swal from "sweetalert2";
import { format } from "@formkit/tempo";

function ModalUpdate({ isActive, onCloseModal, reload, componentToUpdate }) {
  const [componente, setComponente] = useState({
    nombre_generico: "",
    nombre_comercial: "",
    caducidad: "",
    referencia: "",
    lote: "",
    stock: 1,
  });

  const handleChange = (e) => {
    setComponente({
      ...componente,
      [e.target.name]: e.target.value,
    });
  };

  const sendFormUpdate = async () => {
    Swal.fire({
      title: "Actualizando componente",
      text: "Por favor espere...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await instance.put(
        `/componentes/arthrex/update/${componentToUpdate.id}`,
        componente
      );
      Swal.fire({
        icon: "success",
        title: "Componente actualizado",
        text: "El componente se ha actualizado correctamente",
      });
      reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al actualizar el componente",
      });
      reload();
    }
  };

  useEffect(() => {
    if (componentToUpdate) {
      setComponente({
        nombre_generico: componentToUpdate.nombre_generico,
        nombre_comercial: componentToUpdate.nombre_comercial,
        caducidad: componentToUpdate.caducidad,
        referencia: componentToUpdate.referencia,
        lote: componentToUpdate.lote,
        stock: componentToUpdate.stock,
      });
    }
  }, [componentToUpdate]);

  return (
    <Modal isOpen={isActive} onOpenChange={onCloseModal}>
      <ModalBody>
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader className="mb-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-metal-50 dark:bg-metal-800">
              <CloudArrowUp size={28} color="#1B4DFF" />
            </div>
            <ModalTitle>Actualizar Componente</ModalTitle>
            <div className="grid gap-2">
              <div className="flex gap-4">
                <fieldset className="max-w-md space-y-1">
                  <Label htmlFor="nombre_generico">Nombre Genérico</Label>
                  <Input
                    id="nombre_generico"
                    name="nombre_generico"
                    placeholder="Genérico"
                    type="text"
                    onChange={handleChange}
                    value={componente.nombre_generico}
                  />
                </fieldset>
                <fieldset className="max-w-md space-y-1">
                  <Label htmlFor="nombre_comercial">Nombre Comercial</Label>
                  <Input
                    id="nombre_comercial"
                    name="nombre_comercial"
                    placeholder="Comercial"
                    type="text"
                    onChange={handleChange}
                    value={componente.nombre_comercial}
                  />
                </fieldset>
              </div>
              <fieldset className="max-w-md space-y-1">
                <Label htmlFor="caducidad">Caducidad</Label>
                <Input
                  id="caducidad"
                  name="caducidad"
                  type="date"
                  onChange={handleChange}
                  value={format(componente.caducidad, "YYYY-MM-DD")}
                />
              </fieldset>
              <div className="flex gap-4">
                <fieldset className="max-w-md space-y-1">
                  <Label htmlFor="referencia">Referencia</Label>
                  <Input
                    id="referencia"
                    name="referencia"
                    placeholder="Referencia"
                    type="text"
                    onChange={handleChange}
                    value={componente.referencia}
                  />
                </fieldset>
                <fieldset className="max-w-md space-y-1">
                  <Label htmlFor="lote">Lote</Label>
                  <Input
                    id="lote"
                    name="lote"
                    placeholder="Lote"
                    type="text"
                    onChange={handleChange}
                    value={componente.lote}
                  />
                </fieldset>
              </div>
              <fieldset className="space-y-1">
                <Label>Cantidad</Label>
                <NumberInput>
                  <NumberInputButton
                    onClick={() => {
                      setComponente({
                        ...componente,
                        stock:
                          componente.stock - 1 < 1 ? 1 : componente.stock - 1,
                      });
                    }}
                  >
                    <Minus size={16} color="#455468" />
                  </NumberInputButton>
                  <NumberInputBox
                    defaultValue={1}
                    name="stock"
                    id="stock"
                    value={componente.stock}
                    onChange={handleChange}
                  />
                  <NumberInputButton
                    onClick={() => {
                      setComponente({
                        ...componente,
                        stock: componente.stock + 1,
                      });
                    }}
                  >
                    <Plus size={16} color="#455468" />
                  </NumberInputButton>
                </NumberInput>
              </fieldset>
            </div>
          </ModalHeader>
          <ModalFooter>
            <ModalClose asChild>
              <Button size="sm" variant="outline" color="secondary">
                Cancelar
              </Button>
            </ModalClose>
            <Button size="sm" color="primary" onClick={sendFormUpdate}>
              Actualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}

export default ModalUpdate;
