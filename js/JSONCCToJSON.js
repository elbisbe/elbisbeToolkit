function JSONCCToJSON(){
    var json = document.getElementById("input_text").value.replace(/[\n\r]+/g,'').trim();
	json = JSON.parse(json);
	console.log(json);
	
	var event_list = [];
	console.log(json.length);
	for (var i = 0; i < json.length; i++){
		var value = json[i]["value"]
		console.log(value)
		for (var key in value) {
			if (typeof value[key] === "object" && value[key] !== null){
				key2 = Object.keys(value[key]);
                value[key] = value[key][key2];				
			}
		}
		event_list.push(value);
		console.log(event_list);
		
	}
	
	var json_string = event_list.map(element => (JSON.stringify(element)+"<br><br>"))
	//forEach no devuelve...
	console.log(json_string);
    document.getElementById("resultado").innerHTML = json_string;
}

/*
function JSONCCToJSON(){
    var json = document.getElementById("input_text").value.replace(/[\n\r]+/g,'').trim();

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
*/