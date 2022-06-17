#from django.http import HttpResponse
import json
import math
import random
from django.shortcuts import render
from src.Main import main
from json import dumps, loads,load
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

#from matplotlib.style import context


def index(request):
    '''
    nodes= main()
    datas=[]
    for pair in nodes:
        #for pair in pairs:
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
    }
    #print(elements)
    dataJSON = dumps(elements)
    context = {}
    context["elements"] = dataJSON
    
    
    with open('python_json.txt', 'w') as f:
        f.write(dataJSON)
    '''
    '''
    context = {}
    f=open("pj_sm.txt")
    #context["elements"] = dataJSON
    jst= json.load(f);                
    f.close();                    
    '''    
    '''
    elements = GetNodes('SAO')
    dataJSON = dumps(elements)
    context = {}
    context["elements"] = dataJSON
    return render(request, "index.html", context)
    '''
    return render(request, "index.html")

@csrf_exempt
def DoSearch(request):
    text = request.POST['text']   
    
    elements = GetNodes(text)
    dataJSON = dumps(elements)
    context = {}
    context["elements"] = dataJSON
    
    print(text)
    return HttpResponse(dataJSON)
    #return render(request, "index.html",context )
    pass

def GetNodes(keyword):
    nodes= main(keyword)
    datas=[]
    r = lambda: random.randint(0,255)
    color = '#{:02x}{:02x}{:02x}'.format(r(), r(), r())
    print(color)
    for pair in nodes:
        #for pair in pairs:
        _data= {"data":{"name": pair.entity1.name,"id":str(hash(pair.entity1.name)) , "faveColor":color}}
        _data2= {"data":{"name": pair.entity2.name,"id":str(hash(pair.entity2.name)) ,"faveColor":color}}
        _edge ={"data":{
            "id":str(hash(pair.relation)),
            "name":pair.relation,
            "source":str(hash(pair.entity1.name)),
            "target":str(hash(pair.entity2.name))
            }}
        datas.append(_data)
        datas.append(_data2)
        datas.append(_edge)
    
    
    elements={
        "datas":datas
    }
    return elements;