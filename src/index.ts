import express, { Application } from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import invoicesRoutes from "./routes/invoiceRoutes";
import hostalRoutes from "./routes/hostalRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";
import customerRoutes from "./routes/customerRoutes";
import guestsRoutes from "./routes/guestsController";
import vendorRoutes from "./routes/vendorRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import comedorRoutes from "./routes/comedorRoutes";
import morgan from "morgan";
import cors from "cors";
import loadUsersRoutes from "./routes/loadUsersRoutes";

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use("/api", authRoutes);
    this.app.use("/api", userRoutes);
    this.app.use("/api", hostalRoutes);
    this.app.use("/api", invoicesRoutes);
    this.app.use("/api", purchaseRoutes);
    this.app.use("/api", customerRoutes);
    this.app.use("/api", guestsRoutes);
    this.app.use("/api", vendorRoutes);
    this.app.use("/api", employeeRoutes);
    this.app.use("/api", comedorRoutes);
    this.app.use("/api", loadUsersRoutes);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Servidor en puerto:", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
