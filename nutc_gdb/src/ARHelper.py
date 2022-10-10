
# Load your usual SpaCy model (one of SpaCy English models)
#import re
import spacy
import neuralcoref
class AnaphoraResolutionHelper():
    def arReplacement(self , doc):
        #輸入短句 doc ，替換詞
        doc._.referedSents=doc._.coref_resolved;
        return doc
            
        
        