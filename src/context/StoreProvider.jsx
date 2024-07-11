import { React, createContext, useContext } from "react";
import { instance } from "../api/instance";

import Swal from "sweetalert2";

export const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  return context;
};

export default function StoreProvider({ children }) {
  const addComponent = async (component) => {
    try {
      await instance.post("/componentes/add", {
        measures: component.measures,
        category: component.category,
        stock: parseInt(component.stock),
        lote: component.lote,
        caducidad: component.caducidad,
      });

      Swal.fire({
        title: "Actualizado",
        text: "El componente se ha creado!",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  const updateComponent = async (componentToUpdate, callback) => {
    try {
      Swal.fire("Actualizando", "Espere un momento...", "info");
      
      await instance.put(
        `/componentes/${componentToUpdate.id}`,
        {
          measures: componentToUpdate.measures,
          category: componentToUpdate.category,
          stock: parseInt(componentToUpdate.stock),
          lote: componentToUpdate.lote,
          caducidad: componentToUpdate.caducidad,
        }
      );

      Swal.fire({
        title: "Actualizado",
        text: "El componente ha sido actualizado exitosamente!",
        icon: "success",
      });

      callback();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  const deleteComponent = (componente, callback) => {
    Swal.fire({
      title: `¿Eliminar ${componente.measures} ${componente.category}?`,
      text: "Toda la información relacionada con el componente será eliminada!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminando!", "Espere un momento...", "info");
        instance
          .delete(`/componentes/${componente.id}`)
          .then((response) => {
            Swal.fire(
              "Eliminado!",
              "El componente se elimino correctamente.",
              "success"
            );
            callback();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "Error",
              text: "Ha ocurrido un error al eliminar el componente",
              icon: "error",
            });
          });
      }
    });
  };

  const contextValue = {
    addComponent,
    updateComponent,
    deleteComponent,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}
