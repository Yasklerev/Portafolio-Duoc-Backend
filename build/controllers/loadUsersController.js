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
exports.loadUsersController = void 0;
const database_1 = __importDefault(require("../database"));
class LoadUsersController {
    loadUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            for (let i = 0; i < req.body.length; i++) {
                let data = {
                    rut: req.body[i].rut,
                    nombres: req.body[i].nombres,
                    apellidos: req.body[i].apellidos,
                    telefono: req.body[i].telefono,
                    correo: req.body[i].correo,
                    fecha_nacimiento: req.body[i].fecha_nacimiento,
                    password: "bnm",
                    rol_id: 5,
                    empresa_id: 1,
                    proveedor_id: null,
                };
                yield database_1.default.query("INSERT INTO Usuario SET ?", [data]);
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT Usuario.id as id, Usuario.apellidos as apellidos, Usuario.rut as rut, Usuario.nombres as nombres, Rol.nombre as rol, Usuario.correo as correo FROM Usuario INNER JOIN Rol on (Rol.id = Usuario.rol_id) WHERE Usuario.rol_id = 5 AND Usuario.empresa_id = 1");
            res.json({ data });
        });
    }
    tipoServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT * FROM Tipo_solicitudes");
            res.json({ data });
        });
    }
    crearSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO Solicitudes SET ?", [req.body]);
            res.json({ message: "todo bein" });
        });
    }
    obtenerSolicitudes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT Solicitudes.id as solicitud_id, Usuario.nombres as nombres, Empresa.nombre as nombre_empresa, Usuario.apellidos as apellidos, Usuario.correo as correo_usuario, Usuario.rut as rut, Tipo_solicitudes.nombre as tipo_solicitud, Solicitudes.estado as estado FROM Solicitudes INNER JOIN Usuario ON Usuario.id = Solicitudes.usuario_id INNER JOIN Empresa ON Empresa.id = Solicitudes.empresa_id INNER JOIN Tipo_solicitudes ON Tipo_solicitudes.id = Solicitudes.tipo_solicitud_id");
            res.json({ data });
        });
    }
    obtenerSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.solicitud_id);
            const data = yield database_1.default.query("SELECT Empresa.correo as correo_empresa, Empresa.direccion as direccion_empresa, Solicitudes.fecha_inicio as fecha_inicio, Solicitudes.fecha_termino as fecha_termino, Solicitudes.id as solicitud_id, Usuario.nombres as nombres, Empresa.nombre as nombre_empresa, Usuario.apellidos as apellidos, Usuario.correo as correo_usuario, Usuario.rut as rut, Tipo_solicitudes.nombre as tipo_solicitud, Solicitudes.estado as estado FROM Solicitudes INNER JOIN Usuario ON Usuario.id = Solicitudes.usuario_id INNER JOIN Empresa ON Empresa.id = Solicitudes.empresa_id INNER JOIN Tipo_solicitudes ON Tipo_solicitudes.id = Solicitudes.tipo_solicitud_id WHERE Solicitudes.id = ?", req.body.solicitud_id);
            res.json({ data });
        });
    }
}
exports.loadUsersController = new LoadUsersController();
