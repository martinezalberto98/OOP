class Vehicle {

    constructor(make,model,year){
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk (){
        return "beep";
    }
    toString(){
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}`;
    }
}


class Car extends Vehicle{
    constructor(make, model, year){
        super(make, model, year);
    }
    numWheels(){
        return 4;
    }
}

class Motorcycle extends Vehicle {
    constructor(make, model, year){
        super(make, model, year);
    }
    numWheels(){
        return 2;
    }
    revEngine(){
        return "VROOM!!!";
    }
}

class Garage{
    constructor(capacity){
        this.vehicles = [];
        this.capacity = capacity;
    }

add(newVehicle){
    if(!(newVehicle instanceof Vehicle)){
        return "only 2 axel vehicles!!!"
    }
    if(!this.vehicles.length >= this.capacity){
        return "not enough space";
    }

    this.vehicles.push(newVehicle);
    return "added succesfully";
}

}

let garage = new Garage();



