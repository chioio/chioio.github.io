# Fetching data from the server

## A basic Ajax request

### `XMLHttpRequest`

`XMLHttpRequest` (which is frequently abbreviated to XHR).

```js
const verseChoose = document.querySelector('select');
const poemDisply = document.querySelector('pre');

verseChoose.onchange = function() {
  const verse = verseChoose.value;
  updateDisplay(verse);
}

function updateDisplay(verse) {
  verse = verse.replace(" ", "");
  verse = verse.toLowerCase();
  let url = verse + '.txt';
  
  // Creating an XHR request
  let request = new XMLHttpRequest();
  // use `open()` method to specify what HTTP request method 
  // to use to request the resource from the network.
  request.open('GET', url);
  request.responseType = 'text';
  
  request.onload = function() {
    poemDisply.textContent = request.response;
  };
  request.send();
}

updateDisplay('Verse 1')
verseChoose.value = 'Verse 1';
```

### Fetch

The Fetch API is basically a modern replacement for XHR; it was introduced in browsers recently to make *asynchronous* HTTP requests easier to do in JavaScript.

```js
const verseChoose = document.querySelector('select');
const poemDisply = document.querySelector('pre');

verseChoose.onchange = function() {
  const verse = verseChoose.value;
  updateDisplay(verse);
}

function updateDisplay(verse) {
  verse = verse.replace(" ", "");
  verse = verse.toLowerCase();
  let url = verse + '.txt';
  
  fetch(url)
    .then(function(response) {
    response.text()
      .then(function(text) {
      poemDisplay.textContent = text;
    });
  });
}
```

### Aside on `promises`

```js
fetch(url).then(function(response) {
  response.text().then(function(text) {
    poemDisplay.textContent = text;
  })
})

// This code would do the same thing
let myFetch = fetch(url);

myFetch.then(function(response) {
  response.text().then(function(text) {
    poemDisplay.textContent = text;
  });
});

// This code would do the same thing
fetch(url).then(function(response) {
  return response.text();
}).then(function(text) {
  poemDisplay.textContent = text;
})
```

### 

