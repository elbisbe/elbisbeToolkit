function m_time(unix_timestamp){
    var dat = new Date(parseInt(unix_timestamp));
    var formattedTime = dat.getFullYear() + "-" + ("0" + dat.getMonth()).slice(-2) + "-" + ("0" + dat.getDate()+1).slice(-2) + " " + ("0" + dat.getHours()).slice(-2) + ":" + ("0" + dat.getMinutes()).slice(-2) + ":" + ("0" + dat.getSeconds()).slice(-2);
    return formattedTime;
}

function compareFunction(a,b){
    //console.log(b[0]);
    //console.log(a[0]);
    //console.log(value);
    return a[0] - b[0]
}

function function1() {
    //alert('Hello');

    //var text = document.getElementById("input_text").value.replace(/ /g,'');
    var text = document.getElementById("input_text").value.replace(/[\s\n\r]+/g,'').trim();
    //document.getElementById("resultado").innerHTML = textr

    //var text3 = text.split(";").flatMap(x => x.split("_")); // flatMap me lo pone al mismo nivel, pero me interesa conservar la estructura del map
    var text3 = text.split(";").map(x => x.split("_"));
    var text3_1 = text3.sort(compareFunction);

    // text3[1][1]


    // Aquí: Paso map para el m_time
    //var text4 = text3;
    var text4 = text3_1.map(x => x.map(m_time).join("----"));


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