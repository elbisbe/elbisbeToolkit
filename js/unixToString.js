function unixToString(){
    var unix_timestamp = document.getElementById("input_text").value.replace(/[\s\n\r]+/g,'').trim();
    var dat = new Date(parseInt(unix_timestamp));
    var formattedTime = dat.getFullYear() + "-" + ("0" + (dat.getMonth()+1)).slice(-2) + "-" + ("0" + dat.getDate()).slice(-2) + " " + ("0" + dat.getHours()).slice(-2) + ":" + ("0" + dat.getMinutes()).slice(-2) + ":" + ("0" + dat.getSeconds()).slice(-2);
    
    document.getElementById("resultado").innerHTML = formattedTime;
}