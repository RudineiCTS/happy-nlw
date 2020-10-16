import {Router} from 'express';
import multer from 'multer';

import OrphanageController from '../../../modules/orphanages/controller/OrphanageController';
import UploadConfig from '../../../config/uploads';

const orphanageRoute = Router();
const uploads = multer(UploadConfig);

orphanageRoute.post('/', uploads.array('images'), OrphanageController.create);
orphanageRoute.get('/', OrphanageController.index);
orphanageRoute.get('/:id',OrphanageController.show);

export default orphanageRoute;