#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import json
import collections
import re


# one argument = TreeFeaturesNEW_EN_and_FR.json (JSON with both languages)


def compute_the_webpage_adress(the_scentree_object):
    """
    the_scentree_object = json element
    """
    the_EN_name = the_scentree_object["from_csv EN Nom"].replace(" ", "_").replace("/", "_").replace("'", "_").replace('"', "_")
    the_FR_name = the_scentree_object["from_csv FR Nom"].replace(" ", "_").replace("/", "_").replace("'", "_").replace('"', "_")
    return "../ingredients/%s__%s.html" % (the_EN_name, the_FR_name)

def my_regexp_fonction(matchobj):
    """
    mandatory : 3 catches with parenthesis (matchobj.group(1), matchobj.group(2), matchobj.group(3))
    """
    the_name_EN_or_FR_of_an_ingredient = matchobj.group(2)
    the_link_in_html = "<a class='interpop' href='%s'>%s</a>" % (compute_the_webpage_adress(the_name_EN_or_FR_of_an_ingredient), the_name_EN_or_FR_of_an_ingredient)
    return matchobj.group(1) + the_link_in_html + matchobj.group(3)


the_legit_keys = []
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
    for a_language in ("from_csv EN", "from_csv FR"):
        the_legit_keys.append(a_language + " " + a_legit_key)


# read the JSON file and get the link and what to be linked
with open(sys.argv[1]) as the_json_file:
    the_json = json.load(the_json_file)
    the_ingredients = [ an_element for an_element in the_json if len(an_element["from_csv EN id"]) == 5 ]
    
    # dictionaries { ingredient name EN or FR : ingredient as dict }, to be used in 'my_regexp_fonction'
    the_ingredients_by_name_EN = { an_element["from_csv EN Nom"].lower() : an_element for an_element in the_ingredients  }
    the_ingredients_by_name_FR = { an_element["from_csv FR Nom"].lower() : an_element for an_element in the_ingredients  }

    for an_ingredient in the_ingredients:
        def my_regexp_fonction_for_EN_language(matchobj):
            """
            mandatory : 3 catches with parenthesis (matchobj.group(1), matchobj.group(2), matchobj.group(3))
            """
            the_name_EN_of_an_ingredient = matchobj.group(2)
            the_link_in_html = "<a class='interpop' href='%s'>%s</a>" % (compute_the_webpage_adress(the_ingredients_by_name_EN[the_name_EN_of_an_ingredient.lower()]), the_name_EN_of_an_ingredient)
            the_replacement_text = ""
            if matchobj.group(1):
                the_replacement_text += matchobj.group(1)
            the_replacement_text += the_link_in_html
            if matchobj.group(3):
                the_replacement_text += matchobj.group(3)
            return the_replacement_text
        def my_regexp_fonction_for_FR_language(matchobj):
            """
            mandatory : 3 catches with parenthesis (matchobj.group(1), matchobj.group(2), matchobj.group(3))
            """
            the_name_FR_of_an_ingredient = matchobj.group(2)
            the_link_in_html = "<a class='interpop' href='%s'>%s</a>" % (compute_the_webpage_adress(the_ingredients_by_name_FR[the_name_FR_of_an_ingredient]), the_name_FR_of_an_ingredient)
            return matchobj.group(1) + the_link_in_html + matchobj.group(3)
        the_ingredients_to_be_replaced = [ an_other_ingredient for an_other_ingredient in sorted(the_ingredients_by_name_EN, key = len, reverse = True) if an_other_ingredient != an_ingredient ]
        p = re.compile(r"(^|[\s.,;:?!'(])(%s)($|[\s.,;:?!')])" % "|".join(the_ingredients_to_be_replaced), flags=re.IGNORECASE)
        for a_key, a_value in an_ingredient.items():
            if a_key in the_legit_keys:
                the_text = p.sub(my_regexp_fonction_for_EN_language, a_value)
                if the_text != a_value:
                    print("\n", a_value, "\n replaced by \n", the_text, "\n")



