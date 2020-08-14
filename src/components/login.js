import React, { Component } from 'react';
import Navigation from './Navigation';
//import emailjs from 'emailjs-com';
import ReactDOM from 'react-dom';
import Userindex from './Userindex';
import video from './images/back.mp4'
import './App.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }



    handelSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state.email);
        axios.post('http://localhost/E-contract/public/api/E-contract/login?email=' + this.state.email + '&password=' + this.state.password)
            .then(response => {
              
               
                if (response.data.length == 1) {
                    //return(<Usernav nationalid={response.data[0].national_id} />);
                    // <Usernav nationalid={response.data[0].national_id} />
                    sessionStorage.setItem('nationalid', response.data[0].national_id);
                    sessionStorage.setItem('email', response.data[0].email);
                    ReactDOM.render(<Userindex />, document.getElementById('root'));
                }
               
                   // console.log("ssssssaaaaa");
                    
                    toast.error("invalid email or password",{
                        
                        position:toast.POSITION.BOTTOM_LEFT
                    });
                    //ReactDOM.render(<Login />, document.getElementById('root'));
                
                
                //console.log(response.data.length);


            })

    }
    handelChange = (e) => {
        // e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
        //http://localhost/E-contract/public/api/E-contract/login?email=samuelhany@yahoo.com&password=1515
    }

    render() {
        const { userEmail, userPassword } = this.state;
        return (
            <div>
                <Navigation />
                <header>
                    <div class="overlay"></div>
                    <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
                        <source src={video} type="video/mp4" />
                    </video>
                    <div className="container w-25 mt-5 ">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-md-12" id="vari">
                                <form onSubmit={this.handelSubmit} method="post">
                                    <div className="form-group mt-5">
                                        <label>User Email</label>
                                        <input type="text" className="form-control" name="email" onChange={this.handelChange} />
                                    </div>
                                    <div className="form-group mt-5">
                                        <label>User password</label>
                                        <input type="password" className="form-control" name="password" onChange={this.handelChange} />
                                    </div>
                                    <button className="btn btn-primary mb-4" type="submit" >login</button>
                                </form>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <ToastContainer />
                                
                            </div>
                        </div>
                    </div>
                    </header>
</div>
        );

    }
}
export default Login;