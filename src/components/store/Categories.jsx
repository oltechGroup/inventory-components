import { Breadcrumb } from "keep-react";
import CardCategory from "./CardCategory";

function Categories({ componentes }) {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item activeType="base">Componentes</Breadcrumb.Item>
      </Breadcrumb>

      <div className="grid grid-cols-3 gap-4">
        {componentes.map((componente) => (
          <CardCategory
            title={componente.category}
            count={componente.count}
            lotes={componente.lotes}
            remision={componente.remision}
          />
        ))}
      </div>
    </>
  );
}

export default Categories;