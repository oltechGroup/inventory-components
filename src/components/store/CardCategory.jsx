import { Cube } from "phosphor-react";
import { capitalizeString } from "../../utils/capitalizeString";
import { Button } from "keep-react";
import { useNavigate } from "react-router-dom";
import { formatStringForURL } from "../../utils/formatStringForURL";

function CardCategory({ key, title, count, lotes, remision }) {
  const nav = useNavigate();
  return (
    <div
      key={key}
      className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2 relative"
    >
      <div className="flex gap-2 items-center">
        <Cube size={24} className="text-metal-600" />
        <p className="text-body-1 font-semibold text-metal-600 flex flex-col">
          {capitalizeString(title)}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-body-3 text-metal-400">{count} elementos totales</p>
        <p className="text-body-3 text-metal-400">{lotes} lotes</p>
        <p className="text-body-3 text-metal-400">{remision} en remision</p>
      </div>
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

export default CardCategory;
