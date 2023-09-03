const { changeMaxInt, isPrime, getPrimes, getFactors, getRandomPrime } = require("../src/index.js");
const { getMsg } = require("../src/msgs.js");

describe('Primes Functions', () => {
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
      // msg: Specified number must be greater than or equal to 1.
      expect(() => changeMaxInt(0)).toThrowError(getMsg('errNumericRange', ['Specified', 'greater', 1]));
    });
  });
  describe('isPrime', () => {
    beforeEach(() => {
      changeMaxInt(8388607);
    });
    it('should get false for values less than 2', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(1)).toBe(false);
      expect(isPrime(-1)).toBe(false);
    });
    it('should get true for prime numbers', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
    });
    it('should get false for non-prime numbers', () => {
      expect(isPrime(4)).toBe(false);
      expect(isPrime(9)).toBe(false);
      expect(isPrime(15)).toBe(false);
    });
    it('should throw an error for values greater than maxInt', () => {
      // msg: Specified number must be less than or equal to 8388607.
      expect(() => isPrime(8388608)).toThrowError(getMsg('errNumericRange', ['Specified', 'less', 8388607]));
    });
  });
  describe('getPrimes', () => {
    it('should get prime numbers in range', () => {
      changeMaxInt(15);
      const primeRange = getPrimes();
      expect(primeRange).toEqual([2, 3, 5, 7, 11, 13]);
    });
    it('should get a prime number given only the starting value of a range', () => {
      changeMaxInt(100);
      const primeRange = getPrimes(80);
      expect(primeRange).toEqual([83, 89, 97]);
    });
    it('should get a prime number given start and end values', () => {
      const primeRange = getPrimes(10, 30);
      expect(primeRange).toEqual([11, 13, 17, 19, 23, 29]);
    });  
    it('should throw an error if a starting value less than 1 is specified', () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimes(-5)).toThrowError(getMsg('errNumericRange', ['Starting', 'greater', 1]));
    });
    it('should throw an error if an exit value greater than the maximum is specified', () => {
      changeMaxInt(8388607);
      // msg: Ending number must be less than or equal to 8388607.
      expect(() => getPrimes(2, 8388608)).toThrowError(getMsg('errNumericRange', ['Ending', 'less', 8388607]));
    });
    it('should throws an error if a starting value is specified that is greater than the ending value', () => {
      // msg: Starting number must be less than or equal to 8388607.
      expect(() => getPrimes(100, 1)).toThrowError(getMsg('errNumericRange', ['Starting', 'less', 'ending number']));
    });
  });
  describe('getFactors', () => {
    beforeEach(() => {
      changeMaxInt(555);
    });
    it('should get the prime factorization result', () => {
      expect(getFactors(24)).toEqual([2, 2, 2, 3]);
      expect(getFactors(555)).toEqual([3, 5, 37]);
    });
    it('should throws an error if the specified number is less than 1', () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => getFactors(0)).toThrowError(getMsg('errNumericRange', ['Specified', 'greater', 1]));
    });
    it('should throw an error for values greater than maxInt', () => {
      // msg: Specified number must be less than or equal to 555.
      expect(() => getFactors(556)).toThrowError(getMsg('errNumericRange', ['Specified', 'less', 555]));
    });
  });
  describe("getRandomPrime", () => {  
    beforeEach(() => {
      changeMaxInt(8388607);
    });
    it("should return a random prime within the specified range", () => {
      const ret = getRandomPrime(1, 100);
      expect(ret).toBeGreaterThanOrEqual(1);
      expect(ret).toBeLessThanOrEqual(100);
    });
    it("should throw an error if getPrimes raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getRandomPrime(-10, 1)).toThrowError(getMsg('errNumericRange', ['Starting', 'greater', 1]));
      // msg: Ending number must be less than or equal to 8388607.
      expect(() => getRandomPrime(1, 8388608)).toThrowError(getMsg('errNumericRange', ['Ending', 'less', 8388607]));
      // msg: Starting number must be less than or equal to 8388607.
      expect(() => getRandomPrime(100, 1)).toThrowError(getMsg('errNumericRange', ['Starting', 'less', 'ending number']));
    });
    it("should throw an error if no prime numbers are found in the range", () => {
      // msg: There are no prime numbers in the specified range.
      expect(() => getRandomPrime(24, 28)).toThrowError(getMsg('errNoTarget', ['prime numbers', 'specified range']));
    });
  });
});