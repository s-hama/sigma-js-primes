const {
  getMsg,
  changeMaxInt,
  isPrime,
  getPrimes,
  getFactors,
  getRandomPrime,
  isAreCoprime,
  getPrimesCount,
  getPrimesIndex,
  getPrimesSum,
  getPrimesAverage,
  getPrimesMedian,
} = require("./primes.js");

describe("Primes Functions", () => {
  describe("changeMaxInt", () => {
    it("should update maxInt and regenerate primes", () => {
      changeMaxInt(9999999);
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(9999999)).toBe(false);
    });
    it("should throw an error for invalid newMaxInt", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => changeMaxInt(0)).toThrowError(
        getMsg("errNumericRange", ["Specified", "greater", 1])
      );
    });
  });
  describe("isPrime", () => {
    beforeEach(() => {
      changeMaxInt(8388607);
    });
    it("should get false for values less than 2", () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(1)).toBe(false);
      expect(isPrime(-1)).toBe(false);
    });
    it("should get true for prime numbers", () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
    });
    it("should get false for non-prime numbers", () => {
      expect(isPrime(4)).toBe(false);
      expect(isPrime(9)).toBe(false);
      expect(isPrime(15)).toBe(false);
    });
    it("should throw an error for values greater than maxInt", () => {
      // msg: Specified number must be less than or equal to 8388607.
      expect(() => isPrime(8388608)).toThrowError(
        getMsg("errNumericRange", ["Specified", "less", 8388607])
      );
    });
  });
  describe("getPrimes", () => {
    it("should get prime numbers in range", () => {
      changeMaxInt(15);
      const primeRange = getPrimes();
      expect(primeRange).toEqual([2, 3, 5, 7, 11, 13]);
    });
    it("should get a prime number given only the starting value of a range", () => {
      changeMaxInt(100);
      const primeRange = getPrimes(80);
      expect(primeRange).toEqual([83, 89, 97]);
    });
    it("should get a prime number given start and end values", () => {
      const primeRange = getPrimes(10, 30);
      expect(primeRange).toEqual([11, 13, 17, 19, 23, 29]);
    });
    it("should throw an error if a starting value less than 1 is specified", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimes(-5)).toThrowError(
        getMsg("errNumericRange", ["Starting", "greater", 1])
      );
    });
    it("should throw an error if an exit value greater than the maximum is specified", () => {
      changeMaxInt(8388607);
      // msg: Ending number must be less than or equal to 8388607.
      expect(() => getPrimes(2, 8388608)).toThrowError(
        getMsg("errNumericRange", ["Ending", "less", 8388607])
      );
    });
    it("should throw an error if a starting value is specified that is greater than the ending value", () => {
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimes(100, 1)).toThrowError(
        getMsg("errNumericRange", ["Starting", "less", "ending number"])
      );
    });
  });
  describe("getFactors", () => {
    beforeEach(() => {
      changeMaxInt(555);
    });
    it("should get the prime factorization result", () => {
      expect(getFactors(24)).toEqual([2, 2, 2, 3]);
      expect(getFactors(555)).toEqual([3, 5, 37]);
    });
    it("should throw an error if the specified number is less than 1", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => getFactors(0)).toThrowError(
        getMsg("errNumericRange", ["Specified", "greater", 1])
      );
    });
    it("should throw an error for values greater than maxInt", () => {
      // msg: Specified number must be less than or equal to 555.
      expect(() => getFactors(556)).toThrowError(
        getMsg("errNumericRange", ["Specified", "less", 555])
      );
    });
  });
  describe("getRandomPrime", () => {
    beforeEach(() => {
      changeMaxInt(8388607);
    });
    it("should get a random prime number within the specified range", () => {
      const ret = getRandomPrime(1, 100);
      expect(ret).toBeGreaterThanOrEqual(1);
      expect(ret).toBeLessThanOrEqual(100);
    });
    it("should throw an error if getPrimes raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getRandomPrime(-10, 1)).toThrowError(
        getMsg("errNumericRange", ["Starting", "greater", 1])
      );
      // msg: Ending number must be less than or equal to 8388607.
      expect(() => getRandomPrime(1, 8388608)).toThrowError(
        getMsg("errNumericRange", ["Ending", "less", 8388607])
      );
      // msg: Starting number must be less than or equal to 8388607.
      expect(() => getRandomPrime(100, 1)).toThrowError(
        getMsg("errNumericRange", ["Starting", "less", "ending number"])
      );
    });
    it("should throw an error if no prime numbers are found in the range", () => {
      // msg: There are no prime numbers in the specified range.
      expect(() => getRandomPrime(24, 28)).toThrowError(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    });
  });
  describe("isAreCoprime", () => {
    beforeEach(() => {
      changeMaxInt(8388607);
    });
    it("should get true if the numbers are mutually prime", () => {
      expect(isAreCoprime(7, 10)).toBe(true);
      expect(isAreCoprime(15, 28)).toBe(true);
      expect(isAreCoprime(28, 15)).toBe(true);
    });
    it("should get false if the numbers are not relatively prime", () => {
      expect(isAreCoprime(8, 12)).toBe(false);
      expect(isAreCoprime(21, 35)).toBe(false);
    });
    it("should throw an error for invalid input", () => {
      expect(() => isAreCoprime(0, 5)).toThrowError();
      expect(() => isAreCoprime(5, -1)).toThrowError();
      expect(() => isAreCoprime(8388608, 10)).toThrowError();
    });
    it("should throw an error if the specified number is less than 1", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => isAreCoprime(0, 5)).toThrowError(
        getMsg("errNumericRange", ["Specified", "greater", 1])
      );
      expect(() => isAreCoprime(5, 0)).toThrowError(
        getMsg("errNumericRange", ["Specified", "greater", 1])
      );
    });
    it("should throw an error for values greater than maxInt", () => {
      // msg: Specified number must be less than or equal to 8388607.
      expect(() => isAreCoprime(8388608, 1)).toThrowError(
        getMsg("errNumericRange", ["Specified", "less", 8388607])
      );
      expect(() => isAreCoprime(1, 8388608)).toThrowError(
        getMsg("errNumericRange", ["Specified", "less", 8388607])
      );
    });
  });
  describe("getPrimesCount", () => {
    beforeEach(() => {
      changeMaxInt(20);
    });
    it("should get the number of prime numbers within the specified range", () => {
      expect(getPrimesCount()).toBe(8);
      expect(getPrimesCount(6)).toBe(5);
      expect(getPrimesCount(1, 10)).toBe(4);
    });
    it("should throw an error if getPrimesCount raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimesCount(0)).toThrowError(
        getMsg("errNumericRange", ["Starting", "greater", 1])
      );
      // msg: Ending number must be less than or equal to 20.
      expect(() => getPrimesCount(1, 21)).toThrowError(
        getMsg("errNumericRange", ["Ending", "less", 20])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimesCount(10, 5)).toThrowError(
        getMsg("errNumericRange", ["Starting", "less", "ending number"])
      );
    });
    it("should throw an error if no prime numbers are found in the range", () => {
      // msg: There are no prime numbers in the specified range.
      expect(() => getPrimesCount(14, 15)).toThrowError(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    });
  });
  describe("getPrimesIndex", () => {
    beforeEach(() => {
      changeMaxInt(25);
    });
    it("should get the correct index of a prime number within a specified range", () => {
      expect(getPrimesIndex(3)).toBe(2);
      expect(getPrimesIndex(17, 10)).toBe(3);
      expect(getPrimesIndex(2, 1, 10)).toBe(1);
    });
    it("should throw an error if the specified number is less than 1", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => getPrimesIndex(0)).toThrowError(
        getMsg("errNumericRange", ["Specified", "greater", 1])
      );
    });
    it("should throw an error for values greater than maxInt", () => {
      // msg: Specified number must be less than or equal to 555.
      expect(() => getPrimesIndex(26)).toThrowError(
        getMsg("errNumericRange", ["Specified", "less", 25])
      );
    });
    it("should throw an error if getPrimesCount raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimesIndex(5, -5)).toThrowError(
        getMsg("errNumericRange", ["Starting", "greater", 1])
      );
      // msg: Ending number must be less than or equal to 20.
      expect(() => getPrimesIndex(5, 1, 26)).toThrowError(
        getMsg("errNumericRange", ["Ending", "less", 25])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimesIndex(5, 20, 1)).toThrowError(
        getMsg("errNumericRange", ["Starting", "less", "ending number"])
      );
    });
    it("should throw an error if no prime numbers are found in the range", () => {
      // msg: There are no prime numbers in the specified range.
      expect(() => getPrimesIndex(5, 24, 25)).toThrowError(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    });
    it("should throw an error if the specified number is not a prime number", () => {
      expect(() => {
        getPrimesIndex(4, 1, 10);
      }).toThrowError(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    });
  });
  describe("getPrimesSum", () => {
    beforeEach(() => {
      changeMaxInt(30);
    });
    it("should get the sum of prime numbers within the specified range", () => {
      expect(getPrimesSum()).toBe(129);
      expect(getPrimesSum(25)).toBe(29);
      expect(getPrimesSum(5, 30)).toBe(124);
    });
    it("should throw an error if getPrimesSum raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimesSum(0)).toThrowError(
        getMsg("errNumericRange", ["Starting", "greater", 1])
      );
      // msg: Ending number must be less than or equal to 30.
      expect(() => getPrimesSum(1, 31)).toThrowError(
        getMsg("errNumericRange", ["Ending", "less", 30])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimesSum(100, 5)).toThrowError(
        getMsg("errNumericRange", ["Starting", "less", "ending number"])
      );
    });
    it("should get 0 if no prime number is found in the range", () => {
      expect(getPrimesSum(14, 15)).toBe(0);
    });
  });
  describe("getPrimesAverage", () => {
    beforeEach(() => {
      changeMaxInt(30);
    });
    it("should get the sum of prime numbers within the specified range", () => {
      expect(getPrimesAverage()).toBe(12.9);
      expect(getPrimesAverage(25)).toBe(29);
      expect(getPrimesAverage(5, 30)).toBe(15.5);
      expect(getPrimesAverage(1, 5, 9)).toBe(3.333333333);
      expect(getPrimesAverage(5, 12, 9)).toBe(7.666666667);
      expect(getPrimesAverage(5, 12, 0)).toBe(8);
    });
    it("should throw an error if the specified number is less than 0", () => {
      // msg: Specified number must be greater than or equal to 0.
      expect(() => getPrimesAverage(5, 12, -1)).toThrowError(
        getMsg("errNumericRange", ["Decimal point position", "greater", 0])
      );
    });
    it("should throw an error if getPrimesAverage raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimesAverage(0)).toThrowError(
        getMsg("errNumericRange", ["Starting", "greater", 1])
      );
      // msg: Ending number must be less than or equal to 30.
      expect(() => getPrimesAverage(1, 31)).toThrowError(
        getMsg("errNumericRange", ["Ending", "less", 30])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimesAverage(100, 5)).toThrowError(
        getMsg("errNumericRange", ["Starting", "less", "ending number"])
      );
    });
    it("should get 0 if no prime number is found in the range", () => {
      expect(getPrimesAverage(14, 15)).toBe(0);
    });
  });
  describe("getPrimesMedian", () => {
    beforeEach(() => {
      changeMaxInt(100);
    });
    it("should get 0 if no prime number is found in the range", () => {
      expect(getPrimesMedian(80, 82)).toBe(0);
    });
    it("should get the median of prime numbers within the specified range", () => {
      expect(getPrimesMedian()).toBe(41);
      expect(getPrimesMedian(25)).toBe(60);
      expect(getPrimesMedian(5, 34)).toBe(17);
      expect(getPrimesMedian(5, 50)).toBe(23);
    });
    it("should throw an error if getPrimesMedian raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimesMedian(0)).toThrowError(
        getMsg("errNumericRange", ["Starting", "greater", 1])
      );
      // msg: Ending number must be less than or equal to 30.
      expect(() => getPrimesMedian(1, 101)).toThrowError(
        getMsg("errNumericRange", ["Ending", "less", 100])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimesMedian(100, 5)).toThrowError(
        getMsg("errNumericRange", ["Starting", "less", "ending number"])
      );
    });
  });
});
