import { Route, Routes } from "react-router-dom";
import Categories from "./Categories";
import ComponentesSubcategory from "./ComponentesSubcategory";
import { useEffect, useState } from "react";
import { instance } from "../../api/instance";

function ViewComponentsCategory() {
  const [loading, setLoading] = useState(true);

  const [componentes, setComponentes] = useState([]);

  const getComponents = () => {
    setLoading(true);
    instance
      .get("/componentes/grouped")
      .then((response) => {
        setComponentes(response.data.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getComponents();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Categories componentes={componentes} />} />
      <Route path="/:category/*" element={<ComponentesSubcategory />} />
    </Routes>
  );
}

export default ViewComponentsCategory;
