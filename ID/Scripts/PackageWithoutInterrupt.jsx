// Package.jsx
//
// by Keith Gilbert
// gilbertconsulting.com/resources-scripts.html
// blog.gilbertconsulting.com
//
// Revised 2015-06-27

#target indesign

main();

function main() {
	// Check to see whether any InDesign documents are open.
	// If no documents are open, display an error message.
	if (app.documents.length > 0) {
		var myDoc = app.activeDocument;
		///Prompt the user for the folder
		var myTargetFolder = Folder.selectDialog("Select the folder in which to place the packaged files");
		if (myTargetFolder != null) {
			// Package the file
			myDoc.packageForPrint (
				to = myTargetFolder,
				copyingFonts = true,
				copyingLinkedGraphics = true,
				copyingProfiles = true,
				updatingGraphics = true,
				includingHiddenLayers = true,
				ignorePreflightErrors = true, // If this is set to false, and there are preflight errors, the script does nothing.
				creatingReport = false,
				includeIdml = false,
				includePdf = false,
				pdfStyle = "",
				versionComments = "",
				forceSave = true,
			)
		}
		else {
			return;
		}
	}
	else {
		// No documents are open, so display an error message.
		alert("No InDesign documents are open. Please open a document and try again.")
	}
}