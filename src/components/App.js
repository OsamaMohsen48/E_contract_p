//import Addcar from './addcar';
import React, { Component } from 'react';
//import logo from '../logo.png';
import './App.css';

import Navigation from './Navigation';
import About from './about';

class App extends Component {

 

 

  render() {
    return ( 

      <div>
        <Navigation />
       <About />
       
      </div>
    );
  }
}

export default App;
