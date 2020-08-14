import React, { Component } from 'react';
import Usernav from './usernav';

class Main extends Component {

  render() {

    return (
      <div className="w-100">
      <div className="che w-100">
        <p> </p>

        <h2> Car/s Information</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">National ID</th>
              <th scope="col">Status</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody id="productList">
            {this.props.MyCars.map((Car,key)=>{
              return(
                <tr key={key}>
                    <th scope="row">{Car.car_number.toString()}</th>
                    <td>{Car.model} Eth</td>
                    <td>{window.web3.utils.fromWei(Car.price.toString(), 'Ether')} Eth</td>
                    <td>{Car.owner.toString()} </td>
                    <td>{Car.ownerN_ID.toString()} </td>
                    <td>{Car.for_sell.toString()} </td>
               <td>
                
                <button class="myButton"
                      id = {Car.car_number}
                      value = {Car.price}

                      onClick ={(event) => {
                        this.props.changeCar_state(event.target.id , event.target.value)
                        console.log("clicked !!!")
                        } }
                   >
                     Sell
                </button>
              </td>
            </tr>
            )
            })}

          </tbody>
        </table>

        </div>
      </div>
    );
  }
}

export default Main;

/**
 * <button class="myButton"
                      id = {Car.car_number}
                      value = {Car.price}
                      buyerNationl_Number ={'11111'}

                      onClick ={(event) => {
                        this.props.purchaseCar(event.target.id , event.target.buyerNationl_Number , event.target.value)
                        console.log("clicked !!!")
                        } }
                   >
                     Buy
                </button>
 */