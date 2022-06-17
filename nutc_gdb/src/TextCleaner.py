import re
#from WikiHelper import wikiHelper
brackets_pattern=r"\(.*\)"
h_pattern = r"<h\d>.*<\/h\d>"  #<h1> ~ <h6>
amp_pattern =r"&amp;"
nonBreaking_pattern =u"\u00a0"
nonFinishedSentence_pattern =r"[\s\n\r.]*[^\.*](<\/p>)$"
allTag=r"(<\w+>)|(<\/\w+>)|(<\w+[^<>]*>)"
multipleWhiteSpace=r"\s\s+"

class textCleaner():
    def __init__(self, text):
        self.originText=text;
    
    def cleanText(self):
        self.cleanText = self.originText
        #清除括號內容
        self.cleanText = re.sub(brackets_pattern , '',self.cleanText)
        #清除標題
        self.cleanText = re.sub(h_pattern , '',self.cleanText)
        #替換特殊符號
        self.cleanText = re.sub(amp_pattern , 'and',self.cleanText)
        #self.cleanText = re.sub(nonBreaking_pattern , '-',self.cleanText)
        
        # 移除連續多餘的空白 (會讓ar不過)
        self.cleanText = re.sub(multipleWhiteSpace , ' ',self.cleanText)
                
        #刪除換行
        #self.cleanText = re.sub(r"\n*" , '' ,self.cleanText,flags=re.MULTILINE|re.DOTALL)
        
        #清除沒有完整的句子
        self.cleanText = re.sub(nonFinishedSentence_pattern , '' ,self.cleanText,flags=re.MULTILINE|re.DOTALL)
        
        #將<i>內容視為實體?....
        
        #最後...清除所有tag
        self.cleanText = re.sub(allTag , '' ,self.cleanText,flags=re.MULTILINE|re.IGNORECASE|re.DOTALL)
        
        
        
        return self.cleanText
    
    
if __name__=="__main__":
    '''
    wiki = wikiHelper()    
    text= wiki.GetLocalPage("Python_(programming_language)")    
    tc= textCleaner(text)
    res= tc.cleanText()
    
    print(res)
    '''
    