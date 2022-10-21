
import spacy
from spacy.tokens import Doc
import neuralcoref
from src.ARHelper import AnaphoraResolutionHelper
#from src.Neo4jHelper import Neo4JHelper
from src.NodePair import Node, NodePair, NodeSpliter,pairs_trim
from src.SBDHelper import SbdHelper
from src.WikiHelper import wikiHelper
from src.Id_tdfHelper import idfHelper
from src.TextCleaner import textCleaner
from src.LsaHelper import LsaHelper
import neuralcoref

import re

#nlp=spacy.blank('en')
def setupNlp():    
    nlp = spacy.load("en_core_web_sm")    
    nlp.add_pipe(nlp.create_pipe('sentencizer'))
    #--------- 合併斷句 ------------
    sbd= SbdHelper()
    Doc.set_extension("briefSents" , default=None , force=True)
    nlp.add_pipe(sbd.briefSbd, after="sentencizer",name="sbd")
    
    # ar 處理
    #nlp_ar.remove_pipe('sbd')
    Doc.set_extension("referedSents" , default=None , force=True)
    neuralcoref.add_to_pipe(nlp, name="neuralcoref",after="briefSents")    
    ar = AnaphoraResolutionHelper()    
    nlp.add_pipe(ar.arReplacement,name="arReplacement", after="neuralcoref")  
    
    return nlp
    # 文本後處理
    #nlp.remove_pipe('sentencizer')
    
#已處理過的wiki頁面
processed_pages=[]    

def main(nlp,_cleanText,preserveRate ):
    # 取得文本
    cleanedText = _cleanText
    #cleanParas= tc.cleanParagraphs()
    
    #---------- 斷句 --------------
    
    #--------- 合併斷句 ------------
    
    disabled = nlp.disable_pipes(["neuralcoref","arReplacement"]);
    doc= nlp(cleanedText)    
    disabled.restore()
    
    print("句子數 ",len(list(doc.sents)), len(doc._.briefSents))        
    
    #--------- 回指消解 ------------    
    print("--------- 回指消解 ------------")
    
    disabled = nlp.disable_pipes(["sbd"])
    
    clean_full_text= ""
    for sent in doc._.briefSents[:]:
        sent_doc= nlp(sent.text)    
        clean_full_text+=sent_doc._.referedSents
    disabled.restore()
    
    print("------- ar doc長度--------")
    #print(len(doc_array))
    print("------- 乾淨full文本 --------")
    #print(clean_full_text)
   
    #----------- 文本後處理 ?----------------
    
    disabled = nlp.disable_pipes(["sentencizer","sbd","neuralcoref","arReplacement"]);
    nlp_full = nlp
    full_doc = nlp_full(clean_full_text)
    sents= list(full_doc.sents)
    
    print("------------ LSA -------------")
    lsa = LsaHelper(full_doc) #初始化辭庫
    lsa.getSentencesImportence(sents)
    #lsa.drawFeatureHeatMap() #畫關聯圖
    print("------------ LSA剔除 -------------")
    filtered_sents=[]
    threshold=lsa.getPassThreshold(preserveRate)
    #threshold = 0.45
    for i , val in enumerate(lsa.sents_avgSim):
        if val>=threshold:
            filtered_sents.append(sents[i])
        else:
            print("拒絕 ", sents[i].text)
    
    print("閥值",threshold,"接受率", sum(lsa.sents_avgSim>=threshold) / len(lsa.sents_avgSim))

    
    # 知識抽取    
    #------------- 實體 ------------------    
    print("------- Noun chunks --------")
    nodePairs=[]
    for sent in filtered_sents:
        print("保留",sent.text)
        sent_doc=nlp_full(sent.text)
        nuns=list(sent_doc.noun_chunks)
        
        # 跟merge_nps 工作重複? => 沒有，這個效果比較好?
        spliter=NodeSpliter(nuns) #合併noun chunks
        pairs=spliter.split()
        if pairs:    
            nodePairs.append(pairs[:])              
    
    disabled.restore()
    
    #-------------- 文本相似度 ---------------------    
   
    finalNodes=[]    
    i=0
    for pairs in nodePairs[:]:        
        for pair in pairs:           
            finalNodes.append(pair)
            print(pair.entity1.name,"-> [",pair.relation,"] ->",pair.entity2.name)    
    finalNodes = pairs_trim(finalNodes) 
    #finalNodes = [p for p in finalNodes if p.isRemoved==False]
    #-------------- 上傳 Neo4j ---------------------
    '''
    if writeDB:
        db= Neo4JHelper()
        #db.writeNode(nodePairs)
        db.writeNode(finalNodes)
    '''        
    # 得出nodes....繼續
    return finalNodes

async def doProcess(nlp,pageTitle , itLeft , callback,preserveRate=0.1):
    if (itLeft<=0):
        return;
    
    wiki = wikiHelper()
    #NLP
    text= wiki.GetPage(pageTitle)
    tc=textCleaner(text)
    cleanText = tc.cleanText(text);
    nodes = main(nlp,cleanText,preserveRate)
    callback(nodes)
        
    #爬蟲
    links = wiki.GetLinks()
    relativeLinks=[]
    for pair in nodes:
        _ent1_pureText= re.sub(r"[_\W]","",pair.entity1.name).lower()
        _ent2_pureText= re.sub(r"[_\W]","",pair.entity2.name).lower()                
        for link in links:
            _lk_pureText=re.sub(r"\(.*\)" , "" , link).lower()
            if _lk_pureText in _ent1_pureText or _lk_pureText in _ent2_pureText:                
                relativeLinks.append(link)
        
                
            #print(pair.entity1.name,"-> [",pair.relation,"] ->",pair.entity2.name)       
    relativeLinks = [l for l in relativeLinks if l not in processed_pages];
    relativeLinks =  list(dict.fromkeys(relativeLinks)) #移除重複的
    processed_pages.extend(relativeLinks)
    print("==================",itLeft," :相關 link ", relativeLinks,"=====================")
    for link in relativeLinks:
        await doProcess(nlp,link,(itLeft-1),callback,preserveRate)        
    pass

if __name__=="__main__":
    setupNlp()
    MAX_IT=2
    doProcess("Sword_Art_Online",MAX_IT);