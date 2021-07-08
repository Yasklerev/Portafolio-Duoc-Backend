import { Router } from "express";
import { purchaseController } from "../controllers/purchaseController";

class PurchaseRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/purchase/listAllPurchases", purchaseController.listAllPurchases);
    this.router.get("/purchase/getPurchase/:numero", purchaseController.getPurchase);
    this.router.get("/purchase/listAllVendors", purchaseController.listAllVendors);
    this.router.post("/purchase/createPurchase", purchaseController.createPurchase);
    this.router.post("/purchase/deletePurchase", purchaseController.deletePurchase);
    this.router.post("/purchase/responsePurchase", purchaseController.responsePurchase);
    this.router.post("/purchase/aprobarRechazarPurchase", purchaseController.aprobarRechazarPurchase);
  }
}

const purchaseRoutes = new PurchaseRoutes();
export default purchaseRoutes.router;
 