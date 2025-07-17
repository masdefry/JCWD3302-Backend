import Router from 'express';
import { createMemberController } from '../controllers/members.controller';
const membersRouter = Router();

membersRouter.post('/', createMemberController);

export default membersRouter;