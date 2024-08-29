const { detectAbuse, addCustomWords, removeCustomWords } = require("./index");

describe("detectAbuse", () => {
  test("detects abusive words in English", () => {
    const result = detectAbuse("This is a fucking test");
    expect(result.hasAbusiveWords).toBe(true);
    expect(result.abusiveWords).toContain("fucking");
    expect(result.abusiveWordCount).toBe(1);
  });

  test("detects abusive words in Spanish", () => {
    const result = detectAbuse("Esto es una prueba de mierda", "es");
    expect(result.hasAbusiveWords).toBe(true);
    expect(result.abusiveWords).toContain("mierda");
    expect(result.abusiveWordCount).toBe(1);
  });

  test("detects abusive words in French", () => {
    const result = detectAbuse("C'est un test de merde", "fr");
    expect(result.hasAbusiveWords).toBe(true);
    expect(result.abusiveWords).toContain("merde");
    expect(result.abusiveWordCount).toBe(1);
  });

  test("returns no abusive words for clean text", () => {
    const result = detectAbuse("This is a clean test");
    expect(result.hasAbusiveWords).toBe(false);
    expect(result.abusiveWords).toHaveLength(0);
    expect(result.abusiveWordCount).toBe(0);
  });

  test("handles unsupported language gracefully", () => {
    const result = detectAbuse("This is a test", "de");
    expect(result.hasAbusiveWords).toBe(false);
    expect(result.abusiveWords).toHaveLength(0);
    expect(result.abusiveWordCount).toBe(0);
  });

  test("detects multiple abusive words", () => {
    const result = detectAbuse("This is a fucking shit test");
    expect(result.hasAbusiveWords).toBe(true);
    expect(result.abusiveWords).toContain("fucking");
    expect(result.abusiveWords).toContain("shit");
    expect(result.abusiveWordCount).toBe(2);
  });

  test("is case insensitive", () => {
    const result = detectAbuse("This is a FuCkInG test");
    expect(result.hasAbusiveWords).toBe(true);
    expect(result.abusiveWords).toContain("fucking");
    expect(result.abusiveWordCount).toBe(1);
  });
});

describe("addCustomWords", () => {
  test("adds custom words to English list", () => {
    addCustomWords(["badword", "verybadword"]);
    const result = detectAbuse("This is a badword test");
    expect(result.hasAbusiveWords).toBe(true);
    expect(result.abusiveWords).toContain("badword");
    expect(result.abusiveWordCount).toBe(1);
  });

  test("adds custom words to specified language", () => {
    addCustomWords(["malpalabra"], "es");
    const result = detectAbuse("Esto es una prueba de malpalabra", "es");
    expect(result.hasAbusiveWords).toBe(true);
    expect(result.abusiveWords).toContain("malpalabra");
    expect(result.abusiveWordCount).toBe(1);
  });
});

describe("removeCustomWords", () => {
  test("removes custom words from English list", () => {
    removeCustomWords(["badword"]);
    const result = detectAbuse("This is a badword test");
    expect(result.hasAbusiveWords).toBe(false);
    expect(result.abusiveWords).toHaveLength(0);
    expect(result.abusiveWordCount).toBe(0);
  });

  test("removes custom words from specified language", () => {
    removeCustomWords(["malpalabra"], "es");
    const result = detectAbuse("Esto es una prueba de malpalabra", "es");
    expect(result.hasAbusiveWords).toBe(false);
    expect(result.abusiveWords).toHaveLength(0);
    expect(result.abusiveWordCount).toBe(0);
  });
});
