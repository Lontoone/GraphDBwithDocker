from random import sample
import spacy

text="It supports multiple programming paradigms, including structured (particularly procedural), object-oriented and functional programming."
nlp =spacy.load("en_core_web_sm")
doc = nlp(text)

for token in doc:
    print(token.text , token.lemma_ ,token.pos_,token.tag_ , token.dep_,token.shape_,token.is_stop)