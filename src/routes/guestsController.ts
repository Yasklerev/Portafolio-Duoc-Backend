import { Router } from "express";
import { guestsController } from "../controllers/guestsController";

class CustomerRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/guests/listAllGuests", guestsController.listAllGuests);
    this.router.post("/guests/createGuests", guestsController.createGuests);
    this.router.post("/guests/updateGuests", guestsController.updateGuests);
    this.router.post("/guests/deleteGuests", guestsController.deleteGuests);
  }
}

const customerRoutes = new CustomerRoutes();
export default customerRoutes.router;

