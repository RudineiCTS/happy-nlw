import { Repository } from 'typeorm';
import Orphanages from '../../../models/Orphaneges';

class OrphanageShowServices{
  repository;

  constructor(OrphanageRepository:Repository<Orphanages>){
  this.repository = OrphanageRepository;
  }
  async execute(id: string){
    const orphanage = await this.repository.findOneOrFail(id, {
      relations:['images']
    });

    // if(!orphanage){
    //  return ({message:'orphanage is not found!'});
    // }
    return orphanage;
  }
}
export default OrphanageShowServices