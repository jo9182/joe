# Omnibox Joe

Accessing Corrosion from directly in the Chrome Omnibox

![Gif Demo](demo.gif)

## Features

- Proxy URLs and search queries into Corrosion, simply by typing "j" + SPACE in the omnibox/url bar. 
- Or, make it your default search engine. 

- Blacklist URLs from being proxied.
- Swap out Corrosion URL.
- Choose from an extensive list of search engines, or enter your own.
- Change Corrosion URL encodings.

## Installation

1. Download [joe.html](https://github.com/elitwo/joe/releases/latest/download/joe.html) and place it somewhere on your Chromebook's filesystem
2. Double click it, to see its file:// URL and to edit settings


3. Edit search engines in chrome settings [chrome://settings/searchEngines](http://chrome://settings/searchEngines)
4. `Add` a new search engine
5. For `Search Engine`, type `Joe`
6. For `keyword`, type `j` or your choice of activation keyword
7. For `URL with %s in place of query`, enter the file:// URL for joe.html, appended with `#%s`
8. For `Suggestions URL with %s in place of query`, enter the Duckduckgo suggestions URL [https://duckduckgo.com/ac/?q=%s&amp;type=list](https://duckduckgo.com/ac/?q=%s&amp;type=list). If this is blocked, enter one from a different search engine or leave blank.</a>

9. Before you can use Joe, you will need to ensure the Corrosion instance is available. Likely, you will need to use the proxy site once manually. For the default HolyUnblocker, navigate to [https://holyubofficial.net/?q](https://holyubofficial.net/?q) and go to any URL. 

## Compiling

```sh
python compiler.py
```

This creates joe.html







**AS OF NOW THIS STILL WORKS**
