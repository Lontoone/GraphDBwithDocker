import wikipediaapi

class wikiHelper:
    def GetPage(self, topic='Python_(programming_language)', lang='en'):
        '''
        wiki_wiki = wikipediaapi.Wikipedia('en')
        page_py = wiki_wiki.page('Python_(programming_language)')

        if(page_py.exists()):
            print(page_py.text);
        '''
        wiki_html = wikipediaapi.Wikipedia(
            language=lang,
            #extract_format=wikipediaapi.ExtractFormat.HTML
            extract_format=wikipediaapi.ExtractFormat.WIKI
            
        )
        p_html = wiki_html.page(topic)
        if(p_html.exists()):
            # print(p_html.text)
            return p_html.text
        


def main():
    wh =wikiHelper()
    print(wh.GetPage(topic='Semantic_Web'))


if __name__ == '__main__':
    main()
