import {useState} from 'react'

const api = {
  key: "8b58284a7377948cd201a8a4e87b6ec5",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
     if (evt.key === "Enter") {
       fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
       .then(res => res.json())
       .then(result => {
         setWeather(result)
         setQuery('')
         console.log(result)
        })
     }
  }

  let today = new Date()

  return (
    <div className={ (typeof weather.main != "undefined") ? ( (weather.main.temp > 16) ? 'app warn' : 'app') : 'app' }>
      <main>
        { (typeof weather.main != "undefined") ? (  
          <div className="weather-box">
            <div className="weather__temperature">
              {Math.round(weather.main.temp)}&nbsp;&deg;c
            </div>
            <div className="weather__precipitation">{weather.weather[0].main}</div>
          </div>
        ) : ('')}

        <marquee scrollamount="10px">
          <div className="date-box">{today.getDate()} {today.toLocaleString('en-US', { month: 'short' })} {today.getFullYear()}</div>
        </marquee>

        <div className="search-box">
        <div>Check what the weather is in ...</div>
          <input type="text" className="search__bar" placeholder="Krakow" onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>  

        { (typeof weather.main != "undefined") ? (
          <div className="location-box">{weather.name}, {weather.sys.country}</div>    
        ) : ('Enter the city in which you are interested in the weather')}
      </main>
    </div>
  );
}

export default App;
