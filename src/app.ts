// Interface for quote data object
interface IQuoteData {
    content: string;
    title: string;
}

// Initialize app globals
const twitterLink: string = 'https://twitter.com/intent/tweet?hashtags=quotes&text=';
const quoteURL: string = 'data/quotes.json';
const uniqueQuotes = 30; 
let recentQuotes: Array<number> = [];
let quoteData: Array<IQuoteData>; 

function getJSON(url: string): void {
    let xhr: XMLHttpRequest = new XMLHttpRequest(),
        response: any;
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        handleXhrResponse(xhr);
    };
    xhr.send();
}

function handleXhrResponse(xhr: XMLHttpRequest) {
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

    // If no errors, load quote data and render initial quote
    quoteData = xhr.response;
    updateQuote();
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function quoteRecentlyUsed(index: number) {
    if (recentQuotes === undefined) {
        return false;
    }

    for (let i = 0; i < recentQuotes.length; i++) {
        if (index === recentQuotes[i]) {
            return true;
        }
    }
    
    return false;
}

function logRecentQuote(index: number) {
    // Log the current index to recent quotes
    recentQuotes.push(index);

    // Once the desired number of unique quotes have been generated,
    // release least recent quote back into generation pool 
    if (recentQuotes.length > uniqueQuotes) {
        recentQuotes.shift();
    }
}

function updateQuote(): void {
    // Check quoteData is not null
    if (quoteData === null || quoteData === undefined) {
        alert('Something went wrong.');
        return;
    }
    
    // Initialize local variables
    let index: number,
        quote: string,
        author: string;

    // Get a new random index
    do {
        index = getRandomInt(0, quoteData.length);
    } while (quoteRecentlyUsed(index));
    logRecentQuote(index);
        
    // Get quote from quoteData
    if (quoteData[index].hasOwnProperty('content') &&
        quoteData[index].hasOwnProperty('title')
    ) {
        quote = quoteData[index].content;
        author = quoteData[index].title;
        renderQuoteToDOM(quote, author);
        updateTweetLink(quote, author);
    }
}

function renderQuoteToDOM(quote: string, author: string): void {
    // Render quote data to DOM
    let elem: Element;
    elem = document.getElementById('quote');
    elem.innerHTML = quote;
    elem = document.getElementById('quote-author');
    elem.innerHTML = '<strong><em>-'.concat(author).concat('</em></strong>');
}

function updateTweetLink(quote: string, author: string): void {
    // Build and update Tweet link
    let elem: Element;
    
    // Strip HTML from quote string
    elem = document.createElement('div');
    elem.innerHTML = quote;
    quote = elem.textContent;

    elem = document.getElementById('tweet-button');
    elem.setAttribute("href", `${ twitterLink }${ quote } -${ author }`);
}

function init(): void {
    getJSON(quoteURL);
}

document.getElementById('button').addEventListener('click', updateQuote, false);
window.onload = init;