function JSONCCToJSON(){
    var json = document.getElementById("input_text").value.replace(/[\s\n\r]+/g,'').trim();

    if (json[0] == "[") json = JSON.parse(json);
    else json = [JSON.parse(json)];

    console.log(json)

    for (var i = 0; i < json.length; i++) {
        for (var key in json[i]) {
            if (typeof json[i][key] === "object" && json[i][key] !== null){
                key2 = Object.keys(json[i][key]);
                json[i][key] = json[i][key][key2];
            }   
        }
    }
      
    document.getElementById("resultado").innerHTML = JSON.stringify(json);
}