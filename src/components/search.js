import Navbar from './Navbar'
import Main from './Main'
import Check from './Check'

import Marketplace from "../abis/Marketplace.json"
import './App.css';
import React, { Component } from 'react';
//import logo from '../logo.png';
import Web3 from 'web3'; 


class Addcar extends Component {

  async componentWillMount(){
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

 async loadBlockchainData(){
    const web3 = window.web3
    // Load account
    const address = await web3.eth.address
    const accounts = await web3.eth.getAccounts()
    this.setState({account :accounts[0]})
    const abi=Marketplace.abi 
    const networkId = await web3.eth.net.getId()  //get network id dynamcly 5777
    //const address=Marketplace.networks[networId].address //if thier is no address
    const networkData = Marketplace.networks[networkId]
    if (networkData)
    {
      //const address=Marketplace.networks[networkId].address 
      const marketplace  = web3.eth.Contract(abi , networkData.address) //networkData.address == address
      
      this.setState({marketplace})
    
    const name = await marketplace.methods.name().call()
      console.log(">>>"+name.toString())
     
      const carCount = await marketplace.methods.carCount().call()
      console.log("carCount> "+carCount.toString())

    const car = await marketplace.methods.Cars(carCount).call()
    console.log("Car ownwrId  "+car.ownerN_ID.toString())
    console.log("Car owner  "+car.owner.toString())
    console.log("Car state  "+car.for_sell.toString())
    console.log("Car color  "+car.color.toString())
    console.log("Car car_num  "+car.car_number.toString())
    
      console.log("account >>>"+accounts[0])
      console.log("address >>>"+address)

      const owner = await marketplace.methods.owner().call()
      console.log("owner >>>"+owner.toString())
      this.setState({ carCount })
      
      for (var i = 1; i <= carCount; i++) {
      const car = await marketplace.methods.Cars(i).call()
      const car_n = car.car_number
      console.log("car_n " +car_n)
      const index = await marketplace.methods.indexes(car_n).call()
      this.setState({
        Cars: [...this.state.Cars, car],
        Indexes : [...this.state.Indexes, index]

      })
      }
 for (var i = 1; i <= carCount; i++) {
      const car = await marketplace.methods.Cars(i).call()
      const car_n = car.car_number
      console.log("car_n " +car_n)
      //if (car.ownerN_ID=="29712102100181")
      const index = await marketplace.methods.indexes(car_n).call()
      this.setState({
        Cars: [...this.state.Cars, car],
        Indexes : [...this.state.Indexes, index]

      })

 if (car.ownerN_ID=="29712102100181")
       { this.setState({
          MyCars: [...this.state.MyCars, car]
         })
   }

      }
    
      this.setState({loading : false})
      console.log(this.state.Cars)
      console.log(marketplace)


    }
    else{
      window.alert("marketplace contract not dyployed to detected network :(")
    }
    

  }


  constructor (props){
    super(props)
    this.state={
      account: '',
      carCount : 0,
      Indexes : [],
      Cars : [],
      MyCars : [],
      loading : true 
    }

    this.createCar = this.createCar.bind(this)
    this.purchaseCar = this.purchaseCar.bind(this)
    this.changeCar_state = this.changeCar_state.bind(this)
    //this.sell = this.sell.bind(this)


  }
  //int car_num ,uint price  , uint ownerN_ID , string memory model  , string memory descrip , string memory color
  //send transaction 
 
  createCar(car_num , price , ownerN_ID , model , descrip , color ){
    this.setState({loading : true })
    this.state.marketplace.methods.createCar(car_num , price , ownerN_ID , model , descrip , color).send({from : this.state.account , gas: 1500000})
    .once('receipt' , (receipt)=>{
      this.setState({loading : false})
    }) 
  }

  purchaseCar(id , buyer_N_ID , value){
    this.setState({loading : true })
    this.state.marketplace.methods.sell( id , "444444").send({from : this.state.account , value: value})
    .once('receipt' , (receipt)=>{
      this.setState({loading : false})
    }) 
  }

  changeCar_state( id , value){
    this.setState({loading : true })
    //this.state.marketplace.methods.chang_Car_price_status( id , price).send({from : this.state.account})
    //el Mafrod y2bal price as argument
    this.state.marketplace.methods.chang_Car_price_status( id , value).send({from : this.state.account})
    .once('receipt' , (receipt)=>{
      this.setState({loading : false})
    }) 
  }

//<Navbar account={this.state.account} />
  render (){
    return (
      <div>
    <Navbar  account = {this.state.account} />

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              { this.state.loading 
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                :<Check
               
                MyCars = {this.state.Cars}
                MyCars = {this.state.MyCars}
                Indexes = {this.state.Indexes}
                createCar = {this.createCar }
                purchaseCar = {this.purchaseCar }
                changeCar_state = {this.changeCar_state }

                 />
              }
             
            </main>
          </div>
        </div>
        </div>
        );
  }
}

export default Addcar ;
