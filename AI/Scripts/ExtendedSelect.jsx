/*****************************************************************************************
* ExtendedSelect.jsx for Adobe Illustrator
*
* Copyright (C) 2009 Michael Schmeling, All Rights Reserved.
*
* Author:
* Michael Schmeling
* Arid Ocean Map Illustrations
* http://www.aridocean.com
* http://www.maps.aridocean.com
*
* Allows to select various types of items
* Allows to close selected paths
*
* NOTICE:
* This script is provided "as is" without warranty of any kind.
* The author permits you to use, modify, and distribute it free of any charge.
*
* Versions:
*  1.0 08.08.2009 Initial version
*
******************************************************************************************/

var kOpenFilled = 0;
var kOpenUnfilled = 1;
var kClosedFilled = 2;
var kClosedUnfilled = 3;
var kStroked = 4;
var kUnstroked = 5;
var kDashed = 6;
var kUndashed = 7;
var kGuide = 8;
var kPath = 9;
var kGradient = 10;
var kPattern = 11;
var kRGBColor = 12;
var kCMYKColor = 13;
var kGrayColor = 14;
var kLabColor = 15;
var kSpotColor = 16;



function isEmpty(obj) 
{ 
	for (var i in obj) 
	{ 
		return false; 
	} 
	return true; 
}
                 
function selectPaths(progBar, type)
{  
	var nrFound = 0; 
	
	activeDocument.selection = null;
	var pathItems = activeDocument.pathItems;
	
	for (var i = 0; i < pathItems.length; i++)
	{         
		progBar.value = i*(100.0/(pathItems.length-1));
		
		var item = pathItems[i];
		switch (type)
		{
			case kOpenFilled:
				if ( !item.closed && item.filled ) {  
					item.selected = true;
					nrFound++;
				}
			break;
      
      	case kOpenUnfilled:
				if ( !item.closed && !item.filled ) {  
					item.selected = true;
					nrFound++;
				}
			break;

			case kClosedUnfilled:
				if ( item.closed && !item.filled ) {  
					item.selected = true;
					nrFound++;
				}
			break;

			case kClosedFilled:
				if ( item.closed && item.filled ) {  
					item.selected = true;
					nrFound++;
				}
			break;

			case kStroked:
				if ( item.stroked ) {  
					item.selected = true;
					nrFound++;
				}
			break;

			case kUnstroked:
				if ( !item.stroked ) {  
					item.selected = true;
					nrFound++;
				}
			break;

			case kDashed:
				if ( !isEmpty(item.strokeDashes) ) {  
					item.selected = true;
					nrFound++;
				}
			break;

			case kUndashed:
				if ( isEmpty(item.strokeDashes) ) {  
					item.selected = true;
					nrFound++;
				}
			break;

			case kGuide:
				if (item.guides) {  
					item.selected = true;
					nrFound++;
				}
			break;
         
			case kPath:
				item.selected = true;
				nrFound++;
			break;
           
			case kGradient:
				if (item.filled && item.fillColor.typename == "GradientColor") {
					item.selected = true;
					nrFound++;
				}
			break;

			case kPattern:
				if (item.filled && item.fillColor.typename == "PatternColor") {
					item.selected = true;
					nrFound++;
				}
   		break;

			case kRGBColor:	
				if ( (item.filled && item.fillColor.typename == "RGBColor") || (item.stroked && item.strokeColor.typename == "RGBColor") ) {
					item.selected = true;
					nrFound++;
				}
			break;

			case kCMYKColor:
				if ( (item.filled && item.fillColor.typename == "CMYKColor") || (item.stroked && item.strokeColor.typename == "CMYKColor") ) {
					item.selected = true;
					nrFound++;
				}
			break;
               
			case kGrayColor:              
				if ( (item.filled && item.fillColor.typename == "GrayColor") || (item.stroked && item.strokeColor.typename == "GrayColor") ) {
					item.selected = true;
					nrFound++;
				}
			break;

			/*
			case kLabColor:
				if (item.filled && item.fillColor.typename == "LabColor") {
					item.selected = true;
					nrFound++;
				}
			break;
			*/
         
         /*
			case kSpotColor:
				if (item.filled && item.fillColor.typename == "SpotColor") {
					item.selected = true;
					nrFound++;
				}
			break;
			*/
		}  
	}
	redraw(); 
	return nrFound;
}
                 
function selectItems(progBar, items)
{  
	var nrFound = 0; 
   
	activeDocument.selection = null;
	
	for (var i = 0; i < items.length; i++)
	{         
		progBar.value = i*(100.0/(items.length-1));
		var item = items[i];
		item.selected = true;
		nrFound++;
	}
	redraw(); 
	return nrFound;
}
                 
function selectTransparency(progBar, items)
{                                
	var nr = 0;
	
	for (var i = 0; i < items.length; i++)
	{         
		progBar.value = i*(100.0/(items.length-1));
		var item = items[i]; 
		if (item.opacity < 100.0) {
			item.selected = true;
			nr++;
		}
	}        
	
	return nr;
}
                 
function selectRasterItems(progBar)
{  
	return selectItems(progBar, activeDocument.rasterItems);
}
                 
function selectPlacedItems(progBar)
{  
	return selectItems(progBar, activeDocument.placedItems);
}
                 
function selectCompoundPathItems(progBar)
{  
	return selectItems(progBar, activeDocument.compoundPathItems);
}
                 
function selectGroupItems(progBar)
{  
	return selectItems(progBar, activeDocument.groupItems);
}
                 
function selectMeshItems(progBar)
{  
	return selectItems(progBar, activeDocument.meshItems);
}
                 
function selectSymbolItems(progBar)
{  
	return selectItems(progBar, activeDocument.symbolItems);
}
                 
function selectGraphItems(progBar)
{  
	return selectItems(progBar, activeDocument.graphItems);
}
                 
function selectTransparentItems(progBar)
{  
	var nr = 0;
	activeDocument.selection = null;
	nr += selectTransparency(progBar, activeDocument.layers);
	nr += selectTransparency(progBar, activeDocument.groupItems);
	nr += selectTransparency(progBar, activeDocument.pathItems);
	nr += selectTransparency(progBar, activeDocument.meshItems);
	nr += selectTransparency(progBar, activeDocument.placedItems);
	nr += selectTransparency(progBar, activeDocument.rasterItems);
	nr += selectTransparency(progBar, activeDocument.symbolItems);
	nr += selectTransparency(progBar, activeDocument.textFrames);
	nr += selectTransparency(progBar, activeDocument.graphItems);
	
	redraw();
	return nr;
}
                 
function closeSelectedPaths(progBar)
{  
	var nrFound = 0; 
	
	var pathItems = activeDocument.pathItems;
	
	for (var i = 0; i < pathItems.length; i++)
	{         
		progBar.value = i*(100.0/(pathItems.length-1));
		var item = pathItems[i];
		if (item.selected) {
			if ( !item.closed && item.filled ) {  
				item.closed = true;
				nrFound++;
			}
		}
	}
	redraw(); 
	return nrFound;
}

function SelectDialogBuilder(){ }

SelectDialogBuilder.prototype.run = function()
{
	var retval = true;

	function createBuilderDialog() {
		var dlg = new Window('dialog', 'Extended Select Script © Michael Schmeling, Arid Ocean');
		
		dlg.listPnl = dlg.add('panel', undefined, 'Please select:');
		
		dlg.listPnl.selectList = dlg.listPnl.add("dropdownlist"); 
		dlg.listPnl.selectList.add("item", "Filled open paths"); 
		dlg.listPnl.selectList.add("item", "Unfilled open paths"); 
		dlg.listPnl.selectList.add("item", "Filled closed paths"); 
		dlg.listPnl.selectList.add("item", "Unfilled closed paths"); 
		dlg.listPnl.selectList.add("item", "Stroked paths"); 
		dlg.listPnl.selectList.add("item", "Unstroked paths"); 
		dlg.listPnl.selectList.add("item", "Dashed paths"); 
		dlg.listPnl.selectList.add("item", "Undashed paths"); 
		dlg.listPnl.selectList.add("item", "Raster art"); 
		dlg.listPnl.selectList.add("item", "Placed art"); 
		dlg.listPnl.selectList.add("item", "Paths"); 
		dlg.listPnl.selectList.add("item", "Guides"); 
		dlg.listPnl.selectList.add("item", "Compound paths"); 
		dlg.listPnl.selectList.add("item", "Groups"); 
		dlg.listPnl.selectList.add("item", "Mesh items"); 
		dlg.listPnl.selectList.add("item", "Symbol items"); 
		dlg.listPnl.selectList.add("item", "Graph items"); 
		dlg.listPnl.selectList.add("item", "Transparent items"); 
		dlg.listPnl.selectList.add("item", "Gradient filled paths"); 
		dlg.listPnl.selectList.add("item", "Pattern filled paths"); 
		dlg.listPnl.selectList.add("item", "RGBColor paths"); 
		dlg.listPnl.selectList.add("item", "CMYKColor paths"); 
		dlg.listPnl.selectList.add("item", "GrayColor paths"); 
		//dlg.listPnl.selectList.add("item", "LabColor paths"); 
		//dlg.listPnl.selectList.add("item", "SpotColor paths"); 

		dlg.prgPnl = dlg.add('panel', undefined, 'Progress');
		dlg.prgPnl.progBar = dlg.prgPnl.add("progressbar", [20, 35, 410, 60], 0, 100);
		
		dlg.msgPnl = dlg.add('panel', undefined, 'Result');
		dlg.msgPnl.alignChildren = "right";
                         
		dlg.msgPnl.msg = dlg.msgPnl.add('group');
		with (dlg.msgPnl) {
			msg.et = msg.add('statictext');
			msg.et.preferredSize = [238,30];
		}
		
		dlg.actionPnl = dlg.add('panel', undefined, '');
		dlg.actionPnl.orientation = "column";
		dlg.actionPnl.closePathBtn = dlg.actionPnl.add('button', undefined, 'Close selected paths', {name:'Close selected paths'});
		dlg.actionPnl.exitBtn = dlg.actionPnl.add('button', undefined, 'Exit', {name:'Exit'});
		
		return dlg;
	} 


	function initializeBuilder(builder) {
		setMsgColor = function(msg, red) {
			var g = msg.graphics 
			var c;
			if (red) {
				c  = g.newPen (g.PenType.SOLID_COLOR, [1,0,0,1], 1);
			}
			else {
				c  = g.newPen (g.PenType.SOLID_COLOR, [0,0,0,1], 1);
			}
			g.foregroundColor = c;
		};
	
		with (builder.listPnl) {  
			selectList.onChanging = function() {
				builder.msgPnl.msg.et.text = "";
			};
			
			selectList.onChange = function() {
				builder.prgPnl.progBar.value = 0;	
		
				if (this.selection != null) { 
					var nr = 0;
					                                                  
					this.enabled = false;					                                                  
					if (this.selection.text == "Filled open paths") {
						nr = selectPaths(builder.prgPnl.progBar, kOpenFilled);
					}
					else if (this.selection.text == "Unfilled open paths") {
						nr = selectPaths(builder.prgPnl.progBar, kOpenUnfilled);
					}
					else if (this.selection.text == "Raster art") {
						nr = selectRasterItems(builder.prgPnl.progBar);
					}
					else if (this.selection.text == "Placed art") {
						nr = selectPlacedItems(builder.prgPnl.progBar);
					}
					else if (this.selection.text == "Guides") {
						nr = selectPaths(builder.prgPnl.progBar, kGuide);
					}
					else if (this.selection.text == "Paths") {
						nr = selectPaths(builder.prgPnl.progBar, kPath);
					}
					else if (this.selection.text == "Unfilled closed paths") {
						nr = selectPaths(builder.prgPnl.progBar, kClosedUnfilled);
					}
					else if (this.selection.text == "Filled closed paths") {
						nr = selectPaths(builder.prgPnl.progBar, kClosedFilled);
					}
					else if (this.selection.text == "Stroked paths") {
						nr = selectPaths(builder.prgPnl.progBar, kStroked);
					}
					else if (this.selection.text == "Unstroked paths") {
						nr = selectPaths(builder.prgPnl.progBar, kUnstroked);
					}
					else if (this.selection.text == "Dashed paths") {
						nr = selectPaths(builder.prgPnl.progBar, kDashed);
					}
					else if (this.selection.text == "Undashed paths") {
						nr = selectPaths(builder.prgPnl.progBar, kUndashed);
					}
					else if (this.selection.text == "Compound paths") {
						nr = selectCompoundPathItems(builder.prgPnl.progBar);
					}
					else if (this.selection.text == "Groups") {
						nr = selectGroupItems(builder.prgPnl.progBar);
					}
					else if (this.selection.text == "Mesh items") {
						nr = selectMeshItems(builder.prgPnl.progBar);
					}
					else if (this.selection.text == "Symbol items") {
						nr = selectMeshItems(builder.prgPnl.progBar);
					}
					else if (this.selection.text == "Graph items") {
						nr = selectMeshItems(builder.prgPnl.progBar);
					}
					else if (this.selection.text == "Gradient filled paths") {
						nr = selectPaths(builder.prgPnl.progBar, kGradient);
					}
					else if (this.selection.text == "Pattern filled paths") {
						nr = selectPaths(builder.prgPnl.progBar, kPattern);
					}
					else if (this.selection.text == "RGBColor paths") {
						nr = selectPaths(builder.prgPnl.progBar, kRGBColor);
					}
					else if (this.selection.text == "CMYKColor paths") {
						nr = selectPaths(builder.prgPnl.progBar, kCMYKColor);
					}
					else if (this.selection.text == "GrayColor paths") {
						nr = selectPaths(builder.prgPnl.progBar, kGrayColor);
					}
					else if (this.selection.text == "LabColor filled paths") {
						nr = selectPaths(builder.prgPnl.progBar, kLabColor);
					}
					else if (this.selection.text == "SpotColor filled paths") {
						nr = selectPaths(builder.prgPnl.progBar, kSpotColor);
					}
					else if (this.selection.text == "Transparent items") {
						nr = selectTransparentItems(builder.prgPnl.progBar);
					}
					else {
						alert("Internal error");
					}

					this.enabled = true;					                                                  
					with (builder.msgPnl) {
						msg.et.text = this.selection.text+" found: "+nr; 
						setMsgColor(msg, nr > 0);
					}
				}
			};
		};

		with (builder.actionPnl) {
			closePathBtn.onClick = function() { 
				var nr = closeSelectedPaths(builder.prgPnl.progBar);
				with (builder.msgPnl) {
					msg.et.text = "Paths closed: "+nr; 
					setMsgColor(msg, nr == 0);
				}
			};  
			 
			exitBtn.onClick = function () { this.parent.parent.close(1); };
		};
	} 


	function runBuilder(builder) {
		return builder.show();
	}

	var builder = createBuilderDialog(); 
	initializeBuilder(builder);
	runBuilder(builder);
	
	return retval;
}

if (documents.length > 0) {
	new SelectDialogBuilder().run();
}
