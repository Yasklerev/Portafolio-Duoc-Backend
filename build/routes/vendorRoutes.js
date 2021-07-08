"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendorConroller_1 = require("../controllers/vendorConroller");
class VendorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/vendors/listAllVendors", vendorConroller_1.vendorController.listAllVendors);
    }
}
const vendorRoutes = new VendorRoutes();
exports.default = vendorRoutes.router;
