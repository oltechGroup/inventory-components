import { DotsThreeOutlineVertical, Funnel, Plus } from "phosphor-react";
import {
  Badge,
  Button,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownItem,
  DropdownList,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "keep-react";
import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";
import { useState } from "react";

function IndexConsumption() {
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

  return (
    <>
      <ModalAdd isActive={activeModalAdd} onCloseModal={closeModalAdd} />
      <ModalUpdate
        isActive={activeModalUpdate}
        onCloseModal={closeModalUpdate}
      />

      <Table>
        <TableCaption>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">
                Consumo Arthrex
              </h2>
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
                Registrar Consumo
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
              <div>Caducidad</div>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10)].map((item, index) => (
            <TableRow key={index}>
              <TableCell>Nombre Comercial</TableCell>
              <TableCell>Nombre Generico</TableCell>
              <TableCell>Referencia</TableCell>
              <TableCell>lote</TableCell>
              <TableCell>Caducidad</TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownAction asChild>
                    <button>
                      <DotsThreeOutlineVertical className="size-4 fill-metal-900 dark:fill-white" />
                    </button>
                  </DropdownAction>
                  <DropdownContent className="max-w-[200px] p-3">
                    <DropdownList>
                      <DropdownItem onClick={() => showModalUpdate()}>Editar</DropdownItem>
                      <DropdownItem>Borrar</DropdownItem>
                    </DropdownList>
                  </DropdownContent>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default IndexConsumption;
