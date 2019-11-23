#!/bin/sh 

THE_CURRENT_PATH=$(dirname $(readlink -f $0))

export MY_SCENTREE_ENVIRONMENT="dev"
export THE_DATABASE_NAME="dev_gis"

THE_DEV_PATH=/home/maxime/dev_BDD

THE_TARGET_PATH="$THE_DEV_PATH"
THE_PYTHON_SCRIPT_FOLDER="$THE_CURRENT_PATH/../python_script"
THE_SECRET_DATA_FOLDER="$THE_TARGET_PATH/BDD"

THE_FOLDER_CONTAING_THE_TILES_FOLDERS="/var/lib/mod_tile"
THE_EN_OSM_TILE_FOLDER="$THE_FOLDER_CONTAING_THE_TILES_FOLDERS/dev-scentree-map-en"
THE_FR_OSM_TILE_FOLDER="$THE_FOLDER_CONTAING_THE_TILES_FOLDERS/dev-scentree-map-fr"

THE_SOURCE_OSM_STYLE_PATH="$THE_CURRENT_PATH/../osm_style"
THE_TARGET_OSM_STYLE_PATH="$THE_TARGET_PATH/style"

does_the_en_var_exist () {
        if [ -z "$1" ]
        then
                echo "The env var $2 (= $1) does not exist -> Aborting"
                ABORT_PLEASE=1;
        fi
}
does_the_folder_exist () {
        if [ ! -d "$1" ]
        then
                echo "The folder $2 (= $1) does not exist -> Aborting"
                ABORT_PLEASE=1;
        fi
}
does_the_en_var_exist "$MY_SCENTREE_ENVIRONMENT" "MY_SCENTREE_ENVIRONMENT"
does_the_en_var_exist "$THE_SECRET_PSWRD" "THE_SECRET_PSWRD"
does_the_en_var_exist "$THE_DATABASE_NAME" "THE_DATABASE_NAME"

does_the_folder_exist "$THE_TARGET_PATH" "THE_TARGET_PATH"
does_the_folder_exist "$THE_PYTHON_SCRIPT_FOLDER" "THE_PYTHON_SCRIPT_FOLDER"
does_the_folder_exist "$THE_SECRET_DATA_FOLDER" "THE_SECRET_DATA_FOLDER":

does_the_folder_exist "$THE_SOURCE_OSM_STYLE_PATH" "THE_SOURCE_OSM_STYLE_PATH"
does_the_folder_exist "$THE_TARGET_OSM_STYLE_PATH" "THE_TARGET_OSM_STYLE_PATH"
does_the_folder_exist "$THE_FOLDER_CONTAING_THE_TILES_FOLDERS" "THE_FOLDER_CONTAING_THE_TILES_FOLDERS"

if [ ! -z "$ABORT_PLEASE" ]
then
        echo "Exiting with code 1"
        exit 1;
fi

cp -r "$THE_SOURCE_OSM_STYLE_PATH"/*  "$THE_TARGET_OSM_STYLE_PATH/"
cat "$THE_TARGET_OSM_STYLE_PATH/inc/datasource-settings.xml.inc.template" | envsubst > "$THE_TARGET_OSM_STYLE_PATH/inc/datasource-settings.xml.inc"
echo "Entering lm-travtree.py …"
python3 "$THE_PYTHON_SCRIPT_FOLDER/lm-travtree.py";

if [ $? -ne 0 ]
then
        echo "Something went wrong inside lm-travtree.py -> Aborting"
        cat "$THE_SECRET_DATA_FOLDER/result.json"
        echo ""
        exit 1;
fi
echo "lm-travtree.py : done :-)"

rm -r "$THE_EN_OSM_TILE_FOLDER"/*
rm -r "$THE_FR_OSM_TILE_FOLDER"/*

echo "-------------------"
echo "create new map and json files : done :-)"
exit 0;
