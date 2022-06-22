// BalanceRaggedLines-View.jsx
//
//
// Keith Gilbert
// http://www.gilbertconsulting.com
// Modified 12-07-2009

#target indesign

main();

function main(){
	// First, check to see whether any InDesign documents are open.
	// If no documents are open, display an error message.
	if (app.documents.length > 0) {
		if(app.selection.length != 0){
			// Check to see if there is a proper selection
			switch(app.selection[0].constructor.name) {
				case "InsertionPoint":
				case "Character":
				case "Word":
				case "TextStyleRange":
				case "Line":
				case "Paragraph":
				case "TextColumn":
				case "Text":
					var myText = app.selection[0];
					switch(myText.balanceRaggedLines) {
						case 1114396261:
							myBalanceStyle = "VEE SHAPE (normal)";
							break;
						case 1114394745:
							myBalanceStyle = "PYRAMID SHAPE";
							break;
						case 1114391921:
							myBalanceStyle = "FULLY BALANCED";
							break;
						case 1114394470:
							myBalanceStyle = "NO BALANCING (off)";
							break;
						default:
							myBalanceStyle = "Mixed";
							break;
					}
					alert("The Balance Ragged Lines style of the selected text is:\r\r"+myBalanceStyle+"\r\r(if you have multiple paragraphs selected, only the style of the first paragraph in the selection is listed above)");
					break;
				case "Table":
				case "Cell":
					alert("Please select some text, or choose an insertion point, and try again. This script does not function with table cells, rows or columns selected.");
					break;
				case "Rectangle":
				case "Oval":
				case "Polygon":
				case "GraphicLine":
				case "Image":
				case "PDF":
				case "EPS":
				default:
					alert("Please select some text, or choose an insertion point, and try again.");
					break;
			}
		}
		else {
			alert("Please select some text, or choose an insertion point, and try again.");
		}
	}
	else {
		//No documents are open, so display an error message.
		alert("No InDesign documents are open. Please open a document and try again.")
	}
}
