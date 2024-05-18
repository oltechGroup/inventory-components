function ModalUpdate() {
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
      await instance.put(`/componentes/${componentToUpdate.id}`, {
        measures: componentToUpdate.measures,
        category: componentToUpdate.category,
        stock: parseInt(componentToUpdate.stock),
        lote: componentToUpdate.lote,
        caducidad: componentToUpdate.caducidad,
      });
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

  return (
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
                      value={componentToUpdate.measures}
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
                      value={componentToUpdate.lote}
                      onChange={handleChangeUpdate}
                    />
                  </fieldset>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="caducidad">Fecha de Caducidad</Label>
                  <input
                    type="date"
                    name="caducidad"
                    // value={formatDateInput(componentToUpdate.caducidad)}
                    onChange={handleChangeUpdate}
                  />
                </div>

                <fieldset className="max-w-md space-y-1">
                  <Label htmlFor="stock">Cantidad</Label>
                  <NumberInput>
                    <NumberInput.Button
                      onClick={() =>
                        setComponentToUpdate({
                          ...componentToUpdate,
                          stock: componentToUpdate.stock - 1,
                        })
                      }
                    >
                      <Minus size={16} color="#455468" />
                    </NumberInput.Button>
                    <NumberInput.Input
                      defaultValue={0}
                      name="stock"
                      type="number"
                      value={componentToUpdate.stock}
                      onChange={handleChangeUpdate}
                    />
                    <NumberInput.Button
                      onClick={() =>
                        setComponentToUpdate({
                          ...componentToUpdate,
                          stock: componentToUpdate.stock + 1,
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
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}
