#!/usr/bin/env python
import cgitb
cgitb.enable()

import sys,os
import csv
import time
import numpy as np
from ete3 import Tree
import psycopg2 ##for postgresql connection

THE_NAME_OF_THE_DATABASE = "gis"
THE_USER_OF_THE_DATABASE = "maxime"
THE_SECRET_PSWRD = os.environ.get('THE_SECRET_PSWRD')
THE_URL_TO_THE_DATABASE = "localhost"
THE_PATH_OF_THE_TRE_FILE = "./tree.tre"
THE_PATH_OF_THE_CSV_FR_FILE = "./csv_FR.csv"
THE_PATH_OF_THE_CSV_EN_FILE = "./csv_EN.csv"
THE_PATH_OF_THE_LOG_FILE = "./result.json"
THE_PATH_OF_THE_JSON_FILE = "./TreeFeaturesNEW.json" # JSON file to populate solr database

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

def getNodeNameEN(the_node):
    try:
        return the_node.the_properties_from_the_csv['Nom']['EN']
    except KeyError:
        return the_node.name
def getNodeNameFR(the_node):
    try:
        return the_node.the_properties_from_the_csv['Nom']['FR']
    except KeyError:
        return the_node.name
def getNodeNameENForTheDatabase(the_node):
    return getNodeNameEN(the_node).replace("'", "''")
def getNodeNameENForTheJSON(the_node):
    return getNodeNameEN(the_node).replace('"','\\"')
def getNodeNameFRForTheDatabase(the_node):
    return getNodeNameFR(the_node).replace("'", "''")
def getNodeNameFRForTheJSON(the_node):
    return getNodeNameFR(the_node).replace('"','\\"')
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
    command = "INSERT INTO points (id, taxid, sci_name_en, sci_name_fr, nbdesc,zoomview, tip, color, way) VALUES(%d,'%s', '%s','%s',%d,'%s',%d, '%s', ST_Transform(ST_GeomFromText('POINT(%.20f %.20f)', 4326), 900913));" % (node.id, node.support, getNodeNameENForTheDatabase(node), getNodeNameFRForTheDatabase(node),  node.nbdesc,node.zoomview, node.is_leaf(), the_color, node.x, node.y);
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
    command = "INSERT INTO polygons (id, ref, clade, taxid, sci_name_en, sci_name_fr, nbdesc,zoomview, color, way) VALUES(%d,'%s','TRUE', '%s','%s','%s',%d,'%s', '%s', ST_Transform(ST_GeomFromText('%s', 4326), 900913));" % (ids[60], '1', node.support, getNodeNameENForTheDatabase(node), getNodeNameFRForTheDatabase(node), node.nbdesc, node.zoomview, getNodeColor(node), cooPolyg);
    cur.execute(command);
    conn.commit();
    #and add the clade center
    command = "INSERT INTO points (id, cladecenter, taxid, sci_name_en, sci_name_fr, nbdesc,zoomview, color, way) VALUES('%d','TRUE', '%s','%s','%s',%d,'%s', '%s', ST_Transform(ST_GeomFromText('POINT(%.20f %.20f)', 4326), 900913));" % (ids[61], node.support, getNodeNameENForTheDatabase(node), getNodeNameFRForTheDatabase(node), node.nbdesc,node.zoomview, getNodeColor(node), polygcenter[0], polygcenter[1]);
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
jsonfile = THE_PATH_OF_THE_JSON_FILE; ##changed groupnb by '1'
json = open(jsonfile, "w");
json.write("[\n");
def writejsonNode(node):
    sci_name = getNodeNameFRForTheJSON(node)
    if bool(sci_name):
        json.write("  {\n")
        json.write("    \"id\":\"%d\",\n" % (node.id))
        json.write("    \"sci_name\": {\"EN\" : \"%s\", \"FR\" : \"%s\"},\n" % (getNodeNameENForTheJSON(node), getNodeNameFRForTheJSON(node)))
        json.write("    \"zoom\":\"%s\",\n" % (node.zoomview))
        json.write("    \"nbdesc\":\"%d\",\n" % (node.nbdesc))
        json.write("    \"coordinates\": [%.20f,%.20f],\n" % (node.y, node.x))
        json.write("    \"lat\": \"%.20f\",\n" % (node.y))
        if len( str(node.the_properties_from_the_csv['id']) ) == 5:
            json.write("    \"ingredient\": \"%s\",\n" % ("yes"))
        try:
            for a_key, a_value in node.the_properties_from_the_csv.items():
                if bool(a_value):
                    json.write("    \"from_csv %s\": {\"EN\" : \"%s\", \"FR\" : \"%s\"} \n" % (a_key, a_value['EN'].replace("\n", "\\n"), a_value['FR'].replace("\n", "\\n")))
        except AttributeError:
            pass
        json.write("    \"lon\": \"%.20f\"\n" % (node.x))
        json.write("  },\n")







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
for n in t.traverse():
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
    try:
        writejsonNode(n)
    except KeyError:
        pass


json.close()
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
json = open(jsonfile, "rb+");
json.seek(-2, os.SEEK_END)
json.truncate()
json.close()
json = open(jsonfile, "a");
json.write("\n]\n")
json.close()

