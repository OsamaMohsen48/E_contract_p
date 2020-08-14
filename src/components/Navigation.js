import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './login';

import App from './App';
import Sign from './Signup';
class Navigation extends Component
{
  login = (event) => {
    event.preventDefault();
    ReactDOM.render(<Login />, document.getElementById('root'));
  }
  signup = (event) => {
    event.preventDefault();
    ReactDOM.render(<Sign />, document.getElementById('root'));
  }
  app = (event) => {
    event.preventDefault();
    ReactDOM.render(<App />, document.getElementById('root'));
  }
    render()
    {
        return(
          
            <nav id="navBar" class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <a className="navbar-brand font-weight-bold" href="#" onClick={this.app}>E-Contract</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> 
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
            
           
        <form className="form-inline my-2 my-lg-0 mx-2 ml-auto" onSubmit={this.login}>
          <button className="btn btn-outline-primary my-2 my-sm-0 "  type="submit">Login</button>
        </form>
        <form className="form-inline my-2 my-lg-0 mx-2 " onSubmit={this.signup}>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Sign up</button>
        </form>
     
      </div>          
        </nav>
        );
    }
   
}
export default Navigation;