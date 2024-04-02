export const routes = {
  home: "/",
  inventary: "/inventary",
  store: "/store",
  hospitals: "/hospitals",
  consumo: "/consumo",
  login: "/login",
  signup: "/signup",
  remisiones: "/remisiones",
  addRemision: "/remisiones/add",
  remision: (id) => id ? `/remisiones/${id}` : "/remisiones/:id",
}