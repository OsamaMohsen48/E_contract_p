pragma solidity ^0.5.0;

contract E_contract {
     string public  name;
    address public owner;
    string public count;
    uint public carCount=0;
    uint public productCount;
    //mapping
    mapping(uint => Car) public Cars;
    //key car_number  //value index
    mapping(int=> uint) public indexes ;

    struct Car {
        uint index; // shaseh
        int car_number;
        uint price;
        uint ownerN_ID;
        string model ;
        string Description;
        string color;
        bool for_sell ;
        address payable owner;
        }


    constructor() public {
        name = "contract ^ - ^";
        count = "count";
        carCount=0;
        productCount=0;
        
    }

    event CarCreated(
        uint index, // shaseh
        int car_num,
        uint price,
        uint ownerN_ID,
        string model ,
        string Description,
        string color,
        bool for_sell ,
        address payable owner
    );

    

    function createCar (int car_num ,uint price  , uint ownerN_ID , string memory model  , string memory descrip , string memory color )
     unique_Car(car_num)  public{

        require(car_num > 0);
        // Increment car count
        carCount+=1;

        Cars[carCount] = Car(carCount,car_num , price , ownerN_ID ,model , descrip , color , false, msg.sender);
        indexes[car_num]=carCount;
        emit CarCreated( carCount,car_num , price , ownerN_ID ,model , descrip , color , false, msg.sender );

    }

 modifier check_car (int id) {
        
    uint indx=indexes[id];
    Car memory car = Cars[indx];
      // Fetch the car

     address payable seller = car.owner;
    require(car.for_sell);
    require(msg.value >= car.price);
    // Require that the buyer is not the seller
    require(seller != msg.sender);
    
    _;
        
    }

    modifier unique_Car (int id) {
        
    uint indx=indexes[id];
    Car memory car = Cars[indx];
      // Fetch the car
    require (car.price==0);
    
    _;
        
    }
    
    
    function chang_Car_price_status (int id , uint price)public {

    // Fetch the car
         uint indx=indexes[id];
         Car memory car = Cars[indx];
    carCount+=1;
    car.for_sell=true;
    car.price=price;
    Cars[carCount] = car;
    indexes[car.car_number]=carCount;
    // Pay the seller
    }
 
 function sell (int id  , uint buyer_N_ID) check_car (id) public  payable {

    // Fetch the car
    uint indx=indexes[id];
    Car memory car = Cars[indx];

    // Fetch the car

    address payable seller = car.owner;
    
    // Update the car
     // Transfer ownership to the buyer
     car.owner = msg.sender;
   
    car.ownerN_ID=buyer_N_ID;
    car.for_sell= false;
    carCount++;
    car.index=carCount;
    indexes[car.car_number]=carCount;
    Cars[carCount] = car;
    // Pay the seller
    address(seller).transfer(msg.value);
    }

}