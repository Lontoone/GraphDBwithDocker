import re

paragraph_pattern=r"<p>(.|\n)*?<\/p>"

brackets_pattern=r"\(.*\)"
h_pattern = r"<h\d>.*<\/h\d>"  #<h1> ~ <h6>
i_pattern=r"<i>(?P<sp>.*?)<\/i>"
amp_pattern =r"&amp;"
nonBreaking_pattern =u"\u00a0"
nonFinishedSentence_pattern =r"[\s\n\r.]*[^\.*](<\/p>)$"
allTag=r"(<\w+>)|(<\/\w+>)|(<\w+[^<>]*>)"
multipleWhiteSpace=r"\s\s+"

class textCleaner():
    def __init__(self, text):
        self.originText=text;
        self.paragraph=[];
    
    def splitParagraph(self, text):
        #依照<p>切
        for m in re.finditer(paragraph_pattern,text):
            start,end =m.start(), m.end()
            _para = text[start:end]
            print(_para)
            self.paragraph.append(_para);
        return self.paragraph
    
    def cleanText(self):
        self.cleanText = self.originText
        #清除括號內容
        self.cleanText = re.sub(brackets_pattern , '',self.cleanText)
        #清除標題
        self.cleanText = re.sub(h_pattern , '',self.cleanText)
        #替換特殊符號
        self.cleanText = re.sub(amp_pattern , 'and',self.cleanText)
        #u+00a0不可清除，不然AR會出錯
        #self.cleanText = re.sub(nonBreaking_pattern , '-',self.cleanText)
        
        #將<i>內容視為實體(把空白拔掉換成底線)....
        for m in re.finditer(i_pattern,self.cleanText):
            start,end =m.span('sp')
            i_content= self.cleanText[start:end]
            i_content= re.sub("\s","_",i_content)
            self.cleanText=self.cleanText[:start]+i_content +self.cleanText[end:]            
            
        
        # 移除連續多餘的空白 (會讓ar不過)
        self.cleanText = re.sub(multipleWhiteSpace , ' ',self.cleanText)
                
        #刪除換行
        #self.cleanText = re.sub(r"\n*" , '' ,self.cleanText,flags=re.MULTILINE|re.DOTALL)
        
        #清除沒有完整的句子
        self.cleanText = re.sub(nonFinishedSentence_pattern , '' ,self.cleanText,flags=re.MULTILINE|re.DOTALL)
        
        
        #最後...清除所有tag
        self.cleanText = re.sub(allTag , '' ,self.cleanText,flags=re.MULTILINE|re.IGNORECASE|re.DOTALL)      
        
        
        return self.cleanText
    
    def cleanText(self,text):
        cleanText = text
        #清除括號內容
        cleanText = re.sub(brackets_pattern , '',cleanText)
        #清除標題
        cleanText = re.sub(h_pattern , '',cleanText)
        #替換特殊符號
        cleanText = re.sub(amp_pattern , 'and',cleanText)
        #u+00a0不可清除，不然AR會出錯
        #self.cleanText = re.sub(nonBreaking_pattern , '-',self.cleanText)
        
        #將<i>內容視為實體(把空白拔掉換成底線)....
        for m in re.finditer(i_pattern,cleanText):
            start,end =m.span('sp')
            i_content= cleanText[start:end]
            i_content= re.sub("\s","_",i_content)
            cleanText=cleanText[:start]+i_content +cleanText[end:]            
            
        
        # 移除連續多餘的空白 (會讓ar不過)
        cleanText = re.sub(multipleWhiteSpace , ' ',cleanText)
                
        #刪除換行
        #self.cleanText = re.sub(r"\n*" , '' ,self.cleanText,flags=re.MULTILINE|re.DOTALL)
        
        #清除沒有完整的句子
        cleanText = re.sub(nonFinishedSentence_pattern , '' ,cleanText,flags=re.MULTILINE|re.DOTALL)
        
        
        #最後...清除所有tag
        cleanText = re.sub(allTag , '' ,cleanText,flags=re.MULTILINE|re.IGNORECASE|re.DOTALL)              
        
        return cleanText
    
    def cleanParagraphs(self, text):
        paras = self.splitParagraph(text);
        cleanParas =[]
        for _para in paras:            
            cleanParas.append(self.cleanText(_para))
        
        return cleanParas
    
    
if __name__=="__main__":
    '''
    wiki = wikiHelper()    
    text= wiki.GetLocalPage("Python_(programming_language)")    
    tc= textCleaner(text)
    res= tc.cleanText()
    
    print(res)
    '''
    