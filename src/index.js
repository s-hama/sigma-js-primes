const { getMsg } = require("./msgs.js");

// Generate a list of prime numbers using an optimized Sieve of Eratosthenes.
let maxInt = 8388607;
let primes = [];
const genPrimes = () => {
  primes = new Array(maxInt + 1).fill(true);
  primes[0] = primes[1] = false;
  for (let i = 2; i * i <= maxInt; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= maxInt; j += i) {
        primes[j] = false;
      }
    }
  }
  primes = primes.reduce((result, isPrime, index) => {
    if (isPrime) result.push(index);
    return result;
  }, []);
};
genPrimes();

// Re-generate the list of primes in the target range by re-setting the maximum value.
const changeMaxInt = (num) => {
  if (num < 1) throw new Error(getMsg("errNumericRange", ["Specified", "greater", 1]));
  maxInt = num;
  genPrimes();
};

// Get whether the specified number is prime.
const isPrime = (num) => {
  if (num < 2) return false;
  if (num > maxInt) throw new Error(getMsg("errNumericRange", ["Specified", "less", maxInt]));
  return primes.includes(num);
};

// Get prime numbers in a specified range.
const getPrimes = (start = 1, end = maxInt) => {
  if (start < 1) throw new Error(getMsg("errNumericRange", ["Starting", "greater", 1]));
  if (end > maxInt) throw new Error(getMsg("errNumericRange", ["Ending", "less", maxInt]));
  if (start > end) throw new Error(getMsg("errNumericRange", ["Starting", "less", "ending number"]));
  
  const primesInRange = primes.filter((prime) => prime >= start && prime <= end);
  return primesInRange;
};

// Get the prime factorization result of the specified number.
const getFactors = (num) => {
  if (num < 1) throw new Error(getMsg("errNumericRange", ["Specified", "greater", 1]));
  if (num > maxInt) throw new Error(getMsg("errNumericRange", ["Specified", "less", maxInt]));
  
  const factors = [];
  let divisor = 2;
  while (num > 1 && divisor <= num) {
    if (primes.includes(divisor) && num % divisor === 0) {
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
    throw new Error(getMsg("errNoTarget", ["prime numbers", "specified range"]));

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
  if (start < 1) throw new Error(getMsg('errNumericRange', ['Starting', 'greater', 1]));
  if (end > maxInt) throw new Error(getMsg('errNumericRange', ['Ending', 'less', maxInt]));
  if (start > end) throw new Error(getMsg('errNumericRange', ['Starting', 'less', 'ending number']));

  const primesInRange = primes.filter((prime) => prime >= start && prime <= end);
  return primesInRange.length;
};

// Export module.
module.exports = {
  changeMaxInt,
  isPrime,
  getPrimes,
  getFactors,
  getRandomPrime,
  isAreCoprime,
  getPrimesCount,
};
