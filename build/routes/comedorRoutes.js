"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comedorController_1 = require("../controllers/comedorController");
class ComedorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/comedor/tipoPlatos", comedorController_1.comedorController.tipoPlatos);
        this.router.post("/comedor/guardarMinuta", comedorController_1.comedorController.guardarMinuta);
        this.router.get("/comedor/minutas", comedorController_1.comedorController.minutas);
    }
}
const comedorRoutes = new ComedorRoutes();
exports.default = comedorRoutes.router;
