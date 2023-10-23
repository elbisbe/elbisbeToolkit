var lineNumber = 1;
var resetDuplicate_flag = 1;

if (typeof module !== 'undefined') {
    module.exports = csvToMarkdown;
}

function resetDuplicate(){
	lineNumber = 1;
	resetDuplicate_flag = 1;	
}

function stringUtils(){
	var json_string = document.getElementById("input_text").value.trim();
	var opt_text = document.getElementById("optional_text").value.trim();
	var selector = document.getElementById("beautify_mode").value;
	
	if (selector != "5") resetDuplicate();
	
	var result = ""
	switch (selector) {
		case "1": // Beautify, solo JSON
			try{var json_obj = JSON.parse(json_string);} catch {result = "No es un JSON válido."; break;}
			result = JSON.stringify(json_obj, null, "\t");
			break;
		case "2": // Oneliner
			// Si es JSON, usamos stringify. Si no es un JSON, hacemos un replace y quitamos los \n.
			try{var json_obj = JSON.parse(json_string); result = JSON.stringify(json_obj);} catch{result = json_string.replace(/(\r\n|\n|\r)/g,"");}
			break;
		case "3": // Rellenar al principio
			var multiplelines = json_string.split("\n")
			for (itext of multiplelines){
				result = result + opt_text + itext + "<br>";
			}
			break;
		case "4": // Rellenar al final
			var multiplelines = json_string.split("\n")
			for (itext of multiplelines){
				result = result + itext + opt_text + "<br>";
			}
			break;
		case "5": // smartDuplicate, sin múltiples líneas
				var t1 = json_string.replace("$NUM",lineNumber);
				var previous = document.getElementById("resultado_nocenter").innerHTML;
				if (resetDuplicate_flag) {previous = ""; resetDuplicate_flag = 0};
				result = previous + "<br>" + t1;
				lineNumber = lineNumber + 1;
			break;
		case "6": // JSONCC  sin header a JSON
			var multiplelines = json_string.split("\n")
			var event_list = [];
			for (itext of multiplelines){
				console.log(itext)
				try{var json_obj = JSON.parse(itext);} catch {result = "No es un JSON válido."; break;}
				console.log(json_obj)
				for (var key in json_obj) {
					console.log(key)
					if (typeof json_obj[key] === "object" && json_obj[key] !== null){
						key2 = Object.keys(json_obj[key]);
						json_obj[key] = json_obj[key][key2];				
					}
				}
				event_list.push(json_obj)
			}
			result = event_list.map(element => (JSON.stringify(element)+"<br>")).join("")
			console.log(result);

			break;
		case "7": // JsonUtil a objeto de Scala
			var template = json_string.replace(/\|/g, "").trim();
			
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

				var temp_result = className + "(";
				
				console.log(json);
				
				for (const item in json) {
					console.log(item)
					console.log(typeof(json[item]))
					
					
					if (ItemsWithoutSome.includes(item)){
						temp_result = temp_result + '"' +json[item] + '",'
					}
					else if (typeof(json[item]) == "string"){
						temp_result = temp_result + 'Some("' + json[item] + '"),'
					}
					else if (typeof(json[item]) == "number"){
						temp_result = temp_result + 'Some(' + json[item] + 'L),'
					}
					else // Se asume null
						temp_result = temp_result + 'None,'
				}
				temp_result = temp_result.slice(0, -1) + ")";
				result = result + temp_result + "<br>";
			}
			break;
		case "8": // CSV a Tabla Markdown
			
			var delimiter = void 0;
			var hasHeader = void 0;
			var useDoubleBarHeader = void 0;
			var csvContent = json_string;
			
			//if (delimiter === void 0) { delimiter = '\t'; }
			if (delimiter === void 0) { delimiter = ','; }
			if (hasHeader === void 0) { hasHeader = false; }
			if (useDoubleBarHeader === void 0) { useDoubleBarHeader = false; }
			if (delimiter !== '\t') {
				csvContent = csvContent.replace(/\t/g, '    ');
			}
			var columns = csvContent.split('\n');
			var tabularData = [];
			var maxRowLen = [];
			columns.forEach(function (e, i) {
				if (typeof tabularData[i] === 'undefined') {
					tabularData[i] = [];
				}
				var regex = new RegExp(delimiter + '(?![^"]*"\\B)');
				var row = e.split(regex);
				row.forEach(function (ee, ii) {
					if (typeof maxRowLen[ii] === 'undefined') {
						maxRowLen[ii] = 0;
					}
					maxRowLen[ii] = Math.max(maxRowLen[ii], ee.length);
					tabularData[i][ii] = ee;
				});
			});
			var headerOutput = '';
			var seperatorOutput = '';
			maxRowLen.forEach(function (len) {
				var sizer = Array(len + 1 + 2);
				seperatorOutput += '|' + sizer.join('-');
				headerOutput += '|' + sizer.join(' ');
			});
			headerOutput += '| \n';
			seperatorOutput += '| \n';
			if (hasHeader) {
				headerOutput = '';
			}
			var rowOutput = '';
			tabularData.forEach(function (col, i) {
				maxRowLen.forEach(function (len, y) {
					var row = typeof col[y] === 'undefined' ? '' : col[y];
					var preSpaceCount = 1;
					var postSpaceCount = (len - row.length) + 1;
					if (useDoubleBarHeader) {
						if (i > 0) {
							postSpaceCount++;
							preSpaceCount++;
							if (y > 0) {
								preSpaceCount--;
							}
						}
						if (!hasHeader && i === 0) {
							postSpaceCount++;
							if (y === 0) {
								preSpaceCount++;
							}
						}
					}
					var preSpacing = Array(preSpaceCount + 1).join(' ');
					var spacing = Array(postSpaceCount + 1).join(' ');
					var out = "|".concat(preSpacing).concat(row).concat(spacing);
					if (hasHeader && i === 0) {
						headerOutput += out;
					}
					else {
						rowOutput += out;
					}
				});
				if (hasHeader && i === 0) {
					headerOutput += '| \n';
				}
				else {
					rowOutput += '| \n';
				}
			});
			if (useDoubleBarHeader) {
				headerOutput = headerOutput.replace(/\|/g, '||');
				seperatorOutput = '';
			}
			
			result = headerOutput + seperatorOutput + rowOutput;
	
			break;
		case "9": // CSV a Tabla HTML
		    var csv = json_string;
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
			console.log(table);
			var divShowData = document.getElementById('resultado_nocenter');
			divShowData.innerHTML = "";
			divShowData.appendChild(table);
			break;
		case "10": // JSON a Tabla HTML
		    var json = json_string.replace(/[\s\n\r]+/g,'').trim();

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
			var divShowData = document.getElementById('resultado_nocenter');
			divShowData.innerHTML = "";
			divShowData.appendChild(table);
			break;
		//case "11": // Convertir a ASCII (127)
		//	result = json_string.replace(/[^\x00-\x7F]/g, "");
		//	break;
		case "11": // Convertir a ASCII (256 caracteres)
			result = json_string.replace(/[^\x00-\xFF]/g, "");
			// si algún día quiero ASCII pero con tabs y newlines 
			// console.log("line 1\nline2 \n\ttabbed\nF̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐l̸̢̹̣̤̙͚̱͓̖̹̻̣͇͗͂̃̈͝a̸̢̡̬͕͕̰̖͍̮̪̬̍̏̎̕͘ͅv̸̢̛̠̟̄̿i̵̮͌̑ǫ̶̖͓͎̝͈̰̹̫͚͓̠̜̓̈́̇̆̑͜ͅ".replace(/[\x00-\x08\x0E-\x1F\x7F-\uFFFF]/g, ''))
			break;
		case "12": // Argument Fill
			var multiplelines = json_string.split("\n")
			var event_list = [];
			for (itext of multiplelines){
				result = result + itext.replace("$ARG",opt_text) + "<br>";
			}
			break;
		default:
			result = "Error"
			break;
	}
	
	document.getElementById("resultado_nocenter").innerHTML = result;
}

function check_optional(value) {
	
	var optional_list = ["3","4","12"]
	
	var rellenar = optional_list.includes(value.value)
	document.getElementById("optional").style.display = rellenar ? 'block' : 'none';
}