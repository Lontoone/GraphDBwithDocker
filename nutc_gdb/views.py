#from django.http import HttpResponse
import json
from django.shortcuts import render
from src.Main import main
from json import dumps, loads,load
#from matplotlib.style import context


def index(request):
    '''
    nodes= main()
    datas=[]
    for pairs in nodes:
        for pair in pairs:
            _data= {"data":{"id":pair.entity1.name}}
            _data2= {"data":{"id":pair.entity2.name}}
            _edge ={"data":{
                "id":pair.relation,
                "source":pair.entity1.name,
                "target":pair.entity2.name
                }}
            datas.append(_data)
            datas.append(_data2)
            datas.append(_edge)
    
    
    elements={
        "datas":datas
    }'''
    #print(elements)
    '''
    dataJSON = dumps(elements)
    
    with open('python_json.txt', 'w') as f:
        f.write(dataJSON)
    '''    
    
    context = {}
    f=open("pj_sm.txt")
    #context["elements"] = dataJSON
    jst= json.load(f);                
    f.close();                    
           
    print(jst)          
    
    context["elements"] = dumps(jst)
    
    return render(request, "index.html", context)

