function unixToString(unix_timestamp){
    var dat = new Date(parseInt(unix_timestamp));
    var formattedTime = dat.getFullYear() + "-" + ("0" + (dat.getMonth()+1)).slice(-2) + "-" + ("0" + dat.getDate()).slice(-2) + " " + ("0" + dat.getHours()).slice(-2) + ":" + ("0" + dat.getMinutes()).slice(-2) + ":" + ("0" + dat.getSeconds()).slice(-2);
    return formattedTime;
}

function test(a,b){
    return a[0]-b[0];
}

    
function intervalParser() {
    var t = document.getElementById("input_text").value.replace(/[\s\n\r]+/g,'').trim();
    console.log(t);
    var t2 = t.split(";").map(x => x.split("_"));
    var t3 = t2.sort(test);
    var t4 = t3.map(x => x.join(" --- ") + " --> " + x.map(unixToString).join(" --- "));
    var t5 = t4.join("<br />")
    document.getElementById("resultado").innerHTML = t5;
}