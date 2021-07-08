import { request, Request, Response } from "express";
import pool from "../database";

class CustomerController {
  async listAllEmpresas(req: Request, res: Response) {
    const data = await pool.query("SELECT * FROM Empresa");
    res.json({ data });
  }

  async createCustomer(req: Request, res: Response) {
    const dataUser = {
      rut: req.body.rut,
      nombre: req.body.razon_social,
      // giro_comercial: req.body.giro_comercial,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      correo: req.body.correo,
    };

    try {
      await pool.query("INSERT INTO Empresa set ?", [dataUser]);
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

  async deleteCustomer(req: Request, res: Response) {
    try {
      await pool.query("DELETE FROM Empresa where rut = ?", req.body.rut);
      return res.json({
        error: false,
        message: "Empresa eliminada correctamente",
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        error: true,
        message: "Error al eliminar esta empresa",
        status: 400,
      });
    }
  }

  async updateCustomer(req: Request, res: Response) {
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

      await pool.query("UPDATE Empresa set ? WHERE rut = ?", [dataUser, rut]);
      return res.json({
        error: false,
        message: "Empresa modificada correctamente.",
        status: 200,
      });
    } catch (error) {
      console.log("Error al modificar una empresa: ", error);
      return res.json({
        error: true,
        message: "Error al modificar la empresa",
        status: 400,
      });
    }
  }
}

export const customerController = new CustomerController();
