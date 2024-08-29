# Abuse Detection

A Node.js package to detect abusive words in multiple languages.

## Installation

```bash
npm install abuse-detection
```

## Usage

```javascript
const { detectAbuse } = require('abuse-detection');

// Detect abuse in English (default)
console.log(detectAbuse('This is a fucking test'));
// Output: { hasAbusiveWords: true, abusiveWords: ['fucking'], abusiveWordCount: 1 }

// Detect abuse in Spanish
console.log(detectAbuse('Esto es una prueba de mierda', 'es'));
// Output: { hasAbusiveWords: true, abusiveWords: ['mierda'], abusiveWordCount: 1 }

// Detect abuse in French
console.log(detectAbuse('C\'est un test de merde', 'fr'));
// Output: { hasAbusiveWords: true, abusiveWords: ['merde'], abusiveWordCount: 1 }

// Clean text
console.log(detectAbuse('This is a clean test'));
// Output: { hasAbusiveWords: false, abusiveWords: [], abusiveWordCount: 0 }
```

## Supported Languages

- English (en)
- Spanish (es)
- French (fr)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.