const primes = (function () {
  // Generate a list of prime numbers using an optimized Sieve of Eratosthenes.
  let minNum = 1;
  let maxNum = 8388607;
  let sieveType = "eratosthenes";
  let primeNums = [];

  // Define message.
  const msgs = {
    // replace: {0}: Specified number/Starting number/Ending number/Decimal point position/MinNum/MaxNum, {1}: greater/less, {2}: 0/1/minNum/maxNum
    errNumericRange: "{0} must be {1} than or equal to {2}.",
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

  // Get maximum number.
  const getMinNum = () => {
    return minNum;
  };

  // Get minimum number.
  const getMaxNum = () => {
    return maxNum;
  };

  // Get sieve type.
  const getSieveType = () => {
    return sieveType;
  };

  // Generate list of prime numbers.
  const genPrimeNums = () => {
    primeNums = (
      sieveType === "eratosthenes" ? genEratosthenesSieve() : genAtkinSieve()
    ).reduce((result, isPrime, index) => {
      if (isPrime) result.push(index + minNum);
      return result;
    }, []);
  };

  // Generate a truth list of prime numbers in the target range using the Sieve of Eratosthenes.
  const genEratosthenesSieve = () => {
    const boolValues = new Array(maxNum - minNum + 1).fill(true);
    if (minNum === 1) boolValues[0] = false;
    for (let i = 2; i * i <= maxNum; i++) {
      for (
        let j = Math.max(i * i, Math.ceil(minNum / i) * i);
        j <= maxNum;
        j += i
      ) {
        boolValues[j - minNum] = false;
      }
    }
    return boolValues;
  };

  // Generate a truth list of prime numbers in the target range using the Sieve of Atkin.
  const genAtkinSieve = () => {
    const boolValues = new Array(maxNum - minNum + 1).fill(false);
    boolValues[2 - minNum] = boolValues[3 - minNum] = true;
    for (let x = 1; x * x <= maxNum; x++) {
      for (let y = 1; y * y <= maxNum; y++) {
        let n = 4 * x * x + y * y;
        if (n >= minNum && n <= maxNum && (n % 12 === 1 || n % 12 === 5)) {
          boolValues[n - minNum] = !boolValues[n - minNum];
        }
        n = 3 * x * x + y * y;
        if (n >= minNum && n <= maxNum && n % 12 === 7) {
          boolValues[n - minNum] = !boolValues[n - minNum];
        }
        n = 3 * x * x - y * y;
        if (x > y && n >= minNum && n <= maxNum && n % 12 === 11) {
          boolValues[n - minNum] = !boolValues[n - minNum];
        }
      }
    }
    for (let x = 5; x * x <= maxNum; x++) {
      if (boolValues[x - minNum]) {
        for (let y = x * x; y <= maxNum; y += x * x) {
          boolValues[y - minNum] = false;
        }
      }
    }
    return boolValues;
  };

  // Initialization process.
  const init = (config) => {
    if (config?.minNum === 0)
      throw new Error(getMsg("errNumericRange", ["MinNum", "greater", 1]));
    if (config?.maxNum === 0)
      throw new Error(getMsg("errNumericRange", ["MaxNum", "greater", 1]));
    if (!config?.maxNum && !config?.minNum && !config?.sieveType)
      throw new Error(getMsg("errNotSpecify", ["Setting value"]));

    if (config?.minNum) {
      if (config.minNum < 1)
        throw new Error(getMsg("errNumericRange", ["MinNum", "greater", 1]));
      if (config.minNum > maxNum)
        throw new Error(getMsg("errNumericRange", ["MinNum", "less", maxNum]));
      minNum = config.minNum;
    }

    if (config?.maxNum) {
      if (config.maxNum < 1)
        throw new Error(getMsg("errNumericRange", ["MaxNum", "greater", 1]));
      if (!Number.isSafeInteger(config.maxNum))
        throw new Error(
          getMsg("errNumericRange", ["MaxNum", "less", Number.MAX_SAFE_INTEGER])
        );
      maxNum = config.maxNum;
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

  // Get whether the specified number is prime.
  const isPrime = (num) => {
    if (num < minNum)
      throw new Error(
        getMsg("errNumericRange", ["Specified number", "greater", minNum])
      );
    if (num > maxNum)
      throw new Error(
        getMsg("errNumericRange", ["Specified number", "less", maxNum])
      );
    return primeNums.includes(num);
  };

  // Get whether two integers are prime to each other.
  const isCoprime = (a, b) => {
    if (a < minNum || b < minNum)
      throw new Error(
        getMsg("errNumericRange", ["Specified number", "greater", minNum])
      );
    if (a > maxNum || b > maxNum)
      throw new Error(
        getMsg("errNumericRange", ["Specified number", "less", maxNum])
      );

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

  // Get prime numbers in a specified range.
  const getPrimes = (start = minNum, end = maxNum) => {
    if (start < minNum)
      throw new Error(
        getMsg("errNumericRange", ["Starting number", "greater", minNum])
      );
    if (end > maxNum)
      throw new Error(
        getMsg("errNumericRange", ["Ending number", "less", maxNum])
      );
    if (start > end)
      throw new Error(
        getMsg("errNumericRange", ["Starting number", "less", "ending number"])
      );

    const primesInRange = primeNums.filter(
      (prime) => prime >= start && prime <= end
    );
    return primesInRange;
  };

  // Get the average of prime numbers within the specified range.
  const getPrimesAverage = (start = minNum, end = maxNum, places = 2) => {
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

  // Get the number of prime numbers in the specified range.
  const getPrimesCount = (start = minNum, end = maxNum) => {
    const primesInRange = getPrimes(start, end);
    if (!primesInRange.length)
      throw new Error(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    return primesInRange.length;
  };

  // Get a function that retrieves the index of a prime number within a specified range.
  const getPrimesIndex = (num, start = minNum, end = maxNum) => {
    if (num < minNum)
      throw new Error(
        getMsg("errNumericRange", ["Specified number", "greater", minNum])
      );
    if (num > maxNum)
      throw new Error(
        getMsg("errNumericRange", ["Specified number", "less", maxNum])
      );

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

  // Get the median of the prime numbers within the specified range.
  const getPrimesMedian = (start = minNum, end = maxNum) => {
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

  // Get the sum of prime numbers within the specified range.
  const getPrimesSum = (start = minNum, end = maxNum) => {
    const primesInRange = getPrimes(start, end);
    return primesInRange.length
      ? primesInRange.reduce((acc, prime) => acc + prime, 0)
      : 0;
  };

  // Get the twin prime numbers within the specified range
  const getPrimesTwins = (start = minNum, end = maxNum) => {
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

  // Get the prime factorization result of the specified number.
  const getFactors = (num) => {
    if (num < minNum)
      throw new Error(
        getMsg("errNumericRange", ["Specified number", "greater", minNum])
      );
    if (num > maxNum)
      throw new Error(
        getMsg("errNumericRange", ["Specified number", "less", maxNum])
      );

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
    if (a < minNum || m < minNum)
      throw new Error(
        getMsg("errNumericRange", ["Specified number", "greater", minNum])
      );
    if (a > maxNum || m > maxNum)
      throw new Error(
        getMsg("errNumericRange", ["Specified number", "less", maxNum])
      );
    if (!primes.isCoprime(a, m))
      // For relatively prime integers a and m, there always exists a multiplicative inverse.
      throw new Error(getMsg("errNotExist", ["Multiplicative inverse"]));

    return Array.from({ length: a * m }, (_, x) => x + 1).find(
      (x) => (a * x) % m === 1
    );
  };

  // Get a random prime number within the specified range.
  const getRandomPrime = (start = minNum, end = maxNum) => {
    const primesInRange = getPrimes(start, end);
    if (!primesInRange.length)
      throw new Error(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    return primesInRange[Math.floor(Math.random() * primesInRange.length)];
  };

  // Generate prime number list according to sieve type
  genPrimeNums();

  return {
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
  };
})();

// Export module.
module.exports = primes;
