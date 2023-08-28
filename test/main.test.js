const { isPrime, changeMaxInt } = require("../src/index.js");

describe('Primes Functions', () => {
  describe('isPrime', () => {
    it('should return false for values less than 2', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(1)).toBe(false);
      expect(isPrime(-1)).toBe(false);
    });

    it('should return true for prime numbers', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
    });

    it('should return false for non-prime numbers', () => {
      expect(isPrime(4)).toBe(false);
      expect(isPrime(9)).toBe(false);
      expect(isPrime(15)).toBe(false);
    });

    it('should throw an error for values greater than maxInt', () => {
      expect(() => isPrime(8388608)).toThrowError(/exceeds the maximum/);
    });
  });

  describe('changeMaxInt', () => {
    it('should update maxInt and regenerate primes', () => {
      changeMaxInt(9999999);
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(9999999)).toBe(false);
    });

    it('should throw an error for invalid newMaxInt', () => {
      expect(() => changeMaxInt(0)).toThrowError(/greater than 0/);
    });
  });
});