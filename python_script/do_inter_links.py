#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import json
import collections
import re

import commons


# one argument = TreeFeaturesNEW_EN_and_FR.json (JSON with both languages)

DEBUG = False


def compute_the_webpage_address(the_scentree_object):
    """
    the_scentree_object = json element
    """
    the_EN_name = the_scentree_object["from_csv EN Nom"]
    the_FR_name = the_scentree_object["from_csv FR Nom"]
    return commons.compute_the_webpage_address(the_EN_name, the_FR_name)


the_legit_keys_EN = []
the_legit_keys_FR = []
the_legit_keys_without_any_language = (
        "Origine geographique", 
        "Extractions", 
        "Botanique", 
        "Utilisation", 
        "Allergenes", 
        "composantsmajoritaires", 
        "autresremarques", 
        "Stabilite", 
        "chemotype", 
        "medecine", 
        "Synthese", 
        "Precurseurs", 
        "Isomerie", 
        "Presencenat"
        )
for a_legit_key in the_legit_keys_without_any_language:
    the_legit_keys_EN.append("from_csv EN " + a_legit_key)
    the_legit_keys_FR.append("from_csv FR " + a_legit_key)


# read the JSON file and get the link and what to be linked
the_new_ingredients_FR = []
the_new_ingredients_EN = []
the_new_ingredients_EN_and_FR = []
sys.stderr.write("Opening file '%s'" % sys.argv[1])
sys.stderr.flush()
with open(sys.argv[1], encoding='utf-8') as the_json_file:
    the_json = json.load(the_json_file)
    sys.stderr.write("File opened !")
    sys.stderr.flush()
    
    the_ingredients = [ an_element for an_element in the_json if len(an_element["from_csv EN id"]) == 5 ]
    
    # dictionaries { ingredient name EN or FR : ingredient as dict }, to be used in 'my_regexp_fonction'
    the_ingredients_by_name_EN = { an_element["from_csv EN Nom"].lower() : an_element for an_element in the_ingredients  }
    the_ingredients_by_name_FR = { an_element["from_csv FR Nom"].lower() : an_element for an_element in the_ingredients  }

    for an_ingredient in the_ingredients:
        sys.stderr.write("Treading ingredient %s" % an_ingredient["from_csv FR Nom"])
        sys.stderr.flush()

        the_new_ingredient_EN = {}
        the_new_ingredient_FR = {}
        def my_regexp_fonction_for_one_language(matchobj, the_ingredients_by_name_for_a_language):
            """
            mandatory : 3 catches with parenthesis (matchobj.group(1), matchobj.group(2), matchobj.group(3))
            """
            the_name_in_a_language_of_an_ingredient = matchobj.group(2)
            the_link_in_html = "<a class='interpop' href='%s'>%s</a>" % (compute_the_webpage_address(the_ingredients_by_name_for_a_language[the_name_in_a_language_of_an_ingredient.lower()]), the_name_in_a_language_of_an_ingredient)
            the_replacement_text = ""
            if matchobj.group(1):
                the_replacement_text += matchobj.group(1)
            the_replacement_text += the_link_in_html
            if matchobj.group(3):
                the_replacement_text += matchobj.group(3)
            return the_replacement_text
        def my_regexp_fonction_for_EN_language(matchobj):
            return my_regexp_fonction_for_one_language(matchobj, the_ingredients_by_name_EN)
        def my_regexp_fonction_for_FR_language(matchobj):
            return my_regexp_fonction_for_one_language(matchobj, the_ingredients_by_name_FR)
       
        # for language EN
        the_ingredients_to_be_replaced = [ an_other_ingredient for an_other_ingredient in sorted(the_ingredients_by_name_EN, key = len, reverse = True) if an_other_ingredient.lower() != an_ingredient["from_csv EN Nom"].lower() ]
        p = re.compile(r"(^|[\s.,;:?!'(])(%s)($|[\s.,;:?!')])" % "|".join(the_ingredients_to_be_replaced), flags=re.IGNORECASE)
        for a_key, a_value in an_ingredient.items():
            if a_key in the_legit_keys_EN:
                the_text = p.sub(my_regexp_fonction_for_EN_language, a_value)
                if DEBUG and the_text != a_value:
                    sys.stderr.write("\n" + a_value + "\n replaced by \n" + the_text + "\n")
                the_new_ingredient_EN[a_key] = the_text
            else:
                the_new_ingredient_EN[a_key] = a_value

        # for language FR
        the_ingredients_to_be_replaced = [ an_other_ingredient for an_other_ingredient in sorted(the_ingredients_by_name_FR, key = len, reverse = True) if an_other_ingredient.lower() != an_ingredient["from_csv FR Nom"].lower() ]
        p = re.compile(r"(^|[\s.,;:?!'(])(%s)($|[\s.,;:?!')])" % "|".join(the_ingredients_to_be_replaced), flags=re.IGNORECASE)
        for a_key, a_value in an_ingredient.items():
            if a_key in the_legit_keys_FR:
                the_text = p.sub(my_regexp_fonction_for_FR_language, a_value)
                if DEBUG and the_text != a_value:
                    sys.stderr.write("\n" + a_value +"\n replaced by \n" + the_text + "\n")
                the_new_ingredient_FR[a_key] = the_text
            else:
                the_new_ingredient_FR[a_key] = a_value
        
        the_new_ingredients_EN.append(the_new_ingredient_EN)
        the_new_ingredients_FR.append(the_new_ingredient_FR)
        the_new_ingredient_EN_and_FR = dict(the_new_ingredient_FR)
        the_new_ingredient_EN_and_FR.update(the_new_ingredient_EN)
        the_new_ingredients_EN_and_FR.append(the_new_ingredient_EN_and_FR)

#print(the_new_ingredients_FR)
#print(the_new_ingredients_EN)
print(json.dumps(the_new_ingredients_EN_and_FR, indent=4, ensure_ascii=False))
