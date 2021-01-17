import React from 'react';
import ReactDOM from 'react-dom';
import './fontawesome';
import './index.css';
import App from './App';
import abstract from "./images/abstract.jpg";
import conf from "./images/conf.jpg";
import intelworker from "./images/intelworker.jpg";
import slider from "./images/slider-4.jpg";
// import team from "./images/team.jpg";



const COUNTRIES = [
  {name: 'Germany',flag:conf, population: 11234567, region: 'Europe' , capital: 'Berlin'},
  {name: 'Nigeria',flag: intelworker, population: 11234567, region: 'Africa' , capital: 'Abuja'},
  {name: 'Ghana',flag: abstract, population: 11234567, region: 'Africa' , capital: 'Accra'},
  {name: 'Ethiopia',flag: slider, population: 11234567, region: 'Africa' , capital: 'Addis-Ababa'},

]
ReactDOM.render(
  <React.StrictMode>
    <App countries={COUNTRIES}/>
  </React.StrictMode>,
  document.getElementById('root')
);
