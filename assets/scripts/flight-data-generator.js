var city = ["Agartala IXA", "Agra AGR", "Ahmedabad AMD", "Allahabad IXD", "Amritsar ATQ", "Aurangabad IXU", "Bagdogra IXB", "Bangalore BLR", "Bhavnagar BHU", "Bhopal BHO", "Bhubaneswar BBI", "Kolkata CCU", "Chennai MAA", "Goa GOI", "Mumbai BOM", "Nagpur NAG", "Delhi DEL", "Pune PNQ"];
var flight_no = ["A", "B", "C"];
var days = [0, 1, 2, 3, 4, 5, 6];

// constructor
function Flight(flight_no, origin, destination, arrival_time, departure_time, price, running_days) {
    this.flight_no = flight_no;
    this.origin = origin;
    this.destination = destination;
    this.arrival_time = arrival_time;
    this.departure_time = departure_time;
    this.price = price;
    this.flight_running_days = running_days;
    

}



(function(){
    let flightArray = [];
    // create dummy data
    for(let i=0; i<2000; i++) {
        let f_no = findFlightNumber();
        let o = findCity();
        let temp = findCity();
        while(o === temp) {
            temp = findCity();
        }
        let d = temp;
        let a_time = findTime();
        temp = findTime();
        while(a_time === temp) {
            temp = findTime();
        }
        let d_time = temp;
        let p = (Math.random()*10000).toFixed(2);
        let r_days = findRunningDays();
        let f = new Flight(f_no, o, d, a_time, d_time, p, r_days);
        flightArray.push(f);
    }
    // create file and add the data
    
    console.log("Flight details: " + JSON.stringify(flightArray));
})();

function findRunningDays() {
    let r_days = new Set();
    let nDays = parseInt(Math.random()*10);
    while(nDays>6 || nDays === 0) {
        nDays = parseInt(Math.random()*10);
    }
    for(let i=0; i<nDays; i++) {
        let days = parseInt(Math.random()*10);
        while(days>6) {
            days = parseInt(Math.random()*10); 
        }
        r_days.add(days);
    }
    return [...r_days];
}

function findTime() {
    let h = Math.random();
    while(h>0.24) {
        h = Math.random();
    }
    let m = Math.random();
    while(m>0.60) {
        m = Math.random();
    }
    return ("0"+parseInt(h*100)).slice(-2)+":"+("0"+parseInt(m*100)).slice(-2);
}

function findFlightNumber() {
    let t = Math.random();
    while(t>0.2) {
        t = Math.random();
    }
    return flight_no[parseInt(t*10)]+ ("0"+ parseInt(t*1000)).slice(-3);
}

function findCity() {
    let t = parseInt(Math.random()*20);
    while(t>18) {
        t = parseInt(Math.random()*20);
    }
    return city[t];
}