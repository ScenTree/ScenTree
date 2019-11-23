#!/bin/sh 

THE_CURRENT_PATH=$(dirname $(readlink -f $0))

THE_EN_SOLR_CORE="dev_taxoEN"
THE_FR_SOLR_CORE="dev_taxoFR"
THE_EN_and_FR_SOLR_CORE="dev_taxoENandFR"

THE_SOURCE_SOLR_CONFIG_PATH="$THE_CURRENT_PATH/../solr"
THE_SOLR_PATH="/home/scentree/src/solr-8.1.1"
THE_SOLR_SERVER_PATH="$THE_SOLR_PATH/server/solr"

THE_TARGET_SOLR_CONFIG_PATH__EN="$THE_SOLR_SERVER_PATH/$THE_EN_SOLR_CORE/conf"
THE_TARGET_SOLR_CONFIG_PATH__FR="$THE_SOLR_SERVER_PATH/$THE_FR_SOLR_CORE/conf"
THE_TARGET_SOLR_CONFIG_PATH__EN_and_FR="$THE_SOLR_SERVER_PATH/$THE_EN_and_FR_SOLR_CORE/conf"


does_the_folder_exist () {
        if [ ! -d "$1" ]
        then
                echo "The folder $2 (= $1) does not exist -> Aborting"
                ABORT_PLEASE=1;
        fi
}
does_the_file_exist () {
        if [ ! -f "$1" ]
        then
                echo "The file $2 (= $1) does not exist -> Aborting"
                ABORT_PLEASE=1;
        fi
}

does_the_folder_exist "$THE_SOURCE_SOLR_CONFIG_PATH" "THE_SOURCE_SOLR_CONFIG_PATH"
does_the_folder_exist "$THE_SOLR_PATH" "THE_SOLR_PATH"
does_the_folder_exist "$THE_SOLR_SERVER_PATH" "THE_SOLR_SERVER_PATH"

does_the_folder_exist "$THE_TARGET_SOLR_CONFIG_PATH__EN" "THE_TARGET_SOLR_CONFIG_PATH__EN"
does_the_folder_exist "$THE_TARGET_SOLR_CONFIG_PATH__FR" "THE_TARGET_SOLR_CONFIG_PATH__FR"
does_the_folder_exist "$THE_TARGET_SOLR_CONFIG_PATH__EN_and_FR" "THE_TARGET_SOLR_CONFIG_PATH__EN_and_FR"


if [ ! -z "$ABORT_PLEASE" ]
then
        echo "Exiting with code 1"
        exit 1;
fi

echo "Entering scentree user …"
su - scentree -c "\
        cp -r \"$THE_SOURCE_SOLR_CONFIG_PATH\"/* \"$THE_TARGET_SOLR_CONFIG_PATH__EN/\";\
        cp -r \"$THE_SOURCE_SOLR_CONFIG_PATH\"/* \"$THE_TARGET_SOLR_CONFIG_PATH__FR/\";\
        cp -r \"$THE_SOURCE_SOLR_CONFIG_PATH\"/* \"$THE_TARGET_SOLR_CONFIG_PATH__EN_and_FR/\";\
        \
        echo 'restarting the solr server …';\
        \"$THE_SOLR_PATH/bin/solr\" restart;\
        "
echo "----------------------"
echo "updating solr conf for the dev env : done :-)"

exit 0;

