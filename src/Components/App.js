//The app.js is the base component - combines react with the index.html
//Import the React module from the react package
import React, { Component } from 'react';
//load our component Router (which is the only item embedded)
import Router from './Router';

import '../index.css';

//App - base component displayed in the index.js ReactDOM.render()
export default class App extends Component {
  render (){
    return (
      <div className="container">
        <Router />
      </div>
    );
  }
}

//"export default class App" does this; comment it out
//export default App;