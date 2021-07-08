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
exports.guestsController = void 0;
const database_1 = __importDefault(require("../database"));
class GuestsController {
    listAllGuests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT Empresa.nombre as empresa, Usuario.id as id, Usuario.nombres as nombres, Usuario.apellidos as apellidos, Usuario.telefono as telefono, Usuario.rut as rut, Rol.nombre as rol, Usuario.correo as correo FROM Usuario INNER JOIN Rol on (Rol.id = Usuario.rol_id) INNER JOIN Empresa on Empresa.id = Usuario.empresa_id where Usuario.rol_id = 5");
            res.json({ data });
        });
    }
    createGuests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = {
                rut: req.body.rut,
                nombre: req.body.razon_social,
                // giro_comercial: req.body.giro_comercial,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                correo: req.body.correo,
            };
            try {
                yield database_1.default.query("INSERT INTO Empresa set ?", [dataUser]);
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
    deleteGuests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("DELETE FROM Empresa where rut = ?", req.body.rut);
                return res.json({
                    error: false,
                    message: "Empresa eliminada correctamente",
                    status: 200,
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: true,
                    message: "Error al eliminar esta empresa",
                    status: 400,
                });
            }
        });
    }
    updateGuests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                const rut = req.body.rut;
                const dataUser = {
                    rut: req.body.rut,
                    nombre: req.body.razon_social,
                    // giro_comercial: req.body.giro_comercial,
                    direccion: req.body.direccion,
                    telefono: req.body.telefono,
                    correo: req.body.correo,
                };
                yield database_1.default.query("UPDATE Empresa set ? WHERE rut = ?", [dataUser, rut]);
                return res.json({
                    error: false,
                    message: "Empresa modificada correctamente.",
                    status: 200,
                });
            }
            catch (error) {
                console.log("Error al modificar una empresa: ", error);
                return res.json({
                    error: true,
                    message: "Error al modificar la empresa",
                    status: 400,
                });
            }
        });
    }
}
exports.guestsController = new GuestsController();
