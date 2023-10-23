function aaaaaaaaaa(){
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


/**
 * Converts CSV to Markdown Table
 *
 * @param {string} csvContent - The string content of the CSV
 * @param {string} delimiter - The character(s) to use as the CSV column delimiter
 * @param {boolean} hasHeader - Whether to use the first row of Data as headers
 * @param {boolean} useDoubleBarHeader - Whether the header uses double barlines for <th>
 * @returns {string}
 */
// tslint:disable-next-line:max-line-length
function infoToMarkdownTable(delimiter, hasHeader, useDoubleBarHeader) {
    
	// Cambio #1: tab a comma
	// Cambio #2: Cambiar \n por <br>
	
	var csvContent = document.getElementById("input_text").value.trim();
	
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
	document.getElementById('table-output').value = headerOutput + seperatorOutput + rowOutput;
    return headerOutput + seperatorOutput + rowOutput;
	
}
if (typeof module !== 'undefined') {
    module.exports = csvToMarkdown;
}