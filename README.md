# Omnibox Joe

Accessing Corrosion from directly in the Chrome Omnibox

## Features

- Proxy URLs and search queries into Corrosion, simply by typing "j" + SPACE in the omnibox/url bar. 
- Or, make it your default search engine. 

- Blacklist URLs from being proxied.
- Swap out Corrosion URL.
- Choose from an extensive list of search engines, or enter your own.
- Change Corrosion URL encodings.

## Installation

- Download joe.html and place it somewhere on your Chromebook's filesystem
- Double click it, to see its file:// URL and to edit settings


- Edit search engines in chrome settings [chrome://settings/searchEngines](chrome://settings/searchEngines)
- `Add` a new search engine
- For `Search Engine", type `Joe`
- For `keyword`, type `j` or your choice of activation keyword
- For `URL with %s in place of query`, enter the file:// URL for joe.html, appended with `#%s`
- For `Suggestions URL with %s in place of query`, enter the Duckduckgo suggestions URL [https://duckduckgo.com/ac/?q=%s&amp;type=list](https://duckduckgo.com/ac/?q=%s&amp;type=list). If this is blocked, enter one from a different search engine or leave blank.</a>

## Compiling

```sh
python compiler.py
```

This creates joe.html