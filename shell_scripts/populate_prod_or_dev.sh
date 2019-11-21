#!/bin/sh 

THE_CURRENT_PATH=$(dirname $(readlink -f $0))

if [ -z "$MY_SCENTREE_ENVIRONMENT" ] # if env var is set, continue
then
        echo "The env var MY_SCENTREE_ENVIRONMENT is not set -> Aborting"
        exit 1;
fi
echo "MY_SCENTREE_ENVIRONMENT = $MY_SCENTREE_ENVIRONMENT"


THE_TARGET_PATH=/home/maxime/dev_BDD

THE_SOURCE_HTML_PATH="$THE_CURRENT_PATH"/../html
THE_TARGET_HTML_PATH="$THE_TARGET_PATH"/html

THE_SOURCE_OSM_STYLE_PATH="$THE_CURRENT_PATH"/../osm_style
THE_TARGET_OSM_STYLE_PATH="$THE_TARGET_PATH"/style

THE_PYTHON_SCRIPT_FOLDER="$THE_CURRENT_PATH"/../python_script

THE_SECRET_DATA_FOLDER="$THE_TARGET_PATH"/BDD

THE_SOLR_PATH=/home/scentree/src/solr-8.1.1
THE_SOLR_SERVER_PATH="$THE_SOLR_PATH"/server/solr
THE_SOURCE_SOLR_CONFIG_PATH="$THE_CURRENT_PATH"/../solr
THE_EN_SOLR_CORE="dev_taxoEN"
THE_FR_SOLR_CORE="dev_taxoFR"
THE_EN_and_FR_SOLR_CORE="dev_taxoENandFR"
THE_TARGET_SOLR_CONFIG_PATH__EN="$THE_SOLR_SERVER_PATH"/"$THE_EN_SOLR_CORE"/conf
THE_TARGET_SOLR_CONFIG_PATH__FR="$THE_SOLR_SERVER_PATH"/"$THE_FR_SOLR_CORE"/conf
THE_TARGET_SOLR_CONFIG_PATH__EN_and_FR="$THE_SOLR_SERVER_PATH"/"$THE_EN_and_FR_SOLR_CORE"/conf



if [ -z "$THE_SECRET_PSWRD" ] # if env var is set, continue
then
	echo "The env var THE_SECRET_PSWRD is not set -> Aborting"
	ABORT_PLEASE=1;
fi

does_the_folder_exist () {
        if [ ! -d "$1" ]
        then
		echo "The folder $2 (= $1) does not exist -> Aborting"
                ABORT_PLEASE=1;
        fi
}
does_the_folder_exist "$THE_TARGET_PATH" "THE_TARGET_PATH"
does_the_folder_exist "$THE_SOURCE_HTML_PATH" "THE_SOURCE_HTML_PATH"
does_the_folder_exist "$THE_TARGET_HTML_PATH" "THE_TARGET_HTML_PATH"
does_the_folder_exist "$THE_SOURCE_OSM_STYLE_PATH" "THE_SOURCE_OSM_STYLE_PATH"
does_the_folder_exist "$THE_TARGET_OSM_STYLE_PATH" "THE_TARGET_OSM_STYLE_PATH"
does_the_folder_exist "$THE_PYTHON_SCRIPT_FOLDER" "THE_PYTHON_SCRIPT_FOLDER"
does_the_folder_exist "$THE_SECRET_DATA_FOLDER" "THE_SECRET_DATA_FOLDER":
does_the_folder_exist "$THE_SOLR_PATH" "THE_SOLR_PATH"
does_the_folder_exist "$THE_SOLR_SERVER_PATH" "THE_SOLR_SERVER_PATH"
does_the_folder_exist "$THE_SOURCE_SOLR_CONFIG_PATH" "THE_SOURCE_SOLR_CONFIG_PATH"
does_the_folder_exist "$THE_TARGET_SOLR_CONFIG_PATH__EN" "THE_TARGET_SOLR_CONFIG_PATH__EN"
does_the_folder_exist "$THE_TARGET_SOLR_CONFIG_PATH__FR" "THE_TARGET_SOLR_CONFIG_PATH__FR"
does_the_folder_exist "$THE_TARGET_SOLR_CONFIG_PATH__EN_and_FR" "THE_TARGET_SOLR_CONFIG_PATH__EN_and_FR"


if [ ! -z "$ABORT_PLEASE" ]
then
        echo "Exiting with code 1"
	exit 1;
fi


# cp from the Scentree folder to dev_BDD's folders (style, html - no nodejs_scripts in dev env) and to solr conf folder
# also set password inside style's datasource conf file
# main.js gloval var set to "dev", 
cp -r "$THE_SOURCE_HTML_PATH"/* "$THE_TARGET_OSM_STYLE_PATH"/
ln -s "$THE_TARGET_OSM_STYLE_PATH"/_/pre_index.html "$THE_TARGET_OSM_STYLE_PATH"/_/index.html
cp -r "$THE_SOURCE_OSM_STYLE_PATH"/*  "$THE_TARGET_OSM_STYLE_PATH"/

python3 "$THE_PYTHON_SCRIPT_FOLDER"/lm-travtree.py

# delete old config of solr dev_taxo, copy new config inside solr dev_taxo, 
# delete old data in solr dev_taxo, post new data in solr dev_taxo,
# delete old osm-style xml from dev-mapnik, copy new osm-style xml to dev-mapnik


su - scentree -c "\
	cp -r \"$THE_SOURCE_SOLR_CONFIG_PATH\"/* \"$THE_TARGET_SOLR_CONFIG_PATH__EN\"/
        cp -r \"$THE_SOURCE_SOLR_CONFIG_PATH\"/* \"$THE_TARGET_SOLR_CONFIG_PATH__FR\"/
        cp -r \"$THE_SOURCE_SOLR_CONFIG_PATH\"/* \"$THE_TARGET_SOLR_CONFIG_PATH__EN_and_FR\"/
        
	sudo -S rm -r /var/lib/mod_tile/dev-scentree-map-en/;\
	sudo -S rm -r /var/lib/mod_tile/dev-scentree-map-fr/;\
	curl http://localhost:8983/solr/$THE_EN_SOLR_CORE/update?commit=true -d '<delete><query>*:*</query></delete>;\
	curl http://localhost:8983/solr/$THE_FR_SOLR_CORE/update?commit=true -d '<delete><query>*:*</query></delete>';\
	curl http://localhost:8983/solr/$THE_EN_and_FR_SOLR_CORE/update?commit=true -d '<delete><query>*:*</query></delete>';\
	$THE_SOLR_PATH/bin/post -c $THE_EN_SOLR_CORE /home/maxime/dev_BDD/BDD/TreeFeaturesNEW_EN.json;\
	$THE_SOLR_PATH/bin/post -c $THE_FR_SOLR_CORE /home/maxime/dev_BDD/BDD/TreeFeaturesNEW_FR.json;\
	$THE_SOLR_PATH/bin/post -c $THE_EN_and_FR_SOLR_CORE /home/maxime/dev_BDD/BDD/TreeFeaturesNEW_EN_and_FR.json\
	"


