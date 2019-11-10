'use strict';
  
const jsonfile = require('jsonfile');
const fs = require('fs');

const { JSDOM } = require("jsdom");


const the_third_arg = process.argv[3 -1]; // the path of the folder containing pre_index.html
if (! fs.existsSync(the_third_arg)) {
    console.log("The folder '" + the_third_arg + "' does not exist -> STOP! Please provide a folder in argument" );
    return;
} else {
        console.log("The folder '" + the_third_arg + "' exists …" );
};
const the_folder_path = the_third_arg;

const the_index_html_path = the_folder_path + "_/index.html";
if (! fs.existsSync(the_index_html_path)) {
    console.log("The .html file '" + the_index_html_path + "' does not exist -> STOP!" );
    return;
} else {
        console.log("The .html file '" + the_index_html_path + "' exists …" );
};

//const the_json_file = 'test.json';
const the_json_file = '/home/maxime/BDD/TreeFeaturesNEW_EN_and_FR.json';

if (! fs.existsSync(the_json_file)) {
    console.log("The JSON file '" + the_json_file + "' does not exist -> STOP!" );
    return;
} else {
        console.log("The JSON file '" + the_json_file + "' exists …" );
};

// folders path
const ingredients_folder_path = the_folder_path + "ingredients/";
const descripteurs_principaux_folder_path = the_folder_path + "descripteurs_principaux/";
const descripteurs_secondaires_folder_path = the_folder_path + "descripteurs_secondaires/";
// they should not exist
if (fs.existsSync(ingredients_folder_path)) {
    console.log("The ingredients folder '" + ingredients_folder_path + "' exist -> STOP! (please remove it or rename it)" );
    return;
} else {
        console.log("The ingredients folder '" + ingredients_folder_path + "' does not exists, that is perfect …" );
};
if (fs.existsSync(descripteurs_principaux_folder_path)) {
    console.log("The 'descripteurs principaux' folder '" + descripteurs_principaux_folder_path + "' exist -> STOP! (please remove it or rename it)" );
    return;
} else {
        console.log("The 'descripteurs principaux' folder '" + descripteurs_principaux_folder_path + "' does not exists, that is perfect …" );
};
if (fs.existsSync(descripteurs_secondaires_folder_path)) {
    console.log("The 'descripteurs secondaires' folder '" + descripteurs_secondaires_folder_path + "' exist -> STOP! (please remove it or rename it)" );
    return;
} else {
        console.log("The 'descripteurs secondaires' folder '" + descripteurs_secondaires_folder_path + "' does not exists, that is perfect …" );
};
// create those folders
fs.mkdirSync(ingredients_folder_path, { recursive: true });
fs.mkdirSync(descripteurs_principaux_folder_path, { recursive: true });
fs.mkdirSync(descripteurs_secondaires_folder_path, { recursive: true });



var the_objects = jsonfile.readFileSync(the_json_file);
console.log(the_objects.length);

async function get_the_dom_from_the_net() {
  var dom = await JSDOM.fromFile(the_index_html_path, { runScripts: "dangerously", resources: "usable", beforeParse(window) {window.document.jsdom_reader = 1; } });
  //var dom = await JSDOM.fromFile(the_index_html_path, { resources: "usable" });
  // wait for the url to be loaded
  await new Promise(resolve => {
    dom.window.document.addEventListener("load", resolve);
  });
  return dom;
};

function is_an_ingredient(the_object) {
    return (the_object["ingredient"] == "yes");
};

function is_a_famille_principale(the_object) {
    return (the_object["from_csv FR id"].length == 3);
};

function is_a_descripteur(the_object) {
    return (the_object["from_csv FR Type"] == "Descripteur");
};

async function generate_one_file(dom, the_current_object) {
    console.log("inside sub-function with " + the_current_object['sci_name']);
    
    dom.window.markofun(the_current_object, false);
    
    var the_script_to_open_the_modal_onload = dom.window.document.getElementById("script_for_generated_pages");
    if (! the_script_to_open_the_modal_onload) the_script_to_open_the_modal_onload = dom.window.document.createElement("script");
    the_script_to_open_the_modal_onload.id = "script_for_generated_pages";
    the_script_to_open_the_modal_onload.type = "text/javascript";
    //the_script_to_open_the_modal_onload.text = "$(window).on('load',function(){ $('#Vidéo').hide(); $('.modal-backdrop').remove(); markofun(" + JSON.stringify(the_current_object) + ", true); });";
    //the_script_to_open_the_modal_onload.text = "markofun(" + JSON.stringify(the_current_object) + ", true);";
    if (the_current_object["from_csv FR Type"] == "Synthétique") {
    	the_script_to_open_the_modal_onload.text = "$(window).on('load',function(){ $('#SynthetiqueModal').modal('show'); });";
    } else if (the_current_object["from_csv FR Type"] == "Naturelle") { 
	the_script_to_open_the_modal_onload.text = "$(window).on('load',function(){ $('#naturelleModal').modal('show'); });";
    } else {
	the_script_to_open_the_modal_onload.text = "$(window).on('load',function(){ $('#DescripteurModal').modal('show'); });";
    };
    dom.window.document.body.appendChild(the_script_to_open_the_modal_onload);
    
    let the_name_of_the_file = the_current_object["from_csv EN Nom"].replace( new RegExp("\\s", "gi"), "_") + "__" + the_current_object["from_csv FR Nom"].replace( new RegExp("\\s", "gi"), "_");
    if (is_an_ingredient(the_current_object)) {
	the_name_of_the_file = ingredients_folder_path + the_name_of_the_file;
    } else if (is_a_famille_principale(the_current_object)) {
	the_name_of_the_file = descripteurs_principaux_folder_path + the_name_of_the_file;
    } else {
	the_name_of_the_file = descripteurs_secondaires_folder_path + the_name_of_the_file;
    };
    fs.writeFile(the_name_of_the_file + ".html", dom.serialize(), function(err) {
	if(err) {
            return console.log(err);
	}
	console.log("The file " + the_name_of_the_file + ".html was saved !");
    });
};

async function generate_files(the_objects, min_index, max_index) {
  var dom = await get_the_dom_from_the_net();
  for (var i = min_index, len = the_objects.length; i < max_index; i++) {
  //for (var i = 0, len = the_objects.length; i < 20; i++) {
    console.log(i + "/" + the_objects.length);
    var the_current_object = the_objects[i];
    //console.log(the_current_object);
    await generate_one_file(dom, the_current_object);
  };
};

generate_files(the_objects, 0, 200);
generate_files(the_objects, 200, 400);
generate_files(the_objects, 400, 600);
generate_files(the_objects, 600, 800);
generate_files(the_objects, 800, the_objects.length);
