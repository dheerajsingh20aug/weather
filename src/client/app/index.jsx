import React from 'react';
import {render} from 'react-dom';
import WeatherComponent from './WeatherComponent.jsx';
class App extends React.Component {
  render () {
    return (
       <div className="container">
		    <div className="element">
			  <div className="col-sm-4"></div>
			  <div className="col-sm-4">
			  	<h2>5 days weather forecast</h2>
			  	<WeatherComponent />
			  </div>
			  <div className="col-sm-4"></div>
			</div>
		</div>
    );

  }
}

render(<App/>, document.getElementById('app'));
