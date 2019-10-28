'use strict';
  
const jsonfile = require('jsonfile');
const fs = require('fs');

const { JSDOM } = require("jsdom");

// args
const the_third_arg = process.argv[3 -1]; // the path of the folder containing pre_index.html
if (! fs.existsSync(the_third_arg)) {
    console.log("The folder '" + the_third_arg + "' does not exist -> STOP! Please provide a folder in argument" );
    return;
} else {
	console.log("The folder '" + the_third_arg + "' exists …" );
};

const the_json_file = '/home/maxime/BDD/TreeFeaturesNEW.json';
//const the_json_file = 'TreeFeaturesNEW.json';
const the_pre_index_file = the_third_arg + '_/pre_index.html';
//const the_pre_index_file = 'pre_index.html';
const the_post_index_file = the_third_arg + '_/post_index.html';

if (! fs.existsSync(the_json_file)) {
    console.log("The JSON file '" + the_json_file + "' does not exist -> STOP!" );
    return;
} else {
        console.log("The JSON file '" + the_json_file + "' exists …" );
};
if (! fs.existsSync(the_pre_index_file)) {
    console.log("The .html file '" + the_pre_index_file + "' does not exist -> STOP!" );
    return;
} else {
        console.log("The .html file '" + the_pre_index_file + "' exists …" );
};
// the file 'the_post_index_file' should NOT exist !
if (fs.existsSync(the_post_index_file)) {
    console.log("The .html file '" + the_post_index_file + "' exist -> STOP! (please rename it)" );
    return;
} else {
        console.log("The .html file '" + the_post_index_file + "' does not exists, that is perfect …" );
};


async function get_the_dom_from_the_pre_index_file() {
  var dom = await JSDOM.fromFile(the_pre_index_file);
  return dom;
};

function is_an_ingredient(the_object) {
    return (the_object["ingredient"] == "yes");
};

function is_a_famille_principale(the_object) {
    return (the_object["from_csv id"].length == 3);
};

function is_a_descripteur(the_object) {
    return (the_object["from_csv Type"] == "Descripteur");
};

function add_one_object_to_a_dom(the_dom, the_object) {
    var the_html_list_to_be_filled;
    // #listeMP -> Ingrédients Naturels ou Ingrédients Synthétiques ; #Listefamilles -> Familles Principales ou Descripteurs Secondaires
    if (is_an_ingredient(the_object)) { // if the object is ingrédient
	if (the_object["from_csv Type"] == "Naturelle") { // if the object is natural
	    the_html_list_to_be_filled = the_dom.window.document.getElementById("listeMP-Ingredients-naturels");
	} else {
	    the_html_list_to_be_filled = the_dom.window.document.getElementById("listeMP-Ingredients-synthetiques");
	};
    } else if (is_a_famille_principale(the_object)) {	// if the object is famille principale
	the_html_list_to_be_filled = the_dom.window.document.getElementById("Listefamilles-Familles-principales");
    } else { // otherwise the object is descripteur secondaire
	the_html_list_to_be_filled = the_dom.window.document.getElementById("Listefamilles-Descripteurs-secondaires");
    };
    
    var the_list_element = the_dom.window.document.createElement("LI");
    var the_link_to_the_html_of_the_element = the_dom.window.document.createElement("A");
    
    var the_name_of_the_html_of_the_element = the_object["sci_name"].replace( new RegExp("\\s", "gi"), "_");
    if (is_an_ingredient(the_object)) {
	the_name_of_the_html_of_the_element = "ingredients/" + the_name_of_the_html_of_the_element;
    } else if (is_a_famille_principale(the_object)) {
	the_name_of_the_html_of_the_element = "descripteurs_principaux/" + the_name_of_the_html_of_the_element;
    } else {
	the_name_of_the_html_of_the_element = "descripteurs_secondaires/" + the_name_of_the_html_of_the_element;
    };
    the_name_of_the_html_of_the_element = the_name_of_the_html_of_the_element + ".html";
    //the_link_to_the_html_of_the_element.href = "/" + the_name_of_the_html_of_the_element;
    the_link_to_the_html_of_the_element.href = "../" + the_name_of_the_html_of_the_element;
    the_link_to_the_html_of_the_element.text = the_object["sci_name"];
    
    the_list_element.appendChild(the_link_to_the_html_of_the_element);
    the_html_list_to_be_filled.appendChild(the_list_element);
}

async function generate_the_post_index_file(the_objects) {
    var dom = await get_the_dom_from_the_pre_index_file();
    for (var i = 0, len = the_objects.length; i < len; i++) {
    //for (var i = 0, len = the_objects.length; i < 20; i++) {
	var the_current_object = the_objects[i];
	var is_famille_principale_as_text = (is_a_famille_principale(the_current_object) ? " (Famille principale)" : "");
	console.log(i + "/" + the_objects.length + " : " + the_current_object["sci_name"] + is_famille_principale_as_text);
	//console.log(the_current_object);
	add_one_object_to_a_dom(dom, the_current_object);
    };
    // the number of elements inside the post-index
    var the_number_of_MP = 0;
    var the_number_of_familles_principales = 0;
    var the_number_of_descripteurs = 0;
    for (var i = 0, len = the_objects.length; i < len; i++) {
	var the_current_object = the_objects[i];
	if (is_an_ingredient(the_current_object)) {
	    the_number_of_MP += 1;
	};
	if (is_a_famille_principale(the_current_object)) {
	    the_number_of_familles_principales += 1;
	};
	if (is_a_descripteur(the_current_object)) {
	    the_number_of_descripteurs += 1;
	};
    };
    dom.window.document.getElementById("listeMP-number").text = the_number_of_MP;
    dom.window.document.getElementById("Listefamilles-principales-number").text = the_number_of_familles_principales;
    dom.window.document.getElementById("Listefamilles-descripteurs-number").text = the_number_of_descripteurs - the_number_of_familles_principales;
    
    return dom;
};

function remove_duplicated_elements(the_input_as_array, the_attribute_as_string, the_values_already_seen = new Set()) {
    // remove the duplicated elements
    var the_new_array = new Array();
    for (var i = 0, len = the_input_as_array.length; i < len; i++) {
	var the_current_object = the_input_as_array[i];
	var the_current_value = the_current_object[the_attribute_as_string];
	if (! the_values_already_seen.has(the_current_value)) {
	    the_new_array.push(the_current_object);
	};
	the_values_already_seen.add(the_current_value);
    };
    return the_new_array;
};

function prepare_an_array_to_be_printed(the_input_as_array, the_attribute_as_string) {
    var the_new_array = new Array();
    for (var i = 0, len = the_input_as_array.length; i < len; i++) {
	var the_current_object = the_input_as_array[i];
	var the_current_value = the_current_object[the_attribute_as_string];
	the_new_array.push(the_current_value);
    };
    return the_new_array;
};

function from_an_array_to_a_string(the_input_as_array) {
    var the_array_as_string = "";
    for (var i = 0, len = the_input_as_array.length; i < len; i++) {
	var the_current_object = the_input_as_array[i];
	the_array_as_string = the_array_as_string + ", " + the_current_object;
    };
    return "[ " + the_array_as_string + " ]";
};

async function complete_the_pre_index_file(the_json_file) {
    var the_objects = jsonfile.readFileSync(the_json_file);
    console.log(the_objects.length);
    
    // split the array into three arrays : one for the "famille principale", one for "autres descripteurs", one for the others (= the "ingrédients")
    /* to remove the duplicates in each array : 
          [Vert (Aldéhydés), Vert (Famille principale), Vert (Souffré), Vert (Souffré -> Fruit rouge)] 
       -> [Vert (Famille principale)] ; [Vert (Aldéhydés), Vert (Souffré), Vert (Souffré -> Fruit rouge)] 
       -> [Vert (Famille principale)] ; [Vert ("anonymisé")]
       -> [Vert (Famille principale), Vert ("anonymisé")]) */
    var the_familles_principales = new Array();
    var the_autres_descripteurs = new Array();
    var the_ingredients = new Array();
    for (var i = 0, len = the_objects.length; i < len; i++) {
	var the_current_object = the_objects[i];
	if (is_a_famille_principale(the_current_object)) {
	    the_familles_principales.push(the_current_object);
	} else if (is_a_descripteur(the_current_object)) {
	    the_autres_descripteurs.push(the_current_object);
	} else {
	    the_ingredients.push(the_current_object);
	};
    };
    
    // remove the duplicated elements (same "sci_name") + remove one element : "Matières Premières Parfumerie" ("sci_name")
    var the_familles_principales_2 = remove_duplicated_elements(the_familles_principales, "sci_name", new Set(["Matières Premières Parfumerie"]));
    var the_autres_descripteurs_2 = remove_duplicated_elements(the_autres_descripteurs, "sci_name");
    var the_ingredients_2 = remove_duplicated_elements(the_ingredients, "sci_name");
    
    if ((the_familles_principales_2.length != (the_familles_principales.length -1)) || (the_ingredients_2.length != the_ingredients.length)) {
	console.log("ATTENTION : il y a des ingrédients ET/OU des familles principales ayant le même nom");
    };
    console.log("------");
    console.log(the_familles_principales.length + " -> " + the_familles_principales_2.length);
    console.log(from_an_array_to_a_string(prepare_an_array_to_be_printed(the_familles_principales, "sci_name")));
    console.log(" -> ");
    console.log(from_an_array_to_a_string(prepare_an_array_to_be_printed(the_familles_principales_2, "sci_name")));
    console.log("------");
    console.log(the_autres_descripteurs.length + " -> " + the_autres_descripteurs_2.length);
    console.log(from_an_array_to_a_string(prepare_an_array_to_be_printed(the_autres_descripteurs, "sci_name")));
    console.log(" -> ");
    console.log(from_an_array_to_a_string(prepare_an_array_to_be_printed(the_autres_descripteurs_2, "sci_name")));
    console.log("------");
    console.log(the_ingredients.length + " -> " + the_ingredients_2.length);
    console.log(from_an_array_to_a_string(prepare_an_array_to_be_printed(the_ingredients, "sci_name")));
    console.log(" -> ");
    console.log(from_an_array_to_a_string(prepare_an_array_to_be_printed(the_ingredients_2, "sci_name")));
    console.log("------");
    
    // recreate the array with all elements
    var the_objects_2 = (the_familles_principales_2.concat(the_autres_descripteurs_2)).concat(the_ingredients_2);

    // sort the objects in alphabetical order (the_object["sci_name"])
    the_objects_2.sort(function (a, b) {
	if (a["sci_name"] < b["sci_name"]) {
	    return -1;
	} else if (a["sci_name"] > b["sci_name"]) {
	    return 1;
	} else {
	    return 0;
	};
    });
    
    var dom = await generate_the_post_index_file(the_objects_2);
    console.log("------");
    //console.log(dom);
    
    fs.writeFile(the_post_index_file, dom.serialize(), function(err) {
	if(err) {
            return console.log(err);
	}
	console.log("The file " + "post_index" + ".html was saved !");
    });
};
complete_the_pre_index_file(the_json_file);
