// XOR encoding function borrowed from Corrosion :)
function xor(str) {
    return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
}

function setBlacklist(text) {
    const blacklist_array = text.split("\n");

    // Storing an array in localStorage with JSON to string method
    localStorage.setItem('blacklist', JSON.stringify(blacklist_array));
}

function setCorrosion(text) {
    localStorage.setItem('corrosion', text);
}

function setEncoding(text) {
    localStorage.setItem('encoding', text);
}

function setSearch(search_value) {
    let search_url = '';

    switch(search_value) {
        case "google":
            search_url = 'https://www.google.com/search?q=%s'
            break;
        case "ddg":
            search_url = 'https://duckduckgo.com/?q=%s';
            break;
        case "bing":
            search_url = 'https://www.bing.com/search?q=%s';
            break;
        case "startpage":
            search_url = 'https://www.startpage.com/do/search?q=%s';
            break;
        case "searx":
            search_url = 'https://searx.be/?q=%s';
            break;
        case "metager":
            search_url = 'https://metager.org/meta/meta.ger3?eingabe=%s';
            break;
        case "brave":
            search_url = 'https://search.brave.com/search?q=%s';
            break;
        case "custom":
            search_url = prompt('Full custom search engine URL, with %s in place of the query.', 'https://gg.fm/search?q=%s');
            break;
    }

    localStorage.setItem('search', search_url);
    localStorage.setItem('search_engine', search_value);
}

function main() {
    if (window.location.hash) {
        // Being called from the omnibox. Making a query.

        // Chrome URLencodes the query and passes it to the hash
        const hash = window.location.hash.substring(1);
        const query = decodeURIComponent(hash);
        let url = '';

        // User settings are stored in file:// localstorage
        const blacklist = JSON.parse(localStorage.getItem('blacklist'));
        const corrosion = localStorage.getItem('corrosion');
        const search = localStorage.getItem('search');
        const encoding = localStorage.getItem('encoding');

        if (query.startsWith('http://') || query.startsWith('https://')) {
            url = query; 
        } else {
            // Use the desired search engine if not a URL
            url = search.replace("%s", query);
        }

        // Don't use Corrosion for blacklisted URLs
        let domain = new URL(url);
        if (blacklist.includes(domain.hostname)) {
            window.location.href = url; 
            return;
        }

        let encoded_url = '';

        switch(encoding) {
            case 'xor':
                encoded_url = xor(url);
                break;
            case 'b64':
                encoded_url = btoa(url);
                break;
            case 'plain':
                encoded_url = url;
                break;
            default:
                encoded_url = xor(url);
                break;
        }

        // All done, redirect to the instance.
        window.location.href = corrosion + encoded_url;

    } else {
        // Being called directly. User is configuring options. 

        document.getElementById('options').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
        document.getElementById('url').href = document.URL + '#%s';
        document.getElementById('url').text = document.URL + '#%s';

        // Load in already set options & set defaults
        let blacklist_opt, corrosion_opt, search_engine_opt, encoding_opt = '';

        if (localStorage.getItem('blacklist') !== null) {
            blacklist_opt = JSON.parse(localStorage.getItem('blacklist')).join('\n'); 
        } else {
            blacklist_opt = 'wikipedia.org\ndictionary.com';
            setBlacklist(blacklist_opt);
        }

        if (localStorage.getItem('corrosion') !== null) {
            corrosion_opt = localStorage.getItem('corrosion'); 
        } else {
            corrosion_opt = 'https://cdn.holyubofficial.net/search/';
            setCorrosion(corrosion_opt);
        }

        if (localStorage.getItem('search_engine') !== null) {
            search_engine_opt = localStorage.getItem('search_engine');
        } else {
            search_engine_opt = 'google';
            setSearch(search_engine_opt);
        }

        if (localStorage.getItem('encoding') !== null) {
            encoding_opt = localStorage.getItem('encoding');
        } else {
            encoding_opt = 'xor';
            setEncoding(encoding_opt);
        }

        document.getElementById('blacklist').value = blacklist_opt;
        document.getElementById('corrosion').value = corrosion_opt;
        document.getElementById(search_engine_opt).selected = 'selected';
        document.getElementById(encoding_opt).selected = 'selected';

        document.getElementById('blacklist-btn').addEventListener('click', () => {
            const blacklist_text = document.getElementById('blacklist').value;
            setBlacklist(blacklist_text);
        });

        document.getElementById('corrosion-btn').addEventListener('click', () => {
            const corrosion_text = document.getElementById('corrosion').value;
            setCorrosion(corrosion_text);
        });

        document.getElementById('search-btn').addEventListener('click', () => {
            const search_value = document.getElementById('search').value;
            setSearch(search_value);
        });

        document.getElementById('encoding-btn').addEventListener('click', () => {
            const encoding_value = document.getElementById('encoding').value;
            setEncoding(encoding_value);
        });

        document.getElementById('add').addEventListener('click', () => {
            document.getElementById('help').style.display = 'block';
        });
    }
}

main();