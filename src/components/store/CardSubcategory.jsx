import { Cube } from "phosphor-react";
import { capitalizeString } from "../../utils/capitalizeString";
import { Button } from "keep-react";
import { useNavigate } from "react-router-dom";
import { formatStringForURL } from "../../utils/formatStringForURL";

function CardSubcategory({ key, title, count, countRemission }) {
  const nav = useNavigate();
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2 relative"
      key={key}
    >
      <div className="flex gap-2 items-center">
        <p className="text-body-3 font-semibold text-metal-600 flex flex-col">
          {capitalizeString(title)}
        </p>
      </div>
      <div className="flex gap-1 items-center">
        <Cube size={24} className="text-metal-600" />
        <p className="text-body-3 text-metal-400">{count} elementos totales</p>
      </div>
      <p className="text-body-3 text-metal-400">{countRemission} en remision</p>
      <Button
        color="primary"
        variant="outline"
        size="xs"
        onClick={() => nav(`${formatStringForURL(title)}`)}
      >
        Ver componentes
      </Button>
    </div>
  );
}

export default CardSubcategory;
