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
THE_INGREDIENT_GENERATOR_SCRIPT="$THE_NODEJS_SCRIPTS_FOLDER/generate_lists_of_ingredients.js"
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
if [ ! -f "$THE_INGREDIENT_GENERATOR_SCRIPT" ]
then
	echo "Script '$THE_INGREDIENT_GENERATOR_SCRIPT' not found !"
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


cd "$THE_NODEJS_SCRIPTS_FOLDER"
npm install jsdom
npm install jsonfile
cd -
node "$THE_COUNTING_SCRIPT" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR.json" "$THE_HTML_FOLDER/_/menu.html"
node "$THE_DESCRIPTOR_GENERATOR_SCRIPT" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR.json" "$THE_HTML_FOLDER/_/listdescriptors.html"
node "$THE_INGREDIENT_GENERATOR_SCRIPT" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR.json" "$THE_HTML_FOLDER/_/listingredient.html"

the_number_of_elements=$(cat "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR.json" | python3 -c "import sys, json; ll = json.load(sys.stdin); print(len(ll));")
the_counter=0
echo "the_number_of_elements = $the_number_of_elements"
while [ $the_counter -lt $the_number_of_elements ]
do
	the_max=$(expr $the_counter + 100)
	if [ $the_max -gt $the_number_of_elements ]
	then
		the_max=$the_number_of_elements
	fi

	node "$THE_HTML_PAGES_GENERATOR_SCRIPT" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR.json" "$THE_HTML_FOLDER/_/index.html" $the_counter  $the_max
	echo "the_min = $the_counter ; the_max = $the_max"

	the_counter=$(expr $the_counter + 100)
done


