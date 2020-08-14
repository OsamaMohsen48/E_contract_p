import ReactDOM from 'react-dom';
import './App.css';
import React, { Component } from 'react';
import Addcar from './addcar';
import Mycar from './mycar';
import Usernav from './usernav';

class addcar2 extends Component {
    mycars = (event) => {
        event.preventDefault();
        ReactDOM.render(<Mycar />, document.getElementById('root'));
    }
    render() {
        return (
            <div>
                <Usernav/>
                <form onSubmit={this.mycars}>
                    <button type='submit'>all cars</button>
                </form>
            </div>
        );
    }
}
export default addcar2;