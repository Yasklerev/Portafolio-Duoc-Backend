"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
const hostalRoutes_1 = __importDefault(require("./routes/hostalRoutes"));
const purchaseRoutes_1 = __importDefault(require("./routes/purchaseRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const guestsController_1 = __importDefault(require("./routes/guestsController"));
const vendorRoutes_1 = __importDefault(require("./routes/vendorRoutes"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const comedorRoutes_1 = __importDefault(require("./routes/comedorRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const loadUsersRoutes_1 = __importDefault(require("./routes/loadUsersRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use("/api", authRoutes_1.default);
        this.app.use("/api", userRoutes_1.default);
        this.app.use("/api", hostalRoutes_1.default);
        this.app.use("/api", invoiceRoutes_1.default);
        this.app.use("/api", purchaseRoutes_1.default);
        this.app.use("/api", customerRoutes_1.default);
        this.app.use("/api", guestsController_1.default);
        this.app.use("/api", vendorRoutes_1.default);
        this.app.use("/api", employeeRoutes_1.default);
        this.app.use("/api", comedorRoutes_1.default);
        this.app.use("/api", loadUsersRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Servidor en puerto:", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
