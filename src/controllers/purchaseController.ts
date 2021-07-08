import { request, Request, Response } from "express";
import pool from "../database";

class PurchaseController {
  async listAllPurchases(req: Request, res: Response) {
    const data = await pool.query(
      "SELECT Orden_pedido.numero AS numero, Usuario.nombres AS nombres, Usuario.correo AS correo, Orden_pedido.estado AS estado, Proveedor.rubro AS rubro FROM Orden_pedido INNER JOIN Usuario on Usuario.id = Orden_pedido.usuario_id LEFT JOIN Proveedor ON Proveedor.id = Orden_pedido.proveedor_id"
    );
    res.json({ data });
  }

  async createPurchase(req: Request, res: Response) {
    console.log("esta es la data que me llega");

    let solicitud = req.body.solicitud;
    let comentarios = req.body.comentarios;

    const dataNum = await pool.query(
      "SELECT MAX(numero) AS numero FROM Orden_pedido"
    );

    const dataCreate = {
      numero: dataNum[0].numero + 1,
      factura_id: null,
      usuario_id: req.body.usuario_id.id,
      solicitud,
      comentarios,
      proveedor_id: req.body.proveedor.id,
      estado: req.body.estado,
    };

    await pool.query("INSERT INTO Orden_pedido SET ?", [dataCreate]);

    return res.json({
      error: false,
      message: "El pedido",
      status: 200,
      data: req.body,
    });
  }

  async getPurchase(req: Request, res: Response) {
    const data = await pool.query(
      "SELECT * FROM Orden_pedido INNER JOIN Usuario ON Usuario.id = Orden_pedido.usuario_id INNER JOIN Proveedor ON Proveedor.id = Orden_pedido.proveedor_id where Orden_pedido.numero = ?",
      req.params.numero
    );

    return res.json({
      error: false,
      message: "El terrible detalle",
      status: 200,
      data,
    });
  }

  async listAllVendors(req: Request, res: Response) {
    const data = await pool.query("SELECT * FROM Proveedor");

    return res.json({
      error: false,
      message: "Data cargada correctamente",
      status: 200,
      data: data,
    });
  }

  async deletePurchase(req: Request, res: Response) {
    try {
      await pool.query(
        "DELETE FROM Orden_pedido where numero = ?",
        req.body.numero
      );
      return res.json({
        error: false,
        message: "Orden eliminada correctamente.",
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        error: true,
        message: "Error al eliminar la orden.",
        status: 400,
      });
    }
  }

  async responsePurchase(req: Request, res: Response) {
    const data = await pool.query(
      "SELECT Orden_pedido.numero AS numero, Usuario.id AS usuario_id, Orden_pedido.solicitud AS solicitud, Orden_pedido.comentarios AS comentarios, Orden_pedido.estado AS estado, Proveedor.id AS proveedor_id FROM Orden_pedido INNER JOIN Usuario ON Usuario.id = Orden_pedido.usuario_id INNER JOIN Proveedor ON Proveedor.id = Orden_pedido.proveedor_id where Orden_pedido.numero = ?",
      req.body.numero
    );

    const dataNew = {
      numero: data[0].numero,
      factura_id: null,
      usuario_id: data[0].usuario_id,
      solicitud: data[0].solicitud,
      comentarios: data[0].comentarios,
      estado: data[0].estado,
      respuesta: req.body.respuesta,
      proveedor_id: data[0].proveedor_id,
    };

    await pool.query("UPDATE Orden_pedido SET ? WHERE numero = ?", [
      dataNew,
      req.body.numero,
    ]);
    return res.json({
      error: false,
      message: "Respuesta agregada correctamente.",
      status: 200,
    });
  }

  async aprobarRechazarPurchase(req: Request, res: Response) {
    console.log(req.body);
    const data = await pool.query(
      "SELECT Orden_pedido.numero AS numero, Usuario.id AS usuario_id, Orden_pedido.respuesta AS respuesta, Orden_pedido.solicitud AS solicitud, Orden_pedido.comentarios AS comentarios, Orden_pedido.estado AS estado, Proveedor.id AS proveedor_id FROM Orden_pedido INNER JOIN Usuario ON Usuario.id = Orden_pedido.usuario_id INNER JOIN Proveedor ON Proveedor.id = Orden_pedido.proveedor_id where Orden_pedido.numero = ?",
      req.body.numero
    );

    const dataNew = {
      numero: data[0].numero,
      factura_id: null,
      usuario_id: data[0].usuario_id,
      solicitud: data[0].solicitud,
      comentarios: data[0].comentarios,
      estado: req.body.status,
      respuesta: data[0].respuesta,
      proveedor_id: data[0].proveedor_id,
    };

    await pool.query("UPDATE Orden_pedido SET ? WHERE numero = ?", [
      dataNew,
      req.body.numero,
    ]);

    if (req.body.status === "Aprobado") {
      return res.json({
        error: false,
        message: "Orden de pedido aprobada correctamente.",
        status: 200,
      });
    }
    if (req.body.status === "Rechazado") {
      return res.json({
        error: false,
        message: "Orden de pedido rechazada correctamente.",
        status: 200,
      });
    }
  }
}

export const purchaseController = new PurchaseController();
