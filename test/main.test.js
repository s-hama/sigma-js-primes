const { isPrime, changeMaxInt, getPrimes, getFactors } = require("../src/index.js");

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

  describe('getPrimes', () => {
    it('should getPrimes with default range', () => {
      changeMaxInt(15);
      const primeRange = getPrimes();
      expect(primeRange).toEqual([2, 3, 5, 7, 11, 13]);
    });
  
    it('should specify only the starting value of the range', () => {
      changeMaxInt(100);
      const primeRange = getPrimes(80);
      expect(primeRange).toEqual([83, 89, 97]);
    });

    it('should getPrimes with custom range', () => {
      const primeRange = getPrimes(10, 30);
      expect(primeRange).toEqual([11, 13, 17, 19, 23, 29]);
    });
  
    it('getPrimes with invalid start throws an error', () => {
      expect(() => {
        getPrimes(-5);
      }).toThrow("Range start must be greater than 0.");
    });
  
    it('getPrimes with end exceeding maxInt throws an error', () => {
      expect(() => getPrimes(2, 8388608)).toThrowError(/Specify an integer between 2/);
    });
  });

  describe('getFactors', () => {
    beforeEach(() => {
      changeMaxInt(555);
    });
    it('should return factors for a valid number', () => {
      expect(getFactors(24)).toEqual([2, 2, 2, 3]); // 2 * 2 * 2 * 3 = 24
      expect(getFactors(555)).toEqual([3, 5, 37]); // 3 * 5 * 37 = 555
    });

    it('should throw an error if a number out of range is given', () => {
      expect(() => getFactors(1)).toThrowError(/exceeds the maximum/);
      expect(() => getFactors(556)).toThrowError(/exceeds the maximum/);
    });
  });
});