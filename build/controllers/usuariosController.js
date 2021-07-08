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
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database"));
class UsuariosController {
    index(req, res) {
        database_1.default.query('describe users');
        res.json({ text: 'Este es un json desde el controlador de index/index' });
    }
    listOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield database_1.default.query(`SELECT * FROM users where email = ?`, [id]);
            res.json({ data });
        });
    }
    listAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query('SELECT * FROM users');
            res.json({ data });
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO users set ? ', [req.body]);
            res.json({ text: 'Este es un json desde el controlador index/create' });
        });
    }
    updateUser(req, res) {
        res.json({ text: 'Este es un json desde el controlador index/update' + ' ' + req.params.id });
    }
    deleteUser(req, res) {
        res.json({ text: 'Este es un json desde el controlador index/delete' + ' ' + req.params.id });
    }
}
exports.usuariosController = new UsuariosController();
