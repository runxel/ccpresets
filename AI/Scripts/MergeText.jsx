#target illustrator

/******************************
* @title MergeText_AI
* @author Justin Putney
* @info http://putney.ajarproductions.com
* @version 1.0.0
*******************************/

/*******************************************
* begin code from ominoDialogMaker.jsx
* by David Van Brink
* source: http://omino.com/pixelblog/2008/09/21/35/
********************************************/

var D_MARGIN = 6;
var D_CONTROLHEIGHT = 20;
var D_BUTTONWIDTH = 100;
var D_CONTROLLABELWIDTH = 160;
var D_CONTROLWIDTH = 150;
var D_DIALOG_WIDTH = 400;

var S2 = 1.41421356237309504880;

// create a rectangle for a new control, walking downwards.
function _odControlShared(label,name) {
	dialog = this;
    var y = dialog.curYPos;
    var itemHeight = D_CONTROLHEIGHT;
    var itemBump = itemHeight + D_MARGIN;

    if(label != "")
        label += ":";
    var labelCtl = dialog.add('statictext',[20,y,20 + D_CONTROLLABELWIDTH,y+itemHeight],label);
    labelCtl.justify = "right";

    var controlBox = new Object();
    controlBox.left = 20 + D_CONTROLLABELWIDTH + 10;
    controlBox.top = y;
    controlBox.right = controlBox.left + D_CONTROLWIDTH;
    controlBox.bottom = controlBox.top + itemHeight;
    dialog.curYPos = controlBox.bottom + D_MARGIN;
	
	return controlBox;
}

function _odControlSharedFinish(control,name,valueFieldName) {
	oD = this;
    oD.items[name] = control;
	oD.itemValueFieldNames[name] = valueFieldName;
	oD.itemNames[oD.itemNames.length] = name;
}

function _odNumber(label,name,value) {
		oD = this;
		var controlBox = oD._odControlShared(label,name);
        var control = oD.add('edittext',controlBox,value);
		control.value = value;
        control.onChange = function(){this.value = (this.text) * 1.0; this.text = this.value;};  // make them all .value accessible
		oD._odControlSharedFinish(control,name,"text");
		return control;
}

function _odText(label,name,value) {
		oD = this;
		var controlBox = oD._odControlShared(label,name);
        var control = oD.add('edittext',controlBox,value);
		control.value = value;
        control.onChange = function(){this.value = this.text; };  // make them all .value accessible
		oD._odControlSharedFinish(control,name,"text");
		return control;
}

function _setColorFromButton(victim,button) {
			var g = victim.graphics;
			var n = button.value;
			var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, n);
			g.backgroundColor = myBrush;
}
/*
	color values are array of three floats, 0.0 .. 1.0.
	*/
function _odColor(label,name,color) {
	oD = this;
	var controlBox = oD._odControlShared(label,name);
	var swatchBox = [controlBox.left + 40,controlBox.top,controlBox.right,controlBox.bottom];
	var buttonBox = [controlBox.left,controlBox.top,controlBox.left + 30,controlBox.bottom];
	
	var swatch = oD.add('group',swatchBox);
	var button = oD.add('button',buttonBox);
	button.swatch = swatch;
	button.value = color;
	button.onClick = function(){
			var n = doColorPicker(this.value);
			this.value = n;
			_setColorFromButton(swatch,this);
			};
	_setColorFromButton(swatch,button);
	oD._odControlSharedFinish(button,name,"value");
	return button;
}

/*
	Add a button and static text to the dialog;
	the button refers to the text "nameCtl",
	and has .filePrompt and .fileExtension.
	*/
function _odFileCommon(label,name,path,prompt,extension) {
	var controlBox = oD._odControlShared(label,name);
	var buttonWidth = 80;
	var buttonBox = [controlBox.left,controlBox.top,controlBox.left + buttonWidth,controlBox.bottom];
	var nameBox = [controlBox.left + buttonWidth + 10,controlBox.top,D_DIALOG_WIDTH,controlBox.bottom];
	var f = new File(path);
	
	var nameCtl = oD.add('statictext',nameBox);
	var button = oD.add('button',buttonBox,'...');
	button.nameCtl = nameCtl;
	nameCtl.text = f.name;
	button.value = f.fsName;
	button.file = f;
	button.filePrompt = prompt;
	button.fileExtension = extension;
	oD._odControlSharedFinish(button,name,"value");
	return button;
}

function _odOpenFile(label,name,path,prompt,extension) {
	oD = this;
	var buttonCtl = _odFileCommon(label,name,path,prompt,extension);
	buttonCtl.onClick = function(){
		var f = this.file.openDlg(this.filePrompt);
		if(f) {
			this.file = f;
			this.value = f.fsName;
			this.nameCtl.text = f.name;
		}
	};
	return buttonCtl;
}

function _odSaveFile(label,name,path,prompt,extension) {
	oD = this;
	var buttonCtl = _odFileCommon(label,name,path,prompt,extension);
	buttonCtl.onClick = function(){
		var f = this.file.saveDlg(this.filePrompt);
		if(f) {
			this.file = f;
			this.value = f.fsName;
			this.nameCtl.text = f.name;
		}
	};
	return buttonCtl;
}

function _odSelectFolder(label,name,path,prompt,extension) {
	oD = this;
	var buttonCtl = _odFileCommon(label,name,path,prompt,extension);
	buttonCtl.folder = new Folder(path); // folder, pls, not file
	buttonCtl.nameCtl.text += "/";
	buttonCtl.onClick = function(){
		var f = this.folder.selectDlg(this.filePrompt);
		if(f) {
			this.folder = f;
			this.value = f.fsName;
			this.nameCtl.text = f.name + "/";
		}
	};
	return buttonCtl;
}

function _odCheckbox(label,name,value,checkboxText) {
		oD = this;
		var controlBox = oD._odControlShared(label,name);
        var control = oD.add('checkbox',controlBox,checkboxText);
		control.value = value;
        //control.onChange = function(){this.value = this.text;}; 
		oD._odControlSharedFinish(control,name,"value");
		return control;
}

function _odRadioButtons(label,name,value,radioChoices) {
	var oD = this;
	controlBox = oD ._odControlShared(label,name);
	var itemHeight = controlBox.bottom - controlBox.top;

	result = oD.add('edittext',controlBox,value); // hidden text field to control it...
	result.onChange = function(){
		var i;
		this.value = this.text;
		for(i = 0; i < this.buttons.length; i++) {
			var button = this.buttons[i];
			button.value = (button.theChoice == this.text);
		}
	}
	result.hide();
	result.value = value;
	result.buttons = new Array();

	var i;
	for(i = 0; i < radioChoices.length; i++) {
		var choice = radioChoices[i];
		if(i > 0) {
			var bump = itemHeight + D_MARGIN;
			controlBox.top += bump;
			controlBox.bottom += bump;
			oD.curYPos += bump;
		}
		// each radiobutton object pokes its choice into the ersatz control,
		// so it looks like a simple value.
		// ("Grouping" appears to be by adjacent additions only. Nice!)
		var rb = oD .add('radiobutton',controlBox,choice);
		rb.value = choice == value;
		rb.theChoice = choice;
		rb.theGroupErsatzControl = result;
		rb.onClick = function(){this.theGroupErsatzControl.value = this.theChoice;};
		result.buttons[result.buttons.length] = rb;
	}
	oD._odControlSharedFinish(result,name,"text");
	return result;
}

function _odMenu(label,name,value,menuChoices) {
	var oD = this;
	controlBox = oD ._odControlShared(label,name);
	var itemHeight = controlBox.bottom - controlBox.top;
	var control = oD.add('dropdownlist',controlBox,menuChoices);
	// I couldnt discern how to get this from the "items" array, so I stash menuChoice for later. dvb08.
	control.menuChoices = menuChoices;
	control.value = value;
	// set the initial selection index
	var index = 0;
	for(var i = 0; i < menuChoices.length; i++) {
		if(value == menuChoices[i])
			index = i;
	}
	control.selection = index;
    control.onChange = function() {
		this.value = this.selection.text;
		} // make them all .value accessible
	oD._odControlSharedFinish(control,name,"value");
}

function _odSectionLabel(label) {
	var oD = this;
    var b2 = new Object();
	b2.left = D_MARGIN;
	b2.top = oD.curYPos;
	b2.right = b2.left + D_DIALOG_WIDTH;
	b2.bottom = b2.top + D_CONTROLHEIGHT;
	oD.curYPos += D_CONTROLHEIGHT + D_MARGIN;
    oD.add('statictext',b2,label + ':',{multiline:true});
}

function _odBoxedText(lines,text) {
	var oD = this;
	var width = D_DIALOG_WIDTH;
	var height = lines * 16;
    var b2 = new Object();
	var b = new Object();
	b.top = oD.curYPos;
	b.bottom = b.top + height + 2 * D_MARGIN;
	b.left = D_MARGIN;
	b.right = b.left + width;
	oD.curYPos = b.bottom + D_MARGIN;
	var panel = oD.add('panel',b);
	b2.left = D_MARGIN;
	b2.top = D_MARGIN;
	b2.right = b2.left + width - 2 * D_MARGIN;
	b2.bottom = b2.top + height;
    panel.add('statictext',b2,text,{multiline:true});
}

function _odSeparator() {
	var oD = this;
	var height = oD.groupGap;
	var barWidth = oD.ominoDialogWidth;
    if(barWidth) {
        var b = new Object();
        b.top = oD.curYPos + height / 2;
        b.bottom = b.top;
        b.left = D_MARGIN;
        b.right = b.left + barWidth;

        var barHeight = 2;
        b.top -= barHeight / 2;
        b.bottom = b.top + barHeight;
        oD.add('panel',b);
    }
    oD.curYPos += height;
}

function _odAppendGap() {
	oD = this;
    oD.curYPos += oD.groupGap;
}

function appendOKCancel(dialog) {
    var y = dialog.curYPos;
    var cancelRect = new Object();
    var okRect = new Object();
    cancelRect.left = D_MARGIN
    cancelRect.top = y;
    cancelRect.right = cancelRect.left + D_BUTTONWIDTH;
    cancelRect.bottom = cancelRect.top + D_CONTROLHEIGHT;

    okRect.left = cancelRect.right + D_MARGIN + D_MARGIN;
    okRect.top = y;
    okRect.right = okRect.left + D_BUTTONWIDTH;
    okRect.bottom = okRect.top + D_CONTROLHEIGHT;

    var cancelBtn = dialog.add('button',cancelRect,'Cancel',{name:'cancel'});
    var okBtn = dialog.add('button',okRect,'OK',{name:'ok'});

    cancelBtn.theDialog = dialog;
    cancelBtn.onClick = function(){this.theDialog.close(0);};  // 0 on cancel
    okBtn.theDialog = dialog;
    okBtn.onClick = function(){this.theDialog.close(1);}; // 1 on ok
    dialog.curYPos = okRect.bottom + D_MARGIN;
}

function trimDialogBounds(dialog) {
    var xMax = 20;
    var yMax = 20;
    var n = dialog.children.length;
	var i;
    for(i = 0; i < n; i++) {
        var aChild= dialog.children[i];
        var aChildBounds = aChild.bounds;
        if(aChildBounds.right > xMax)
            xMax = aChildBounds.right;
        if(aChildBounds.bottom > yMax)
            yMax = aChildBounds.bottom;
    }
    dialog.bounds.right = dialog.bounds.left + xMax + D_MARGIN;
    dialog.bounds.bottom = dialog.bounds.top + yMax + D_MARGIN;
	// actually... allow bottom gaps.
	dialog.bounds.bottom = dialog.curYPos + dialog.bounds.top;
}

function newOminoDialog(name) {
    var oD = new Window('dialog',name,[100,100,500,500]);
    oD.curYPos = 20;
	oD.groupGap = 12;
	oD.itemNames = new Array();
	oD.item
	oD.items = new Array();
	oD.itemValueFieldNames = new Object(); // to poke a value into the dialog, each control's appropriate field, like "text" or "value"
	oD.ominoDialogWidth = D_DIALOG_WIDTH;
	oD.gap = _odAppendGap;
	oD.number = _odNumber;
	oD.string = _odText;
	oD.radioButtons = _odRadioButtons;
	oD.checkbox = _odCheckbox;
	oD.sectionLabel = _odSectionLabel;
	oD.separator = _odSeparator;
	oD.boxedText = _odBoxedText;
	oD.color = _odColor;
	oD.openFile = _odOpenFile;
	oD.selectFolder = _odSelectFolder;
	oD.saveFile = _odSaveFile;
	oD.menu = _odMenu;
	oD.set = _odSet;
	oD.run = _odRun;
	oD.get = _odGet;	oD._odControlShared = _odControlShared;
	oD._odControlSharedFinish = _odControlSharedFinish;
	return oD;
}

function _odGet()
{
	var values = new Object();
	var name;
	for(name in this.items) {
		var value = this.items[name].value;
		values[name] = value;
	}
	return values;
}

function _odSet(values)
{
	var oD = this;
	if(!values)
		return;
	for(var p in values) {
		var value = values[p];
		var item = oD.items[p];
		if(!item)
			continue;
		var itemValueFieldName = oD.itemValueFieldNames[p];
		if(!itemValueFieldName)
			continue;
		item[itemValueFieldName] = value;
		item.notify('onChange'); // to get the refresh
	}
}

function _odRun()
{
	var oD = this;
	
	if(!oD.finishingTouches) {
		oD.separator(oD);
		oD.gap();
		appendOKCancel(oD);
		oD.gap();
		trimDialogBounds(oD);
		oD.finishingTouches = true;
	}
	var resultCode = oD.show();
	if(resultCode != 1) // cancel
		return null;

	var result = oD.get();
	return result;
}
/*******************************************
*	end code from ominoDialogMaker.jsx
********************************************/

/*******************************************
*	begin code for Merging Text
********************************************/

if(app.documents.length >= 1) {
	var sortProp = "left";
	var doc = app.activeDocument;
	var sel  = doc.selection;
	var tfs  = new Array();
	var separator = "[><]";
	var minimumversion = 13; //min version to run dialog code
	var ver = app.version;
	var aiversion = parseInt(ver.split(".")[0]);
	init();
	} else {
	alert("No documents open");
}

function init(){
	collectFields();
	if(tfs.length> 1) {
		if(aiversion >= minimumversion) runDialog();
		else run();
	} else if (tfs.length == 1) {
			alert("You must select more than one textfield.");
	} else {
			alert("No textfields selected.");
	}
}

function collectFields() {
	for(var i=0; i < sel.length; i++){
		var t = sel[i];
		if (t == undefined) continue;
		if(t.typename == "TextFrame"){
			//t.position //for text boxes
			//$.writeln(t.position);
			tfs.push(t);
			}
	}
}

function run () {
	//position for sorting---------
	if(sortProp == "right") flipFields(tfs, -100, 100);
	else if(sortProp == "bottom") flipFields(tfs, 100, -100);
	//-------------------------------
	tfs.sort(sortFields);
	//reset----------
	if(sortProp == "right") flipFields(tfs, -100, 100);
	else if(sortProp == "bottom") flipFields(tfs, 100, -100);
	//----------------
	doc.selection = tfs;
	assemble(tfs);
}

function runDialog()
{
	var omd = newOminoDialog("Merge Textfields");
	omd.radioButtons("Sort by","sort","top",["top","left","bottom","right"]);
	omd.separator();
	omd.string("Separator","separator","");
	omd.boxedText(1,"\\r = return, \\t = tab");

	var result = omd.run();
	if(result != null) {
		separator = result.separator;
		separator = replace(separator, "\\r", "\r");
		separator = replace(separator, "\\t", "\t");
		//separator = replace(separator, "\\n", "\n");
		sortProp = result.sort;
		run();
	}
}

function flipFields(arr, scaleX, scaleY) {
	var g = group(arr);
	g.resize(scaleX, scaleY);
	var items = ungroup(g);
}

function assemble(arr){
	var targField = arr.shift();
	for (var i=0; i<arr.length; i++){
		arr[i].textRange.contents = separator + arr[i].textRange.contents;
		arr[i].textRange.move(targField, ElementPlacement.PLACEATEND);
		arr[i].remove();
	}
}

function sortFields(a,b) {
	var tProp = sortProp;
	if(tProp == "bottom") tProp = "top"; //use flipped values
	else if(tProp == "right") tProp = "left"; //use flipped values
	var aN = parseFloat(a[tProp]);
	var bN = parseFloat(b[tProp]);
	var returnVal = aN - bN;
	if(returnVal == 0) {
		//second level sorting
		if(tProp == "top") tProp = "left";
		else if(tProp == "left") tProp = "top";
		aN = parseFloat(a[tProp]);
		bN = parseFloat(b[tProp]);
		returnVal = aN - bN;
	}
	if(tProp == "top") returnVal *= -1; //y is reverse
	return returnVal;
}

function group(arr){
	var g = doc.groupItems.add();
	for(var i=0; i < arr.length; i++){
		arr[i].move(g, ElementPlacement.INSIDE);
	}
	return g;
}

function ungroup(group){
	var items = new Array();
	var numItems = group.pageItems.length;
	for(var i=numItems-1; i >=0; i--){
		var item = group.pageItems[i].move(group.parent, ElementPlacement.INSIDE);
		items.push(item);
	}
	group.remove();
	return(items);
}

function replace(searchStr, findStr, replaceStr){
	//fl.trace('replacing...' + findStr + '...with...' + replaceStr + '...in: ' + searchStr);
	var tArr = searchStr.split(findStr);
	var returnStr = tArr.join(replaceStr);
	return returnStr;
}

//for testing only
function traceFields(arr){
	$.writeln("----------------");
	for(var i=0; i<arr.length; i++){
		$.writeln(arr[i].contents + "// 1: " + Math.round(arr[i].left) + ", 2: " + Math.round(arr[i].top) );
	}
	$.writeln("----------------");
}

/*******************************************
*	end code for Merging Text
********************************************/

//end file