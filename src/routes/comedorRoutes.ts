import { Router } from "express";
import { comedorController } from "../controllers/comedorController";

class ComedorRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/comedor/tipoPlatos", comedorController.tipoPlatos);
    this.router.post("/comedor/guardarMinuta", comedorController.guardarMinuta);
    this.router.get("/comedor/minutas", comedorController.minutas);
  }
}

const comedorRoutes = new ComedorRoutes();
export default comedorRoutes.router;
