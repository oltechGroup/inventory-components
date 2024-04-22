export const routes = {
  home: "/",
  inventary: "/inventary",
  store: "/store",
  hospitals: "/hospitals",
  consumo: "/consumo",
  Users: "/users",
  login: "/login",
  signup: "/signup",
  remisiones: "/remisiones",
  addRemision: "/remisiones/add",
  userProfile: "/profile",
  remision: (id) => id ? `/remisiones/${id}` : "/remisiones/:id",
}