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
exports.indexController = void 0;
const database_1 = __importDefault(require("../database"));
class IndexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query('describe Usuario');
            console.log(data);
            res.json({ text: 'Este es un json desde el controlador de index/index' });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield database_1.default.query(`SELECT * FROM Usuario where email = ?`, [id]);
            res.json({ data });
        });
    }
    listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query('SELECT * FROM Usuario');
            res.json({ data });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                rut: req.body.rut,
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                telefono: req.body.telefono,
                correo: req.body.correo,
                fecha_nacimiento: req.body.fecha_nacimiento,
                rol_id: null,
                empresa_id: null
            };
            yield database_1.default.query('INSERT INTO Usuario set ? ', [req.body]);
            res.json({ text: 'Este es un json desde el controlador index/create' });
        });
    }
    update(req, res) {
        res.json({ text: 'Este es un json desde el controlador index/update' + ' ' + req.params.id });
    }
    delete(req, res) {
        res.json({ text: 'Este es un json desde el controlador index/delete' + ' ' + req.params.id });
    }
}
exports.indexController = new IndexController();
