import { Avatar, Button, Divider } from "keep-react";
import { Calendar, Cube } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils/routes";

function CardRemision({ index }) {
  const nav = useNavigate();
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4 relative">
      <Avatar className="absolute top-2 right-2" />
      <div>
        <p className="text-body-1 font-semibold text-metal-600 flex flex-col">
          Remisión {index + 1}
          <span className="text-body-5 text-metal-500">Código: 123456</span>
        </p>

        <div className="flex flex-col gap-2 mt-2">
          <p className="text-body-3 text-metal-400 flex items-center gap-1">
            <Cube size={24} />
            12 componentes
          </p>
          <p className="text-body-3 text-metal-400 flex items-center gap-1">
            <Calendar size={24} />
            12/12/2021
          </p>
        </div>
      </div>
      <Button variant="outline" size="xs" onClick={() => nav(routes.remision(index + 1))}>
        Ver detalles
      </Button>
    </div>
  );
}

export default CardRemision;
