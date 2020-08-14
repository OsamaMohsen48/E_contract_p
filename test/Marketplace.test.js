const E_contract = artifacts.require('./E_contract.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('E_contract', ([deployer, seller, buyer]) => {
  let contract

  before(async () => {
    contract = await E_contract.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'contract ^ - ^')
    })
    it('car count =0 ', async () => {
      const count = await contract.carCount()
      assert.equal(count, '0')
    })
  })

  describe('cars', async () => {
    let result, carCount, owner

    before(async () => {
      //int car_num ,uint price  , uint ownerN_ID , string memory model 
      // , string memory descrip , string memory colorlet  car_n=123

      result = await contract.createCar('123', web3.utils.toWei('1', 'Ether'), '29712102100181', 'BMW',
        'car is old', 'red', { from: seller })
      owner = await contract.owner()
      carCount = await contract.carCount()
    })

    it('creates car', async () => {
      // SUCCESS
      assert.equal(carCount, 1)
      const event = result.logs[0].args
      // console.log(result.logs)
      // assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
      assert.equal(event.car_num, '123', 'car number is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
      assert.equal(event.ownerN_ID, '29712102100181', 'national number is correct')
      assert.equal(event.owner, seller, 'owner is correct')
      assert.equal(event.for_sell, false, 'for_sell is correct')
      assert.equal(event.Description, 'car is old', 'des is correct')
      assert.equal(event.color, 'red', 'color is correct')


      // FAILURE: Product must have a name
      await await contract.createCar('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
      // FAILURE: Product must have a price
      await await contract.createCar('123', 0, { from: seller }).should.be.rejected;
    })


    it('car status', async () => {
      // SUCCESS

      const event = result.logs[0].args
      // assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
      assert.equal(event.for_sell, false, 'car status changed')
      assert.equal(event.price, '1000000000000000000', 'price is correct')

      await await contract.createCar('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
      // FAILURE: Product must have a price
      await await contract.createCar('123', 0, { from: seller }).should.be.rejected;
    })
    it('lists products', async () => {
      // Track the seller balance before purchase
      const index = await contract.indexes('123')
      const cars = await contract.Cars(index)

      //assert.equal(cars.car_num, '123', 'car number is correct')
      assert.equal(index, '1', 'index is correct')
      assert.equal(cars.price, '1000000000000000000', 'price is correct')
      assert.equal(cars.ownerN_ID, '29712102100181', 'national number is correct')
      assert.equal(cars.owner, seller, 'owner is correct')
      assert.equal(cars.for_sell, false, 'for_sell is correct')
      assert.equal(cars.Description, 'car is old', 'des is correct')
      assert.equal(cars.color, 'red', 'color is correct')



    })


    it('chang_Car_price_status products', async () => {
      // Track the seller balance before purchase
      result = await contract.chang_Car_price_status('123', web3.utils.toWei('2', 'Ether'), { from: seller })
      //console.log(result.logs)
      const index = await contract.indexes('123')
      const cars = await contract.Cars(index)

      //assert.equal(cars.car_num, '123', 'car number is correct')
      assert.equal(index, '2', 'index is correct')
      assert.equal(cars.price, '2000000000000000000', 'price is correct')
      assert.equal(cars.ownerN_ID, '29712102100181', 'national number is correct')
      assert.equal(cars.owner, seller, 'owner is correct')
      assert.equal(cars.for_sell, true, 'for_sell is correct')
      assert.equal(cars.Description, 'car is old', 'des is correct')
      assert.equal(cars.color, 'red', 'color is correct')

    })



    it('sell Car', async () => {
      let oldSellerBalance
      oldSellerBalance = await web3.eth.getBalance(seller)
      oldSellerBalance = new web3.utils.BN(oldSellerBalance)
      // Track the seller balance before purchase
      result = await contract.sell('123', '12345678912345', { from: buyer, value: web3.utils.toWei('2', 'Ether') })
      //console.log(result.logs)
      const index = await contract.indexes('123')
      const cars = await contract.Cars(index)

      //assert.equal(cars.car_num, '123', 'car number is correct')
      assert.equal(index, '3', 'index is correct')
      assert.equal(cars.price, '2000000000000000000', 'price is correct')
      assert.equal(cars.ownerN_ID, '12345678912345', 'national number is correct')
      assert.equal(cars.owner, buyer, 'owner is correct')
      assert.equal(cars.for_sell, false, 'for_sell is correct')
      assert.equal(cars.Description, 'car is old', 'des is correct')
      assert.equal(cars.color, 'red', 'color is correct')

      let newSellerBalance
      newSellerBalance = await web3.eth.getBalance(seller)
      newSellerBalance = new web3.utils.BN(newSellerBalance)

      let price
      price = web3.utils.toWei('2', 'Ether')
      price = new web3.utils.BN(price)

      //console.log(oldSellerBalance , newSellerBalance , price)

      const expectedBalane = oldSellerBalance.add(price)
      assert.equal(newSellerBalance.toString(), expectedBalane.toString())

    })


  })



})