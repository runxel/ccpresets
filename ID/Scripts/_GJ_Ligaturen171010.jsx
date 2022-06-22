// InDesign-Skript zur Behandlung der f-Ligaturen
// © Copyright Günter Jürgensmeier, Juli 2009
// Alle Rechte vorbehalten
#target "InDesign"

// var Zeit = new Date();
// $.writeln(Zeit.toString());

var Underline = false;		// true = Änderungen unterstreichen, sonst false
app.scriptPreferences.enableRedraw = false;	// Änderungen nicht sofort anzeigen

var StdLig = ["fi", "fl", "ff"];

// In dem Array Ligaturdaten stehen die Zeichenfolgen,
// nach denen das Programm _GJ_Ligaturen suchen soll.
// Zeichen, die in eckigen Klammern stehen, bekommen
// das Zeichenformat "Ligaturen" zugewiesen, die Zeichen
// außerhalb nicht. Die ersten drei Einträge "[fi]", "[fl]" und
// "[ff]", stellen sicher, dass für diese Zeichenkombinationen
// Ligaturen verwendet werden. Der Rest der Liste besteht 
// aus Ausnahmen. Grundsätzlich wird zwischen Groß- und
// Kleinschreibung unterschieden. Das Zeichen "<" bedeutet
// Wortanfang, das Zeichen ">" Wortende. Das Zeichen "-"
// dient nur dazu, das Nichtverwenden der Ligatur sichtbar
// zu machen, es wird bei der Verarbeitung ignoriert.
//
// Der Eintrag "<auf-[fi]er" definiert also, dass nach der
// Zeichenfolge "auffier" am Beginn eines Wortes gesucht wird; 
// es werden also z.B. "auffieren" und "auffierte" gefunden, aber 
// nicht Wörter wie "chauffieren", "echauffieren" und "echauffiert",
// in denen diese Zeichenfolge zwar vorkommt, wo aber Ligaturen
// verwendet werden sollen. Zunächst wird von der gesamten 
// Zeichenfolge "auffier" das Zeichenformat "Ligaturen" entfernt, 
// dann aber für die Zeichenkette in eckigen Klammern (fi) 
// separat das Zeichenformat "Ligaturen" zugewiesen.
// Die Einträge werden in der aufgeführten Reihenfolge ausgeführt;
// das kann man dazu nutzen, um erst eine allgemeine Zuweisung
// zu machen, die vielleicht auch einige Fehler macht, und diese
// dann mit einer oder mehreren spezielleren zu korrigieren.

LD = [

// die folgenden werden von Indesign automatisch richtig interpretiert
// "[ff]-[fi]",	// Kraftstofffilter
// "[ff]-fa",	// *schifffahrt*, Zellstofffabrik, ALT: Hofffahrt, zwölfffach
// "[ff]-fä",	// Trefffähigkeit
// "[ff]-fo",	// Kunststofffolie
// "[ff]-fr",	// Hafffrau, holzschlifffrei, schadstofffrei, stickstofffrei
// "[ff]-[fl]",	// Auspuffflamme, Sauerstoffflasche, Schlifffläche, Schiffflotte
// "[ff]-fü",	// Stofffülle

"[ff]-idyll",		// Haffidyll*, haffidyllisch*, Westhaffidyll*
"<tief-inne",		// tiefinne*, tiefinnerste*
"<Tief-inne",		// Tiefinne*, Tiefinnerste*
"<Schilf-insel",	// Schilfinsel*

"a[ff]-lei",	// Stafflei
"<auf-[fi]er",	// auffieren, ABER NICHT chauffieren, echauffieren, echauffiert
"Auf-[fi]er",	// Auffieren
"auf-lie",		// aufliegen, aufliefern, herauflief(en), vorauflief(en)
"chau[fl]ieg",	// ABER NICHT Schaufliegen
"Tau[fl]ieg",	// ABER NICHT Taufliege
"tau[fl]ieg",	// 
"Auf-lie",		// Aufliegen, Auflieferer, Aufliefern, Auflieferung

"af-fäl",		// straffällig, Straffälliger, Straffälligkeit
"af-ins",		// Schlafinsel, Strafinstrument
"af-irr",		// schlafirre, Schlafirrender
"af-lie",		// Schlaflied, Straflied
"af-lin",		// Haflinger*
"af-los",		// schlaflos, Schlaflosigkeit, straflos, Straflosigkeit
"auf-[fi]nd",	// auffindbar, (hin)auffinden, Kreuzauffindung, unauffindbar, Unauffindbarkeit
"Auf-[fi]nd",	// Auffindbar, Auffinden, Auffindung
"auf-[fi]sc",	// auffischen, herauffischen
"Auf-[fi]sc",	// Auffischen
"tau[ff]isch",	// ABER: stauffisch

"auf-[fi]tz",	// auffitzen
"Auf-[fi]tz",	// Auffitzen
"auf-[fl]a",	// aufflackern, aufflammen, aufflattern, heraufflattern
"Auf-[fl]a",	// Aufflackern, Aufflammen, Aufflattern
"auf-[fl]ech",	// aufflechten
"Auf-[fl]ech",	// Aufflechten
"auf-[fl]ick",	// aufflicken
"Auf-[fl]ick",	// Aufflicken
"auf-[fl]ieg",	// *auffliegen
"Auf-[fl]ieg",	// Auffliegen
"auf-[fl]im",	// *aufflimmern
"Auf-[fl]im",	// Aufflimmern
"auf-[fl]ä",	// Lauffläche
"auf-[fl]ö",	// aufflöchte, aufflöge
"Auf-[fl]ö",	// aufflöchte, aufflöge
"uff-lö",		// ABER ALT: aufflösen, unaufflößlich

"auf-[fl]o",	// aufflocht, aufflog, heraufflog(en), hinaufflog(en)
"Auf-[fl]o",	// aufflocht, aufflog, heraufflog(en), hinaufflog(en)
"auf-[fl]u",	// auffluchen, *auffluten
"Auf-[fl]u",	// Aufflug
"auf-[fl]ü",	// *aufflüchten
"Auf-[fl]ü",	// Aufflüge
"auf-fah",		// auffahren, auffahrend, Autobahnauffahrt, herauffahren, hinauffahren, Kauffahrer, Kauffahrteischiff, vorauffahren
"Auf-fah",		// Auffahren, Auffahrend, Auffahrt, Auffahrtrampe, Auffahrtsfest, Auffahrtsstraße, Auffahrtstag, Auffahrunfall
"auf-fal",		// auffallen, auffallend, auffalten, hinauffallen, rauffallen
"Auf-fal",		// Auffallen, Auffallend, Auffalten, Auffaltung, Hinauffallen, Rauffallen
"auf-fand",		// auffand(en)
"Auf-fand",		// auffand(en)
"auf-fang",		// auffangen
"Auf-fang",		// Auffangbecken, Auffangen, Auffanglager, Auffangstelle
"auf-faß",
"Auf-faß",
"auf-fass",		// Arbeitsauffassung, auffassen, Dienstauffassung, Ehrauffassung, Geschichtsauffassung, Lebensauffassung, Rechtsauffassung
"Auf-fass",		// Auffassen, Auffassung, Auffassungsgabe, Auffassungskraft, Auffassungssache, Auffassungsvermögen, Auffassungsweise
"auf-feg",		// auffegen, herauffegen, hinauffegen
"Auf-feg",		// Auffegen
"auf-fei",		// auffeilen, Tauffeier(lichkeit)
"Auf-fei",		// Auffeilen
"auf-fes",		// Tauffest(lichkeit)
"auf-fetz",		// auffetzen
"Auf-fetz",		// Auffetzen
"auf-feud",		// auffeudeln
"Auf-feud",		// Auffeudeln
"auf-feue",		// Lauffeuer
"auf-[fi]eb",	// Kauffieber
"auf-[fi]el",	// auffiel(en)
"Auf-[fi]el",	// Auffiel(en)
"auf-[fi]ng",	// auffing(en)
"Auf-[fi]ng",	// Auffing(en)
"auf-[fl]eh",	// *auffleh(e)n
"Auf-[fl]eh",	// Auffleh(e)n
"auf-[fl]ie",	// *auffließen
"Auf-[fl]ie",	// Auffließen
"auf-[fl]och",	// aufflocht(en)
"Auf-[fl]och",	// Aufflocht(en)
"auf-[fl]og",	// aufflog(en)
"Auf-[fl]og",	// Aufflog(en)
"auf-[fl]u",	// hochaufflutend
"Auf-[fl]u",	// Aufflutend
"auf-[fl]ü",	// *aufflüchten
"auf-fol",		// darauffolgend
"auf-fod",		// ALT: auffodern, *auffoderung
"Auf-fod",		// Auffodern, Auffoderung
"auf-for",		// auffordern, aufforsten, Auflaufform, Taufformel, Taufformular, Zahlungsaufforderung
"Auf-for",		// Auffordern, Aufforderung, Aufforderungscharakter, Aufforderungssatz, Aufforsten, aufforstung, Aufforstung
"auf-fö",		// *auffördern
"Auf-fö",		// Auffördern
"auf-fr",		// auffressen, auffrieren, auffrischen, auffrischend, auffrisiert, *kauffrau, Gedächtnisauffrischung, lauffreudig, Tauffragen
"Auf-fr",		// Auffressen, Auffrieren, Auffrischen, Auffrischend, Auffrischung, Auffrischungsimpfung, Auffrischungskurs
"auf-fuh",		// (her)auffuhr(en), hinauffuhr(en), hinauffunkeln, vorauffuhr
"Auf-fuh",		// Auffuhr
"auf-funk",		// herauffunkeln, hinauffunkeln
"Auf-funk",		// Auffunkeln
"auf-fut",		// auffuttern, (her)auffuhr(en), herauffunkeln, hinauffuhr(en), hinauffunkeln, vorauffuhr
"Auf-fut",		// Auffuttern
"auf-fä",		// auffächern, auffädeln, auffädmen, auffällig, auffände, auffärben, herauffährt, hinauffährt, rauffällt, unauffällig, Unauffälligkeit, verhaltensauffällig
"Auf-fä",		// Auffächern, auffächern, Auffächerung, Auffädeln, Auffädelung, Auffädmen, Auffällig, Auffälligkeit, Auffärben
"auf-fü",		// aufführbar, aufführe(n), auffüllen, auffüttern, *aufführen, *aufführung, heraufführen, hinauffühlen, hinaufführen
"Auf-fü",		// Aufführbar, Aufführbarkeit, Aufführen, Aufführung, Aufführungsrecht, Auffüllen, Auffüllung, Auffüttern, Auffütterung
"auf-igel",		// Saufigel
"auf-int",		// Kaufinteressent
"auf-iß",		// aufißt
"auf-iss",		// aufisst
"auf-la",		// (hin)auflachen, aufladen, auflag, *auflage, auflagen*, auflagern, auflandig, auflas(en), auflassen, auflasten, auflauern, *auflauf, auflaufen, beauflagen, herauflassen, hinauflangen, hinauflassen, hinauflaufen, Kaufladen
"Auf-la",		// Auflachen, Aufladen, Auflader, Auflage, Auflagefläche, Auflage(n)höhe, Auflagenstark, Auflager, Auflagern, Auflagerung, Auflandig, Auflandung, Auflassen, Auflassung, Auflasten, Auflauern, Auflauf, Auflaufbremse, Auflaufen, Auflaufform
"auf-l>",		// Abk. Erstauflage
"<Auf-l>",		// Abk. Auflage
"blau-[fl]am",	// ABER: blauflammend
"auf-lä",		// hinauflächelnd, *aufläuft
"Auf-lä",		// hinauflächelnd, *aufläuft
"veau-[fl]ä",	// ABER: Niveaufläche
"auf-le",		// aufleben, (hin)auflecken, (hin)auflegen, auflehnen, aufleimen, auflesen, aufleuchten, drauflegen, Grabschaufler, Handauflegen, Handauflegung, hinaufleiern, Kaufleute, Laufleistung, Rücklaufleitung, (Schnee)schaufler, wiederaufleben, Zulaufleitung
"Auf-le",		// Aufleben, Auflecken, Auflegematratze, Auflegen, Aufleger, Auflehnen, Auflehnung, Aufleimen, Auflesen, Aufleuchten
"rau-[fl]ec",	// ABER: graufleckig
"au-[fl]eisc",	// ABER: Saufleisch
"auf-lin",		// Lauflinien
"auf-list",		// auflisten, Taufliste
"Auf-list",		// Auflisten, Auflistung
"auf-lo",		// auflockern, auflodern, auflohen, *auflockerung, drauflos, drauflos*, herauflocken, hinauflorgnieren, hinauflorgnettieren, hinauflotsen, Saufloch
"Auf-lo",		// Auflockern, Auflockerung, Auflodern, Auflohen
"auf-lud",		// *auflud
"Auf-lud",		// Auflud
"auf-lup",		// *auflupfen
"Auf-lup",		// Auflupfen
"auf-lust",		// Kauflust, kauflustig, Lauflust, Rauflust, rauflustig, Sauflust
"auf-luts",		// auflutschen
"Auf-luts",		// Auflutschen
"auf-luv",		// aufluven
"Auf-luv",		// Aufluven
"auf-läd",		// auflädt
"Auf-läd",		// Auflädt
"auf-läg",		// aufläge
"Auf-läg",		// Aufläge
"auf-läß",		// aufläßt
"Auf-läß",		// Aufläßt
"auf-läs",		// auflässig, aufläse, auflässt
"Auf-läs",		// Auflässig
"auf-läu",		// *aufläufe
"Auf-läu",		// Aufläufe
"auf-lö",		// auflösbar, auflösen, auflöten, *auflösung, unauflösbar, unauflöslich
"Auf-lö",		// Auflösbar, Auflösbarkeit, Auflösen, Auflösung, Auflösungserscheinung, Auflösungsprozess, Auflösungszeichen, Auflöten
"auf-lü",		// auflüpfisch
"Auf-lü",		// Auflüpfisch

"au[ff]-lad",	// ALT: auffladen
"Au[ff]-lag",	// ALT: Aufflage
"au[ff]-lau",	// ALT: aufflauffen, aufflauren
"Au[ff]-lau",	// ALT: Aufflauf
"Au[ff]-läu",	// ALT: Auffläuff
"au[ff]-lei",	// ALT: auffleinen
"au[ff]-lö",	// ALT: aufflösen, aufflößlich
"Au[ff]-lö",	// ALT: Aufflösung
"au[ff]-rec",	// ALT: auffrecht, auffrecken
"Au[ff]-rec",	// ALT: Auffrecht
"au[ff]-rei",	// ALT: auffreiben, auffreissen, auffreißen
"Au[ff]-rei",	// ALT: Auffreibung, Auffrei(t)zer
"au[ff]-ric",	// ALT: auffrichten, auffrichtig, auffrieben
"Au[ff]-ric",	// ALT: Auffrichtigkeit, Auffrichtung, Wiederauffrichtung
"au[ff]-rit",	// ALT: auffritzen
"Au[ff]-rit",	// ALT: Auffritzen
"au[ff]-ru",	// ALT: auffrucken, auffruckig, auffrupffen
"Au[ff]-ru",	// ALT: Auffruhr
"au[ff]-rü",	// ALT: auffrücken, auffrührisch
"Au[ff]-rü",	// ALT: Auffrührer

"chef-id",		// chefideologe
"Chef-id",		// Chefideologe, Chefidiot
"chef-ing",		// chefingenieur
"Chef-ing",		// Chefingenieur
"chef-lek",		// cheflektor
"Chef-lek",		// Cheflektor
"dorf-l",		// *dorflehrer, *dorflinde
"Dorf-l",		// Dorflehrer, Dorflinde
"ouisdor[fl]",	// ABER Louisdorflecken
"dor-[fl]üg",	// ABER: Kondorflügel
"dor-[fl]ie",	// ABER: Korridorfliesen
"e[ff]-lic",	// *trefflich
"e[ff]-l>",		// Abk. *trefflich
"r[ff]-lic",	// ALT: *würfflich, verwerfflich
"ref-lic",		// ALT: *treflich
"eif-fa",		// Schweiffahne
"eif-fed",		// Schweiffeder
"eif-led",		// Schleifleder
"eif-ling",		// Streifling
"eif-linn",		// Steiflinnen
"elf-fa",		// elffach
"Elf-f",		// Elffach
"enf-fa",		// senffarben
"enf-lö[ff]",	// Senflöffel (Vorsicht: Hirtenflöte, Kohlenflöz)
"reu-[fl]ei",	// treufleissig, treufleißig
"f-lein",		// Dörflein, Häuflein, Knöpflein, Näpflein, Scherflein, Schilfleinen, Schäflein, Steifleinen, Steifleinwand, Töpflein, Schifflein, Grifflein, ALT: Briefflein
"dörf-l",		// *dörflein, *dörfler, dörflich
"Dörf-l",		// Dörflein, Dörfler, Dörflich, Dörfle, Dörfler, Dörfli

"fünf-[fl]",	// fünfflach
"Fünf-[fl]",	// Fünfflach, Fünfflächner
"fünf-fa",		// fünffach, verfünffachen, fünffarbig
"Fünf-fa",		// Fünffach, Fünffache, Fünffarbig
"fünf-fe",		// fünffenstrig
"Fünf-fe",		// Fünffenstrig
"fünf-[fi]",	// fünffing(e)rig
"Fünf-[fi]",	// Fünffingrig, Fünffingerbreite, Fünffingerkraut
"Fünf-fr",		// Fünffrankenstück, Fünffränkler
"fünf-fä",		// fünffältig
"Fünf-fä",		// Fünffältig
"fünf-fü",		// fünffüßig, fünffünftel
"Fünf-fü",		// Fünffüßig, Fünffünftel, Fünffürst
"fünf-li",		// *fünfliber, *fünfling
"Fünf-li",		// Fünfliber, Fünfling, Fünflivrest(h)aler
"hof-fa",		// *hoffart, hoffarben
"Hof-fa",		// Hoffart, Hoffarbe, Hoffaktor
"hof-fei",		// *hoffeierlichkeit
"Hof-fei",		// Hoffeierlichkeiten
"hof-fel",		// *hoffeld
"Hof-fel",		// Hoffeld
"hof-fenst",	// *hoffenster
"Hof-fenst",	// Hoffenster
"hof-fes",		// *hoffessel
"Hof-fes",		// Hoffessel, Hoffestivität, Hoffestlichkeit, Hoffestspiele
"hof-feu",		// *hoffeuerwerke
"Hof-feu",		// Hoffeuerwerke
"hof-[fi]",		// *hoffiskal
"Hof-[fi]",		// Hoffiskalis
"hof-[fl]",		// Vorhofflattern, Vorhofflimmern, Hofflötist, Hofflügel, Hofflur
"scho[ff]-l]",	// ABER ALT: bischofflich, byschofflich
"ho[ff]-lag]",	// ABER ALT: Hofflager
"Ho[ff]-lag]",	// 
"ho[ff]-leb]",	// ABER ALT: Hoffleben
"Ho[ff]-leb]",	// 
"ho[ff]-leu]",	// ABER ALT: Hoffleute
"Ho[ff]-leu]",	// 
"ho[ff]-luf]",	// ABER ALT: Hoffluft
"Ho[ff]-luf]",	// 
"hö[ff]-lich",	// ALT: höfflich
"Hö[ff]-lich",	// ALT: Höfflich

"hof-fr",		// *hoffrau, Kirchhoffrieden
"Hof-fr",		// Hoffrau, Hoffreund, Hoffriseur, Hoffräulein
"ho[ff]-rat",	// ABER ALT: Hoffrath
"Ho[ff]-rat",	// 
"ho[ff]-rät",	// ABER ALT: Hoffräthin
"Ho[ff]-rät",	// 
"Ho[ff]-r>",	// Abk. Hoffrath

"hof-in",		// Bahnhofinspektors, Hofintendant, Hofinteresse, Hofintrigue
"scho[f]in",	// ABER ALT: Bischofin
"hof-fä",		// hoffähig, hoffärtig
"Hof-fä",		// Hoffähig, Hoffähigkeit, Hoffärtig, Hoffärtigkeit
"ho[ff]-äm",	// ABER ALT: *hoffämter
"Ho[ff]-äm",	// Aber ALT: Hoffämter
"hof-la",		// *hoflaborant
"Hof-la",		// Hoflaborant, Hoflage, Hoflager, Hoflakai, Hoflazarett
"hof-le",		// *hofleben, *hofleute, *hoflehrer
"Hof-le",		// Hofleben, Hofleute, Hoflehrer, schofler
"höf-le",		// *höfle
"Höf-le",		// Höflein
"hof-li",		// *hoflieferant, *hofliebe, *hoflied, *hoflinde
"chof-lig",		// ABER: schoflig
"Hof-li",		// Hoflieferant, Hofliebe, Hoflied, Hoflinde, Hoflithograph, Hoflivree
"hof-lo",		// *hofloge, *hoflohn
"Hof-lo",		// Hofloge, Hoflohn
"hof-lu",		// *hofluft
"Hof-lu",		// Hofluft, Hoflustbarkeit
"hof-ly",		// *hoflyriker
"Hof-ly",		// Hoflyriker
"hof-lä",		// *hoflächeln
"Hof-lä",		// Hoflächeln
"huf-la",		// *huflattich
"Huf-la",		// Huflattich
"i[ff]-fe",		// grifffest
"i[ff]-fü",		// Schiffführer
"i[ff]-la",		// Schiffladung
"ersi[ffl]age",	// ABER ALT: Persifflage
"i[ff]-lä",		// Schifflände
"i[ff]-leut",	// Schiffleute
"i[ff]-lie",	// Schifflied
"i[ff]-lic",	// begrifflich, ALT: begreifflich, eingreifflich, ergreifflich, Ergreifflichkeit, greifflich, handgreifflich, reifflich, unzweifflich
"i[ff]-loc",	// Griffloch
"i[ff]-loh",	// Schifflohn
"i[ff]-los",	// grifflos, schifflos
"ief-far",		// tieffarbig
"ief-[fi]",		// Basrelieffigur, Hautrelieffiguren
"ief-[fl]",		// Tiefflieger, Tieffliegerangriff, Tiefflug, tiefflutender
"rie[ff]-l]",	// ABER ALT: Briefflein, Briefflin
"ief-fo",		// Briefform(at), Brieffoliant
"ief-fr",		// Brieffreund(in), Brieffreundschaft, tieffrohe, tieffromm
"ief-inta",		// Reliefintarsia, Reliefintarsie
"ief-inh",		// Briefinhalt
"ief-inni",		// tiefinnig
"ief-inter",	// tiefinteressierend
"ief-la",		// schieflachen, schieflaufen, Tiefladeanhänger, Tieflader, Tiefladewagen, Tiefland*, ALT: Liefland*
"nie-[fl]am",	// ABER: Genieflamme
"rie-[fl]an",	// ABER: Infanterieflanke
"ief-lä",		// Tiefländ*, ALT: Liefländ*
"ief-leb",		// Briefleben, tieflebend
"ief-lei",		// tiefleidend
"ief-les",		// Briefleser
"ief-let",		// Relieflettern
"ief-leu",		// tiefleuchtend
"ief-lich",		// brieflich, steckbrieflich
"ief-lie",		// schiefliegen, schieflief(en), tiefliegend
"ief-list",		// Briefliste
"if-lich",		// (un)begreiflich, (un)begreiflicherweise, handgreiflich, Handgreiflichkeit, reiflich, Streiflicht, (über)tariflich, Unbegreiflichkeit, (un)vorgreiflich
"reif-l>",		// Abk. *greiflich
"i[ff]-lach",	// grifflachen
"I[ff]-land",	// Iffland
"i[ff]-länd",	// iffländischen
"I[ff]-länd",	// Iffländer
"If-land",		// ALT AUCH: Ifland
"ilf-fe",		// Schilffeder, Schilffeld
"ilf-fr",		// schilffrei
"ilf-ins",		// Schilfinsel
"ilf-li",		// Schilflieder, Schilflilie
"nif-lung",		// *niflungen
"Nif-lung",		// Niflungen
"kopf-laut",	// Kehlkopflaut
"Kopf-laut",	// Kopflaut
"laf-l",		// Schlaflernmethode, Schlaflied, schlaflos, Schlaflosigkeit, Schlaflager, Schlafleben, schlaflocken, Schlaflust
"leif-la",		// Schleiflack, Schleiflackmöbel
"lf-lich",		// (un)behilflich, Unbehilflichkeit
"lf-ling",		// Wölfling, Zwölfling
"lf-los",		// hilflos, Hilflosigkeit, hülflos
"egel[fl]os",	// ABER: Segelflosser
"achel[fl]os",	// ABER: Stachelflosser
"bel[fl]or",	// ABER: Nebelflor
"mpf-[fisch]",	// Kampffisch
"mpf-[fi]eb",	// Sumpffieber
"mpf-[fl]",		// Kampfflieger, Kampfflugzeug, Kampfflur, Rumpffläche
"imp[ff]-l",	// ABER ALT: glimpfflich, Wimpffling
"ümp[ff]-l",	// ABER ALT: *stümpfflein
"ampf-fel",		// (Haupt)kampffeld
"ampf-fer",		// kampffertig
"umpf-fe",		// Strumpfferse, Sumpffelder
"mpf-fä",		// kampffähig, Kampffähigkeit
"mpf-fö",		// Sumpfföhre
"mpf-lam",		// (Quecksilber)dampflampe
"mpf-leb",		// Schrumpfleber, Sumpfleben
"mpf-li",		// (un)glimpflich, (Haupt)kampflinie, Impfling, Impfliste, Kampflied, krampflindernd, schimpflich, Schimpflichkeit, Schimpflied, Stümpfling
"m-p[fl]icht",	// ABER: Schirmpflicht, Gehorsampflicht
"mpf-lo",		// Dampflok, Dampflokomotive, kampflos, Strumpfloch, strumpflos, Sumpfloch
"mpf-lu",		// Kampflust, kampflustig, Sumpfluft
"mpf-lä",		// Kampflärm, Kampfläufer, Sumpfläufer
"mpf-lö",		// krampflösend, Sumpflöcher
"nf-[fi]",		// Fünffingerkraut
"anf-fa",		// Hanffaser, Hanffaden
"anf-fä",		// Hanffäden
"anf-fe",		// Hanffeld
"anf-lad",		// Hanfladung
"o[ff]-fet",	// Stofffetzen
"o[ff]-fü",		// Stofffülle
"o[ff]-ind",	// Grundstoffindustrie, Kunststoffindustrie
"o[ff]-lam",	// Leuchtstofflampe
"o[ff]-ind",	// Grundstoffindustrie, Kunststoffindustrie
"o[ff]-ionen",	// Wasserstoffionenkonzentration
"o[ff]-lei",	// Kraftstoffleitung
"o[ff]-lic",	// *stofflich
"o[ffl]-ig",	// stofflig
"o[ff]-los",	// *stofflos, Stofflosigkeit
"opf-[fl]",		// Tropfflasche, Klopffleisch, Stopfflecken, Topfflicker, Zopfflechten
"opf-inf",		// Tropfinfusion
"opf-ind",		// Kopfindensandstecken
"opf-lag",		// Kopflage
"opf-lah",		// kopflahm
"opf-lap",		// Topflappen
"opf-lar",		// Rindskopflarven
"opf-las",		// kopflastig, Kopflastigkeit
"opf-laus",		// Kopflaus
"opf-läus",		// Kopfläuse
"opf-leb",		// Stopfleber
"opf-lee",		// kopfleerend
"opf-leh",		// Kopflehne
"opf-lei",		// Kopfleiden, Kropfleidender
"opf-leis",		// Knopfleiste, Kopfleiste
"opf-leu",		// Kropfleute
"opf-lo",		// Knopfloch, Knopfloch*, kopflos, Kopflosigkeit, Schopflohe
"opf-lö",		// Knopflöcher
"opf-lä",		// Kopflänge, Zopflänge
"orf-fa",		// Torffahren, Torffahrer
"orf-feu",		// Torffeuerung
"orf-fläch",	// Dorfläche
"orf-fr",		// Dorffrauen, Dorffreunde, Dorffriede
"orf-fu",		// Dorffuhrwerk
"orf-idy",		// Dorfidyll
"orf-ins",		// Dorfinsassen, Dorfinsel, Torfinspektor
"orf-int",		// Dorfintriguen
"orf-la",		// Torflage, Torflager, Torfland
"orf-la",		// Torfleute
"orf-lo",		// Torfloch
"pf-fa",		// Dickkopffalter, Knopffabrik, Schöpffaß, Strumpffabrik, stumpffarbig, Totenkopffalter, Trumpffarbe, Topffabrikant
"opf-fe",		// Klopffechten, Kopffeder, Kopffell
"pf-fest",		// ABER: klopffest, Klopffestigkeit
"pf-fo",		// Kopfform, Knopfform, Schöpfform
"pf-fre",		// krumpffrei, sumpffrei
"pf-fri",		// Pilzkopffrisur
"pf-fro",		// kampffroh, Kampffront
"amp[ff]-r",	// ABER ALT: Kampffrichter, Kampffreder
"pf-fü",		// Kopffüßer
"prüf-fel",		// *prüffeld
"Prüf-fel",		// Prüffeld, Prüffeldingenieur
"prüf-ing",		// *prüfingenieur
"Prüf-ing",		// Prüfingenieur
"prüf-la",		// *prüflampe
"Prüf-la",		// Prüflampe
"prüf-li",		// *prüfling, *prüfliste
"Prüf-li",		// Prüfling, Prüfliste
"pu[ff]-la",	// *pufflampe
"Pu[ff]-la",	// Pufflampe
"raf-fert",		// straffertig
"raf-feu",		// Straffeuer
"raf-frei",		// straffrei, Straffreiheit
"raf-lag",		// Straflager
"raf-lied",		// Straflied
"raf-list",		// Strafliste
"raf-lust",		// Straflust
"rf-fall",		// Maulwurffalle
"rf-fan",		// Maulwurffangen
"rf-fän",		// Maulwurffänger
"rf-fell",		// Maulwurffell
"werf-[fl]",	// Wegwerfflasche
"arf-[fl]",		// scharfflammend
"rf-leb",		// Maulwurfleben
"rf-lich",		// dörflich, verwerflich, Verwerflichkeit
"rf-ling",		// Auswürfling, Nerfling
"örff-ling",	// ALT: Dörffling
"ürff-ling",	// ALT: Würffling
"rif-fä",		// tariffähig, Tariffähigkeit
"rif-lo",		// Tariflohn, tariflos
"rpf-lin",		// Kärpfling, Zebrakärpfling
"ruf-le",		// Freiberufler
"schaf-[fl]",	// *schaffleisch
"Schaf-[fl]",	// Schaffleisch
"schaf-fell",	// *schaffell
"Schaf-fell",	// Schaffell
"schaf-la",		// *schaflamm
"Schaf-la",		// Schaflamm
"schaf-lä",		// *schaflämmer
"Schaf-lä",		// Schaflämmer, Schafläuse
"schaf-le",		// *schafleder
"Schaf-le",		// Schafleder
"sif-[fl]ö",	// *sifflöte
"Sif-[fl]ö",	// Sifflöte
"sto[ff]-ing",	// Werkstoffingenieur
"sumpf-la",		// *sumpfland
"Sumpf-la",		// Sumpfland, Sumpflache
"tegreif-l",	// Stegreiflaune, Stegreifleben, Stegreifleistung
"sümpf-le",		// Biersümpfler
"Sümpf-le",		// Sümpfler
"uf-formel",	// Ausrufformel
"uf-lau",		// Ruflaut
"uf-lich",		// auflichten, Auflichtung, *beruflich, käuflich, Unverkäuflichkeit, (un)widerruflich
"uf-los",		// beruflos, ruflos
"upf-leh",		// Schupfleh(e)n
"upf-loch",		// Schlupfloch
"upf-löch",		// Schlupflöcher
"zupf-in",		// *zupfinstrument
"Zupf-in",		// Zupfinstrument, Zupfinstrumentenmacher
"zwölf-fa",		// zwölffach, zwölffache
"Zwölf-fa",		// Zwölffach
"zwölf-[fi]",	// *zwölffingerdarm
"Zwölf-[fi]",	// Zwölffingerdarm, Zwölffingerdarmgeschwür
"zwölf-[fl]",	// *zwölfflach, *zwölfflächner
"Zwölf-[fl]",	// Zwölfflach, Zwölfflächner
"ä[ff]-le",		// Äfflein, Schäffler, Schäfflertanz, Pfäffle, Pfäfflein
"äf-le",		// Markgräfler, Schäflein, Schläflein, Schäflein
"äf-lich",		// gräflich, markgräflich, (un)sträflich, Sträflichkeit
"äf-ling",		// *sträfling, Sträflings*
"änf-lin",		// Hänfling
"äuf-li",		// käuflich, Käuflichkeit, *verkäuflich, Täufling
"ö[ff]-lein",	// Löfflein
"öf-li",		// (erz)bischöflich, (un)höflich, Höflichkeit*, höflichkeitshalber, Höfling
"öpf-fut",		// Einknöpffutter
"öpf-le",		// Knöpflesschwabe, (Zwei)köpfler, Kohlköpfle, Töpflein, Knöpflein
"öpf-li",		// Knöpfli, Pfröpfling, (un)erschöpflich
"öpf-lo",		// geschöpflose
"öpf-lö",		// Schöpflöffel
"ürf-lo",		// Schürfloch
"ürf-lö",		// Schürflöcher

];


///////////////////////////////////////////////////////////////

var SD = [];
var VD = [];

var str = "";
var Li = 0;
var Cnt = 0;

for (i = 0; i < LD.length; i++)
{
	str = LD[i];
	SD[i] = "";
	VD[i] = "";	
	for (j = 0; j < str.length; j++)
	{	s = str.slice(j, j + 1);
		// Suchstrings ohne []-, inkl. <>
		if (s !== "[" && s !== "]" && s !== "-")
		{
			if (s == "<" || s == ">" )
			{
				SD[i] = SD[i] + "\\";
			}
			SD[i] = SD[i] + s;
		}
		// Vergleichsstrings ohne <>-, mit []
		if (s !== "<" && s !== ">" && s !== "-")
		{
			VD[i] = VD[i] + s;
		}
	}
	VD[i] = VD[i] + " ";
	// $.writeln(Li + ": " + LD[i] + " / " + SD[i] + " / " + VD[i]) + ".";
	Li++;
}


///////////////////////////////////////////////////////////////

var Doc = app.activeDocument;
var PB_Max = Li;
PB_ProgressPanel = new Window('window', 'Ligaturen, Standardregeln');
with(PB_ProgressPanel)
{
	PB_ProgressPanel.PB_ProgressBar = add('progressbar', [12, 12, 500, 32], 0, 100);
}
PB_ProgressPanel.show();

// Clear the find/change preferences
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
// Set the find options.
app.findChangeGrepOptions.includeFootnotes = true;
app.findChangeGrepOptions.includeHiddenLayers = false;
app.findChangeGrepOptions.includeLockedLayersForFind = false;
app.findChangeGrepOptions.includeLockedStoriesForFind = false;
app.findChangeGrepOptions.includeMasterPages = false;

app.changeGrepPreferences.ligatures = true;

if (Underline)
{
	app.changeGrepPreferences.underline = true;
	app.changeGrepPreferences.underlineColor = app.colors.item("C=15 M=100 Y=100 K=0");
	app.changeGrepPreferences.underlineTint = 15;
	app.changeGrepPreferences.underlineWeight = 14;
	app.changeGrepPreferences.underlineOffset = -3.5;
}
	
	
for (i = 0; i < StdLig.length; i++)
{
	str = StdLig[i];
	app.findGrepPreferences.findWhat = str;
	Doc.changeGrep();
}

///////////////////////////////////////////////////////////////

var Stellen = NothingEnum.nothing;
var Stelle = NothingEnum.nothing;
var Zeichen = NothingEnum.nothing;
var Max = 0;

// Again clear the find/change preferences
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

for (i = 0; i < LD.length; i++)
{
	// Scale the value change to the maximum value of the progress bar.
	PB_ProgressPanel.PB_ProgressBar.value = 100 * i / PB_Max;
	
	SStr = SD[i];
	VStr = VD[i];
	// Find the ligature string
	app.findGrepPreferences.findWhat = SStr;
	Stellen = Doc.findGrep();
	PB_ProgressPanel.text = "Ligaturregel " + (i + 1) + ": \"" + LD[i] + "\" (" + Stellen.length + ")";
	for (var s = 0; s < Stellen.length; s++)
	{
		Stelle = Stellen[s];
		// $.writeln(Stellen[s].contents);
		Max = Stellen[s].length;
		k = 0;
		LigFlag = false;
		for (var j = 0; j < Max; j++)
		{	Zeichen = Stelle.characters[j];
			if (VStr.slice(k, k + 1) == "[")
			{
				LigFlag = true;
				k = k + 1;
			}
			if (VStr.slice(k, k + 1) == "]" || VStr.slice(k, k + 1) == "-")
			{
				LigFlag = false;
				k = k + 1;
			}

			if (LigFlag)
			{
				Zeichen.ligatures = true;
				// if (VStr.slice(k + 1, k + 2) !== "]")
				// {
				//	Stelle.insertionPoints[j + 1].kerningMethod = "Metrics";
				// }
			}
			else
			{
				Zeichen.ligatures = false;
			}

			if (Underline == true) 
			{	
				Zeichen.underline = true;
				if (LigFlag)
				{
					Zeichen.underlineColor = Doc.colors.item("C=15 M=100 Y=100 K=0");
				}
				else
				{
					Zeichen.underlineColor = Doc.colors.item("Black");
				}
				if (Zeichen.underlineTint > 85)
				{
					Zeichen.underlineTint = 15;
				}
				else
				{
					Zeichen.underlineTint = Math.min(Zeichen.underlineTint + 15, 90);
				}
				Zeichen.underlineWeight = 14;		// Zeichen.pointSize * 1.25 ;
				Zeichen.underlineOffset = -3.5;		// -1 * Zeichen.underlineWeight / 4;
			}
			k = k + 1;
		}
	}
}

// PB_ProgressPanel.PB_ProgressBar.value = 0;
PB_ProgressPanel.close();

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

app.scriptPreferences.enableRedraw = true;	// Änderungen anzeigen

// $.writeln(Zeit.toString());
