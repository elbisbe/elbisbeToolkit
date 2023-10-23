// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function() {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return date.getFullYear();
}

function updateUnix(){
	var unix = Date.now();
	document.getElementById("unix_now").innerHTML = unix;
}

function setWeekOfYear(){
	var unix = new Date().getWeek();
	document.getElementById("unix_week").innerHTML = unix;
}

updateUnix();
setWeekOfYear();
setInterval(updateUnix, 1000);

function dateToUnix(){
	var date = document.getElementById("datetime_user").value;
	if (!date) {
		document.getElementById("resultado1").innerHTML = "Vacío";
		return;
	}
	var unix = new Date(date).getTime();
	document.getElementById("resultado1").innerHTML = unix;
}

function unixToString(){
    var unix_timestamp = document.getElementById("unix_user").value.replace(/[\s\n\r]+/g,'').trim();
    var dat = new Date(parseInt(unix_timestamp));
    
	var formattedTime = dat.getFullYear() + "-" + ("0" + (dat.getMonth()+1)).slice(-2) + "-" + ("0" + dat.getDate()).slice(-2) + " " + ("0" + dat.getHours()).slice(-2) + ":" + ("0" + dat.getMinutes()).slice(-2) + ":" + ("0" + dat.getSeconds()).slice(-2);
	
	var unixStartOfDay = dat.setHours(0,0,0,0);

	var formattedTimeStartOfDay = dat.getFullYear() + "-" + ("0" + (dat.getMonth()+1)).slice(-2) + "-" + ("0" + dat.getDate()).slice(-2) + " " + ("0" + dat.getHours()).slice(-2) + ":" + ("0" + dat.getMinutes()).slice(-2) + ":" + ("0" + dat.getSeconds()).slice(-2);	
    
	var result = 'Hora actual: ' + formattedTime + '<br> Comienzo del día: ' + unixStartOfDay + " ---> " + formattedTimeStartOfDay;
	
    document.getElementById("resultado2").innerHTML = result;
}

function unixToStartOfDayUnix(){
    var unix_timestamp = document.getElementById("unix_user2").value.replace(/[\s\n\r]+/g,'').trim();
    var dat = new Date(parseInt(unix_timestamp));
    var unix = dat.setHours(0,0,0,0);
    var formattedTime = dat.getFullYear() + "-" + ("0" + (dat.getMonth()+1)).slice(-2) + "-" + ("0" + dat.getDate()).slice(-2) + " " + ("0" + dat.getHours()).slice(-2) + ":" + ("0" + dat.getMinutes()).slice(-2) + ":" + ("0" + dat.getSeconds()).slice(-2);
    
    var final = unix + " ---> " + formattedTime;
    
    document.getElementById("resultado3").innerHTML = final;
}