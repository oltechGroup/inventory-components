import { Badge, Button, Input, Icon } from "keep-react";
import { Cards, Cube, ListBullets, MagnifyingGlass } from "phosphor-react";

import { useState } from "react";
import SearchComponents from "../components/store/SearchComponents";
import ModalAdd from "../components/store/ModalAdd";
import ViewComponentsCategory from "../components/store/ViewComponentsCategory";
import ViewComponentsAll from "../components/store/ViewComponentsAll";
import StoreProvider from "../context/StoreProvider";

function Store() {
  const modeViews = {
    CATEGORIES: "categories",
    LIST: "list",
  };
  const [modeViewComponents, setModeViewComponents] = useState("categories");

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

  const [modalAddActive, setModalAddActive] = useState(false);

  const renderComponentes = () => {
    if (modeViewComponents === modeViews.CATEGORIES) {
      return <ViewComponentsCategory />;
    } else {
      return <ViewComponentsAll />;
    }
  };

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

      <div>
        <div className="flex gap-2 items-center pb-4">
          <Button
            variant={
              modeViewComponents === modeViews.CATEGORIES ? "" : "outline"
            }
            size="xs"
            onClick={() => setModeViewComponents(modeViews.CATEGORIES)}
            active={modeViewComponents === modeViews.CATEGORIES}
          >
            <span className="pr-2">
              <Cards size={24} />
            </span>
            Categorías
          </Button>
          <Button
            variant={modeViewComponents === modeViews.LIST ? "" : "outline"}
            size="xs"
            onClick={() => setModeViewComponents(modeViews.LIST)}
            active={modeViewComponents === modeViews.LIST}
          >
            <span className="pr-2">
              <ListBullets size={24} />
            </span>
            Lista
          </Button>
        </div>
      </div>

      <StoreProvider>
        {searchComponentes.active ? (
          <SearchComponents
            search={searchComponentes.search}
            disactive={closeSearchComponents}
          />
        ) : (
          renderComponentes()
        )}
      </StoreProvider>

      <ModalAdd
        active={modalAddActive}
        disactiveModal={() => setModalAddActive(false)}
      />
    </>
  );
}

export default Store;
