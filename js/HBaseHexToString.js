function unixToString(unix_timestamp){
    var dat = new Date(parseInt(unix_timestamp));
    var formattedTime = dat.getFullYear() + "-" + ("0" + (dat.getMonth()+1)).slice(-2) + "-" + ("0" + dat.getDate()).slice(-2) + " " + ("0" + dat.getHours()).slice(-2) + ":" + ("0" + dat.getMinutes()).slice(-2) + ":" + ("0" + dat.getSeconds()).slice(-2);
    return formattedTime;
}

function toBytes (array) {
    
    var arr = new ArrayBuffer(8);
    var view = new DataView(arr);
    for (i in array) {
        view.setUint8(i, array[i], false);
    }
    return view.getBigInt64();
}

function expandHBaseHex(input){
    if (input.length > 2){
        var p1 = input.substr(0,2);
        var p2 = input[2].charCodeAt(0);
        return [parseInt("0x"+p1), p2]
    }
    else return [parseInt("0x"+input)]

}


function HBaseHexToString(){

    var t = document.getElementById("input_text").value.replace(/\\x/, "").split("\\x");
    var t2 = t.flatMap(expandHBaseHex);
    var t3 = toBytes(t2);
    var t4 = t3 + " ---> " + unixToString(t3);
    document.getElementById("resultado").innerHTML = t4;

}