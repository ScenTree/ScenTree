'use strict';


module.exports = {
	is_an_ingredient : function (the_object) {
   		 return (the_object["ingredient"] == "yes");
	}, 

	is_a_famille_principale : function (the_object) {
    		return (the_object["from_csv FR id"].length == 3);
	}, 
	
	is_a_descripteur : function (the_object) {
		    return (the_object["from_csv FR Type"] == "Descripteur");
	}, 

	is_natural : function (the_object) {
		return (the_object["from_csv FR Type"] == "Naturelle");
	},

	is_synthetic : function (the_object) {
		return (the_object["from_csv FR Type"] == "Synthétique");
	}, 

        is_a_main_descriptor : function (the_object) {
		//return ((this.is_a_descripteur(the_object)) && (this.is_a_famille_principale(the_object)));
                return ((the_object["from_csv FR Type"] == "Descripteur") && (the_object["from_csv FR id"].length == 3));
	},
        is_a_secondary_descriptor : function (the_object) {
                //return (this.is_a_descripteur(the_object) && (! this.is_a_famille_principale(the_object)));
		return ((the_object["from_csv FR Type"] == "Descripteur") && (the_object["from_csv FR id"].length != 3));
	},
	
	compute_the_html_name : function (the_object) {   // bilingual name
		return the_object["from_csv EN Nom"].replace( new RegExp("[\\s\/]", "gi"), "_") + "__" + the_object["from_csv FR Nom"].replace( new RegExp("[\\s\/]", "gi"), "_");
	},

	compute_the_html_elements : function (the_object) {   // bilingual HTML content
		return "<span lang='en'>" + the_object["from_csv EN Nom"] + "</span><span lang='fr'>" + the_object["from_csv FR Nom"] + "</span>";
	}, 


	remove_duplicated_elements : function (the_input_as_array, the_attribute_as_string, the_values_already_seen = new Set()) {
	            // remove the duplicated elements
		    var the_new_array = new Array();
		    for (var i = 0, len = the_input_as_array.length; i < len; i++) {
			var the_current_object = the_input_as_array[i];
			var the_current_value = the_current_object[the_attribute_as_string];
			if (! the_values_already_seen.has(the_current_value)) {
			    the_new_array.push(the_current_object);
			};
			the_values_already_seen.add(the_current_value);
		    };
		    return the_new_array;
	}, 

	prepare_an_array_to_be_printed : function (the_input_as_array, the_attribute_as_string) {
   		  var the_new_array = new Array();
  		  for (var i = 0, len = the_input_as_array.length; i < len; i++) {
			var the_current_object = the_input_as_array[i];
			var the_current_value = the_current_object[the_attribute_as_string];
			the_new_array.push(the_current_value);
		  };
		  return the_new_array;
	}, 
	
	from_an_array_to_a_string : function (the_input_as_array) {
    		var the_array_as_string = "";
    		for (var i = 0, len = the_input_as_array.length; i < len; i++) {
			var the_current_object = the_input_as_array[i];
			the_array_as_string = the_array_as_string + ", " + the_current_object;
		    };
		    return "[ " + the_array_as_string + " ]";
	}, 
   
   	 // sort the objects in alphabetical order (the_object["sci_name"])
  	sort_a_list_of_scentree_objects : function (the_scentree_objects, the_sorting_key) {
		the_scentree_objects.sort(function (a, b) {
        		if (a[the_sorting_key] < b[the_sorting_key]) {
       			     return -1;
   		     } else if (a[the_sorting_key] > b[the_sorting_key]) {
  		          return 1;
 		       } else {
		            return 0;
		        };
		    });
	}, 

	compute_one_array : function(the_objects, the_filtering_function, the_sorting_key) {
		var the_new_array = new Array();
		for (var i = 0, len = the_objects.length; i < len; i++) {
			var the_current_object = the_objects[i];
			if (the_filtering_function(the_current_object)) {
				the_new_array.push(the_current_object);
			};
		};
		the_new_array = this.remove_duplicated_elements(the_new_array, "sci_name", new Set(["Matières Premières Parfumerie"]));
		this.sort_a_list_of_scentree_objects(the_new_array, the_sorting_key);
	        return the_new_array;
	}, 

	compute_the_three_arrays : function (the_objects) {
                 
		 console.log("starting compute_the_three_arrays ; number of objects = " + the_objects.length);
    
   		 // split the array into three arrays : one for the "famille principale", one for "autres descripteurs", one for the others (= the "ingrédients")
  		  /* to remove the duplicates in each array : 
  		        [Vert (Aldéhydés), Vert (Famille principale), Vert (Souffré), Vert (Souffré -> Fruit rouge)] 
  		     -> [Vert (Famille principale)] ; [Vert (Aldéhydés), Vert (Souffré), Vert (Souffré -> Fruit rouge)] 
  		     -> [Vert (Famille principale)] ; [Vert ("anonymisé")]
  		     -> [Vert (Famille principale), Vert ("anonymisé")]) */
  		    var the_familles_principales = new Array();
 		    var the_autres_descripteurs = new Array();
		    var the_ingredients = new Array();
		    var the_ingredients_naturels = new Array();
		    var the_ingredients_synthetiques = new Array();
		    for (var i = 0, len = the_objects.length; i < len; i++) {
			var the_current_object = the_objects[i];
			if (this.is_a_famille_principale(the_current_object)) {
			    the_familles_principales.push(the_current_object);
			} else if (this.is_a_descripteur(the_current_object)) {
			    the_autres_descripteurs.push(the_current_object);
			} else {
			    the_ingredients.push(the_current_object);
			    if (this.is_natural(the_current_object)) {
				    the_ingredients_naturels.push(the_current_object);
			    } else {
				the_ingredients_synthetiques.push(the_current_object);
			    };
			};
		    };
    
		    // remove the duplicated elements (same "sci_name") + remove one element : "Matières Premières Parfumerie" ("sci_name")
		    var the_familles_principales_2 = this.remove_duplicated_elements(the_familles_principales, "sci_name", new Set(["Matières Premières Parfumerie"]));
		    var the_autres_descripteurs_2 = this.remove_duplicated_elements(the_autres_descripteurs, "sci_name");
		    var the_ingredients_2 = this.remove_duplicated_elements(the_ingredients, "sci_name");
		    var the_ingredients_naturels = this.remove_duplicated_elements(the_ingredients_naturels, "sci_name");
		    var the_ingredients_synthetiques = this.remove_duplicated_elements(the_ingredients_synthetiques, "sci_name");
		   
		    if ((the_familles_principales_2.length != (the_familles_principales.length -1)) || (the_ingredients_2.length != the_ingredients.length)) {
			console.log("ATTENTION : il y a des ingrédients ET/OU des familles principales ayant le même nom");
		    };
		    console.log("------");
		    console.log(the_familles_principales.length + " -> " + the_familles_principales_2.length);
		    console.log(this.from_an_array_to_a_string(this.prepare_an_array_to_be_printed(the_familles_principales, "sci_name")));
		    console.log(" -> ");
		    console.log(this.from_an_array_to_a_string(this.prepare_an_array_to_be_printed(the_familles_principales_2, "sci_name")));
		    console.log("------");
		    console.log(the_autres_descripteurs.length + " -> " + the_autres_descripteurs_2.length);
		    console.log(this.from_an_array_to_a_string(this.prepare_an_array_to_be_printed(the_autres_descripteurs, "sci_name")));
		    console.log(" -> ");
		    console.log(this.from_an_array_to_a_string(this.prepare_an_array_to_be_printed(the_autres_descripteurs_2, "sci_name")));
		    console.log("------");
		    console.log(the_ingredients.length + " -> " + the_ingredients_2.length);
		    console.log(this.from_an_array_to_a_string(this.prepare_an_array_to_be_printed(the_ingredients, "sci_name")));
		    console.log(" -> ");
		    console.log(this.from_an_array_to_a_string(this.prepare_an_array_to_be_printed(the_ingredients_2, "sci_name")));
		    console.log("------");
                    
		   this.sort_a_list_of_scentree_objects(the_familles_principales_2, "sci_name");
		   this.sort_a_list_of_scentree_objects(the_autres_descripteurs_2, "sci_name");
		   this.sort_a_list_of_scentree_objects(the_ingredients_2, "sci_name");
		   this.sort_a_list_of_scentree_objects(the_ingredients_naturels, "sci_name");
		   this.sort_a_list_of_scentree_objects(the_ingredients_synthetiques, "sci_name");
		  
		   return { "Familles principales" : the_familles_principales_2, 
		         	"Autres descripteurs" : the_autres_descripteurs_2, 
		        	"Ingrédients" : the_ingredients_2, 
			       "Ingrédients naturels" : the_ingredients_naturels, 
			       "Ingrédients synthétiques" : the_ingredients_synthetiques
		};
	}, 

	empty_a_html_element : function (the_html_element) {
  		  while(the_html_element.firstChild){
  		      the_html_element.removeChild(the_html_element.firstChild);
 		   };
	}

};
