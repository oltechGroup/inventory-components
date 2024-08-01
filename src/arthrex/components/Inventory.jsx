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

function InventoryArthrex() {
  return (
    <Table>
      <TableCaption>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">
              Movimientos Arthrex
            </h2>
            <Badge
              color="secondary"
              className="dark:bg-metal-800 dark:text-white"
            >
              500 componentes
            </Badge>
          </div>
          <div className="flex items-center gap-5">
            <Button
              variant="outline"
              color="secondary"
              size="xs"
              className="flex gap-1.5"
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
                    <DropdownItem>Editar</DropdownItem>
                    <DropdownItem>Borrar</DropdownItem>
                  </DropdownList>
                </DropdownContent>
              </Dropdown>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default InventoryArthrex;
