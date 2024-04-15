import { Badge, Button, Icon, Input } from "keep-react";
import { Cube, MagnifyingGlass } from "phosphor-react";
import CardRemision from "../components/CardRemision";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils/routes";
import { SkeletonRemissions } from "../components/SkeletonRemissions";
import { instance } from "../api/instance";

function Remisiones() {
  const nav = useNavigate();
  // States for remissions
  const [remissions, setRemissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const getRemissions = () => {
    instance.get("componentes/remissions").then((response) => {
      setRemissions(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    });
  };

  const renderRemissions = () => {
    return remissions.map((remission, index) => (
      <CardRemision
        key={index}
        index={index}
        name={remission.name}
        date={remission.date_remission}
        count={remission._count.componentes_has_componentes_remisiones}
        codigo={remission.codigo}
        user={remission.users}
        id={remission.id}
        status={remission.status}
      />
    ));
  };

  useEffect(() => {
    getRemissions();
  }, []);

  return (
    <>
      <h1>Remisiones</h1>
      <div className="my-5 flex items-center px-6">
        <div className="flex items-center gap-5">
          <p className="text-body-1 font-semibold text-metal-600">
            Remisiones Registradas
          </p>
          <Badge size="sm" color="secondary">
            Remisiones
          </Badge>
        </div>
        <div className="flex ml-5 items-center gap-5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => nav(routes.addRemision)}
          >
            <span className="pr-2">
              <Cube size={24} />
            </span>
            Registrar Remisión
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

      {loading ? <SkeletonRemissions /> : null}
      {remissions.length === 0 && !loading ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-body-1 font-semibold text-metal-400">
            No hay remisiones registradas
          </p>
        </div>
      ) : null}
      <section className="grid grid-cols-3 gap-4">{renderRemissions()}</section>
    </>
  );
}

export default Remisiones;
