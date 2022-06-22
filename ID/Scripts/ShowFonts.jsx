
//DESCRIPTION: Show document fonts and their type
// Peter Kahrel

if (app.documents.length > 0) {
	main();
}

function main() {
	var s = [];
	var f = app.documents[0].fonts.everyItem().getElements();
	for (var i = 0; i < f.length; i++) {
		try {
			s.push (f[i].name + '\t' + String(f[i].fontType) + '\t' + String (f[i].status));
		} catch (_) {
			s.push (f[i].name + '\t' + '———————' + '\t' + String (f[i].status));
		}
	}
	s.sort();
	var w = new Window ('dialog {text: "Document fonts", alignChildren: "right"}');
		//w.ed = w.add ('edittext', [0,0,400,600], s.sort().join('\r'), {multiline: true});
		var list = w.add ('listbox', undefined, undefined, {
			numberOfColumns: 4, 
			showHeaders: true, 
			columnTitles: ['Typeface', 'Style', 'Type', 'Status'],
			columnWidths: [150, 150, 100, 100], 
			multiselect: true
		});		
		list.maximumSize.height = w.maximumSize.height - 300;
		
		w.buttons = w.add ('group');
			w.store = w.buttons.add ('button {text: "Save"}');
			w.close = w.buttons.add ('button {text: "Close", properties: {name: "cancel"}}');
		
		var i, j, list_item, parts;
		for (i = 0; i < s.length; i++){
			parts = s[i].split('\t');
			list_item = list.add ('item', parts[0]);
			for (j = 1; j < parts.length; j++) {
				list_item.subItems[j-1].text = parts[j];
			}
		}

		w.store.onClick = function () {
			var outfile = File('~/Desktop/ShowFonts.txt');
			outfile.encoding = 'UTF-8';
			outfile.open ('w'); 
			outfile.write (s.join('\r')); 
			outfile.close(); 
			outfile.execute();
		}
	
	w.show();
}

/*
Font types: ATC, Bitmap, CID, OCF, OpenType CCF, OpentType CID, OpenType TT, Truetype, Type 1, or Unknown.
Font statuses: Fauxed, Installed, Not available, Substituted, or Unknown.
*/