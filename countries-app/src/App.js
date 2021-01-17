import { useEffect, useState } from "react";
import FullCountry from "./components/fullcountry";
import Toggle from "./components/toggle";
import Filter from "./components/filter";
import SearchBox from "./components/search";
import Country from "./components/country";
import { nanoid } from "nanoid";


const FILTER_MAP =  {
  ['']: ()=>true,
  Africa: country => country.region == 'Africa',
  America : country => country.region == 'Americas',
  Asia: country => country.region == 'Asia',
  Europe: country => country.region == 'Europe',
  Oceania: country => country.region == 'Oceania',
}

// const FILTER_COUNTRIES = Object.keys(FILTER_MAP)

function App(props) {
  const [countryOpen,setCountryOpen] = useState(false)
   const [fullcountry,setCountry] = useState(null)
  const [filter,setFilter] = useState('')
  const [ dark, setState]= useState(false);
  const [isLoading,setLoading]= useState(true);
  // const [,set]
   const baseURL = 'https://restcountries.eu/rest/v2/';
   const [countries,setCountries] = useState([])
   const [fixed_countries,setFixedCountries] = useState([])
  var countryList = countries.filter(FILTER_MAP[filter]).map((country,index) => <Country  name={country.name} region={country.region} capital={country.capital} flag={country.flag} population={country.population} key={index} onClick={showFullCountry} id={country.id}/>);
  function showFullCountry(id){
     console.log(id)
    const country = fixed_countries.filter(country => country.id == id );
    setCountry(country[0])
    setCountryOpen(true)
    console.log(country[0])
  }
  function toggleTheme(state){
    setState(state)
  }
  function filterCountries(filter){
    // alert(filter)
    setFilter(filter);
  }
  function onSubmit(country){
    setLoading(true);
    if(country === '') fetchCountry('all');
    else fetchCountry(`name/${country}`)
  }

  function fetchCountry(country){
    fetch(baseURL+country)
    .then(response => response.json())
    .then(res =>{
      setFilter('');
      setCountries(res.map(country => {
        return  {...country, id: 'country-' + nanoid()}
        }));
      setLoading(false)
    })
  }
  useEffect(()=>{
    fetch(baseURL + 'all')
    .then(response => response.json())
    .then(res =>{
      console.log(res)
      const countriesWithId = res.map(country => {
        return  {...country, id: 'country-' + nanoid()}
        });
      setCountries(countriesWithId);
      setFixedCountries(countriesWithId)
      setLoading(false)
    })},
  [])
  function onButtonClick(){
    setCountry(null)
    setCountryOpen(false)
  }

  // function onBorderClick(){

  // }

  useEffect(()=>{
    if(countryOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  
  })
  return (
      <div id="container" className={dark ? " min-h-screen w-full  bg-gray-50 dark" : "min-h-screen  w-full  bg-gray-50 "} >
      <div className="App font-nunito w-full min-h-screen dark:bg-blueGray-750  dark:text-white flex flex-col justify-content-start">
      { fullcountry && <FullCountry country={fullcountry} onButtonClick={onButtonClick} onBorderClick={showFullCountry} countries={fixed_countries}/>}
      <header className='px-4 py-6 flex justify-between items-center shadow-md bg-white dark:bg-blueGray-750 fixed z-50 top-0 w-full'>
        <h1 className="text-2xl font-extrabold">Where in the world?</h1>
        <Toggle toggleTheme={toggleTheme} light={dark}/>
      </header>
     <main className='justify-self-stretch pt-28'>
        <div className='px-4 pt-9 pb-12 flex flex-col justify-between items-start gap-7 h-full'>
          <SearchBox onSubmit={onSubmit}/>
          <Filter onFilter={filterCountries}/>
        </div>
        <div className="w-11/12 max-w-md mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:max-w-none gap-6">
          {isLoading ? <p className="font-semibold text-lg text-center">Loading...</p> : countryList}
        </div>
     </main>
     </div>
    </div>
  );
}

export default App;
