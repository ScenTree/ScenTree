#!/bin/sh 

THE_CURRENT_PATH=$(dirname $(readlink -f $0))
THE_TARGET_PATH=/home/maxime/dev_BDD

THE_SOURCE_HTML_PATH="$THE_CURRENT_PATH"/../html
THE_TARGET_HTML_PATH="$THE_TARGET_PATH"/html

THE_SOURCE_OSM_STYLE_PATH="$THE_CURRENT_PATH"/../osm_style
THE_TARGET_OSM_STYLE_PATH="$THE_TARGET_PATH"/html

THE_SOLR_PATH=/home/scentree/src/solr-8.1.1/server/solr
THE_SOURCE_SOLR_CONFIG_PATH="$THE_CURRENT_PATH"/../solr


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
does_the_folder_exist "$THE_SOLR_PATH" "THE_SOLR_PATH"
does_the_folder_exist "$THE_SOURCE_SOLR_CONFIG_PATH" "THE_SOURCE_SOLR_CONFIG_PATH"

if [ ! -z "$ABORT_PLEASE" ]
then
        echo "Exiting with code 1"
	exit 1;
fi

exit 0;

# get the Scentree folder from the path of the shell script

# cp from the Scentree folder to dev_BDD's folders (style, html - no nodejs_scripts in dev env) and to solr conf folder
# also set password inside style's datasource conf file
cp -r "$THE_CURRENT_PATH"/../html/* /home/maxime/dev_BDD/BDD/html/
ln -s /home/maxime/dev_BDD/BDD/html/pre_index.html /home/maxime/dev_BDD/BDD/html/index.html
cp "$THE_CURRENT_PATH"/../style/*  /home/maxime/dev_BDD/BDD/syle/

# main.js gloval var set to "dev", 
# ln -s pre_index.html index.html, 
# delete old config of solr dev_taxo, copy new config inside solr dev_taxo, 
# delete old data in solr dev_taxo, post new data in solr dev_taxo,
# delete old osm-style xml from dev-mapnik, copy new osm-style xml to dev-mapnik

MY_SCENTREE_ENVIRONMENT="dev"
python3 /home/maxime/dev_BDD/ScenTree/python_script/lm-travtree.py

su - scentree -c "\
	cp ../solr/ /home/scentree/src/solr-8.1.1/server/solr/dev_taxoEN/conf/
        cp ../solr/ /home/scentree/src/solr-8.1.1/server/solr/dev_taxoFR/conf/
        cp ../solr/ /home/scentree/src/solr-8.1.1/server/solr/dev_taxoENandFR/conf/
        
	sudo -S rm -r /var/lib/mod_tile/dev-scentree-map-en/;\
	sudo -S rm -r /var/lib/mod_tile/dev-scentree-map-fr/;\
	curl http://localhost:8983/solr/dev_taxoEN/update?commit=true -d '<delete><query>*:*</query></delete>;\
	curl http://localhost:8983/solr/dev_taxoFR/update?commit=true -d '<delete><query>*:*</query></delete>';\
	curl http://localhost:8983/solr/dev_taxoENandFR/update?commit=true -d '<delete><query>*:*</query></delete>';\
	~/src/solr-8.1.1/bin/post -c dev_taxoEN /home/maxime/dev_BDD/BDD/TreeFeaturesNEW_EN.json;\
	~/src/solr-8.1.1/bin/post -c dev_taxoFR /home/maxime/dev_BDD/BDD/TreeFeaturesNEW_FR.json;\
	~/src/solr-8.1.1/bin/post -c dev_taxoENandFR /home/maxime/dev_BDD/BDD/TreeFeaturesNEW_EN_and_FR.json\
	"


