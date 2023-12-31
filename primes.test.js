const {
  getMsg,
  getMinNum,
  getMaxNum,
  getSieveType,
  init,
  isPrime,
  isCoprime,
  getPrimes,
  getPrimesAverage,
  getPrimesCount,
  getPrimesIndex,
  getPrimesMedian,
  getPrimesSum,
  getPrimesTwins,
  getFactors,
  getFactorsFormula,
  getMultInverse,
  getRandomPrime,
} = require("./primes.js");

describe("Around pre-processing and prime number generation", () => {
  describe("init", () => {
    it("should throw an error for invalid minNum", () => {
      // msg: MinNum number must be greater than or equal to 1.
      expect(() => init({ minNum: 0 })).toThrowError(
        getMsg("errNumericRange", ["MinNum", "greater", 1])
      );
      expect(() => init({ minNum: -1 })).toThrowError(
        getMsg("errNumericRange", ["MinNum", "greater", 1])
      );
      // msg: MinNum number must be less than or equal to 8388607.
      expect(() => init({ minNum: 9999999999999999 })).toThrowError(
        getMsg("errNumericRange", ["MinNum", "less", 8388607])
      );
      // msg: MinNum number must be less than or equal to 101.
      init({ minNum: 1, maxNum: 100 });
      expect(() => init({ minNum: 101 })).toThrowError(
        getMsg("errNumericRange", ["MinNum", "less", getMaxNum()])
      );
    });
    it("should throw an error for invalid maxNum", () => {
      // msg: MaxNum number must be greater than or equal to 1.
      expect(() => init({ maxNum: 0 })).toThrowError(
        getMsg("errNumericRange", ["MaxNum", "greater", 1])
      );
      expect(() => init({ maxNum: -1 })).toThrowError(
        getMsg("errNumericRange", ["MaxNum", "greater", 1])
      );
      // msg: MaxNum number must be less than or equal to 9007199254740991.
      expect(() => init({ maxNum: 9999999999999999 })).toThrowError(
        getMsg("errNumericRange", ["MaxNum", "less", Number.MAX_SAFE_INTEGER])
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
      expect(() =>
        init({ minNum: 1, maxNum: 100, sieveType: "other sieve" })
      ).toThrowError(
        getMsg("errInvalidSpecify", ["sieveType", "eratosthenes or atkin"])
      );
    });
    it("should maxNum and sieveType are updated with the specified settings", () => {
      init({ minNum: 1, maxNum: 100, sieveType: "atkin" });
      expect(getMaxNum()).toEqual(100);
      expect(getSieveType()).toEqual("atkin");
    });
  });
  describe("genPrimeNums", () => {
    it("should list of prime numbers is generated with the specified maxNum and sieveType", () => {
      // if  sieveType: "atkin", minNum: 5, maxNum: 20, genAtkinSieve is executed
      init({ sieveType: "atkin", minNum: 5, maxNum: 20 });
      expect(getPrimes()).toEqual([5, 7, 11, 13, 17, 19]);
      expect(getMinNum()).toEqual(5);
      expect(getMaxNum()).toEqual(20);
      expect(getSieveType()).toEqual("atkin");
      // if sieveType: "eratosthenes", minNum: 3, maxNum: 25, genAtkinSieve is executed
      init({ sieveType: "eratosthenes", minNum: 3, maxNum: 25 });
      expect(getPrimes()).toEqual([3, 5, 7, 11, 13, 17, 19, 23]);
      expect(getMinNum()).toEqual(3);
      expect(getMaxNum()).toEqual(25);
      expect(getSieveType()).toEqual("eratosthenes");
    });
  });
});

describe("Primes functions", () => {
  beforeEach(() => {
    init({ minNum: 1, maxNum: 8388607 });
  });
  describe("isPrime", () => {
    it("should throw an error for values smaller than minNum", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => isPrime(0)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "greater", getMinNum()])
      );
      expect(() => isPrime(-1)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "greater", getMinNum()])
      );
    });
    it("should throw an error for values greater than maxNum", () => {
      // msg: Specified number must be less than or equal to 8388607.
      expect(() => isPrime(8388608)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "less", getMaxNum()])
      );
    });
    it("should get true for prime numbers", () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
    });
    it("should get false for non-prime numbers", () => {
      expect(isPrime(1)).toBe(false);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(9)).toBe(false);
      expect(isPrime(15)).toBe(false);
    });
  });
  describe("isCoprime", () => {
    it("should throw an error if the specified number is less than minNum", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => isCoprime(0, 5)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "greater", getMinNum()])
      );
      expect(() => isCoprime(5, 0)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "greater", getMinNum()])
      );
    });
    it("should throw an error for values greater than maxNum", () => {
      // msg: Specified number must be less than or equal to 8388607.
      expect(() => isCoprime(8388608, 1)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "less", getMaxNum()])
      );
      expect(() => isCoprime(1, 8388608)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "less", getMaxNum()])
      );
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
  });
  describe("getPrimes", () => {
    it("should throw an error if a starting value less than 1 is minNum", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimes(-5)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "greater", getMinNum()])
      );
    });
    it("should throw an error if an exit value greater than the maximum is specified", () => {
      init({ maxNum: 8388607 });
      // msg: Ending number must be less than or equal to 8388607.
      expect(() => getPrimes(2, 8388608)).toThrowError(
        getMsg("errNumericRange", ["Ending number", "less", getMaxNum()])
      );
    });
    it("should throw an error if a starting value is specified that is greater than the ending value", () => {
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimes(100, 1)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "less", "ending number"])
      );
    });
    it("should get prime numbers in range", () => {
      init({ minNum: 5, maxNum: 15 });
      expect(getPrimes()).toEqual([5, 7, 11, 13]);
    });
    it("should get a prime number given only the starting value of a range", () => {
      init({ maxNum: 100 });
      expect(getPrimes(80)).toEqual([83, 89, 97]);
    });
    it("should get a prime number given start and end values", () => {
      expect(getPrimes(10, 30)).toEqual([11, 13, 17, 19, 23, 29]);
    });
  });
  describe("getPrimesAverage", () => {
    beforeEach(() => {
      init({ minNum: 1, maxNum: 30 });
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
        getMsg("errNumericRange", ["Starting number", "greater", getMinNum()])
      );
      // msg: Ending number must be less than or equal to 30.
      expect(() => getPrimesAverage(1, 31)).toThrowError(
        getMsg("errNumericRange", ["Ending number", "less", getMaxNum()])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimesAverage(100, 5)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "less", "ending number"])
      );
    });
    it("should get 0 if no prime number is found in the range", () => {
      expect(getPrimesAverage(14, 15)).toBe(0);
    });
    it("should get the sum of prime numbers within the specified range", () => {
      expect(getPrimesAverage()).toBe(12.9);
      expect(getPrimesAverage(25)).toBe(29);
      expect(getPrimesAverage(5, 30)).toBe(15.5);
      expect(getPrimesAverage(1, 5, 9)).toBe(3.333333333);
      expect(getPrimesAverage(5, 12, 9)).toBe(7.666666667);
      expect(getPrimesAverage(5, 12, 0)).toBe(8);
    });
  });
  describe("getPrimesCount", () => {
    beforeEach(() => {
      init({ minNum: 1, maxNum: 20 });
    });
    it("should get the number of prime numbers within the specified range", () => {
      expect(getPrimesCount()).toBe(8);
      expect(getPrimesCount(6)).toBe(5);
      expect(getPrimesCount(1, 10)).toBe(4);
    });
    it("should throw an error if getPrimesCount raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimesCount(0)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "greater", getMinNum()])
      );
      // msg: Ending number must be less than or equal to 20.
      expect(() => getPrimesCount(1, 21)).toThrowError(
        getMsg("errNumericRange", ["Ending number", "less", getMaxNum()])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimesCount(10, 5)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "less", "ending number"])
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
      init({ minNum: 1, maxNum: 25 });
    });
    it("should throw an error if the specified number is less than minNum", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => getPrimesIndex(0)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "greater", getMinNum()])
      );
    });
    it("should throw an error for values greater than maxNum", () => {
      // msg: Specified number must be less than or equal to 25.
      expect(() => getPrimesIndex(26)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "less", getMaxNum()])
      );
    });
    it("should get the correct index of a prime number within a specified range", () => {
      expect(getPrimesIndex(3)).toBe(2);
      expect(getPrimesIndex(17, 10)).toBe(3);
      expect(getPrimesIndex(2, 1, 10)).toBe(1);
    });
    it("should throw an error if getPrimesCount raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimesIndex(5, -5)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "greater", getMinNum()])
      );
      // msg: Ending number must be less than or equal to 25.
      expect(() => getPrimesIndex(5, 1, 26)).toThrowError(
        getMsg("errNumericRange", ["Ending number", "less", getMaxNum()])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimesIndex(5, 20, 1)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "less", "ending number"])
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
  describe("getPrimesMedian", () => {
    beforeEach(() => {
      init({ minNum: 1, maxNum: 100 });
    });
    it("should throw an error if getPrimesMedian raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimesMedian(0)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "greater", getMinNum()])
      );
      // msg: Ending number must be less than or equal to 100.
      expect(() => getPrimesMedian(1, 101)).toThrowError(
        getMsg("errNumericRange", ["Ending number", "less", getMaxNum()])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimesMedian(100, 5)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "less", "ending number"])
      );
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
  });
  describe("getPrimesSum", () => {
    beforeEach(() => {
      init({ minNum: 1, maxNum: 30 });
    });
    it("should throw an error if getPrimesSum raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimesSum(0)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "greater", getMinNum()])
      );
      // msg: Ending number must be less than or equal to 30.
      expect(() => getPrimesSum(1, 31)).toThrowError(
        getMsg("errNumericRange", ["Ending number", "less", getMaxNum()])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimesSum(100, 5)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "less", "ending number"])
      );
    });
    it("should get 0 if no prime number is found in the range", () => {
      expect(getPrimesSum(14, 15)).toBe(0);
    });
    it("should get the sum of prime numbers within the specified range", () => {
      expect(getPrimesSum()).toBe(129);
      expect(getPrimesSum(25)).toBe(29);
      expect(getPrimesSum(5, 30)).toBe(124);
    });
  });
  describe("getPrimesTwins", () => {
    beforeEach(() => {
      init({ minNum: 1, maxNum: 20 });
    });
    it("should throw an error if getPrimesTwins raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getPrimesTwins(0)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "greater", getMinNum()])
      );
      // msg: Ending number must be less than or equal to 20.
      expect(() => getPrimesTwins(1, 21)).toThrowError(
        getMsg("errNumericRange", ["Ending number", "less", getMaxNum()])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getPrimesTwins(10, 5)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "less", "ending number"])
      );
    });
    it("should throw an error if no prime numbers are found in the range", () => {
      // msg: There are no prime numbers in the specified range.
      expect(() => getPrimesTwins(14, 15)).toThrowError(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
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
  });
  describe("getFactors", () => {
    beforeEach(() => {
      init({ minNum: 1, maxNum: 555 });
    });
    it("should throw an error if the specified number is less than minNum", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => getFactors(0)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "greater", getMinNum()])
      );
    });
    it("should throw an error for values greater than maxNum", () => {
      // msg: Specified number must be less than or equal to 555.
      expect(() => getFactors(556)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "less", getMaxNum()])
      );
    });
    it("should get the prime factorization result", () => {
      expect(getFactors(24)).toEqual([2, 2, 2, 3]);
      expect(getFactors(555)).toEqual([3, 5, 37]);
    });
  });
  describe("getFactorsFormula", () => {
    beforeEach(() => {
      init({ minNum: 1, maxNum: 100 });
    });
    it("should throw an error if the specified number is less than minNum", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => getFactorsFormula(0)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "greater", getMinNum()])
      );
    });
    it("should throw an error for values greater than maxNum", () => {
      // msg: Specified number must be less than or equal to 100.
      expect(() => getFactorsFormula(101)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "less", getMaxNum()])
      );
    });
    it("should get the formula of the prime factorization result", () => {
      expect(getFactorsFormula(24)).toBe("2^3*3");
      expect(getFactorsFormula(30)).toBe("2*3*5");
      expect(getFactorsFormula(100)).toBe("2^2*5^2");
      expect(getFactorsFormula(7)).toBe("7");
    });
  });
  describe("getMultInverse", () => {
    it("should throw an error if the specified number is less than minNum", () => {
      // msg: Specified number must be greater than or equal to 1.
      expect(() => getMultInverse(0, 5)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "greater", getMinNum()])
      );
      expect(() => getMultInverse(5, 0)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "greater", getMinNum()])
      );
    });
    it("should throw an error for values greater than maxNum", () => {
      // msg: Specified number must be less than or equal to 8388607.
      expect(() => getMultInverse(8388608, 1)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "less", getMaxNum()])
      );
      expect(() => getMultInverse(1, 8388608)).toThrowError(
        getMsg("errNumericRange", ["Specified number", "less", getMaxNum()])
      );
    });
    it("should throw an error when the multiplicative inverse does not exist", () => {
      // msg: Multiplicative inverse does not exist.
      expect(() => getMultInverse(6, 9)).toThrowError(
        getMsg("errNotExist", ["Multiplicative inverse"])
      );
    });
    it("should get the multiplicative inverse of the specified number", () => {
      expect(getMultInverse(3, 11)).toBe(4);
      expect(getMultInverse(7, 13)).toBe(2);
    });
  });
  describe("getRandomPrime", () => {
    it("should throw an error if getPrimes raises an exception", () => {
      // msg: Starting number must be greater than or equal to 1.
      expect(() => getRandomPrime(-10, 1)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "greater", getMinNum()])
      );
      // msg: Ending number must be less than or equal to 8388607.
      expect(() => getRandomPrime(1, 8388608)).toThrowError(
        getMsg("errNumericRange", ["Ending number", "less", getMaxNum()])
      );
      // msg: Starting number must be less than or equal to ending number.
      expect(() => getRandomPrime(100, 1)).toThrowError(
        getMsg("errNumericRange", ["Starting number", "less", "ending number"])
      );
    });
    it("should throw an error if no prime numbers are found in the range", () => {
      // msg: There are no prime numbers in the specified range.
      expect(() => getRandomPrime(24, 28)).toThrowError(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    });
    it("should get a random prime number within the specified range", () => {
      const ret = getRandomPrime(1, 100);
      expect(ret).toBeGreaterThanOrEqual(1);
      expect(ret).toBeLessThanOrEqual(100);
    });
  });
});
