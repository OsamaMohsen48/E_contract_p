import React, { Component } from 'react';
import Navigation from './Navigation';
//import emailjs from 'emailjs-com';
import ReactDOM from 'react-dom';
import Usernav from './usernav';
import About from './about';

class Userindex extends Component
{
    render(){
        return(
            <div>
                <Usernav/>
                <About/>
            </div>
        );
    
    }

}
export default Userindex;