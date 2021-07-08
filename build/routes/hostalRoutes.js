"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hostalController_1 = require("../controllers/hostalController");
class HostalRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/hostal/listAllHostal", hostalController_1.hostalController.listAllHostales);
        this.router.post("/hostal/createHostal", hostalController_1.hostalController.createHostal);
        this.router.post("/hostal/deleteHostal", hostalController_1.hostalController.deleteHostal);
    }
}
const hostalRoutes = new HostalRoutes();
exports.default = hostalRoutes.router;
