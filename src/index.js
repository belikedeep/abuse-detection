const abusiveWordsEn = require("../data/abusive-words-en");
const abusiveWordsEs = require("../data/abusive-words-es");
const abusiveWordsFr = require("../data/abusive-words-fr");
const abusiveWordsDe = require("../data/abusive-words-de");
const abusiveWordsIt = require("../data/abusive-words-it");
const abusiveWordsPt = require("../data/abusive-words-pt");
const abusiveWordsNl = require("../data/abusive-words-nl");
const abusiveWordsRu = require("../data/abusive-words-ru");
const abusiveWordsZh = require("../data/abusive-words-zh");
const abusiveWordsJa = require("../data/abusive-words-ja");
const abusiveWordsKo = require("../data/abusive-words-ko");
const abusiveWordsAr = require("../data/abusive-words-ar");
const abusiveWordsHi = require("../data/abusive-words-hi");

const abusiveWords = {
  en: new Set(abusiveWordsEn),
  es: new Set(abusiveWordsEs),
  fr: new Set(abusiveWordsFr),
  de: new Set(abusiveWordsDe),
  it: new Set(abusiveWordsIt),
  pt: new Set(abusiveWordsPt),
  nl: new Set(abusiveWordsNl),
  ru: new Set(abusiveWordsRu),
  zh: new Set(abusiveWordsZh),
  ja: new Set(abusiveWordsJa),
  ko: new Set(abusiveWordsKo),
  ar: new Set(abusiveWordsAr),
  hi: new Set(abusiveWordsHi),
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
