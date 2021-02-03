#!/bin/sh 

PLEASE_STOP=0
if [ -z "$THE_SECRET_PSWRD" ] 
then
	echo "Please set THE_SECRET_PSWRD env variable, aborting"
	PLEASE_STOP=1
fi

THE_FILES_FOLDER="../../files"
THE_PYTHON_SCRIPTS_FOLDER="../python_script"
THE_ENVIRONMENT="$1"

if [ -z "$THE_ENVIRONMENT" ]
then
	echo "Please set a first argument (the environment, prod or dev), aborting"
        PLEASE_STOP=1
fi


if [ ! -d "$THE_FILES_FOLDER" ]
then
	echo "Folder '$THE_FILES_FOLDER' not found !"
	PLEASE_STOP=1
fi
if [ ! -d "$THE_PYTHON_SCRIPTS_FOLDER" ]
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

if [ ! -f "$THE_LM_TRAVTREE_SCRIPT" ]
then
        echo "Script '$THE_LM_TRAVTREE_SCRIPT' not found !"
        PLEASE_STOP=1
fi
if [ ! -f "$THE_PRO_OR_IFRA_SCRIPT" ]
then
        echo "Script '$THE_PRO_OR_IFRA_SCRIPT' not found !"
        PLEASE_STOP=1
fi
if [ ! -f "$THE_INTER_LINKS_SCRIPT" ]
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
THE_CODE_OF_THE_SCRIPT="$?"
if [ "$THE_CODE_OF_THE_SCRIPT" -ne 0 ]
then
	echo "lm-travtree : problem ! aborting …"
	exit 1
else
	echo "lm-travtree : done !"
fi

echo "Lauching from_pro_csv_to_updated_jsons.py (IFRA) …"
python3 "$THE_PRO_OR_IFRA_SCRIPT" "$THE_FILES_FOLDER/CSV_IFRA.csv" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR_original.json" "IFRA" > "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR__with_IFRA.json"
THE_CODE_OF_THE_SCRIPT="$?"
if [ "$THE_CODE_OF_THE_SCRIPT" -ne 0 ]
then
        echo "from_pro_csv_to_updated_jsons.py (IFRA) : problem ! aborting …"
        exit 1
else
	echo "from_pro_csv_to_updated_jsons.py (IFRA) done !"
fi


echo "Lauching from_pro_csv_to_updated_jsons.py (PRO) …"
python3 "$THE_PRO_OR_IFRA_SCRIPT" "$THE_FILES_FOLDER/CSV_PRO.csv" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR__with_IFRA.json" "PRO" > "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR__with_IFRA_and_PRO.json"
THE_CODE_OF_THE_SCRIPT="$?"
if [ "$THE_CODE_OF_THE_SCRIPT" -ne 0 ]
then
        echo "from_pro_csv_to_updated_jsons.py (PRO) : problem ! aborting …"
        exit 1
else
        echo "from_pro_csv_to_updated_jsons.py (PRO) done !"
fi

echo "Lauching do_inter_links.py …"
python3 "$THE_INTER_LINKS_SCRIPT" "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR__with_IFRA_and_PRO.json" > "$THE_FILES_FOLDER/TreeFeaturesNEW_EN_and_FR.json"
THE_CODE_OF_THE_SCRIPT="$?"
if [ "$THE_CODE_OF_THE_SCRIPT" -ne 0 ]
then
        echo "do_inter_links.py : problem ! aborting …"
        exit 1
else
	echo "do_inter_links.py done !"
fi


exit 0
