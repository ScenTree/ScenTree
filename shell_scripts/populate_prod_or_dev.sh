# 

THE_SECRET_PSWRD # if env var is set, continue

# get the Scentree folder from the path of the shell script

# cp from the Scentree folder to dev_BDD's folders (style, html - no nodejs_scripts in dev env) and to solr conf folder
# also set password inside style's datasource conf file



# main.js gloval var set to "dev", 
# ln -s pre_index.html index.html, 
# delete old config of solr dev_taxo, copy new config inside solr dev_taxo, 
# delete old data in solr dev_taxo, post new data in solr dev_taxo,
# delete old osm-style xml from dev-mapnik, copy new osm-style xml to dev-mapnik

MY_SCENTREE_ENVIRONMENT="dev"
python3 /home/maxime/dev_BDD/ScenTree/python_script/lm-travtree.py

su - scentree -c "\
	sudo -S rm -r /var/lib/mod_tile/dev-scentree-map-en/;\
	sudo -S rm -r /var/lib/mod_tile/dev-scentree-map-fr/;\
	curl http://localhost:8983/solr/dev_taxoEN/update?commit=true -d '<delete><query>*:*</query></delete>;\
	curl http://localhost:8983/solr/dev_taxoFR/update?commit=true -d '<delete><query>*:*</query></delete>';\
	curl http://localhost:8983/solr/dev_taxoENandFR/update?commit=true -d '<delete><query>*:*</query></delete>';\
	~/src/solr-8.1.1/bin/post -c dev_taxoEN /home/maxime/dev_BDD/BDD/TreeFeaturesNEW_EN.json;\
	~/src/solr-8.1.1/bin/post -c dev_taxoFR /home/maxime/dev_BDD/BDD/TreeFeaturesNEW_FR.json;\
	~/src/solr-8.1.1/bin/post -c dev_taxoENandFR /home/maxime/dev_BDD/BDD/TreeFeaturesNEW_EN_and_FR.json\
	"


