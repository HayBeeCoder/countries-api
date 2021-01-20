import { useEffect, useState } from "react";
import FullCountry from "./components/fullcountry";
import Toggle from "./components/toggle";
import Filter from "./components/filter";
import SearchBox from "./components/search";
import Country from "./components/country";
import { nanoid } from "nanoid";


const FILTER_MAP =  {
  All: ()=>true,
  Africa: country => country.region == 'Africa',
  America : country => country.region == 'Americas',
  Asia: country => country.region == 'Asia',
  Europe: country => country.region == 'Europe',
  Oceania: country => country.region == 'Oceania',
  Polar: country => country.region == 'Polar',

}

function App() {
  const baseURL = 'https://restcountries.eu/rest/v2/';
  
  const [clearSearch,setClearSearch] = useState(false)
  const [countryOpen,setCountryOpen] = useState(false)
   const [fullcountry,setCountry] = useState(null)
  const [filter,setFilter] = useState('All')
  const [ dark, setState]= useState(false);
  const [isLoading,setLoading]= useState(true);
  const [searchedCountry,setSearchCountry] = useState({name: ''})
    const [countries,setCountries] = useState([])
   const [fixed_countries,setFixedCountries] = useState([])
  var countryList = countries.filter(FILTER_MAP[filter]).filter(c => new RegExp('^'+searchedCountry.name,'i').test(c.name)).map((country,index) => <Country  name={country.name} region={country.region} capital={country.capital || 'No Capital!;('} flag={country.flag} population={country.population} key={index} onClick={showFullCountry} id={country.id}/>);
  function showFullCountry(id){
    const country = countries.filter(country => country.id == id );
    setCountry(country[0])
    setCountryOpen(true)
  }
  function toggleTheme(state){
    setState(state)
  }
  function filterCountries(filter){
    setFilter(filter);
    setCountries(fixed_countries)
    setClearSearch(true)
  }
  function onSubmit(country){
  const searched_Country = fixed_countries.filter(c => c.name.match(new RegExp('^'+country,'i')))
  if(searched_Country.length !== 0){
    setCountries(searched_Country)
    setSearchCountry({
      name: country,
      exists:true
    })
  }else{
    setCountries([])
    setSearchCountry({
      name: country,
      exists:false
    })
  }
}

  useEffect(()=>{
    fetch(baseURL + 'all')
    .then(response => response.json())
    .then(res =>{
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

  function updateClearSearch(){
    setClearSearch(false)
  }

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
       {!isLoading && ( <div className='px-4 pt-9 pb-12 flex flex-col justify-between items-start gap-7 h-full lg:flex-row '>
          <SearchBox onSubmit={onSubmit} clearSearch={clearSearch} setClearSearch={updateClearSearch}/>
          <Filter onFilter={filterCountries} currentFilter={filter}/>
        </div>)}
        <div className="w-11/12 max-w-md mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:max-w-none gap-6">
          {isLoading &&  <p className="font-semibold text-lg text-center">Loading...</p> }
          {!isLoading && countryList}
          { searchedCountry.name !== '' && !searchedCountry.exists && <p className="text-sm text-center">No country named  <span className="font-semibold"> {searchedCountry.name.toUpperCase()} </span>is found { filter !== 'All' && <span className="font-semibold ">in {filter.toUpperCase()}</span>}</p> }
        </div> 
     </main>
     </div>
    </div>
  );
}

export default App;
