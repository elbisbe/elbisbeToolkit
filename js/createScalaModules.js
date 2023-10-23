var lineNumber = 1;

function createScalaModules(){
    var template = document.getElementById("input_text").value.trim();
    var t1 = template.replace("$NUM",lineNumber);

	//var dat = new Date(parseInt(unix_timestamp));
    //var formattedTime = dat.getFullYear() + "-" + ("0" + (dat.getMonth()+1)).slice(-2) + "-" + ("0" + dat.getDate()).slice(-2) + " " + ("0" + dat.getHours()).slice(-2) + ":" + ("0" + dat.getMinutes()).slice(-2) + ":" + ("0" + dat.getSeconds()).slice(-2);
    var previous = document.getElementById("resultado").innerHTML;
    document.getElementById("resultado").innerHTML = previous + "<br>" + t1;
	lineNumber = lineNumber + 1;
}