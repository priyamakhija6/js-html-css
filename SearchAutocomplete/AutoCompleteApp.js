// Get HTML elements
const searchInputElement = document.querySelector('.search-input');
const resultsElement = document.querySelector('.results');

// Convert search results into UI suggestions
function showSearchResults(searchQuery) {
    searchData(searchQuery).then(results => {
        const html = results.map(movie => `
      <li>
        <span class="title">${movie.title}</span>
        <span class="rating">${movie.rating}</span>
      </li>
    `);

        resultsElement.innerHTML = html.join('');
    });
}

// Pass
function handleChange() {
    return showSearchResults(this.value);
}

// Register for both events
searchInputElement.addEventListener('change', handleChange);
searchInputElement.addEventListener('keyup', handleChange);

// Adding this right before the handleChange method
function memoize(func) {
    const cache = new Map();
    return function(...args) {
        // Use first argument as key
        const key = args[0];
        if (cache.has(key)) {
            console.log('cache hit');
            return cache.get(key);
        }
        console.log('cache miss');
        const val = func.apply(this, arguments);
        cache.set(key, val);
        return val;
    };
}

// Apply the memoization to the search results method
showSearchResults = memoize(showSearchResults);

// Adding this right after applying memoization
function debounce(fn, time) {
    let timeout;
    return function() {
        const functionCall = () => {
            console.log('calling');
            return fn.apply(this, arguments);
        };
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    }
}

// Apply the debouncing to the search results method
showSearchResults = debounce(showSearchResults, 200);

/*function showSearchResults(searchQuery) {
    const regex = new RegExp(searchQuery, 'gi');
    searchData(searchQuery).then(results => {
        const html = results.map(movie => {
            const title = movie.title.replace(regex, `<span class="query-highlight">${searchQuery}</span>`);
            return `
      <li>
        <span class="title">${title}</span>
        <span class="rating">${movie.rating}</span>
      </li>
    `;
        });

        resultsElement.innerHTML = html.join('');
    });
}*/
