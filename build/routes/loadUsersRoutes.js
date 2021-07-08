"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loadUsersController_1 = require("../controllers/loadUsersController");
class LoadUsersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post("/load-user/load", loadUsersController_1.loadUsersController.loadUsers);
        this.router.get("/load-user/listAllUsersBusiness", loadUsersController_1.loadUsersController.getUsers);
        this.router.get("/load-user/tipo-solicitudes", loadUsersController_1.loadUsersController.tipoServicio);
        this.router.post("/load-user/crear-solicitud", loadUsersController_1.loadUsersController.crearSolicitud);
        this.router.get("/load-user/obtener-solicitudes", loadUsersController_1.loadUsersController.obtenerSolicitudes);
        this.router.post("/load-user/obtener-solicitud", loadUsersController_1.loadUsersController.obtenerSolicitud);
    }
}
const loadUsersRoutes = new LoadUsersRoutes();
exports.default = loadUsersRoutes.router;
