var KIND_OF_ENVIRONMENT = "dev2"; // "dev", "prod" or "prod2"
  
if (KIND_OF_ENVIRONMENT == "dev") {
    var DEV_ENVIRONMENT = true; // if set to true, do not link to ingredient html webpages
    var DEV_PREFIX_1 = "dev-"; // dev- ,  pre_prod- ,  or empty for production
    var DEV_PREFIX_2 = "dev_"; // dev_ ,  pre_prod__ ,   or empty for production
} else if (KIND_OF_ENVIRONMENT == "prod2") {
    var DEV_ENVIRONMENT = false;
    var DEV_PREFIX_1 = "prod2-";
    var DEV_PREFIX_2 = "prod2_";
} else if (KIND_OF_ENVIRONMENT == "prod") {
    var DEV_ENVIRONMENT = false;
    var DEV_PREFIX_1 = "";
    var DEV_PREFIX_2 = "";
} else {
    var DEV_ENVIRONMENT = true; // if set to true, do not link to ingredient html webpages
    var DEV_PREFIX_1 = ""; // dev- ,  pre_prod- ,  or empty for production
    var DEV_PREFIX_2 = ""; // dev_ ,  pre_prod__ ,   or empty for production
};

var UPDATED_ON = {"they support us" : "20200315", "the news" : "20200315", "the survey" : "20200315"};

var in30Minutes = 1/96; // in 15 minutes
var forAFewSeconds = 3500;
var LANGUAGE_PREFIX_FOR_URLs = "en";

automatically_display_the_correct_language();

// cookies part, with "js-cookie" (https://github.com/js-cookie/js-cookie)
var RGPD_warning_has_been_done = Cookies.get('RGPD_warning'); // RGPD_warning unset means this is the first visit
var RGPD_choice_has_been_done = Cookies.get('RGPD_no_cookie');
if (! window.document.jsdom_reader) {
  if (! RGPD_warning_has_been_done) {
      Cookies.set('RGPD_warning', '1', { expires: 365 });
      $("#RGPD_warning").css({'display' : 'block'});
      //$("#modal_video").modal("show");
      $("#you_can_zoom").css({'display' : 'block'});
  } else {
      if ((! RGPD_choice_has_been_done) || ((RGPD_choice_has_been_done != 1) && (RGPD_choice_has_been_done != -1))) {
          $("#RGPD_warning").css({'display' : 'block'});
          //$("#you_can_zoom").css({'display' : 'block'});
      } else {
          $("#RGPD_warning").css({'display' : 'None'});
          $("#you_can_zoom").css({'display' : 'None'});
      };
  };
};

var show_the_notifications_for_they_support_us = false;
var last_update_of_the_support_us_from_the_cookie = Cookies.get('Updated_on__they_support_us');
if (! window.document.jsdom_reader) {
  if (! last_update_of_the_support_us_from_the_cookie) {
    show_the_notifications_for_they_support_us = true;
  } else {
    if (parseInt(last_update_of_the_support_us_from_the_cookie, 10) < parseInt(UPDATED_ON["they support us"], 10)) {
      show_the_notifications_for_they_support_us = true;
    };
  };
};

var show_the_notifications_for_the_news = false;
var last_update_of_the_news_from_the_cookie = Cookies.get('Updated_on__the_news');
if (! window.document.jsdom_reader) {
        if (! last_update_of_the_news_from_the_cookie) {
                show_the_notifications_for_the_news = true;
        } else {
                if (parseInt(last_update_of_the_news_from_the_cookie, 10) < parseInt(UPDATED_ON["the news"], 10)) {
                        show_the_notifications_for_the_news = true;
                };
        };
};

var show_the_notifications_for_the_survey = false;
var last_update_of_the_survey_from_the_cookie = Cookies.get('Updated_on__the_survey');
if (! window.document.jsdom_reader) {
        if (! last_update_of_the_survey_from_the_cookie) {
                show_the_notifications_for_the_survey = true;
        } else {
                if (parseInt(last_update_of_the_survey_from_the_cookie, 10) < parseInt(UPDATED_ON["the survey"], 10)) {
                        show_the_notifications_for_the_survey = true;
                };
        };
};

$(".they_support_us__link").click(function(){
  Cookies.set('Updated_on__they_support_us', UPDATED_ON["they support us"], { expires: 365 });
  $(".notifi1").css({'display' : 'none'});
});
$(".the_news__link").click(function(){
  Cookies.set('Updated_on__the_news', UPDATED_ON["the news"], { expires: 365 });
  $(".notifi2").css({'display' : 'none'});
});
$(".survey_link").click(function(){
  Cookies.set('Updated_on__the_survey', UPDATED_ON["the survey"], { expires: 365 });
  $(".notifi4").css({'display' : 'none'});
});

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

if (show_the_notifications_for_they_support_us) {
  $(".notifi1").css({'display' : 'inline-block'});
} else {
        $(".notifi1").css({'display' : 'none'});
};
if (show_the_notifications_for_the_news) {
        $(".notifi2").css({'display' : 'inline-block'});
} else {
        $(".notifi2").css({'display' : 'none'});
};
if (show_the_notifications_for_the_survey) {
        $(".notifi4").css({'display' : 'inline-block'});
} else {
        $(".notifi4").css({'display' : 'none'});
};

if (show_the_notifications_for_they_support_us || show_the_notifications_for_the_news || show_the_notifications_for_the_survey) {
        $(".notifi3").css({'display' : 'inline-block'});
} else {
        $(".notifi3").css({'display' : 'none'});
};


function from_dd_mm_yyyy_as_string_to_yyyy_mm__dd_as_int(the_dd_mm_yyyy_as_string) {
    if (!the_dd_mm_yyyy_as_string) {
      the_dd_mm_yyyy_as_string = "";
    };
    var the_yyyy_mm__dd_as_string = the_dd_mm_yyyy_as_string.replace( new RegExp("(\\d+)/(\\d+)/(\\d+)", "gi"), "$3$2$1" );
    return parseInt(the_yyyy_mm__dd_as_string, 10);
};

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
      var EN_or_FR = LANGUAGE_PREFIX_FOR_URLs.toUpperCase();
      var sci_name = item.label["from_csv " + EN_or_FR + " Nom"];
      var autres_nom = item.label["from_csv " + EN_or_FR + " AutresNoms"];
      var botanique = item.label["from_csv " + EN_or_FR + " Botanique"];
      var n_cas = item.label["from_csv FR NCas"];
    
      var the_search_term = this.term;
      if (the_search_term) {
          var the_search_word_as_regexp = new RegExp("(^|\\s+)" + get_all_accents_in_a_regexp(this.term.toLowerCase()));
      };

      var newText = "<span class='nom_de_l_ingredient m-0 p-0' style='font-weight:600;'>" + String(sci_name).replace(
                new RegExp("(^|\\s|-)(" + get_all_accents_in_a_regexp(this.term) + ")", "gi"), // note the '-' added to the first part of the regexp
                "$1<span class='ui-state-highlight'>$2</span>") + "</span>";
      
      if (autres_nom) {
	  // center the display on the first matching synonym (search = 'la' -> Bacdanol + synonyms = landacanol among a lot of others)
	  // /!\ display the full synonym, example = 'to' -> 'sandal touch' (do not display only 'touch')
	  // -> sort the synonyms (synonyms as text -> synonyms as array -> sort the array with criteria : 'matches the searched term'  otherwise keep the original order)
	  var autres_nom = String(autres_nom);
          var the_synonyms_as_array = autres_nom.replaceAll(", ", " / ").replaceAll(" ; ", " / ").split(" / ");
	  console.log(the_synonyms_as_array);
          the_synonyms_as_array.sort(function(a, b) {
		  if (! the_search_term) { // do not sort
			  return 0;
		  };
		  var a_contains_the_search = the_search_word_as_regexp.test(a.toLowerCase());
		  var b_contains_the_search = the_search_word_as_regexp.test(b.toLowerCase());
	          if (a_contains_the_search != b_contains_the_search) {
	    	      if (a_contains_the_search) {
			  return -1;
		      } else {
			  return 1;
		      };
		  };
	  });
          
	  newText = newText
		      + "<br /><div class='synonymes m-0 p-0' style='white-space: nowrap; width: 100%; overflow: hidden; text-overflow: ellipsis;'>("
		      + the_synonyms_as_array.join(", ").replace(
                          new RegExp("(^|\\s)(" + get_all_accents_in_a_regexp(this.term) + ")", "gi"), 
                          "$1<span class='ui-state-highlight'>$2</span>"
		        )
		      + ")</div>";
      };
      if (botanique) {
          newText = newText + "<br /><span class='synonymes m-0 p-0'>(" + String(botanique).replace(
                    new RegExp("(^|\\s)(" + get_all_accents_in_a_regexp(this.term) + ")", "gi"), 
                    "$1<span class='ui-state-highlight'>$2</span>") + ")</span>";
      };
      if (n_cas) {
          newText = newText + "<div class='numero_cas m-0 p-0' >N° CAS : " + String(n_cas).replace(
                    new RegExp("(^|\\s)(" + get_all_accents_in_a_regexp(this.term) + ")", "gi"),  
                    "$1<span class='ui-state-highlight'>$2</span>") + "</div>";
      };
      return $( "<li style='line-height:1.8;'></li>" )
          .data( "item.autocomplete", item )
          .append( $( "<p class='m-0'></p>" )[ this.options.html ? "html" : "text" ]( newText ) )
          .appendTo( ul );
  }
});

})( jQuery );
/* end of jQuery UI Autocomplete HTML Extension */

/* Définissions de la map*/
if ($("#map").length > 0) {
    var map = L.map('map', {zoomControl: true, attributionControl: false});
};
/* Dire que la map est disponible dans le cache du serveur à l'adresse suivante */
var tolUrl_fr = '/' + DEV_PREFIX_1 + 'scentree-map-fr/{z}/{x}/{y}.png';
var tolUrl_en = '/' + DEV_PREFIX_1 + 'scentree-map-en/{z}/{x}/{y}.png';
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
var tol_fr = new L.TileLayer(tolUrl_fr, {minZoom: zoom_initial, maxZoom: 13});
var tol_en = new L.TileLayer(tolUrl_en, {minZoom: zoom_initial, maxZoom: 13});
// get the parameters of the previous map
var the_previous_map__zoom = Cookies.get('the_previous_map__zoom');
var the_previous_map__latitude = Cookies.get('the_previous_map__latitude');
var the_previous_map__longitude = Cookies.get('the_previous_map__longitude');

/* Définir la taille de la carte */
//map.addLayer(tol_fr);
//map.addLayer(tol_en);
if ($("#map").length > 0) {
  map.setView([the_previous_map__latitude || 2, the_previous_map__longitude || 0, ], the_previous_map__zoom || zoom_initial);
};
/* Définission de l'icone qui pointe les MP recherchées*/
var mark = L.icon({
    iconUrl: '../img/mark.png',
    iconSize:     [75, 25], // size of the icon
    iconAnchor:   [35, 13], // point of the icon which will correspond to marker's location
});


automatically_display_the_correct_language();


/////////////////////////////
/////CREATION DES POP-UP/////
/////////////////////////////

function is_an_ingredient(the_object) {
  return (the_object['ingredient'] == 'yes');
};
function is_a_main_descriptor(the_object) {
  return ((the_object["from_csv FR Type"] == "Descripteur") && (the_object["from_csv FR id"].length == 3));
};
function get_the_url_of_a_scentree_object(the_scentree_object) {
        var the_html_address_prefix = "../" + LANGUAGE_PREFIX_FOR_URLs + "-"; // +"en" or +"fr"
        if (is_an_ingredient(the_scentree_object)) {
                the_html_address_prefix = the_html_address_prefix + "ingredients/";
        } else if (is_a_main_descriptor(the_scentree_object)) {
    if (LANGUAGE_PREFIX_FOR_URLs == "fr") {
      the_html_address_prefix = the_html_address_prefix + "descripteurs_principaux/";
    } else {
                        the_html_address_prefix = the_html_address_prefix + "main_descriptors/";
    };
        } else { // this is a secondary descriptor
                if (LANGUAGE_PREFIX_FOR_URLs == "fr") {
                        the_html_address_prefix = the_html_address_prefix + "descripteurs_secondaires/";
                } else {
                        the_html_address_prefix = the_html_address_prefix + "secondary_descriptors/";
                };
        };
        return the_html_address_prefix + the_scentree_object['from_csv EN Nom'].replace( new RegExp("[\\s\/'\",]", "gi"), "_") + "__" + the_scentree_object['from_csv FR Nom'].replace( new RegExp("[\\s\/'\",]", "gi"), "_") + ".html";
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
    var URL2 = "/" + DEV_PREFIX_2 + "select_EN_and_FR/?q=*:*&fq=zoom:[0 TO " + z + "]&fq=lat:[" + lat1 + " TO " + lat2 + "]&fq=lon:[" + lon1 + " TO " + lon2 + "]&wt=json&rows=1000"; 
    // 
    $.ajax({
  //
  url : URL2,

  success : function(data) {
      var ok = data.response.docs;
      $.each(ok, function( index, value ) {
    var latlong = new L.LatLng(ok[index].lat[0], ok[index].lon[0]);
    //positionnement de l'icone pointeur, n'est pas utilisé en réalité. 
    var marker = L.marker(latlong,{icon: mark, alt: ok[index]['from_csv EN Nom'] + " - " + ok[index]['from_csv FR Nom']});
    // dev -> basic modal
    if (DEV_ENVIRONMENT) {
      marker.on("click", function() {
            markofun(ok[index]);
      });
    } else {  // else : link to a new html page
        marker.on("click", function() {
            save_map_status_inside_cookies(map);
      window.location.href = get_the_url_of_a_scentree_object(ok[index]);
        });
    };
    markers.addLayer(marker);
      });
  },
  dataType : 'jsonp',
  jsonp : 'json.wrf'
    });
    markers.addTo(map);
    markers.bringToFront();
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
    }
});
$(".my-search-bar").focus(function() {
    $(this).autocomplete('search', $(this).val())
});


//pop-up
if (map) {
  map.on("moveend", function() {
      CreatePopUps();
  });
};

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


// https://www.tutorialspoint.com/levenshtein-distance-in-javascript
const levenshteinDistance = (str1 = '', str2 = '') => {
   const track = Array(str2.length + 1).fill(null).map(() =>
   Array(str1.length + 1).fill(null));
   for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
   }
   for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
   }
   for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
         const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
         track[j][i] = Math.min(
            track[j][i - 1] + 1, // deletion
            track[j - 1][i] + 1, // insertion
            track[j - 1][i - 1] + indicator, // substitution
         );
      }
   }
   return track[str2.length][str1.length];
};

var DEBUG_SEARCH = true;
$(function() {
    var str;
    //définitions des URL de la requete de solr//
    //var URL_PREFIX_SUGGESTER = "/" + DEV_PREFIX_2 + "suggesthandler_EN/?suggest.dictionary=mySuggester&suggest.cfq=yes&suggest.q=";
    //var URL_PREFIX_SELECTER = "/select_EN/?q=id%3A";
    var URL_PREFIX_SELECTER_BOTH_LANGUAGES = "/" + DEV_PREFIX_2 + "select_EN_and_FR/?q=id%3A";
    var URL_SUFFIX = "&wt=json";
    var SEARCH_MAX = 100;

    $(".my-search-bar").autocomplete({
  source : function(request, response) {
      //envoi de la requête à searchinput, la classe HTML définie dans l'index.html
      let the_value_from_the_search_input = this.element.val();
      var URL_SUGGESTER = URL_PREFIX_SUGGESTER + the_value_from_the_search_input + URL_SUFFIX;
            console.log(URL_SUGGESTER);
      $.ajax({
    url : URL_SUGGESTER,
    
    success : function(data) {
	var the_search_word = the_value_from_the_search_input.toString();
        var step1 = data.suggest.mySuggester[the_search_word];
        if (! step1.suggestions) {
          return;
        };
	// we are looking for CAS number only if 'the_search_word' is digit + "-" only - at least two chars
        var the_cas_numbers_as_regexp = /^[0-9]+\-[0-9]+\-[0-9]+$/;
	var this_may_be_a_cas_number_as_regexp = /[0-9][0-9]/;
	var is_input_a_cas_number = the_search_word.match(this_may_be_a_cas_number_as_regexp);
        if (DEBUG_SEARCH) {
		console.log("is_input_a_cas_number = " + is_input_a_cas_number);
	};

        // the search word as a regexp
	var the_search_word_as_regexp_for_synonyms = new RegExp("(^|\\s+)" + get_all_accents_in_a_regexp(the_search_word.toLowerCase()));
        var the_search_word_as_regexp_for_sci_names = new RegExp("(^|\\s+|-)" + get_all_accents_in_a_regexp(the_search_word.toLowerCase()));
	if (DEBUG_SEARCH) {
            console.log("the_search_word_as_regexp = " + the_search_word_as_regexp);
        };
	
        var docs = JSON.stringify(step1.suggestions);
        var jsonData = JSON.parse(docs); // [{"term" : "benzo-alpha-pyrone, 2-oxo-1,2-benzopyran, 1-benzopyran-2-one", "payload":"scentree_id"}]
	// -> [{"term" : "benzo-alpha-pyrone"}, {"term" : "2-oxo-1,2-benzopyran"}, {"term" : "1-benzopyran-2-one"}]
	// also : "464-45-9 / 507-70-0" -> "464-45-9", "507-70-0"
	if (DEBUG_SEARCH) {
	    console.log("jsonData before splitting = ");
	    console.log(jsonData);
	};
	// filtering the results from the suggester : we only care about words that begin with the user input
	var the_new_jsonData = [];
	for (let an_index = 0; an_index < jsonData.length; an_index++) {
            var the_text = jsonData[an_index].term;
            var the_search_word_as_regexp;
            if (the_text.includes(", ") || the_text.includes(" ; ") || the_text.includes(" / ")) {
                the_search_word_as_regexp = the_search_word_as_regexp_for_synonyms;
	    } else {
		    the_search_word_as_regexp = the_search_word_as_regexp_for_sci_names;
	    };
            the_new_terms = the_text.replaceAll(", ", " / ").replaceAll(" ; ", " / ").split(" / ");
	    for (let a_sub_index = 0; a_sub_index < the_new_terms.length; a_sub_index++) {
		var is_a_text_with_input_at_the_beginning_of_a_word = ((! is_input_a_cas_number) && (the_search_word_as_regexp.test(the_new_terms[a_sub_index].toLowerCase()))); 
		//var is_a_text_with_input_inside = (the_new_terms[a_sub_index].toLowerCase().includes(the_search_word.toLowerCase()) && (! is_input_a_cas_number));
                var is_a_cas_number_with_input_inside = (is_input_a_cas_number && the_new_terms[a_sub_index].toLowerCase().startsWith(the_search_word.toLowerCase())
                       && the_new_terms[a_sub_index].toLowerCase().match(the_cas_numbers_as_regexp));
		/*if (DEBUG_SEARCH) {
			console.log("the_new_terms[a_sub_index].toLowerCase() = " + the_new_terms[a_sub_index].toLowerCase());
			console.log("the_search_word.toLowerCase() = " + the_search_word.toLowerCase());
			console.log("old condition = " + the_new_terms[a_sub_index].toLowerCase().includes(the_search_word.toLowerCase()));
			console.log("is_a_text_with_input_inside = " + is_a_text_with_input_inside);
			console.log("is_a_cas_number_with_input_inside = " + is_a_cas_number_with_input_inside);
		};*/
		if (is_a_text_with_input_at_the_beginning_of_a_word || is_a_cas_number_with_input_inside) { 
		    the_new_jsonData.push({
			"term" : the_new_terms[a_sub_index], 
			"payload" : jsonData[an_index].payload, 
			"levenshtein_distance" : levenshteinDistance(the_new_terms[a_sub_index].toLowerCase(), the_search_word.toLowerCase())
		    });
		};
	    };
	};
	/*jsonData.sort(function(a,b) {
      	    a1 = a.term[0].replace(/<b>/g,"").replace(/<\/b>/g,"");
            b1 = b.term[0].replace(/<b>/g,"").replace(/<\/b>/g,"");
            return(a1.length-b1.length);
        });*/
	jsonData = the_new_jsonData;
	jsonData.sort(function(a,b) {
		return a.levenshtein_distance - b.levenshtein_distance;
	}); // useful pre-sort, because the solr-selecter will return only the first 10 scentree objects
	if (DEBUG_SEARCH) {
	    console.log("the_search_word = " + the_search_word);
	    console.log(jsonData);
	};
	var jsonData = jsonData.slice(0, SEARCH_MAX);
	/*
	from
	 [ {term: "laventerre", payload: "160", levenshtein_distance: 7}
           {term: "Lavande HE", payload: "91", levenshtein_distance: 8}
           {term: "2-Octanone", payload: "160", levenshtein_distance: 9}
         ]
	to 
	  [ 160, 91 ] (removal of duplicated ids)
	*/
        var ids_as_an_array = [];
        for (let an_index = 0; an_index < jsonData.length; an_index++) {
	    var the_current_id = jsonData[an_index].payload;
	    if (! ids_as_an_array.includes(the_current_id)) {
                ids_as_an_array.push(the_current_id);
	    };
	}; 
       /*
        var ids_as_an_array = [];
        $.map(jsonData, function(value, key) {
      object_id = value.payload;
      ids_as_an_array.push(object_id);
        });*/
        
        if (! ids_as_an_array.length) { // no id no ajax request (otherwise : error in the javascript script)
            response();
            return;
        };
        
        ids_as_a_string = ids_as_an_array.join("%20");
        var URL_SELECTER = URL_PREFIX_SELECTER_BOTH_LANGUAGES + "(" + ids_as_a_string + ")" + "&rows=" + SEARCH_MAX + URL_SUFFIX;
        console.log(URL_SELECTER);
	
	var EN_or_FR = LANGUAGE_PREFIX_FOR_URLs.toUpperCase();
        
        $.ajax({
      url : URL_SELECTER,
      
      success : function(data_from_selecter) {
          var the_infos_from_the_selecter = data_from_selecter.response.docs;
	  var the_infos_from_the_selecter__by_id = {};
	  for (var a_counter = 0; a_counter < the_infos_from_the_selecter.length; a_counter++) {
              var the_current_element = the_infos_from_the_selecter[a_counter];
	      the_infos_from_the_selecter__by_id[the_current_element.id] = the_current_element;
	  };
	  if (DEBUG_SEARCH) {
              console.log("the_infos_from_the_selecter (inside SELECT+success) = ");
              console.log(the_infos_from_the_selecter);
	      console.log("the_infos_from_the_selecter__by_id (inside SELECT+success) = ");
	      console.log(the_infos_from_the_selecter__by_id);
	  };
          for (var a_counter = 0; a_counter < jsonData.length; a_counter++) {
              var the_current_element = jsonData[a_counter];
              var the_current_id = the_current_element.payload;
              var the_scentree_object = the_infos_from_the_selecter__by_id[the_current_id];
              if (! the_scentree_object) {
		      continue;
	      };
	      var is_the_main_name = (the_current_element.term == the_scentree_object["from_csv " + EN_or_FR + " Nom"]);
	      var is_PRO = (the_scentree_object["PRO"] != undefined);
	      var popularity = parseInt(the_scentree_object["from_csv " + EN_or_FR + " Audience"], 10);
	      if (popularity == NaN) {
		      popularity = 0;
	      };
	      var is_natural = (the_scentree_object["from_csv FR Type"] == "Naturelle");
 
 	      the_current_element["is_the_main_name"] = is_the_main_name;
	      the_current_element["is_PRO"] = is_PRO;
	      the_current_element["popularity"] = popularity;
	      the_current_element["is_natural"] = is_natural;
	  };
	  if (DEBUG_SEARCH) {
	      console.log("jsonData (inside SELECT+success) = ");
	      console.log(jsonData);
	  };
          jsonData.sort(function(a, b) {
		  /*if (a.levenshtein_distance != b.levenshtein_distance) {
			  return a.levenshtein_distance - b.levenshtein_distance;
		  };*/
		  if (a.is_the_main_name != b.is_the_main_name) {
			  if (a.is_the_main_name) {
				  return -1; // is_the_main_name == True -> first in the list
			  } else {
				  return 1;
			  };
		  };
		  if (a.is_PRO != b.is_PRO) {
			  if (a.is_PRO) {
				  return -1;
			  } else {
				  return 1;
			  };
		  };
		  if (a.popularity != b.popularity) {
			  return b.popularity - a.popularity;
		  };
		  /*
		  if (a.is_natural) {
			  return -1;
		  } else {
			  return 1;
		  };*/
		  if (a.is_natural != b.is_natural) {
		      if (a.is_natural) {
                          return -1;
                      } else {
                          return 1;
                      };
		  };
                  if (a.levenshtein_distance != b.levenshtein_distance) {
                          return a.levenshtein_distance - b.levenshtein_distance;
                  };

	  });
          if (DEBUG_SEARCH) {
              console.log("jsonData (after .sort) = ");
              console.log(jsonData);
	  };
	  // sorted jsonData -> sorted the_infos_from_the_selecter
	  var the_infos_from_the_selecter__ordered = [];
	  var the_ids_already_seen = [];
          for (var a_counter = 0; a_counter < jsonData.length; a_counter++) {
               var the_current_id = jsonData[a_counter].payload;
	       if (! the_ids_already_seen.includes(the_current_id)) {
		   if (the_infos_from_the_selecter__by_id[the_current_id]) {
	               the_infos_from_the_selecter__ordered.push(the_infos_from_the_selecter__by_id[the_current_id]);
		   };
	       };
	       the_ids_already_seen.push(the_current_id);
	  };
	  response($.map(the_infos_from_the_selecter__ordered, function(value, key) {
	      var EN_or_FR = LANGUAGE_PREFIX_FOR_URLs.toUpperCase();
              var sci_name = value["from_csv " + EN_or_FR + " Nom"];
              var NCas = value["from_csv FR NCas"];
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
      var URL = URL_PREFIX_SELECTER_BOTH_LANGUAGES + "\"" + ui.item.label.id + "\"" + URL_SUFFIX;
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
        
        var ok = jsonData;
  var index = 0; 
        SPfocus = L.marker(jsonData[0].coordinates, {icon: pin1}).addTo(searchMarker);
          if (DEV_ENVIRONMENT) {
          SPfocus.on("click", function() {
              markofun(jsonData[0]);
          });
          } else {  // else : link to a new html page
              SPfocus.on("click", function() {
                  save_map_status_inside_cookies(map);
                window.location.href = get_the_url_of_a_scentree_object(ok[index]);
          });
        };
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

function from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, the_key_as_text) {
     return "<span lang='en'>" + the_node_as_json_EN_and_FR['from_csv EN ' + the_key_as_text] + "</span><span lang='fr'>" + the_node_as_json_EN_and_FR['from_csv FR ' + the_key_as_text] + "</span>";
};

function fill_with_percentage(the_html_class_as_text, the_percentage) {
  $(the_html_class_as_text).empty();
  if (! the_percentage) {
    return;
  };
  if (the_percentage.toLowerCase().indexOf("restr") >= 0) {
          $(the_html_class_as_text).append($("<span></span>").attr("lang", "en").text("Not restricted"));
                $(the_html_class_as_text).append($("<span></span>").attr("lang", "fr").text("Non restreint"));
  } else if (the_percentage.toLowerCase() == "x") {
    $(the_html_class_as_text).text(the_percentage);
  } else {
                $(the_html_class_as_text).text(the_percentage + " %");
        };
};

function get_the_pro_img_from_the_pro_info(the_pro_info) {
     var the_html_div = $("<a></a>")
  .addClass("d-block m-2 with-relative-position")
  .attr("href", "../supporters/" + the_pro_info["Nom Tiers"] + ".html");
     var the_main_html_img_in_french = $("<img />");
     the_main_html_img_in_french.attr("src", "/img/sponsors/" + the_pro_info["Nom Tiers"] + ".png")
  .addClass("img-fluid boutonclickable logostandards")
  .attr("title", "En savoir plus sur " + the_pro_info["Nom Tiers"])
  .attr("alt", "En savoir plus sur " + the_pro_info["Nom Tiers"])
  .attr("lang", "fr");
     var the_main_html_img_in_english = $("<img />");
     the_main_html_img_in_english.attr("src", "/img/sponsors/" + the_pro_info["Nom Tiers"] + ".png")
        .addClass("img-fluid boutonclickable logostandards")
        .attr("title", "Learn more about " + the_pro_info["Nom Tiers"])
        .attr("alt", "Learn more about " + the_pro_info["Nom Tiers"])
        .attr("lang", "en");

    //if (the_pro_info["MOQ"]) {
    //var the_moq_value_as_float = Number(the_pro_info["MOQ"].slice(0, -3).replace(",", ".")); // moq must be ending with ' kg'
          //var the_moq_color = "moq-default-color";
    //if (the_moq_value_as_float) {
      //if (the_moq_value_as_float <= 0.5) {
        //the_moq_color = "moq-0_5-color";
      //} else if (the_moq_value_as_float == 1.0) {
        //the_moq_color = "moq-1-color";
      //} else if (the_moq_value_as_float == 5.0) {
        //the_moq_color = "moq-5-color";
      //} else if (the_moq_value_as_float >= 10.0) {
        //the_moq_color = "moq-10-color";
      //};
    //};
    //var the_moq_circle = $("<span></span>")
      //.addClass("fas fa-circle moq-circle " + the_moq_color)
      //.attr("title", "MOQ= " + the_pro_info["MOQ"]);
      //the_html_div.append(the_moq_circle);
    //};

    the_html_div.append(the_main_html_img_in_french);
    the_html_div.append(the_main_html_img_in_english);
    return the_html_div;
};

function show_the_carousel(the_length) {
    setTimeout(() => {
    if (the_length > 0) {
    if (the_length <= 6)  {
            var the_autoplay = false;
            var the_swipeThreshold_option = false;
            var the_dragThreshold_otpion = false;
    } else {
            var the_autoplay = forAFewSeconds;
            var the_swipeThreshold_option = 80;
            var the_dragThreshold_otpion = 120;
    };
    var myCarousel = new Glide( '.glide', {
            gap: 0,
            type: "carousel",
            startAt: 0,
            perView: Math.min(6, the_length),
            autoplay: the_autoplay,
            keyboard: false,
            swipeThreshold: the_swipeThreshold_option,
            dragThreshold: the_dragThreshold_otpion
    } );
    myCarousel.mount();
    automatically_display_the_correct_language();
   };
   }, 1000);
   // about the timeout hack : 
   // https://github.com/glidejs/glide/issues/341
   // https://github.com/glidejs/glide/issues/203

};

function markofun(the_node_as_json_EN_and_FR, show_the_modal = true) {
    //convert \n to <br /> = convert 'json end of line' to 'html end of line'
    //var the_node_as_json_2 = {};
    //$.each(the_node_as_json, function(the_key, the_value) {
    //    if ((the_value) && (the_value.replace)) {
    //            the_node_as_json_2[the_key] = the_value.replace(/\n/g,"<br />");
    //    };
    //});
    // the_node_as_json = the_node_as_json_2;

    var is_an_ingredient = (the_node_as_json_EN_and_FR['ingredient'] == "yes");
    var is_an_naturelle = (the_node_as_json_EN_and_FR['from_csv FR Type'] == "Naturelle");
    var is_an_synthetique = (the_node_as_json_EN_and_FR['from_csv FR Type'] == "Synthétique");
    var is_an_descripteur = (the_node_as_json_EN_and_FR['from_csv FR Type'] == "Descripteur");


    //communs
    var the_use = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Utilisation');
    var the_use_FR = the_node_as_json_EN_and_FR['from_csv FR Utilisation'];
    var the_use_EN = the_node_as_json_EN_and_FR['from_csv EN Utilisation'];
    var the_type = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Type');
    var the_title = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Nom');
    var the_img_title = the_node_as_json_EN_and_FR['from_csv FR Nom'];

    var the_webpage_title_FR = the_node_as_json_EN_and_FR['from_csv FR Nom'] + " (N°Cas : " + the_node_as_json_EN_and_FR['from_csv FR NCas'] + ")";
    var the_webpage_title_EN = the_node_as_json_EN_and_FR['from_csv EN Nom'] + " (N°Cas : " + the_node_as_json_EN_and_FR['from_csv EN NCas'] + ")";
    var the_webpage_title_descripteur_FR = the_node_as_json_EN_and_FR['from_csv FR Nom'];
    var the_webpage_title_descripteur_EN = the_node_as_json_EN_and_FR['from_csv EN Nom'];
    
    var the_webpage_description_FR = "Le " + the_node_as_json_EN_and_FR['from_csv FR Nom'] + " (N°Cas : " + the_node_as_json_EN_and_FR['from_csv EN NCas'] + ") est un ingrédient utilisé dans les parfums. De son utilisation à son odeur en passant par sa réglementation, venez en découvrir tous les secrets avec ScenTree !";
    var the_webpage_description_EN = "The " + the_node_as_json_EN_and_FR['from_csv EN Nom'] + " (Cas number : " + the_node_as_json_EN_and_FR['from_csv EN NCas'] + ") is an ingredient used in perfumes. Discover all about its exploitation, its smell, and its regulation with ScenTree !";
    var the_aspect = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Aspect');
    var the_allergenes = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Allergenes');
    var the_tenue = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Tenue');
    var the_ifra = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'IFRA');
    var the_autresd = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Autres_Descripteurs');
    var the_price = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Prix');
    var the_filiation = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Filiation');
    var the_remarques = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'autresremarques');
    var the_parole = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'paroledeparfumeur');
    var the_stab = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Stabilite');
    var the_utilisation = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Utilisation');
    var the_cas = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'NCas');
    var the_EINECS = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'EINECS');
    var the_FEMA = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'FEMA');
    var the_JECFA = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'JECFA');
    var the_FLAVIS = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'FLAVIS');
    //Naturelles
    var the_nbota = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Botanique');
    var the_bota = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Nom Botanique');
    var the_methode = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Extractions');
    var the_origine = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Origine geographique');
    var the_componat = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'composantsmajoritaires');
    if (the_componat) { // avoid applying .replace to undefined
         the_componat = the_componat.replace(/\n/g,"<br />");  //convert \n to <br /> = convert json end of line to html end of line
     };
    var the_pemblem = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'parfumemblematiques');
    var the_chemotype = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'chemotype');
    if (the_chemotype) { // avoid applying .replace to undefined
         the_chemotype = the_chemotype.replace(/\n/g,"<br />");  //convert \n to <br /> = convert json end of line to html end of line
     };
    var the_medecine = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'medecine');
    //Synthétiques
    var the_densite = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Densite');
    var the_logp = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'LogP');
    var the_fp = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'FlashPoint');
    var the_bp = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'BoilingPoint');
    var the_decouverte = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Decouverte');
    var the_synthese = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Synthese');
    var the_precurseur = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Precurseurs');
    var the_isomerie = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Isomerie');
    var the_presencenat = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Presencenat');
    var the_molaire = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'mmolaire');
    var the_fusionp = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'PFusion');
    var the_fbrute = put_all_digits_into_sub(from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'formulebrute'));
    var the_synonyme = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'AutresNoms');
    var the_detection = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Threshold');


    var the_commentary = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Commentaires');
    if (the_commentary) { // avoid applying .replace to undefined
         the_commentary = the_commentary.replace(/\n/g,"<br />");  //convert \n to <br /> = convert json end of line to html end of line
     };

    var the_background_color = the_node_as_json_EN_and_FR['from_csv FR Couleur'];
    if (! (the_background_color)) {
        the_background_color = "#FFFFFF"
    };

    // IFRA
    $(".to-be-emptied").empty();
    show_the_main_48th_IFRA_table = false;
    show_the_main_49th_IFRA_table = false;
    show_the_skin_IFRA_table = false;
    show_the_listy_48th_IFRA_table_without_botanicals = false;
    show_the_listy_49th_IFRA_table_without_botanicals = false;
    show_the_listy_48th_IFRA_table_with_botanicals = false;
    show_the_listy_49th_IFRA_table_with_botanicals = false;
    show_nothing = true;

    show_the_48th_restriction_type = false;
    show_the_48th_amendment_number = false;
    show_the_48th_comments = false;
    show_the_49th_restriction_type = false;
    show_the_49th_amendment_number = false;
    show_the_49th_comments = false;

    the_ifra_infos = the_node_as_json_EN_and_FR['IFRA'];
    console.log("the_ifra_infos = " + the_ifra_infos);
    if (the_ifra_infos) {
    for (let an_infra_info of the_ifra_infos) {
        var the_ifra_info = JSON.parse(an_infra_info);
        console.log("IFRA - " + an_infra_info);

        if (the_ifra_info["Leave On Products"]
                || the_ifra_info["Rinse Off Products"]
                || the_ifra_info["Non-Skin contact products"]
        ) {
                fill_with_percentage(".modalbody-leave-on", the_ifra_info["Leave On Products"]);
                fill_with_percentage(".modalbody-rinse-off", the_ifra_info["Rinse Off Products"]);
                fill_with_percentage(".modalbody-non-skin-contact", the_ifra_info["Non-Skin contact products"]);
    show_the_skin_IFRA_table = true;
  };

  if (the_ifra_info["Level (%)"] && is_an_naturelle) {
                if (the_ifra_info["version"].indexOf("48") >= 0) {
                        the_current_row = $(".ingredients-containing-without-botanicals-48").append($("<tr></tr>"));
                        the_current_row.append($("<td></td>").text(the_ifra_info["Principle Name"]));
                        the_current_row.append($("<td></td>").text(the_ifra_info["CAS No"]).addClass("IFRA-number"));
                        the_current_row.append($("<td></td>").text(the_ifra_info["Level (%)"]));
      show_the_listy_48th_IFRA_table_without_botanicals = true;
    } else if (the_ifra_info["version"].indexOf("49") >= 0) {
                        the_current_row = $(".ingredients-containing-without-botanicals-49").append($("<tr></tr>"));
                        the_current_row.append($("<td></td>").text(the_ifra_info["Principle Name"]));
                        the_current_row.append($("<td></td>").text(the_ifra_info["CAS No"]).addClass("IFRA-number"));
      the_current_row.append($("<td></td>").text(the_ifra_info["Level (%)"]));
      show_the_listy_49th_IFRA_table_without_botanicals = true;
    };  
  };
  
  if (the_ifra_info["Level (%)"] && (! is_an_naturelle)) {
    if (the_ifra_info["version"].indexOf("48") >= 0) {
      the_current_row = $(".ingredients-containing-with-botanicals-48").append($("<tr></tr>"));
      the_current_row.append($("<td></td>").text(the_ifra_info["Principle Name2"]));
                        the_current_row.append($("<td></td>").text(the_ifra_info["Botanical Binomial name"]));
                        if (the_ifra_info["Principle CAS RIFM "]) {
                                the_current_row.append($("<td></td>").text(the_ifra_info["Principle CAS RIFM "]).addClass("IFRA-number"));
                        } else {
                                the_current_row.append($("<td></td>").text(the_ifra_info["Principle CAS RIFM"]).addClass("IFRA-number"));
                        };
      the_current_row.append($("<td></td>").text(the_ifra_info["Level (%)"]));
      show_the_listy_48th_IFRA_table_with_botanicals = true;
    } else if (the_ifra_info["version"].indexOf("49") >= 0) {
                        the_current_row = $(".ingredients-containing-with-botanicals-49").append($("<tr></tr>"));
                        the_current_row.append($("<td></td>").text(the_ifra_info["Principle Name2"]));
                        the_current_row.append($("<td></td>").text(the_ifra_info["Botanical Binomial name"]));
      if (the_ifra_info["Principle CAS RIFM "]) {
                          the_current_row.append($("<td></td>").text(the_ifra_info["Principle CAS RIFM "]).addClass("IFRA-number"));
      } else {
        the_current_row.append($("<td></td>").text(the_ifra_info["Principle CAS RIFM"]).addClass("IFRA-number"));
      };
                        the_current_row.append($("<td></td>").text(the_ifra_info["Level (%)"]));  
      show_the_listy_49th_IFRA_table_with_botanicals = true;
    };
  };

  if (the_ifra_info["Standard type"]) {
    if (the_ifra_info["version"].indexOf("48") >= 0) {
      $(".modalbody-ifra-48").text(the_ifra_info["Standard type"]);
      show_the_48th_restriction_type = true;
    } else if (the_ifra_info["version"].indexOf("49") >= 0) {
      $(".modalbody-ifra-49").text(the_ifra_info["Standard type"]);
      show_the_49th_restriction_type = true;
    };
  };

        if (the_ifra_info["Amendment number"]) {
                if (the_ifra_info["version"].indexOf("48") >= 0) {
                        $(".modalbody-amendment-48").text(the_ifra_info["Amendment number"]);
                            show_the_48th_amendment_number = true;
                } else if (the_ifra_info["version"].indexOf("49") >= 0) {
                        $(".modalbody-amendment-49").text(the_ifra_info["Amendment number"]);
                            show_the_49th_amendment_number = true;
                };
        };

        if (the_ifra_info["Commentaires"]) {
                if (the_ifra_info["version"].indexOf("48") >= 0) {
                        $(".modalbody-commentifra-48").text(the_ifra_info["Commentaires"]);
                          show_the_48th_comments = true;
                } else if (the_ifra_info["version"].indexOf("49") >= 0) {
                        $(".modalbody-commentifra-49").text(the_ifra_info["Commentaires"]);
                          show_the_49th_comments = true;
                };
        };

        if (the_ifra_info["Intrinsic property"]) {
                if (the_ifra_info["version"].indexOf("48") >= 0) {
                        $(".modalbody-cause-48").text(the_ifra_info["Intrinsic property"]);
      show_the_48th_amendment_number = true;
                } else if (the_ifra_info["version"].indexOf("49") >= 0) {
                        $(".modalbody-cause-49").text(the_ifra_info["Intrinsic property"]);
      show_the_49th_amendment_number = true;
                };
        };


  if (the_ifra_info["version"].indexOf("48") >= 0) {
    console.log("IFRA - 48th amendment");
    if (the_ifra_info["1"] 
      || the_ifra_info["2"]
      || the_ifra_info["3"]
      || the_ifra_info["4"]
      || the_ifra_info["5A"]
      || the_ifra_info["6"] 
      || the_ifra_info["7A"]
      || the_ifra_info["8"]
      || the_ifra_info["9"]
      || the_ifra_info["10A"]
      || the_ifra_info["11A"]
    ) {
      fill_with_percentage(".modalbody-48-cat1",  the_ifra_info["1"]);
      fill_with_percentage(".modalbody-48-cat2",  the_ifra_info["2"]);
      fill_with_percentage(".modalbody-48-cat3",  the_ifra_info["3"]);
      fill_with_percentage(".modalbody-48-cat4",  the_ifra_info["4"]);
      fill_with_percentage(".modalbody-48-cat5",  the_ifra_info["5A"]);
      fill_with_percentage(".modalbody-48-cat6",  the_ifra_info["6"]);
      fill_with_percentage(".modalbody-48-cat7",  the_ifra_info["7A"]);
      fill_with_percentage(".modalbody-48-cat8",  the_ifra_info["8"]);
      fill_with_percentage(".modalbody-48-cat9",  the_ifra_info["9"]);
      fill_with_percentage(".modalbody-48-cat10", the_ifra_info["10A"]);
      fill_with_percentage(".modalbody-48-cat11", the_ifra_info["11A"]);
      show_the_main_48th_IFRA_table = true;
    };

  } else if (the_ifra_info["version"].indexOf("49") >= 0) {
    console.log("IFRA - 49th amendment");
                if (the_ifra_info["1"] 
                        || the_ifra_info["2"] 
                        || the_ifra_info["3"] 
                        || the_ifra_info["4"] 
                        || the_ifra_info["5A"] 
                        || the_ifra_info["5B"]                         
                        || the_ifra_info["5C"]                         
                        || the_ifra_info["5D"]                         
                        || the_ifra_info["6"] 
                        || the_ifra_info["7A"]
                        || the_ifra_info["7B"]
                        || the_ifra_info["8"]
                        || the_ifra_info["9"]
                        || the_ifra_info["10A"]
                        || the_ifra_info["10B"]
                        || the_ifra_info["11A"]
                        || the_ifra_info["11B"]
                        || the_ifra_info["12"]
                ) {     
                        fill_with_percentage(".modalbody-49-cat1",  the_ifra_info["1"]);
                        fill_with_percentage(".modalbody-49-cat2",  the_ifra_info["2"]);
                        fill_with_percentage(".modalbody-49-cat3",  the_ifra_info["3"]);
                        fill_with_percentage(".modalbody-49-cat4",  the_ifra_info["4"]);
                        fill_with_percentage(".modalbody-49-cat5A",  the_ifra_info["5A"]);
      fill_with_percentage(".modalbody-49-cat5B",  the_ifra_info["5B"]);
      fill_with_percentage(".modalbody-49-cat5C",  the_ifra_info["5C"]);
      fill_with_percentage(".modalbody-49-cat5D",  the_ifra_info["5D"]);
                        fill_with_percentage(".modalbody-49-cat6",  the_ifra_info["6"]);
                        fill_with_percentage(".modalbody-49-cat7A",  the_ifra_info["7A"]);
      fill_with_percentage(".modalbody-49-cat7B",  the_ifra_info["7B"]);
                        fill_with_percentage(".modalbody-49-cat8",  the_ifra_info["8"]);
                        fill_with_percentage(".modalbody-49-cat9",  the_ifra_info["9"]);
                        fill_with_percentage(".modalbody-49-cat10A", the_ifra_info["10A"]);
                        fill_with_percentage(".modalbody-49-cat10B", the_ifra_info["10B"]);
                        fill_with_percentage(".modalbody-49-cat11A", the_ifra_info["11A"]);
                        fill_with_percentage(".modalbody-49-cat11B", the_ifra_info["11B"]);
                        fill_with_percentage(".modalbody-49-cat12", the_ifra_info["12"]);
      show_the_main_49th_IFRA_table = true;
    };
  } else { // we suppose this is NonIFRA
    console.log("IFRA - no");
  };

  if (the_ifra_info["version"] != "PasIFRA") {
    show_nothing = false;
  };
  
    };
    };

    //$(".IFRA .container").show();
    //$(".IFRA .tab-content").show();
    //$(".IFRA-show-nothing").hide();
    //$(".IFRA-table").show();
    //$(".IFRA-infos").show(); 

    if (show_nothing) {
    $(".IFRA .container").hide();
    $(".IFRA .tab-content").hide();
    $(".IFRA .navbar").hide();
    $(".IFRA-show-nothing").show();
    } else {
        $(".IFRA-show-nothing").hide().attr("style", "display : none !important");
        $(".IFRA .container").show();
    $(".IFRA .tab-content").show();
    $(".IFRA .navbar").show();
    };
    

    if (! show_the_main_48th_IFRA_table) {
      $(".main-48th-IFRA-table").hide().attr("style", "display : none !important");;
    } else {
      $(".main-48th-IFRA-table").show();
    }; 
    if (! show_the_main_49th_IFRA_table) {
      $(".main-49th-IFRA-table").hide().attr("style", "display : none !important");;
    } else {
      $(".main-49th-IFRA-table").show();
    };
    if (! show_the_skin_IFRA_table) {
            $(".skin-IFRA-table").hide().attr("style", "display : none !important");;
    } else {
      $(".skin-IFRA-table").show();
    };
    if (! show_the_listy_48th_IFRA_table_without_botanicals) {
            $(".listy-48th-IFRA-table-without-botanicals").hide().attr("style", "display : none !important");;
    } else {
  $(".listy-48th-IFRA-table-without-botanicals").show();      
    };
    if (! show_the_listy_49th_IFRA_table_without_botanicals) {
            $(".listy-49th-IFRA-table-without-botanicals").hide().attr("style", "display : none !important");;
    } else {
      $(".listy-49th-IFRA-table-without-botanicals").show();
    };
    if (! show_the_listy_48th_IFRA_table_with_botanicals) {
            $(".listy-48th-IFRA-table-with-botanicals").hide().attr("style", "display : none !important");;
    } else {
      $(".listy-48th-IFRA-table-with-botanicals").show();
    };
    if (! show_the_listy_49th_IFRA_table_with_botanicals) {
            $(".listy-49th-IFRA-table-with-botanicals").hide().attr("style", "display : none !important");;
    } else {
      $(".listy-49th-IFRA-table-with-botanicals").show();
    };

    if (! show_the_48th_restriction_type) {
      $(".restriction").hide().attr("style", "display : none !important");;
    } else {
      $(".restriction").show();
    };
    if (! show_the_49th_restriction_type) {
            $(".restriction49").hide().attr("style", "display : none !important");;
    } else {
   $(".restriction49").show();      
    };
    if (! show_the_48th_amendment_number) {
            $(".amendment").hide().attr("style", "display : none !important");;
    } else {
  $(".amendment").show();     
    };
    if (! show_the_49th_amendment_number) {
            $(".amendment49").hide().attr("style", "display : none !important");;
    } else {
  $(".amendment49").show();     
    };
    if (! show_the_48th_comments) {
            $(".commentaires").hide().attr("style", "display : none !important");;
    } else {
  $(".commentaires").show();      
    };
    if (! show_the_49th_comments) {
            $(".commentaires49").hide().attr("style", "display : none !important");;
    } else {
  $(".commentaires49").show();      
    };
    
    // PRO
    var the_pro_informations_div = $("<div></div>");
    if (is_an_synthetique) {
  the_pro_informations_div = $(".pro_informations_synthetics");
    } else {
        the_pro_informations_div = $(".pro_informations_naturals");
    };
    $(".pro_informations_synthetics").empty();
    $(".pro_informations_naturals").empty();

    var the_pro_infos = the_node_as_json_EN_and_FR['PRO'];
    var the_new_pro_infos = new Array();
    var the_standard_pros = new Array();
    var the_premium_pros = new Array();
    if (the_pro_infos) {
        // built the JSON array from an aray of strings
  for (let an_pro_info of the_pro_infos) {
    //if (! window.document.jsdom_reader) {
    var the_pro_info = JSON.parse(an_pro_info);
    //} else {
    //  var the_pro_info = an_pro_info;
    //};
    the_new_pro_infos.push(the_pro_info);
  };
    };
    
    the_new_pro_infos.sort((a,b) => from_dd_mm_yyyy_as_string_to_yyyy_mm__dd_as_int(a["Dateajout"]) - from_dd_mm_yyyy_as_string_to_yyyy_mm__dd_as_int(b["Dateajout"]));
    for (let a_pro_info of the_new_pro_infos) {
        //console.log(a_pro_info);
  
    };
    if (the_new_pro_infos && (the_new_pro_infos.length > 0)) {
      the_standard_pros = the_new_pro_infos.filter((a) => (a["Type"] == "FS"));
      the_premium_pros = the_new_pro_infos.filter((a) => (a["Type"] == "FP"));

      $(".ad_to_the_potential_sponsors").hide();
      $(".commercialize").css('display', "inline");

      var the_row = $("<div></div>").addClass("row both_sponsors align-items-center");

      var the_container_for_the_premium_pros = $("<div></div>").addClass("container-fluid").append(
          $("<div></div>").addClass("row premium_and_standard_pros premium_pros_list")
      );
      var the_container_for_the_standard_pros = $("<div></div>").addClass("top-content").append(
                  $("<div></div>").addClass("container-fluid").append(
                      $("<div></div>").addClass("glide carouselcentré myCarousel").append(
                              $("<div></div>").addClass("glide__track m-0").attr("data-glide-el", "track").append(
                                      $("<ul></ul>").addClass("glide__slides m-0")
                              )
                      )
                  )
      ); // multiple items carousel - https://www.jqueryscript.net/slider/responsive-bootstrap-carousel-multiple-items.html

      if (the_premium_pros.length >= 2) {
          the_row.append($("<div></div>").addClass("col-lg-5").append(the_container_for_the_premium_pros));
          the_row.append($("<div></div>").addClass("col-lg-7").append(the_container_for_the_standard_pros));
      } else if (the_premium_pros.length == 1) {
          the_row.append($("<div></div>").addClass("col-lg-2").append(the_container_for_the_premium_pros));
          the_row.append($("<div></div>").addClass("col-lg-10").append(the_container_for_the_standard_pros));
      } else {
          the_row.append($("<div></div>").addClass("col-lg-12").append(the_container_for_the_standard_pros));
      };
      the_pro_informations_div.append(the_row);
    } else {
      $(".ad_to_the_potential_sponsors").show();
    };
    // the premium PROs only, already sorted by date
    for (let a_pro_info of the_premium_pros) {
      //console.log(a_pro_info);
      the_pro_img = get_the_pro_img_from_the_pro_info(a_pro_info);
      $(".premium_pros_list").append($("<div></div>")
      .addClass("col premium_pros")
      .append(the_pro_img));
    };
    // the standard PROs only, already sorted by date
    for (let a_pro_info of the_standard_pros) {
     the_pro_img = get_the_pro_img_from_the_pro_info(a_pro_info);
     $(".glide__slides").append($("<li></li>")
       .addClass("glide__slide standard_pros") //.text(a_pro_info["Nom Tiers"])
       .append(the_pro_img));
    };

   if (the_standard_pros && (window.document.jsdom_reader != 1)) {
  show_the_carousel(the_standard_pros.length);
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
    $('#modalbody-einecs').empty();
    $('#modalbody-fema').empty();
    $('#modalbody-jecfa').empty();
    $('#modalbody-flavis').empty();
      
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
  $('#modalbody-fusionp1').empty();
  $('#modalbody-stab1').empty();
  $('#modalbody-einecs1').empty();
  $('#modalbody-fema1').empty();
  $('#modalbody-jecfa1').empty();
  $('#modalbody-flavis1').empty();
  $('#modalbody-synonymes').empty();
  $('#modalbody-detection').empty();
  

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
  $('#modalbody-einecs').append(the_EINECS);
  $('#modalbody-fema').append(the_FEMA);
  $('#modalbody-jecfa').append(the_JECFA);
  $('#modalbody-flavis').append(the_FLAVIS);

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
  $('#modalbody-fusionp1').append(the_fusionp);
  $('#modalbody-stab1').append(the_stab);
  $('#modalbody-einecs1').append(the_EINECS);
  $('#modalbody-fema1').append(the_FEMA);
  $('#modalbody-jecfa1').append(the_JECFA);
  $('#modalbody-flavis1').append(the_FLAVIS);
  $('#modalbody-synonymes').append(the_synonyme);
  $('#modalbody-detection').append(the_detection);

  //APPEND - Partie Descripteurs
  $('#modaltitle2').append(the_title);
  $('#modalheader-type2').append(the_type);
  $('#modalbody-comment2').append(the_use);


    
    if (is_an_naturelle) {
        $('#naturelleModal .modal-header').css('background-color', the_background_color);
        $('#modalbody-pict').empty();
        $('#modalbody-pictmap').empty();
        $('#modalbody-pict').append("<img class='imgmp img-responsive img-fluid' src=\"../img/matieres_premieres/" + the_img_title + ".jpg\" alt=\"" + the_webpage_title_FR + "\" title=\"" + the_webpage_title_FR + "\" />");
        $('#modalbody-pictmap').append("<img class='imgmap img-responsive img-fluid' src=\"../img/matieres_premieres/map/" + the_img_title + ".png\" alt=\"" + the_webpage_title_FR + "\" title=\"" + the_webpage_title_FR + "\" />"); 
        if (show_the_modal) $('#naturelleModal').modal('show');
    };
    if (is_an_synthetique) {
        $('#SynthetiqueModal .modal-header').css('background-color', the_background_color);
        $('#modalbody-pict1').empty();
        $('#modalbody-pict1A').empty();
        $('#modalbody-pict1').append("<img class='imgmp img-responsive img-fluid' src=\"../img/matieres_premieres/" + the_img_title + ".PNG\" alt=\"" + the_webpage_title_FR + "\" title=\"" + the_webpage_title_FR + "\" />");
        $('#modalbody-pict1A').append("<img class='imgmp img-responsive img-fluid' src=\"../img/matieres_premieres/" + the_img_title + ".PNG\" alt=\"" + the_webpage_title_FR + "\" title=\"" + the_webpage_title_FR + "\" />");
        if (show_the_modal) $('#SynthetiqueModal').modal('show');
    };
    if (is_an_descripteur) {
        $('#DescripteurModal .modal-header').css('background-color', the_background_color);
        $('#modalbody-pictdescripteurs').empty();
        $('#modalbody-pictdescripteurs').append("<img class='imgmp img-responsive img-fluid' src=\"../img/descripteurs/" + the_img_title + ".jpg\" alt=\"" + the_webpage_title_descripteur_FR + "\" title=\"" + the_webpage_title_descripteur_FR + "\" />");
        if (show_the_modal) $('#DescripteurModal').modal('show');
    };
    

   /*$('title').html('ScenTree - ' + the_webpage_title);*/

   $('title').remove();
   $('meta[name=description]').remove();

   if (is_an_ingredient) {
        $('head').append( '<title lang="fr">ScenTree - ' + the_webpage_title_FR + '</title>');
        $('head').append( '<title lang="en">ScenTree - ' + the_webpage_title_EN + '</title>');

        $('head').append( '<meta lang="fr" name="description" content="' + the_webpage_description_FR + '" />');
        $('head').append( '<meta lang="en" name="description" content="' + the_webpage_description_EN + '" />');
   } else {
        $('head').append( '<title lang="fr">ScenTree - ' + the_webpage_title_descripteur_FR + '</title>');
        $('head').append( '<title lang="en">ScenTree - ' + the_webpage_title_descripteur_EN + '</title>');
        $('head').append( '<meta lang="fr" name="description" content="' + the_use_FR + '" />');
        $('head').append( '<meta lang="en" name="description" content="' + the_use_EN + '" />');

   };
};


$("#SynthetiqueModal").on("show.bs.modal", function (e) {
    var display_french_language = Cookies.get('display_french_language');
    if (display_french_language == 1) {
        $("*[lang=en]").not("html").css({'display' : 'none'});
        $("*[lang=fr]").not("html").css({'display' : 'initial'});
    } else {
        $("*[lang=fr]").not("html").css({'display' : 'none'});
        $("*[lang=en]").not("html").css({'display' : 'initial'});
    };
});

$("#naturelleModal").on("show.bs.modal", function (e) {
    var display_french_language = Cookies.get('display_french_language');
    if (display_french_language == 1) {
        $("*[lang=en]").not("html").css({'display' : 'none'});
        $("*[lang=fr]").not("html").css({'display' : 'initial'});
    } else {
        $("*[lang=fr]").not("html").css({'display' : 'none'});
        $("*[lang=en]").not("html").css({'display' : 'initial'});
    };
});

$('#DescripteurModal').on("show.bs.modal", function (e) {
    var display_french_language = Cookies.get('display_french_language');
    if (display_french_language == 1) {
        $("*[lang=en]").not("html").css({'display' : 'none'});
        $("*[lang=fr]").not("html").css({'display' : 'initial'});
    } else {
        $("*[lang=fr]").not("html").css({'display' : 'none'});
        $("*[lang=en]").not("html").css({'display' : 'initial'});
    };
});

function save_map_status_inside_cookies(the_map) {
        var the_map_center = the_map.getCenter();
        var rounded_latitude = Math.round(the_map_center.lat * 100000) / 100000;
        var rounded_longitude = Math.round(the_map_center.lng * 100000) / 100000;
        var the_map_zoom = the_map.getZoom();
        Cookies.set('the_previous_map__zoom', the_map_zoom, { expires: in30Minutes });
        Cookies.set('the_previous_map__latitude', rounded_latitude, { expires: in30Minutes });
        Cookies.set('the_previous_map__longitude', rounded_longitude, { expires: in30Minutes });
};

$("#SynthetiqueModal").on("hide.bs.modal", function (e) {
  $(".table1").hide();
  $(".table2").hide();
  $(".table3").hide();
  $(".logoifra").hide();
  $(".amendment").hide();
  $(".commentaires").hide();
  $('title').html("ScenTree - Classification innovante des ingrédients parfum");
        save_map_status_inside_cookies(map);
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
  save_map_status_inside_cookies(map);
  window.location.href = "../_/index.html";
});
$('#DescripteurModal').on("hidden.bs.modal", function (e) {
        $('title').html("ScenTree - Classification innovante des ingrédients parfum");
        save_map_status_inside_cookies(map);
        window.location.href = "../_/index.html";
});

var URL_PREFIX_SELECTER;
var URL_PREFIX_SUGGESTER;
function switch_to_en() {
    // emphasize the EN button
    $('.to_french_button').css("font-weight","normal");
    $('.to_english_button').css("font-weight","Bold");
    $('.to_english_radio_input').addClass("active");
    $('.to_french_radio_input').removeClass("active");
    // cookie
    Cookies.set('display_french_language', -1, { expires: 365});
    // DOM
    if (! window.document.jsdom_reader) {
        $("*[lang=fr]").not("html").remove();
    };
    //$("*:lang(en)").css({'display' : 'initial'});
    // change search
    URL_PREFIX_SUGGESTER = "/" + DEV_PREFIX_2 + "suggesthandler_EN/?suggest.dictionary=mySuggester&suggest.cfq=yes&suggest.q=";
    URL_PREFIX_SELECTER = "/" + DEV_PREFIX_2 + "select_EN/?q=id%3A";
    // clear search input
    $(".searchinput").val('');
    // change map
    if (map && map.addLayer) {
        map.addLayer(tol_en);
        map.removeLayer(tol_fr);
    };
    //change page title only for the main page
    if (document.title ==  "ScenTree - Classification innovante des ingrédients parfum") document.title = "ScenTree - The new collaborative perfumery raw materials classification";

    // set prefix for ingredients and descriptors html pages
    LANGUAGE_PREFIX_FOR_URLs = "en";
};
function switch_to_fr() {
    // emphasize the FR button
    $('.to_english_button').css("font-weight","normal");
    $('.to_french_button').css("font-weight","Bold");
    $('.to_french_radio_input').addClass("active");
    $('.to_english_radio_input').removeClass("active");
    // cookie
    Cookies.set('display_french_language', 1, { expires: 365});
    // DOM
    if (! window.document.jsdom_reader) {
        $("*[lang=en]").not("html").remove();
    };
    //$("*:lang(fr)").css({'display' : 'initial'});
    // change search
    URL_PREFIX_SUGGESTER = "/" + DEV_PREFIX_2 + "suggesthandler_FR/?suggest.dictionary=mySuggester&suggest.cfq=yes&suggest.q=";
    URL_PREFIX_SELECTER = "/" + DEV_PREFIX_2 + "select_FR/?q=id%3A";
    // clear search input
    $(".searchinput").val('');  
    // change map
    if (map) {
        map.addLayer(tol_fr);
        map.removeLayer(tol_en);
    };
    //change page title only for the main page
    if (document.title ==  "ScenTree - The new collaborative perfumery raw materials classification") document.title = "ScenTree - Classification innovante des ingrédients parfum";
    
    // set prefix for ingredients and descriptors html pages
    LANGUAGE_PREFIX_FOR_URLs = "fr";
};

$(".to_english_button").click(function() {
    switch_to_en();
    location.reload();
});
$(".to_french_button").click(function() {
    switch_to_fr();
    location.reload();
});
$(".to_english_radio_input").click(function() {
    switch_to_en();
    location.reload();
});
$(".to_french_radio_input").click(function() {
    switch_to_fr();
    location.reload();
});


function automatically_display_the_correct_language() { 
    
    var language = navigator.languages && navigator.languages[0] || // Chrome / Firefox
                   navigator.language ||   // All browsers
                   navigator.userLanguage; // IE <= 10

    var display_the_french_language = ((Cookies.get('display_french_language') == 1) || (! Cookies.get('display_french_language')) && ((language.toLowerCase() == "fr") || (language.toLowerCase().startsWith("fr-"))));
    // force the language if indicated in the <html> tag
    if ($("html")[0].lang == "en") {
      display_the_french_language = false;
    } else if ($("html")[0].lang == "fr") {
  display_the_french_language = true;     
    };

    if (display_the_french_language) {
        switch_to_fr();
    } else {
        switch_to_en();
    };
};
automatically_display_the_correct_language();


$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

$("#partenaireCinquiemeSens").on("show.bs.modal", function() {
    $("#lesCollaborateurs").modal("hide");
});

$("#close_you_can_zoom").on('click', function() {
    $('#you_can_zoom').css({"display" : "none"});
});

$(".save_map_status_on_leaving").on("click", function() {
    if (map) {
  save_map_status_inside_cookies(map);
    };
});
$(".show_modal_at_start").modal("show"); 
$(".go_to_main_page_after_closing_modal").on("hide.bs.modal", function() {
    window.location.href = "../_/index.html";
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
