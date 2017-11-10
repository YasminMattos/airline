//Declarando array en cual representa asientos
var airlineSeats = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
];
//contador que verifica el número de asientos ocupados
var busySeats = 0;

var paintSeats = function(array) {
  var containerSeats = document.getElementById('seats');

  for (var i = 0; i<array.length; i++){
    var seat = document.createElement('div');
    seat.className = 'seats';
    //First-class: del índice 0 al 3
    if (i < 4) {
      seat.style.background = '#52BE80';
    } else {
      seat.style.background = '#F4D03F'
    }
    containerSeats.appendChild(seat);
  }
};

var reserve = function() {
  var btn = document.getElementById('btn');
  btn.addEventListener('click', chooseZone);
};

var chooseZone = function() {
  var choice = prompt(
    'Which zone would you prefer to book? \n 1. First Class \n 2. Economic Class \n \n Please enter the number of your preference.'
  );

  if(choice == 1){
    checkFirstClassZone();
  } else if (choice == 2){
    checkEconomicZone();
  } else {
    alert('Please enter a valid number!');
  }
};

var checkFirstClassZone = function() {
  var zone = 'First Class';
  //recorre del asiento 1 al 4 y verifica la disponibilidad
  for(var index = 0; index < 4; index++) {
    if(airlineSeats[index] == false) {
      airlineSeats[index] = true;
      reserveSeat(index);
      printTicket(index, zone);
      busySeats ++;
      break;
    } else if(index == 3 && airlineSeats[index] == true) {
      asignEconomicZone(zone);
    }
  }
};

var checkEconomicZone = function() {
  var zone = 'Economic Class';
  for(var index = 4; index < 10; index++){
    if(airlineSeats[index] == false){
      airlineSeats[index] = true;
      reserveSeat(index);
      printTicket(index, zone);
      busySeats ++;
      break;
    } else if(index == 9 && airlineSeats[index] == true){
      asignFirstClassZone(zone);
    }
  }
};

var reserveSeat = function(indexToPaint) {
  var seat = document.getElementsByClassName('seats');
  seat[indexToPaint].textContent = 'Busy seat';

};

var asignEconomicZone = function(zone) {
  if(busySeats == 10){
    noSeats();
    nextFlight();
  } else {
    var asign = confirm(
      'There are not seats available in '+
       zone +
      ' :c \n Would you like to book in Economic Class? '
       );

    if(asign == true){
      checkEconomicZone();
     } else{
       nextFlight();
     }
  }
};

var asignFirstClassZone = function(zone) {
  if(busySeats == 10){
    noSeats();
    nextFlight();
  } else {
    var asign = confirm(
      'There are not seats available in ' + 
       zone +
       ' :c \n Would you like to book in First Class? '
      );

    if(asign == true){
      checkFirstClassZone();
    } else{
      nextFlight();
    }
  }
};

var printTicket = function(index, zone) {
  var containerTickets = document.getElementById('tickets');
  var ticket = document.createElement('div');
  ticket.className = 'seats';
  var title = document.createElement('p');
  var reservedSeat = document.createElement('p');
  var zoneClass =  document.createElement('p');
  title.textContent = 'BOARDING PASS';
  reservedSeat.textContent = 'Seat number: ' + (index + 1);
  zoneClass.textContent = zone;
  ticket.appendChild(title);
  ticket.appendChild(reservedSeat);
  ticket.appendChild(zoneClass);
  containerTickets.appendChild(ticket);
};

var nextFlight = function() {
  alert('Our next flight will be within three hours')
};

var noSeats = function() {
  alert('Sorry, there are no seats available on this plane');
};

paintSeats(airlineSeats);
reserve();
