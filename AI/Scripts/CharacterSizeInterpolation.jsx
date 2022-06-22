/*
mw_CharacterSizeInterpolation.jsx
A Javascript for Adobe Illustrator by mediawerk hamburg.

Das Script baut auf einem Applscript für Adobe InDesign von 
Gerald Singelmann, mit Beiträgen von SebastianMC und Stibi auf.

Das Script interpoliert die Zeichengrößen eines in Adobe Illustrator 
ausgewählten Textobjekts zwischen der Größe des ersten und des letzten Zeichens.	
*/

//Variable zum Aufruf des richtigen FehlerTextes in einer AlertBox
var alertSwitch = 0; 

//Prüfung ob ein Illustrator-Dokument geöffnet ist:
if ( app.documents.length == 0 )
	{
	alertSwitch = 1;
	}

//Prüfung ob ein Objekt ausgewählt ist:
if (alertSwitch == 0)
	{
	var sel = activeDocument.selection;
	if (sel == "")
    	{
		alertSwitch = 2;
    	}
	//alert (sel[0].characters.length);
	}	

// Prüfung ob statt eines gesamten Text-Objektes einzelne Buchstaben ausgewählt sind:
if ((alertSwitch == 0) && (sel.typename == "TextRange"))
	{
	alertSwitch = 3;
	}

//Prüfung ob mehr als ein Objekt ausgewählt ist:
if ((alertSwitch == 0) && (sel.length > 1))
	{
	alertSwitch = 4;
	}

//Prüfung ob das ausgewählte Objekt *kein* Textobjekt ist:
if ((alertSwitch == 0) && (sel[0].typename != "TextFrame"))
	{
	alertSwitch = 5;
	}

//Prüfung ob das ausgewählte Objekt weniger als 3 Buchstaben hat:
if ((alertSwitch == 0) && (sel[0].typename == "TextFrame"))
	{
	if (sel[0].characters.length < 3)
		{
		alertSwitch = 6;
		}
	}

if (alertSwitch == 0)
	{	
	var selText = sel[0].contents;
	var charCount = sel[0].characters. length;
	var sizeFirst = sel[0].characters[0].size;
	var sizeLast = sel[0].characters[charCount - 1].size;
	
	if (sizeFirst == sizeLast)
	//Prüfung ob das erste und das letzte Zeichen des aktivierten Textobjektes unterschiedlich groß sind.
		{
		alertSwitch = 7;
		}
	else
	//Script zur Interpolation der Zeichengrößen
		{
		//var tmp = "" + sizeFirst;
		//Algorithmus zur Berechnung der Buchstabengröße
		var d = (Math.log (sizeLast / sizeFirst)) / (charCount - 1) * -1;
		var sizeCalc = sizeFirst;
		for(var i = 1; i < charCount; i++)
			{
			sizeCalc = sizeFirst * (Math.exp (-d * i));
			sizeCalc = (Math.round (sizeCalc *1000))/1000;
			sel[0].characters[i].size = sizeCalc;
			//tmp = tmp + " / " + sizeCalc;
			}
			//alert(tmp);		
		}
	}

//Ausgabe einer eventuellen Fehlermeldung
if (alertSwitch > 0)
	{
	//alert ("Fehler " +  alertSwitch);
	var  lf = ("\n");
	switch (alertSwitch) 
		{
		case 1:
			alert("Kein Dokument!" + lf + "Bitte öffnen Sie ein Dokument in Adobe Illustrator und aktivieren Sie ein Textobjekt, bei dem der erste und der letzte Buchstabe unterschiedlich groß sind!");
			break;
		case 2:
			alert("Kein Textobjekt ausgewählt!" + lf + "Bitte aktivieren Sie ein Textobjekt, bei dem der erste und der letzte Buchstabe unterschiedlich groß sind!");
			break;
		case 3:
			alert("Bitte wählen Sie nur das gesamte Textobjekt aus!" + lf + "Nicht einzelne Buchstaben und ohne Einfügemarke!");
			break;
		case 4:
			alert("Mehrere Objekte ausgewählt! " + lf + "Bitte aktivieren Sie *ein* Textobjekt, bei dem der erste und der letzte Buchstabe unterschiedlich groß sind!");
			break;
		case 5:
			alert("Kein Textobjekt! " + lf + "Bitte aktivieren Sie ein Textobjekt, bei dem der erste und der letzte Buchstabe unterschiedlich groß sind!");
			break;
		case 6:
			alert("Text zu kurz" + lf + "Das ausgewählte Textobjekt muß mindestens 3 Buchstaben umfassen!");
			break;
		case 7:
			alert("Keine Berechnung möglich!" + lf + "Bitte aktivieren Sie ein Textobjekt, bei dem der erste und der letzte Buchstabe *unterschiedlich* groß sind!");
			break;
		default:
			alert("Jetzt weiß ich auch nicht mehr weiter!");
			break;
		}

	}

//