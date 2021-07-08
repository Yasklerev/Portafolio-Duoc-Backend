"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/users/listOneUser/:id", userController_1.userController.listOneUser);
        this.router.get("/users/listAllUsers", userController_1.userController.listAllUsers);
        this.router.get("/users/getRoles", userController_1.userController.getRoles);
        this.router.post("/users/createUser", userController_1.userController.createUser);
        this.router.post("/users/updateUser", userController_1.userController.updateUser);
        this.router.post("/users/deleteUser", userController_1.userController.deleteUser);
        this.router.get("/users/getHabitaciones", userController_1.userController.getHabitaciones);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
