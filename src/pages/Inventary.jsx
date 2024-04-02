import { Avatar, Badge, Button, Icon, Input, Popover, Table } from "keep-react";
import {
  ArrowDown,
  ArrowUp,
  ArrowsDownUp,
  Cube,
  DotsThreeOutline,
  MagnifyingGlass,
  Pencil,
  Trash,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { instance } from "../api/instance";
import PaginationComponent from "../components/Pagination";
import { SkeletonTable } from "../components/SkeletonTable";

function Inventary() {
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

  const handleSearch = (e) => {
    setParamsAPI({ ...paramsAPI, search: e.target.value });
  };

  const [componentesInventory, setComponentesInventory] = useState([]);
  const [componentesInfo, setComponentesInfo] = useState({});
  const getComponentesInventory = () => {
    setLoading(true);
    instance
      .get("/componentes/inventory", { params: paramsAPI })
      .then((response) => {
        setComponentesInventory(response.data.data);
        setComponentesInfo(response.data.info);
        console.log(response.data);
      })
      .finally(() => setLoading(false));
  };

  const renderComponentesInventory = () => {
    const operation = (movimiento) => {
      switch (movimiento) {
        case "entrada":
          return (
            <Badge color="success" showIcon={true}>
              Entrada
            </Badge>
          );
        case "salida":
          return (
            <Badge color="error" showIcon={true}>
              Salida
            </Badge>
          );
        case "eliminado":
          return (
            <Badge color="error" showIcon={true}>
              Eliminado
            </Badge>
          );
        default:
          return movimiento;
      }
    };

    const quantity = (movimiento, cantidad) => {
      switch (movimiento) {
        case "entrada":
          return (
            <div className="flex items-center gap-1">
              <span>
                <ArrowUp size={20} color="#D7DFE9" />
              </span>
              <span>{cantidad}</span>
            </div>
          );
        case "salida":
          return (
            <div className="flex items-center gap-1">
              <span>
                <ArrowDown size={20} color="#D7DFE9" />
              </span>
              <span>{cantidad}</span>
            </div>
          );
        case "eliminado":
          return (
            <div className="flex items-center gap-1">
              <span>
                <Trash size={20} color="#D7DFE9" />
              </span>
              <span>{cantidad}</span>
            </div>
          );
        default:
          return cantidad;
      }
    };

    return componentesInventory.map((componente) => (
      <Table.Row className="bg-white" key={componente.id}>
        <Table.Cell>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                  {componente.componentes.measures}
                </p>
              </div>
            </div>
          </div>
        </Table.Cell>
        <Table.Cell>
          <Badge>{componente.componentes.componentes_categories.name}</Badge>
        </Table.Cell>
        <Table.Cell>{operation(componente.tipo_movimiento)}</Table.Cell>
        <Table.Cell>
          {quantity(componente.tipo_movimiento, componente.quantity)}
        </Table.Cell>
        <Table.Cell>
          {new Date(componente.fecha_movimiento).toDateString()}
        </Table.Cell>
      </Table.Row>
    ));
  };

  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    instance.get("/componentes/categories").then((response) => {
      setCategories(response.data);
    });
  };

  useEffect(() => getCategories(), []);

  useEffect(() => {
    getComponentesInventory();
    window.scrollTo(0, 0);
  }, [paramsAPI]);

  return (
    <>
      <h1>Inventario</h1>
      <Table showCheckbox={true}>
        <Table.Caption>
          <div className="my-5 flex items-center px-6">
            <div className="flex items-center gap-5">
              <p className="text-body-1 font-semibold text-metal-600">
                Movimientos de los componentes
              </p>
            </div>
            <div className="flex ml-5 items-center ">
              <fieldset className="relative w-64">
                <Input
                  placeholder="Buscar por categoría o medidas"
                  className="ps-11"
                  name="search"
                  onChange={handleSearch}
                />
                <Icon>
                  <MagnifyingGlass size={18} color="#AFBACA" />
                </Icon>
              </fieldset>
            </div>
          </div>
          <div className="my-5 flex items-center px-6 gap-5">
            <select name="order" id="order">
              <option value="">Ordenar por creación</option>
              <option value="">Ascendente</option>
              <option value="">Descendente</option>
            </select>

            <select name="category" id="category">
              <option value="0">Ordenar por categoría</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </Table.Caption>

        {loading ? (
          <SkeletonTable />
        ) : (
          <>
            <Table.Head>
              <Table.HeadCell>
                <p className="text-body-5 font-medium text-metal-400">
                  Medidas
                </p>
              </Table.HeadCell>
              <Table.HeadCell>Categoría</Table.HeadCell>
              <Table.HeadCell icon={<ArrowsDownUp size={14} color="#8897AE" />}>
                Movimiento
              </Table.HeadCell>
              <Table.HeadCell icon={<ArrowsDownUp size={14} color="#8897AE" />}>
                Cantidad
              </Table.HeadCell>
              <Table.HeadCell>Fecha Registro</Table.HeadCell>
              <Table.HeadCell />
            </Table.Head>
            <Table.Body className="divide-gray-25 divide-y">
              {renderComponentesInventory()}
            </Table.Body>
          </>
        )}
      </Table>
      <PaginationComponent
        currentPage={paramsAPI.page}
        onChange={handlePageChange}
        pages={componentesInfo.totalPages}
      />
    </>
  );
}

export default Inventary;
