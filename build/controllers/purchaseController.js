"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseController = void 0;
const database_1 = __importDefault(require("../database"));
class PurchaseController {
    listAllPurchases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT Orden_pedido.numero AS numero, Usuario.nombres AS nombres, Usuario.correo AS correo, Orden_pedido.estado AS estado, Proveedor.rubro AS rubro FROM Orden_pedido INNER JOIN Usuario on Usuario.id = Orden_pedido.usuario_id LEFT JOIN Proveedor ON Proveedor.id = Orden_pedido.proveedor_id");
            res.json({ data });
        });
    }
    createPurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("esta es la data que me llega");
            let solicitud = req.body.solicitud;
            let comentarios = req.body.comentarios;
            const dataNum = yield database_1.default.query("SELECT MAX(numero) AS numero FROM Orden_pedido");
            const dataCreate = {
                numero: dataNum[0].numero + 1,
                factura_id: null,
                usuario_id: req.body.usuario_id.id,
                solicitud,
                comentarios,
                proveedor_id: req.body.proveedor.id,
                estado: req.body.estado,
            };
            yield database_1.default.query("INSERT INTO Orden_pedido SET ?", [dataCreate]);
            return res.json({
                error: false,
                message: "El pedido",
                status: 200,
                data: req.body,
            });
        });
    }
    getPurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT * FROM Orden_pedido INNER JOIN Usuario ON Usuario.id = Orden_pedido.usuario_id INNER JOIN Proveedor ON Proveedor.id = Orden_pedido.proveedor_id where Orden_pedido.numero = ?", req.params.numero);
            return res.json({
                error: false,
                message: "El terrible detalle",
                status: 200,
                data,
            });
        });
    }
    listAllVendors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT * FROM Proveedor");
            return res.json({
                error: false,
                message: "Data cargada correctamente",
                status: 200,
                data: data,
            });
        });
    }
    deletePurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("DELETE FROM Orden_pedido where numero = ?", req.body.numero);
                return res.json({
                    error: false,
                    message: "Orden eliminada correctamente.",
                    status: 200,
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: true,
                    message: "Error al eliminar la orden.",
                    status: 400,
                });
            }
        });
    }
    responsePurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT Orden_pedido.numero AS numero, Usuario.id AS usuario_id, Orden_pedido.solicitud AS solicitud, Orden_pedido.comentarios AS comentarios, Orden_pedido.estado AS estado, Proveedor.id AS proveedor_id FROM Orden_pedido INNER JOIN Usuario ON Usuario.id = Orden_pedido.usuario_id INNER JOIN Proveedor ON Proveedor.id = Orden_pedido.proveedor_id where Orden_pedido.numero = ?", req.body.numero);
            const dataNew = {
                numero: data[0].numero,
                factura_id: null,
                usuario_id: data[0].usuario_id,
                solicitud: data[0].solicitud,
                comentarios: data[0].comentarios,
                estado: data[0].estado,
                respuesta: req.body.respuesta,
                proveedor_id: data[0].proveedor_id,
            };
            yield database_1.default.query("UPDATE Orden_pedido SET ? WHERE numero = ?", [
                dataNew,
                req.body.numero,
            ]);
            return res.json({
                error: false,
                message: "Respuesta agregada correctamente.",
                status: 200,
            });
        });
    }
    aprobarRechazarPurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const data = yield database_1.default.query("SELECT Orden_pedido.numero AS numero, Usuario.id AS usuario_id, Orden_pedido.respuesta AS respuesta, Orden_pedido.solicitud AS solicitud, Orden_pedido.comentarios AS comentarios, Orden_pedido.estado AS estado, Proveedor.id AS proveedor_id FROM Orden_pedido INNER JOIN Usuario ON Usuario.id = Orden_pedido.usuario_id INNER JOIN Proveedor ON Proveedor.id = Orden_pedido.proveedor_id where Orden_pedido.numero = ?", req.body.numero);
            const dataNew = {
                numero: data[0].numero,
                factura_id: null,
                usuario_id: data[0].usuario_id,
                solicitud: data[0].solicitud,
                comentarios: data[0].comentarios,
                estado: req.body.status,
                respuesta: data[0].respuesta,
                proveedor_id: data[0].proveedor_id,
            };
            yield database_1.default.query("UPDATE Orden_pedido SET ? WHERE numero = ?", [
                dataNew,
                req.body.numero,
            ]);
            if (req.body.status === "Aprobado") {
                return res.json({
                    error: false,
                    message: "Orden de pedido aprobada correctamente.",
                    status: 200,
                });
            }
            if (req.body.status === "Rechazado") {
                return res.json({
                    error: false,
                    message: "Orden de pedido rechazada correctamente.",
                    status: 200,
                });
            }
        });
    }
}
exports.purchaseController = new PurchaseController();
