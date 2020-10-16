import {Request, Response} from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../../../models/Orphaneges';
import OrphanageServices from '../service/OrphanageServices';
import OrphanageShowServices from '../service/OrphanageShowService';


class OrphanageController {
  async index(request:Request, response:Response){
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find();
    response.json(orphanages);
  }
  async show(request:Request, response:Response){
    const { id }=request.params;

    const orphanageRepository=getRepository(Orphanage);
    const orphanageShowService = new OrphanageShowServices(orphanageRepository);

    const findOneOrphanage = await orphanageShowService.execute(id);
    
    response.json(findOneOrphanage);
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

    if(!name)return response.json({message: 'name is required'})

    if(!latitude)return response.json({message: 'latitude is required'})

    if(!longitude)return response.json({message: 'longitude is required'})

    if(!about)return response.json({message: 'about is required'})

    if(!instructions)return response.json({message: 'instructions is required'})

    if(!opening_hours)return response.json({message: 'opening hours is required'})

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image =>{
      return {path: image.filename}
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