import { Router } from "express";
import { customerController } from "../controllers/customerController";

class CustomerRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/customer/listAllCustomers", customerController.listAllEmpresas);
    this.router.post("/customer/createCustomer", customerController.createCustomer);
    this.router.post("/customer/updateCustomer", customerController.updateCustomer);
    this.router.post("/customer/deleteCustomer", customerController.deleteCustomer);
  }
}

const customerRoutes = new CustomerRoutes();
export default customerRoutes.router;

