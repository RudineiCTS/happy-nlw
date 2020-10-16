import {Router} from 'express';
import OrphanageController from '../../../modules/orphanages/controller/OrphanageController';

const orphanageRoute = Router();

orphanageRoute.post('/', OrphanageController.create);
orphanageRoute.get('/', OrphanageController.index);
orphanageRoute.get('/:id', OrphanageController.show);

export default orphanageRoute;