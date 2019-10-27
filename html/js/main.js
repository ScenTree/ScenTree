var in30Minutes = 1/48;

// cookies part, with "js-cookie" (https://github.com/js-cookie/js-cookie)
var RGPD_warning_has_been_done = Cookies.get('RGPD_warning'); // RGPD_warning unset means this is the first visit
var RGPD_choice_has_been_done = Cookies.get('RGPD_no_cookie');
if (! window.document.jsdom_reader) {
	if (! RGPD_warning_has_been_done) {
	    Cookies.set('RGPD_warning', '1', { expires: 365 });
	    $("#RGPD_warning").css({'display' : 'block'});
	    $("#modal_video").modal("show");
	} else {
	    if ((! RGPD_choice_has_been_done) || ((RGPD_choice_has_been_done != 1) && (RGPD_choice_has_been_done != -1))) {
	        $("#RGPD_warning").css({'display' : 'block'});
	    } else {
	        $("#RGPD_warning").css({'display' : 'None'});
	    };
	};
};

$("#no_cookie").click(function(){
	$("#RGPD_warning").css({'display' : 'None'});
	Cookies.set('RGPD_no_cookie', '1', { expires: 365 });
});

$("#cookie_please").click(function(){
	$("#RGPD_warning").css({'display' : 'None'});
	Cookies.set('RGPD_no_cookie', '-1', { expires: 365 });
     	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'UA-140166656-1');
});

function put_all_digits_into_sub(the_string) {
    // sub = <sub>12</sub>, for indices
    // put_all_digits_into_sub("C43H4O2") -> "C<sub>43</sub>H<sub>4</sub>O<sub>2</sub>"
    return String(the_string).replace(
        new RegExp("[0-9]+", "gi"), 
        "<sub>$&</sub>");
};


// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
// but we want to match the accented characters with an unaccented character : e -> [éeèëê], so : resine -> r[éeèëê]s[iïî]n[éeèëê]
function get_all_accents_in_a_regexp(the_string) {
    var the_lowered_string = the_string.toLowerCase();
    var the_string_with_accented_regexp = "";
    for (var i = 0; i < the_lowered_string.length; i++) {
	var the_char = the_lowered_string.charAt(i);
	switch(the_char) {
	case "a":
	case "à":
	case "â":
	case "ä":
	    the_string_with_accented_regexp = the_string_with_accented_regexp + "[aàâä]";
	    break;
	case "e":
	case "é":
	case "è":
	case "ë":
	case "ê":
	    the_string_with_accented_regexp = the_string_with_accented_regexp + "[eéèëê]";
	    break;
	case "i":
	case "î":
	case "ï":
	    the_string_with_accented_regexp = the_string_with_accented_regexp + "[iîï]";
	    break;
	case "o":
	case "ô":
	case "ö":
	    the_string_with_accented_regexp = the_string_with_accented_regexp + "[oôö]";
	    break;
	case "u":
	case "ù":
	case "ü":
	case "û":
	    the_string_with_accented_regexp = the_string_with_accented_regexp + "[uùüû]";
	    break;
	case "y":
	case "ÿ":
	    the_string_with_accented_regexp = the_string_with_accented_regexp + "[yÿ]"; // l'Haÿ-les-Roses
	    break;
	default:
	    the_string_with_accented_regexp = the_string_with_accented_regexp + the_char;
	};
    };
    return the_string_with_accented_regexp;
};

/*
 * jQuery UI Autocomplete HTML Extension
 *
 * Copyright 2010, Scott González (http://scottgonzalez.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * http://github.com/scottgonzalez/jquery-ui-extensions
 */
(function( $ ) {

var proto = $.ui.autocomplete.prototype,
	initSource = proto._initSource;

function filter( array, term ) {
	var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
	return $.grep( array, function(value) {
		return matcher.test( $( "<div>" ).html( value.label || value.value || value ).text() );
	});
}

$.extend( proto, {
	_initSource: function() {
		if ( this.options.html && $.isArray(this.options.source) ) {
			this.source = function( request, response ) {
				response( filter( this.options.source, request.term ) );
			};
		} else {
			initSource.call( this );
		}
	},

	_renderItem: function( ul, item) {
	    var newText = "<span class='nom_de_l_ingredient'>" + String(item.label.sci_name).replace(
                new RegExp(get_all_accents_in_a_regexp(this.term), "gi"),
                "<span class='ui-state-highlight'>$&</span>") + "</span>";
	    if (item.label["from_csv AutresNoms"]) {
		newText = newText + "<br /><span class='synonymes'>(" + String(item.label["from_csv AutresNoms"]).replace(
                    new RegExp(get_all_accents_in_a_regexp(this.term), "gi"), 
                    "<span class='ui-state-highlight'>$&</span>") + ")</span>";
	    };
	    if (item.label["from_csv Botanique"]) {
		newText = newText + "<br /><span class='synonymes'>(" + String(item.label["from_csv Botanique"]).replace(
                    new RegExp(get_all_accents_in_a_regexp(this.term), "gi"), 
                    "<span class='ui-state-highlight'>$&</span>") + ")</span>";
	    };
	    if (item.label["from_csv NCas"]) {
		newText = newText + "<br /><span class='numero_cas'>N° CAS : " + String(item.label["from_csv NCas"]).replace(
                    new RegExp(get_all_accents_in_a_regexp(this.term), "gi"),  
                    "<span class='ui-state-highlight'>$&</span>") + "</span>";
	    };
	    return $( "<li></li>" )
		.data( "item.autocomplete", item )
		.append( $( "<p></p>" )[ this.options.html ? "html" : "text" ]( newText ) )
		.appendTo( ul );
	}
});

})( jQuery );
/* end of jQuery UI Autocomplete HTML Extension */

/* Définissions de la map*/
var map = L.map('map', {zoomControl: true, attributionControl: false});
/* Dire que la map est disponible dans le cache du serveur à l'adresse suivante */
var tolUrl= '/hot/{z}/{x}/{y}.png';
/* Zoom initial = zoom 5 décalé de 2 sur la gauche et 0 sur la droite*/
the_width_of_the_window = $(window).width();
if (the_width_of_the_window <= 800) {
    zoom_initial = 3;

} else if ((the_width_of_the_window > 800) && (the_width_of_the_window <= 1300)) {
    zoom_initial = 4;
} else {
    zoom_initial = 5;
};
/* Definir les niveau de zoom minimum et maximum*/
var tol = new L.TileLayer(tolUrl, {minZoom: zoom_initial, maxZoom: 13});
// get the parameters of the previous map
var the_previous_map__zoom = Cookies.get('the_previous_map__zoom');
var the_previous_map__latitude = Cookies.get('the_previous_map__latitude');
var the_previous_map__longitude = Cookies.get('the_previous_map__longitude');

/* Définir la taille de la carte */
map.addLayer(tol);
map.setView([the_previous_map__latitude || 2, the_previous_map__longitude || 0, ], the_previous_map__zoom || zoom_initial);

/* Définission de l'icone qui pointe les MP recherchées*/
var mark = L.icon({
    iconUrl: '../img/mark.png',
    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
});

/////////////////////////////
/////CREATION DES POP-UP/////
/////////////////////////////

function is_an_ingredient(the_object) {
	return (the_object['ingredient'] == 'yes');
};

//We create here the function that will build popups (modals).
function CreatePopUps() {
    //Si aucune pop-up ouverte, efface le pointeur si il est présent
    map.removeLayer(markers);
    //
    markers = new L.FeatureGroup();
    //
    z = map.getZoom() + 6;
    //
    bb = map.getBounds();
    //Definitions des coordonnées géographiques
    var lon1 = bb._southWest.lng;
    var lon2 = bb._northEast.lng;
    var lat1 = bb._southWest.lat;
    var lat2 = bb._northEast.lat;
    //Utilisation des données géographiques dans l'URL de requête Solr
    var URL2 = "/select/?q=*:*&fq=zoom:[0 TO " + z + "]&fq=lat:[" + lat1 + " TO " + lat2 + "]&fq=lon:[" + lon1 + " TO " + lon2 + "]&wt=json&rows=1000"; 
    // 
    $.ajax({
	//
	url : URL2,

	success : function(data) {
	    var ok = data.response.docs;
	    $.each(ok, function( index, value ) {
		var latlong = new L.LatLng(ok[index].lat[0], ok[index].lon[0]);
		//positionnement de l'icone pointeur, n'est pas utilisé en réalité. 
		var marker = L.marker(latlong,{icon: mark});
		// non-ingredient -> basic modal
		if ( ! is_an_ingredient(ok[index]) ) {
			marker.on("click", function() {
		    		markofun(ok[index]);
			});
                } else {  // else : ingredient -> link to a new html page
                        marker.on("click", function() {
				var the_map_center = map.getCenter();
				var rounded_latitude = Math.round(the_map_center.lat * 100000) / 100000;
				var rounded_longitude = Math.round(the_map_center.lng * 100000) / 100000;
				var the_map_zoom = map.getZoom();
				Cookies.set('the_previous_map__zoom', the_map_zoom, { expires: in30Minutes });
				Cookies.set('the_previous_map__latitude', rounded_latitude, { expires: in30Minutes });
				Cookies.set('the_previous_map__longitude', rounded_longitude, { expires: in30Minutes });
                                window.location.href = "../ingredients/" + ok[index]['sci_name'].replace( new RegExp("\\s", "gi"), "_") + ".html";
                        });
		};
		markers.addLayer(marker);
	    });
	},
	dataType : 'jsonp',
	jsonp : 'json.wrf'
    });
    markers.addTo(map);
};

//definitions de 2 nouvelles variables
var searchMarker = new L.FeatureGroup();
var markers = new L.FeatureGroup();

//pop-ups des boutons du HTML
$(".my-search-bar").on("input", function(){
    if ((! this.value) || (this.value == "")) {
      if (SPfocus) {
   	 map.removeLayer(SPfocus);
    };
});
$(".my-search-bar").focus(function() {
    $(this).autocomplete('search', $(this).val())
});
/*$(".logomenu").click(function() {
     $(".modalmenu").modal("toggle");
 });*/
$("#ListeMP").click(function() {
    $("#listeMP").modal("show");
});
$("#Listefamilles").click(function() {
    $("#listefamilles").modal("show");
});
/*$("#modal_video").click(function() {
    $("#vidéo").modal("show");
});
$("#credit").click(function() {
    $("#Crédits").modal("toggle");
});
$("#contact").click(function() {
    $("#Contacts").modal("toggle");
});
$("#confidentialite").click(function() {
    $("#Confidentialite").modal("toggle");
});
$("#source").click(function() {
    $("#Source").modal("toggle");
});*/

//pop-up
map.on("moveend", function() {
    CreatePopUps();
});

// définition du pointeur valable, celui jaune de google maps
var SPfocus;
var pin1 = L.icon({
    iconUrl: '../img/pin1.png',
    iconSize:     [18, 25], // size of the icon
    iconAnchor:   [9, 30], // point of the icon which will correspond to marker's location
});

//This little code fixes the width of the suggestions
jQuery.ui.autocomplete.prototype._resizeMenu = function () {
    var ul = this.menu.element;
    ul.outerWidth(this.element.outerWidth());
}

////////////////////////////////////////
///////FONCTION RECHERCHE///////////////
////////////////////////////////////////

$(function() {
    var str;
    //définitions des URL de la requete de solr//
    var URL_PREFIX_SUGGESTER = "/suggesthandler/?suggest.dictionary=mySuggester&suggest.cfq=yes&suggest.q=";
    var URL_PREFIX_SELECTER = "/select/?q=id%3A";
    var URL_SUFFIX = "&wt=json";
    
    $(".my-search-bar").autocomplete({
	source : function(request, response) {
	    //envoi de la requête à searchinput, la classe HTML définie dans l'index.html
	    let the_value_from_the_search_input = this.element.val();
 	    var URL_SUGGESTER = URL_PREFIX_SUGGESTER + the_value_from_the_search_input + URL_SUFFIX;
            console.log(URL_SUGGESTER);
	    $.ajax({
		url : URL_SUGGESTER,
		
		success : function(data) {
		    var step1 = data.suggest.mySuggester[the_value_from_the_search_input.toString()];
		    if (! step1.suggestions) {
			    return;
		    };
		    var docs = JSON.stringify(step1.suggestions);
		    var jsonData = JSON.parse(docs);
		    jsonData.sort(function(a,b) {
			a1 = a.term[0].replace(/<b>/g,"").replace(/<\/b>/g,"");
			b1 = b.term[0].replace(/<b>/g,"").replace(/<\/b>/g,"");
			return(a1.length-b1.length);
		    });
		    var ids_as_an_array = [];
		    $.map(jsonData, function(value, key) {
			object_id = value.payload;
			ids_as_an_array.push(object_id);
		    });
		    
		    if (! ids_as_an_array.length) { // no id no ajax request (otherwise : error in the javascript script)
			response();
			return;
		    };
		    
		    ids_as_a_string = ids_as_an_array.join("%20");
		    var URL_SELECTER = URL_PREFIX_SELECTER + "(" + ids_as_a_string + ")" + URL_SUFFIX;
		    console.log(URL_SELECTER);
		    
		    $.ajax({
			url : URL_SELECTER,
			
			success : function(data_from_selecter) {
			    var the_infos_from_the_selecter = data_from_selecter.response.docs;
			    response($.map(the_infos_from_the_selecter, function(value, key) {
				var sci_name = value.sci_name;
				var NCas = value["from_csv NCas"];
				return {
				    label : value,
				    value : sci_name + " " + NCas
				};
			    }));
			},
			
			error : function() {
			    response();
			}, 
			
			dataType : 'jsonp',
			jsonp : 'json.wrf'
			
		    });
		},
		
		dataType : 'jsonp',
		jsonp : 'json.wrf'
	    });
	},
	minLength : '1',
	autoFocus: true,
	html: true,
	focus: function() {
	    // prevent value inserted on focus
	    return false;
	},
	select: function(e, ui) {
	    $(".my-search-bar").blur();						
	    var URL = URL_PREFIX_SELECTER + "\"" + ui.item.label.id + "\"" + URL_SUFFIX;
	    console.log(URL);
	    $.ajax({
		url : URL,
		success : function(data) {
		    var docs = JSON.stringify(data.response.docs);
		    var jsonData = JSON.parse(docs);
		    //C'est ici qu'est géré le niveau d'apparition des zooms. Problème pour zoomviews < 5 car apparaissent trop loin 
		    if (true) {
		    	jsonData[0].zoom < 5
		    } else {
		    	jsonData[0].zoom = 5
		    }
		    map.setView(jsonData[0].coordinates, jsonData[0].zoom);
		    	
		    
		    // virer les marqueurs précédents et réinitier la variable en la redéfinissant 
		    searchMarker.remove();
		    searchMarker = new L.FeatureGroup();
		    

		    SPfocus = L.marker(jsonData[0].coordinates, {icon: pin1}).addTo(searchMarker);
 		    SPfocus.on("click", function() {
 			markofun(jsonData[0]);
 		    });
                    searchMarker.addTo(map);
		},
		dataType : 'jsonp',
		jsonp : 'json.wrf'
	    });
	}
    })
});
////////////////////////////////
/////////////VIDEO//////////////
////////////////////////////////
$(document).ready(function() {

$("#modal_video").on('shown.bs.modal', function(){
    $("#video").attr('src', 'https://youtube.com/embed/7IpLYzM72ms');
})
// stop playing the youtube video when I close the modal
$('#modal_video').on('hide.bs.modal', function (e) {
    // a poor man's stop video
    $("#video").attr('src',''); 
}) 
});


function markofun(the_node_as_json, show_the_modal = true) {
    //convert \n to <br /> = convert 'json end of line' to 'html end of line'
    //var the_node_as_json_2 = {};
    //$.each(the_node_as_json, function(the_key, the_value) {
    //    if ((the_value) && (the_value.replace)) {
    //            the_node_as_json_2[the_key] = the_value.replace(/\n/g,"<br />");
    //    };
    //});
    // the_node_as_json = the_node_as_json_2;
    
    //communs
    var the_use = the_node_as_json['from_csv Utilisation'];
    var the_type = the_node_as_json['from_csv Type'];
    var the_title = the_node_as_json['from_csv Nom'];
    var the_aspect = the_node_as_json['from_csv Aspect'];
    var the_allergenes = the_node_as_json['from_csv Allergenes'];
    var the_tenue = the_node_as_json['from_csv Tenue'];
    var the_ifra = the_node_as_json['from_csv IFRA'];
    var the_autresd = the_node_as_json['from_csv Autres_Descripteurs'];
    var the_price = the_node_as_json['from_csv Prix'];
    var the_filiation = the_node_as_json['from_csv Filiation'];
    var the_remarques = the_node_as_json['from_csv autresremarques'];
    var the_parole = the_node_as_json['from_csv paroledeparfumeur'];
    var the_stab = the_node_as_json['from_csv Stabilite'];
    var the_utilisation = the_node_as_json['from_csv Utilisation'];
    var the_cas = the_node_as_json['from_csv NCas'];
    //Naturelles
    var the_nbota = the_node_as_json['from_csv Botanique'];
    var the_bota = the_node_as_json['from_csv Nom Botanique'];
    var the_methode = the_node_as_json['from_csv Extractions'];
    var the_origine = the_node_as_json['from_csv Origine geographique'];
    var the_componat = the_node_as_json['from_csv composantsmajoritaires'];
    var the_pemblem = the_node_as_json['from_csv parfumemblematiques'];
    var the_chemotype = the_node_as_json['from_csv chemotype'];
    var the_medecine = the_node_as_json['from_csv medecine'];
    //Synthétiques
    var the_densite = the_node_as_json['from_csv Densite'];
    var the_logp = the_node_as_json['from_csv LogP'];
    var the_fp = the_node_as_json['from_csv FlashPoint'];
    var the_bp = the_node_as_json['from_csv BoilingPoint'];
    var the_decouverte = the_node_as_json['from_csv Decouverte'];
    var the_synthese = the_node_as_json['from_csv Synthese'];
    var the_precurseur = the_node_as_json['from_csv Precurseurs'];
    var the_isomerie = the_node_as_json['from_csv Isomerie'];
    var the_presencenat = the_node_as_json['from_csv Presencenat'];
    var the_molaire = the_node_as_json['from_csv mmolaire'];
    var the_fbrute = put_all_digits_into_sub(the_node_as_json['from_csv formulebrute']);
    //IFRA
    var the_amendment = the_node_as_json['from_csv Amendment'];
    var the_cat1 = the_node_as_json['from_csv Category 1'];
    var the_cat2 = the_node_as_json['from_csv Category 2'];
    var the_cat3 = the_node_as_json['from_csv Category 3'];
    var the_cat4 = the_node_as_json['from_csv Category 4'];
    var the_cat5 = the_node_as_json['from_csv Category 5'];
    var the_cat6 = the_node_as_json['from_csv Category 6'];
    var the_cat7 = the_node_as_json['from_csv Category 7'];
    var the_cat8 = the_node_as_json['from_csv Category 8'];
    var the_cat9 = the_node_as_json['from_csv Category 9'];
    var the_cat10 = the_node_as_json['from_csv Category 10'];
    var the_cat11 = the_node_as_json['from_csv Category 11'];
    var the_commentifra = the_node_as_json['from_csv Commentaires'];
    var the_leaveon = the_node_as_json['from_csv Leave on products'];
    var the_fcream = the_node_as_json['from_csv Fragrancing cream'];
    var the_finef = the_node_as_json['from_csv Fine Fragrance'];
    var the_edt = the_node_as_json['from_csv Eau de Toilette'];
    var the_fcream = the_node_as_json['from_csv Fragrancing cream'];
    var the_rinseoff = the_node_as_json['from_csv Rinse off'];
    var the_otherleaveon = the_node_as_json['from_csv Other leave on'];
    var the_noskin = the_node_as_json['from_csv Non-skin, incidental skin contact'];
    


    var the_commentary = the_node_as_json['from_csv Commentaires']
    if (the_commentary) { // avoid applying .replace to undefined
         the_commentary = the_commentary.replace(/\n/g,"<br />");  //convert \n to <br /> = convert json end of line to html end of line
     };
    var the_type = the_node_as_json['from_csv Type'];
    var the_background_color = the_node_as_json['from_csv Couleur'];
    if (! (the_background_color)) {
        the_background_color = "#FFFFFF"
    };

    var is_an_ingredient = (the_node_as_json['ingredient'] == "yes");
    var is_an_naturelle = (the_node_as_json['from_csv Type'] == "Naturelle");
    var is_an_synthetique = (the_node_as_json['from_csv Type'] == "Synthétique");
    var is_an_descripteur = (the_node_as_json['from_csv Type'] == "Descripteur");
    
    var nonIFRA = (the_node_as_json['from_csv IFRA'] == "Ingrédient non réglementé");
    var IFRAQRA = (the_node_as_json['from_csv IFRA'] == "Restrictions QRA");
    var IFRAnonQRA = (the_node_as_json['from_csv IFRA'] == "Restrictions Non QRA");
    var IFRAnonQRAspe = ((the_node_as_json['from_csv IFRA'] == "Restrictions Non QRA") && (the_node_as_json['from_csv Fine Fragrance']));
    var IFRAspécification = (the_node_as_json['from_csv IFRA'] == "Spécifications");
    var displaytable1 = (false);
    var displaytable2 = (false);
    var displaytable3 = (false);
    var displaylogo = (false);
    var displayamendment = (false);
    var displaycommentaires = (false);
    var displayblockifra1 = (false); 
    var displayblocktable = (false);

    if (IFRAQRA) {
    	displaytable1 = true;
    	displayamendment = true;
    	displaycommentaires = true;
    	displaylogo = true;
    };
    if (IFRAnonQRA) {
    	displaytable2 = true;
    	displayamendment = true;
    	displaycommentaires = true;
    	displaylogo = true;
    };
    if (IFRAnonQRAspe) {
    	displaytable2 = false;
    	displaytable3 = true;
    	displayamendment = true;
    	displaycommentaires = true;
    	displaylogo = true;
    };
    if (IFRAspécification) {
    	displaycommentaires = true;
    	displaylogo = true;
    };
    if (nonIFRA) {
     	displayblockifra1 = true;
     	displayblocktable = true;
     };



    //EMPTY - partie naturelle
    $('#modalheader-type').empty();
    $('#modaltitle').empty();
    $('#modaltitle-fili').empty();
    $('#modalbody-remarques').empty();
    $('#modalbody-pict').empty();
    $('#modalbody-links').empty();
    $('#modalbody-price').empty();
    $('#modalbody-nbota').empty();
    $('#modalbody-bota').empty();
    $('#modalbody-origine').empty();
    $('#modalbody-aspect').empty();
    $('#modalbody-methode').empty();
    $('#modalbody-cas').empty();
    $('#modalbody-tenue').empty();
    $('#modalbody-autresd').empty();
    $('#modalbody-ifra').empty();
    $('#modalbody-allergenes').empty();
    $('#modalbody-componat').empty();
    $('#modalbody-pemblem').empty();
    $('#modalbody-parole').empty();
    $('#modalbody-chemotype').empty();
    $('#modalbody-medecine').empty();
    $('#modalbody-stab').empty();
    $('#modalbody-utilisation').empty();
      
    //EMPTY - partie synthétique
    $('#modalheader-type1').empty();
    $('#modaltitle1').empty();
    $('#modaltitle1-fili').empty();
    $('#modalbody-pict1').empty();
    $('#modalbody-remarques1').empty();
    $('#modalbody-densite1').empty();
    $('#modalbody-price1').empty();
    $('#modalbody-ncas1').empty();
    $('#modalbody-aspect1').empty();
    $('#modalbody-autresd1').empty();
    $('#modalbody-ifra1').empty();
    $('#modalbody-allergenes1').empty();
    $('#modalbody-fp1').empty();
    $('#modalbody-logp').empty();
    $('#modalbody-tenue1').empty();
    $('#modalbody-bp1').empty();
    $('#modalbody-decouverte1').empty();
    $('#modalbody-synthèse').empty();
    $('#modalbody-précurseur').empty();
    $('#modalbody-isomérie').empty();
    $('#modalbody-présencenat').empty();
    $('#modalbody-parole1').empty();
    $('#modalbody-utilisation1').empty();
    $('#modalbody-mmolaire1').empty();
    $('#modalbody-fbrute1').empty();

    //EMPTY - Descripteurs
    $('#modalheader-type2').empty();
    $('#modaltitle2').empty();
    $('#modalbody-comment2').empty();
   
    //EMPTY - IFRA 
    //nat
    $('#modalbody-amendment').empty();
    $('#modalbody-cat1').empty();
    $('#modalbody-cat2').empty();
    $('#modalbody-cat3').empty();
    $('#modalbody-cat4').empty();
    $('#modalbody-cat5').empty();
    $('#modalbody-cat6').empty();
    $('#modalbody-cat7').empty();
    $('#modalbody-cat8').empty();
    $('#modalbody-cat9').empty();
    $('#modalbody-cat10').empty();
    $('#modalbody-cat11').empty();
    $('#modalbody-commentifra').empty();
    $('#modalbody-leaveon').empty();
    //synth
    $('#modalbody-amendments').empty();
    $('#modalbody-cat1s').empty();
    $('#modalbody-cat2s').empty();
    $('#modalbody-cat3s').empty();
    $('#modalbody-cat4s').empty();
    $('#modalbody-cat5s').empty();
    $('#modalbody-cat6s').empty();
    $('#modalbody-cat7s').empty();
    $('#modalbody-cat8s').empty();
    $('#modalbody-cat9s').empty();
    $('#modalbody-cat10s').empty();
    $('#modalbody-cat11s').empty();
    $('#modalbody-commentifras').empty();
    $('#modalbody-leaveons').empty();
    $('#modalbody-finef').empty();
    $('#modalbody-edt').empty();
    $('#modalbody-fcream').empty();
    $('#modalbody-otherleaveon').empty();
    $('#modalbody-rinseoff').empty();
    $('#modalbody-noskin').empty();

    //APPEND - Partie Naturelles
    $('#modalheader-type').append(the_type);
    $('#modaltitle').append(the_title); 
    $('#modaltitle-fili').append(the_filiation);
    $('#modalbody-nbota').append(the_nbota); 
    $('#modalbody-bota').append(the_bota);
    $('#modalbody-allergenes').append(the_allergenes);
    $('#modalbody-autresd').append(the_autresd);
    $('#modalbody-tenue').append(the_tenue);
    $('#modalbody-cas').append(the_cas);
    $('#modalbody-origine').append(the_origine);
    $('#modalbody-aspect').append(the_aspect);
    $('#modalbody-methode').append(the_methode);
    $('#modalbody-remarques').append(the_remarques);
    $('#modalbody-ifra').append(the_ifra);
    $('#modalbody-price').append(the_price);
    $('#modalbody-componat').append(the_componat);
    $('#modalbody-pemblem').append(the_pemblem);
    $('#modalbody-parole').append(the_parole);
    $('#modalbody-chemotype').append(the_chemotype);
    $('#modalbody-medecine').append(the_medecine);
    $('#modalbody-stab').append(the_stab);
    $('#modalbody-utilisation').append(the_utilisation);
    //APPEND - Partie Synthétique
    $('#modalheader-type1').append(the_type);
    $('#modaltitle1').append(the_title);
    $('#modaltitle1-fili').append(the_filiation); 
    $('#modalbody-allergenes1').append(the_allergenes);
    $('#modalbody-autresd1').append(the_autresd);
    $('#modalbody-tenue1').append(the_tenue);
    $('#modalbody-ncas1').append(the_cas);
    $('#modalbody-densite1').append(the_densite);
    $('#modalbody-logp').append(the_logp);
    $('#modalbody-aspect1').append(the_aspect);
    $('#modalbody-fp1').append(the_fp);
    $('#modalbody-remarques1').append(the_remarques);
    $('#modalbody-ifra1').append(the_ifra);
    $('#modalbody-price1').append(the_price);
    $('#modalbody-bp1').append(the_bp);
    $('#modalbody-decouverte1').append(the_decouverte);
    $('#modalbody-synthèse').append(the_synthese);
    $('#modalbody-précurseur').append(the_precurseur);
    $('#modalbody-isomérie').append(the_isomerie);
    $('#modalbody-présencenat').append(the_presencenat);
    $('#modalbody-parole1').append(the_parole);
    $('#modalbody-utilisation1').append(the_utilisation);
    $('#modalbody-mmolaire1').append(the_molaire);
    $('#modalbody-fbrute1').append(the_fbrute);
    
    //APPEND - Partie Descripteurs
    $('#modaltitle2').append(the_title);
    $('#modalheader-type2').append(the_type);
    $('#modalbody-comment2').append(the_use);

    //APPEND - IFRA nat
    $('#modalbody-amendment').append(the_amendment);
    $('#modalbody-cat1').append(the_cat1);
    $('#modalbody-cat2').append(the_cat2);
    $('#modalbody-cat3').append(the_cat3);
    $('#modalbody-cat4').append(the_cat4);
    $('#modalbody-cat5').append(the_cat5);
    $('#modalbody-cat6').append(the_cat6);
    $('#modalbody-cat7').append(the_cat7);
    $('#modalbody-cat8').append(the_cat8);
    $('#modalbody-cat9').append(the_cat9);
    $('#modalbody-cat10').append(the_cat10);
    $('#modalbody-cat11').append(the_cat11);
    $('#modalbody-commentifra').append(the_commentifra);
    $('#modalbody-leaveon').append(the_leaveon);
    //APPEND - IFRA synth
    $('#modalbody-amendments').append(the_amendment);
    $('#modalbody-cat1s').append(the_cat1);
    $('#modalbody-cat2s').append(the_cat2);
    $('#modalbody-cat3s').append(the_cat3);
    $('#modalbody-cat4s').append(the_cat4);
    $('#modalbody-cat5s').append(the_cat5);
    $('#modalbody-cat6s').append(the_cat6);
    $('#modalbody-cat7s').append(the_cat7);
    $('#modalbody-cat8s').append(the_cat8);
    $('#modalbody-cat9s').append(the_cat9);
    $('#modalbody-cat10s').append(the_cat10);
    $('#modalbody-cat11s').append(the_cat11);
    $('#modalbody-commentifras').append(the_commentifra);
    $('#modalbody-leaveons').append(the_leaveon);
    $('#modalbody-finef').append(the_finef);
    $('#modalbody-edt').append(the_edt);
    $('#modalbody-fcream').append(the_fcream);
    $('#modalbody-otherleaveon').append(the_otherleaveon);
    $('#modalbody-rinseoff').append(the_rinseoff);
    $('#modalbody-noskin').append(the_noskin);

    //Apparition des images pour les Naturelles et les Synthétiques
    if (is_an_ingredient) {
    $('#modalbody-pict').empty();
    $('#modalbody-pictA').empty();
    $('#modalbody-pict1').empty();
    $('#modalbody-pict1A').empty();
	$('#modalbody-pict').append("<img class='imgmp' src='../img/matieres_premieres/" + the_title + ".jpg' alt='' />");
    $('#modalbody-pictA').append("<img class='imgmp' src='../img/matieres_premieres/" + the_title + ".jpg' alt='' />");
    $('#modalbody-pict1').append("<img class='imgmp' src='../img/matieres_premieres/" + the_title + ".PNG' alt='' />");
    $('#modalbody-pict1A').append("<img class='imgmp' src='../img/matieres_premieres/" + the_title + ".PNG' alt='' />");
    };  
    
    if (is_an_naturelle) {
        $('#naturelleModal .modal-header').css('background-color', the_background_color);   
        if (show_the_modal) $('#naturelleModal').modal('show');
    };
    if (is_an_synthetique) {
        $('#SynthetiqueModal .modal-header').css('background-color', the_background_color);
        if (show_the_modal) $('#SynthetiqueModal').modal('show');
    };
    if (is_an_descripteur) {
        $('#DescripteurModal .modal-header').css('background-color', the_background_color);
        if (show_the_modal) $('#DescripteurModal').modal('show');
    };
    

   $('title').html('ScenTree - ' + the_title);

   if (displaytable1) {
   		$(".table1").css('display', 'inline-table');
   		$(".table1").show();
   };
   if (displaytable2) {
	   $(".table2").css('display', 'inline-table');
   	    $(".table2").show();
   };
   if (displaytable3) {
	   $(".table3").css('display', 'inline-table');
   	    $(".table3").show();
   };
   if (displayamendment) {
   	   $(".amendment").css('display', 'block');
	   $(".amendment").show();
   };
   if (displaycommentaires) {
   	    $(".commentaires").css('display', 'block');
	    $(".commentaires").show();
   };
    if (displayblocktable) {
    		$(".blocktable").css('display', 'block');
    }
    if (displayblockifra1 ) {
    		$(".blockifra1").css('display', 'block');
    }

};

$("#SynthetiqueModal").on("hide.bs.modal", function (e) {
	$(".table1").hide();
	$(".table2").hide();
	$(".table3").hide();
	$(".logoifra").hide();
	$(".amendment").hide();
	$(".commentaires").hide();
	$('title').html("ScenTree - Classification innovante des ingrédients parfum");
        var the_map_center = map.getCenter();
        var rounded_latitude = Math.round(the_map_center.lat * 100000) / 100000;
        var rounded_longitude = Math.round(the_map_center.lng * 100000) / 100000;
        var the_map_zoom = map.getZoom();
        Cookies.set('the_previous_map__zoom', the_map_zoom, { expires: in30Minutes });
        Cookies.set('the_previous_map__latitude', rounded_latitude, { expires: in30Minutes });
        Cookies.set('the_previous_map__longitude', rounded_longitude, { expires: in30Minutes });
        window.location.href = "../_/index.html";
});
$("#naturelleModal").on("hide.bs.modal", function (e) {
	$(".table1").hide();
	$(".table2").hide();
	$(".table3").hide();
	$(".logoifra").hide();
	$(".amendment").hide();
	$(".commentaires").hide();
	$('title').html("ScenTree - Classification innovante des ingrédients parfum");
        var the_map_center = map.getCenter();
        var rounded_latitude = Math.round(the_map_center.lat * 100000) / 100000;
        var rounded_longitude = Math.round(the_map_center.lng * 100000) / 100000;
        var the_map_zoom = map.getZoom();
        Cookies.set('the_previous_map__zoom', the_map_zoom, { expires: in30Minutes });
        Cookies.set('the_previous_map__latitude', rounded_latitude, { expires: in30Minutes });
        Cookies.set('the_previous_map__longitude', rounded_longitude, { expires: in30Minutes });
	window.location.href = "../_/index.html";
});
$('#DescripteurModal').on("hidden.bs.modal", function (e) {
        $('title').html("ScenTree - Classification innovante des ingrédients parfum");
});

/*suppression du copier-coller*/
function addLink() {
    var body_element = document.getElementsByTagName('body')[0];
    var selection;
    selection = window.getSelection();
    var pagelink = " ";
    var selectiontxt = selection.toString();
    var copytext = selectiontxt.substring(0,0)+pagelink;
    var newdiv = document.createElement('div');
    newdiv.style.position='absolute';
    newdiv.style.left='-99999px';
    body_element.appendChild(newdiv);
    newdiv.innerHTML = copytext;
    selection.selectAllChildren(newdiv);
    window.setTimeout(function() {
        body_element.removeChild(newdiv);
    },0);
}
document.oncopy = addLink;
