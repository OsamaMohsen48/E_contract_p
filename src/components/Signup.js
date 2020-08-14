import React, { Component } from 'react';
import Navigation from './Navigation';
import './App.css';
import video from './images/back.mp4'
import axios from 'axios';
import ReactDOM from 'react-dom';
import Login from './login';

class Signup extends Component
{
    
    constructor(props)
    {
        const fd=new FormData();
        const fd2=new FormData();

        super(props)
        this.state={
            userName:'',
            email:'',
            password:'',
            age:'',
            national_id:'',
            address:'',
            image:'',
            id_image:''


        }
    }

    handelChange=(e)=>{
        // e.preventDefault();
         this.setState({[e.target.name]:e.target.value})
         //http://localhost/E-contract/public/api/E-contract/login?email=samuelhany@yahoo.com&password=1515
     }

    handelSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state);
        axios.post("http://localhost/E-contract/public/api/E-contract/signup?name="+this.state.userName+"&email="+this.state.email+"&password="+this.state.password+"&national_id="+this.state.national_id+"&address="+this.state.address+"&image="+this.state.image+"&id_image="+this.state.id_image+"&age="+this.state.age)
        .then(response=>{
        ReactDOM.render(<Login />, document.getElementById('root'));
         console.log('added');
        })
        
    }
    render()
    {
        return(
            <div >
                <Navigation />

                
            <header>
  <div class="overlay"></div>
  <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
    <source src={video} type="video/mp4"/>
  </video>
                <div className="container w-25 mt-5 ">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-12" id="vari">
                  <div >
                      
                <form onSubmit={this.handelSubmit} className="border border-dark rounded mt-5 "  method="post"  enctype="multipart/form-data" >
              
                        <div className="form-group mt-3 mx-2 ">
                            <label>User Name</label>
                            <input type="text"  className="form-control" name="userName" onChange={this.handelChange} required/>
                        </div>
                        <div class="form-group mx-2">
                            <label>User Email</label>
                            <input type="email"  className="form-control" name="email" onChange={this.handelChange} required/>
                        </div>
                        <div class="form-group mx-2">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" onChange={this.handelChange} required/>
                        </div>
                        <div class="form-group mx-2">
                            <label>Age</label>
                            <input type="text"className="form-control" name="age" onChange={this.handelChange} required/>
                        </div>
                        <div class="form-group mx-2">
                            <label>National Id</label>
                            <input type="text"  className="form-control" name="national_id" onChange={this.handelChange} required/>
                        </div>
                        <div class="form-group mx-2">
                            <label>Address</label>
                            <input type="text"  className="form-control" name="address" onChange={this.handelChange} required/>
                        </div>
                        <div class="form-group mx-2">
                            <label>Image</label>
                            <input type="file" className="form-control" name="image" onChange={this.handelImage} accept="image/*"/>
                        </div>
                        <div class="form-group mx-2">
                            <label>National Id image</label>
                            <input type="file"  className="form-control" name="id_image" onChange={this.handelNationalimage} required accept="image/*"/>
                        </div>
                        <button className="btn btn-primary mb-4 mx-2" type="submit" id="login" >Sign up</button>
                    </form> 
                    </div>
                </div>
            </div>
        </div>
        </header>
            </div>
        );
    }
}
export default Signup;