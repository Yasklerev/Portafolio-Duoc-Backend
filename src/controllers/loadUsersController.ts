import { request, Request, Response } from "express";
import pool from "../database";

class LoadUsersController {
  async loadUsers(req: Request, res: Response) {
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

      await pool.query("INSERT INTO Usuario SET ?", [data]);
    }
  }

  async getUsers(req: Request, res: Response) {
    const data = await pool.query(
      "SELECT Usuario.id as id, Usuario.apellidos as apellidos, Usuario.rut as rut, Usuario.nombres as nombres, Rol.nombre as rol, Usuario.correo as correo FROM Usuario INNER JOIN Rol on (Rol.id = Usuario.rol_id) WHERE Usuario.rol_id = 5 AND Usuario.empresa_id = 1"
    );
    res.json({ data });
  }

  async tipoServicio(req: Request, res: Response) {
    const data = await pool.query("SELECT * FROM Tipo_solicitudes");
    res.json({ data });
  }

  async crearSolicitud(req: Request, res: Response) {
    await pool.query("INSERT INTO Solicitudes SET ?", [req.body]);
    res.json({ message: "todo bein" });
  }

  async obtenerSolicitudes(req: Request, res: Response) {
    const data = await pool.query(
      "SELECT Solicitudes.id as solicitud_id, Usuario.nombres as nombres, Empresa.nombre as nombre_empresa, Usuario.apellidos as apellidos, Usuario.correo as correo_usuario, Usuario.rut as rut, Tipo_solicitudes.nombre as tipo_solicitud, Solicitudes.estado as estado FROM Solicitudes INNER JOIN Usuario ON Usuario.id = Solicitudes.usuario_id INNER JOIN Empresa ON Empresa.id = Solicitudes.empresa_id INNER JOIN Tipo_solicitudes ON Tipo_solicitudes.id = Solicitudes.tipo_solicitud_id"
    );
    res.json({ data });
  }

  async obtenerSolicitud(req: Request, res: Response) {
    console.log(req.body.solicitud_id);

    const data = await pool.query(
      "SELECT Empresa.correo as correo_empresa, Empresa.direccion as direccion_empresa, Solicitudes.fecha_inicio as fecha_inicio, Solicitudes.fecha_termino as fecha_termino, Solicitudes.id as solicitud_id, Usuario.nombres as nombres, Empresa.nombre as nombre_empresa, Usuario.apellidos as apellidos, Usuario.correo as correo_usuario, Usuario.rut as rut, Tipo_solicitudes.nombre as tipo_solicitud, Solicitudes.estado as estado FROM Solicitudes INNER JOIN Usuario ON Usuario.id = Solicitudes.usuario_id INNER JOIN Empresa ON Empresa.id = Solicitudes.empresa_id INNER JOIN Tipo_solicitudes ON Tipo_solicitudes.id = Solicitudes.tipo_solicitud_id WHERE Solicitudes.id = ?",
      req.body.solicitud_id
    );
    res.json({ data });
  }
}

export const loadUsersController = new LoadUsersController();
