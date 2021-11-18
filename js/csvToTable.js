function JSONToTable(){
    var json = document.getElementById("input_text").value.replace(/[\s\n\r]+/g,'').trim();

    if (json[0] == "[") json = JSON.parse(json);
    else json = [JSON.parse(json)];

    console.log(json)

    var col = [];
    for (var i = 0; i < json.length; i++) {
        for (var key in json[i]) {
            if (col.indexOf(key) === -1) col.push(key);
        }
    }
    
    // Create a table.
    var table = document.createElement("table");

    // Create table header row using the extracted headers above.
    var tr = table.insertRow(-1);                   // table row.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // add json data to the table as rows.
    for (var i = 0; i < json.length; i++) {

        tr = table.insertRow(-1);
    
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json[i][col[j]];
        }
    }

    // Now, add the newly created table with json data, to a container.
    var divShowData = document.getElementById('resultado');
    divShowData.innerHTML = "";
    divShowData.appendChild(table);

    
    //document.getElementById("resultado").innerHTML = final;
}

function csvToTable(){
    var csv = document.getElementById("input_text").value
    var firstLine = csv.split('\n')[0];
    var col_names = firstLine.split(",");
    var restOfLines = csv.split('\n').slice(1);
    console.log(col_names)

    var table = document.createElement("table");
    var tr = table.insertRow(-1);                   // table row.

    for (var i = 0; i < col_names.length; i++) {
        var th = document.createElement("th");      // table header.
        th.innerHTML = col_names[i];
        tr.appendChild(th);
    }

    //todo elementos de la tabla

    // add json data to the table as rows.
    for (var i = 0; i < restOfLines.length; i++) {

        tr = table.insertRow(-1);
        line = restOfLines[i].split(",");
        for (var j = 0; j < col_names.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = line[j];
        }
    }

    // Now, add the newly created table with json data, to a container.
    var divShowData = document.getElementById('resultado');
    divShowData.innerHTML = "";
    divShowData.appendChild(table);

}