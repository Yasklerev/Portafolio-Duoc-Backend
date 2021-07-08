"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchaseController_1 = require("../controllers/purchaseController");
class PurchaseRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/purchase/listAllPurchases", purchaseController_1.purchaseController.listAllPurchases);
        this.router.get("/purchase/getPurchase/:numero", purchaseController_1.purchaseController.getPurchase);
        this.router.get("/purchase/listAllVendors", purchaseController_1.purchaseController.listAllVendors);
        this.router.post("/purchase/createPurchase", purchaseController_1.purchaseController.createPurchase);
        this.router.post("/purchase/deletePurchase", purchaseController_1.purchaseController.deletePurchase);
        this.router.post("/purchase/responsePurchase", purchaseController_1.purchaseController.responsePurchase);
        this.router.post("/purchase/aprobarRechazarPurchase", purchaseController_1.purchaseController.aprobarRechazarPurchase);
    }
}
const purchaseRoutes = new PurchaseRoutes();
exports.default = purchaseRoutes.router;
