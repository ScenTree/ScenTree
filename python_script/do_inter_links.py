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

    # do the list of the links from the name of each element
    the_translator_EN = {} # name (EN) -> url (both languages) (the name will be replaced by url)
    the_translator_FR = {} # name (FR) -> url (both languages) (the name will be replaced by url)
    for an_element in the_json:
        if len(an_element["from_csv EN id"]) == 5: # if the element is an ingredient
            #the_translator_EN[an_element["from_csv EN Nom"]] = "<a class='interpop' href='%s'>%s</a>" % (compute_the_webpage_adress(an_element), an_element["from_csv EN Nom"])  # no " inside the string, for solr
            #the_translator_FR[an_element["from_csv FR Nom"]] = "<a class='interpop' href='%s'>%s</a>" % (compute_the_webpage_adress(an_element), an_element["from_csv FR Nom"])  # no " inside the string, for solr
            the_translator_EN[an_element["from_csv EN Nom"]] = {
                    'the_text_to_replace_with' : r"\1%s\3" % ("<a class='interpop' href='%s'>%s</a>" % (compute_the_webpage_adress(an_element), an_element["from_csv EN Nom"])),  # no " inside the string, for solr
                    'the_regexp' : re.compile(r"(^|[\s.,;:?!'(])(%s)($|[\s.,;:?!')])" % an_element["from_csv EN Nom"], flags=re.IGNORECASE)
                    }
            the_translator_FR[an_element["from_csv FR Nom"]] = {
                    'the_text_to_replace_with' : r"\1%s\3" % ("<a class='interpop' href='%s'>%s</a>" % (compute_the_webpage_adress(an_element), an_element["from_csv FR Nom"])),  # no " inside the string, for solr
                    'the_regexp' : re.compile(r"(^|[\s.,;:?!'(])(%s)($|[\s.,;:?!')])" % an_element["from_csv FR Nom"], flags=re.IGNORECASE)
                    }

    # sort the dicts
    the_translator_EN = collections.OrderedDict(sorted(the_translator_EN.items(), key = lambda t : len(t[0]), reverse=True))
    the_translator_FR = collections.OrderedDict(sorted(the_translator_FR.items(), key = lambda t : len(t[0]), reverse=True))

    print(the_translator_EN)

    print(the_translator_FR)

    for an_element in the_json:
        for a_key, a_value in an_element.items():
            if a_key in the_legit_keys:
                # find what can be linked
                for a_translated_key, a_translated_value in the_translator_EN.items():
                    if a_translated_key != an_element["from_csv EN Nom"]:
                        #the_text_to_be_replaced = a_translated_key
                        #the_text_to_replace_with = r"\1%s\3" % a_translated_value
                        #p = re.compile(r"(^|[\s.,;:?!'(])(%s)($|[\s.,;:?!')])" % the_text_to_be_replaced, flags=re.IGNORECASE)
                        the_text_to_replace_with = a_translated_value["the_text_to_replace_with"]
                        p = a_translated_value["the_regexp"]
                        the_text = p.sub(the_text_to_replace_with, a_value)
                        if the_text != a_value:
                            print(a_value, " replaced by ", the_text)


def do_inter_links(the_key, the_text, the_current_scentree_object, the_language_in_two_chars, the_nodes):
    if the_key not in ("Origine geographique", "Extractions", "Botanique", "Utilisation", "Allergenes", "composantsmajoritaires", "autresremarques", "Stabilite", "chemotype", "medecine", "Synthese", "Precurseurs", "Isomerie", "Presencenat"):
        return the_text
    for a_node in sorted(the_nodes, key = lambda n : len(getNodeNameForTheJSON(n, the_language_in_two_chars)), reverse=True):
        if not hasattr(a_node, "the_properties_from_the_csv") or not bool(a_node.the_properties_from_the_csv) or a_node == the_current_scentree_object or len( str(a_node.the_properties_from_the_csv['id'][the_language_in_two_chars]) ) != 5: # is not an ingredient
            continue
        #print("replacing = ", getNodeNameForTheJSON(a_node, the_language_in_two_chars))
        the_node_name = getNodeNameForTheJSON(a_node, the_language_in_two_chars)
        the_text_to_be_replaced = the_node_name
        the_text_to_replace_with = r"\1<a class='interpop' href='%s'>%s</a>\3" % (compute_the_webpage_adress(a_node), the_node_name) # no " inside the string, for solr

        p = re.compile(r"(^|[\s.,;:?!'(])(%s)($|[\s.,;:?!')])" % the_text_to_be_replaced, flags=re.IGNORECASE)
        the_text = p.sub(the_text_to_replace_with, the_text)
    return the_text

def getNodeNameForTheJSON(the_node, the_language_as_two_chars):
    return getNodeName(the_node, the_language_as_two_chars).replace('"','\\"')
def getNodeName(the_node, the_language_as_two_chars):
    try:
        return the_node.the_properties_from_the_csv['Nom'][the_language_as_two_chars]
    except KeyError:
        return the_node.name


