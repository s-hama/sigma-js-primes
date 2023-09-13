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
  const getPrimeIndex = (num, start = 1, end = maxInt) => {
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

  return {
    getMsg,
    changeMaxInt,
    isPrime,
    getPrimes,
    getFactors,
    getRandomPrime,
    isAreCoprime,
    getPrimesCount,
    getPrimeIndex,
  };
})();

// Export module.
module.exports = primes;
