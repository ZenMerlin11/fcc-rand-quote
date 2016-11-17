const twitterLink: string = 'https://twitter.com/intent/tweet?hashtags=quotes&text=';
const quoteURL: string = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

function getJSON(url: string, callback: Function): void {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        let status: number = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
}

function handleXhrResponse(error: number, data: string): void {
    if (error != null) {
        alert('Error: ' + error);
    } else {
        updateQuote(JSON.parse(data));
    }
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