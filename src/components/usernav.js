import ReactDOM from 'react-dom';
import './App.css';
import React, { Component } from 'react';
import Addcar from './addcar';
import App from './App';
import Mycars from './mycar';
import Userindex from './Userindex';
import Buy from './Buy';


class usernav extends Component {
  Addcar = (e) => {
    e.preventDefault();
    ReactDOM.render(<Addcar />, document.getElementById('root'));

  }
  logout = (e) => {
    e.preventDefault();
    ReactDOM.render(<App />, document.getElementById('root'));
  }
  mycars = (e) => {
    e.preventDefault();
    ReactDOM.render(<Mycars />, document.getElementById('root'));
  }
  home = (e) => {
    e.preventDefault();
    ReactDOM.render(<Userindex />, document.getElementById('root'));
  }
  buy = (e) => {
    e.preventDefault();
    ReactDOM.render(<Buy />, document.getElementById('root'));
  }

  render() {

    return (
      <div>
        <nav id="navBar" className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#" onClick={this.home}>E-contract</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">


            <ul class="navbar-nav mr-auto ">
              <li className="nav-item active mt-1">
                <a className="nav-link " href="#" onClick={this.home} ><i className="fas fa-home"></i> Home<span class="sr-only">(current)</span></a>
              </li>

              <li className="nav-item mt-1">
                <a className="nav-link " href="#" onClick={this.Addcar}><i className="fas fa-car"></i>Add car </a>
              </li>
              <li className="nav-item mt-1">
                <a className="nav-link " href="#" onClick={this.mycars}><i class="fas fa-car"></i>My cars </a>
              </li>
              <li className="nav-item mt-1">
                <a className="nav-link " href="#" onClick={this.buy}><i class="fas fa-car"></i> Buy car </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 mx-2" onSubmit={this.logout}>
              <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Logout</button>
            </form>

          </div>


        </nav>
      </div>
    );
  }
}
export default usernav;