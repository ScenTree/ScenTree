#!/bin/sh 

THE_CURRENT_PATH=$(dirname $(readlink -f $0))

THE_DEV_PATH=/home/maxime/dev_BDD
THE_TARGET_PATH="$THE_DEV_PATH"
THE_SECRET_DATA_FOLDER="$THE_TARGET_PATH/BDD"

THE_EN_SOLR_CORE="dev_taxoEN"
THE_FR_SOLR_CORE="dev_taxoFR"
THE_EN_and_FR_SOLR_CORE="dev_taxoENandFR"

THE_JSON_DATA__EN="$THE_SECRET_DATA_FOLDER/TreeFeaturesNEW_EN.json"
THE_JSON_DATA__FR="$THE_SECRET_DATA_FOLDER/TreeFeaturesNEW_FR.json"
THE_JSON_DATA__EN_and_FR="$THE_SECRET_DATA_FOLDER/TreeFeaturesNEW_EN_and_FR.json"

THE_SOLR_PATH="/home/scentree/src/solr-8.1.1"
THE_SOLR_SERVER_PATH="$THE_SOLR_PATH/server/solr"


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

does_the_folder_exist "$THE_TARGET_PATH" "THE_TARGET_PATH"
does_the_folder_exist "$THE_SECRET_DATA_FOLDER" "THE_SECRET_DATA_FOLDER":

does_the_folder_exist "$THE_SOLR_PATH" "THE_SOLR_PATH"
does_the_folder_exist "$THE_SOLR_SERVER_PATH" "THE_SOLR_SERVER_PATH"

does_the_file_exist "$THE_JSON_DATA__EN" "THE_JSON_DATA__EN"
does_the_file_exist "$THE_JSON_DATA__FR" "THE_JSON_DATA__FR"
does_the_file_exist "$THE_JSON_DATA__EN_and_FR" "THE_JSON_DATA__EN_and_FR"


if [ ! -z "$ABORT_PLEASE" ]
then
        echo "Exiting with code 1"
        exit 1;
fi

echo "Entering scentree user …"
su - scentree -c "\
        echo 'posting datas inside solr cores …';\
        curl \"http://localhost:8983/solr/$THE_EN_SOLR_CORE/update?commit=true\" -d '<delete><query>*:*</query></delete>';\
        curl \"http://localhost:8983/solr/$THE_FR_SOLR_CORE/update?commit=true\" -d '<delete><query>*:*</query></delete>';\
        curl \"http://localhost:8983/solr/$THE_EN_and_FR_SOLR_CORE/update?commit=true\" -d '<delete><query>*:*</query></delete>';\
        \"$THE_SOLR_PATH/bin/post\" -c $THE_EN_SOLR_CORE \"$THE_JSON_DATA_EN\";\
        \"$THE_SOLR_PATH/bin/post\" -c $THE_FR_SOLR_CORE \"$THE_JSON_DATA__FR\";\
        \"$THE_SOLR_PATH/bin/post\" -c $THE_EN_and_FR_SOLR_CORE \"$THE_JSON_DATA__EN_and_FR\"\
        "

THE_RESULT=$?
echo "----------------------"

if [ THE_RESULT -ne 0 ]
then
    	echo "Problem while entering scentree user ! Stopping :-("
	exit 1;
fi

echo "scentree user part (populate solr for the dev env) : done :-)"
exit 0;

