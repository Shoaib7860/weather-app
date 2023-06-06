import React, { useEffect, useState } from 'react'
import "./tempp.css"


function Tempp() {
  const [city, setCity] = useState("Pakistan");
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7daf66d5d0b2bc7d2b57119fb0404554&units=metric`)
      .then((res) => {
        if (res.status === 200) {
          error && setError(false);
          return res.json()
        } else {
          throw new Error("something went wrong")
        }
      })
      .then((data) => {
        setData(data)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))

  }, [city, error]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCity(e.target.value)
      setInput("")
    }

  }


  return (

    <>
      <div className='bg_img'>
        {!loading ? (
          <>
            <h1 className='city'>{data.name}</h1>
            <div class="form-group">
              <label for="exampleInputEmail1">Search City</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={input} onChange={(e) => setInput(e.target.value)} error={error} onKeyDown={handleSearch} />

            </div>

            {/* <h1 className='city'>{data.name}</h1> */}
            <div className='group'>
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt=''></img>
              <h1>{data.weather[0].main}</h1>
            </div>

            <h1 className='temp'>{data.main.temp} Temp</h1>

            <div className='box-container'>
              <div className='box'>
                <p>Humidity</p>
                <h1>{data.main.humidity}°</h1>
              </div>
              <div className='box'>
                <p>Wind</p>
                <h1>{data.wind.speed} km/h</h1>
              </div>
              <div className='box'>
                <p>Fell Like</p>
                <h1>{data.main.feels_like} C</h1>
              </div>

            </div>

          </>
        ) : (
          <>
            <h2>wait plz .....</h2>
          </>
        )
        }

      </div>




    </>
  )
}

export default Tempp