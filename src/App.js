import React, { useState } from "react";
import './App.css';
const api = {
  key: "76acaafbecdb1d7da8d6eb29d9ab8f3b",
  base: "https://api.openweathermap.org/data/2.5"
}
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result);
        });

    }
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={
      (typeof weather.main !="undefined")
       ? ((weather.main.temp > 24) 
       ? 'app'
       :'app warm')
       :'app warm'
      }>
      <main>
      <div className="searchbox" >
        <input type="text"
          placeholder="Search....."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          style={{
            height: "2.8rem", width: "100%", borderRadius: "1rem",
            boxShadow: "0px 5px rgba(0,0,0,0.2)",
            backgroundColor: "rgba(255,255,255,0.7)", marginTop: "-55px", color: "#313131", fontSize: "20px", transition: "0.4s ease"
          }}
        />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
             <div style={{ marginTop: "3.5rem" }}>
              <div style={{color:"#fff",fontSize:"3.5rem",fontWeight:"600",textAlign:"center",textShadow:"3px 3px rgba(50,50,70,0.5"}}>{weather.name},{weather.sys.country}</div>
              <div style={{color:"#fff",fontSize:"2.4rem",fontWeight:"300",textAlign:"center",fontStyle:"italic",textShadow:"2px 2px rgba(50,50,70,0.5"}}>{dateBuilder(new Date())}</div>
             </div>
        <div style={{ textAlign: "center",marginTop:"2rem" }}>
             <div style={{
            position: "relative", display: "inline-block",
            margin: "1.8rem auto", backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "16px", padding: "15px 25px", color: "#fff", fontSize: "102px", fontWeight: "900", textShadow: "3px 6px rgba(50,50,70,0.5)",
            boxShadow: "3px 6px rgba(0,0,0,0.2)"}}>
            {Math.round(weather.main.temp)}°c
          </div>
          <div style={{ color: "#fff", fontSize:"3rem", fontWeight: "700", textShadow: "3px 3px rgba(50,50,70,0.5)",marginTop:"1rem" }} >
            {weather.weather[0].main}
          </div>
        </div>
        </div>
       ) :('')}
      </main>
    </div>
  );
}

export default App;
