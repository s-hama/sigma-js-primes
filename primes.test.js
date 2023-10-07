const {
  init,
  getMaxInt,
  getSieveType,
  getMsg,
  isPrime,
  getPrimes,
  getFactors,
  getRandomPrime,
  isCoprime,
  getPrimesCount,
  getPrimesIndex,
  getPrimesSum,
  getPrimesAverage,
  getPrimesMedian,
  getPrimesTwins,
  getFactorsFormula,
  getMultInverse,
} = require("./primes.js");

describe("Primes Functions", () => {
  describe("init", () => {
    it("should throw an error for invalid maxInt", () => {
      // msg: MaxInt number must be greater than or equal to 1.
      expect(() => init({ maxInt: 0 })).toThrowError(
        getMsg("errNumericRange", ["MaxInt", "greater", 1])
      );
      expect(() => init({ maxInt: -1 })).toThrowError(
        getMsg("errNumericRange", ["MaxInt", "greater", 1])
      );
      // msg: MaxInt number must be less than or equal to 9007199254740991.
      expect(() => init({ maxInt: 9999999999999999 })).toThrowError(
        getMsg("errNumericRange", ["MaxInt", "less", Number.MAX_SAFE_INTEGER])
      );
    });
    it("should throw an error when the setting value is not specified", () => {
      // msg: Setting value is not specified.
      expect(() => init()).toThrowError(
        getMsg("errNotSpecify", ["Setting value"])
      );
      expect(() => init({})).toThrowError(
        getMsg("errNotSpecify", ["Setting value"])
      );
      expect(() => init(null)).toThrowError(
        getMsg("errNotSpecify", ["Setting value"])
      );
      expect(() => init(undefined)).toThrowError(
        getMsg("errNotSpecify", ["Setting value"])
      );
    });
    it("should throw an error for invalid sieveType", () => {
      // msg: Please specify sieveType for eratosthenes or atkin.
      expect(() => init({ sieveType: "other sieve" })).toThrowError(
        getMsg("errInvalidSpecify", ["sieveType", "eratosthenes or atkin"])
      );
    });
    it("should maxInt and sieveType are updated with the specified settings", () => {
      init({ maxInt: 100, sieveType: "atkin" });
      expect(getMaxInt()).toEqual(100);
      expect(getSieveType()).toEqual("atkin");
    });
  });

  describe("genPrimeNums", () => {
    it("should list of prime numbers is generated with the specified maxInt and sieveType", () => {
      // if maxInt: 20, sieveType: "atkin", genAtkinSieve is executed
      init({ maxInt: 20, sieveType: "atkin" });
      expect(getPrimes()).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
      expect(getMaxInt()).toEqual(20);
      expect(getSieveType()).toEqual("atkin");
      // if maxInt: 25, sieveType: "eratosthenes", genAtkinSieve is executed
      init({ maxInt: 25, sieveType: "eratosthenes" });
      expect(getPrimes()).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23]);
      expect(getMaxInt()).toEqual(25);
      expect(getSieveType()).toEqual("eratosthenes");
    });
  });

  describe("isPrime", () => {
    beforeEach(() => {
      init({ maxInt: 8388607 });
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
      init({ maxInt: 15 });
      expect(getPrimes()).toEqual([2, 3, 5, 7, 11, 13]);
    });
    it("should get a prime number given only the starting value of a range", () => {
      init({ maxInt: 100 });
      expect(getPrimes(80)).toEqual([83, 89, 97]);
    });
    it("should get a prime number given start and end values", () => {
      expect(getPrimes(10, 30)).toEqual([11, 13, 17, 19, 23, 29]);
    });
    it("should throw an error if a starting value less than 1 is specified", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimes(-5)).toThrowError(
        getMsg("errNumericRange", ["Starting", "greater", 1])
      );
    });
    it("should throw an error if an exit value greater than the maximum is specified", () => {
      init({ maxInt: 8388607 });
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
      init({ maxInt: 555 });
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
      init({ maxInt: 8388607 });
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
  describe("isCoprime", () => {
    beforeEach(() => {
      init({ maxInt: 8388607 });
    });
    it("should get true if the numbers are mutually prime", () => {
      expect(isCoprime(7, 10)).toBe(true);
      expect(isCoprime(15, 28)).toBe(true);
      expect(isCoprime(28, 15)).toBe(true);
    });
    it("should get false if the numbers are not relatively prime", () => {
      expect(isCoprime(8, 12)).toBe(false);
      expect(isCoprime(21, 35)).toBe(false);
    });
    it("should throw an error for invalid input", () => {
      expect(() => isCoprime(0, 5)).toThrowError();
      expect(() => isCoprime(5, -1)).toThrowError();
      expect(() => isCoprime(8388608, 10)).toThrowError();
    });
    it("should throw an error if the specified number is less than 1", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => isCoprime(0, 5)).toThrowError(
        getMsg("errNumericRange", ["Specified", "greater", 1])
      );
      expect(() => isCoprime(5, 0)).toThrowError(
        getMsg("errNumericRange", ["Specified", "greater", 1])
      );
    });
    it("should throw an error for values greater than maxInt", () => {
      // msg: Specified number must be less than or equal to 8388607.
      expect(() => isCoprime(8388608, 1)).toThrowError(
        getMsg("errNumericRange", ["Specified", "less", 8388607])
      );
      expect(() => isCoprime(1, 8388608)).toThrowError(
        getMsg("errNumericRange", ["Specified", "less", 8388607])
      );
    });
  });
  describe("getPrimesCount", () => {
    beforeEach(() => {
      init({ maxInt: 20 });
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
      init({ maxInt: 25 });
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
      init({ maxInt: 30 });
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
      init({ maxInt: 30 });
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
      init({ maxInt: 100 });
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
  describe("getPrimesTwins", () => {
    beforeEach(() => {
      init({ maxInt: 20 });
    });
    it("should get the twin prime numbers within the specified range", () => {
      expect(getPrimesTwins()).toEqual([
        [3, 5],
        [5, 7],
        [11, 13],
        [17, 19],
      ]);
      expect(getPrimesTwins(6)).toEqual([
        [11, 13],
        [17, 19],
      ]);
      expect(getPrimesTwins(1, 10)).toEqual([
        [3, 5],
        [5, 7],
      ]);
      expect(getPrimesTwins(3, 4)).toEqual([]);
    });
    it("should throw an error if getPrimesTwins raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimesTwins(0)).toThrowError(
        getMsg("errNumericRange", ["Starting", "greater", 1])
      );
      // msg: Ending number must be less than or equal to 20.
      expect(() => getPrimesTwins(1, 21)).toThrowError(
        getMsg("errNumericRange", ["Ending", "less", 20])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimesTwins(10, 5)).toThrowError(
        getMsg("errNumericRange", ["Starting", "less", "ending number"])
      );
    });
    it("should throw an error if no prime numbers are found in the range", () => {
      // msg: There are no prime numbers in the specified range.
      expect(() => getPrimesTwins(14, 15)).toThrowError(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    });
  });
  describe("getFactorsFormula", () => {
    beforeEach(() => {
      init({ maxInt: 100 });
    });
    it("should get the formula of the prime factorization result", () => {
      expect(getFactorsFormula(24)).toBe("2^3*3");
      expect(getFactorsFormula(30)).toBe("2*3*5");
      expect(getFactorsFormula(100)).toBe("2^2*5^2");
      expect(getFactorsFormula(7)).toBe("7");
    });
    it("should throw an error if the specified number is less than 1", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => getFactorsFormula(0)).toThrowError(
        getMsg("errNumericRange", ["Specified", "greater", 1])
      );
    });
    it("should throw an error for values greater than maxInt", () => {
      // msg: Specified number must be less than or equal to 100.
      expect(() => getFactorsFormula(101)).toThrowError(
        getMsg("errNumericRange", ["Specified", "less", 100])
      );
    });
  });
  describe("getMultInverse", () => {
    beforeEach(() => {
      init({ maxInt: 8388607 });
    });
    it("should get the multiplicative inverse of the specified number", () => {
      expect(getMultInverse(3, 11)).toBe(4);
      expect(getMultInverse(7, 13)).toBe(2);
    });
    it("should throw an error if the specified number is less than 1", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => getMultInverse(0, 5)).toThrowError(
        getMsg("errNumericRange", ["Specified", "greater", 1])
      );
      expect(() => getMultInverse(5, 0)).toThrowError(
        getMsg("errNumericRange", ["Specified", "greater", 1])
      );
    });
    it("should throw an error for values greater than maxInt", () => {
      // msg: Specified number must be less than or equal to 8388607.
      expect(() => getMultInverse(8388608, 1)).toThrowError(
        getMsg("errNumericRange", ["Specified", "less", 8388607])
      );
      expect(() => getMultInverse(1, 8388608)).toThrowError(
        getMsg("errNumericRange", ["Specified", "less", 8388607])
      );
    });
    it("should throw an error when the multiplicative inverse does not exist", () => {
      // msg: Multiplicative inverse does not exist.
      expect(() => getMultInverse(6, 9)).toThrowError(
        getMsg("errNotExist", ["Multiplicative inverse"])
      );
    });
  });
});
