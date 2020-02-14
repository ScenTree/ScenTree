#!/usr/bin/python
# coding: utf8


import os, sys

import csv
import json


# reading json files, adding the csv content, output = json files updated

print("Usage = a .csv then a .json file in argument then a string that represents the key to be created inside the .json file, usually 'csv_PRO.csv' or 'csv_IFRA.csv' then 'TreeFeaturesNEW_EN_and_FR.json', then 'PRO' or 'IFRA'", file=sys.stderr)

PLEASE_QUIT = False

if len(sys.argv) == 4:
    THE_PATH_OF_THE_CSV_FILE = sys.argv[1]
    THE_PATH_OF_THE_JSONFILE = sys.argv[2]
    THE_DICT_KEY = sys.argv[3]
else:
    print("/!\ There should be 3 arguments, but only %s argument(s) detected" % (len(sys.argv) -1), file=sys.stderr)
    PLEASE_QUIT = True

if not PLEASE_QUIT:
    if not os.path.isfile(THE_PATH_OF_THE_CSV_FILE):
        print("THE_PATH_OF_THE_CSV_FILE", THE_PATH_OF_THE_CSV_FILE, "does not exists or is not a file", file=sys.stderr)
        PLEASE_QUIT = True
    if not os.path.isfile(THE_PATH_OF_THE_JSONFILE):
        print("THE_PATH_OF_THE_JSONFILE", THE_PATH_OF_THE_JSONFILE, "does not exists or is not a file", file=sys.stderr)
        PLEASE_QUIT = True

if PLEASE_QUIT:
    print("Usage incorrect -> Stop", file=sys.stderr)
    sys.exit(1)
else:
    print("Usage : correct :-)", file=sys.stderr)


# reading the CSV
the_csv_file = open(THE_PATH_OF_THE_CSV_FILE, 'r')
the_pros = [d for d in csv.DictReader(the_csv_file, delimiter=';')] # list of dicts with the keys = the header of the csv
the_csv_file.close()

# remove 'empty line' from the csv (=empty value inside the resulting dict)
the_pros = [{a_key : a_value for a_key, a_value in a_pro.items() if bool(a_value)} for a_pro in the_pros]


# reading the JSON
the_json_file = open(THE_PATH_OF_THE_JSONFILE, 'r')
the_ingredients = json.load(the_json_file)
the_json_file.close()

# updating the JSON ingredients with CSV infos
for an_ingredient in the_ingredients:
    for a_pro in the_pros:
        if int(a_pro["id"]) == int(an_ingredient["from_csv EN id"]):
            try:
                an_ingredient[THE_DICT_KEY].append(repr(a_pro))
            except KeyError:
                an_ingredient[THE_DICT_KEY] = [repr(a_pro)]


# echoing a JSON
print(json.dumps(the_ingredients, sort_keys=False, indent=4))
