#!/bin/sh 

PLEASE_STOP=0
if [ -z "$THE_SECRET_PSWRD" ] 
then
	echo "Please set THE_SECRET_PSWRD env variable, aborting"
	PLEASE_STOP=1
fi

THE_FILES_FOLDER="../files"
THE_PYTHON_SCRIPTS_FOLDER="../ScenTree/python_script"
THE_ENVIRONMENT="$1"

if [ -f "$THE_FILES_FOLDER" ]
then
	echo "Folder '$THE_FILES_FOLDER' not found !"
	PLEASE_STOP=1
fi
if [ -f "$THE_PYTHON_SCRIPTS_FOLDER" ]
then
        echo "Folder '$THE_PYTHON_SCRIPTS_FOLDER' not found !"
        PLEASE_STOP=1
fi

# first abort if problem
if [ "$PLEASE_STOP" -eq 1 ]
then
        echo "aborting !"
        exit 1
fi

THE_LM_TRAVTREE_SCRIPT="$THE_PYTHON_SCRIPTS_FOLDER/lm-travtree.py"
THE_PRO_OR_IFRA_SCRIPT="$THE_PYTHON_SCRIPTS_FOLDER/from_pro_csv_to_updated_jsons.py"
THE_INTER_LINKS_SCRIPT="$THE_PYTHON_SCRIPTS_FOLDER/do_inter_links.py"

if [ -f "$THE_LM_TRAVTREE_SCRIPT" ]
then
        echo "Script '$THE_LM_TRAVTREE_SCRIPT' not found !"
        PLEASE_STOP=1
fi
if [ -f "$THE_PRO_OR_IFRA_SCRIPT" ]
then
        echo "Script '$THE_PRO_OR_IFRA_SCRIPT' not found !"
        PLEASE_STOP=1
fi
if [ -f "$THE_INTER_LINKS_SCRIPT" ]
then
        echo "Script '$THE_INTER_LINKS_SCRIPT' not found !"
        PLEASE_STOP=1
fi


# second abort if problem
if [ "$PLEASE_STOP" -eq 1 ]
then
	echo "aborting !"
	exit 1
fi


echo "THE_ENVIRONMENT = $THE_ENVIRONMENT"
echo "Files like 'TreeFeaturesNEW_EN_and_FR.json' inside the files folder ('$THE_FILES_FOLDER') will be overwritten"


echo "Lauching lm-travtree …"
python3 "$THE_LM_TRAVTREE_SCRIPT" "$THE_ENVIRONMENT" "$THE_FILES_FOLDER"
echo "lm-travtree done !"

echo "Lauching from_pro_csv_to_updated_jsons.py (IFRA) …"
python3 "$THE_PRO_OR_IFRA_SCRIPT" "$THE_FILES_FOLDER/CSV_IFRA.csv" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR_original.json" "IFRA" > "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR__with_IFRA.json"
echo "from_pro_csv_to_updated_jsons.py (IFRA) done !"

echo "Lauching from_pro_csv_to_updated_jsons.py (PRO) …"
python3 "$THE_PRO_OR_IFRA_SCRIPT" "$THE_FILES_FOLDER/CSV_PRO.csv" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR__with_IFRA.json" "PRO" > "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR__with_IFRA_and_PRO.json"
echo "from_pro_csv_to_updated_jsons.py (PRO) done !"

echo "Lauching do_inter_links.py …"
python3 "$THE_INTER_LINKS_SCRIPT" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR__with_IFRA_and_PRO.json" > "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR.json"
echo "do_inter_links.py done !"


exit 0
