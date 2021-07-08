import { Router } from "express";
import { loadUsersController } from "../controllers/loadUsersController";

class LoadUsersRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.post("/load-user/load", loadUsersController.loadUsers);
    this.router.get("/load-user/listAllUsersBusiness", loadUsersController.getUsers);
    this.router.get("/load-user/tipo-solicitudes", loadUsersController.tipoServicio);
    this.router.post("/load-user/crear-solicitud", loadUsersController.crearSolicitud);
    this.router.get("/load-user/obtener-solicitudes", loadUsersController.obtenerSolicitudes);
    this.router.post("/load-user/obtener-solicitud", loadUsersController.obtenerSolicitud);
  }
}

const loadUsersRoutes = new LoadUsersRoutes();
export default loadUsersRoutes.router;
 