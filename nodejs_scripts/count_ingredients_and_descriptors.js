'use strict';

var scentree_objects = require("./scentree_objects.js");

const jsonfile = require('jsonfile');
const fs = require('fs');

const { JSDOM } = require("jsdom");

// args
const the_third_arg = process.argv[3 -1]; // the path of the file usually called 'TreeFeaturesNEW_EN_and_FR.json'
const the_fourth_arg = process.argv[4 -1]; // optional : the path of the file usually called 'scentree.html'
if (! fs.existsSync(the_third_arg)) {
    console.log("The file '" + the_third_arg + "' does not exist -> STOP! Please provide a 'TreeFeaturesNEW_EN_and_FR.json' file in argument (1st place)" );
    return;
} else {
	console.log("The file '" + the_third_arg + "' exists …" );
};
if (! fs.existsSync(the_fourth_arg)) {
    console.log("The file '" + the_fourth_arg + "' does not exist (but it is otpional). You can eventually provide a 'scentree.html' file in argument (2nd place)" );
} else {
        console.log("The file '" + the_fourth_arg + "' exists …" );
};


const the_json_file = the_third_arg;
const the_html_file = the_fourth_arg;


async function get_the_dom_from_the_html_file(the_file) {
  var dom = await JSDOM.fromFile(the_file);
  return dom;
};


function count_scentree_objects(the_arrays_of_scentree_objects) {
    var the_number_of_MP = the_arrays_of_scentree_objects["Ingrédients"].length;
    var the_number_of_familles_principales = the_arrays_of_scentree_objects["Familles principales"].length;
    var the_number_of_secondary_descripteurs = the_arrays_of_scentree_objects["Autres descripteurs"].length;
    return {"MP" : the_number_of_MP, "Familles principales" : the_number_of_familles_principales, "Secondary descriptors" : the_number_of_secondary_descripteurs};
};

function populate_some_html_elements(the_html_elements, the_text) {
        for (var i = 0, len = the_html_elements.length; i < len; i++) {
                var the_current_html_element = the_html_elements[i];
                scentree_objects.empty_a_html_element(the_current_html_element);
                the_current_html_element.text = the_text;
        };
};

async function populate_the_dom(the_file, the_counts) {
    	var dom = await get_the_dom_from_the_html_file(the_file);
	var the_number_of_MP = the_counts["MP"];
	var the_number_of_familles_principales = the_counts["Familles principales"];
	var the_number_of_secondary_descripteurs = the_counts["Secondary descriptors"];
    	//console.log(dom.window.document.getElementsByClassName("listeMP-number"));
	
       	populate_some_html_elements(dom.window.document.getElementsByClassName("listeMP-number"), the_number_of_MP);
        populate_some_html_elements(dom.window.document.getElementsByClassName("Listefamilles-principales-number"), the_number_of_familles_principales);
        populate_some_html_elements(dom.window.document.getElementsByClassName("Listefamilles-descripteurs-number"), the_number_of_secondary_descripteurs);
	
        return dom;
};


async function complete_the_html_file(the_json_file, the_file) {
    var the_objects = jsonfile.readFileSync(the_json_file);
    var the_arrays_of_scentree_objects = scentree_objects.compute_the_three_arrays(the_objects);
    var the_counts = count_scentree_objects(the_arrays_of_scentree_objects);
    console.log(the_counts);
    if (the_file) {
	    var dom = await populate_the_dom(the_file, the_counts);
    	    console.log("------");
    		//console.log(dom);
    
   		 fs.writeFile(the_html_file, dom.serialize(), function(err) {
		if(err) {
	            return console.log(err);
		};
		console.log("The html file " + the_file + " was changed :-)");
  		  });
    };
};
complete_the_html_file(the_json_file, the_html_file);
