const abusiveWordsEn = require("./abusive-words-en");
const abusiveWordsEs = require("./abusive-words-es");
const abusiveWordsFr = require("./abusive-words-fr");

const abusiveWords = {
  en: new Set(abusiveWordsEn),
  es: new Set(abusiveWordsEs),
  fr: new Set(abusiveWordsFr),
};

function addCustomWords(words, language = "en") {
  if (!abusiveWords[language]) {
    console.warn(
      `Language '${language}' is not supported. Adding words to English.`
    );
    language = "en";
  }
  words.forEach((word) => abusiveWords[language].add(word.toLowerCase()));
}

function removeCustomWords(words, language = "en") {
  if (!abusiveWords[language]) {
    console.warn(
      `Language '${language}' is not supported. Removing words from English.`
    );
    language = "en";
  }
  words.forEach((word) => abusiveWords[language].delete(word.toLowerCase()));
}

function detectAbuse(text, language = "en") {
  if (!abusiveWords[language]) {
    console.warn(
      `Language '${language}' is not supported. Falling back to English.`
    );
    language = "en";
  }

  const words = text.toLowerCase().match(/\S+/g) || [];
  const abusiveWordsFound = words.filter((word) =>
    abusiveWords[language].has(word)
  );

  return {
    hasAbusiveWords: abusiveWordsFound.length > 0,
    abusiveWords: abusiveWordsFound,
    abusiveWordCount: abusiveWordsFound.length,
  };
}

module.exports = { detectAbuse, addCustomWords, removeCustomWords };
