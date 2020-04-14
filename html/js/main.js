var KIND_OF_ENVIRONMENT = "dev4";  // "dev", "dev4", "prod" or "prod2"

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
    var DEV_PREFIX_1 = "dev4-"; // dev- ,  pre_prod- ,  or empty for production
    var DEV_PREFIX_2 = "dev4_"; // dev_ ,  pre_prod__ ,   or empty for production
};

var UPDATED_ON = {"they support us" : "20200315", "the news" : "20200315", "the survey" : "20200315"};

var in30Minutes = 1/96; // in 15 minutes
var forAFewSeconds = 3500;

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
      } else {
          $("#RGPD_warning").css({'display' : 'None'});
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
      var newText = "<span class='nom_de_l_ingredient p-0'>" + String(item.label.sci_name).replace(
                new RegExp(get_all_accents_in_a_regexp(this.term), "gi"),
                "<span class='ui-state-highlight'>$&</span>") + "</span>";
      if (item.label["from_csv AutresNoms"]) {
    newText = newText + "<br /><span class='synonymes p-0' style='margin: 0px;' >(" + String(item.label["from_csv AutresNoms"]).replace(
                    new RegExp(get_all_accents_in_a_regexp(this.term), "gi"), 
                    "<span class='ui-state-highlight'>$&</span>") + ")</span>";
      };
      if (item.label["from_csv Botanique"]) {
    newText = newText + "<br /><span class='synonymes p-0'>(" + String(item.label["from_csv Botanique"]).replace(
                    new RegExp(get_all_accents_in_a_regexp(this.term), "gi"), 
                    "<span class='ui-state-highlight'>$&</span>") + ")</span>";
      };
      if (item.label["from_csv NCas"]) {
    newText = newText + "<br /><span class='numero_cas p-0' >N° CAS : " + String(item.label["from_csv NCas"]).replace(
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
if ($("#map").length) {
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
if ($("#map").length) {
  map.setView([the_previous_map__latitude || 2, the_previous_map__longitude || 0, ], the_previous_map__zoom || zoom_initial);
};
/* Définission de l'icone qui pointe les MP recherchées*/
var mark = L.icon({
    iconUrl: '../img/mark.png',
    iconSize:     [75, 25], // size of the icon
    iconAnchor:   [35, 13], // point of the icon which will correspond to marker's location
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
    // non-ingredient -> basic modal
    if (( ! is_an_ingredient(ok[index]) ) || DEV_ENVIRONMENT) {
      marker.on("click", function() {
            markofun(ok[index]);
      });
                } else {  // else : ingredient -> link to a new html page
                        marker.on("click", function() {
        save_map_status_inside_cookies(map);
                                window.location.href = "../ingredients/" + ok[index]['from_csv EN Nom'].replace( new RegExp("[\\s\/'\",]", "gi"), "_") + "__" + ok[index]['from_csv FR Nom'].replace( new RegExp("[\\s\/'\",]", "gi"), "_") + ".html";
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

$("#ListeMP").click(function() {
    $("#listeMP").modal("show");
});
$("#Listefamilles").click(function() {
    $("#listefamilles").modal("show");
});


//pop-up
if ($("#map").length) {
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

$(function() {
    var str;
    //définitions des URL de la requete de solr//
    //var URL_PREFIX_SUGGESTER = "/" + DEV_PREFIX_2 + "suggesthandler_EN/?suggest.dictionary=mySuggester&suggest.cfq=yes&suggest.q=";
    //var URL_PREFIX_SELECTER = "/select_EN/?q=id%3A";
    var URL_PREFIX_SELECTER_BOTH_LANGUAGES = "/" + DEV_PREFIX_2 + "select_EN_and_FR/?q=id%3A";
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

function from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, the_key_as_text) {
     return "<span lang='en'>" + the_node_as_json_EN_and_FR['from_csv EN ' + the_key_as_text] + "</span><span lang='fr'>" + the_node_as_json_EN_and_FR['from_csv FR ' + the_key_as_text] + "</span>";
};

function fill_with_percentage(the_html_class_as_text, the_percentage) {
  $(the_html_class_as_text).empty();
  if (the_percentage.toLowerCase().indexOf("restr") >= 0) {
          $(the_html_class_as_text).append($("<span></span>").attr("lang", "en").text("Not restricted"));
                $(the_html_class_as_text).append($("<span></span>").attr("lang", "fr").text("Non restreint"));
  } else if (the_percentage.toLowerCase() == "x") {
    $(the_html_class_as_text).text(the_percentage);
  } else {
                $(the_html_class_as_text).text(the_percentage + " %");
        };
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
    
    //communs
    var the_use = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Utilisation');
    var the_type = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Type');
    var the_title = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Nom');
    var the_img_title = the_node_as_json_EN_and_FR['from_csv FR Nom'];
    var the_webpage_title = the_node_as_json_EN_and_FR['from_csv EN Nom'] + " - " + the_node_as_json_EN_and_FR['from_csv FR Nom'] + " (N°Cas : " + the_node_as_json_EN_and_FR['from_csv EN NCas'] + ")";
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
    var the_pemblem = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'parfumemblematiques');
    var the_chemotype = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'chemotype');
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


    var the_commentary = from_json_dict_EN_FR_to_HTML_spans_with_lang_EN_FR(the_node_as_json_EN_and_FR, 'Commentaires');
    if (the_commentary) { // avoid applying .replace to undefined
         the_commentary = the_commentary.replace(/\n/g,"<br />");  //convert \n to <br /> = convert json end of line to html end of line
     };
    var the_background_color = the_node_as_json_EN_and_FR['from_csv FR Couleur'];
    if (! (the_background_color)) {
        the_background_color = "#FFFFFF"
    };

    var is_an_ingredient = (the_node_as_json_EN_and_FR['ingredient'] == "yes");
    var is_an_naturelle = (the_node_as_json_EN_and_FR['from_csv FR Type'] == "Naturelle");
    var is_an_synthetique = (the_node_as_json_EN_and_FR['from_csv FR Type'] == "Synthétique");
    var is_an_descripteur = (the_node_as_json_EN_and_FR['from_csv FR Type'] == "Descripteur");


    // IFRA
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

    $(".IFRA .container").show();
    $(".IFRA .tab-content").show();
    $(".IFRA-show-nothing").hide();
    $(".IFRA-table").show();
    $(".IFRA-infos").show(); 

    if (show_nothing) {
  $(".IFRA .container").hide();
  $(".IFRA .tab-content").hide();
  $(".IFRA-show-nothing").show();
    };
    
    if (! show_the_main_48th_IFRA_table) {
      $(".main-48th-IFRA-table").hide();
    }; 
    if (! show_the_main_49th_IFRA_table) {
      $(".main-49th-IFRA-table").hide();
    };
    if (! show_the_skin_IFRA_table) {
            $(".skin-IFRA-table").hide();
    };
    if (! show_the_listy_48th_IFRA_table_without_botanicals) {
            $(".listy-48th-IFRA-table-without-botanicals").hide();
    };
    if (! show_the_listy_49th_IFRA_table_without_botanicals) {
            $(".listy-49th-IFRA-table-without-botanicals").hide();
    };
    if (! show_the_listy_48th_IFRA_table_with_botanicals) {
            $(".listy-48th-IFRA-table-with-botanicals").hide();
    };
    if (! show_the_listy_49th_IFRA_table_with_botanicals) {
            $(".listy-49th-IFRA-table-with-botanicals").hide();
    };

    if (! show_the_48th_restriction_type) {
      $(".restriction").hide();
    };
    if (! show_the_49th_restriction_type) {
            $(".restriction49").hide();
    };
    if (! show_the_48th_amendment_number) {
            $(".amendment").hide();
    };
    if (! show_the_49th_amendment_number) {
            $(".amendment49").hide();
    };
    if (! show_the_48th_comments) {
            $(".commentaires").hide();
    };
    if (! show_the_49th_comments) {
            $(".commentaires49").hide();
    };

    
    // PRO
    if (is_an_synthetique) {
	var the_pro_informations_div = $(".pro_informations_synthetics");
    } else {
        var the_pro_informations_div = $(".pro_informations_naturals");
    };
    $(".pro_informations_synthetics").empty();
    $(".pro_informations_naturals").empty();

    the_pro_infos = the_node_as_json_EN_and_FR['PRO'];
    the_new_pro_infos = new Array();
    if (the_pro_infos) {
        // built the JSON array from an aray of strings
  for (let an_pro_info of the_pro_infos) {
    var the_pro_info = JSON.parse(an_pro_info);
    the_new_pro_infos.push(the_pro_info);
  };
    };
    
    the_new_pro_infos.sort((a,b) => from_dd_mm_yyyy_as_string_to_yyyy_mm__dd_as_int(a["Dateajout"]) - from_dd_mm_yyyy_as_string_to_yyyy_mm__dd_as_int(b["Dateajout"]));
    for (let a_pro_info of the_new_pro_infos) {
        //console.log(a_pro_info);
  
    };
    if (the_new_pro_infos) {
      var the_row = $("<div></div>").addClass("row align-items-center");
      the_row.append($("<div></div>").addClass("col-lg-5").append($("<div></div>").addClass("container-fluid").append($("<div></div>").addClass("row premium_and_standard_pros premium_pros_list"))));
      //the_row.append($("<div></div>").addClass("col-lg-7").append($("<div></div>").addClass("container-fluid").append($("<div></div>").addClass("row premium_and_standard_pros standard_pros_list"))));
      // multiple items carousel - https://www.jqueryscript.net/slider/responsive-bootstrap-carousel-multiple-items.html
      the_row.append(
	      $("<div></div>").addClass("col-lg-7").append(
	          $("<div></div>").addClass("top-content").append(
		      $("<div></div>").addClass("container-fluid").append(
		      $("<div></div>").addClass(" glide  myCarousel").append(
			      $("<div></div>").addClass("glide__track").attr("data-glide-el", "track").append(
				      $("<ul></ul>").addClass("glide__slides")
		              )
		      )
		  )
		  )
	      )
      );
      the_pro_informations_div.append(the_row);
    };
    // the premium PROs only, already sorted by date
    for (let a_pro_info of the_new_pro_infos.filter((a) => (a["Type"] == "FP"))) {
      //console.log(a_pro_info);
      $(".premium_pros_list").append($("<div></div>")
	    .addClass("col premium_pros")
			    .append($("<img />")
			    	     .attr("src", "/img/sponsors/sponsor_example_1.jpeg")
				    .addClass("img-fluid")
				    .attr("title", a_pro_info["Nom Tiers"])
				    .attr("alt", a_pro_info["Nom Tiers"])));
    };
    // the standard PROs only, already sorted by date
    var the_standard_pros = the_new_pro_infos.filter((a) => (a["Type"] == "FS"));
    for (let a_pro_info of the_standard_pros) {
     $(".glide__slides").append($("<li></li>")
	     .addClass("glide__slide") //.text(a_pro_info["Nom Tiers"])
	     .append($("<img />")
		      .attr("src", "/img/sponsors/sponsor_example_2.jpeg")
		      .addClass("")
                      .attr("title", a_pro_info["Nom Tiers"])
                      .attr("alt", a_pro_info["Nom Tiers"])
	     )
     );

    };

    new Glide( '.glide', {
	    type: "carousel", 
	    startAt: 0, 
	    perView: 3, 
	    autoplay: forAFewSeconds
    } ).mount();


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

  //APPEND - Partie Descripteurs
  $('#modaltitle2').append(the_title);
  $('#modalheader-type2').append(the_type);
  $('#modalbody-comment2').append(the_use);


    
    if (is_an_naturelle) {
        $('#naturelleModal .modal-header').css('background-color', the_background_color);
        $('#modalbody-pict').empty();
        $('#modalbody-pictA').empty();
        $('#modalbody-pict').append("<img class='imgmp' src='../img/matieres_premieres/" + the_img_title + ".jpg' alt='" + the_webpage_title + "' title='" + the_webpage_title + "' />");
        $('#modalbody-pictA').append("<img class='imgmp' src='../img/matieres_premieres/" + the_img_title + ".jpg' alt='" + the_webpage_title + "' title='" + the_webpage_title + "' />"); 
        if (show_the_modal) $('#naturelleModal').modal('show');
    };
    if (is_an_synthetique) {
        $('#SynthetiqueModal .modal-header').css('background-color', the_background_color);
        $('#modalbody-pict1').empty();
        $('#modalbody-pict1A').empty();
        $('#modalbody-pict1').append("<img class='imgmp' src='../img/matieres_premieres/" + the_img_title + ".PNG' alt='" + the_webpage_title + "' title='" + the_webpage_title + "' />");
        $('#modalbody-pict1A').append("<img class='imgmp' src='../img/matieres_premieres/" + the_img_title + ".PNG' alt='" + the_webpage_title + "' title='" + the_webpage_title + "' />");
        if (show_the_modal) $('#SynthetiqueModal').modal('show');
    };
    if (is_an_descripteur) {
        $('#DescripteurModal .modal-header').css('background-color', the_background_color);
        if (show_the_modal) $('#DescripteurModal').modal('show');
    };
    

   $('title').html('ScenTree - ' + the_webpage_title);

};


$("#SynthetiqueModal").on("show.bs.modal", function (e) {
    var display_french_language = Cookies.get('display_french_language');
    if (display_french_language == 1) {
        $("*:lang(en)").css({'display' : 'none'});
        $("*:lang(fr)").css({'display' : 'initial'});
    } else {
  $("*:lang(fr)").css({'display' : 'none'});
        $("*:lang(en)").css({'display' : 'initial'});
    };
});

$("#naturelleModal").on("show.bs.modal", function (e) {
    var display_french_language = Cookies.get('display_french_language');
    if (display_french_language == 1) {
        $("*:lang(en)").css({'display' : 'none'});
        $("*:lang(fr)").css({'display' : 'initial'});
    } else {
        $("*:lang(fr)").css({'display' : 'none'});
        $("*:lang(en)").css({'display' : 'initial'});
    };
    //$(".carousel").carousel({interval: 3500});
});

$('#DescripteurModal').on("show.bs.modal", function (e) {
    var display_french_language = Cookies.get('display_french_language');
    if (display_french_language == 1) {
        $("*:lang(en)").css({'display' : 'none'});
        $("*:lang(fr)").css({'display' : 'initial'});
    } else {
        $("*:lang(fr)").css({'display' : 'none'});
        $("*:lang(en)").css({'display' : 'initial'});
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
        $("*:lang(fr)").remove();
    };
    //$("*:lang(en)").css({'display' : 'initial'});
    // change search
    URL_PREFIX_SUGGESTER = "/" + DEV_PREFIX_2 + "suggesthandler_EN/?suggest.dictionary=mySuggester&suggest.cfq=yes&suggest.q=";
    URL_PREFIX_SELECTER = "/" + DEV_PREFIX_2 + "select_EN/?q=id%3A";
    // clear search input
    $(".searchinput").val('');
    // change map
    if ($("#map").length) {
        map.addLayer(tol_en);
        map.removeLayer(tol_fr);
    };
    //change page title only for the main page
    if (document.title ==  "ScenTree - Classification innovante des ingrédients parfum") document.title = "ScenTree - The new collaborative perfumery raw materials classification";
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
  $("*:lang(en)").remove();
    };
    //$("*:lang(fr)").css({'display' : 'initial'});
    // change search
    URL_PREFIX_SUGGESTER = "/" + DEV_PREFIX_2 + "suggesthandler_FR/?suggest.dictionary=mySuggester&suggest.cfq=yes&suggest.q=";
    URL_PREFIX_SELECTER = "/" + DEV_PREFIX_2 + "select_FR/?q=id%3A";
    // clear search input
    $(".searchinput").val('');  
    // change map
    if ($("#map").length) {
        map.addLayer(tol_fr);
        map.removeLayer(tol_en);
    };
    //change page title only for the main page
    if (document.title ==  "ScenTree - The new collaborative perfumery raw materials classification") document.title = "ScenTree - Classification innovante des ingrédients parfum";
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

var language = navigator.languages && navigator.languages[0] || // Chrome / Firefox
               navigator.language ||   // All browsers
               navigator.userLanguage; // IE <= 10

//console.log(language);

if ((Cookies.get('display_french_language') == 1) || (! Cookies.get('display_french_language')) && ((language.toLowerCase() == "fr") || (language.toLowerCase().startsWith("fr-")))) {
    switch_to_fr();
} else {
    switch_to_en();
};

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
    if ($("#map").length) {
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
