
# Load your usual SpaCy model (one of SpaCy English models)
import re
import spacy
import neuralcoref
nlp = spacy.load("en_core_web_sm")
#nlp =spacy.blank("en")
nlp.add_pipe(nlp.create_pipe('sentencizer'))
# Add neural coref to SpaCy's pipe
neuralcoref.add_to_pipe(nlp)

#text = "Rihanna is basically master of the fashion universe right now, so we're naturally going to pay attention to what trends she is and isn't wearing whenever she steps out of the door (or black SUV). She's having quite the epic week, first presenting her Savage x Fenty lingerie runway show then hosting her annual Diamond Ball charity event last night. Rihanna was decked out in Givenchy for the big event, but upon arrival at the venue, she wore a T-shirt, diamonds (naturally), and a scarf, leather pants, and heels in fall's biggest color trend: pistachio green."

#text="Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation."
 
text="To enable the encoding of semantics with the data, technologies such as Resource Description Framework (RDF) and Web Ontology Language (OWL) are used.These technologies are used to formally represent metadata."  
doc = nlp(text)

print("has cor ",doc._.has_coref)
print("clusters ",doc._.coref_clusters)
#print("clusters ",doc._.coref_clusters[0].mentions)
span = doc[-1:]
print("span",span._.coref_cluster)


class AnaphoraResolutionHelper():
    def arReplacement(self , doc):
        #輸入短句 doc ，替換詞
        #print(doc)
        _str= doc.text
        clusters = doc._.coref_clusters
        for cluster in clusters:
            mainWord = cluster.main.text #主詞
            for word in cluster:
                print("替代",word.text , "主詞 ",mainWord , "找到? ", _str.find(mainWord))   #替換代詞
                #取代所有格
                if word.root.dep_=="poss":                    
                    _str = _str.replace(word.text,mainWord+"'s" , 1)
                #取代代名詞
                else:
                    _str = _str.replace(word.text,mainWord , 1)
                
                
            #token_start = doc.text.find()
            
        #print(_str)
        #doc.text = _str;
        doc._.referedSents=_str;
        return doc
            
        
        