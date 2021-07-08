import { request, Request, Response } from "express";
import pool from "../database";

class AuthController {
  public index(req: Request, res: Response) {
    pool.query("describe users");
    res.json({ text: "Este es un json desde el controlador de index/index" });
  }

  async listOneUser(req: Request, res: Response) {
    const { id } = req.params;
    const data = await pool.query(`SELECT * FROM Usuario where correo = ?`, [
      id,
    ]);
    res.json({ data });
  }

  async listAllUsers(req: Request, res: Response) {
    const data = await pool.query(
      "SELECT Usuario.rut as rut, Usuario.nombres as nombre, Rol.nombre as rol, Usuario.correo as correo FROM Usuario INNER JOIN Rol on (Rol.id = Usuario.rol_id)"
    );
    res.json({ data });
  }

  async createUser(req: Request, res: Response) {
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

  async updateUser(req: Request, res: Response) {
    console.log(req.body);
    const query = await pool.query(
      "SELECT * FROM Usuario where correo = ?",
      req.body.correo
    );
    const id_rol = await pool.query(
      "SELECT id FROM Rol where nombre = ?",
      req.body.rol
    );

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

      await pool.query("UPDATE Usuario set ? WHERE correo = ?", [
        dataUser,
        dataUser.correo,
      ]);
      return res.json({
        error: false,
        message: "Usuario modificado correctamente.",
        status: 200,
      });
    } catch (error) {
      console.log("Error al modificar un usuario: ", error);
      return res.json({
        error: true,
        message: "Error al modificar el usuario",
        status: 400,
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM Usuario WHERE id = ?", [id]);
    if (user.length < 1) {
      console.log("No existe este usuario, no se puede eliminar!");
      return res.json({
        text: "No existe este usuario, no se puede eliminar!",
      });
    }
    try {
      await pool.query("DELETE FROM Usuario WHERE id = ?", [id]);
      return res.json({ text: "Usuario eliminado correctamente." });
    } catch (error) {
      console.log("Error al eliminar un usuario: ", error);
      return res.json({ text: "Error al eliminar un usuario: ", error });
    }
  }

  async getRoles(req: Request, res: Response) {
    const data = await pool.query("SELECT id, nombre from Rol");
    res.json({ data });
  }

  async login(req: Request, res: Response) {
    const data = await pool.query(
      "SELECT * FROM Usuario WHERE correo = ? and password = ?",
      [req.body.correo, req.body.password]
    );

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
  }
}

export const authController = new AuthController();
