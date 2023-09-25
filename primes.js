const primes = (function () {
  // Generate a list of prime numbers using an optimized Sieve of Eratosthenes.
  let maxInt = 8388607;
  let primeNums = [];
  const genPrimeNums = () => {
    primeNums = new Array(maxInt + 1).fill(true);
    primeNums[0] = primeNums[1] = false;
    for (let i = 2; i * i <= maxInt; i++) {
      if (primeNums[i]) {
        for (let j = i * i; j <= maxInt; j += i) {
          primeNums[j] = false;
        }
      }
    }
    primeNums = primeNums.reduce((result, isPrime, index) => {
      if (isPrime) result.push(index);
      return result;
    }, []);
  };
  genPrimeNums();

  // Define message.
  const msgs = {
    // replace: {0}: Specified/Starting/Ending, {1}: greater/less, {2}: 0/1/maxInt
    errNumericRange: "{0} number must be {1} than or equal to {2}.",
    // replace: {0}: prime numbers, {1}: specified range
    errNoTarget: "There are no {0} in the {1}.",
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

  // Re-generate the list of primes in the target range by re-setting the maximum value.
  const changeMaxInt = (num) => {
    if (num < 1)
      throw new Error(getMsg("errNumericRange", ["Specified", "greater", 1]));
    maxInt = num;
    genPrimeNums();
  };

  // Get whether the specified number is prime.
  const isPrime = (num) => {
    if (num < 2) return false;
    if (num > maxInt)
      throw new Error(getMsg("errNumericRange", ["Specified", "less", maxInt]));
    return primeNums.includes(num);
  };

  // Get prime numbers in a specified range.
  const getPrimes = (start = 1, end = maxInt) => {
    if (start < 1)
      throw new Error(getMsg("errNumericRange", ["Starting", "greater", 1]));
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
    if (num < 1)
      throw new Error(getMsg("errNumericRange", ["Specified", "greater", 1]));
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
  const getRandomPrime = (start = 1, end = maxInt) => {
    const primesInRange = getPrimes(start, end);
    if (!primesInRange.length)
      throw new Error(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    return primesInRange[Math.floor(Math.random() * primesInRange.length)];
  };

  // Get whether two integers are prime to each other.
  const isAreCoprime = (a, b) => {
    if (a < 1 || b < 1)
      throw new Error(getMsg("errNumericRange", ["Specified", "greater", 1]));
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
  const getPrimesCount = (start = 1, end = maxInt) => {
    const primesInRange = getPrimes(start, end);
    if (!primesInRange.length)
      throw new Error(
        getMsg("errNoTarget", ["prime numbers", "specified range"])
      );
    return primesInRange.length;
  };

  // Get a function that retrieves the index of a prime number within a specified range.
  const getPrimesIndex = (num, start = 1, end = maxInt) => {
    if (num < 1)
      throw new Error(getMsg("errNumericRange", ["Specified", "greater", 1]));
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
  const getPrimesSum = (start = 1, end = maxInt) => {
    const primesInRange = getPrimes(start, end);
    return primesInRange.length
      ? primesInRange.reduce((acc, prime) => acc + prime, 0)
      : 0;
  };

  // Get the average of prime numbers within the specified range.
  const getPrimesAverage = (start = 1, end = maxInt, places = 2) => {
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
  const getPrimesMedian = (start = 1, end = maxInt) => {
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
  const getPrimesTwins = (start = 1, end = maxInt) => {
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

  return {
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
    getPrimesTwins,
    getFactorsFormula,
  };
})();

// Export module.
module.exports = primes;
