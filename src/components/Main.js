import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import emailjs from 'emailjs-com';
import Userindex from './Userindex';
import Addcar from './addcar';
class Main extends Component {

  render() {
    console.log("cars map >> " + this.props.Cars)


    return (
      <div className="addcar w-100 h-100">
        <div className="container-fluid w-50   ">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-12  " id="vari">
              <h1>Add Car</h1>

              <form onSubmit={(event) => {
                event.preventDefault()
                const car_number = this.car_number.value
                let national = sessionStorage.getItem('nationalid');
                const Owner_national_number = national
                const model = this.model.value
                const description = this.description.value
                const Color = this.Color.value
                const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                this.props.createCar(car_number, price, Owner_national_number, model, description, Color)
          

                ReactDOM.render(<Userindex/>, document.getElementById('root'));
                console.log("car has been added")
              }}>
                <div className="form-group mr-sm-2">
                  <input
                    id="car_number"
                    type="text"
                    ref={(input) => { this.car_number = input }}
                    className="form-control"
                    placeholder="car number"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="model"
                    type="text"
                    ref={(input) => { this.model = input }}
                    className="form-control"
                    placeholder="model"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="description"
                    type="text"
                    ref={(input) => { this.description = input }}
                    className="form-control"
                    placeholder="description"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="Color"
                    type="text"
                    ref={(input) => { this.Color = input }}
                    className="form-control"
                    placeholder="Color"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="productPrice"
                    type="text"
                    ref={(input) => { this.productPrice = input }}
                    className="form-control"
                    placeholder="Product Price"
                    required />
                </div>
                <button type="submit" className="btn btn-primary">Add Car</button>
              </form>
              <br/><br/><br/><br/>

              

            </div>
          </div>
        </div>
        <p> </p>
        
      </div >
    );
  }
}

export default Main;

/**
        <h2>Cars Information</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">Status</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody id="productList">
            {this.props.Cars.map((Car, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{Car.car_number.toString()}</th>
                  <td>{Car.model} </td>
                  <td>{window.web3.utils.fromWei(Car.price.toString(), 'Ether')} Eth</td>
                  <td>{Car.owner.toString()} </td>
                  <td>{Car.for_sell.toString()} </td>
                  <td>
                    <button class="myButton"
                      id={Car.car_number}
                      value={Car.price}
                      buyerNationl_Number={'11111'}

                      onClick={(event) => {
                        this.props.purchaseCar(event.target.id, event.target.buyerNationl_Number, event.target.value)

                        var templateParams = {
                          email: 'osamamohsen28@gmail.com',
                          subject: 'car status!',
                          content: 'a new car has been added to your account'
                        };
                        emailjs.send('gmail', 'contract', templateParams, 'user_1uZeT6LEFJNjwyTCMOmy1')
                          .then((result) => {
                            console.log(result.text);
                          }, (error) => {
                            console.log(error.text);
                          });
                        ReactDOM.render(<Addcar />, document.getElementById('root'));
                        console.log("clicked !!!")
                      }}
                    >
                      Buy
                </button>
                    <button class="myButton"
                      id={Car.car_number}
                      value={Car.price}

                      onClick={(event) => {
                        this.props.changeCar_state(event.target.id, event.target.value)

                        ReactDOM.render(<Addcar />, document.getElementById('root'));
                        console.log("clicked !!!")
                      }}
                    >
                      Sell
                </button>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>



        <h2>Cars with index map</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Car #</th>
              <th scope="col">Key</th>

              <th scope="col"></th>

            </tr>
          </thead>
          <tbody id="productList">
            {this.props.Indexes.map((index, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{index.toString()}</th>
                  <th scope="row">{key}</th>

                  <td>

                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>

 */