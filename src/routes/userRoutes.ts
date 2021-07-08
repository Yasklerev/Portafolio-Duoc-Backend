import { Router } from "express";
import { userController } from "../controllers/userController";

class UserRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/users/listOneUser/:id", userController.listOneUser);
    this.router.get("/users/listAllUsers", userController.listAllUsers);
    this.router.get("/users/getRoles", userController.getRoles);
    this.router.post("/users/createUser", userController.createUser);
    this.router.post("/users/updateUser", userController.updateUser);
    this.router.post("/users/deleteUser", userController.deleteUser);
    this.router.get("/users/getHabitaciones", userController.getHabitaciones);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
