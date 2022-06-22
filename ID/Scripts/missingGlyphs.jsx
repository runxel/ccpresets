//DESCRIPTION: List missing glyphs or apply selected font to missing glyphs.
// Peter Kahrel -- www.kahrel.plus.com
// Based on Pete Baumgartner's method, see http://forums.adobe.com/thread/1037284?tstart=0

#target indesign;

if (parseInt (app.version) < 6)
	{
	alert ('This script requires InDesign CS4 or later.');
	exit();
	}


if (app.documents.length > 0)
	main ();


function main ()
	{
	var data = get_data ();
	if (data.replace)
		replace_missing_glyphs (data.replacement_font);
	else
		list_missing_glyphs ();
	}


function replace_missing_glyphs (replacement_font)
	{
	var j, found, errormsg = "",
		docFonts = app.activeDocument.fonts.everyItem().getElements();
	
	app.findGlyphPreferences = null;
	for (var i = 0; i < docFonts.length; i++)
		{
		if (docFonts[i].status == FontStatus.INSTALLED)
			{
			app.findGlyphPreferences.glyphID = 0;
			app.findGlyphPreferences.appliedFont = docFonts[i].fontFamily;
			app.findGlyphPreferences.fontStyle = docFonts[i].fontStyleName;
			found = app.activeDocument.findGlyph ();
			for (j = 0; j < found.length; j++)
				found[j].appliedFont = replacement_font;
			}
		else
			{
			errormsg += docFonts[i].fontFamily + '\r';
			}
		}
	if (errormsg.length > 1)
		{
		errormsg = 'The following fonts are not installed\r(or have an illegal font style specified)\rand were skipped:\r\r' + errormsg;
		alert (errormsg);
		}
	}


function list_missing_glyphs ()
	{
	var j, report = "",
		known, miss,
		docFonts = app.activeDocument.fonts.everyItem().getElements();
	
	
	for (var i = 0; i < docFonts.length; i++)
		{
		if (docFonts[i].status != FontStatus.INSTALLED)
			{
			report += '['+docFonts[i].fontFamily+']\r';
			}
		else
			{
			app.findGlyphPreferences = null;
			app.findGlyphPreferences.glyphID = 0;
			app.findGlyphPreferences.appliedFont = docFonts[i].fontFamily;
			app.findGlyphPreferences.fontStyle = docFonts[i].fontStyleName;
			found = app.activeDocument.findGlyph();
			if (found.length > 0)
				{
				known = {};
				report += docFonts[i].fontFamily + " (" + docFonts[i].fontStyleName + ")\r";
				for (j = 0; j < found.length; j++)
					{
					miss = get_hex (found[j]);
					if (!known[miss])
						{
						report += found[j].contents + "\t" + miss + "\r";
						known[miss] = true;
						}
					}
				report += "\r";
				}
			}
		}
	display_missing_glyphs (report);
	}



function get_hex (ch)
    {
    function pad (n) {return ('0000' + n).slice(-4);}
    try
        {
        if (ch.contents.length == 2)
            {  // plane-1 and higher algorithm algorithm adapted from
                // http://www.russellcottrell.com/greek/utilities/SurrogatePairCalculator .htm
            var H = parseInt (ch.contents.charCodeAt(0).toString(16), 16);
            var L = parseInt (ch.contents.charCodeAt(1).toString(16), 16);
            var s = ((H - 0xD800) * 0x400) + (L - 0xDC00) + 0x10000;
            return '\\x{' + s.toString(16).toUpperCase() + '}';
            }
        // Plane-0 character; pad hex up to four characters
        var s = ch.contents.charCodeAt(0).toString(16);
        return '\\x{' + pad (s).toUpperCase() + '}';
        }
    catch (_) {return 'U+????'}
    }


function display_missing_glyphs (s)
	{
	var e, w = new Window ('dialog {text: "Missing glyphs", properties: {closeButton: false}}');
	if (s.length == 0)
		{
		s = "No missing glyphs."
		e = w.add ('edittext', undefined, s);
		}
	else
		e = w.add ('edittext', undefined, s, {multiline: true, scrolling: true});
	e.maximumSize.height = w.maximumSize.height-150;
	
	var b = w.add ('group')
		b.add ('button {text: "Close", properties: {name: "ok"}}')
		var save = b.add ('button {text: "Save"}');
	
	save.onClick = function ()
		{
		var outfile = File("~/Desktop/" + app.activeDocument.name.replace(/\.indd$/, '_missing_glyphs.txt'));
		outfile.encoding = 'UTF-8';
		outfile.open ('w'); outfile.write (e.text); outfile.close(); outfile.execute();
		}
	
	w.show();
	}


function get_data ()
	{
	var fontnames = find_fonts();
	var w = new Window ('dialog {text: "Missing glyphs", properties: {closeButton: false}}');
		var main = w.add ('panel {alignChildren: "left"}');
			var fontgroup = main.add ('group');
				var replacefonts = fontgroup.add ('checkbox {text: "\u00A0Replace missing glyphs with font: "}');
				var replacement_font = fontgroup.add ('dropdownlist', undefined, fontnames);
			var display = main.add ('checkbox {text: "\u00A0Display missing glyphs and fonts"}');
		var buttons = w.add ('group {alignment: "right"}');
			buttons.add ('button {text: "OK", name: "ok"}');
			buttons.add ('button {text: "Cancel", name: "cancel"}');
			
		replacefonts.onClick = function () {display.value = !replacefonts.value}
		display.onClick = function () {replacefonts.value = !display.value}
		replacement_font.onChange = function () {display.value = 0; replacefonts.value = 1}
		
		var minion = replacement_font.find ("Minion Pro");
		if (minion != null)
			replacement_font.selection = minion;
		else
			replacement_font.selection = 0;
		
		display.value = 1;
		replacefonts.value = 0;
		replacement_font.active = true;
		current = replacement_font.selection.text;

		var i, buffer = "";
		replacement_font.onActivate = function () {buffer = ""; current = replacement_font.selection.text}
		replacement_font.addEventListener ("keydown", function (k)
			{
			if (k.keyName == "Backspace")
				{
				buffer = buffer.replace (/.$/, "");
				if (buffer.length == 0)
					buffer = current;
				}
			else
				buffer += k.keyName.toLowerCase();
			i = 0;
			while (i < fontnames.length-1 && fontnames[i].toLowerCase().indexOf (buffer) != 0)
				{++i}
			if (fontnames[i].toLowerCase().indexOf (buffer) == 0)
				replacement_font.selection = i;
			}
		);

	if (w.show() == 2)
		exit();
	return {replace: replacefonts.value, replacement_font: replacement_font.selection.text}
	} // get_data ()



function find_fonts ()
	{
	var known = {},
			typefaces = [],
			fontfamilies = app.fonts.everyItem().fontFamily;
		
	for (var i = 0; i < fontfamilies.length; i++)
		{
		if (!known[fontfamilies[i]])
			{
			known[fontfamilies[i]] = true;
			typefaces.push(fontfamilies[i]);
			}
		}
	return typefaces;
	}
