import { Avatar, Badge, Button, Icon, Input, Table } from "keep-react";
import {
  ArrowLeft,
  Calendar,
  Cube,
  MagnifyingGlass,
  Stack,
  Lock,

} from "phosphor-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function OneRemision() {
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex gap-4 items-center mb-4">
        <button
          className="rounded-full p-2 bg-slate-200"
          onClick={() => nav(-1)}
        >
          <ArrowLeft size={24} />
        </button>
        <h1>One Remision {id}</h1>
      </div>

      <h2 className="text-body-1 font-semibold text-metal-600">
        Remisión realizada por
      </h2>
      <div className="flex gap-2 items-center my-3 bg-white p-4 rounded-lg shadow-md max-w-max">
        <Avatar />
        <div>
          <p className="text-body-3 text-metal-500 font-medium">
            Nombre del usuario
          </p>
          <p className="text-body-5 text-metal-500">Admin</p>
        </div>
      </div>

      <h2 className="text-body-1 font-semibold text-metal-600 mb-2">
        Detalles de la remisión
      </h2>
      <div className="flex flex-row gap-4 my-3">
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-end gap-2 relative">
          <div className="flex gap-2 text-metal-400">
            <Calendar size={32} />
            <p className="text-body-3">Fecha de remisión</p>
          </div>
          <p className="text-body-3 text-metal-800 font-medium">12/12/2021</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-end gap-2 relative">
          <div className="flex gap-2 text-metal-400">
            <Lock size={32} />
            <p className="text-body-3">Código de remisión</p>
          </div>
          <p className="text-body-3 text-metal-800 font-medium">123456</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-end gap-2 relative">
          <div className="flex gap-2 text-metal-400">
            <Cube size={32} />
            <p className="text-body-3">
              Cantidad de componentes
            </p>
          </div>
          <p className="text-body-3 text-metal-800 font-medium">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-end gap-2 relative">
          <div className="flex gap-2 text-metal-400">
            <Stack size={32} />
            <p className="text-body-3">Estado de la remisión</p>
          </div>
          <Badge color="warning" showIcon>
            En proceso
          </Badge>
        </div>
      </div>

      <h2 className="text-body-1 font-semibold text-metal-600 mb-2">
        Operaciones
      </h2>
      <div className="flex gap-4 my-3">
        <Button variant="outline" size="sm">
          <span className="pr-2">
            <Cube size={24} />
          </span>
          Finalizar Remisión
        </Button>
        <Button variant="outline" size="sm" color="error">
          <span className="pr-2">
            <Cube size={24} />
          </span>
          Eliminar Remisión
        </Button>
      </div>

      <Table showCheckbox={true}>
        <Table.Caption>
          <div className="my-5 flex items-center px-6">
            <div className="flex items-center gap-5">
              <p className="text-body-1 font-semibold text-metal-600">
                Componentes en remisión
              </p>
            </div>
            <div className="flex ml-5 items-center gap-5">
              <Button variant="outline" size="sm">
                <span className="pr-2">
                  <Cube size={24} />
                </span>
                Agregar Componente
              </Button>
              <fieldset className="relative w-64">
                <Input
                  placeholder="Buscar por categoría o medidas"
                  className="ps-11"
                  name="search"
                />
                <Icon>
                  <MagnifyingGlass size={18} color="#AFBACA" />
                </Icon>
              </fieldset>
            </div>
          </div>
        </Table.Caption>

        <Table.Head>
          <Table.HeadCell>
            <p className="text-body-5 font-medium text-metal-400">Medidas</p>
          </Table.HeadCell>
          <Table.HeadCell>En Remisión</Table.HeadCell>
          <Table.HeadCell>Categoría</Table.HeadCell>
          <Table.HeadCell>Lote</Table.HeadCell>
          <Table.HeadCell>Caducidad</Table.HeadCell>

          <Table.HeadCell />
        </Table.Head>
        <Table.Body className="divide-gray-25 divide-y"></Table.Body>
      </Table>
    </>
  );
}

export default OneRemision;
