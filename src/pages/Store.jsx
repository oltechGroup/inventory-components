import { Badge, Button, Input, Icon } from "keep-react";
import { Cube, MagnifyingGlass } from "phosphor-react";

import { useEffect, useState } from "react";
import { instance } from "../api/instance";

import { Route, Routes } from "react-router-dom";
import Categories from "../components/store/Categories";
import ComponentesSubcategory from "../components/store/ComponentesSubcategory";
import SearchComponents from "../components/store/SearchComponents";
import ModalAdd from "../components/store/ModalAdd";

function Store() {
  const [loading, setLoading] = useState(true);

  const [componentes, setComponentes] = useState([]);

  // Variables for search components
  const [searchComponentes, setSearchComponentes] = useState({
    search: "",
    active: false,
  });

  const closeSearchComponents = () => {
    setSearchComponentes({
      search: "",
      active: false,
    });
  };
  // End Variables for search components

  // Variables for Modal Add
  const [modalAddActive, setModalAddActive] = useState(false);
  // End Variables for Modal Add

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
    <>
      <h1>Almacén</h1>
      <div className="my-4 flex items-center">
        <div className="flex items-center gap-2">
          <p className="text-body-1 font-semibold text-metal-600">
            Componentes
          </p>
          <Badge size="sm" color="secondary">
            16 Categorias
          </Badge>
        </div>
        <div className="flex ml-5 items-center gap-5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setModalAddActive(true)}
          >
            <span className="pr-2">
              <Cube size={24} />
            </span>
            Registrar componente
          </Button>
          <fieldset className="relative w-64">
            <Input
              placeholder="Buscar categoría, medidas, paciente, hospital..."
              className="ps-11"
              name="search"
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setSearchComponentes({
                    search: e.target.value,
                    active: true,
                  });
                } else {
                  closeSearchComponents();
                }
              }}
            />
            <Icon>
              <MagnifyingGlass size={18} color="#AFBACA" />
            </Icon>
          </fieldset>
        </div>
      </div>

      {searchComponentes.active ? (
        <SearchComponents
          search={searchComponentes.search}
          disactive={closeSearchComponents}
        />
      ) : (
        <Routes>
          <Route path="/" element={<Categories componentes={componentes} />} />
          <Route path="/:category/*" element={<ComponentesSubcategory />} />
        </Routes>
      )}
      <ModalAdd
        active={modalAddActive}
        disactive={() => setModalAddActive(false)}
      />
    </>
  );
}

export default Store;
