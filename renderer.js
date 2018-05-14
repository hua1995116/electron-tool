var TOOL_TYPE = 1;
var input1 = document.getElementById('tool-diffs-input-1');
var input2 = document.getElementById('tool-diffs-input-2');
var output = document.getElementById('tool-diffs-output');
var submit = document.getElementById('tool-submit');
var toolType = document.getElementById('tool-type');
var arr = [];

function navLeftHandle() {
	var toolList = document.querySelector('.tool-list');
	toolList.addEventListener('click', function(e) {
		clearActive(toolList);
		var event = e.target || e.srcElement;
		if (!!event && event.className.toLowerCase() === 'tool-list-item') {
			event.classList.add("active");
			TOOL_TYPE = parseInt(event.id, 10);
		}
	});
}

function clearActive(node, treeHeight) {
	var nodeList = node.childNodes;
	for (var i = 0; i < nodeList.length; i++) {
		if (!!nodeList[i] && nodeList[i].className) {
			nodeList[i].classList.remove("active");
		}
	}
}

navLeftHandle();

function calculateHandle() {
	
	submit.addEventListener('click', function() {
		arr = [];
		var a = input1.value.split(',');
		var b = input2.value.split(',');
		var arrJoin = ' ';
		if(toolType.value !== '') {
			arrJoin = toolType.value;
		}
		switch(TOOL_TYPE){
			case 1:
				diffs(a, b);
				output.innerHTML = arr.join(arrJoin);
				break;
			case 2:
				same(a, b);
				output.innerHTML = arr.join(arrJoin);
				break;
			case 3: 
				toSingle(a, b);
				output.innerHTML = arr.join(arrJoin);
				break;
			case 4:
				deleteLine();
				output.innerHTML = arr.join(arrJoin);
				break;
			case 5:
				sortDate(a, b);
				output.innerHTML = arr.join(arrJoin);
				break;
			case 6:
				dataLength(a, b);
				output.innerHTML = arr.join(arrJoin);
				break;
			default:
				break;
		}
	})
}

calculateHandle();


function diffs(a, b) {
	// var a = input1.value.split(',');
	// var b = input2.value.split(',');
	if(a.length < b.length) {
		var c = a;
		a = b;
		b = c;
	}
	for(var i = 0; i < a.length; i++) {
		if(b.indexOf(a[i]) === -1) {
			arr.push(a[i]);
		}
	}
}

function same(a, b) {
	if(a.length < b.length) {
		var c = a;
		a = b;
		b = c;
	}
	for(var i = 0; i < a.length; i++) {
		if(b.indexOf(a[i]) > -1) {
			arr.push(a[i]);
		}
	}
}

function toSingle(a, b) {
	if (a.length > 0) {
		toSingleHandle(a);
		return;
	} 
	if (b.length > 0) {
		toSingleHandle(b);
	}

	function toSingleHandle(data) {
		arr = data.filter(function(item, index) {
			return data.indexOf(item) === index;
		})
	}
}

function deleteLine() {
	var newarr1 = input1.value.split('\n');
	var newarr2 = input2.value.split('\n');
	if (newarr1.length > 0) {
		arr = newarr1;
		return;
	}
	if (newarr2.length > 0) {
		arr = newarr2;
	}
}

function sortDate(a, b) {
	if (a.length > 0) {
		upsort(a);
		return;
	} 
	if (b.length > 0) {
		upsort(b);
	}
	function upsort(a) {
		arr = a.sort(function(c, d) {
			return c - d;
		})
	}
}

function dataLength(a, b) {
	if (a.length > 0) {
		arr.push(a.length);
		return;
	} 
	if (b.length > 0) {
		arr.push(b.length);
	}
}

