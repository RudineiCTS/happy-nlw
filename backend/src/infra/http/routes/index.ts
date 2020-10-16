import {Router} from 'express';

import OrphanageRoute from './orphanage.routes';

const routes = Router();

routes.use('/orphanages', OrphanageRoute);

export default routes;