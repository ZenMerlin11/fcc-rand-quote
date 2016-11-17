const twitterLink: string = 'https://twitter.com/intent/tweet?hashtags=quotes&text=';
const quoteURL: string = 'https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

function getJSON(url: string, callback: Function): void {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        handleXhrResponse(xhr);
    };
    xhr.send();
}

function handleXhrResponse(xhr: XMLHttpRequest): void {
    // 4 readState means the request is completed.
    if (4 != xhr.readyState) {
        // Do nothing if the request is not complete.
        return;
    }

    if (null == xhr.response) {
        alert('Error: no response from server');
    }

    if (200 != xhr.status) {
        alert(`Error: status ${xhr.status}`);
    }

    // Process the response if success.
    updateQuote(xhr.response);   
}

function getQuote(): void {
    getJSON(quoteURL, handleXhrResponse);
}

interface IQuoteData {
    quoteText: string;
    quoteAuthor: string;
}

function updateQuote(quoteData: IQuoteData): void {
    // Initialize local variables
    let quote: string,
        author: string;
        
    // Get quote from quoteData
    if (quoteData.hasOwnProperty('quoteText') &&
        quoteData.hasOwnProperty('quoteAuthor')
    ) {
        quote = quoteData.quoteText;
        author = quoteData.quoteAuthor;
        renderQuoteToDOM(quote, author);
        updateTweetLink(quote, author);
    }    
}

function renderQuoteToDOM(quote: string, author: string): void {
    // Render quote data to DOM
    let elem: Element;
    elem = document.getElementById('quote');
    elem.textContent = quote;
    elem = document.getElementById('quote-author');
    elem.innerHTML = '<strong><em>-'.concat(author).concat('</em></strong>');
}

function updateTweetLink(quote: string, author: string): void {
    // Build and update Tweet link
    let elem: Element;
    elem = document.getElementById('tweet-button');
    elem.setAttribute("href", `${ twitterLink }${ quote } -${ author }`);
}

document.getElementById('button').addEventListener('click', getQuote, false);
window.onload = getQuote;