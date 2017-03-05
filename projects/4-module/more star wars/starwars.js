document.getElementById("button").addEventListener('click',function(){
  resetBackground();
  genObject.next();
  genObject.next();

})
let elements ={
  name1: document.getElementById('name1'),
  cost1: document.getElementById('cost1'),
  speed1: document.getElementById('speed1'),
  cargo1: document.getElementById('cargo1'),
  passangers1: document.getElementById('passangers1'),
  name2: document.getElementById('name2'),
  cost2: document.getElementById('cost2'),
  speed2: document.getElementById('speed2'),
  cargo2: document.getElementById('cargo2'),
  passangers2: document.getElementById('passangers2')
}
function resetBackground(){
  for(key in elements){
    elements[key].setAttribute('style','background-color: white');
  }
}

function checkValues() {
  if(parseInt(cost1.textContent,10) > parseInt(cost2.textContent,10)){
    cost1.setAttribute('style','background-color:red');
  }else{
    cost2.setAttribute('style','background-color:red');
  }
  if(parseInt(speed1.textContent,10) > parseInt(speed2.textContent,10)){
    speed1.setAttribute('style','background-color:red');
  }else{
    speed2.setAttribute('style','background-color:red');
  }
  if(parseInt(cargo1.textContent,10) > parseInt(cargo2.textContent,10)){
    cargo1.setAttribute('style','background-color:red');
  }else{
    cargo2.setAttribute('style','background-color:red');
  }
  if(parseInt(passangers1.textContent,10) > parseInt(passangers2.textContent,10)){
    console.log('here wrong');
    passangers1.setAttribute('style','background-color:red');
  }else if(parseInt(passangers1.textContent,10) === parseInt(passangers2.textContent,10)){
    console.log('here right');
    return false;
  }else{
    passangers2.setAttribute('style','background-color:red');
  }
}

function* genFunc() {
  while(true){
    yield getShips1();
    yield getShips2();
  }
}

var genObject = genFunc();

function getShips1(){
  let myHeaders = {
    'Content-Type': 'application/json'
  }
  let initialObject = {
    method: 'GET',
    headers: myHeaders
  }

  let url = "http://swapi.co/api/starships/"+document.getElementById("sel1").value

  fetch(url, initialObject).then(function (val) {
    if (val.ok) {
      return val.json();
    }else{
      return Promise.reject(new Error(response.statusText));
    }

  }).then(function(val){
    elements.name1.innerHTML = val.name;
    elements.cost1.innerHTML = val.cost_in_credits;
    elements.speed1.innerHTML = val.max_atmosphering_speed;
    elements.cargo1.innerHTML = val.cargo_capacity;
    elements.passangers1.innerHTML = val.passengers;
  }).catch(function(error){
    console.log(error);
  })
}

function getShips2(){
  let myHeaders = {
    'Content-Type': 'application/json'
  }
  let initialObject = {
    method: 'GET',
    headers: myHeaders
  }

  let url = "http://swapi.co/api/starships/"+document.getElementById("sel2").value

  fetch(url, initialObject).then(function (val) {
    if (val.ok) {
      return val.json();
    }else{
      return Promise.reject(new Error(response.statusText));
    }

  }).then(function(val){
    elements.name2.innerHTML = val.name;
    elements.cost2.innerHTML = val.cost_in_credits;
    elements.speed2.innerHTML = val.max_atmosphering_speed;
    elements.cargo2.innerHTML = val.cargo_capacity;
    elements.passangers2.innerHTML = val.passengers;
  }).then(function(){
      checkValues();
  }).catch(function(error){
    console.log(error);
  })
}
