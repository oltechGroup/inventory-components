import { CloudArrowUp } from "phosphor-react";
import { Button, Input, Label, Modal } from "keep-react";
import { useEffect, useState } from "react";
import { formatDateForInput } from "../../utils/dateFunctions";
import { instance } from "../../api/instance";
import Swal from "sweetalert2";

function ModalUpdateDetails({ isOpen, closeModal, remission }) {
  const [selectHospitals, setSelectHospitals] = useState([]);
  const [remissionToUpdate, setRemissionToUpdate] = useState(remission);

  const handleChange = (e) => {
    setRemissionToUpdate({
      ...remissionToUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const getHospitalsSelect = () => {
    instance.get("/hospitals/select").then((response) => {
      setSelectHospitals(response.data);
    });
  };

  const sendFormUpdate = () => {
    // Obtenemos solo los campos que se modificaron
    const dataToUpdate = Object.keys(remissionToUpdate).reduce((acc, key) => {
      if (remissionToUpdate[key] !== remission[key]) {
        acc[key] = remissionToUpdate[key];
      }
      return acc;
    }, {});

    instance
      .put(
        `componentes/update/details-remission/${remissionToUpdate.id}`,
        dataToUpdate
      )
      .then((response) => {
        Swal.fire({
          title: "Actualizado",
          text: "El componente ha sido actualizado exitosamente!",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error al actualizar la remisión",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .finally(() => {
        closeModal();
      });
  };

  useEffect(() => {
    getHospitalsSelect();
  }, []);

  useEffect(() => {
    setRemissionToUpdate(remission);
  }, [remission]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Body className="space-y-3 w-max">
        <Modal.Icon>
          <CloudArrowUp size={28} color="#1B4DFF" />
        </Modal.Icon>
        <Modal.Content className="flex flex-col gap-4">
          <div className="flex gap-4">
            <fieldset className="max-w-md space-y-1 w-full">
              <Label htmlFor="name">Nombre de la remisión *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nuevo nombre de la remisión"
                type="text"
                value={remissionToUpdate.name}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="max-w-md space-y-1 w-full">
              <Label htmlFor="date_remission">Fecha de la remisión *</Label>
              <Input
                id="date_remission"
                name="date_remission"
                type="date"
                value={formatDateForInput(remissionToUpdate.date_remission)}
                onChange={handleChange}
              />
            </fieldset>
          </div>

          <fieldset className="max-w-md space-y-1 w-full">
            <Label htmlFor="client">Cliente</Label>
            <Input
              id="client"
              name="client"
              placeholder="Ingresa el cliente"
              type="text"
              value={remissionToUpdate.client}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset className="max-w-md space-y-1 w-full flex flex-col">
            <Label htmlFor="hospital_id">Hospital</Label>
            <select name="hospital_id" id="hospital_id" onChange={handleChange}>
              {selectHospitals.map((hospital) => (
                <option
                  value={hospital.id}
                  key={hospital.id}
                  selected={hospital.id === remissionToUpdate.hospital_id}
                >
                  {hospital.name}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="max-w-md space-y-1 w-full">
            <Label htmlFor="encargado">Encargado de almacén</Label>
            <Input
              id="encargado"
              name="encargado"
              className="w-full"
              placeholder="Ingresa el nombre del encargado"
              type="text"
              value={remissionToUpdate.encargado}
              onChange={handleChange}
            />
          </fieldset>
        </Modal.Content>
        <Modal.Footer className="flex justify-end">
          <Button
            onClick={closeModal}
            size="sm"
            variant="outline"
            color="secondary"
          >
            Cancelar
          </Button>
          <Button onClick={sendFormUpdate} size="sm" color="primary">
            Actualizar remisión
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}

export default ModalUpdateDetails;
