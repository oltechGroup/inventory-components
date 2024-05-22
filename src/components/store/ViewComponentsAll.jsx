import { Badge, Button, Table, Dropdown } from "keep-react";
import { DotsThreeOutline, Pencil, Trash } from "phosphor-react";

import { useEffect, useState } from "react";

import PaginationComponent from "../Pagination";
import { SkeletonTable } from "../SkeletonTable";

import { instance } from "../../api/instance";
import { useStore } from "../../context/StoreProvider";
import ModalUpdate from "./ModalUpdate";

function ViewComponentsAll() {
  const [loading, setLoading] = useState(true);
  const { deleteComponent } = useStore();

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

  const [componentes, setComponentes] = useState([]);
  const [componentesInfo, setComponentesInfo] = useState({});

  const [modalUpdateActive, setModalUpdateActive] = useState(false);
  const [componentToUpdate, setComponentToUpdate] = useState({
    measures: "",
    category_id: "",
    stock: 0,
    lote: "",
    caducidad: "",
  });

  const showModalUpdate = (component) => {
    setComponentToUpdate({ ...component, category_id: component.componentes_categories.id });
    setModalUpdateActive(true);
  };

  const closeModalUpdate = () => {
    setModalUpdateActive(false);
  };

  const getComponents = () => {
    setLoading(true);
    instance
      .get("/componentes", { params: paramsAPI })
      .then((response) => {
        setComponentes(response.data.data);
        setComponentesInfo(response.data.info);
      })
      .finally(() => setLoading(false));
  };


  const renderComponentes = () => {
    return componentes.map((componente) => (
      <Table.Row className="bg-white" key={componente.id}>
        <Table.Cell>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                  {componente.measures}
                </p>
              </div>
            </div>
          </div>
        </Table.Cell>
        <Table.Cell>
          <Badge color="secondary">{componente.stock}</Badge>
          {componente.remission_stock > 0 && (
            <Badge color="warning" className="ml-2">
              {componente.remission_stock} Rem.
            </Badge>
          )}
        </Table.Cell>
        <Table.Cell>
          <Badge size="sm">
            {componente.componentes_categories.name.toUpperCase()}
          </Badge>
        </Table.Cell>
        <Table.Cell>
          <p>{new Date(componente.registration_date).toLocaleDateString()}</p>
        </Table.Cell>
        <Table.Cell>
          <Badge color="success">{componente.lote}</Badge>
        </Table.Cell>
        <Table.Cell>
          <p>{new Date(componente.caducidad).toLocaleDateString()}</p>
        </Table.Cell>
        <Table.Cell>
          <Dropdown
            action={
              <Button variant="outline" size="sm" shape="circle">
                <DotsThreeOutline size={15} />
              </Button>
            }
            actionClassName="border-none"
          >
            <Dropdown.List>
              <ul>
                <li className="rounded px-2 py-1 hover:bg-metal-100">
                  <button
                    className="flex w-full items-center justify-between text-body-4 font-normal text-metal-600"
                    onClick={() =>
                      deleteComponent({
                        id: componente.id,
                        measures: componente.measures,
                        category: componente.componentes_categories.name,
                      })
                    }
                  >
                    <span>Borrar</span>
                    <span>
                      <Trash />
                    </span>
                  </button>
                </li>
                <li className="rounded px-2 py-1 hover:bg-metal-100">
                  <button
                    className="flex w-full items-center justify-between text-body-4 font-normal text-metal-600"
                    onClick={() => showModalUpdate(componente)}
                  >
                    <span>Editar</span>
                    <span>
                      <Pencil />
                    </span>
                  </button>
                </li>
              </ul>
            </Dropdown.List>
          </Dropdown>
        </Table.Cell>
      </Table.Row>
    ));
  };

  useEffect(() => {
    getComponents();
    window.scrollTo(0, 0);
  }, [paramsAPI]);

  return (
    <>
      <Table showCheckbox={true}>
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
              <Table.HeadCell>En Stock</Table.HeadCell>
              <Table.HeadCell>Categoría</Table.HeadCell>
              <Table.HeadCell>Fecha Registro</Table.HeadCell>
              <Table.HeadCell>Lote</Table.HeadCell>
              <Table.HeadCell>Caducidad</Table.HeadCell>

              <Table.HeadCell />
            </Table.Head>
            <Table.Body className="divide-gray-25 divide-y">
              {renderComponentes()}
            </Table.Body>
          </>
        )}
      </Table>
      <PaginationComponent
        currentPage={paramsAPI.page}
        onChange={handlePageChange}
        pages={componentesInfo.totalPages}
      />

      <ModalUpdate
        isOpen={modalUpdateActive}
        closeModal={closeModalUpdate}
        componentToUpdate={componentToUpdate}
      />
    </>
  );
}

export default ViewComponentsAll;
