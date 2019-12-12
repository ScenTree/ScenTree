#!/usr/bin/env python
# -*- coding: utf-8 -*-

import cgitb
cgitb.enable()

import sys,os
import csv
import time
import numpy as np
from ete3 import Tree
import psycopg2 ##for postgresql connection

PLEASE_QUIT = False
THE_CORRECT_VALUES_FOR_MY_SCENTREE_ENVIRONMENT = ("dev", "prod", "prod2")
if len(sys.argv) == 3:
    MY_SCENTREE_ENVIRONMENT = sys.argv[1]
    THE_PATH_OF_THE_BDD_FOLDER = sys.argv[2]
    if MY_SCENTREE_ENVIRONMENT not in THE_CORRECT_VALUES_FOR_MY_SCENTREE_ENVIRONMENT:
        print("MY_SCENTREE_ENVIRONMENT not in THE_CORRECT_VALUES_FOR_MY_SCENTREE_ENVIRONMENT = ", MY_SCENTREE_ENVIRONMENT, "not in", THE_CORRECT_VALUES_FOR_MY_SCENTREE_ENVIRONMENT)
        PLEASE_QUIT = True
else:
    print("There should be 2 arguments (scentree environment = ", THE_CORRECT_VALUES_FOR_MY_SCENTREE_ENVIRONMENT, ", then the path of the folder containing .tre, and two .csv), but only %s argument(s) detected" % (len(sys.argv) -1))
    PLEASE_QUIT = True

if "THE_SECRET_PSWRD" not in os.environ:
    print("The environment variable 'THE_SECRET_PSWRD' must be set")
    PLEASE_QUIT = True

if not PLEASE_QUIT and not os.path.isdir(THE_PATH_OF_THE_BDD_FOLDER):
    print("THE_PATH_OF_THE_BDD_FOLDER", THE_PATH_OF_THE_BDD_FOLDER, " does not exists or is not a folder")
    PLEASE_QUIT = True


if PLEASE_QUIT:
    sys.exit(1)

print("arguments are corrects, MY_SCENTREE_ENVIRONMENT = ", MY_SCENTREE_ENVIRONMENT, "and THE_PATH_OF_THE_BDD_FOLDER = ", THE_PATH_OF_THE_BDD_FOLDER)


if MY_SCENTREE_ENVIRONMENT == "prod":
    THE_NAME_OF_THE_DATABASE = "gis"
elif MY_SCENTREE_ENVIRONMENT == "prod2":
    THE_NAME_OF_THE_DATABASE = "prod2_gis"
else:
    THE_NAME_OF_THE_DATABASE = "dev_gis"

THE_USER_OF_THE_DATABASE = "maxime"
THE_SECRET_PSWRD = os.environ.get('THE_SECRET_PSWRD')
THE_URL_TO_THE_DATABASE = "localhost"


THE_PATH_OF_THE_TRE_FILE = THE_PATH_OF_THE_BDD_FOLDER + "/" + "tree.tre"
THE_PATH_OF_THE_CSV_FR_FILE = THE_PATH_OF_THE_BDD_FOLDER + "/" + "csv_FR.csv"
THE_PATH_OF_THE_CSV_EN_FILE = THE_PATH_OF_THE_BDD_FOLDER + "/" + "csv_EN.csv"
THE_PATH_OF_THE_LOG_FILE = THE_PATH_OF_THE_BDD_FOLDER + "/" + "result.json"
 # JSON files to populate solr database (taxoEN and taxoFR)
THE_PATH_OF_THE_EN_JSON_FILE = THE_PATH_OF_THE_BDD_FOLDER + "/" + "TreeFeaturesNEW_EN.json"
THE_PATH_OF_THE_FR_JSON_FILE = THE_PATH_OF_THE_BDD_FOLDER + "/" + "TreeFeaturesNEW_FR.json"
THE_PATH_OF_THE_EN_AND_FR_JSON_FILE = THE_PATH_OF_THE_BDD_FOLDER + "/" + "TreeFeaturesNEW_EN_and_FR.json"

if not os.path.isfile(THE_PATH_OF_THE_TRE_FILE):
    print("The tree.tre file is not there, I've looked in : ", THE_PATH_OF_THE_TRE_FILE)
    PLEASE_QUIT = True
if not os.path.isfile(THE_PATH_OF_THE_CSV_FR_FILE):
    print("The csv_FR.csv file is not there, I've looked in : ", THE_PATH_OF_THE_CSV_FR_FILE)
    PLEASE_QUIT = True
if not os.path.isfile(THE_PATH_OF_THE_CSV_EN_FILE):
    print("The csv_EN.csv file is not there, I've looked in : ", THE_PATH_OF_THE_CSV_EN_FILE)
    PLEASE_QUIT = True

if PLEASE_QUIT:
    sys.exit(1)


print("The tree.tre file = ", THE_PATH_OF_THE_TRE_FILE)
print("The csv_FR.csv file = ", THE_PATH_OF_THE_CSV_FR_FILE)
print("The csv_EN.csv file = ", THE_PATH_OF_THE_CSV_EN_FILE)



# end of the introduction
# start of the main part


prg = open(THE_PATH_OF_THE_LOG_FILE, "w"); ##this will contain the progress made by the code.
prg.write(" ")##this will contain the progress made by the code.



prg.close();
prg = open(THE_PATH_OF_THE_LOG_FILE, "w"); ##this will contain the progress made by the code.
prg.write("{")##this will contain the progress made by the code.

try: 
    t = Tree(THE_PATH_OF_THE_TRE_FILE)
except: 
    prg.write('"Success":false,"Reason": "The tree could not be red. Check that your tree is correctly formed and try again."}')##this will contain the progress made by the code.
    prg.close()
    sys.exit(1)

# reading the csv files in parallel (EN | FR), they should have the same numbers of lines
the_csv_files_as_one_dict = {} #{ id ingrédient : { attributes : {'EN' : value, 'FR': value} } }
try:
    the_en_csv_file = open(THE_PATH_OF_THE_CSV_EN_FILE, 'r')
    the_fr_csv_file = open(THE_PATH_OF_THE_CSV_FR_FILE, 'r')
except:
    prg.write('"Success":false,"Reason": "The csv-EN file and/or the csv-FR file could not be red. Maybe it/they does/do not exists ? Stopping"')
    prg.close()
    sys.exit(1)
else:
    reader_en = [d for d in csv.DictReader(the_en_csv_file, delimiter=';')]
    reader_fr = [d for d in csv.DictReader(the_fr_csv_file, delimiter=';')]
    if len(reader_en) != len(reader_fr):
        prg.write('"Success":false,"Reason": "csv-en and csv-fr have not the same length !"')
        prg.close()
        sys.exit(1)
    for an_en_row, a_fr_row in zip(sorted(reader_en, key = lambda d: d['id']), sorted(reader_fr, key = lambda d: d['id'])):
        if an_en_row['id'] != a_fr_row['id']:
            prg.write('"Success":false,"Reason": "csv-en sorted and csv-fr sorted, but not the same id for the same rank ! Stopping"')
            prg.close()
            sys.exit(1)
        the_id_of_the_row = str(a_fr_row['id'])
        the_csv_files_as_one_dict[the_id_of_the_row] = {}
        for a_key, a_fr_value in a_fr_row.items():
            the_csv_files_as_one_dict[the_id_of_the_row][a_key] = {'FR' : a_fr_value}
        for a_key, a_en_value in an_en_row.items():
            the_csv_files_as_one_dict[the_id_of_the_row][a_key]['EN'] = a_en_value





t.x = 0.0;
t.y = -15;
t.alpha = 90.0;
t.ray = 30.0;
starti = 1;

t.zoomview = 1;

#species and node ids
nbsp = len(t)

prg.write('"nbtip": %d,' % (nbsp));##this will contain the progress made by the code.


spid = starti
ndid = starti + nbsp
rootnb = ndid+1
maxZoomView=0

##FUNCTIONS
def rad(deg):
    return((deg*np.pi)/180);
def halfCircle(x,y,r,start,end,nsteps):
    rs = np.linspace(start,end,num=nsteps)
    xc = x+r*np.cos(rs)
    yc = y+r*np.sin(rs)
    return(xc,yc)
def ellipse(x,y,r, alpha, nsteps):
    start=0
    end=np.pi+start
    rs = np.linspace(start,end,num=nsteps)
    a = r
    b = float(r)/6 ##Change this value to change the shape of polygons. This controls how flat is the elliptic side of the polygon. The other side is always a half cricle. 
    xs = a*np.cos(rs)
    ys = b*np.sin(rs)
    ##rotation
    xs2 = x+(xs*np.cos(alpha)-ys*np.sin(alpha))
    ys2 = y+(xs*np.sin(alpha)+ys*np.cos(alpha))
    return(xs2,ys2)
def HalfCircPlusEllips(x,y,r,alpha, start, end,nsteps):
        circ = halfCircle(x,y,r,start,end, nsteps)
        elli = ellipse(x,y,r,alpha,nsteps)
        return (np.concatenate((circ[0], elli[0])),np.concatenate((circ[1], elli[1])))

##CONNECT TO POSTGRESQL/POSTGIS DATABASE

try:
    conn = psycopg2.connect("dbname='%s' user='%s' host='%s' password='%s'" % (THE_NAME_OF_THE_DATABASE, THE_USER_OF_THE_DATABASE, THE_URL_TO_THE_DATABASE, THE_SECRET_PSWRD))
except Exception as e:
    prg.write(repr(e))
    prg.write('"Success":false,"Reason": "Could not connect to the database. Restart the virtual Machine to solve this issue."}')
    prg.close()
    sys.exit(1)

cur = conn.cursor()

##INITIALIZE DATABASE
##we delete current tables
cur.execute("select exists(select * from information_schema.tables where table_name='points')")
if (cur.fetchone()[0]): ## we drop tables only if they exist.
    cur.execute("DROP TABLE points;")
    cur.execute("DROP TABLE lines;")
    cur.execute("DROP TABLE polygons;")
    conn.commit()
##we create the database structure here
cur.execute("CREATE TABLE points(id bigint,ref smallint,z_order smallint,branch boolean,tip integer,zoomview integer,clade boolean,cladecenter boolean,rankame boolean,  sci_name_en text, sci_name_fr text,  nbdesc integer,taxid text, color text, way geometry(POINT,900913));")
cur.execute("CREATE TABLE lines(id bigint,ref smallint,z_order smallint,branch boolean,tip integer,zoomview integer,clade boolean,cladecenter boolean,rankname boolean,  nbdesc integer,taxid text, color text, way geometry(LINESTRING,900913));")
cur.execute("CREATE TABLE polygons(id bigint,ref smallint,z_order smallint,branch boolean,tip integer,zoomview integer,clade boolean,cladecenter boolean,rankame boolean,  sci_name_en text, sci_name_fr text,  nbdesc integer,taxid text, color text, way geometry(POLYGON,900913));")
conn.commit()

##we include the root node
#cur.execute("INSERT INTO points (id, sci_name, common_name,rank,nbdesc,tip, zoomview,taxid,way) VALUES(1000000000, 'Root','Root','Root',1000000, FALSE, 1,1,ST_Transform(ST_GeomFromText('POINT(0 -4.226497)', 4326), 900913));")
#conn.commit()



###CHANGES: node.taxid replaced by node.support
###node.sci_name replaced by node.name
###node.common_name removed
###node.rank removed

def getNodeName(the_node, the_language_as_two_chars):
    try:
        return the_node.the_properties_from_the_csv['Nom'][the_language_as_two_chars]
    except KeyError:
        return the_node.name
def getNodeNameForTheDatabase(the_node, the_language_as_two_chars):
    return getNodeName(the_node, the_language_as_two_chars).replace("'", "''")
def getNodeNameForTheJSON(the_node, the_language_as_two_chars):
    return getNodeName(the_node, the_language_as_two_chars).replace('"','\\"')
def getNodeColor(the_node):
    try:
        return the_node.the_properties_from_the_csv['Couleur']['FR']
    except KeyError:
        return None
def getNodeZoom(the_node):
    try:
        return int(the_node.the_properties_from_the_csv.get('zoomview', None)['FR'])
    except TypeError:
        return None
def writeosmNode(node):
    ##we write INFO FOR EACH NODE. Clades will be delt with later on. We put less info than for the json file
    the_color = getNodeColor(node)
    node.zoomwiew = getNodeZoom(node)
    command = "INSERT INTO points (id, taxid, sci_name_en, sci_name_fr, nbdesc,zoomview, tip, color, way) VALUES(%d,'%s', '%s','%s',%d,'%s',%d, '%s', ST_Transform(ST_GeomFromText('POINT(%.20f %.20f)', 4326), 900913));" % (node.id, node.support, getNodeNameForTheDatabase(node, 'EN'), getNodeNameForTheDatabase(node, 'FR'),  node.nbdesc,node.zoomview, node.is_leaf(), the_color, node.x, node.y);
    cur.execute(command);
    conn.commit();
    ##write json for search
    
def writeosmWays(node, id):
    #Create branch names
    command = "INSERT INTO lines (id, branch, zoomview, ref, way) VALUES(%d,'TRUE','%s',E'%s',ST_Transform(ST_GeomFromText('LINESTRING(%.20f %.20f, %.20f %.20f)', 4326), 900913));" % (id, node.zoomview, '1', node.up.x, node.up.y, node.x, node.y);
    cur.execute(command);
    conn.commit();
        
def writeosmpolyg(node, ids):
    polyg = HalfCircPlusEllips(node.x,node.y,node.ray,rad(node.alpha) + np.pi/2, rad(node.alpha) - np.pi/2, rad(node.alpha) + np.pi/2, 30)
    polygcenter = (np.mean(polyg[0]),np.mean(polyg[1]));
    cooPolyg = 'POLYGON((%.20f %.20f ' % (polyg[0][0], polyg[1][0]);
    for i in range(1,59):
        cooPolyg += ',%.20f %.20f' % (polyg[0][i], polyg[1][i]);
    cooPolyg += ',%.20f %.20f' % (polyg[0][0], polyg[1][0]); #to close the ring...
    cooPolyg += '))';
    command = "INSERT INTO polygons (id, ref, clade, taxid, sci_name_en, sci_name_fr, nbdesc,zoomview, color, way) VALUES(%d,'%s','TRUE', '%s','%s','%s',%d,'%s', '%s', ST_Transform(ST_GeomFromText('%s', 4326), 900913));" % (ids[60], '1', node.support, getNodeNameForTheDatabase(node, 'EN'), getNodeNameForTheDatabase(node, 'FR'), node.nbdesc, node.zoomview, getNodeColor(node), cooPolyg);
    cur.execute(command);
    conn.commit();
    #and add the clade center
    command = "INSERT INTO points (id, cladecenter, taxid, sci_name_en, sci_name_fr, nbdesc,zoomview, color, way) VALUES('%d','TRUE', '%s','%s','%s',%d,'%s', '%s', ST_Transform(ST_GeomFromText('POINT(%.20f %.20f)', 4326), 900913));" % (ids[61], node.support, getNodeNameForTheDatabase(node, 'EN'), getNodeNameForTheDatabase(node, 'FR'), node.nbdesc,node.zoomview, getNodeColor(node), polygcenter[0], polygcenter[1]);
    cur.execute(command);
    conn.commit();
    #we add a way on which we will write the rank
    cooLine = 'LINESTRING(%.20f %.20f' % (polyg[0][35], polyg[1][35]);
    for i in range(36,45):
        cooLine += ',%.20f %.20f' % (polyg[0][i], polyg[1][i]);
    cooLine += ')';
    command = "INSERT INTO lines (id, ref, rankname, zoomview, nbdesc, color, way) VALUES(%d,'%s','TRUE','%s',%d, '%s', ST_Transform(ST_GeomFromText('%s', 4326), 900913));" % (ids[62], '1', node.zoomview, node.nbdesc, getNodeColor(node), cooLine);
    cur.execute(command);
    conn.commit();

# reading the graph and the csv file to associate properties : csv's "id" = tree's "name"
for n in t.traverse():
    if n.name == '':
        try:
            the_id_of_the_node = str(int(n.support))
        except:
            the_id_of_the_node = str(n.name)
    else:
        the_id_of_the_node = str(n.name)
    try:
        the_properties_from_the_csv = the_csv_files_as_one_dict[the_id_of_the_node]
    except KeyError:
        the_properties_from_the_csv = {}
    n.the_properties_from_the_csv = the_properties_from_the_csv



#################################
#       WRITE JSON FILES        #
#################################
def create_an_opened_json_file(the_path_of_the_json_file):
    json = open(the_path_of_the_json_file, "w");
    json.write("[\n");
    return json

def do_inter_links(the_text, the_current_scentree_object, the_language_in_two_chars, the_nodes):
    #print("do_inter_links, ", the_text, the_current_scentree_object)
    for a_node in sorted(the_nodes, key = lambda n : len(getNodeNameForTheJSON(n, the_language_in_two_chars)), reverse=True):
        if not hasattr(a_node, "the_properties_from_the_csv") or not bool(a_node.the_properties_from_the_csv) or a_node == the_current_scentree_object or len( str(a_node.the_properties_from_the_csv['id'][the_language_in_two_chars]) ) != 5: # is not an ingredient
            continue
        #print("replacing = ", getNodeNameForTheJSON(a_node, the_language_in_two_chars))
        the_text = the_text.replace(getNodeNameForTheJSON(a_node, the_language_in_two_chars), "<a href='#'>%s</a>" % getNodeNameForTheJSON(a_node, the_language_in_two_chars)) 
    return the_text

def writejsonNode(the_json, node, the_language_in_two_chars, the_nodes):
    sci_name = getNodeNameForTheJSON(node, 'FR')
    print(sci_name)
    if bool(sci_name):
        the_json.write("  {\n")
        the_json.write("    \"id\":\"%d\",\n" % (node.id))
        the_json.write("    \"sci_name\": \"%s\",\n" % (getNodeNameForTheJSON(node, the_language_in_two_chars)))
        the_json.write("    \"zoom\":\"%s\",\n" % (node.zoomview))
        the_json.write("    \"nbdesc\":\"%d\",\n" % (node.nbdesc))
        the_json.write("    \"coordinates\": [%.20f,%.20f],\n" % (node.y, node.x))
        the_json.write("    \"lat\": \"%.20f\",\n" % (node.y))
        if len( str(node.the_properties_from_the_csv['id'][the_language_in_two_chars]) ) == 5:
            the_json.write("    \"ingredient\": \"%s\",\n" % ("yes"))
        if hasattr(node, "the_properties_from_the_csv"):
            for a_key, a_value in node.the_properties_from_the_csv.items():
                if bool(a_value[the_language_in_two_chars]):
                    the_json.write("    \"from_csv %s\": \"%s\", \n" % (a_key, do_inter_links(a_value[the_language_in_two_chars].replace("\n", "\\n"), node, the_language_in_two_chars, the_nodes)))
        the_json.write("    \"lon\": \"%.20f\"\n" % (node.x))
        the_json.write("  },\n")

def writejsonNodeBothLanguages(the_json, node, the_nodes):
    sci_name = getNodeNameForTheJSON(node, 'FR')
    if bool(sci_name):
        the_json.write("  {\n")
        the_json.write("    \"id\":\"%d\",\n" % (node.id))
        the_json.write("    \"sci_name\": \"%s\",\n" % (sci_name))
        the_json.write("    \"zoom\":\"%s\",\n" % (node.zoomview))
        the_json.write("    \"nbdesc\":\"%d\",\n" % (node.nbdesc))
        the_json.write("    \"coordinates\": [%.20f,%.20f],\n" % (node.y, node.x))
        the_json.write("    \"lat\": \"%.20f\",\n" % (node.y))
        if len( str(node.the_properties_from_the_csv['id']['FR']) ) == 5:
            the_json.write("    \"ingredient\": \"%s\",\n" % ("yes"))
        if hasattr(node, "the_properties_from_the_csv"):
            for a_key, a_value in node.the_properties_from_the_csv.items():
                if bool(a_value['EN']):
                    the_json.write("    \"from_csv EN %s\": \"%s\", \n" % (a_key, do_inter_links(a_value['EN'].replace("\n", "\\n"), node, "EN", the_nodes)))
        if hasattr(node, "the_properties_from_the_csv"):
            for a_key, a_value in node.the_properties_from_the_csv.items():
                if bool(a_value['FR']):
                    the_json.write("    \"from_csv FR %s\": \"%s\", \n" % (a_key, do_inter_links(a_value['FR'].replace("\n", "\\n"), node, "FR", the_nodes)))
        the_json.write("    \"lon\": \"%.20f\"\n" % (node.x))
        the_json.write("  },\n")


the_opened_json_EN_file = create_an_opened_json_file(THE_PATH_OF_THE_EN_JSON_FILE)
the_opened_json_FR_file = create_an_opened_json_file(THE_PATH_OF_THE_FR_JSON_FILE)
the_opened_json_EN_and_FR_file = create_an_opened_json_file(THE_PATH_OF_THE_EN_AND_FR_JSON_FILE)

for n in t.traverse():
    special = 0
    n.dist=1.0
    tot = 0.0
    if n.is_leaf():
        spid = spid +1
        n.id = spid
    else:
        ndid = ndid+1
        n.id = ndid
    child = n.children
    ##NEW  -->|
    if ((len(child)==1)&(len(n)>1)):
        special=1
    if ((len(child)==1)&(len(n)==1)):
        special=2
    ## |<-- NEW
    for i in child:
        tot = tot + np.sqrt(len(i));
    nbdesc = len(n);
    ##remove special chars in names
    n.name = n.name.replace("'","''");
    n.nbdesc = nbdesc;
    nbsons = len(child);
    angles = [];
    ray = n.ray;
    for i in child:
        #i.ang = 180*(len(i)/float(nbdesc))/2;
        i.ang = 180*(np.sqrt(len(i))/tot)/2; #using sqrt we decrease difference between large and small groups
        angles.append(i.ang);
        if (special==1):
            i.ray = ray-(ray*20)/100
        else:
            if (special==2):
                i.ray = ray-(ray*50)/100
            else:
                i.ray = (ray*np.sin(rad(i.ang))/np.cos(rad(i.ang)))/(1+(np.sin(rad(i.ang))/np.cos(rad(i.ang))));
        i.dist = ray - i.ray;
    ang = np.repeat(angles, 2);
    ang = np.cumsum(ang);
    ang = ang[0::2];
    ang = [i-(90-n.alpha) for i in ang];
    cpt = 0
    for i in child:
        i.alpha = ang[cpt];
        i.x = n.x + i.dist*np.cos(rad(i.alpha));
        i.y = n.y + i.dist*np.sin(rad(i.alpha));
        i.zoomview = getNodeZoom(i)
        if i.zoomview <= 0:
            i.zoomview = 0
        if maxZoomView < i.zoomview:
            maxZoomView = i.zoomview
        cpt = cpt+1;
    #we write node info
    writeosmNode(n)



##LAST LOOP TO write coords of polygs and JSON file
the_nodes = list(t.traverse())
for n in the_nodes:
    #save all trees to disk
#    out="../out/trees/a.tre";
#    n.write(outfile=out);
    ##we finish writing in the database here.
    if n.is_root()==False:
        ndid = ndid+1
        writeosmWays(n, ndid)
    if n.is_leaf()==False:
        indexes = np.linspace(ndid + 1,ndid+63,num=63)
        writeosmpolyg(n, indexes)
        ndid = ndid+63
    #try:
    writejsonNode(the_opened_json_EN_file, n, 'EN', the_nodes)
    writejsonNode(the_opened_json_FR_file, n, 'FR', the_nodes)
    writejsonNodeBothLanguages(the_opened_json_EN_and_FR_file, n, the_nodes)
    #except KeyError:
    #    pass


the_opened_json_EN_file.close()
the_opened_json_FR_file.close()
the_opened_json_EN_and_FR_file.close()

##we add the way from LUCA to the root of the subtree 
#ndid=ndid+1
#command = "INSERT INTO lines (id, branch, zoomview, ref, way) VALUES(%d,'TRUE', '4','%s',ST_Transform(ST_GeomFromText('LINESTRING(0 -4.226497, %.20f %.20f)', 4326), 900913));" % (ndid, '1', t.x, t.y);
#cur.execute(command);
#conn.commit()
#print "DONE!"
#print ndid;
#print spid;
#out = open("tempndid", "w")
#out.write("%d" % ndid) ##we store the max id so that we start from there for next group.

prg.write('"Success": true, "nbzoomview": %s' % (maxZoomView));##this will contain the progress made by the code.
prg.close()

##remove unwanted last character(,) of json file

#consoleexex = 'head -n -1 ' + jsonfile + ' > /var/www/html/out/tempi.txt ; cp /var/www/html/out/tempi.txt '+ jsonfile;
#os.system(consoleexex);

def terminate_a_json_file(the_path_of_the_json_file):
    json = open(the_path_of_the_json_file, "rb+");
    json.seek(-2, os.SEEK_END)
    json.truncate()
    json.close()
    json = open(the_path_of_the_json_file, "a");
    json.write("\n]\n")
    json.close()

terminate_a_json_file(THE_PATH_OF_THE_EN_JSON_FILE)
terminate_a_json_file(THE_PATH_OF_THE_FR_JSON_FILE)
terminate_a_json_file(THE_PATH_OF_THE_EN_AND_FR_JSON_FILE)
