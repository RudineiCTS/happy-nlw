import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../../../models/Orphaneges';
import OrphanageServices from '../service/OrphanageServices';
import OrphanageShowServices from '../service/OrphanageShowService';
import OrphanageView from '../../../views/orphanages_view';


class OrphanageController {
  async index(request:Request, response:Response){
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find({
      relations: ['images']
    });
    response.json(OrphanageView.renderMany(orphanages));
  }
  async show(request:Request, response:Response){
    const { id }=request.params;

    const orphanageRepository=getRepository(Orphanage);
    const orphanageShowService = new OrphanageShowServices(orphanageRepository);

    const findOneOrphanage = await orphanageShowService.execute(id);
    
    response.json(OrphanageView.render(findOneOrphanage));
  }
  async create(request: Request, response: Response){
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    }= request.body;

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image =>{
      return {path: image.filename}
    });

    const data ={
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };
// tratativa de erros com yup
    const schema = Yup.object().shape({
      name:Yup.string().required(),
      latitude: Yup.number().required(),
      longitude:Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array( Yup.object().shape({
        path: Yup.string().required()
      })
      )
    })

    await schema.validate(data, {
      abortEarly: false,
      //mostra todos os campos que estão inválidos
    })
    


    const orphanageRepository = getRepository(Orphanage);
    const orphanageService = new OrphanageServices(orphanageRepository);

    const orphanage = await orphanageService.execute({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    return response.status(201).json(orphanage);
  }
}
export default new OrphanageController();