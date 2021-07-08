import { request, Request, Response } from "express";
import pool from "../database";

class InvoiceController {

  async listAllInvoices(req: Request, res: Response) {
    const data = await pool.query(
      "SELECT * FROM Factura INNER JOIN Proveedor on (Proveedor.id = Factura.proveedor_id)"
    );
    res.json({ data });
  }

  async createInvoice(req: Request, res: Response) {
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
      await pool.query("INSERT INTO Usuario set ?", [dataUser]);
      return res.json({
        error: false,
        message: "Registro completado con éxito!",
        status: 200,
      });
    } catch (error) {
      console.log("Error al crear un usuario!");
      console.log(error);
      return res.json({
        error: true,
        message: "No se puedo realizar el registro!",
        status: 400,
      });
    }
  }

  async deleteInvoice(req: Request, res: Response) {
    console.log(req.body);

    try {
      await pool.query("DELETE FROM Usuario where id = ?", req.body.id);
      return res.json({
        error: false,
        message: "Usuario eliminado correctamente",
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        error: true,
        message: "Error al eliminar este usuario",
        status: 400,
      });
    }
  }
}

export const invoiceController = new InvoiceController();
