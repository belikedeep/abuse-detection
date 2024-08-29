const { detectAbuse } = require('./index');

describe('detectAbuse', () => {
  test('detects abusive words in English', () => {
    const result = detectAbuse('This is a fucking test');
    expect(result.hasAbusiveWords).toBe(true);
    expect(result.abusiveWords).toContain('fucking');
    expect(result.abusiveWordCount).toBe(1);
  });

  test('detects abusive words in Spanish', () => {
    const result = detectAbuse('Esto es una prueba de mierda', 'es');
    expect(result.hasAbusiveWords).toBe(true);
    expect(result.abusiveWords).toContain('mierda');
    expect(result.abusiveWordCount).toBe(1);
  });

  test('detects abusive words in French', () => {
    const result = detectAbuse('C\'est un test de merde', 'fr');
    expect(result.hasAbusiveWords).toBe(true);
    expect(result.abusiveWords).toContain('merde');
    expect(result.abusiveWordCount).toBe(1);
  });

  test('returns no abusive words for clean text', () => {
    const result = detectAbuse('This is a clean test');
    expect(result.hasAbusiveWords).toBe(false);
    expect(result.abusiveWords).toHaveLength(0);
    expect(result.abusiveWordCount).toBe(0);
  });

  test('throws error for unsupported language', () => {
    expect(() => detectAbuse('This is a test', 'de')).toThrow("Language 'de' is not supported");
  });
});