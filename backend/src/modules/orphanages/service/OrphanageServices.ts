import { Repository } from 'typeorm';
import Images from '../../../models/Images';

import Orphanages from '../../../models/Orphaneges';


interface OrphanageDTO{
  name: string;
  latitude: string;
  longitude: string;
  about: string;
  instructions: string;
  opening_hours:string;
  open_on_weekends: boolean;
  images: {path: string}[] ;
}


class OrphanageServices{
  repository;

  constructor(OrphanageRepository:Repository<Orphanages>){
  this.repository = OrphanageRepository;
  }
  async execute(orphanageDTO:OrphanageDTO){
    const orphanage = this.repository.create(orphanageDTO);

    await this.repository.save(orphanage);

    return orphanage;
  }
}
export default OrphanageServices;