import { Router } from "express";
import { invoiceController } from "../controllers/invoicesController";

class InvoiceRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/invoices/listAllInvioces", invoiceController.listAllInvoices);
    this.router.post("/invoices/createInvoice", invoiceController.createInvoice);
    this.router.post("/invoices/deleteInvoice", invoiceController.deleteInvoice);
  }
}

const invoiceRoutes = new InvoiceRoutes();
export default invoiceRoutes.router;
