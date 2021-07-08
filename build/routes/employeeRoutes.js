"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
class EmployeeRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/employee/listAllEmployee", employeeController_1.employeeController.listAllEmployee);
    }
}
const employeeRoutes = new EmployeeRoutes();
exports.default = employeeRoutes.router;
