
var	clsStopwatch = function() {
		// Private vars
		var	startAt	= 0;
		var	lapTime	= 0;

		var	now	= function() {
				return (new Date()).getTime();
			};

		// Public methods
		this.start = function() {
				startAt	= startAt ? startAt : now();
			};

		this.stop = function() {
				// If running, update elapsed time otherwise keep it
				lapTime	= startAt ? lapTime + now() - startAt : lapTime;
				startAt	= 0; // Paused
			};


		this.reset = function() {
				lapTime = startAt = 0;
			};

		// Duration
		this.time = function() {
				return lapTime + (startAt ? now() - startAt : 0);
			};
};

var x = new clsStopwatch();
var $time;
var clocktimer;
function pad(num, size) {
	var s = "0000" + num;
	return s.substr(s.length - size);
}

function formatTime(time) {
	var h = m = s = ms = 0;
	var newTime = '';

	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );
	ms = time % (60 *1000);

	newTime = pad(s, 2) + ':' + pad(ms, 2);
	return newTime;
}

function show() {
	$time = document.getElementById('time');
	update();
}

function update() {
	$time.innerHTML = formatTime(x.time());
}

function start() {
  if(document.getElementById("start").value=="start"){
		clocktimer = setInterval("update()", 1);
		x.start();
		document.getElementById("start").value="stop";
	}else{
		x.stop();
		document.getElementById("start").value="start";
	}
}

function record() {
		var node = document.createElement("LI");
		var textnode = document.createTextNode(formatTime(x.time()));
		node.appendChild(textnode);
		document.getElementById("list").appendChild(node);
}

function stop() {
	x.stop();
	clearInterval(clocktimer);
}


function reset() {
	var list = document.getElementById("list");
	stop();
	list.innerHTML= "";
	x.reset();
	update();
}
window.addEventListener("keyup", function (event) {
	if (event.keyCode === 83) {
		start();
	}
	if (event.keyCode === 82) {
		reset();
	}
	if (event.keyCode === 84) {
		record();
	}

})
