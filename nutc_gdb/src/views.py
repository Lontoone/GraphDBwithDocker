#from django.http import HttpResponse
import asyncio
import json
import math
import random
from django.shortcuts import render
from src.NodePair import pairs_trim
from src.Main import main,setupNlp,doProcess
from json import dumps, loads,load
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

#from matplotlib.style import context

class AdvancedJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)

nlp=''
def index(request):
    
    return render(request, "index.html")

@csrf_exempt
def DoSearch(request):
    text = request.POST['text']   
    
    print("準備 nlp ")    
    global nlp
    if nlp=='':
        nlp = setupNlp() 
    
    print("準備 nlp --完成 ")    
    
    #elements = GetNodes(text)
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    elements =loop.run_until_complete(GetNodes(text))
    print("輸出elements",len(elements),"筆資料")
    
    dataJSON = dumps(elements)
    context = {}
    context["elements"] = dataJSON
    
    print(text)
    return HttpResponse(dataJSON)
    #return render(request, "index.html",context )
    pass

#datas=set()
nodepairs=set()

async def GetNodes(keyword):
    #nodes= main(keyword)    
    
    task= asyncio.ensure_future(doProcess(nlp,keyword,2 , CollectNodes,0.15))
    print("執行爬蟲中...")
    await task
    #node trim
    global nodepairs
    nodepairs =set( pairs_trim(nodepairs))
    #將返回的node pair整理成網頁展示用的
    datas = NodePairs2Json(nodepairs)
    print("爬蟲結束...",len(datas),"筆資料")
    elements={
        "datas":datas
    }
    return elements;

def CollectNodes(new_nps):
    #蒐集nodepair
    global nodepairs
    #nodepairs.extend(new_nps)
    nodepairs= list(set(nodepairs).union(new_nps))
   
def NodePairs2Json(nps):
    #global datas
    datas=[]
    r = lambda: random.randint(0,255)
    color = '#{:02x}{:02x}{:02x}'.format(r(), r(), r())
    print(color)
    for pair in nps:
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
    print("[CollectNodes 結果]",len(datas),"筆資料")
    return datas
