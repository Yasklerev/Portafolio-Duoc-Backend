import { Router } from "express";
import { employeeController } from "../controllers/employeeController";

class EmployeeRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/employee/listAllEmployee", employeeController.listAllEmployee);
    
  }
}
const employeeRoutes = new EmployeeRoutes();
export default employeeRoutes.router;
