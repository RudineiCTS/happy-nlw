import {Router} from 'express';
import OrphanageController from '../../../modules/orphanages/controller/OrphanageController';

const orphanageRoute = Router();

orphanageRoute.post('/', OrphanageController.create);

export default orphanageRoute;