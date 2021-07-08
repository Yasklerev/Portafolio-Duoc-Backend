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
exports.comedorController = void 0;
const database_1 = __importDefault(require("../database"));
class ComedorController {
    tipoPlatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT * FROM Tipo_plato");
            res.json({ data });
        });
    }
    guardarMinuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [
                {
                    plato: req.body[0].plato1,
                    precio: req.body[0].precio1,
                    fecha: req.body[0].fecha.fecha.substring(0, 11),
                    tipo_plato_id: req.body[0].tipo_plato1,
                    comedor_id: 1,
                },
                {
                    plato: req.body[1].plato2,
                    precio: req.body[1].precio2,
                    fecha: req.body[1].fecha.fecha.substring(0, 11),
                    tipo_plato_id: req.body[1].tipo_plato2,
                    comedor_id: 1,
                },
                {
                    plato: req.body[2].plato3,
                    precio: req.body[2].precio3,
                    fecha: req.body[2].fecha.fecha.substring(0, 11),
                    tipo_plato_id: req.body[2].tipo_plato3,
                    comedor_id: 1,
                },
                {
                    plato: req.body[3].plato4,
                    precio: req.body[3].precio4,
                    fecha: req.body[3].fecha.fecha.substring(0, 11),
                    tipo_plato_id: req.body[3].tipo_plato4,
                    comedor_id: 1,
                },
                {
                    plato: req.body[4].plato5,
                    precio: req.body[4].precio5,
                    fecha: req.body[4].fecha.fecha.substring(0, 11),
                    tipo_plato_id: req.body[4].tipo_plato5,
                    comedor_id: 1,
                },
                {
                    plato: req.body[5].plato6,
                    precio: req.body[5].precio6,
                    fecha: req.body[5].fecha.fecha.substring(0, 11),
                    tipo_plato_id: req.body[5].tipo_plato6,
                    comedor_id: 1,
                },
                {
                    plato: req.body[6].plato7,
                    precio: req.body[6].precio7,
                    fecha: req.body[6].fecha.fecha.substring(0, 11),
                    tipo_plato_id: req.body[6].tipo_plato7,
                    comedor_id: 1,
                },
            ];
            for (let i = 0; i < 7; i++) {
                yield database_1.default.query("INSERT INTO Minuta SET ?", [data[i]]);
            }
            return res.json({
                error: false,
                message: "Minuta registrada correctamente!",
                status: 200,
            });
        });
    }
    minutas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query("SELECT * FROM Minuta INNER JOIN Tipo_plato ON Tipo_plato.id = Minuta.tipo_plato_id");
            res.json({ data });
        });
    }
}
exports.comedorController = new ComedorController();
