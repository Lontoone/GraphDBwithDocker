from unicodedata import name
from spacy.tokens import Doc
from src.ARHelper import AnaphoraResolutionHelper
#from src.Neo4jHelper import Neo4JHelper
from src.NodePair import Node, NodePair, NodeSpliter
from src.SBDHelper import SbdHelper
from src.WikiHelper import wikiHelper
import spacy
import numpy as np
import neuralcoref
from spacy.matcher import Matcher

def main():
    # 取得文本
    wiki = wikiHelper()
    text =wiki.GetPage()
    
    #text =wiki.GetPage("Semantic_Web")
    #text =wiki.GetPage("Caracalla")
    #text='Python supports multiple programming paradigms, including structured (particularly procedural), object-oriented and functional programming.'
    
    #print("取得文本 ", text)
    # 文本清理    
    
    #---------- 斷句 --------------
    nlp = spacy.load("en_core_web_sm")    
    nlp.add_pipe(nlp.create_pipe('sentencizer'))
    #--------- 合併斷句 ------------
    sbd= SbdHelper()
    Doc.set_extension("briefSents" , default=None , force=True)
    nlp.add_pipe(sbd.briefSbd, after="sentencizer")
    
    doc= nlp(text)    
    #matches = matcher(doc)
    
    print("句子數 ",len(list(doc.sents)), len(doc._.briefSents))    
    #print(doc._.briefSents [:15])
    
    #--------- 回指消解 ------------
    Doc.set_extension("referedSents" , default=None , force=True)
    print("--------- 回指消解 ------------")
    #nlp.remove_pipe('sentencizer') ## TODO: Load pipeline by name....
    nlp_ar=spacy.load("en_core_web_sm")
    neuralcoref.add_to_pipe(nlp_ar, name="neuralcoref")    
    ar = AnaphoraResolutionHelper()    
    nlp_ar.add_pipe(ar.arReplacement,name="arReplacement", after="neuralcoref")  
    #nlp_ar.add_pipe(nlp_ar.create_pipe('sentencizer') , after="arReplacement")  
    
    doc_array= []
    clean_full_text= ""
    for sent in doc._.briefSents[:20]:
        sent_doc= nlp_ar(sent.text)
        #print("------- ar 結果--------")
        #print(sent_doc._.referedSents)
        doc_array.append(sent_doc)
        clean_full_text+=sent_doc._.referedSents
        #print(sent_doc._.coref_clusters)
        
    print("------- ar doc長度--------")
    #print(len(doc_array))
    print("------- 乾淨full文本 --------")
    #print(clean_full_text)
    
    
    
    #----------- 文本後處理 ?----------------
    
    # full process
    nlp_full = spacy.load("en_core_web_sm")    
    full_doc = nlp_full(clean_full_text)
    sents= list(full_doc.sents)
    '''
    for sent in list(full_doc.sents)[:10]:
        print()
        print(sent)    
    '''
    
    # 知識抽取    
    #------------- 實體 ------------------    
    print("------- Noun chunks --------")
    nodePairs=[]
    for sent in sents:
        print(sent.text)
        print()
        sent_doc=nlp_full(sent.text)
        nuns=list(sent_doc.noun_chunks)
        
        spliter=NodeSpliter(nuns)
        pairs=spliter.split()
        if pairs:
            nodePairs.append(pairs[:])
        
        '''
        nodes=[]
        for chunk in nuns:            
            print(chunk.text, chunk.root.text, chunk.root.dep_,chunk.root.head.text)
            #設定node屬性...
            _node=Node(name=chunk.lemma_ , verb=chunk.root.head.lemma_)
            nodes.append(_node)
            
        #比對 node的動詞，連接node成nodePair        
        #nodes.sort(key=lambda n:(n.verb,n.name) ,reverse=True)#依照verb、index排序
        for i in range(0,len(nodes)-1,2):
            _pair=NodePair(nodes[i],nodes[i+1],nodes[i].verb)
            nodePairs.append(_pair)
        '''
            
    print("sent長度",len(sent_doc),"nodePair長度",len(nodePairs))
    #驗證
    for pairs in nodePairs[:20]:
        for pair in pairs:
            print(pair.entity1.name,"-> [",pair.relation,"] ->",pair.entity2.name)
            print()
        print()
            
    return nodePairs;     
    #-------------- 上傳 Neo4j ---------------------
    '''
    db= Neo4JHelper()
    db.writeNode(nodePairs)
    '''
        
            
    

    # 相似度計算
    # 得出nodes....繼續

if __name__=="__main__":
    main()