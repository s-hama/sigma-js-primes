const { getMsg } = require("./msgs.js");

// Generate a list of prime numbers using the Sieve of Eratosthenes.
let maxInt = 8388607;
let primes = null;
const genPrimes = () => {
  // Generate a list of prime numbers in the target range.
  primes = new Array(maxInt + 1).fill(true);
  primes[0] = primes[1] = false;
  for (let i = 2; i * i <= maxInt; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= maxInt; j += i) {
        primes[j] = false;
      }
    }
  }
};
genPrimes();

// Re-generate the list of primes in the target range by re-setting the maximum value.
const changeMaxInt = (num) => {
  if (num < 1) throw new Error(getMsg('errNumericRange', ['Specified', 'greater', 1]));
  maxInt = num;
  genPrimes();
};

// Get whether the specified number is prime.
const isPrime = (num) => {
  if (num < 2) return false;
  if (num > maxInt) throw new Error(getMsg('errNumericRange', ['Specified', 'less', maxInt]));
  return primes[num];
};

// Get prime numbers in a specified range.
const getPrimes = (start = 1, end = maxInt) => {
  if (start < 1) throw new Error(getMsg('errNumericRange', ['Starting', 'greater', 1]));
  if (end > maxInt) throw new Error(getMsg('errNumericRange', ['Ending', 'less', maxInt]));
  if (start > end) throw new Error(getMsg('errNumericRange', ['Starting', 'less', 'ending number']));

  const primesInRange = [];
  for (let i = start; i <= end; i++) {
    if (primes[i]) primesInRange.push(i);
  }
  return primesInRange;
};

// Get the prime factorization result of the specified number.
const getFactors = (num) => {
  if (num < 1) throw new Error(getMsg('errNumericRange', ['Specified', 'greater', 1]));
  if (num > maxInt) throw new Error(getMsg('errNumericRange', ['Specified', 'less', maxInt]));
    
  const factors = [];
  let divisor = 2;
  while (num > 1 && divisor <= num) {
    if (primes[divisor] && num % divisor === 0) {
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
  let primesInRange = null;
  try {
    primesInRange = getPrimes(start, end);
  } catch (e) {
    throw e;
  }
  if (!primesInRange.length)
    throw new Error(getMsg('errNoTarget', ['prime numbers', 'specified range']));

  return primesInRange[Math.floor(Math.random() * primesInRange.length)];
};

// Get whether two integers are prime to each other.
const isAreCoprime = (a, b) => {
  if (a < 1 || b < 1)
    throw new Error(getMsg('errNumericRange', ['Specified', 'greater', 1]));
  if (a > maxInt || b > maxInt)
    throw new Error(getMsg('errNumericRange', ['Specified', 'less', maxInt]));

  // Use the greatest common divisor (GCD) to determine coprimality.
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

// Export module.
module.exports = {
  changeMaxInt,
  isPrime,
  getPrimes,
  getFactors,
  getRandomPrime,
  isAreCoprime,
};
