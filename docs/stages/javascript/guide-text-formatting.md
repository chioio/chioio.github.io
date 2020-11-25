# Text Formatting

## Strings

JavaScript's `String` type is used to represent textual data.

### String literals

```js
'foo'
"bar"
```

#### Hexadecimal escape(转译) sequences

```js
// The number after \x is intepreted as hexadecimal number.
'\xA9'	// "©"
```

#### Unicode escape sequences

```js
'\u00A9'	// "©"
```

#### Unicode code point escapes (字元溢出)

* [`String.fromCodePoint()`]()
* [`String.prototype.codePointAt()`]()

```js
'\u{2f804}'

// the same with simple Unicode escapes
'\uD87e\uDC04'
```

### String objects

```js
const foo = new String('foo');	// Creates a String object
console.log(foo);								// Displays: [String: 'foo']
typeof foo;											// Returns 'object'
```

```js
const firstString = '2 + 2';		// Creates a string literal value
const secondString = new String('2 + 2');	// Create a String object
eval(firstString);							// Returns the number 4
eval(secondString);							// Returns the string "2 + 2"
```

Can't change individual characters because strings are immutable array-like objects:

```js
const hello = 'Hello, World!';
const helloLength = hello.length;
hello[0] = 'L';			// This has no effect, because strings are immutable
hello[0];						// This returns "H"
```

* Characters whose Unicode scalar values are greater thanU+FFFF (such as some rare Chinese/Japanese/Lorean/Vietnamese characters and some emoji) are stored in UTF-16 with two surrogate code units each.

#### Methods of `String`

| Method                                                 | Description                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| `charAt`, `charCodeAt`, `codePointAt`                  | Return the character or character code at the specified position in string. |
| `indexOf`, `lastIndexOf`                               | Return the position of specified substring in the string or last position of specified substring, respectively. |
| `startsWith`, `endsWith`, `includes`                   | Returns whether or not the string starts, ends or contains a specified string. |
| `concat`                                               | Combines the text of two strings and returns a new string.   |
| `fromCharCode`, `fromCodePoint`                        | Constructs a string from the specified sequence of Unicode values. **This is a method of the String class, not a String instance.** |
| `split`                                                | Splits a `String` object into an array of strings by separating the string into substrings. |
| `slice`                                                | Extracts a section of a string and returns a new string.     |
| `substring`, `substr`                                  | Return the specified subset of the string, either by specifying the start and end indexes or the start index and a length. |
| `match`, `matchAll`, `replace`, `replaceAll`, `search` | Work with regular expressions.                               |
| `toLowerCase`, `toUpperCase`                           | Return the string in all lowercase or all uppercase, respectively. |
| `normalize`                                            | Returns the Unicode Normalization Form of the calling string value. |
| `repeat`                                               | Returns a string consisting of the elements of the object repreated the given times. |
| `trim`                                                 | Trims whitespace from the beginning and end of the string.   |

### Multi-lie template literals

Template literals are string literals allowing embedded expressions.

#### Multi-lines

```js
console.log('string text line 1\n\
string text line 2');
// "string text line 1
// string text line 2"

// with multi-line strings
console.log(`string text line 1 
string text line 2`);
// "string text line 1
// string text line 2"
```

#### Embedded expressions

```js
const five = 5;
const tem = 10;
console.log('Fifteen is ' + (five + ten) + ' and not ' + (2 * five + ten) + '.');
// "Fifteen is 15 and not 20."

// with template literals
console.log(`Fifteen is ${five + ten} and not ${2 * five + ten}.`);
// "Fifteen is 15 and not 20."
```



## Internationalization

The `Intl` object is the namespace for the ECMAScript Internationalization API, which provides language sensitive(敏感的) string comparison, number formatting, and date and time formatting.

The constructors for `Collator`, `NumberFormat`, and `DateTimeFormat` object are properties of the `Intl` object.

### Date and time formatting

The `DateTimeFormat` object is useful for formatting date and time.

```js
const msPerDay = 24 * 60 * 60 * 1000;

// July 17, 2014 00:00:00 UTC.
const july172014 = new Date(msPerDay * (44 * 365 + 11 + 197));

const options = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
};
const americanDateTime = new Intl.DateTimeFormat('en-US', options).format;

console.log(americanDateTime(july172014));		// 07/16/14, 5:00 PM PDT
```

### Number formatting

The `NumberFormat` object is useful for formatting numbers.

```js
const gasPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 3
});
console.log(gasPrice.format(5.259));		// $5.259

const hanDecimalRMBInChina = new Intl.NumberFormat('zh-CN-u-nu-hanidec', {
  style: 'currency',
  currency: 'CNY'
});
console.log(hanDecimalRMBInChina.format(1314.25));	// ¥ 一,三一四.二五
```

### Collation(定序)

The `Collator` object is useful for comparing and sorting strings.

```js
const names = ['Hochberg', 'Hönigswald', 'Holzman'];

const germanPhonebook = new Intl.Collator('de-DE-u-co-phonebk');

// as if sorting ["Hochberg", "Hoenigswald", "Holzman"]:
console.log(names.sort(germanPhonebook.compare).join(', '));
// logs "Hochberg, Hönigswald, Holzman"
```

```js
const germanDictionary = new Intl.Collator('de-DE-u-co-dict');

// as is sorting ["Hochberg", "Honigswald", "Holzman"]:
console.log(names.sort(germanDictionary.compare).join(', '));
// logs "Hochberg, Holzman, Hönigswald"
```

