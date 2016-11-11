var quoteData = [
    {
        quote: "Before God we are all equally wise - and equally foolish.",
        author: "Albert Einstein"
    },
    {
        quote: "In order to succeed, we must first believe we can.",
        author: "Nikos Kazantzakis"
    },
    {
        quote: "Good, better, best. Never let it rest. 'Til your good is better and your better is best.",
        author: "St. Jerome"
    },
    {
        quote: "Problems are not stop signs, they are guidelines",
        author: "Robert H. Schuller"
    },
    {
        quote: "If you can dream it, you can do it.",
        author: "Walt Disney"
    },
    {
        quote: "Always do your best. What you plant now, you will harvest later.",
        author: "Og Mandino"
    },
    {
        quote: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius"
    }
];

let prevQuoteIndex: number = -1;

function getRandomIndex(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateQuote(): void {
    // Initialize local variables
    let index: number,
        quote: string,
        author: string,
        elem: Element

    // Get random index other than previous
    do {
        index = getRandomIndex(0, quoteData.length - 1);
    } while (index === prevQuoteIndex);
    prevQuoteIndex = index;

    // Get quote from quoteData
    quote = quoteData[index].quote;
    author = quoteData[index].author;

    // Render quote data to DOM
    elem = document.getElementById("quote");
    elem.textContent = quote;
    elem = document.getElementById("quote-author");
    elem.innerHTML = "<strong><em>-".concat(author).concat("</em></strong>");
}

document.getElementById("button").addEventListener("click", updateQuote, false);
window.onload = updateQuote;