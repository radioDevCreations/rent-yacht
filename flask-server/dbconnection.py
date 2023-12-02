import json
from pprint import pprint
import pymongo

class create_dict(dict): 
  
    # __init__ function 
    def __init__(self): 
        self = dict() 
          
    # Function to add key:value 
    def add(self, key, value): 
        self[key] = value 

def getHarbours():
    client=pymongo.MongoClient('mongodb://127.0.0.1:27017/')
    db = client["Boatify"]
    harbours = db.harbours
    harboursDictionary = create_dict()
    i = 1
    for y in harbours.find():
        harboursDictionary.add(i, ({"name":y['name'],"localization":y['localization']}))
        i = i+1
    harboursJson = json.dumps(harboursDictionary, indent=2, sort_keys=True)
    return harboursJson