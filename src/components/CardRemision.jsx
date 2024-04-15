import { Avatar, Button, Badge } from "keep-react";
import { Calendar, Cube } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils/routes";

function CardRemision({ id, name, codigo, date, count, user, status }) {
  const nav = useNavigate();

  return (
    <div
      key={id}
      className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4 relative"
    >
      <Avatar className="absolute top-2 right-2" img={user?.avatar} />
      <div>
        <p className="text-body-1 font-semibold text-metal-600 flex flex-col">
          {name}
          <span className="text-body-5 text-metal-500">Folio: {codigo}</span>
        </p>

        <div className="flex flex-col gap-2 mt-2">
          {status === "En proceso" ? (
            <Badge color="warning" showIcon>
              Pendiente
            </Badge>
          ) : (
            <Badge color="success" showIcon>
              Finalizada
            </Badge>
          )}
          <p className="text-body-3 text-metal-400 flex items-center gap-1">
            <Cube size={24} />
            {count} componentes
          </p>
          <p className="text-body-3 text-metal-400 flex items-center gap-1">
            <Calendar size={24} />
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="xs"
        onClick={() => nav(routes.remision(id))}
      >
        Ver detalles
      </Button>
    </div>
  );
}

export default CardRemision;
