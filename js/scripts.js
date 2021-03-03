function intervalParser_m_time(unix_timestamp){
    var dat = new Date(parseInt(unix_timestamp));
    var formattedTime = dat.getFullYear() + "-" + ("0" + (dat.getMonth()+1)).slice(-2) + "-" + ("0" + dat.getDate()).slice(-2) + " " + ("0" + dat.getHours()).slice(-2) + ":" + ("0" + dat.getMinutes()).slice(-2) + ":" + ("0" + dat.getSeconds()).slice(-2);
    return formattedTime;
}

function intervalParser_compareFunction(a,b){
    //console.log(b[0]);
    //console.log(a[0]);
    //console.log(value);
    return a[0] - b[0]
}

function intervalParser() {
    //alert('Hello');

    //var text = document.getElementById("input_text").value.replace(/ /g,'');
    var text = document.getElementById("input_text").value.replace(/[\s\n\r]+/g,'').trim();
    //document.getElementById("resultado").innerHTML = textr

    //var text3 = text.split(";").flatMap(x => x.split("_")); // flatMap me lo pone al mismo nivel, pero me interesa conservar la estructura del map
    var text3 = text.split(";").map(x => x.split("_"));
    var text3_1 = text3.sort(intervalParser_compareFunction);

    // text3[1][1]


    // Aquí: Paso map para el m_time
    //var text4 = text3;
    var text4 = text3_1.map(x => x.map(intervalParser_m_time).join("----"));


    //var text4 = text3.map(m_time)
    //var text4 = text3.map(x => x.split("_").map(m_time).join("\n"));
    //var text4 = text3.map(x => x.split("_").join("\n"));
    //var text5 = text4.map(x => x.join("----"))
    var text5 = text4.join("<br />")
    //var text5 = text3.map(x => x.join("<br />")).join("<br /><br />");

    //var text6 = text5.join("<br /> <br />")
    
    document.getElementById("resultado").innerHTML = text5;

    //var elem = document.getElementById("Resultado"); // Click on the checkbox
    //console.log(elem.innerHTML);
}

function toBytes (array) {
    
    var arr = new ArrayBuffer(8); // an Int32 takes 4 bytes
    var view = new DataView(arr);
    for (i in array) {
        view.setUint8(i, array[i], false); // byteOffset = 0; litteEndian = false
    }
    return view.getBigInt64();
}

function HBaseHexToString_map(input){
    if (input.length > 2){
        var p1 = input.substr(0,2);
        var p2 = input[2].charCodeAt(0);
        return [parseInt("0x"+p1), p2]
    }
    else return [parseInt("0x"+input)]

}


function HBaseHexToString(){

    var text1 = document.getElementById("input_text").value.replace(/\\x/, "").split("\\x");
    var text2 = text1.flatMap(HBaseHexToString_map);
    var text3 = toBytes(text2);

    var final = text3 + " ---> " + intervalParser_m_time(text3);

    document.getElementById("resultado").innerHTML = final;

}