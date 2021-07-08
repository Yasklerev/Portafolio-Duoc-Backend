import { Router } from 'express';
import { authController } from '../controllers/authController';

class AuthRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/indexUser', authController.index);
    this.router.get('/listOneUser/:id', authController.listOneUser);
    this.router.get('/listAllUsers', authController.listAllUsers);
    this.router.get('/getRoles', authController.getRoles);
    this.router.post('/createUser', authController.createUser);
    this.router.post('/login/', authController.login);
    this.router.post('/updateUser', authController.updateUser);
    this.router.delete('/deleteUser/:id', authController.deleteUser);
  }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;