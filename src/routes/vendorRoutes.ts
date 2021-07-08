import { Router } from "express";
import { vendorController } from "../controllers/vendorConroller";

class VendorRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/vendors/listAllVendors", vendorController.listAllVendors);
  }
}

const vendorRoutes = new VendorRoutes();
export default vendorRoutes.router;
