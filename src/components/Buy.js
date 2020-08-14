import Main from './Main'
import E_contract from "../abis/E_contract.json"
import './App.css';
import React, { Component } from 'react';
import Web3 from 'web3';
import emailjs from 'emailjs-com';
import Usernav from './usernav';
import Main2 from './Main2'


class Addcar extends Component {

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
      const contract = web3.eth.Contract(abi, networkData.address) //networkData.address == address

      this.setState({ contract })

      const name = await contract.methods.name().call()
      const carCount = await contract.methods.carCount().call()
      const car = await contract.methods.Cars(carCount).call()
      const owner = await contract.methods.owner().call()
      this.setState({ carCount })
      for (var i = 1; i <= carCount; i++) {
        const car = await contract.methods.Cars(i).call()
        const car_n = car.car_number
        const index = await contract.methods.indexes(car_n).call()
        this.setState({
          Cars: [...this.state.Cars, car],
          Indexes: [...this.state.Indexes, index]

        })
      }
      for (var i = carCount; i > 0; i--) {

        const car = await contract.methods.Cars(i).call()
        if (car.for_sell )
        {
          this.setState({ availablecars: [...this.state.availablecars, car] })
        }
        
       

      }
      console.log("***************************available cars "+ this.state.availablecars);


      let national = sessionStorage.getItem('nationalid');
      var numbers = []
      const carr = await contract.methods.Cars(carCount).call()
      const car_n = carr.car_number.toString()

      const carry = await contract.methods.Cars(1).call()
      const car_ny = carry.car_number.toString()
      // numbers.push(car_n)
      //numbers.push(car_n)
      console.log("-----------------------------------------" + car_ny.toString())
      console.log(car_ny.toString() + "--------" + car_n.toString() + car_n == car_ny)
      console.log("-----------------------------------------" + car_n.toString())

      for (var i = carCount; i > 0; i--) {

        const car = await contract.methods.Cars(i).call()
        const car_n = car.car_number.toString()
        //console.log("this.state.Indexes [car.car_number]"+this.state.Indexes.map((item,i) => <li key={i}>Test</li>))
        //if ( !numbers.includes(car_n) )

        if (numbers.indexOf(car_n) == -1) {
          console.log("befor " + numbers.includes(car.car_number))
          console.log("car.car_number " + car.car_number + " car.ownerN_ID " + car.ownerN_ID + " >>>>>> " + numbers.indexOf(car.car_number) + " >>>>>>> ")

          //if (car.ownerN_ID == national )
          if (car.owner == this.state.account && numbers.indexOf(car.car_number) == (-1)) { this.setState({ MyCars: [...this.state.MyCars, car] }) }
          numbers.push(car_n)
          console.log("after " + numbers.includes(car.car_number))
        }


      }
      this.setState({ loading: false })
      console.log(this.state.Cars)
      console.log(contract)
    }
    else {
      window.alert("contract of prject  not dyployed to detected network :(")
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
      availablecars: [],
      loading: true
    }

    this.createCar = this.createCar.bind(this)
    this.purchaseCar = this.purchaseCar.bind(this)
    this.changeCar_state = this.changeCar_state.bind(this)


  }


  createCar(car_num, price, ownerN_ID, model, descrip, color) {
    this.setState({ loading: true })
    this.state.contract.methods.createCar(car_num, price, ownerN_ID, model, descrip, color).send({ from: this.state.account, gas: 1500000 })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  purchaseCar(id, buyer_N_ID, value) {
    let National_ID = sessionStorage.getItem('nationalid');
    this.setState({ loading: true })
    this.state.contract.methods.sell(id, National_ID).send({ from: this.state.account, value: value })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  changeCar_state(id, value) {
    this.setState({ loading: true })
    //this.state.contract.methods.chang_Car_price_status( id , price).send({from : this.state.account})
    //el Mafrod y2bal price as argument
    this.state.contract.methods.chang_Car_price_status(id, value).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })

  }

  //<Navbar account={this.state.account} />
  render() {
    let National_ID = sessionStorage.getItem('nationalid');
    console.log('national id    ' + National_ID);
    sessionStorage.setItem('cars', this.state.Cars);

    return (
      <div className="w-100">
        <Usernav />

        <div className="container-fluid w-100">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              {this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main2

                  Cars={this.state.Cars}
                  MyCars={this.state.MyCars}
                  availablecars={this.state.availablecars}
                  Indexes={this.state.Indexes}
                  createCar={this.createCar}
                  purchaseCar={this.purchaseCar}
                  changeCar_state={this.changeCar_state}


                />


              }



            </main>


          </div>
        </div>
      </div>
    );
  }
}

export default Addcar;
