const twitterLink: string = 'https://twitter.com/intent/tweet?hashtags=quotes&text=';
const quoteURL: string = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=updateQuote';

function getQuote(): void {
    let scriptElem: HTMLScriptElement = document.createElement('script');
    let divElem: HTMLElement = document.getElementById('jsonp');

    scriptElem.src = quoteURL;
    scriptElem.async = true;

    divElem.innerHTML = '';
    divElem.appendChild(scriptElem);
}

document.getElementById('button').addEventListener('click', getQuote, false);
window.onload = getQuote;