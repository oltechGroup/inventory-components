import { DotsThreeOutlineVertical, Funnel, Plus } from "phosphor-react";
import {
  Badge,
  Button,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownItem,
  DropdownList,
  Empty,
  EmptyDescription,
  EmptyImage,
  EmptyTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "keep-react";
import { useEffect, useState } from "react";
import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";
import { instance } from "../../../api/instance";
import { SkeletonTable } from "../../../components/SkeletonTable";
import { format } from "@formkit/tempo";
import Swal from "sweetalert2";
import EmptyComponent from "../../../components/EmptyComponent";

function IndexStore() {
  // States for Modal's
  const [activeModalAdd, setActiveModalAdd] = useState(false);
  const showModalAdd = () => setActiveModalAdd(true);
  const closeModalAdd = () => setActiveModalAdd(false);

  const [activeModalUpdate, setActiveModalUpdate] = useState(false);
  const showModalUpdate = () => {
    setActiveModalUpdate(true);
  };
  const closeModalUpdate = () => {
    setActiveModalUpdate(false);
  };

  // States for components
  const [components, setComponents] = useState([]);
  const [componentsInfo, setComponentsInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [paramsAPI, setParamsAPI] = useState({
    page: 1,
    perPage: 20,
    search: "",
    sort: "registration_date",
    order: "desc",
    category: "28", // 28 is the id of "Arthrex" category
  });

  const getComponents = () => {
    setLoading(true);
    instance
      .get("/componentes", { params: paramsAPI })
      .then((response) => {
        setComponents(response.data.data);
        setComponentsInfo(response.data.info);
      })
      .finally(() => setLoading(false));
  };

  // States for update one component

  const [componentToUpdate, setComponentToUpdate] = useState({});
  const updateComponent = (component) => {
    setComponentToUpdate(component);
    showModalUpdate();
  };

  const deleteComponent = (component) => {
    Swal.fire({
      title: `¿Eliminar ${component.nombre_comercial}?`,
      text: `TODOS los registros e información relacionada con ${component.nombre_comercial} serán borrados también!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminando componente...",
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        instance
          .delete(`/componentes/arthrex/delete/${component.id}`)
          .then((response) => {
            getComponents();
            Swal.fire(
              "Eliminado!",
              "El componente se elimino correctamente.",
              "success"
            );
          })
          .catch((error) => {
            console.error(error);
            Swal.fire(
              "Error",
              "Ha ocurrido un error al eliminar el componente",
              "error"
            );
          });
      }
    });
  };

  useEffect(() => {
    getComponents();
  }, [paramsAPI]);

  return (
    <>
      <ModalAdd
        isActive={activeModalAdd}
        onCloseModal={closeModalAdd}
        reload={getComponents}
      />
      <ModalUpdate
        isActive={activeModalUpdate}
        onCloseModal={closeModalUpdate}
        reload={getComponents}
        componentToUpdate={componentToUpdate}
      />

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <Table>
            <TableCaption>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">
                    Almacen Arthrex
                  </h2>
                  <Badge
                    color="secondary"
                    className="dark:bg-metal-800 dark:text-white"
                  >
                    {componentsInfo.totalCount} componentes
                  </Badge>
                </div>
                <div className="flex items-center gap-5">
                  <Button
                    variant="outline"
                    color="secondary"
                    size="xs"
                    className="flex gap-1.5"
                    onClick={showModalAdd}
                  >
                    <Plus className="size-4 fill-metal-900 dark:fill-white" />
                    Agregar Componente
                  </Button>
                  <Button
                    variant="outline"
                    color="secondary"
                    size="xs"
                    className="flex gap-1.5"
                  >
                    <Funnel className="size-4 fill-metal-900 dark:fill-white" />
                    Filtrar Componentes
                  </Button>
                </div>
              </div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div>Nombre Comercial</div>
                </TableHead>
                <TableHead>
                  <div>Nombre Genérico</div>
                </TableHead>
                <TableHead>
                  <div>Referencia</div>
                </TableHead>
                <TableHead>
                  <div>Lote</div>
                </TableHead>
                <TableHead>
                  <div>Cantidad</div>
                </TableHead>
                <TableHead>
                  <div>Caducidad</div>
                </TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {components.map((component, index) => (
                <TableRow key={index}>
                  <TableCell>{component.nombre_comercial}</TableCell>
                  <TableCell>{component.nombre_generico}</TableCell>
                  <TableCell>
                    <Badge color="success">{component.referencia}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge color="warning">{component.lote}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge color="primary">{component.stock}</Badge>
                  </TableCell>
                  <TableCell>
                    {format(component.caducidad, "MMMM D, YYYY", "es")}
                  </TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownAction asChild>
                        <button>
                          <DotsThreeOutlineVertical className="size-4 fill-metal-900 dark:fill-white" />
                        </button>
                      </DropdownAction>
                      <DropdownContent className="max-w-[200px] p-3">
                        <DropdownList>
                          <DropdownItem
                            onClick={() => updateComponent(component)}
                          >
                            Editar
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => deleteComponent(component)}
                          >
                            Borrar
                          </DropdownItem>
                        </DropdownList>
                      </DropdownContent>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {components.length === 0 && (
            <EmptyComponent message={"No hay componentes"} />
          )}
        </>
      )}
    </>
  );
}

export default IndexStore;
