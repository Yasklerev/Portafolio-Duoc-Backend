import { Router } from "express";
import { hostalController } from "../controllers/hostalController";

class HostalRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/hostal/listAllHostal", hostalController.listAllHostales);
    this.router.post("/hostal/createHostal", hostalController.createHostal);
    this.router.post("/hostal/deleteHostal", hostalController.deleteHostal);
  }
}
const hostalRoutes = new HostalRoutes();
export default hostalRoutes.router;
