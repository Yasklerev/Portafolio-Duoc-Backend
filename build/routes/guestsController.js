"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guestsController_1 = require("../controllers/guestsController");
class CustomerRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/guests/listAllGuests", guestsController_1.guestsController.listAllGuests);
        this.router.post("/guests/createGuests", guestsController_1.guestsController.createGuests);
        this.router.post("/guests/updateGuests", guestsController_1.guestsController.updateGuests);
        this.router.post("/guests/deleteGuests", guestsController_1.guestsController.deleteGuests);
    }
}
const customerRoutes = new CustomerRoutes();
exports.default = customerRoutes.router;
