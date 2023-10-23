var lineNumber = 1;

function JSONUtilToObject(){
    var template = document.getElementById("input_text").value.replace(/\|/g, "").trim();
    
	//var multiplelines = template.split("\n")
	var multiplelines = template.split(")")
	.filter(value => value)
	.filter(value => value != "\"\"\"")
	
	var global_result = "";
	
	const ItemsWithoutSome = ["table","op_type","op_ts","current_ts","pos"]
	
	for (itext of multiplelines){
	
		console.log(itext);
		
		var s1 = itext.split("fromJson[")[1];
		var className = s1.split("]")[0];
		var json_s1 = s1.split("]")[1];
		var json_s2 = (json_s1.split('"""')[1].split('"""')[0]).trim();
		//var json_s3 = json_s1.split('{')[1].split('}')[0];

		console.log(json_s2);

		var json = JSON.parse(json_s2);

		var result = className + "(";
		
		console.log(json);
		
		for (const item in json) {
			console.log(item)
			console.log(typeof(json[item]))
			
			
			if (ItemsWithoutSome.includes(item)){
				result = result + '"' +json[item] + '",'
			}
			else if (typeof(json[item]) == "string"){
				result = result + 'Some("' + json[item] + '"),'
			}
			else if (typeof(json[item]) == "number"){
				result = result + 'Some(' + json[item] + 'L),'
			}
			else // Se asume null
				result = result + 'None,'
		}
		
		result = result.slice(0, -1) + ")";
		global_result = global_result + result + "<br>";
		
	}
	document.getElementById("resultado").innerHTML = global_result;

}