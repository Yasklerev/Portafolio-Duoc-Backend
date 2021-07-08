"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invoicesController_1 = require("../controllers/invoicesController");
class InvoiceRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/invoices/listAllInvioces", invoicesController_1.invoiceController.listAllInvoices);
        this.router.post("/invoices/createInvoice", invoicesController_1.invoiceController.createInvoice);
        this.router.post("/invoices/deleteInvoice", invoicesController_1.invoiceController.deleteInvoice);
    }
}
const invoiceRoutes = new InvoiceRoutes();
exports.default = invoiceRoutes.router;
