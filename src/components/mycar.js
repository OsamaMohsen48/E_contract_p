import Check from './Check'

import E_contract from "../abis/E_contract.json";
import './App.css';
import React, { Component } from 'react';
import Web3 from 'web3';
import Usernav from './usernav';


class mycar extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const address = await web3.eth.address
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const abi = E_contract.abi
    const networkId = await web3.eth.net.getId()  //get network id dynamcly 5777
    const networkData = E_contract.networks[networkId]
    if (networkData) {
      const marketplace = web3.eth.Contract(abi, networkData.address) //networkData.address == address
      this.setState({ marketplace })
      const name = await marketplace.methods.name().call()
      const carCount = await marketplace.methods.carCount().call()
      const car = await marketplace.methods.Cars(carCount).call()
      const owner = await marketplace.methods.owner().call()
      this.setState({ carCount })
      for (var i = 1; i <= carCount; i++) {
        const car = await marketplace.methods.Cars(i).call()
        const car_n = car.car_number
        const index = await marketplace.methods.indexes(car_n).call()
        this.setState({
          Cars: [...this.state.Cars, car],
          Indexes: [...this.state.Indexes, index]

        })
      }
      for (var i = 1; i <= carCount; i++) {
        const car = await marketplace.methods.Cars(i).call()
        const car_n = car.car_number
        console.log("car_n " + car_n)
        //if (car.ownerN_ID=="29712102100181")
        const index = await marketplace.methods.indexes(car_n).call()
        this.setState({
          Cars: [...this.state.Cars, car],
          Indexes: [...this.state.Indexes, index]

        })
        let natioal = sessionStorage.getItem('nationalid');
        console.log('national ID in My car ' + natioal);
        console.log('car owner ' + car.ownerN_ID)
        if (car.owner == this.state.account) {
          this.setState({
            MyCars: [...this.state.MyCars, car]
          })
        }

      }

      this.setState({ loading: false })
      console.log(this.state.Cars)
      console.log(marketplace)


    }
    else {
      window.alert("marketplace contract not dyployed to detected network :(")
    }


  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      carCount: 0,
      Indexes: [],
      Cars: [],
      MyCars: [],
      loading: true
    }
    this.changeCar_state = this.changeCar_state.bind(this)


  }

  changeCar_state(id, value) {
    this.setState({ loading: true })
    //this.state.contract.methods.chang_Car_price_status( id , price).send({from : this.state.account})
    //el Mafrod y2bal price as argument
    this.state.marketplace.methods.chang_Car_price_status(id, value).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })

  }
  


  render() {
    return (

      <div>
        <Usernav />
        <div className=" w-100 h-100">
        <div className="container-fluid w-100 mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              {this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Check

                  MyCars={this.state.Cars}
                  MyCars={this.state.MyCars}
                  Indexes={this.state.Indexes}
                  changeCar_state = {this.changeCar_state}

                />
              }

            </main>
          </div>
        </div>
        </div>
      </div>
      
      
    );
  }
}

export default mycar;
