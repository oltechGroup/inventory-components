import {
  Badge,
  Button,
  Icon,
  Input,
  Label,
  Modal,
  NumberInput,
  Table,
  Typography,
} from "keep-react";
import {
  CloudArrowUp,
  Cube,
  MagnifyingGlass,
  Minus,
  Pencil,
  Plus,
  Trash,
} from "phosphor-react";
import CardRemision from "../components/CardRemision";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils/routes";

function Remisiones() {
  const nav = useNavigate();
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
          <Button variant="outline" size="sm" onClick={() => nav(routes.addRemision)}>
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

      <section className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, index) => (
          <CardRemision index={index} />
        ))}
      </section>
    </>
  );
}

export default Remisiones;
