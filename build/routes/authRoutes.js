"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/indexUser', authController_1.authController.index);
        this.router.get('/listOneUser/:id', authController_1.authController.listOneUser);
        this.router.get('/listAllUsers', authController_1.authController.listAllUsers);
        this.router.get('/getRoles', authController_1.authController.getRoles);
        this.router.post('/createUser', authController_1.authController.createUser);
        this.router.post('/login/', authController_1.authController.login);
        this.router.post('/updateUser', authController_1.authController.updateUser);
        this.router.delete('/deleteUser/:id', authController_1.authController.deleteUser);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
