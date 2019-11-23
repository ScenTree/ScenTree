#!/bin/sh 

THE_CURRENT_PATH=$(dirname $(readlink -f $0))

if [ -z "$MY_SCENTREE_ENVIRONMENT" ] # if env var is set, continue
then
        echo "The env var MY_SCENTREE_ENVIRONMENT is not set -> Aborting"
        exit 1;
fi
echo "MY_SCENTREE_ENVIRONMENT = $MY_SCENTREE_ENVIRONMENT"

THE_PROD_PATH=/home/maxime/prod_BDD
THE_PRE_PROD_PATH=/home/maxime/pre_prod_BDD
THE_DEV_PATH=/home/maxime/dev_BDD

if [ "$MY_SCENTREE_ENVIRONMENT" = "prod" ]
then
        THE_TARGET_PATH="$THE_PROD_PATH"
elif [ "$MY_SCENTREE_ENVIRONMENT" = "pre_prod" ]
then
	THE_TARGET_PATH="$THE_PRE_PROD_PATH"
else  #dev
	THE_TARGET_PATH="$THE_DEV_PATH"
fi

if [ "$MY_SCENTREE_ENVIRONMENT" = "prod" ]
then
	THE_SOURCE_HTML_PATH="$THE_PRE_PROD_PATH/html"
else
	THE_SOURCE_HTML_PATH="$THE_CURRENT_PATH/../html"
fi
THE_TARGET_HTML_PATH="$THE_TARGET_PATH/html"

if [ "$MY_SCENTREE_ENVIRONMENT" = "prod" ]
then
        THE_SOURCE_OSM_STYLE_PATH="$THE_PRE_PROD_PATH/style"
else
        THE_SOURCE_OSM_STYLE_PATH="$THE_CURRENT_PATH/../osm_style"
fi
THE_TARGET_OSM_STYLE_PATH="$THE_TARGET_PATH/style"

if [ "$MY_SCENTREE_ENVIRONMENT" = "prod" ]
then
       THE_EN_OSM_TILE_FOLDER="/var/lib/mod_tile/scentree-map-en"
       THE_FR_OSM_TILE_FOLDER="/var/lib/mod_tile/scentree-map-fr"
elif [ "$MY_SCENTREE_ENVIRONMENT" = "pre_prod" ]
then
	THE_EN_OSM_TILE_FOLDER="/var/lib/mod_tile/pre_prod-scentree-map-en"
	THE_EN_OSM_TILE_FOLDER="/var/lib/mod_tile/pre_prod-scentree-map-fr"
else  #dev
	THE_EN_OSM_TILE_FOLDER="/var/lib/mod_tile/dev-scentree-map-en"
	THE_FR_OSM_TILE_FOLDER="/var/lib/mod_tile/dev-scentree-map-fr"
fi      

THE_PYTHON_SCRIPT_FOLDER="$THE_CURRENT_PATH/../python_script"

THE_SECRET_DATA_FOLDER="$THE_TARGET_PATH/BDD"

THE_SOLR_PATH="/home/scentree/src/solr-8.1.1"
THE_SOLR_SERVER_PATH="$THE_SOLR_PATH/server/solr"

if [ "$MY_SCENTREE_ENVIRONMENT" = "prod" ]
then
	THE_SOURCE_SOLR_CONFIG_PATH="$THE_SOLR_SERVER_PATH/pre_prod_taxoEN/conf"
else
	THE_SOURCE_SOLR_CONFIG_PATH="$THE_CURRENT_PATH/../solr"
fi

if [ "$MY_SCENTREE_ENVIRONMENT" = "prod" ]
then
	THE_EN_SOLR_CORE="taxoEN"
	THE_FR_SOLR_CORE="taxoFR"
	THE_EN_and_FR_SOLR_CORE="taxoENandFR"
elif [ "$MY_SCENTREE_ENVIRONMENT" = "pre_prod" ]
then
        THE_EN_SOLR_CORE="pre_prod__taxoEN"
        THE_FR_SOLR_CORE="pre_prod__taxoFR"
        THE_EN_and_FR_SOLR_CORE="pre_prod__taxoENandFR"
else  #dev
	THE_EN_SOLR_CORE="dev_taxoEN"
	THE_FR_SOLR_CORE="dev_taxoFR"
	THE_EN_and_FR_SOLR_CORE="dev_taxoENandFR"
fi

THE_TARGET_SOLR_CONFIG_PATH__EN="$THE_SOLR_SERVER_PATH/$THE_EN_SOLR_CORE/conf"
THE_TARGET_SOLR_CONFIG_PATH__FR="$THE_SOLR_SERVER_PATH/$THE_FR_SOLR_CORE/conf"
THE_TARGET_SOLR_CONFIG_PATH__EN_and_FR="$THE_SOLR_SERVER_PATH/$THE_EN_and_FR_SOLR_CORE/conf"



if [ -z "$THE_SECRET_PSWRD" ] # if env var is set, continue
then
	echo "The env var THE_SECRET_PSWRD is not set -> Aborting"
	ABORT_PLEASE=1;
fi
if [ -z "$THE_DATABASE_NAME" ] # if env var is set, continue
then
        echo "The env var THE_DATABASE_NAME is not set -> Aborting"
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

does_the_folder_exist "$THE_EN_OSM_TILE_FOLDER" "THE_EN_OSM_TILE_FOLDER"
does_the_folder_exist "$THE_FR_OSM_TILE_FOLDER" "THE_FR_OSM_TILE_FOLDER"

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

cp -r "$THE_SOURCE_HTML_PATH"/* "$THE_TARGET_HTML_PATH/"
cat "$THE_TARGET_OSM_STYLE_PATH/js/main.js.template" | envsubst > "$THE_TARGET_OSM_STYLE_PATH/js/main.js"

if [ "$MY_SCENTREE_ENVIRONMENT" = "pre_prod" -o "$MY_SCENTREE_ENVIRONMENT" = "prod" ]
then
	ln -s "$THE_TARGET_HTML_PATH/_/post_index.html" "$THE_TARGET_HTML_PATH/_/index.html"
        ln -s "$THE_TARGET_HTML_PATH/_/index.html" "$THE_TARGET_HTML_PATH/index.html"
else
	ln -s "$THE_TARGET_HTML_PATH/_/pre_index.html" "$THE_TARGET_HTML_PATH/_/index.html"	
fi

cp -r "$THE_SOURCE_OSM_STYLE_PATH"/*  "$THE_TARGET_OSM_STYLE_PATH/"
cat "$THE_TARGET_OSM_STYLE_PATH/inc/datasource-settings.xml.inc.template" | envsubst > "$THE_TARGET_OSM_STYLE_PATH/inc/datasource-settings.xml.inc"

cp "$THE_PYTHON_SCRIPT_FOLDER/lm-travtree.py" "$THE_SECRET_DATA_FOLDER/"
echo "Entering lm-travtree.py …"
python3 "$THE_SECRET_DATA_FOLDER/lm-travtree.py";

if [ $? -ne 0 ]
then
	echo "Something went wrong inside lm-travtree.py -> Aborting"
   	cat "$THE_SECRET_DATA_FOLDER/result.json"
	echo ""
	exit 1;
fi
echo "lm-travtree.py : done :-)"

# delete old config of solr dev_taxo, copy new config inside solr dev_taxo, 
# delete old data in solr dev_taxo, post new data in solr dev_taxo,
# delete old osm-style xml from dev-mapnik, copy new osm-style xml to dev-mapnik

echo "Entering scentree user …"
su - scentree -c "\
	cp -r \"$THE_SOURCE_SOLR_CONFIG_PATH\"/* \"$THE_TARGET_SOLR_CONFIG_PATH__EN/\";\
        cp -r \"$THE_SOURCE_SOLR_CONFIG_PATH\"/* \"$THE_TARGET_SOLR_CONFIG_PATH__FR/\";\
        cp -r \"$THE_SOURCE_SOLR_CONFIG_PATH\"/* \"$THE_TARGET_SOLR_CONFIG_PATH__EN_and_FR/\";\
        \
	sudo -S rm -r \"$THE_EN_OSM_TILE_FOLDER\"/*;\
	sudo -S rm -r \"$THE_FR_OSM_TILE_FOLDER\"/*;\
	echo 'posting datas inside solr cores …';\
	curl \"http://localhost:8983/solr/$THE_EN_SOLR_CORE/update?commit=true\" -d '<delete><query>*:*</query></delete>';\
	curl \"http://localhost:8983/solr/$THE_FR_SOLR_CORE/update?commit=true\" -d '<delete><query>*:*</query></delete>';\
	curl \"http://localhost:8983/solr/$THE_EN_and_FR_SOLR_CORE/update?commit=true\" -d '<delete><query>*:*</query></delete>';\
	\"$THE_SOLR_PATH/bin/post\" -c $THE_EN_SOLR_CORE \"$THE_SECRET_DATA_FOLDER/TreeFeaturesNEW_EN.json\";\
	\"$THE_SOLR_PATH/bin/post\" -c $THE_FR_SOLR_CORE \"$THE_SECRET_DATA_FOLDER/TreeFeaturesNEW_FR.json\";\
	\"$THE_SOLR_PATH/bin/post\" -c $THE_EN_and_FR_SOLR_CORE \"$THE_SECRET_DATA_FOLDER/TreeFeaturesNEW_EN_and_FR.json\"\
	"
echo "scentree user part : done :-)"

# nodejs scripts
nodejs completer_le_pre_index_html.js "$THE_TARGET_HTML_PATH"

echo "All done :-)"
exit 0;
