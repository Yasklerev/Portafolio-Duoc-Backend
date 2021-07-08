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
exports.employeeController = void 0;
const database_1 = __importDefault(require("../database"));
class EmployeeController {
    listAllEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT Usuario.id as id, Usuario.nombres as nombres, Usuario.apellidos as apellidos, Usuario.telefono as telefono, Usuario.rut as rut, Rol.nombre as rol, Usuario.correo as correo FROM Usuario INNER JOIN Rol on (Rol.id = Usuario.rol_id) where Usuario.rol_id = 3");
            res.json({ data });
        });
    }
    createInvoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = {
                rut: req.body.rut,
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                telefono: req.body.telefono,
                correo: req.body.correo,
                fecha_nacimiento: req.body.fecha_nacimiento,
                password: req.body.password,
                rol_id: req.body.rol_id,
                empresa_id: req.body.empresa_id,
                proveedor_id: req.body.proveedor_id,
            };
            try {
                yield database_1.default.query("INSERT INTO Usuario set ?", [dataUser]);
                return res.json({
                    error: false,
                    message: "Registro completado con éxito!",
                    status: 200,
                });
            }
            catch (error) {
                console.log("Error al crear un usuario!");
                console.log(error);
                return res.json({
                    error: true,
                    message: "No se puedo realizar el registro!",
                    status: 400,
                });
            }
        });
    }
    deleteInvoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield database_1.default.query("DELETE FROM Usuario where id = ?", req.body.id);
                return res.json({
                    error: false,
                    message: "Usuario eliminado correctamente",
                    status: 200,
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: true,
                    message: "Error al eliminar este usuario",
                    status: 400,
                });
            }
        });
    }
}
exports.employeeController = new EmployeeController();
