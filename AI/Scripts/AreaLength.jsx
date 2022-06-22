var totalArea = 0;
var totalObjects = app.activeDocument.selection.length;
var output = "";

for( var i=0; i<app.activeDocument.selection.length; i++ ) {
  totalArea += parseFloat(Math.abs(app.activeDocument.selection[i].area/8.03521617).toFixed(3));
  output += "Object "+(i+1)+" Area: " + (Math.abs(app.activeDocument.selection[i].area/8.03521617).toFixed(3)) + "\nLength: " + (app.activeDocument.selection[i].length/2.8346567).toFixed(3)+"\n\n";
}

alert("Area of "+totalObjects+" objects (mm): "+totalArea+"\n"+output); 