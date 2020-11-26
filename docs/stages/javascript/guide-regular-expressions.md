# Regular Expressions

Regular expressions are patterns used to match character combinations in strings.

In JavaScript, regular expressions are also **objects**.

## Creating a regular expression

* Using a regular expression literal, which consists of a pattern enclosed between slashes.

  ```js
  let regExp = /ab+c/;
  ```

* Or calling the constructor function of the `RegExp` object.

  ```js
  let regExp = new RegExp('ab+c');
  ```

## Writing a regular expression pattern

`/Chapter(\d+)\.\d*/`, the parentheses are used as a memory device. The match made with this part of the pattern is remembered for later use, as described in Using groups(子字符串匹配).

### Using simple patterns(模式)

Simple patterns are constructed of characters for which you want to find a direct match.

### Using special characters

#### [Assertions]()(断言)

Assertions include boundaries, which indicate the beginnings and endings of lines and words, and other patterns indicating in some way that a match is possible (including look-ahead, look-behind, and conditional expressions).

#### [Character classes]()(字符类)

Distinguish(区分) different types of characters.

#### [Groups and ranges]()(组和范围)

Indicate groups and ranges of expression characters.

#### [Quantifiers]()(量词)

Indicate number of characters or expression to match.

#### [Unicode property escapes]()

Distinguish based on unicode character properties, for example, upper- and lower- case letters, math symbols, and punctuation(标点符号).

#### Special characters in regular expressions

| Characters / constructs                                      | Corresponding article    |
| ------------------------------------------------------------ | ------------------------ |
| `\`, `.`, `\cX`, `\d`, `\D`, `\f`, `\n`, `\r`, `\s`, `\S`, `\t`, `\v`, `\w`, `\W`, `\0`, `\xhh`, `\uhhhh`, `\uhhhhh`, `[\b]` | Character classes        |
| `^`, `$`, `x(?=y)`, `x(?!y)`, `(?<=y)x`, `(?<!y)x`, `\b`, `\B` | Assertions               |
| `(x)`, `(?:x)`, `(?<Name>x)`, `x|y`, `[xyz]`, `[^xyz]`, `\Number` | Groups and ranges        |
| `*`, `+`, `?`, `x{n}`, `x{n, }`, `x{n, m}`                   | Quantifiers              |
| `\p{UnicodeProperty}`, `\P{UnicodeProperty}`                 | Unicode property escapes |

### Escaping

Using a special characters literally, we must escape it by putting a backslash in fron of it. `/a\*b/`-- the backslash "escapes" hte `"*"`, making it literal instead of special.

If using the `RegExp` constructor with a string literal, remember that the backslash is an escape in string literals, so to use it in the regular expression, we need to escape it at the string literal level. `/a\*b/` and `new RegExp("a\\*b")` create the same expression.

If escape strings are not already part of pattern, we can using `String.replace`:

```js
function escapeRegExp(string) {
  // $& meas the whole matched string
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}
```

> The "g" after the regular expression is an option or flag that performs a **global search**, looking in the whole string and returning all matches.

### Using parentheses

Parentheses around any part of the regular expression pattern causes that part of the matched substring to be remembered. *Once remembered, the substring can be recalled for other use.*

## Using regular expressions in JavaScript



Regular expressions are used with the `RegExp` methods `test()` and `exec()` and with the `String` methods `match()`, `replace()`, `search()`, and `split()`.

#### Methods that use regular expressions

| Method         | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `exec()`       | Executes a search for a match in a string. It returns an array of information or `null` on a mismatch. |
| `test()`       | Tests for a match in a string. It returns `true` or `false`. |
| `match()`      | Returns an array containing all of the matches, including capturing groups, or `null` if no match is found. |
| `matchAll()`   | Returns an iterator containing all of the matches, including capturing groups. |
| `search()`     | Tests for a match in a string. It returns the index of the match, or `-1` if the search fails. |
| `replace()`    | Executes a search for **a** match in a string, and replaces the matched substring with a replacement substring. |
| `replaceAll()` | Executes a search for **all** matches in a string, and replaces the matched substrings with a replacement substring. |
| `split()`      | Uses a regular expression or a fixed string to break a string into an array of substrings. |

```js
let regExp = /d(b+)d/g;
let myArray1 = regExp.exec('cdbbdbsbz');			// dbbd

// not need to access the properties of the regular expression
let myArray2 = /d(b+)d/g.exec('cdbbdbsbz');
			// This similar to "cdbbdbsbz".match(/d(b+)d/g);
			// however, "cdbbdbsbz".match(/d(b+)d/g) outputs Array [ "dbbd" ],
			// while, /d(b+)d/g.exec('cdbbdbsbz') ooutputs Array [ 'dbbd', 'bb', index: 1, input: 'cdbbdbsbz' ].
```

Construct the regular expression from a string.

```js
let regExp = new RegExp('d(b+)d', 'g');
let myArray = regExp.exec('cdbbdbsbz');
```

If we use this form without assigning it to a variable, you cannot subsequently access the properties of that regular expression.

```js
let regExp = /d(b+)d/g;
let myArray = regExp.exec('cdbbdbsbz');
console.log('The value of lastIndex is ' + regExp.lastIndex);

// "The value of lastIndex is 5"
```

However

```js
let myArray = /d(b+)d/g.exec('cdbbdbsbz');
console.log('The value of lastIndex is ' + /d(b+)d/g.lastIndex);

// "The value of lastIndex is 0"
```

### Advanced searching with flags

#### Regular expression flags

| Flag | Description                                                  | Corresponding property        |
| ---- | ------------------------------------------------------------ | ----------------------------- |
| `g`  | Global search.                                               | `RegExp.prototype.global`     |
| `i`  | Case-insensitive search.                                     | `RegExp.prototype.ignoreCase` |
| `m`  | Multi-line search.                                           | `RegExp.prototype.multiline`  |
| `s`  | Allows `.` to match newline charachters.                     | `RegExp.prototype.dotAll`     |
| `u`  | "unicode"; treat a pattern as a sequence of unicode code points. | `RegExp.prototype.unicode`    |
| `y`  | Perform a "sticky" search that matches starting at the current position in the target string. | `RegExp.prototype.sticky`     |

```js
/* flag regular expression syntax */

let regExp = /pattern/flags;
// or
let regExp = new RegExp('pattern', 'flags');
```

```js
let regExp = /\w+\s/g;
let str = 'fee fi fo fum';
let myArray = str.match(regExp);
console.log(myArray);

// ["fee ", "fi ", "fo "]
```

The same as: 

```js
let regExp = new RegExp('\\w+\\s', 'g');
let str = 'fee fi fo fum';
let myArray = str.match(regExp);
console.log(myArray);

// ["fee ", "fi ", "fo "]
```

The `g` flag is used with the `.exec()` method to get iterative progression.

```js
let regExp = new RegExp('\\w+\\s', 'g');
let str = 'fee fi fo fum';
let xArray;
while (xArray = regExp.exec(str))
  console.log(xArray);
// produces:
// ["fee ", index: 0, input: "fee fi fo fum"]
// ["fi ", index: 4, input: "fee fi fo fum"]
// ["fo ", index: 7, input: "fee fi fo fum"]
```

## Examples

### Using special characters to verify input

```html
<p>
  Enter your phone number (with area code) and then click "Check".
  <br>
  The expected format is like ###-###-####.
</p>
<form action="#">
  <input id="phone">
  <button onclick="testInfo(document.getElementById('phone'));">
    Check
  </button>
</form>

<script>
  let regExp = /(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/;
  function testInfo(phoneInput) {
    let OK = regExp.exec(phoneInput.value);
    if (!OK) {
      console.error(phoneInput.value + ' isn\'t a phone number with area code!');
    } else {
      console.log('Thanks, your phone number is ' + OK[0]);
    }
  }
</script>
```

### Change the order of the strings

```js
let names = "Orange Trump ;Fred Barney; Helen Rigby; Bill Abel ; Chris Hand ";
let output = ["---------- Original String\n", names + "\n"];

let pattern = /\s*;\s*/;

let nameList = names.split(pattern);

pattern = /(\w+)\s+(\w+)/;

let bySurnameList = [];

output.push("---------- After Split by Regular Expression");

let i, len;
for (i = 0, len = nameList.length; i < len; i++) {
  output.push(nameList[i]);
  bySurnameList[i] = nameList[i].replace(pattern, "$2, $1");
}

output.push("---------- Names Reversed");
for (i = 0, len = bySurnameList.length; i < len; i++) {
  output.push(bySurnameList[i]);
}

bySurnameList.sort();
output.push("---------- Sorted");
for (i = 0, len = bySurnameList.length; i < len; i++) {
  output.push(bySurnameList[i]);
}

output.push("---------- End");

console.log(output.join("\n"));
```

