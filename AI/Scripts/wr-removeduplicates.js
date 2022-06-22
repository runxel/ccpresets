//////////////////////////////////////////////////////////// english //
// ---------------------------
// -=> WR-removeDuplicates <=-
// ---------------------------
//
// A Javascript for Adobe Illustrator
// by Wolfgang Reszel (ai-js@rumborak.de)
//
// Version 0.1 from 10.4.2003
//
// This script removes all duplicate congruent paths in the selection.
// Please select only some objects at once, because the processing-time
// will grow exponential to the number of objects.
//
// To enable the english messages change the "de" into "en" in line 44.
//
// Sorry for my bad english. For any corrections send an email to:
// ai-js@rumborak.de
//
//////////////////////////////////////////////////////////// Deutsch //
// ---------------------------
// -=> WR-removeDuplicates <=-
// ---------------------------
//
// Ein Javascript fuer Adobe Illustrator
// von Wolfgang Reszel (ai-js@rumborak.de)
//
// Version 0.1 vom 10.4.2003
//
// Dieses Skript loescht alle doppelten deckungsgleichen Pfade in der
// Auswahl. Es empfiehlt sich immer nur wenige Objekte auszuwaehlen, da
// die Verarbeitungszeit exponentiell mit der Objektanzahl waechst.
//
// Um dieses Skript mit deutschen Meldungen zu versehen, muss in Zeile
// 44 das "en" durch ein "de" ersetzt werden.
//
// Verbesserungsvorschlaege an: ai-js@rumborak.de
//

//$.bp();

// -------------------------------------------------------------------

var language="en";   // "de" fuer Deutsch
var ask="yes";       // yes/no
var warnlimit=300;
var errorlimit=1000;

// -------------------------------------------------------------------

var WR="WR-removeDuplicates v0.1\n\n";

try {
  var numpath = selection.length;
} catch (e) {}

if (language == "de") {

  var MSG_ask = WR+"Sollen alle doppelten deckungsgleichen Pfade in der Auswahl gel\xF6scht werden?";
  if (numpath>100) {MSG_ask = MSG_ask + "\n("+numpath+" Objekte)";}
  var MSG_noimages = WR+"Bitte w\xE4hle vorher einige Objekte aus.";
  var MSG_warn = WR+"Du hast mehr als "+warnlimit+" Objekten ausgew\xE4hlt. Die Verarbeitung wird einige Zeit dauern, trotzdem forfahren? ("+numpath+")";
  var MSG_tomany = WR+"Bei mehr als "+errorlimit+" ausgew\xE4hlten Objekten w\xFCrde die Verarbeitung zu lange dauern, bitte einen kleineren Bereich ausw\xE4hlen! ("+numpath+")";
  var MSG_nodocs = WR+"Kein Dokument ge\xF6ffnet.";
  var MSG_statusOK = " \xFCberfl\xFCssige Objekte wurden gel\xF6scht!";

} else {

  var MSG_ask = WR+"Remove all duplicate congruent paths in the selection?";
  if (numpath>100) {MSG_ask = MSG_ask + "\n("+numpath+" objects)";}
  var MSG_noimages = WR+"Please select some objects.";
  var MSG_warn = WR+"You have selected more than "+warnlimit+" objects. The process will take some time, do you want to continue? ("+numpath+")";
  var MSG_tomany = WR+"You have selected more than "+errorlimit+" objects. The process will take too much time, please select fewer objects! ("+numpath+")";
  var MSG_nodocs = WR+"You have no open document."
  var MSG_statusOK = " unnecessary objects were removed!"

}

var itemstoprocess=0;
var error=0;

if (documents.length<1) {
  error++;
  alert(MSG_nodocs);
}
if (error == 0) {
  var theObjects=selection;

  if (theObjects.length<1 && error == 0) {
    error++;
    alert(MSG_noimages);
  }
  if (theObjects.length>errorlimit && error == 0) {
    error++;
    alert(MSG_tomany);
  }
  if (theObjects.length>warnlimit && error == 0) {
    if(confirm(MSG_warn)) {
      var ask="no";
    } else {
      error++;
    }
  }
}
if (error < 1) {
  if (ask=="yes") { askresult=confirm(MSG_ask); } else {askresult = true;}
  if (askresult) {
    dedup();
  }
}

function dedup() {
  theItems = theObjects;


  for (var i = 0 ; i < theItems.length; i++)
  {
    if (theItems[i].typename == "PathItem" && theItems[i].name != "deleteme" && theItems[i].parent.clipped != true && !theItems[i].locked && !theItems[i].parent.locked && !theItems[i].layer.locked ) {

      checkpath=theItems[i].pathPoints;
      checkfilled=theItems[i].filled;
      checkstroke=theItems[i].stroked.toString()+theItems[i].strokeWidth.toString();

      for (var j = 0 ; j < theItems.length; j++)
      {
        if ((theItems[j].typename == "PathItem") && theItems[j].name != "deleteme" && theItems[j].parent.clipped != true && !theItems[j].locked && !theItems[j].parent.locked && !theItems[j].layer.locked ) {

          check4path=theItems[j].pathPoints;
          check4filled=theItems[j].filled;
          check4stroke=theItems[j].stroked.toString()+theItems[j].strokeWidth.toString();
          // alert(checkfilled + " " +check4filled);
          if(checkpath.length == check4path.length && checkstroke == check4stroke && (checkfilled == check4filled || (checkfilled == true && i<j)) && i != j) {
            //alert(i+" "+j);
            var ok = 0;
            for ( k = 0; k < checkpath.length; k++ ) {
              for ( m = 0; m < checkpath.length; m++ ) {
                if (checkpath[k].anchor[0] == check4path[m].anchor[0] && checkpath[k].anchor[1] == check4path[m].anchor[1] && checkpath[k].leftDirection[0] == check4path[m].leftDirection[0] && checkpath[k].leftDirection[1] == check4path[m].leftDirection[1] && checkpath[k].rightDirection[0] == check4path[m].rightDirection[0] && checkpath[k].rightDirection[1] == check4path[m].rightDirection[1]) { ok++ }
              //alert( i +" "+ checkstroke +" | "+ j + " " + check4stroke + " :" +ok+"\n"+ checkpath[k].anchor[0] +" "+check4path[k].anchor[0] +", "+ checkpath[k].leftDirection[0] +" " + check4path[k].leftDirection[0] );
              }
            }
            //alert( i +" "+ checkstroke +" | "+ j + " " + check4stroke + " :" +ok);

            if(ok == checkpath.length) {theItems[j].name="deleteme";}
          }

        }
      }


    }
  }

  var processedItems=0;

  for (var i = 0 ; i < theItems.length; i++)
  {
    if(theItems[i].name=="deleteme") {theItems[i].remove(); processedItems++;}

  }
  beep();
  alert(WR+processedItems+MSG_statusOK);

}
