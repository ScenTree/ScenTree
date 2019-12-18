'use strict';

var scentree_objects = require("./scentree_objects.js");

const jsonfile = require('jsonfile');
const fs = require('fs');

const { JSDOM } = require("jsdom");

// args
const the_third_arg = process.argv[3 -1]; // the path of the file usually called 'TreeFeaturesNEW_EN_and_FR.json'
const the_fourth_arg = process.argv[4 -1]; // optional : the path of the file usually called 'ingredients.html'
if (! fs.existsSync(the_third_arg)) {
    console.log("The file '" + the_third_arg + "' does not exist -> STOP! Please provide a 'TreeFeaturesNEW_EN_and_FR.json' file in argument (1st place)" );
    return;
} else {
	console.log("The file '" + the_third_arg + "' exists …" );
};
if (! fs.existsSync(the_fourth_arg)) {
    console.log("The file '" + the_fourth_arg + "' does not exist (but it is optional). You can eventually provide a 'ingredients.html' file in argument (2nd place)" );
} else {
        console.log("The file '" + the_fourth_arg + "' exists …" );
};


const the_json_file = the_third_arg;
const the_html_file = the_fourth_arg;



async function get_the_dom_from_the_html_file(the_file) {
  var dom = await JSDOM.fromFile(the_file);
  return dom;
};


function populate_the_html_file_with_scentree_objects(the_dom, the_scentree_objects, the_html_element, the_prefix_for_the_link) { 
    scentree_objects.empty_a_html_element(the_html_element);
    for (var i = 0, len = the_scentree_objects.length; i < len; i++) {
	var the_current_object = the_scentree_objects[i];
	var the_list_element = the_dom.window.document.createElement("LI");
	var the_link_to_the_html_of_the_element = the_dom.window.document.createElement("A");
	var the_name_of_the_html_of_the_element = the_prefix_for_the_link + scentree_objects.compute_the_html_name(the_current_object) + ".html";
	the_link_to_the_html_of_the_element.href = "../" + the_name_of_the_html_of_the_element;
	the_link_to_the_html_of_the_element.innerHTML = scentree_objects.compute_the_html_elements(the_current_object);

        the_list_element.classList.add("d-block");

	the_list_element.appendChild(the_link_to_the_html_of_the_element);
	the_html_element.appendChild(the_list_element);
    };
};

async function complete_the_html_file(the_json_file, the_file) {
    var the_objects = jsonfile.readFileSync(the_json_file);

    var the_array_of_naturals_FR = scentree_objects.compute_one_array(the_objects, scentree_objects.is_natural, "from_csv FR Nom");
    var the_array_of_naturals_EN = scentree_objects.compute_one_array(the_objects, scentree_objects.is_natural, "from_csv EN Nom");
    
    var the_array_of_synthetics_FR = scentree_objects.compute_one_array(the_objects, scentree_objects.is_synthetic, "from_csv FR Nom");
    var the_array_of_synthetics_EN = scentree_objects.compute_one_array(the_objects, scentree_objects.is_synthetic, "from_csv EN Nom");
    
    //var the_arrays_of_scentree_objects = scentree_objects.compute_the_three_arrays(the_objects);
    //var the_array_of_naturals = the_arrays_of_scentree_objects["Ingrédients naturels"];
    //var the_array_of_synthetics = the_arrays_of_scentree_objects["Ingrédients synthétiques"];
    	
    console.log("Ingrédients naturels : " + the_array_of_naturals_EN.length);
    console.log("Ingrédients synthétiques : " + the_array_of_synthetics_EN.length);

   if (the_file) {
    var the_dom = await get_the_dom_from_the_html_file(the_file);
    
    populate_the_html_file_with_scentree_objects(the_dom, the_array_of_naturals_EN, the_dom.window.document.getElementById("listeMP-Ingredients-naturels-EN"), "ingredients/");
    populate_the_html_file_with_scentree_objects(the_dom, the_array_of_naturals_FR, the_dom.window.document.getElementById("listeMP-Ingredients-naturels-FR"), "ingredients/");

    populate_the_html_file_with_scentree_objects(the_dom, the_array_of_synthetics_EN, the_dom.window.document.getElementById("listeMP-Ingredients-synthetiques-EN"), "ingredients/");
    populate_the_html_file_with_scentree_objects(the_dom, the_array_of_synthetics_FR, the_dom.window.document.getElementById("listeMP-Ingredients-synthetiques-FR"), "ingredients/");

    console.log("------");
    //console.log(dom);
    
    fs.writeFile(the_file, the_dom.serialize(), function(err) {
	if(err) {
            return console.log(err);
	}
	console.log("The file " + the_file + " was saved !");
    });
   };
};
complete_the_html_file(the_json_file, the_html_file);

