import React from 'react';
import {Link} from 'react-router-dom'
import {FiPlus} from 'react-icons/fi';
import {Map, TileLayer} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import markerMapImg from '../images/markerMap.svg';

import '../styles/pages/orphanagesMap.css';

function OrphanegesMap(){
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={markerMapImg} alt="local marker"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Bebedouro</strong>
          <span>São Paulo</span>
        </footer>
      </aside>
      <Map
      center={[-20.9374544,-48.5134939]}
      zoom={15}
      style={{width: '100%', height: '100%'}}
      >
       <TileLayer 
      //  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
       url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
       /> 
      </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color='#fff'/>
      </Link>
    </div>
  );
}
export default OrphanegesMap;