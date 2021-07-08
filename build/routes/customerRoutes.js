"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = require("../controllers/customerController");
class CustomerRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/customer/listAllCustomers", customerController_1.customerController.listAllEmpresas);
        this.router.post("/customer/createCustomer", customerController_1.customerController.createCustomer);
        this.router.post("/customer/updateCustomer", customerController_1.customerController.updateCustomer);
        this.router.post("/customer/deleteCustomer", customerController_1.customerController.deleteCustomer);
    }
}
const customerRoutes = new CustomerRoutes();
exports.default = customerRoutes.router;
