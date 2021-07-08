"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class IndexRotues {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/index', indexController_1.indexController.index);
        this.router.get('/list/:id', indexController_1.indexController.list);
        this.router.get('/listAll', indexController_1.indexController.listAll);
        this.router.post('/create', indexController_1.indexController.create);
        this.router.put('/update/:id', indexController_1.indexController.update);
        this.router.delete('/delete/:id', indexController_1.indexController.delete);
    }
}
const indexRoutes = new IndexRotues();
exports.default = indexRoutes.router;
