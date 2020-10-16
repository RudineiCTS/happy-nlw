import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';

import Image from './Images';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id:number;

  @Column()
  name: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours:string;

  @Column()
  open_on_weekends: boolean;
  
  // oneToMany(1, 2) 
  //1: uma função indicando o tipo de retorno
  //2: campo que retorna o relacionamento inverso, ou seja, o orfanato
  @OneToMany(()=> Image, image => image.orphanage)
  @JoinColumn({name:'orphanage_id'})
  images: Image[];

}