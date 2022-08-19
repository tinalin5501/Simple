/* The code for our drawing application! 
Feel free to delete any/all of it and replace with your own functionality. */

var path;
var currentColor = 'black'
var currentWidth = 0
var currentTool = ""
// for undo and redo
var paths = [];
var redoList = [];

tool.onMouseDown = function(event) { //This code in this function is called whenever the mouse is clicked.
    redoList - []; // clears redo list if new path is added

    path = new Path();     // Create a new path each time.
    path.add(event.point);
    path.strokeColor = currentColor;
    path.strokeWidth = currentWidth;
    console.log(event.point); 
}

tool.onMouseDrag = function(event) {
    path.add(event.point); //Add points to the path as the user drags their mouse.
}

// only add path when mouse is lifted for undo button 
tool.onMouseUp = function(event) {
    paths.push(path);
}


// color selection 
var colorInput = document.getElementById("colorPicker");
var colorCode = document.getElementById("currentColor");

// track which one of the color palette
var tracker = 1;
var palette = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];


// selecting color using the color input
colorInput.addEventListener("input", function(){
    currentColor = colorInput.value;
    colorCode.value = currentColor;
}, false);

// selecting color using color code
colorCode.addEventListener("input", function(){
    currentColor = colorCode.value;
    colorInput.value = currentColor;
}, false);

// change color and color code if palatte color selected
function changeColor() {
    if (currentColor == "white") {
        currentColor = "#FFFFFF"
    } else if (currentColor == "") {
        currentColor = "#000000";
    }

    var hex = rgb2hex(currentColor);

    colorInput.value = hex;
    colorCode.value = hex;
}

// converts rgba to hex 
// source https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
function rgb2hex(rgb) {
    if (  rgb.search("rgb") == -1 ) {
         return rgb;
    } else {
         rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
         function hex(x) {
              return ("0" + parseInt(x).toString(16)).slice(-2);
         }
         return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
    }
}

// function for adding to palette 
$('#add').on('click', function() {
    id = document.getElementById(palette[tracker])
    id.style.background = currentColor;

    tracker++; 
    if (tracker == 12) {
        tracker = 0;
    }
})

// color buttons 
$('#one').on('click', function() {
    var id = document.getElementById("one");
    currentColor = id.style.background;
    changeColor();
})
$('#two').on('click', function() {
    var id = document.getElementById("two");
    currentColor = id.style.background;
    changeColor();
})
$('#three').on('click', function() {
    var id = document.getElementById("three");
    currentColor = id.style.background;
    changeColor();
})
$('#four').on('click', function() {
    var id = document.getElementById("four");
    currentColor = id.style.background;
    changeColor();
})
$('#five').on('click', function() {
    var id = document.getElementById("five");
    currentColor = id.style.background;
    changeColor();
})
$('#six').on('click', function() {
    var id = document.getElementById("six");
    currentColor = id.style.background;
    changeColor();
})
$('#seven').on('click', function() {
    var id = document.getElementById("seven");
    currentColor = id.style.background;
    changeColor();
})
$('#eight').on('click', function() {
    var id = document.getElementById("eight");
    currentColor = id.style.background;
    changeColor();
})
$('#nine').on('click', function() {
    var id = document.getElementById("nine");
    currentColor = id.style.background;
    changeColor();
})
$('#ten').on('click', function() {
    var id = document.getElementById("ten");
    currentColor = id.style.background;
    changeColor();
})
$('#eleven').on('click', function() {
    var id = document.getElementById("eleven");
    currentColor = id.style.background;
    changeColor();
})
$('#twelve').on('click', function() {
    var id = document.getElementById("twelve");
    currentColor = id.style.background;
    changeColor();
})


//drawing buttons

$('#default').on('click', function () { 
    currentTool = "pencil";
    
    if (currentWidth < 1) {
        currentWidth = 2;
    }
   
})

$('#brush').on('click', function () { 
    currentTool = "brush";
    
    if (currentWidth < 20) {
        currentWidth = 20;
    }
})

$('#eraser').on('click', function () { 
    currentColor = 'white';
    currentTool = "eraser";

    changeColor();
})

// clear, redo, undo 

$('#clear').on('click', function () { 
    project.clear();
})

$('#undo').on('click', function () {

    if (paths.length) {
        var path = paths.pop();
        redoList.push(path);
        path.remove();
    }

  })

$('#redo').on('click', function () {
    var redo = redoList.pop()
    paths.push(redo);

    var tempPath = new Path();
    tempPath.strokeColor = redo.strokeColor;
    tempPath.strokeWidth = redo.strokeWidth;
    console.log(redo.segments);
    tempPath.addSegments(redo.segments);
    paths.push(tempPath);

})

// file buttons 

// source https://stackoverflow.com/questions/44666238/how-to-display-uploaded-image-when-user-clicks-on-a-button
var _URL = window.URL || window.webkitURL;

$('#import').on('click', function () {
    $('#import-btn').click();

})

$('#import-btn').on('click', function () {
    var file;
    var image;
    if ((file = $("#import-btn")[0].files[0])) {
        image = new Image();
        image.onload = function () {
            $("#image-wrapper").append(this);
            $(this).attr("id", "image");
        }
        image.src = _URL.createObjectURL(file);
    }
})

// source: https://orclqa.com/copy-url-clipboard/
$('#share').on('click', function () {
    navigator.clipboard.writeText(window.location.href);
    alert("URL copied");
})

// source: https://medium.com/@ivansifrim/draw-with-javascript-and-export-to-svg-with-paper-js-34a06e5621c0
$('#save ').on('click', function () {
    var filename = window.prompt("Give your art a name:") + ".svg";
    var svg = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
    var link = document.createElement("a");
    link.download = filename;
    link.href = svg;
    link.click();
})

 
$(function() {  
    $( "#slider-1" ).slider({  
       min: 0,  
       max: 30, 
       value: currentWidth,
       slide: function( event, ui ) { 
        $( "#stroke_width" ).val(ui.value);
        
        if (currentTool == "pencil") {
            currentWidth =  ui.value; 
        } else if (currentTool == "brush") {
            currentWidth =  ui.value + 20; 
        } else {
            currentWidth =  ui.value + 5; 
        }
       }  
   });   
 });  
    

