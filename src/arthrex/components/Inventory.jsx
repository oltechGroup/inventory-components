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
import { useEffect, useState } from "react";
import { SkeletonTable } from "../../components/SkeletonTable";
import EmptyComponent from "../../components/EmptyComponent";
import { instance } from "../../api/instance";
import PaginationComponent from "../../components/Pagination";

function InventoryArthrex() {
  const [movimientos, setMovimientos] = useState([]);
  const [movimientosInfo, setMovimientosInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const [paramsAPI, setParamsAPI] = useState({
    page: 1,
    perPage: 20,
    search: "",
    sort: "registration_date",
    order: "DESC",
  });

  const handlePageChange = (page) => {
    setParamsAPI({ ...paramsAPI, page });
  };

  const getMovimientos = () => {
    setLoading(true);
    instance
      .get("/componentes/inventory", { params: paramsAPI })
      .then((response) => {
        console.log(response.data);
        setMovimientos(response.data.data);
        setMovimientosInfo(response.data.info);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getMovimientos();
  }, [paramsAPI]);

  return (
    <>
      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <Table>
            <TableCaption>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">
                    Movimientos Arthrex
                  </h2>
                </div>
                <div className="flex items-center gap-5">
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
                  <div>Componente</div>
                </TableHead>
                <TableHead>
                  <div>Referencia</div>
                </TableHead>
                <TableHead>
                  <div>Movimiento</div>
                </TableHead>
                <TableHead>
                  <div>Cantidad</div>
                </TableHead>
                <TableHead>
                  <div>Fecha Registrado</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movimientos.map((movimiento, index) => (
                <TableRow key={index}>
                  <TableCell>{movimiento.componentes.nombre_comercial}</TableCell>
                  <TableCell>{movimiento.componentes.referencia}</TableCell>
                  <TableCell>{movimiento.tipo_movimiento}</TableCell>
                  <TableCell>{movimiento.quantity}</TableCell>
                  <TableCell>{movimiento.fecha_movimiento}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {movimientos.length === 0 && (
            <EmptyComponent message={"Aún no hay movimientos"} />
          )}
          <PaginationComponent
            currentPage={paramsAPI.page}
            onChange={handlePageChange}
            pages={movimientosInfo.totalPages}
          />
        </>
      )}
    </>
  );
}

export default InventoryArthrex;
