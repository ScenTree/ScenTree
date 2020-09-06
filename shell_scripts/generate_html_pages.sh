#!/bin/sh

PLEASE_STOP=0

THE_FILES_FOLDER="../../files"
THE_NODEJS_SCRIPTS_FOLDER="../nodejs_scripts"
THE_HTML_FOLDER="../html"

if [ ! -d "$THE_FILES_FOLDER" ]
then
	echo "Folder '$THE_FILES_FOLDER' not found !"
	PLEASE_STOP=1
fi
if [ ! -d "$THE_NODEJS_SCRIPTS_FOLDER" ]
then
        echo "Folder '$THE_NODEJS_SCRIPTS_FOLDER' not found !"
        PLEASE_STOP=1
fi
if [ ! -d "$THE_HTML_FOLDER" ]
then
        echo "Folder '$THE_HTML_FOLDER' not found !"
        PLEASE_STOP=1
fi


# first abort if problem
if [ "$PLEASE_STOP" -eq 1 ]
then
        echo "aborting !"
        exit 1
fi


THE_COUNTING_SCRIPT="$THE_NODEJS_SCRIPTS_FOLDER/count_ingredients_and_descriptors.js"
THE_DESCRIPTOR_GENERATOR_SCRIPT="$THE_NODEJS_SCRIPTS_FOLDER/generate_lists_of_descriptors.js"
THE_HTML_PAGES_GENERATOR_SCRIPT="$THE_NODEJS_SCRIPTS_FOLDER/generate_html_pages_for_scentree_objects.js"

if [ ! -f "$THE_COUNTING_SCRIPT" ]
then
        echo "Script '$THE_COUNTING_SCRIPT' not found !"
        PLEASE_STOP=1
fi
if [ ! -f "$THE_DESCRIPTOR_GENERATOR_SCRIPT" ]
then
	echo "Script '$THE_DESCRIPTOR_GENERATOR_SCRIPT' not found !"
	PLEASE_STOP=1
fi
if [ ! -f "$THE_HTML_PAGES_GENERATOR_SCRIPT" ]
then
	echo "Script '$THE_HTML_PAGES_GENERATOR_SCRIPT' not found !"
	PLEASE_STOP=1
fi


# second abort if problem
if [ "$PLEASE_STOP" -eq 1 ]
then
	echo "aborting !"
	exit 1
fi


npm install jsdom
npm install jsonfile
node "$THE_COUNTING_SCRIPT" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR.json" "$THE_HTML_FOLDER/_/menu.html"
node "$THE_DESCRIPTOR_GENERATOR_SCRIPT" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR.json" "$THE_HTML_FOLDER/_/listdescriptors.html"
node "$THE_HTML_PAGES_GENERATOR_SCRIPT" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR.json" "$THE_HTML_FOLDER/_/index.html" 


