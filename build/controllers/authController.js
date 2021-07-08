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
exports.authController = void 0;
const database_1 = __importDefault(require("../database"));
class AuthController {
    index(req, res) {
        database_1.default.query("describe users");
        res.json({ text: "Este es un json desde el controlador de index/index" });
    }
    listOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield database_1.default.query(`SELECT * FROM Usuario where correo = ?`, [
                id,
            ]);
            res.json({ data });
        });
    }
    listAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT Usuario.rut as rut, Usuario.nombres as nombre, Rol.nombre as rol, Usuario.correo as correo FROM Usuario INNER JOIN Rol on (Rol.id = Usuario.rol_id)");
            res.json({ data });
        });
    }
    createUser(req, res) {
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
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const query = yield database_1.default.query("SELECT * FROM Usuario where correo = ?", req.body.correo);
            const id_rol = yield database_1.default.query("SELECT id FROM Rol where nombre = ?", req.body.rol);
            if (query.length < 1) {
                console.log("No existe este usuario, no se puede modificar!");
                return res.json({
                    text: "No existe este usuario, no se puede modificar!",
                });
            }
            try {
                const dataUser = {
                    rut: req.body.rut,
                    nombres: req.body.nombres,
                    correo: req.body.correo,
                    rol_id: id_rol[0].id,
                };
                console.log("la data a actualizar");
                console.log(dataUser);
                yield database_1.default.query("UPDATE Usuario set ? WHERE correo = ?", [
                    dataUser,
                    dataUser.correo,
                ]);
                return res.json({
                    error: false,
                    message: "Usuario modificado correctamente.",
                    status: 200,
                });
            }
            catch (error) {
                console.log("Error al modificar un usuario: ", error);
                return res.json({
                    error: true,
                    message: "Error al modificar el usuario",
                    status: 400,
                });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield database_1.default.query("SELECT * FROM Usuario WHERE id = ?", [id]);
            if (user.length < 1) {
                console.log("No existe este usuario, no se puede eliminar!");
                return res.json({
                    text: "No existe este usuario, no se puede eliminar!",
                });
            }
            try {
                yield database_1.default.query("DELETE FROM Usuario WHERE id = ?", [id]);
                return res.json({ text: "Usuario eliminado correctamente." });
            }
            catch (error) {
                console.log("Error al eliminar un usuario: ", error);
                return res.json({ text: "Error al eliminar un usuario: ", error });
            }
        });
    }
    getRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT id, nombre from Rol");
            res.json({ data });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT * FROM Usuario WHERE correo = ? and password = ?", [req.body.correo, req.body.password]);
            if (data.length < 1) {
                return res.json({
                    error: true,
                    message: "Este usuario no existe en nuestra base de datos!",
                    status: 200,
                });
            }
            if (data.length > 0) {
                return res.json({
                    error: false,
                    message: "Bienvenido " + data[0].nombres,
                    user: data,
                    status: 200,
                });
            }
        });
    }
}
exports.authController = new AuthController();
