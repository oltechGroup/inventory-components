import LogoOltech from "../../components/Logo";
import { Envelope, Lock } from "phosphor-react";
import { Button, Input, Label, Spinner, InputIcon } from "keep-react";
import "./Login.css";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";

function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const loadingSet = (boolean) => setLoading(boolean);

  const handleChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(userCredentials, loadingSet);
  };

  return (
    <div className="overflow__login">
      <div className="container-login">
        <form className="section-form" onSubmit={handleSubmit}>
          <LogoOltech width={150} />

          <div>
            <h1 className="mb-2 text-body-1 font-medium text-metal-900">
              Bienvenido de vuelta
            </h1>
            <p className="text-body-4 font-normal text-metal-600">
              Ingresa tus datos para acceder a sistema de inventario
            </p>
          </div>

          <fieldset className="space-y-1">
            <Label htmlFor="name">Correo Electrónico</Label>
            <div className="relative">
              <Input
                placeholder="Ingresa tu correo electrónico"
                className="ps-11"
                id="email"
                name="email"
                onChange={handleChange}
              />
              <InputIcon>
                <Envelope size={19} color="#AFBACA" />
              </InputIcon>
            </div>
          </fieldset>

          <fieldset className="space-y-1">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                type="password"
                className="ps-11"
              />
              <Lock size={19} color="#AFBACA" />
            </div>
          </fieldset>
          {loading ? (
            <Button size="sm">
              <span className="pr-2">
                <Spinner color="info" size="sm" />
              </span>
              Ingresando...
            </Button>
          ) : (
            <Button size="sm" className="button" type="submit">
              Ingresar
            </Button>
          )}
        </form>
        <div className="section-image"></div>
      </div>
    </div>
  );
}

export default Login;
