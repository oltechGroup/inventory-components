import {
  Button,
  Modal,
  Input,
  Label,
  NumberInput,
  Spinner,
} from "keep-react";
import { CloudArrowUp, Minus, Plus } from "phosphor-react";

import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { instance } from "../../api/instance";
import { useNavigate } from "react-router-dom";

function ModalAdd({ active, disactiveModal }) {
  const nav = useNavigate();
  const [sending, setSending] = useState(false);

  const [dataNewComponent, setDataNewComponent] = useState({
    measures: "",
    category: "",
    category_name: "",
    stock: 0,
    lote: "",
    caducidad: "",
  });

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setDataNewComponent({
      ...dataNewComponent,
      [e.target.name]: e.target.value,
    });
  };

  const getCategories = () => {
    instance.get("/componentes/categories").then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  };

  const sendForm = async () => {
    const nameCategory = categories.filter(
      (category) => category.id === dataNewComponent.category
    )[0].name;
    try {
      setSending(true);
      await instance.post("/componentes/add", {
        measures: dataNewComponent.measures,
        category: dataNewComponent.category,
        stock: parseInt(dataNewComponent.stock),
        lote: dataNewComponent.lote,
        caducidad: dataNewComponent.caducidad,
      });

      setSending(false);
      
      Swal.fire({
        title: "Creado",
        text: "El componente ha sido creado exitosamente!",
        icon: "success",
      });
      
      disactiveModal();
      nav(`/store/${nameCategory.split(" ")[0]}/${nameCategory}`);
    } catch (error) {
      setSending(false);
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al crear el componente",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Modal isOpen={active} onClose={disactiveModal}>
      <Modal.Body className="space-y-3">
        <Modal.Icon>
          <CloudArrowUp size={28} color="#1B4DFF" />
        </Modal.Icon>
        <Modal.Content>
          <div className="!mb-6">
            <h3
              className="mb-2 text-body-1 font-medium text-metal-900"
            >
              Agregar nuevo componente
            </h3>
            <p
              className="text-body-4 font-normal text-metal-600"
            >
              <div className="flex gap-4 flex-col mt-4">
                <select name="category" onChange={handleChange}>
                  <option value="1">Seleccionar Categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="flex gap-4">
                  <Input
                    placeholder="Medidas"
                    name="measures"
                    type="text"
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Lote"
                    name="lote"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="caducidad">Fecha de Caducidad</Label>
                  <input type="date" name="caducidad" onChange={handleChange} />
                </div>
                <fieldset className="max-w-md space-y-1">
                  <Label htmlFor="stock">Cantidad</Label>
                  <NumberInput>
                    <NumberInput.Button
                      onClick={() =>
                        setDataNewComponent({
                          ...dataNewComponent,
                          stock: dataNewComponent.stock - 1,
                        })
                      }
                    >
                      <Minus size={16} color="#455468" />
                    </NumberInput.Button>
                    <NumberInput.Input
                      defaultValue={0}
                      name="stock"
                      type="number"
                      value={dataNewComponent.stock}
                      onChange={handleChange}
                    />
                    <NumberInput.Button
                      onClick={() =>
                        setDataNewComponent({
                          ...dataNewComponent,
                          stock: dataNewComponent.stock + 1,
                        })
                      }
                    >
                      <Plus size={16} color="#455468" />
                    </NumberInput.Button>
                  </NumberInput>
                </fieldset>
              </div>
            </p>
          </div>
        </Modal.Content>
        <Modal.Footer className="flex flex-row justify-end">
          <Button
            onClick={disactiveModal}
            size="sm"
            variant="outline"
            color="secondary"
          >
            Cancelar
          </Button>
          {sending ? (
            <Button size="xs">
              <span className="pr-2">
                <Spinner color="info" size="md" />
              </span>
              Loading...
            </Button>
          ) : (
            <Button type="submit" onClick={sendForm} size="sm" color="primary">
              Confirmar
            </Button>
          )}
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAdd;
