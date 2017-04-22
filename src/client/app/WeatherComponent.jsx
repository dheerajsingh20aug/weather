import React from 'react';
import moment from 'moment';
import Map from 'es6-map';

class WeatherComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather : {}
    };
    
  }

  // Before rendering (no DOM yet)
  componentWillMount() {
    ////// Call API to get Data /////
    let API  =`http://api.openweathermap.org/data/2.5/forecast?APPID=019a736fd448ec0464f324f3f7063003&units=metric&q=Delhi,in&mode=json`
    fetch(API)
    .then(response => response.json())
    .then( (data) => {
      this.setState({weather:data});
    });
   
  }

  convertKmphToMph(kmph) {
    return kmph * 0.621371
  }

  toSnakeCase(str) {
    return str.replace(/ /g, "_").toLowerCase()
  }

  groupWeatherByDay(list) {
    const days = new Map() // use Map as need we to maintain insertion order

    list.forEach( (w) => {
      const day = moment(w.dt*1000).format("dddd Do MMMM")
      if( !days[day] ) days[day] = []
      days[day].push(w)
    })

    return days;
  }

  getPanel(key, index, day, city, weatherRows) {
      const rows = weatherRows.map( (row) => {
      const time = `${moment(row.dt*1000).format("HH:mm")}`
      const icon = `http://openweathermap.org/img/w/${row.weather[0].icon}.png`
      const iconName = row.weather[0].description
      const temp = `${Math.round(row.main.temp)}°C`
      const arrowStyling = {transform: `rotate(${Math.round(row.wind.deg)}deg)`}
     
      return(
        <div key={time} className="row weatherRow">
          <time className="timestamp col-4">{time}</time>
          <div className="icon col-4"><img src={icon} alt={iconName} title={iconName}/></div>
          <div className="temp col-4">{temp}</div>
        </div>
      )
    })

    return(
      <section id={this.toSnakeCase(day)} className="widget">
        <div className="container">
          {index == 0 ?
          <div>
            <h2 className="city">{city}</h2>
            <h3 className="day">Today</h3>
          </div> :
          <h3 className="day">{day}</h3> }
          {rows}
        </div>
      </section>
    );

  }
   
  render() {
    
    let weather = this.state.weather;
    let city = weather.city && weather.city.name;
   
    let weatherRows = this.groupWeatherByDay( weather.list || [] );

    const weatherPanels = Object.keys(weatherRows).map( (day, index) => (
      this.getPanel(day, index, day, city, weatherRows[day])
    ));
    
    return (
      <main>
        <div className="container">
          <div className="row">
            {weatherPanels}
          </div>
        </div>
      </main>
    );
  }

}

export default WeatherComponent;
