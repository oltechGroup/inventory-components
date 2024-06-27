import { Breadcrumb } from "keep-react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../api/instance";
import { useEffect, useState } from "react";
import CardSubcategory from "./CardSubcategory";
import ListComponentes from "./ListComponentes";

function ComponentesSubcategory() {
  const { category } = useParams();
  const nav = useNavigate();

  const [componentes, setComponentes] = useState([]);

  const getComponentsSubcategoryByCategory = (category) => {
    instance.get(`/componentes/grouped/${category}`).then((response) => {
      console.log(response);
      setComponentes(response.data.data);
    });
  };

  useEffect(() => {
    getComponentsSubcategoryByCategory(category);
  }, [category]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Breadcrumb>
              <div onClick={() => nav("/store")}>
                <Breadcrumb.Item>Componentes</Breadcrumb.Item>
              </div>
              <Breadcrumb.Item activeType="base">{category}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="grid grid-cols-3 gap-4">
              {componentes.map((componente) => (
                <CardSubcategory
                  key={componente.id}
                  title={componente.subcategory}
                  count={componente.stock}
                  countRemission={componente.remision}
                />
              ))}
            </div>
          </>
        }
      />
      <Route path="/:subcategory" element={<ListComponentes />} />
    </Routes>
  );
}

export default ComponentesSubcategory;
