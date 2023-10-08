const primes = (function () {
  // Generate a list of prime numbers using an optimized Sieve of Eratosthenes.
  let maxInt = 8388607;
  let minInt = 1;
  let sieveType = "eratosthenes";
  let primeNums = [];

  const getMaxInt = () => {
    return maxInt;
  };

  const getMinInt = () => {
    return minInt;
  };

  const getSieveType = () => {
    return sieveType;
  };

  const genPrimeNums = () => {
    primeNums = (
      sieveType === "eratosthenes" ? genEratosthenesSieve() : genAtkinSieve()
    ).reduce((result, isPrime, index) => {
      if (isPrime) result.push(index + minInt);
      return result;
    }, []);
  };

  const genEratosthenesSieve = () => {
    const boolValues = new Array(maxInt - minInt + 1).fill(true)
    if (minInt === 1)
      boolValues[0] = false;
    for (let i = 2; i * i <= maxInt; i++) {
      for (let j = Math.max(i * i, Math.ceil(minInt / i) * i); j <= maxInt; j += i) {
        boolValues[j - minInt] = false;
      }
    }
    return boolValues;
  };

  const genAtkinSieve = () => {
    const boolValues = new Array(maxInt - minInt + 1).fill(false);
    boolValues[2 - minInt] = boolValues[3 - minInt] = true;
    for (let x = 1; x * x <= maxInt; x++) {
      for (let y = 1; y * y <= maxInt; y++) {
        let n = 4 * x * x + y * y;
        if (n >= minInt && n <= maxInt && (n % 12 === 1 || n % 12 === 5)) {
          boolValues[n - minInt] = !boolValues[n - minInt];
        }
        n = 3 * x * x + y * y;
        if (n >= minInt && n <= maxInt && n % 12 === 7) {
          boolValues[n - minInt] = !boolValues[n - minInt];
        }
        n = 3 * x * x - y * y;
        if (x > y && n >= minInt && n <= maxInt && n % 12 === 11) {
          boolValues[n - minInt] = !boolValues[n - minInt];
        }
      }
    }
    for (let x = 5; x * x <= maxInt; x++) {
      if (boolValues[x - minInt]) {
        for (let y = x * x; y <= maxInt; y += x * x) {
          boolValues[y - minInt] = false;
        }
      }
    }
    return boolValues;
  };

  // Initialization process.
  const init = (config) => {
    if (config?.maxInt === 0)
      throw new Error(getMsg("errNumericRange", ["MaxInt", "greater", 1]));
    if (config?.minInt === 0)
      throw new Error(getMsg("errNumericRange", ["MinInt", "greater", 1]));
    if (!config?.maxInt && !config?.minInt && !config?.sieveType)
      throw new Error(getMsg("errNotSpecify", ["Setting value"]));

    if (config?.maxInt) {
      if (config.maxInt < 1)
        throw new Error(getMsg("errNumericRange", ["MaxInt", "greater", 1]));
      if (!Number.isSafeInteger(config.maxInt))
        throw new Error(
          getMsg("errNumericRange", ["MaxInt", "less", Number.MAX_SAFE_INTEGER])
        );
      maxInt = config.maxInt;
    }

    if (config?.minInt) {
      if (config.minInt < 1)
        throw new Error(getMsg("errNumericRange", ["MinInt", "greater", 1]));
      if (config.minInt > maxInt)
        throw new Error(getMsg("errNumericRange", ["MinInt", "less", maxInt]));
      minInt = config.minInt;
    }

    if (config?.sieveType) {
      if (config.sieveType !== "eratosthenes" && config.sieveType !== "atkin")
        throw new Error(
          getMsg("errInvalidSpecify", ["sieveType", "eratosthenes or atkin"])
        );
      sieveType = config.sieveType;
    }
    genPrimeNums();
  };

  // Define message.
  const msgs = {
    // replace: {0}: Specified/Starting/Ending/MaxInt, {1}: greater/less, {2}: 0/1/maxInt
    errNumericRange: "{0} number must be {1} than or equal to {2}.",
    // replace: {0}: prime numbers, {1}: specified range
    errNoTarget: "There are no {0} in the {1}.",
    // replace: {0}: Multiplicative inverse
    errNotExist: "{0} does not exist.",
    // replace: {0}: Setting value
    errNotSpecify: "{0} is not specified.",
    // replace: {0}: sieveType, {1}: eratosthenes or atkin
    errInvalidSpecify: "Please specify {0} for {1}.",
  };

  // Get messages.
  const getMsg = (key, repArr = null) => {
    const msg = msgs[key];
    return repArr
      ? msg.replace(/{(\d+)}/g, (match, i) => {
          return repArr[i] !== undefined ? repArr[i] : match;
        })
      : msg;
  };

  // Get whether the specified number is prime.
  const isPrime = (num) => {
    if (num > maxInt)
      throw new Error(getMsg("errNumericRange", ["Specified", "less", maxInt]));
    if (num < minInt)
      throw new Error(getMsg("errNumericRange", ["Specified", "greater", minInt]));
    return primeNums.includes(num);
  };

  // Get prime numbers in a specified range.
  const getPrimes = (start = minInt, end = maxInt) => {
    if (start < minInt)
      throw new Error(getMsg("errNumericRange", ["Starting", "greater", minInt]));
    if (end > maxInt)
      throw new Error(getMsg("errNumericRange", ["Ending", "less", maxInt]));
    if (start > end)
      throw new Error(
        getMsg("errNumericRange", ["Starting", "less", "ending number"])
      );

    const primesInRange = primeNums.filter(
      (prime) => prime >= start && prime <= end
    );
    return primesInRange;
  };

  // Get the prime factorization result of the specified number.
  const getFactors = (num) => {
    if (num < minInt)
      throw new Error(getMsg("errNumericRange", ["Specified", "greater", minInt]));
    if (num > maxInt)
      throw new Error(getMsg("errNumericRange", ["Specified", "less", maxInt]));

    const factors = [];
    let divisor = 2;
    while (num > 1 && divisor <= num) {
      if (primeNums.includes(divisor) && num % divisor === 0) {
        factors.push(divisor);
        num /= divisor;
      } else {
        divisor++;
      }
    }
    return factors;
  };

  // Get a random prime number within the specified range.
  const getRandomPrime = (start = minInt, end = maxInt) => {
    const primesInRange = getPrimes(start, end);
    if (!primesInRange.length)
      throw new Error(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    return primesInRange[Math.floor(Math.random() * primesInRange.length)];
  };

  // Get whether two integers are prime to each other.
  const isCoprime = (a, b) => {
    if (a < minInt || b < minInt)
      throw new Error(getMsg("errNumericRange", ["Specified", "greater", minInt]));
    if (a > maxInt || b > maxInt)
      throw new Error(getMsg("errNumericRange", ["Specified", "less", maxInt]));

    const gcd = (x, y) => {
      while (y !== 0) {
        const temp = y;
        y = x % y;
        x = temp;
      }
      return x;
    };
    return gcd(a, b) === 1;
  };

  // Get the number of prime numbers in the specified range.
  const getPrimesCount = (start = minInt, end = maxInt) => {
    const primesInRange = getPrimes(start, end);
    if (!primesInRange.length)
      throw new Error(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    return primesInRange.length;
  };

  // Get a function that retrieves the index of a prime number within a specified range.
  const getPrimesIndex = (num, start = minInt, end = maxInt) => {
    if (num < 1)
      throw new Error(getMsg("errNumericRange", ["Specified", "greater", minInt]));
    if (num > maxInt)
      throw new Error(getMsg("errNumericRange", ["Specified", "less", maxInt]));

    const primesInRange = getPrimes(start, end);
    if (!primesInRange.length)
      throw new Error(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );

    const position = primesInRange.indexOf(num);
    if (position === -1)
      throw new Error(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    return position + 1;
  };

  // Get the sum of prime numbers within the specified range.
  const getPrimesSum = (start = minInt, end = maxInt) => {
    const primesInRange = getPrimes(start, end);
    return primesInRange.length
      ? primesInRange.reduce((acc, prime) => acc + prime, 0)
      : 0;
  };

  // Get the average of prime numbers within the specified range.
  const getPrimesAverage = (start = minInt, end = maxInt, places = 2) => {
    if (places < 0)
      throw new Error(
        getMsg("errNumericRange", ["Decimal point position", "greater", 0])
      );

    const primesInRange = getPrimes(start, end);
    const average = primesInRange.length
      ? primesInRange.reduce((acc, prime) => acc + prime, 0) /
        primesInRange.length
      : 0;
    return Number(average.toFixed(places));
  };

  // Get the median of the prime numbers within the specified range.
  const getPrimesMedian = (start = minInt, end = maxInt) => {
    const primesInRange = getPrimes(start, end);
    const length = primesInRange.length;
    if (!length) return 0;
    if (length % 2 === 0) {
      const midIndex1 = length / 2 - 1;
      const midIndex2 = length / 2;
      return (primesInRange[midIndex1] + primesInRange[midIndex2]) / 2;
    } else {
      const midIndex = Math.floor(length / 2);
      return primesInRange[midIndex];
    }
  };

  // Get the twin prime numbers within the specified range
  const getPrimesTwins = (start = minInt, end = maxInt) => {
    const primesInRange = primes.getPrimes(start, end);
    if (!primesInRange.length)
      throw new Error(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );

    return primesInRange.reduce((twin, num, index, arr) => {
      if (index < arr.length - 1 && arr[index + 1] - num === 2) {
        twin.push([num, arr[index + 1]]);
      }
      return twin;
    }, []);
  };

  // Get the prime factorization result of the specified number using a formula.
  const getFactorsFormula = (num) => {
    const factors = getFactors(num);
    const exponents = {};
    factors.forEach((factor) => {
      exponents[factor] = (exponents[factor] || 0) + 1;
    });

    return Object.entries(exponents)
      .map(([factor, exponent]) =>
        exponent === 1 ? factor : `${factor}^${exponent}`
      )
      .join("*");
  };

  // Get the multiplicative inverse of the specified number. (Get x that becomes a*x≡1(mod m))
  const getMultInverse = (a, m) => {
    if (a < minInt || m < minInt)
      throw new Error(getMsg("errNumericRange", ["Specified", "greater", minInt]));
    if (a > maxInt || m > maxInt)
      throw new Error(getMsg("errNumericRange", ["Specified", "less", maxInt]));
    if (!primes.isCoprime(a, m))
      // For relatively prime integers a and m, there always exists a multiplicative inverse.
      throw new Error(getMsg("errNotExist", ["Multiplicative inverse"]));

    return Array.from({ length: a * m }, (_, x) => x + 1).find(
      (x) => (a * x) % m === 1
    );
  };

  // Generate prime number list according to sieve type
  genPrimeNums();

  return {
    init,
    getMaxInt,
    getMinInt,
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
  };
})();

// Export module.
module.exports = primes;
