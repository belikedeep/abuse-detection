# Abuse Detection

A Node.js package to detect abusive words in multiple languages.

## Installation

```bash
npm install abuse-detection
```

## Usage

```javascript
const {
  detectAbuse,
  addCustomWords,
  removeCustomWords,
} = require("abuse-detection");

// Detect abuse in English (default)
console.log(detectAbuse("This is a fucking test"));
// Output: { hasAbusiveWords: true, abusiveWords: ['fucking'], abusiveWordCount: 1 }

// Detect abuse in Spanish
console.log(detectAbuse("Esto es una prueba de mierda", "es"));
// Output: { hasAbusiveWords: true, abusiveWords: ['mierda'], abusiveWordCount: 1 }

// Detect abuse in French
console.log(detectAbuse("C'est un test de merde", "fr"));
// Output: { hasAbusiveWords: true, abusiveWords: ['merde'], abusiveWordCount: 1 }

// Detect abuse in German
console.log(detectAbuse("Das ist ein scheiße Test", "de"));
// Output: { hasAbusiveWords: true, abusiveWords: ['scheiße'], abusiveWordCount: 1 }

// Clean text
console.log(detectAbuse("This is a clean test"));
// Output: { hasAbusiveWords: false, abusiveWords: [], abusiveWordCount: 0 }

// Add custom abusive words
addCustomWords(["badword", "verybadword"], "en");
console.log(detectAbuse("This is a badword test"));
// Output: { hasAbusiveWords: true, abusiveWords: ['badword'], abusiveWordCount: 1 }

// Remove custom abusive words
removeCustomWords(["badword"], "en");
console.log(detectAbuse("This is a badword test"));
// Output: { hasAbusiveWords: false, abusiveWords: [], abusiveWordCount: 0 }
```

## Supported Languages

- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Dutch (nl)
- Russian (ru)
- Chinese (Simplified) (zh)
- Japanese (ja)
- Korean (ko)
- Arabic (ar)
- Hindi (hi)

## Adding New Languages

To add support for a new language:

1. Create a new file named `abusive-words-[lang-code].js` in the `data` directory.
2. Export an array of abusive words in the new language.
3. Import the new file in `src/index.js` and add it to the `abusiveWords` object.

## API

### detectAbuse(text, language = 'en')

Detects abusive words in the given text.

- `text` (string): The text to check for abusive words.
- `language` (string, optional): The language code (default: 'en').

Returns an object with:

- `hasAbusiveWords` (boolean): Whether abusive words were found.
- `abusiveWords` (array): List of abusive words found.
- `abusiveWordCount` (number): Number of abusive words found.

### addCustomWords(words, language = 'en')

Adds custom words to the list of abusive words for a specific language.

- `words` (array): Array of words to add.
- `language` (string, optional): The language code (default: 'en').

### removeCustomWords(words, language = 'en')

Removes custom words from the list of abusive words for a specific language.

- `words` (array): Array of words to remove.
- `language` (string, optional): The language code (default: 'en').

## Running Tests

To run the tests:

```bash
npm test
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
