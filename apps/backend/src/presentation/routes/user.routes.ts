import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.post('/create', UserController.createUser);
router.get('/findUserById/:userId', UserController.findUserById);
router.get('/findUserByEmail/:userEmail', UserController.findUserByEmail);
router.put('/update/:userId', UserController.updateUser);

export default router;
