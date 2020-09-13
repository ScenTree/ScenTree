#!/usr/bin/env python
# -*- coding: utf-8 -*-


def formatting_text_for_a_webpage_address(the_text):
    return the_text.replace(" ", "_").replace("/", "_").replace("'", "_").replace('"', "_")

def compute_the_webpage_address(the_EN_name, the_FR_name):
    return "../ingredients/%s__%s.html" % (formatting_text_for_a_webpage_address(the_EN_name), formatting_text_for_a_webpage_address(the_FR_name))


