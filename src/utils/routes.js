export const routes = {
  home: "/",
  hospitals: "/hospitales",
  users: "/usuarios",
  login: "/login",
  signup: "/signup",
  userProfile: "/profile",
  omma: {
    consumos: "/omma/consumos",
    movements: "/omma/movimientos",
    store: "/omma/almacen",
    remissions: {
      list: "/omma/remisiones",
      add: "/omma/remisiones/add",
      edit: (id) => id ? `/omma/remisiones/edit/${id}` : "/omma/remisiones/edit/:id",
      view: (id) => id ? `/omma/remisiones/view/${id}` : "/omma/remisiones/view/:id",
      pdf: (id) => id ? `/omma/remisiones/pdf/${id}` : "/omma/remisiones/pdf/:id",
    },
  },
  arthrex: {
    consumos: "/arthrex/consumos",
    movements: "/arthrex/movimientos",
    store: "/arthrex/almacen",
    remissions: {
      list: "/arthrex/remisiones",
      add: "/arthrex/remisiones/add",
      edit: (id) => id ? `/arthrex/remisiones/edit/${id}` : "/arthrex/remisiones/edit/:id",
      view: (id) => id ? `/arthrex/remisiones/view/${id}` : "/arthrex/remisiones/view/:id",
      pdf: (id) => id ? `/arthrex/remisiones/pdf/${id}` : "/arthrex/remisiones/pdf/:id",
    },
  }
}